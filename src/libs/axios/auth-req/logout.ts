import apiClient from "@/libs/axios/interceptor";

export const logout = async () => {
    try {
        const res = await apiClient.get('/api/auth/logout');
        const { success } = res.data;
        return success as boolean
    } catch (error) {
        console.error('Error logging out', error);
        return false;
    }
}