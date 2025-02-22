import { UploadApiResponse } from "cloudinary";
import { ICloudinaryImage } from "../models/cloudinary-image";

export async function mapUploadResponseDTOtoEntity(dto: UploadApiResponse): Promise<ICloudinaryImage> {
    return {
        public_id: dto.public_id,
        version: dto.version,
        signature: dto.signature,
        width: dto.width,
        height: dto.height,
        format: dto.format,
        resource_type: dto.resource_type,
        created_at: dto.created_at,
        tags: dto.tags,
        type: dto.type,
        etag: dto.etag,
        placeholder: dto.placeholder,
        url: dto.url,
        secure_url: dto.secure_url,
        original_filename: dto.original_filename
    } as ICloudinaryImage;
}