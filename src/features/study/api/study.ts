import { apiClient, type ApiResponse } from "@/lib/api/";
import type {
  TStudyApplySchema,
  TStudySchema,
} from "@/features/study/validators/study";
import type {
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
