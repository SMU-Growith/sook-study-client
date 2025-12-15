import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type StudentStatus = "JOB_SEEKING" | "ENROLLED" | "ON_LEAVE" | "EMPLOYED";

interface AuthState {
  isLoggedIn: boolean;
  nickname: string | null;
  email: string | null;
  major: string | null;
  studentStatus: StudentStatus | null;
  phoneNumber: string | null;

  isLeader: boolean;

  accessToken?: string;
  refreshToken?: string;

  hasWrittenLog: boolean;

  login: (
    nickname: string,
    email: string,
    major: string,
    studentStatus: StudentStatus,
    phoneNumber: string
  ) => void;

  logout: () => void;

  setNickname: (nickname: string) => void;
  setHasWrittenLog: (hasWritten: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      nickname: null,
      email: null,
      major: null,
      studentStatus: null,
      phoneNumber: null,

      isLeader: false,

      accessToken: undefined,
      refreshToken: undefined,

      hasWrittenLog: false,

      login: (nickname, email, major, studentStatus, phoneNumber) =>
        set({
          isLoggedIn: true,
          nickname,
          email,
          major,
          studentStatus,
          phoneNumber,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          nickname: null,
          email: null,
          major: null,
          studentStatus: null,
          phoneNumber: null,
          isLeader: false,
          accessToken: undefined,
          refreshToken: undefined,
          hasWrittenLog: false,
        }),

      setNickname: (nickname) => set({ nickname }),

      setHasWrittenLog: (hasWritten) => set({ hasWrittenLog: hasWritten }),
    }),
    {
      name: "auth-status",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
