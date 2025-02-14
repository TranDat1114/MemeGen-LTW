// types/userDTO.ts
export interface UserDTO {
    email: string;
    imageUrl?: string;
    password: string;
    userType?: string;
}

export interface UserWithOutPasswordDTO {
    email: string;
    userType?: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface UserLoginRes {
    user: UserWithOutPasswordDTO;
    accessToken: string;
}