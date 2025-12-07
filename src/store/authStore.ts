import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  nickname: string | null;
  isLeader: boolean;
  login: (nickname: string, isLeader: boolean) => void;
  logout: () => void;
  setNickName: (nickname: string) => void;
  hasWrittenLog: boolean;
  setHasWrittenLog: (hasWritten: boolean) => void;
  acceessToken?: string;
  refreshToken?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      nickname: null,
      isLeader: false,
      login: (nickname, isLeader) =>
        set({ isLoggedIn: true, nickname, isLeader }),
      logout: () => set({ isLoggedIn: false, nickname: null, isLeader: false }),
      setNickName: (nickname) => set({ nickname }),
      hasWrittenLog: false,
      setHasWrittenLog: (hasWritten) => set({ hasWrittenLog: hasWritten }),
      acceessToken: undefined,
      refreshToken: undefined,
    }),
    {
      name: "auth-status",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
