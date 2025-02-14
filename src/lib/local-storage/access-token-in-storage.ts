export const updateAccessTokenInStorage = (newAccessToken: string) => {
    // Lấy giá trị hiện tại của session từ localStorage
    const authStorage = localStorage.getItem('auth-storage');

    // Kiểm tra nếu authStorage tồn tại
    if (authStorage) {
        // Chuyển đổi chuỗi JSON thành object
        const parsedStorage = JSON.parse(authStorage);

        // Cập nhật giá trị accessToken
        if (parsedStorage?.state) {
            parsedStorage.state.accessToken = newAccessToken;

            // Chuyển đổi object trở lại chuỗi JSON và lưu vào localStorage
            localStorage.setItem('auth-storage', JSON.stringify(parsedStorage));
        }
    }
};

export const getAccessTokenFromStorage = () => {
    // Lấy giá trị hiện tại của session từ localStorage
    const authStorage = localStorage.getItem('auth-storage');

    // Kiểm tra nếu authStorage tồn tại
    if (authStorage) {
        // Chuyển đổi chuỗi JSON thành object
        const parsedStorage = JSON.parse(authStorage);

        // Trả về giá trị accessToken
        return parsedStorage?.state?.accessToken;
    }

    return null;
}