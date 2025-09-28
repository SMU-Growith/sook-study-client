import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { InputField } from '@/components/ui/InputField';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
    navigate('/');
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
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <InputField label="아이디" id="id" type="text" placeholder="아이디를 입력해주세요." />
          <InputField
            label="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <Button type="submit" size="lg" className="w-full">
            로그인하기
          </Button>
        </form>
        <div className="mt-5 w-full flex justify-between items-center text-body-1-semibold">
          <span className="text-gray-400">아직 회원이 아니신가요? </span>
          <a href="/signup" className="text-primary-500 hover:underline">
            회원가입하기
          </a>
        </div>
      </main>
    </div>
  );
}
