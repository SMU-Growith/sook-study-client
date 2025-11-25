import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { Form } from '@/components/ui/Form';
import { myProfileSchema, type TProfile } from '../validators/auth';
import { SignUpEtcForm } from '../components/SignUpEtcForm';
import { useNavigate } from 'react-router-dom';
import { useSignUpStore } from '@/store/useSignUpStore';
import { useMutation } from '@tanstack/react-query';
import { profileUpdateApi, signUpApi } from '@/lib/api/index';
import { AxiosError } from 'axios';
import UserProfileSvg from '@/assets/icons/userProfile.svg';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { ProfileForm } from '../components/ProfileForm';

export function MyPage() {
  const navigate = useNavigate();
  const { formData, setFormData, reset } = useSignUpStore();

  const { mutate: submitProfileUpdate } = useMutation({
    mutationFn: profileUpdateApi,
    onSuccess: () => {
      alert('프로필 수정이 완료되었습니다.');
      reset();
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || '회원가입 실패');
    },
  });
  const onProfileSubmit = (data: TProfile) => {
    console.log('TProfileSchema:', data);
    // submitProfileUpdate(data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />
      <main className="flex flex-col w-full max-w-[800px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <div className="flex justify-center">
          <img src={UserProfileSvg} alt="User Profile" className="w-10 h-10" />
        </div>
        <Form schema={myProfileSchema} onSubmit={onProfileSubmit} className="space-y-5">
          <ProfileForm />
          <div className="flex w-full justify-end gap-2 mt-15">
            <Button type="button" variant="default" size="lg" onClick={() => navigate('/home')}>
              홈으로
            </Button>
            <Button type="submit" variant="primary" size="lg">
              프로필 저장하기
            </Button>
          </div>
        </Form>
      </main>
    </div>
  );
}
