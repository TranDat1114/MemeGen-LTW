// models/user.ts
import { Schema, model, models } from 'mongoose';
import BaseEntity, { IBaseEntity } from '@/backend/models/base-entity';
import { UserType } from '@/backend/enums/user-type';
export interface IUser extends Document, IBaseEntity {
    username?: string;
    email: string;
    password: string;
    imageUrl?: string;
    deviceIp?: string;
    userType: UserType;
    refreshToken?: string;
}


const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    userType: {
        type: String,
        enum: Object.values(UserType),
        default: UserType.User,
        required: true,
    },
    refreshToken: {
        type: String
    },
    deviceIp: {
        type: String
    }
});

UserSchema.add(BaseEntity.schema);

export default models.User || model<IUser & IBaseEntity>('User', UserSchema);