import { MongoDBError } from "@/lib/mongodb";
import CloudinaryImageModel, { ICloudinaryImage } from "../models/cloudinary-image";
import { BaseRepository } from "./repository";

export class CloudinaryImageRepository extends BaseRepository<ICloudinaryImage> {
    constructor() {
        super(CloudinaryImageModel);
    }

    async create(image: ICloudinaryImage) {
        try {
            await CloudinaryImageModel.create(image);
            return image;
        } catch (error) {
            const mongoError = error as MongoDBError;
            if (mongoError.code === 11000) {
                const duplicateField = mongoError.keyPattern ? Object.keys(mongoError.keyPattern)[0] : 'field';
                throw new Error(`Duplicate ${duplicateField} entered. This value already exists.`);
            }

            throw new Error(mongoError.message);
        }
    }

    async deleteByObjectId(objectId: string) {
        const deletedImage = await CloudinaryImageModel.findByIdAndDelete(objectId);

        if (!deletedImage) {
            throw new Error('Image not found');
        }

        return deletedImage;
    }
    async updateByObjectId(id: string, updatedData: Partial<ICloudinaryImage>) {
        const updatedImage = await CloudinaryImageModel.findByIdAndUpdate
            (id, updatedData, {
                new: true,
                runValidators: true,
            });
        if (!updatedImage) {
            throw new Error('Image not found');
        }
        return updatedImage;
    }

    async findByPublicId(publicId: string) {
        const image = await CloudinaryImageModel.findOne({
            publicId,
        });
        if (!image) {
            return null;
        }
        return image;
    }

    async deleteByPublicId(publicId: string) {
        const deletedImage = await CloudinaryImageModel.findOneAndDelete({
            publicId,
        });
        if (!deletedImage) {
            throw new Error('Image not found');
        }
        return deletedImage;
    }

    async updateByPublicId(publicId: string, updatedData: Partial<ICloudinaryImage>) {
        const updatedImage = await CloudinaryImageModel.findOneAndUpdate({
            publicId,
        }, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedImage) {
            throw new Error('Image not found');
        }
        return updatedImage;
    }

}
