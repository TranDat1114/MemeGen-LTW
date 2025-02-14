import bcrypt from 'bcryptjs';

const saltRounds = 10;

// Băm mật khẩu
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// Kiểm tra mật khẩu (so sánh với mật khẩu đã băm)
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

// Ví dụ sử dụng
// (async () => {
//     const password = 'your_password';
//     const hashed = await hashPassword(password);
//     console.log('Mật khẩu đã băm:', hashed);

//     const isValid = await comparePassword(password, hashed);
//     console.log('Mật khẩu khớp:', isValid);
// })();