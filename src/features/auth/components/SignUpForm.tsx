import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/FormField";
import { type TSignUpStep1Schema } from "@/features/auth/validators/auth";

interface SignUpFormProps {
  onVerified: (isVerified: boolean) => void;
}

export function SignUpForm({ onVerified }: SignUpFormProps) {
  const {
    watch,
    formState: { errors },
  } = useFormContext<TSignUpStep1Schema>();
  const emailValue = watch("email");
  const verificationCodeValue = watch("verificationCode");

  const [timer, setTimer] = useState(300);
  const [isCodeSent, setIsCodeSent] = useState(false);

  // 인증 코드 요청 뮤테이션
  // const { mutate: sendCode } = useMutation({
  //   mutationFn: requestEmailCodeApi,
  //   onSuccess: () => {
  //     setIsCodeSent(true);
  //     setTimer(300);
  //     alert('인증 코드가 발송되었습니다.');
  //   },
  //   onError: (error: AxiosError<{ message: string }>) => {
  //     console.log(error);
  //     alert(error.response?.data?.message || '인증 코드 발송에 실패했습니다.');
  //   },
  // });

  // 인증 코드 확인 뮤테이션
  // const { mutate: verifyCode } = useMutation({
  //   mutationFn: checkEmailCodeApi,
  //   onSuccess: () => {
  //     onVerified(true);
  //     alert('이메일 인증이 완료되었습니다.');
  //   },
  //   onError: (error: AxiosError<{ message: string }>) => {
  //     console.log(error);
  //     setError('verificationCode', {
  //       message: error.response?.data?.message || '인증 코드가 올바르지 않습니다.',
  //     });
  //   },
  // });

  const handleRequestCode = () => {
    // const email = getValues('email');
    // sendCode(email); // 나중에 주석해제
    setIsCodeSent(true); // 나중에 삭제
    setTimer(300);
  };

  const handleVerifyCode = () => {
    // const email = getValues('email');
    // const verificationCode = getValues('verificationCode');
    // verifyCode({ email, verificationCode }); // 나중에 주석해제
    onVerified(true); // 나중에 삭제
  };

  useEffect(() => {
    // 코드가 전송된 이후 타이머 시작
    if (!isCodeSent) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCodeSent]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <>
      <FormField
        name="loginId"
        label="아이디"
        placeholder="아이디를 입력해주세요."
      />
      <FormField
        name="password"
        label="패스워드"
        placeholder="패스워드를 입력해주세요."
        type="password"
      />
      <div className="space-y-3">
        <div className="flex items-end gap-2">
          <div className="grow relative">
            <FormField
              name="email"
              label="숙명 계정 인증하기"
              placeholder="인증받을 숙명 G-mail 계정을 입력해주세요."
            />
            {isCodeSent && (
              <span className="absolute right-5 bottom-3 text-body-2-semibold text-gray-500">
                {formatTime(timer)}
              </span>
            )}
          </div>
          <Button
            type="button"
            variant="solid"
            size="md"
            onClick={handleRequestCode}
            disabled={!emailValue || !!errors.email}
          >
            인증번호 받기
          </Button>
        </div>
        <FormField
          name="verificationCode"
          placeholder="인증번호 5자리를 입력해주세요."
        />
        <Button
          type="button"
          variant="primary"
          size="md"
          className="w-full"
          onClick={handleVerifyCode}
          disabled={!isCodeSent || !verificationCodeValue}
        >
          인증하기
        </Button>
      </div>
    </>
  );
}
