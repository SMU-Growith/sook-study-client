import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  nickname: string | null;
  isLeader: boolean;
  login: (nickname: string, isLeader: boolean) => void;
  logout: () => void;
  setNickName: (nickname: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      nickname: null,
      isLeader: false,
      login: (nickname, isLeader) => set({ isLoggedIn: true, nickname, isLeader }),
      logout: () => set({ isLoggedIn: false, nickname: null, isLeader: false }),
      setNickName: (nickname) => set({ nickname }),
    }),
    {
      name: 'auth-status',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
