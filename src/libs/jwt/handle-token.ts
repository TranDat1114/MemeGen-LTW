
import { IUser } from '@/backend/models/user';
import { generateJWT, verifyJWT } from '@/libs/jwt/handle-jwt';

// Secret keys (thay thế bằng giá trị thực trong file .env)
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'yourrefreshtokensecret';

// Thời gian tồn tại của token
export const ACCESS_TOKEN_LIFETIME = 15 * 60; // 15 minutes in seconds
export const REFRESH_TOKEN_LIFETIME = 30 * 24 * 60 * 60; // 30 days in seconds

const generateTokens = (user: IUser) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { accessToken, refreshToken };
}
const generateAccessToken = (user: IUser) => {
    return generateJWT({
        userId: user._id,
        username: user.username
    }, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFETIME);
}

const generateRefreshToken = (user: IUser) => {
    return generateJWT({
        userId: user._id,
        username: user.username
    }, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFETIME);
}

const verifyAccessToken = (token: string) => {
    try {
        return verifyJWT(token, ACCESS_TOKEN_SECRET) as { userId: string, iat: number, exp: number };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const verifyRefreshToken = (token: string) => {
    try {
        return verifyJWT(token, REFRESH_TOKEN_SECRET) as { userId: string, iat: number, exp: number };
    } catch (error) {
        console.log(error);
        return null;
    }
}



export { generateTokens, generateRefreshToken, generateAccessToken, verifyRefreshToken, verifyAccessToken };