import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { Badge } from '@/components/ui/Badge';
import { InputField } from '@/components/ui/InputField';
import { useNavigate } from 'react-router-dom';

export function SignUpPageEtc({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <header className="w-full h-[88px] flex justify-center px-6 py-4">
        <Logo />
      </header>
      <main className="w-full max-w-[800px] px-4 py-10">
        <div className="w-full flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <Badge variant="blue_">2</Badge>
            <h1 className="text-body-1-semibold text-gray-400">정보 입력하기</h1>
          </div>
          <span className="text-caption-semibold text-gray-200">2/2</span>
        </div>
        <div className="space-y-5">
          <InputField
            label="닉네임"
            id="nickname"
            type="text"
            placeholder="숙터디에서 사용할 닉네임을 입력해주세요."
          />
          <InputField
            label="재학상태"
            id="status"
            type="text"
            placeholder="재학 상태를 선택해주세요."
          />
          <InputField label="전공" id="major" type="text" placeholder="전공을 선택해주세요." />
          <InputField
            label="전화번호"
            id="phone"
            type="text"
            placeholder="연락 가능한 전화번호를 입력해주세요."
          />
        </div>
        <div className="flex w-full justify-end gap-2 mt-10">
          <Button variant="default" size="lg" onClick={onBack}>
            취소
          </Button>
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            회원가입 하기
          </Button>
        </div>
      </main>
    </div>
  );
}
