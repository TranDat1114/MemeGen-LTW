// lib/mappers.ts
import { UserDTO, UserWithOutPasswordDTO } from '@/backend/types/userDTO';
import { IUser } from '@/backend/models/user';

// Function to map UserDTO to UserEntity
export async function mapUserDTOtoEntity(dto: UserDTO): Promise<IUser> {
    return {
        email: dto.email,
        password: dto.password,
    } as IUser;
}

export async function mapEntitytoUserDTO(entity: IUser): Promise<UserDTO> {
    return {
        email: entity.email,
        userType: entity.userType,
    } as UserDTO;
}

export async function mapListEntitytoUserDTO(entities: IUser[]): Promise<UserWithOutPasswordDTO[]> {
    return entities.map(entity => {
        return {
            email: entity.email,
            userType: entity.userType,
        } as UserWithOutPasswordDTO;
    });
}