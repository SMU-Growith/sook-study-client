import { AuthHeader } from '@/components/layout/AuthHeader';
import CarefulSong from '@/assets/preferences/carefulSong.svg';
import Desc1 from '@/assets/preferences/carefulSongDesc1.svg';
import Desc2 from '@/assets/preferences/carefulSongDesc2.svg';
import { Button } from '@/components/ui/button';

export function StudyPreferenceResult() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />
      <main className="flex flex-col mt-[88px] overflow-y-auto w-[600px] items-center justify-center">
        <div className="flex flex-col gap-4">
          <h1 className="heading-2 mt-10 text-center">
            꼼꼼송이<span className="text-gray-300 text-body-2"> * 계획형</span>
          </h1>
          <p className="text-gray-300 text-center">"계획표 들고 나타나는 철저 꼼꼼쟁이!"</p>
          <img src={CarefulSong} alt="꼼꼼송이 이미지" />
          <img src={Desc1} alt="꼼꼼송이 설명 이미지 1" />
          <img src={Desc2} alt="꼼꼼송이 설명 이미지 2" />
        </div>
        <div className="flex flex-col gap-3 mt-10 mb-10 w-[60%]">
          <Button variant="primary" size="lg">
            내 성향과 일치해요!
          </Button>
          <Button variant="default" size="lg">
            테스트 다시하기
          </Button>
        </div>
      </main>
    </div>
  );
}
