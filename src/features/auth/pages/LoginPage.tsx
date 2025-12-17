import { Logo } from "@/components/ui/Logo";
import { AuthHeader } from "@/components/layout/AuthHeader";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, type TLoginSchema } from "../validators/auth";
import { LoginForm } from "../components/LoginForm";
import { Form } from "@/components/ui/Form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StampConfirmModal } from "@/components/ui/StampConfirmModal";
import { useAuthStore } from "@/store/authStore";
import { loginApi } from "../api/auth";
import type { AxiosError } from "axios";
import type { LoginResult } from "../api/authType";
import type { ApiResponse } from "@/lib/api";

export function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false); // 웰컴 스탬프 모달 상태

  const { mutate: submitLogin } = useMutation<
    LoginResult,
    AxiosError<ApiResponse<null>>,
    TLoginSchema
  >({
    mutationFn: loginApi,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      auth.login(
        res.nickName,
        res.email,
        res.major,
        res.studentStatus,
        res.phoneNumber
      );
      auth.isLoggedIn = true;
      // alert("로그인이 완료되었습니다.");
      // const isFirstLogin = res.data?.isFirstLogin ?? true; // 실제로는 서버 응답을 통해 확인
      setIsModalOpen(true);
    },
    onError: (error) => {
      alert(`로그인에 실패했습니다: ${error.message}`);
    },
  });

  const onSubmit = (data: TLoginSchema) => {
    console.log("Login Data:", data);
    submitLogin(data);
  };

  const handleConfirmStamp = () => {
    setIsModalOpen(false);
    navigate("/my-page/stamp");
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
        <Form
          schema={loginSchema}
          onSubmit={onSubmit}
          className="w-full space-y-5"
        >
          <LoginForm />
          <Button variant="primary" type="submit" size="lg" className="w-full">
            로그인하기
          </Button>
        </Form>
        <div className="mt-5 w-full flex justify-between items-center text-body-1-semibold">
          <span className="text-gray-400">아직 회원이 아니신가요? </span>
          <Link to="/signup" className="text-primary-500 hover:underline">
            회원가입하기
          </Link>
        </div>
      </main>

      <StampConfirmModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/");
        }}
        onConfirm={handleConfirmStamp}
      />
    </div>
  );
}
