import type { StudyResult } from "../api/studyType";

export const STUDY_FORMAT_LABEL: Record<StudyResult["studyFormat"], string> = {
  ONLINE: "온라인",
  OFFLINE: "오프라인",
  HYBRID: "온·오프라인 병행",
};

export const STUDY_STYLE_LABEL: Record<
  StudyResult["studyStyleCategory"],
  string
> = {
  SYSTEMATIC: "체계적인",
  FREE: "자유로운",
  COOPERATIVE: "협력적인",
  RESULT_ORIENTED: "실적중심",
};

export type StudyStatusFilter = "ALL" | "ACTIVE" | "CLOSED";

export const STUDY_STATUS_FILTER_LABEL: Record<StudyStatusFilter, string> = {
  ALL: "전체",
  ACTIVE: "모집중",
  CLOSED: "모집완료",
};
