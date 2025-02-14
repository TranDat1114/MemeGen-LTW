// validators/userValidator.ts
import Joi from 'joi';
import { UserDTO, UserLoginDTO } from '@/backend/types/userDTO';
import { UserType } from '@/backend/enums/user-type';

export const UserDTOValidationSchema = Joi.object<UserDTO>({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    userType: Joi.string().valid(...Object.values(UserType)).default(UserType.User).optional(),
    password: Joi.string().min(6).required()
});

export const UserLoginValidationSchema = Joi.object<UserLoginDTO>({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).required()
});