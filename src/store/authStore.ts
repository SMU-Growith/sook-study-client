import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  nickname: string | null;
  login: (nickname: string) => void;
  logout: () => void;
  setNickName: (nickname: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      nickname: null,
      login: (nickname) => set({ isLoggedIn: true, nickname }),
      logout: () => set({ isLoggedIn: false, nickname: null }),
      setNickName: (nickname) => set({ nickname }),
    }),
    {
      name: 'auth-status',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
