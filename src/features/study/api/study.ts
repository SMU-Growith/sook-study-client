import { apiClient, type ApiResponse } from "@/lib/api/";
import type {
  TStudyApplySchema,
  TStudySchema,
} from "@/features/study/validators/study";
import type { HomeStudyListResult, HomeStudyResult } from "./studyType";

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
  const response = await apiClient.get<ApiResponse<HomeStudyListResult>>(
    `/studies?page=${page}&size=${size}&sort=${sort}`
  );
  return response.data.result.studyPreviews;
};
