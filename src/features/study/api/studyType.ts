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
