import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BannerSvg from '@/assets/studyPreferenceBanner.svg';
import { AuthHeader } from '@/components/layout/AuthHeader';

export function StudyPreferenceTest() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />
      <main className="flex flex-col w-full max-w-[800px] mt-[88px] px-20 py-10 overflow-y-auto justify-center">
        <img src={BannerSvg} alt="Study Preference Test Banner" />
        <h1 className="heading-1 text-center mt-15">나의 스터디 성향은 무엇일까 ?</h1>
        <p className="text-body-1 text-gray-300 text-center mt-3">
          잘하고 못함을 평가하는 것이 아닌
          <br />
          스터디에서 나의 성향과 스타일을 알아보는 테스트예요.
          <br />
          가장 나와 가까운 답을 편하게 선택해 주세요!
        </p>
        <div className="flex items-center w-full mt-10">
          <div className="flex-1 h-[2px] bg-gray-100" />
          <p className="mx-3 text-body-1 text-gray-300">
            <span className="text-primary-500 text-body-1-semibold">266</span> 송이가 참여했어요
          </p>
          <div className="flex-1 h-[2px] bg-gray-100" />
        </div>
        <Button
          variant="primary"
          size="md"
          className="mt-10"
          onClick={() => navigate('/study/preference-test/question/1')}
        >
          테스트 하러가기
        </Button>
      </main>
    </div>
  );
}
