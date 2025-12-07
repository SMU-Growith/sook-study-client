import { FormField } from "@/components/ui/FormField";

export function LoginForm() {
  return (
    <>
      <FormField
        name="loginId"
        label="아이디"
        placeholder="아이디를 입력해주세요."
      />
      <FormField
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type="password"
      />
    </>
  );
}
