// types/userDTO.ts
export interface UserDTO {
    username: string;
    email: string;
    imageUrl?: string;
    password: string;
    userType?: string;
}

export interface UserWithOutPasswordDTO {
    username: string;
    email: string;
    userType?: string;
}

export interface UserLoginDTO {
    username: string;
    password: string;
}

export interface UserLoginRes {
    user: UserWithOutPasswordDTO;
    accessToken: string;
}