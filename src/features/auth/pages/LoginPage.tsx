import { Logo } from '@/components/ui/Logo';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { loginApi } from '@/lib/api/index';
import { useMutation } from '@tanstack/react-query';
import { loginSchema, type TLoginSchema } from '../validators/auth';
import { LoginForm } from '../components/LoginForm';
import { Form } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { StampConfirmModal } from '@/components/ui/StampConfirmModal';

export function LoginPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 웰컴 스탬프 모달 상태

  const { mutate: submitLogin } = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      alert('로그인이 완료되었습니다.');
      const isFirstLogin = res.data?.isFirstLogin ?? true; // 실제로는 서버 응답을 통해 확인
      // 만약 처음 로그인한 사람이라면 웰컴 스탬프 모달 띄우기
      if (isFirstLogin) {
        setIsModalOpen(true);
      }
      navigate('/study');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data?.message || '로그인에 실패했습니다.');
    },
  });

  const onSubmit = (data: TLoginSchema) => {
    console.log('Login Data:', data);
    // submitLogin(data);
    // 임시로 웰컴 스탬프 모달 띄우기
    setIsModalOpen(true);
  };

  const handleConfirmStamp = () => {
    setIsModalOpen(false);
    navigate('/my/stamps');
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-4">
      <AuthHeader />
      <main className="flex w-full max-w-[414px] flex-col items-center">
        <Logo size="lg" className="mb-[24px]" />
        <h1 className="heading-2 mb-15 text-gray-500 text-center">
          숙대생을 위한
          <br />
          숙터디
        </h1>
        <Form schema={loginSchema} onSubmit={onSubmit} className="w-full space-y-5">
          <LoginForm />
          <Button variant="primary" type="submit" size="lg" className="w-full">
            로그인하기
          </Button>
        </Form>
        <div className="mt-5 w-full flex justify-between items-center text-body-1-semibold">
          <span className="text-gray-400">아직 회원이 아니신가요? </span>
          <a href="/signup" className="text-primary-500 hover:underline">
            회원가입하기
          </a>
        </div>
      </main>

      <StampConfirmModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate('/study');
        }}
        onConfirm={handleConfirmStamp}
      />
    </div>
  );
}
