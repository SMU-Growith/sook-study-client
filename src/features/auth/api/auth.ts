import { apiClient } from '@/lib/api/';
import type {
  TLoginSchema,
  TSignUpStep1Schema,
  TSignUpStep2Schema,
} from '@/features/auth/validators/auth';

type SignUpData = Omit<TSignUpStep1Schema, 'verificationCode'> & TSignUpStep2Schema;

export const requestEmailCodeApi = async (email: string) => {
  const response = await apiClient.post('/auth/email-verifications', { email });
  return response.data;
};

export const checkEmailCodeApi = async ({
  email,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
}) => {
  const response = await apiClient.post('/auth/check-email-verifications', {
    email,
    code: verificationCode,
  });
  return response.data;
};

export const signUpApi = async (data: SignUpData) => {
  const response = await apiClient.post('/auth/sign-up', data);
  return response.data;
};

export const loginApi = async (data: TLoginSchema) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const fetchMyInfoApi = async () => {
  const response = await apiClient.get('/auth/profile');
  return response.data;
};
