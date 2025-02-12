// lib/mappers.ts
import { UserDTO, UserWithOutPasswordDTO } from '@/backend/types/userDTO';
import { IUser } from '@/backend/models/user';

// Function to map UserDTO to UserEntity
export async function mapUserDTOtoEntity(dto: UserDTO): Promise<IUser> {
    return {
        username: dto.username,
        password: dto.password,
    } as IUser;
}

export async function mapEntitytoUserDTO(entity: IUser): Promise<UserDTO> {
    return {
        username: entity.username,
        userType: entity.userType,
    } as UserDTO;
}

export async function mapListEntitytoUserDTO(entities: IUser[]): Promise<UserWithOutPasswordDTO[]> {
    return entities.map(entity => {
        return {
            username: entity.username,
        } as UserWithOutPasswordDTO;
    });
}