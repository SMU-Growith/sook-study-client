import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/FormField";
import { majorOptions, studentStatusOptions } from "@/constants/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProfileForm() {
  const [nickname, setNickname] = useState("김눈송");
  const navigate = useNavigate();

  return (
    <>
      <FormField
        name="nickname"
        label="닉네임"
        placeholder="숙터디에서 사용할 닉네임을 입력해주세요."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <FormField
        name="studentStatus"
        label="재학상태"
        placeholder="재학 상태를 선택해주세요."
        type="dropdown"
        options={studentStatusOptions}
        value="재학생"
      />
      <FormField
        name="major"
        label="전공"
        placeholder="전공을 선택해주세요."
        type="dropdown"
        options={majorOptions}
        isSearchable={true}
        value="소프트웨어학부 컴퓨터과학전공"
      />
      <FormField
        name="phoneNumber"
        label="전화번호"
        placeholder="연락 가능한 전화번호를 입력해주세요."
        value="010-4917-1039"
      />
      <div className="flex items-end gap-2">
        <div className="grow">
          <FormField
            name="studyPreference"
            label="내 스터디 성향"
            placeholder="아직 스터디 성향 지정이 되지 않았어요!"
            readOnly
            value="꼼꼼송이(계획형)"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => navigate("/study/preference-test")}
        >
          다시 검사하기
        </Button>
      </div>
    </>
  );
}
