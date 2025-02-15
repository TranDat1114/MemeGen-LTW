import { v4 as uuidv4 } from 'uuid';
export function UniqueUsername() {
    return `user-${uuidv4().slice(0, 8)}`; // Cắt 8 ký tự đầu của UUID
}