// models/base-entity.ts
import { getNextSequenceValue } from '@/libs/mongodb';
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Interface for the BaseEntity
export interface IBaseEntity extends Document {
    id: number;
    guid: string;
    createdAt: Date;
    deletedAt?: Date;
    isActivate: boolean;
    isDeleted: boolean;
}

// Create the base schema
const BaseEntitySchema: Schema<IBaseEntity> = new Schema(
    {
        guid: {
            type: String,
            default: uuidv4, // Automatically generate GUID
            unique: true, // Set to unique
        },
        id: {
            type: Number,
            unique: true, // Auto-incrementing ID
        },
        createdAt: {
            type: Date,
            default: Date.now, // Automatically set createdAt timestamp
        },
        deletedAt: {
            type: Date, // Timestamp when the document is soft-deleted
        },
        isActivate: {
            type: Boolean,
            default: true, // Set to true by default
        },
        isDeleted: {
            type: Boolean,
            default: false, // Set to false by default (indicating not deleted)
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

// Middleware to auto-increment the `id` field before saving
BaseEntitySchema.pre<IBaseEntity>('save', async function (next) {
    if (this.isNew) {
        this.id = await getNextSequenceValue('BaseEntity');
    }
    next();
});

// Check if the model already exists to prevent overwriting
const BaseEntity = mongoose.models.BaseEntity || mongoose.model<IBaseEntity>('BaseEntity', BaseEntitySchema);
export default BaseEntity;