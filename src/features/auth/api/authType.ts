export interface LoginResult {
  userId: number;
  nickName: string;
  email: string;
  major: string;
  studentStatus: "JOB_SEEKING" | "ENROLLED" | "ON_LEAVE" | "EMPLOYED";
  phoneNumber: string;
  accessToken: string;
  refreshToken: string;
}

export interface ProfileResult {
  nickName: string;
  studentStatus: string;
  major: string;
  studyStyle: string;
  phoneNumber: string;
  noticeYn: boolean;
}
