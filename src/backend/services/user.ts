// services/userService.ts
import { hashPassword } from '@/lib/hash/hash-password';
import { generateTokens } from '@/lib/jwt/handle-token';
import { mapEntitytoUserDTO, mapListEntitytoUserDTO } from '@/backend/mappers/user';
import { UserRepository } from '@/backend/repositories/user';
import { UserDTO } from '@/backend/types/userDTO';
import { UniqueUsername } from '@/lib/hash/random-username';



export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userDTO: UserDTO) {
        userDTO.password = await hashPassword(userDTO.password);
        const user = await this.userRepository.create(userDTO);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return mapListEntitytoUserDTO(users);
    }

    // async getUserByUsername(username: string) {
    //     return await this.userRepository.findByUsername(username);
    // }

    async getUserByEmail(email: string) {
        return await this.userRepository.findByEmail(email);
    }

    async getUserById(id: number) {
        return await this.userRepository.findById(id);
    }

    async getUserByGuid(guid: string) {
        return await this.userRepository.findByGuid(guid);
    }

    async getUserByObjectId(objectId: string) {
        return await this.userRepository.findByObjectId(objectId);
    }

    async updateUserByObjectId(objectId: string, updatedData: Partial<UserDTO>) {
        return await this.userRepository.updateByObjectId(objectId, updatedData);
    }

    async deleteUserByObjectId(objectId: string) {
        return await this.userRepository.softDeleteByObjectId(objectId);
    }

    async loginUser(username: string, password: string, ip: string) {
        const loginResult = await this.userRepository.login(username, password);
        if (loginResult) {
            // Tạo Access Token và Refresh Token
            const tokens = generateTokens(loginResult);
            // Luu Refresh Token vào cơ sở dữ liệu
            await this.saveRefreshTokenAndIp(loginResult._id, tokens.refreshToken, ip);

            const user = await mapEntitytoUserDTO(loginResult);
            // Trả về thông tin người dùng cùng với token
            return { user, ...tokens };
        }

        return null;
    }

    async loginWithGoogle(email: string, ip: string, photoURL?: string) {
        const user = await this.getUserByEmail(email);
        if (user) {
            // Tạo Access Token và Refresh Token
            const tokens = generateTokens(user);
            // Luu Refresh Token vào cơ sở dữ liệu
            await this.saveRefreshTokenAndIp(user._id, tokens.refreshToken, ip);

            const mapUser = await mapEntitytoUserDTO(user);

            return { userLoginRes: { user: mapUser, ...tokens }, newUser: false };
        } else {
            const newUser = { email, password: UniqueUsername(), imageUrl: photoURL };
            const createdUser = await this.createUser(newUser)
            console.log(createdUser);
            const tokens = generateTokens(createdUser);
            await this.saveRefreshTokenAndIp(createdUser._id, tokens.refreshToken, ip);

            const mapUser = await mapEntitytoUserDTO(createdUser);

            return { userLoginRes: { user: mapUser, ...tokens }, newUser: true };
        }
    }

    // Lưu Refresh Token vào cơ sở dữ liệu
    async saveRefreshTokenAndIp(user_Id: unknown | string, refreshToken: string, ip: string) {
        return await this.userRepository.saveRefreshTokenAndIP(user_Id, refreshToken, ip);
    };

    async deleteRefreshTokenAndIP(user_Id: unknown | string) {
        return await this.userRepository.deleteRefreshTokenIP(user_Id);
    }

    async findByRefreshToken(refreshToken: string) {
        return await this.userRepository.findByRefreshToken(refreshToken);
    }
}