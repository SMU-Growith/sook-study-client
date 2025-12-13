import { apiClient, type ApiResponse } from "@/lib/api/";
import type {
  TStudyApplySchema,
  TStudyLogSchema,
  TStudySchema,
} from "@/features/study/validators/study";
import type {
  EmojiCounts,
  MyApplication,
  StudyListResult,
  StudyLogDetail,
  StudyLogList,
  StudySessionDetail,
  StudySessionList,
} from "./studyType";

type StudyUpdateData = TStudySchema & { isRecruiting: boolean };

export const studyCreateApi = async (data: TStudySchema) => {
  const response = await apiClient.post("/studies", data);
  return response.data;
};

export const studyUpdateApi = async (
  studyId: number,
  data: StudyUpdateData
) => {
  const response = await apiClient.put(`/studies/${studyId}`, data);
  return response.data;
};

export const fetchStudyById = async (studyId: number) => {
  const response = await apiClient.get(`/studies/${studyId}`);
  return response.data;
};

export const studyApplyApi = async (
  studyId: number,
  data: TStudyApplySchema
) => {
  const response = await apiClient.post(
    `/studies/${studyId}/applications`,
    data
  );
  return response.data;
};

export const studyChangeLeaderApi = async (
  studyId: number,
  memberId: number
) => {
  const response = await apiClient.patch(
    `/studies/${studyId}/changeLeader?newLeaderUserId=${memberId}`
  );
  return response.data;
};

export const fetchStudyMembersApi = async (studyId: number) => {
  const response = await apiClient.get(`/studies/${studyId}/users`);
  return response.data;
};

// 홈화면 스터디 조회 API
export const HomeStudyApi = async (
  page: number,
  size: number,
  sort: string
) => {
  const response = await apiClient.get<ApiResponse<StudyListResult>>(
    `/studies?page=${page}&size=${size}&sort=${sort}`
  );
  return response.data.result.studyPreviews;
};

// 스터디 검색 API (스터디 둘러보기)
export const SearchStudyApi = async (
  studyFieldNames: string[],
  studyFormats: ("ONLINE" | "OFFLINE" | "HYBRID")[],
  studyStyleCategories: (
    | "SYSTEMATIC"
    | "FREE"
    | "COOPERATIVE"
    | "RESULT_ORIENTED"
  )[],
  studyStatus: "ACTIVE" | "CLOSED" | undefined,
  searchContent: string,
  page: number,
  size: number,
  sort: string
) => {
  const params = new URLSearchParams();
  studyFieldNames.forEach((name) =>
    params.append("studyFieldNames", String(name))
  );
  studyFormats.forEach((format) => params.append("studyFormats", format));
  studyStyleCategories.forEach((category) =>
    params.append("studyStyleCategories", category)
  );
  params.append("studyStatus", String(studyStatus));
  params.append("searchContent", searchContent);
  params.append("page", String(page));
  params.append("size", String(size));
  params.append("sort", sort);

  const response = await apiClient.get<ApiResponse<StudyListResult>>(
    `/studies/search?${params.toString()}`
  );
  return response.data.result.studyPreviews;
};

// 스터디 세션 리스트 조회 API
export const fetchStudySessionsApi = async (
  studyId: number,
  page: number,
  size: number
) => {
  const response = await apiClient.get<ApiResponse<StudySessionList>>(
    `/studies/${studyId}/sessions?page=${page}&size=${size}`
  );
  return response.data.result.studySessions;
};

// 스터디 세션 생성 API
export const createStudySessionApi = async (studyId: number, title: string) => {
  const response = await apiClient.post<ApiResponse<StudySessionDetail>>(
    `/studies/${studyId}/session`,
    {
      title,
    }
  );
  return response.data.result;
};

// 스터디 세션 수정 API
export const updateStudySessionApi = async (
  sessionId: number,
  title: string
) => {
  const response = await apiClient.put(`/studies/session/${sessionId}`, {
    title,
  });
  return response.data;
};

// 스터디 로그 리스트 조회 API
export const fetchStudyLogsApi = async (
  sessionId: number,
  page: number,
  size: number
) => {
  const response = await apiClient.get<ApiResponse<StudyLogList>>(
    `/studies/session/${sessionId}/journals?page=${page}&size=${size}`
  );
  return response.data.result;
};

// 스터디 로그 상세 조회 API
export const fetchStudyLogDetailApi = async (journalId: number) => {
  const response = await apiClient.get<ApiResponse<StudyLogDetail>>(
    `/studies/journal/${journalId}`
  );
  return response.data.result;
};

// 스터디 로그 생성 API
export const createStudyLogApi = async (
  sessionId: number,
  data: TStudyLogSchema
) => {
  const response = await apiClient.post<ApiResponse<StudyLogDetail>>(
    `/studies/session/${sessionId}/journal`,
    data
  );
  return response.data.result;
};

// 스터디 로그 수정 API
export const updateStudyLogApi = async (
  journalId: number,
  data: TStudyLogSchema
) => {
  const response = await apiClient.put<ApiResponse<StudyLogDetail>>(
    `/studies/journal/${journalId}`,
    data
  );
  return response.data.result;
};

// 스터디 로그 삭제 API
export const deleteStudyLogApi = async (journalId: number) => {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/studies/journal/${journalId}`
  );
  return response.data;
};

// 스터디 일지 반응 API
export const toggleStudyLogEmojiApi = async (
  studyJournalId: number,
  emojiType: string
) => {
  const response = await apiClient.patch<ApiResponse<EmojiCounts>>(
    `/studies/journals/${studyJournalId}/emoji`,
    {
      emojiType,
    }
  );
  return response.data.result;
};

// 스터디 지원내역 API
export const fetchMyApplicationsApi = async () => {
  const response = await apiClient.get<ApiResponse<MyApplication[]>>(
    `/studies/my-applications`
  );
  return response.data.result;
};

// 스터디 지원취소 API
export const deleteStudyApplicationApi = async (applicationId: number) => {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/studies/applications/${applicationId}`
  );
  return response.data;
};
