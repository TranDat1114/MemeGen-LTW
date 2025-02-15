import axios from 'axios';
import { getAccessTokenFromStorage, updateAccessTokenInStorage } from '@/lib/local-storage/access-token-in-storage';
import toast from 'react-hot-toast';

// Khởi tạo Axios instance
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Thêm access token vào các request
apiClient.interceptors.request.use((config) => {
    const accessToken = getAccessTokenFromStorage();
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

// Hàm lấy access token mới bằng refresh token
const refreshToken = async () => {
    try {
        const response = await apiClient.post('/api/auth/refresh-token');
        const { accessToken } = response.data;

        // Lưu lại accessToken mới
        updateAccessTokenInStorage(accessToken);

        return accessToken;
    } catch (error) {
        console.error('Error refreshing token', error);
        // Nếu lỗi, xóa access token trong localStorage và chuyển hướng về trang login
        updateAccessTokenInStorage('');
        window.location.href = '/login';
        toast.error('Your session has expired. Please log in again.');
        return null;
    }
};

// Khai báo kiểu cho hàng đợi failedQueue
interface FailedRequest {
    resolve: (token: string | null) => void;
    reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

// Xử lý các request chờ khi refresh token hoàn tất
const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Interceptor xử lý lỗi 401 (Unauthorized)
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi 401 (Unauthorized)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Nếu đang refresh, đẩy request vào hàng chờ
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return apiClient(originalRequest);
                }).catch((err: Error) => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(async (resolve, reject) => {
                const newAccessToken = await refreshToken();
                if (newAccessToken) {
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    processQueue(null, newAccessToken);
                    resolve(apiClient(originalRequest));
                } else {
                    processQueue(error, null);
                    reject(error);
                }
            }).finally(() => {
                isRefreshing = false;
            });
        }

        return Promise.reject(error);
    }
);

export default apiClient;