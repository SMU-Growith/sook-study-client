import { apiClient, type ApiResponse } from "@/lib/api/";
import type {
  StudyCreateRequest,
  TStudyApplySchema,
  TStudyLogSchema,
  StudyUpdateRequest,
} from "@/features/study/validators/study";
import type {
  ApplicationStatus,
  Applier,
  EmojiCounts,
  MyApplication,
  MyStudy,
  MyStudyDetail,
  PreferenceResult,
  PreferenceSave,
  QuestionAnswer,
  RespondToStudyApplication,
  RulesLabel,
  StampList,
  StudyDetail,
  StudyListResult,
  StudyLogDetail,
  StudyLogList,
  StudyMember,
  StudySessionDetail,
  StudySessionList,
  ToggleScrap,
} from "./studyType";

// 스터디 생성 API
export const studyCreateApi = async (data: StudyCreateRequest) => {
  const response = await apiClient.post<ApiResponse<StudyDetail>>(
    "/studies",
    data
  );
  return response.data.result;
};

// 스터디 수정 API
export const studyUpdateApi = async (
  studyId: number,
  data: StudyUpdateRequest
) => {
  const response = await apiClient.put(`/studies/${studyId}`, data);
  return response.data;
};

export const fetchStudyById = async (studyId: number) => {
  const response = await apiClient.get<ApiResponse<StudyDetail>>(
    `/studies/${studyId}`
  );
  return response.data.result;
};

export const studyApplyApi = async (
  studyId: number,
  data: TStudyApplySchema
) => {
  const response = await apiClient.post(
    `/studies/${studyId}/application`,
    data
  );
  return response.data.result;
};

// 내 스터디 상세 조회 API
export const fetchMyStudyDetailApi = async (studyId: number) => {
  const response = await apiClient.get<ApiResponse<MyStudyDetail>>(
    `/studies/${studyId}/me`
  );
  return response.data.result;
};

// 스터디 리더 변경 API
export const studyChangeLeaderApi = async (
  studyId: number,
  memberId: number
) => {
  const response = await apiClient.patch<ApiResponse<null>>(
    `/studies/${studyId}/changeLeader?newLeaderUserId=${memberId}`
  );
  return response.data.result;
};

// 스터디 멤버 조회 API
export const fetchStudyMembersApi = async (studyId: number) => {
  const response = await apiClient.get<ApiResponse<StudyMember[]>>(
    `/studies/${studyId}/users`
  );
  return response.data.result;
};

// 규칙 조회 API
export const fetchStudyRulesApi = async (studyId: number) => {
  const response = await apiClient.get<ApiResponse<RulesLabel[]>>(
    `/studies/${studyId}/rules`
  );
  return response.data.result;
};

// 규칙 수정 API
export const updateStudyRulesApi = async (
  studyId: number,
  rules: RulesLabel[]
) => {
  const response = await apiClient.put<ApiResponse<null>>(
    `/studies/${studyId}/rules`,
    { rules }
  );
  return response.data.result;
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
  studyFormats: string[],
  studyStyleCategories: string[],
  isRecruiting: boolean | null,
  searchContent: string,
  page: number,
  size: number,
  sort: string
) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("size", String(size));
  params.append("sort", sort);

  const body = {
    studyFieldNames,
    studyFormats,
    studyStyleCategories,
    isRecruiting,
    searchContent,
  };

  const response = await apiClient.post<ApiResponse<StudyListResult>>(
    `/studies/search?${params.toString()}`,
    body
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

// 스터디 스크랩 API
export const toggleStudyScrapApi = async (studyId: number) => {
  const response = await apiClient.post<ApiResponse<ToggleScrap>>(
    `/studies/${studyId}/scrap/toggle`
  );
  return response.data.result;
};

// 스탬프 조회 API
export const fetchStudyStampsApi = async (userId?: number) => {
  const response = await apiClient.get<ApiResponse<StampList>>(
    "/users/stamps",
    {
      params: userId != null ? { userId } : undefined,
    }
  );
  return response.data.result;
};

// 나의 스터디 조회 API
export const fetchMyStudiesApi = async (
  page: number,
  size: number,
  studyStatus: string
) => {
  const response = await apiClient.post<ApiResponse<MyStudy[]>>(
    `/studies/my-studies`,
    { studyStatus },
    { params: { page, size } }
  );

  return response.data.result;
};

// 스터디 지원내역 조회 API
export const fetchMyApplicationsListApi = async (studyId: number) => {
  const response = await apiClient.get<ApiResponse<Applier[]>>(
    `/studies/${studyId}/applications`
  );
  return response.data.result;
};

// 스터디 승인/거절 API
export const respondToStudyApplicationApi = async (
  applicationId: number,
  status: ApplicationStatus
) => {
  const response = await apiClient.patch<
    ApiResponse<RespondToStudyApplication>
  >(`/studies/${applicationId}/status`, { status });
  return response.data.result;
};

// 스터디 나가기
export const studyLeaveApi = async (studyId: number) => {
  const response = await apiClient.patch<ApiResponse<null>>(
    `/studies/${studyId}/withdraw`
  );
  return response.data.result;
};

// 스터디 종료하기
export const studyFinishApi = async (studyId: number) => {
  const response = await apiClient.patch<ApiResponse<null>>(
    `/studies/${studyId}/close`
  );
  return response.data.result;
};

// 스터디 성향 테스트 결과보기
export const saveStudyPreferenceResultApi = async (
  resultData: QuestionAnswer
) => {
  const response = await apiClient.post<ApiResponse<PreferenceResult>>(
    `/personality-test/submit`,
    resultData
  );
  return response.data.result;
};

// 스터디 성향 테스트 프로필 저장
export const saveStudyPreferenceProfileApi = async (testId: number) => {
  const response = await apiClient.post<ApiResponse<PreferenceSave>>(
    `/personality-test/${testId}/save`
  );
  return response.data.result;
};
