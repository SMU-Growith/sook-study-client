export interface StudyMember {
  userId: number;
  nickname: string;
  studentStatus: string;
  major: string;
  phoneNumber: string;
  motivation: string;
  studyRole: string;
}

export type RuleCategory = "TIME" | "FINE" | "DAY_OFF" | "ATMOSPHERE" | "ETC";

export interface Rules {
  ruleCategory: RuleCategory;
  description: string;
}

export const RULE_TAG_OPTIONS: { key: RuleCategory; label: string }[] = [
  { key: "TIME", label: "시간" },
  { key: "FINE", label: "벌금" },
  { key: "DAY_OFF", label: "휴무" },
  { key: "ATMOSPHERE", label: "분위기" },
  { key: "ETC", label: "기타" },
];

export interface Applier {
  applicationId: number;
  studyId: number;
  userId: number;
  nickName: string;
  studentStatus: string;
  major: string;
  phoneNumber: string;
  motivation: string;
  applicationStatus: string;
}

export interface StudyResult {
  studyId: number;
  title: string;
  description: string;
  studyStatus: "ACTIVE" | "CLOSED" | "ALL";
  userId: number;
  isScraped: boolean;
  scrapCount: number;
  studyFormat: "ONLINE" | "OFFLINE" | "HYBRID";
  studyFieldId: number;
  studyFieldName: string;
  studyStyleCategory: "SYSTEMATIC" | "FREE" | "COOPERATIVE" | "RESULT_ORIENTED";
}

export interface StudyListResult {
  studyPreviews: StudyResult[];
  listSize: number;
}
