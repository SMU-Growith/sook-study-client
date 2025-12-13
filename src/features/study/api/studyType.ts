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

export interface StudySessionDetail {
  sessionId: number;
  sessionNumber: string;
  title: string;
  submittedCount: string;
}

export interface StudySessionList {
  studySessions: StudySessionDetail[];
  totalCount: number;
}

export interface StudyLogPreview {
  journalId: number;
  title: number;
  nickName: string;
  studyRole: string;
  viewCount: string;
}

export interface StudyLogList {
  totalCount: number;
  sessionNumber: string;
  title: string;
  journals: StudyLogPreview[];
}

export interface StudyLogDetail {
  journalId: number;
  title: string;
  content: string;
  url: string;
  nickName: string;
  studyRole: "LEADER" | "MEMBER";
  viewCount: number;
  attachments: attachment[];
  emojiCounts: EmojiCounts;
  emojiStatus: EmojiStatus;
}

export interface attachment {
  attachmentId: number;
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

export interface EmojiCounts {
  heart: number;
  like: number;
  laugh: number;
  surprise: number;
  curiosity: number;
}

export interface EmojiStatus {
  heart: boolean;
  like: boolean;
  laugh: boolean;
  surprise: boolean;
  curiosity: boolean;
}

export interface MyApplication {
  applicationId: number;
  studyId: number;
  title: string;
  studyStatus: "ACTIVE" | "CLOSED";
  studyFormat: string;
  studyFieldName: string;
  studyStyleCategory: string;
  nickname: string;
  scrapCount: number;
  isScraped: boolean;
  createdAt: string;
  applicationStatus: "ACCEPTED" | "PENDING" | "REJECTED";
}
