import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { Badge } from '@/components/ui/Badge';
import { InputField } from '@/components/ui/InputField';
import { Input } from '@/components/ui/Input';
import { useState, useEffect } from 'react';

export function SignUpPage({ onNext }: { onNext: () => void }) {
  const [timer, setTimer] = useState(300);
  const [isCodeSent, setIdCodeSent] = useState(false);
  const [isVerified, setIdVerified] = useState(false);

  useEffect(() => {
    // 코드가 전송된 후 타이머 시작
    if (isCodeSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCodeSent, timer]);

  const handleNext = () => {
    if (isVerified) {
      onNext();
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <header className="w-full h-[88px] flex justify-center px-6 py-4">
        <Logo />
      </header>
      <main className="w-full max-w-[800px] px-4 py-10">
        <div className="w-full flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <Badge variant="blue_">1</Badge>
            <h1 className="text-body-1-semibold text-gray-400">계정 만들기</h1>
          </div>
          <span className="text-caption-semibold text-gray-200">1/2</span>
        </div>
        <div className="space-y-5">
          <InputField label="아이디" id="id" type="text" placeholder="아이디를 입력해주세요." />
          <InputField
            label="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <div className="space-y-3">
            <div className="flex items-end gap-2">
              <div className="grow relative">
                <InputField
                  label="숙명 계정 인증하기"
                  id="email"
                  type="email"
                  placeholder="인증받을 숙명 G-mail 계정을 입력해주세요."
                />
                {isCodeSent && (
                  <span className="absolute right-5 bottom-3 text-body-2-semibold text-gray-500">
                    {formatTime(timer)}
                  </span>
                )}
              </div>
              <Button
                variant="solid"
                size="md"
                onClick={() => {
                  setTimer(300);
                  setIdCodeSent(true);
                }}
              >
                인증번호 받기
              </Button>
            </div>
            <Input id="verification" type="text" placeholder="인증번호 6자리를 입력해주세요." />
            <Button
              variant="primary"
              size="md"
              className="w-full"
              disabled={isVerified}
              onClick={() => setIdVerified(true)}
            >
              인증하기
            </Button>
          </div>
        </div>
        <div className="flex w-full justify-end gap-2 mt-10">
          <Button variant="default" size="lg">
            취소
          </Button>
          <Button variant={isVerified ? 'primary' : 'disabled'} size="lg" onClick={handleNext}>
            다음으로
          </Button>
        </div>
      </main>
    </div>
  );
}
