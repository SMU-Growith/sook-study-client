import { z } from "zod";

export const studyStep1Schema = z.object({
  studyField: z.string().min(1, "스터디 분야를 선택해주세요."),
  studyType: z.string().min(1, "스터디 성향을 선택해주세요."),
  progressMethod: z.string().min(1, "진행 방식을 선택해주세요."),
  contactMethod: z.string().min(1, "연락 방식을 입력해주세요."),
  contactInfo: z.string().min(1, "연락 정보를 입력해주세요."),
});

export const studyStep2Schema = z.object({
  name: z
    .string()
    .min(10, "스터디 이름은 10자 이상 입력해주세요.")
    .max(50, "스터디 이름은 50자 이하로 입력해주세요."),
  introduction: z.string().min(10, "스터디 소개를 10자 이상 입력해주세요."),
});

export const studyStep3Schema = z.object({
  rules: z.record(z.string(), z.string()).optional(),
});

export const studyCreateSchema = studyStep1Schema
  .and(studyStep2Schema)
  .and(studyStep3Schema);

export type TStudySchema = z.infer<typeof studyCreateSchema>;

export const studyApplySchema = z.object({
  studentStatus: z.string().min(1, "재학 상태를 선택해주세요."),
  major: z.string().min(1, "전공을 선택해주세요."),
  phoneNumber: z
    .string()
    .nonempty("전화번호를 입력해주세요.")
    .regex(
      /^010-\d{4}-\d{4}$/,
      "올바른 전화번호 형식이 아닙니다. (010-1234-5678)"
    ),
  motivation: z
    .string()
    .min(10, "지원 동기를 10자 이상 입력해주세요.")
    .max(150, "지원 동기는 150자 이하로 입력해주세요."),
});
export type TStudyApplySchema = z.infer<typeof studyApplySchema>;

// 세션 생성/수정
export const studySessionSchema = z.object({
  title: z.string().nonempty("스터디 일지 제목을 입력해주세요."),
});
export type TStudySessionSchema = z.infer<typeof studySessionSchema>;

// 로그 생성/수정
export const studyLogSchema = z.object({
  content: z.string().nonempty("스터디 일지 내용을 입력해주세요."),
  url: z.url("올바른 URL 형식이 아닙니다.").optional().or(z.literal("")),
});

export type TStudyLogSchema = z.infer<typeof studyLogSchema>;
