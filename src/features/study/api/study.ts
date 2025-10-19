import { apiClient } from '@/lib/api/';
import type { TStudyApplySchema, TStudySchema } from '@/features/study/validators/study';

type StudyUpdateData = TStudySchema & { isRecruiting: boolean };

export const studyCreateApi = async (data: TStudySchema) => {
  const response = await apiClient.post('/studies', data);
  return response.data;
};

export const studyUpdateApi = async (studyId: number, data: StudyUpdateData) => {
  const response = await apiClient.put(`/studies/${studyId}`, data);
  return response.data;
};

export const fetchStudyById = async (studyId: number) => {
  const response = await apiClient.get(`/studies/${studyId}`);
  return response.data;
};

export const studyApplyApi = async (studyId: number, data: TStudyApplySchema) => {
  const response = await apiClient.post(`/studies/${studyId}/applications`, data);
  return response.data;
};
