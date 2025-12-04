import { z } from 'zod';

// 회원가입
const allowedEmailDomains = ['sookmyung.ac.kr', 'sm.ac.kr'];

export const signUpStep1Schema = z.object({
  id: z.string().nonempty('아이디를 입력해주세요'),
  password: z.string().nonempty('패스워드를 입력해주세요'),
  email: z.email('올바른 이메일 형식이 아닙니다.').refine((email) => {
    const domain = email.split('@')[1];
    return allowedEmailDomains.includes(domain);
  }, '숙명여대 이메일만 사용 가능합니다.'),
  verificationCode: z.string().length(5, '인증번호 5자리를 입력해주세요.'),
});

export type TSignUpStep1Schema = z.infer<typeof signUpStep1Schema>;

export const signUpStep2Schema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요.').max(15, '닉네임은 15자 이하여야 합니다.'),
  studentStatus: z.string().nonempty('재학 상태를 선택해주세요.'),
  major: z.string().nonempty('전공을 선택해주세요.'),
  phoneNumber: z
    .string()
    .nonempty('전화번호를 입력해주세요.')
    .regex(/^010-\d{4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다. (010-1234-5678)'),
});

export type TSignUpStep2Schema = z.infer<typeof signUpStep2Schema>;

// 로그인
export const loginSchema = z.object({
  id: z.string().nonempty('아이디를 입력해주세요.'),
  password: z.string().nonempty('패스워드를 입력해주세요.'),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

// [lf] 내 정보 조회
export const myInfoSchema = z.object({
  id: z.string(),
  email: z.email(),
  nickname: z.string(),
  studentStatus: z.string(),
  major: z.string(),
  phoneNumber: z.string(),
});
export type TMyInfo = z.infer<typeof myInfoSchema>;

// 프로필
export const myProfileSchema = z.object({
  id: z.string(),
  nickname: z.string().min(1, '닉네임을 입력해주세요.').max(15, '닉네임은 15자 이하여야 합니다.'),
  studentStatus: z.string().nonempty('재학 상태를 선택해주세요.'),
  major: z.string().nonempty('전공을 선택해주세요.'),
  phoneNumber: z
    .string()
    .nonempty('전화번호를 입력해주세요.')
    .regex(/^010-\d{4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다. (010-1234-5678)'),
  studyPreferences: z.array(z.string()).min(1, '최소 하나 이상의 스터디 성향을 선택해주세요.'),
  notificationsEnabled: z.boolean(),
});
export type TProfile = z.infer<typeof myProfileSchema>;
