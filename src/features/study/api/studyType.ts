import { int } from "zod";

export interface StudyMember {
  userId: number;
  nickName: string;
  studentStatus: string;
  major: string;
  phoneNumber: string;
  motivation: string;
  studyRole: string;
  personalityType: string;
}

export type RuleCategory = "TIME" | "FINE" | "DAY_OFF" | "ATMOSPHERE" | "ETC";
export type RuleCategoryLabel = "시간" | "벌금" | "휴무" | "분위기" | "기타";
export type ApplicationStatus = "ACCEPTED" | "PENDING" | "REJECTED";

export interface Rules {
  ruleCategory: RuleCategory;
  description: string;
}

export interface RulesLabel {
  ruleCategory: RuleCategoryLabel;
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
  personalityType: string;
}

export interface StudyResult {
  studyId: number;
  title: string;
  description: string;
  studyStatus: "ACTIVE" | "CLOSED";
  isRecruiting: boolean;
  userId: number;
  nickname: string;
  isScraped: boolean;
  scrapCount: number;
  studyFormat: string;
  studyFieldName: string;
  studyStyleCategory: string;
}

export interface StudyListResult {
  studyPreviews: StudyResult[];
  listSize: number;
}

// 스터디 상세 조회
export interface StudyDetail {
  title: string;
  description: string;
  studyStatus: "ACTIVE" | "CLOSED";
  contactType: string;
  url: string;
  isRecruiting: boolean;
  isMyStudy: boolean;
  studyFieldName: string;
  studyFormat: string;
  studyStyleCategory: string;
  ruleDTO: RulesLabel[];
  userId: number;
  nickname: string;
  isScraped: boolean;
  createdAt: string;
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
  applicationStatus: ApplicationStatus;
}

export interface ToggleScrap {
  studyId: number;
  isScraped: boolean;
  scrapCount: number;
}

export interface StampList {
  inProgressCount: number;
  completedCount: number;
  stamps: Stamp[];
}

export interface Stamp {
  stampType: "WELCOME" | "LEADER" | "RECORD" | "CHEER" | "SUPERSTAR";
  stampName: string;
  description: string;
  achievedLevel: "NONE" | "LEVEL_1" | "LEVEL_2";
  isAchieved: boolean;
  isCompleted: boolean;
  levels: Level[];
}

export interface Level {
  stampId: number;
  level: "NONE" | "LEVEL_1" | "LEVEL_2";
  levelName: string;
  levelDescription: string;
  isAchieved: boolean;
}

export interface MyStudy {
  studyId: number;
  studyRole: "LEADER" | "MEMBER";
  title: string;
  studyStatus: "ACTIVE" | "CLOSED";
  userId: number;
  url: string;
  memberCount: number;
  studySessionCount: number;
  studyFormat: string;
  studyFieldName: string;
  studyStyleCategory: string;
}

export interface MyStudyDetail {
  studyId: number;
  myRole: "LEADER" | "MEMBER";
}

export interface RespondToStudyApplication {
  applicationId: number;
  studyId: number;
  applicationStatus: ApplicationStatus;
}

export interface PreferenceSave {
  mesage: string;
  typeName: string;
}

export interface QuestionAnswer {
  answers: QuestionAnswerItem[];
}

export interface QuestionAnswerItem {
  questionId: number;
  optionId: number;
}

export interface PreferenceResult {
  testId: number;
  resultType: {
    typeCode: string;
    typeName: string;
    typeCategory: string;
    tagline: string;
    description: string;
    caution: string;
  };
  scores: {
    plannedCount: number;
    freeCount: number;
    cooperativeCount: number;
    achievementCount: number;
  };
}
