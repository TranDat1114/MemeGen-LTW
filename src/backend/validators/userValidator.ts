// validators/userValidator.ts
import Joi from 'joi';
import { UserDTO, UserLoginDTO } from '@/backend/types/userDTO';
import { UserType } from '@/backend/enums/user-type';

export const UserDTOValidationSchema = Joi.object<UserDTO>({
    email: Joi.string().email().required(),
    userType: Joi.string().valid(...Object.values(UserType)).default(UserType.User).optional(),
    password: Joi.string().min(6).required()
});

export const UserLoginValidationSchema = Joi.object<UserLoginDTO>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});