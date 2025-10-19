import { FormField } from '@/components/ui/FormField';
import { majorOptions, studentStatusOptions } from '@/constants/index';

export function SignUpEtcForm() {
  return (
    <>
      <FormField
        name="nickname"
        label="닉네임"
        placeholder="숙터디에서 사용할 닉네임을 입력해주세요."
      />
      <FormField
        name="studentStatus"
        label="재학상태"
        placeholder="재학 상태를 선택해주세요."
        type="dropdown"
        options={studentStatusOptions}
      />
      <FormField
        name="major"
        label="전공"
        placeholder="전공을 선택해주세요."
        type="dropdown"
        options={majorOptions}
        isSearchable={true}
      />
      <FormField
        name="phoneNumber"
        label="전화번호"
        placeholder="연락 가능한 전화번호를 입력해주세요."
      />
    </>
  );
}
