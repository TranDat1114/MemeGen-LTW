import { UserWithOutPasswordDTO } from "@/backend/types/userDTO";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    user: UserWithOutPasswordDTO;
    setUser: (user: UserWithOutPasswordDTO) => void;
}

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: {
                username: '',
                userType: '',
                email: '',
            },
            setUser: (user: UserWithOutPasswordDTO) => {
                set({ user });
            },
            accessToken: '',
            setAccessToken: (accessToken: string) => {
                set({ accessToken });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;