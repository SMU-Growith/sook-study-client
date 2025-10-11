import { AuthHeader } from '@/components/layout/AuthHeader';
import { SideBar } from '@/components/ui/SideBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { matchingStudiesData } from '../studyMatchIng';
import { StudyCard, type Study } from '@/components/ui/StudyCard';
import { matchedStudiesData } from '../studyMatchDone';
import { matchStudiesData } from '../studyMatch';
import ArrowBottomSvg from '@/assets/arrow/arrowBottom.svg';
import ArrowLeftSvg from '@/assets/arrow/arrowLeft.svg';
import ArrowRightSvg from '@/assets/arrow/arrowRight.svg';
import BookmarkSvg from '@/assets/icons/bookmark.svg';
import BookmarkFillSvg from '@/assets/icons/bookmarkFill.svg';
import SearchSvg from '@/assets/icons/search.svg';

export function StudyMatch() {
  const navigate = useNavigate();

  const [studyStatus, setStudyStatus] = useState('전체');
  const [studies, setStudies] = useState<Study[]>([]);

  const handleStudyStatus = (status: string) => {
    setStudyStatus(status);
    setPage(1);
    console.log(`Selected study status: ${status}`);
    // TODO: 백엔드에서 조회하는 API 호출
    if (status === '모집중') {
      setStudies(matchingStudiesData);
    } else if (status === '모집 완료') {
      setStudies(matchedStudiesData);
    } else {
      setStudies(matchStudiesData);
    }
  };

  const TOTAL_PAGES = 5; // [lf] 총 페이지 수 받아오기
  const pageNumbers = [1, 2, 3, 4, 5]; // [lf] 페이지 번호 배열
  const [page, setPage] = useState(1); // [lf] 현재 페이지

  useEffect(() => {
    setStudies(matchStudiesData);
  }, []);
  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <SideBar />
      <main className="flex flex-col flex-1 ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <div></div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            {['전체', '모집중', '모집 완료'].map((status) => (
              <button key={status} onClick={() => handleStudyStatus(status)}>
                <h3 className={`heading-3 ${studyStatus === status ? '' : 'text-gray-200'}`}>
                  {status}
                </h3>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-5">
            {studies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>
          <div className="flex justify-center items-center gap-6">
            <button>
              <img src={ArrowLeftSvg} alt="이전" />
            </button>
            <div className="flex items-center gap-2">
              {pageNumbers.map((p) => (
                <button
                  key={p}
                  className={`text-caption-semibold rounded-[4px] px-[8px] py-[2px]
                ${page == p ? 'text-white bg-gray-400 hover:bg-gray-300' : 'text-gray-400 hover:bg-gray-100'}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <button>
              <img src={ArrowRightSvg} alt="다음" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
