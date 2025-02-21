import { Schema, model, models } from 'mongoose';
import BaseEntity, { IBaseEntity } from "./base-entity";

export interface ICloudinaryImage extends Document, IBaseEntity {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: "image" | "video" | "raw" | "auto";
    created_at: string;
    tags: Array<string>;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    original_filename: string;
}



const CloudinaryImageSchema = new Schema<ICloudinaryImage>({

});

CloudinaryImageSchema.add(BaseEntity.schema);

export default models.User || model<ICloudinaryImage & IBaseEntity>('User', CloudinaryImageSchema);