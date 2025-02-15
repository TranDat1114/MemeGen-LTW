// types/userDTO.ts
export interface UserDTO {
    email: string;
    imageUrl?: string;
    password: string;
    userType?: string;
}

export interface UserWithOutPasswordDTO {
    username: string;
    email: string;
    imageUrl?: string;
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

export interface UserRegisterRes {
    email: string;
    userType?: string;
    username: string;
    //pass
}