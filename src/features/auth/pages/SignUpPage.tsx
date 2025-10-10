import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { Badge } from '@/components/ui/Badge';
import { useState } from 'react';
import { Form } from '@/components/ui/Form';
import {
  signUpStep1Schema,
  signUpStep2Schema,
  type TSignUpStep1Schema,
  type TSignUpStep2Schema,
} from '../validators/auth';
import { SignUpForm } from '../components/SignUpForm';
import { SignUpEtcForm } from '../components/SignUpEtcForm';
import { useNavigate } from 'react-router-dom';
import { useSignUpStore } from '@/store/useSignUpStore';
import { useMutation } from '@tanstack/react-query';
import { signUpApi } from '@/lib/api/index';
import { AxiosError } from 'axios';

export function SignUpPage() {
  const [step, setStep] = useState(1);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();
  const { formData, setFormData, reset } = useSignUpStore();

  const { mutate: submitSignUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      reset();
      navigate('/');
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || '회원가입 실패');
    },
  });
  const onStep1Submit = (data: TSignUpStep1Schema) => {
    console.log('Step 1 Data:', data);
    const { id, password, email } = data;
    setFormData({ id, password, email });
    setStep(2);
  };

  const onStep2Submit = (data: TSignUpStep2Schema) => {
    console.log('Step 2 Data:', data);
    const finalData = { ...formData, ...data };
    submitSignUp(finalData);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <header className="w-full h-[88px] flex justify-center px-6 py-4">
        <Logo />
      </header>
      <main className="w-full max-w-[800px] px-4 py-10">
        <div className="w-full flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <Badge variant="blue_">{step}</Badge>
            <h1 className="text-body-1-semibold text-gray-400">
              {step === 1 ? '계정 만들기' : '정보 입력하기'}
            </h1>
          </div>
          <span className="text-caption-semibold text-gray-200">{step}/2</span>
        </div>

        {step === 1 && (
          <Form schema={signUpStep1Schema} onSubmit={onStep1Submit} className="space-y-5">
            <SignUpForm onVerified={setIsEmailVerified} />
            <div className="flex w-full justify-end gap-2 mt-10">
              <Button type="button" variant="default" size="lg" onClick={() => navigate(-1)}>
                취소
              </Button>
              <Button type="submit" variant={isEmailVerified ? 'primary' : 'disabled'} size="lg">
                다음으로
              </Button>
            </div>
          </Form>
        )}

        {step === 2 && (
          <Form schema={signUpStep2Schema} onSubmit={onStep2Submit} className="space-y-5">
            <SignUpEtcForm />
            <div className="flex w-full justify-end gap-2 mt-10">
              <Button type="button" variant="default" size="lg" onClick={() => navigate(-1)}>
                취소
              </Button>
              <Button type="submit" variant="primary" size="lg">
                회원가입 하기
              </Button>
            </div>
          </Form>
        )}
      </main>
    </div>
  );
}
