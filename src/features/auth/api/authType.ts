export interface LoginResult {
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
