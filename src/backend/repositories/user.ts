//user-repository.ts
import UserModel, { IUser } from '@/backend/models/user';
import { UserDTO } from '@/backend/types/userDTO';
import { BaseRepository } from '@/backend/repositories/repository';
import { mapUserDTOtoEntity } from '@/backend/mappers/user';
import { UserType } from '@/backend/enums/user-type';
import { comparePassword } from '@/lib/hash/hash-password';
import { UniqueUsername } from '@/lib/hash/random-username';

// Định nghĩa giao diện của lỗi MongoDB với các thuộc tính cần thiết
interface MongoDBError extends Error {
    code?: number;
    keyPattern?: Record<string, unknown>;
    keyValue?: Record<string, unknown>;
}

// Make sure to specify UserDTO as the generic type for BaseRepository
export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        // Pass the UserModel to the BaseRepository constructor
        super(UserModel);
    }

    async create(user: UserDTO) {
        try {
            const newUser = await mapUserDTOtoEntity(user);
            newUser.username = UniqueUsername()
            newUser.userType = UserType.User;
            newUser.imageUrl = user.imageUrl ?? "https://res.cloudinary.com/desckxywr/image/upload/v1739650819/f265bbfb-abde-48ea-b4b9-c4b727aa65f9_anteze.jpg";

            // Thử tạo người dùng mới
            await UserModel.create(newUser);
            return newUser;
        } catch (error) {
            const mongoError = error as MongoDBError;
            // Bắt lỗi MongoDB, kiểm tra mã lỗi trùng lặp
            if (mongoError.code === 11000) {
                const duplicateField = mongoError.keyPattern ? Object.keys(mongoError.keyPattern)[0] : 'field';
                throw new Error(`Duplicate ${duplicateField} entered. This value already exists.`);
            }

            // Bắt các lỗi khác và trả về thông điệp lỗi
            throw new Error(mongoError.message);
        }
    }

    // async findByUsername(username: string) {
    //     const user = await UserModel.findOne({ username });
    //     if (!user) {
    //         throw new Error('User not found');
    //     }
    //     return user;
    // }

    async findByEmail(email: string) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    // Update a user by ID
    async updateByObjectId(id: string, updatedData: Partial<UserDTO>) {
        updatedData.userType = UserType.User;
        const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation is run on update
        });

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    }

    // Update a user by GUID
    async updateByGuid(guid: string, updatedData: Partial<UserDTO>) {
        const updatedUser = await UserModel.findOneAndUpdate({ guid }, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    }

    async login(email: string, password: string): Promise<IUser> {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordMatch = await comparePassword(password, user.password);

        if (!isPasswordMatch) {
            throw new Error('Invalid email or password');
        }

        return user;
    }

    async saveRefreshTokenAndIP(userId: unknown | string, refreshToken: string, deviceIp: string) {
        await UserModel.findByIdAndUpdate(userId, { refreshToken, deviceIp });
    }

    async deleteRefreshTokenIP(userId: unknown | string) {
        await UserModel.findByIdAndUpdate(userId, { refreshToken: null, deviceIp: null });
    }

    async findByRefreshToken(refreshToken: string) {
        return await UserModel.findOne({ refreshToken });
    }
}