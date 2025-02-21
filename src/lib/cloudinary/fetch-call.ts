import { BaseResponse } from "@/backend/types/baseResponse";
import apiClient from "../axios/interceptor";

export async function fetchUpload(formData: FormData) {
    const response = await apiClient.post<BaseResponse<>>(`/api/cloudinary/upload`,
        formData
    );
    const result = response.data;
    if (result.success === false) {
        return result.message;
    }
    return result.result;
}