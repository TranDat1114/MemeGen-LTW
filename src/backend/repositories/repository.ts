// lib/repository.ts
import { Document, Model } from 'mongoose';

export class BaseRepository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    // query

    async findById(id: number): Promise<T> {
        const data = await this.model.findOne().where('_id').equals(id);
        if (!data) {
            throw new Error('Data not found');
        }
        return data;
    }

    async findByGuid(guid: string): Promise<T> {
        const data = await this.model.findOne().where('guid').equals(guid);
        if (!data) {
            throw new Error('Data not found');
        }
        return data;
    }

    async findByObjectId(objectId: string): Promise<T> {
        const data = await this.model.findById(objectId);
        if (!data) {
            throw new Error('Data not found');
        }
        return data;
    }

    async findAll(): Promise<T[]> {
        return await this.model.find({});
    }

    // command

    // Soft delete a user by marking `isDeleted` as true
    async softDeleteByObjectId(id: string) {
        const deletedUser = await this.model.findByIdAndUpdate(
            id,
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );

        if (!deletedUser) {
            throw new Error('User not found');
        }

        return deletedUser;
    }

    // Hard delete a user by removing from the database
    async hardDeleteByObjectId(id: string) {
        const deletedUser = await this.model.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new Error('User not found');
        }

        return deletedUser;
    }
}