import { BaseResponse } from "@/backend/types/baseResponse";
import { UserDTO, UserLoginDTO, UserLoginRes } from "@/backend/types/userDTO";
import apiClient from "@/lib/axios/interceptor";

export async function fetchLogin(userLoginDTO: UserLoginDTO) {
    const response = await apiClient.post<BaseResponse<UserLoginRes>>(`/api/auth/login`,
        userLoginDTO
    );
    const result = response.data;
    if (result.success === false) {
        throw new Error(result.message);
    }
    return result.data;
}

export async function fetchRegister(userLoginDTO: UserDTO) {
    const response = await apiClient.post<BaseResponse<UserLoginRes>>(`/api/auth/register`,
        userLoginDTO
    );
    const result = response.data;
    if (result.success === false) {
        throw new Error(result.message);
    }
    return result.data;
}

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
