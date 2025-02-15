import { BaseResponse } from "@/backend/types/baseResponse";
import { UserLoginDTO, UserLoginRes } from "@/backend/types/userDTO";
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