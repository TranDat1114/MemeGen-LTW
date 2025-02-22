import { ICloudinaryImage } from "../models/cloudinary-image";
import { CloudinaryImageRepository } from "../repositories/cloudinary-image";

export class CloudinaryImageService {
    private cloudinaryImageRepo: CloudinaryImageRepository;

    constructor() {
        this.cloudinaryImageRepo = new CloudinaryImageRepository();
    }

    async createImage(image: ICloudinaryImage) {
        return await this.cloudinaryImageRepo.create(image);
    }

    async deleteImageByObjectId(objectId: string) {
        return await this.cloudinaryImageRepo.deleteByObjectId(objectId);
    }

    async updateImageByObjectId(objectId: string, updatedData: Partial<ICloudinaryImage>) {
        return await this.cloudinaryImageRepo.updateByObjectId(objectId, updatedData);
    }

    async findImageByPublicId(publicId: string) {
        return await this.cloudinaryImageRepo.findByPublicId(publicId);
    }

    async deleteImageByPublicId(publicId: string) {
        return await this.cloudinaryImageRepo.deleteByPublicId(publicId);
    }

    async updateImageByPublicId(publicId: string, updatedData: Partial<ICloudinaryImage>) {
        return await this.cloudinaryImageRepo.updateByPublicId(publicId, updatedData);
    }
}