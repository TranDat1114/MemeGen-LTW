import CryptoJS from 'crypto-js';
interface JWTPayload extends JWTPayloadDTO {
    iat: number;             // Thời gian token được phát hành (issued at)
    exp: number;             // Thời gian token hết hạn (expiration)
}
interface JWTPayloadDTO {
    userId?: string | unknown;          // ID của người dùng
    username?: string;        // Tên người dùng
    email?: string;           // Địa chỉ email của người dùng
    roles?: string[];         // Danh sách quyền (roles) của người dùng
}

const generateJWT = (jwtpayload: JWTPayloadDTO, secret: string, expiresIn: number) => {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    const payload: JWTPayload = {
        userId: jwtpayload.userId,
        username: jwtpayload.username,
        email: jwtpayload.email,
        roles: jwtpayload.roles,
        iat: Math.floor(Date.now() / 1000), // Thời gian hiện tại
        exp: Math.floor(Date.now() / 1000) + expiresIn // Thời gian hết hạn
    };

    const encodedHeader = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(header)));
    const encodedPayload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(payload)));

    const signature = CryptoJS.HmacSHA256(encodedHeader + "." + encodedPayload, secret)
        .toString(CryptoJS.enc.Base64)
        .replace(/=+$/, '');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Xác thực JWT
const verifyJWT = (token: string, secret: string) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        console.log('Token is not valid');
        return null;
    }
    const [encodedHeader, encodedPayload, signature] = parts;

    // Xác thực chữ ký
    const validSignature = CryptoJS.HmacSHA256(encodedHeader + "." + encodedPayload, secret)
        .toString(CryptoJS.enc.Base64)
        .replace(/=+$/, '');
    if (validSignature !== signature) {
        console.log('Signature is not valid');
        return null;
    }

    const decodedPayload = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedPayload)));

    // Kiểm tra thời gian hết hạn
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
        console.log('Token has expired');
        return null;
    }

    return decodedPayload;
}

export { generateJWT, verifyJWT };