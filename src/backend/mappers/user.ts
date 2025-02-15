// lib/mappers.ts
import { UserDTO, UserWithOutPasswordDTO } from '@/backend/types/userDTO';
import { IUser } from '@/backend/models/user';

// Function to map UserDTO to UserEntity
export async function mapUserDTOtoEntity(dto: UserDTO): Promise<IUser> {
    return {
        email: dto.email,
        password: dto.password,
        userType: dto.userType,
        imageUrl: dto.imageUrl,
    } as IUser;
}

export async function mapEntitytoUserDTO(entity: IUser): Promise<UserWithOutPasswordDTO> {
    return {
        username: entity.username,
        email: entity.email,
        userType: entity.userType,
        imageUrl: entity.imageUrl,
    } as UserWithOutPasswordDTO;
}

export async function mapListEntitytoUserDTO(entities: IUser[]): Promise<UserWithOutPasswordDTO[]> {
    return entities.map(entity => {
        return {
            email: entity.email,
            userType: entity.userType,
        } as UserWithOutPasswordDTO;
    });
}