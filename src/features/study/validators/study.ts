import { z } from 'zod';

export const studyStep1Schema = z.object({
  studyField: z.string().min(1, '스터디 분야를 선택해주세요.'),
  studyType: z.string().min(1, '스터디 성향을 선택해주세요.'),
  progressMethod: z.string().min(1, '진행 방식을 선택해주세요.'),
  contactMethod: z.string().min(1, '연락 방식을 입력해주세요.'),
  contactInfo: z.string().min(1, '연락 정보를 입력해주세요.'),
});

export const studyStep2Schema = z.object({
  name: z
    .string()
    .min(10, '스터디 이름은 10자 이상 입력해주세요.')
    .max(50, '스터디 이름은 50자 이하로 입력해주세요.'),
  introduction: z.string().min(10, '스터디 소개를 10자 이상 입력해주세요.'),
});

export const studyStep3Schema = z.object({
  rules: z.record(z.string(), z.string()).optional(),
});

export const studyCreateSchema = studyStep1Schema.and(studyStep2Schema).and(studyStep3Schema);

export type TStudySchema = z.infer<typeof studyCreateSchema>;
