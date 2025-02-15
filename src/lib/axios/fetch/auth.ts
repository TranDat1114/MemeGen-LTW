import { BaseResponse } from "@/backend/types/baseResponse";
import { UserDTO, UserLoginDTO, UserLoginRes } from "@/backend/types/userDTO";
import apiClient from "@/lib/axios/interceptor";
import { SignUpWithGoogle } from "@/lib/firebase";

export async function fetchLogin(userLoginDTO: UserLoginDTO) {
    const response = await apiClient.post<BaseResponse<UserLoginRes>>(`/api/auth/login`,
        userLoginDTO
    );
    return response
}

export async function fetchRegister(userLoginDTO: UserDTO) {
    const response = await apiClient.post<BaseResponse<UserLoginRes>>(`/api/auth/register`,
        userLoginDTO
    );
    const result = response.data;
    if (result.success === false) {
        return result.message;
    }
    return result.result;
}
export const fetchGoogleLogin = async () => {
    const userChrome = await SignUpWithGoogle()
    const email = userChrome?.user.email
    const response = await apiClient.get('/api/auth/google-login', email);
    console.log(result);
    if (result.success == false) {
       console.log('ddd')
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
