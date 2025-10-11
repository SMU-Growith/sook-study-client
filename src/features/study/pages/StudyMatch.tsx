import { AuthHeader } from '@/components/layout/AuthHeader';
import { SideBar } from '@/components/ui/SideBar';
import { use, useEffect, useState } from 'react';
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
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { set } from 'zod';

export function StudyMatch() {
  const navigate = useNavigate();

  const [studyStatus, setStudyStatus] = useState('전체');
  const [allStudies, setAllStudies] = useState<Study[]>([]);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);

  const TOTAL_PAGES = 5; // [lf] 총 페이지 수 받아오기
  const pageNumbers = [1, 2, 3, 4, 5]; // [lf] 페이지 번호 배열
  const [page, setPage] = useState(1); // [lf] 현재 페이지

  const [searchText, setSearchText] = useState('');
  const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);

  const filterStudies = (studies: Study[], text: string): Study[] => {
    if (!text) return studies;
    const lowerText = text.toLowerCase();
    return studies.filter(
      (study) =>
        study.title.toLowerCase().includes(lowerText) ||
        study.tags.some((tag) => tag.toLowerCase().includes(lowerText))
    );
  };

  const handleStudyStatus = (status: string) => {
    setStudyStatus(status);
    setPage(1);
    console.log(`Selected study status: ${status}`);
    // TODO: 백엔드에서 조회하는 API 호출
    let data: Study[] = [];
    if (status === '모집중') {
      data = matchingStudiesData;
    } else if (status === '모집 완료') {
      data = matchedStudiesData;
    } else {
      data = matchStudiesData;
    }

    setAllStudies(data);
    setFilteredStudies(filterStudies(data, searchText));
  };

  const handleSearch = (text: string) => {
    setSearchText(text.trim());
    setPage(1);
  };

  useEffect(() => {
    const initialData = matchStudiesData;
    setAllStudies(initialData);
    setFilteredStudies(filterStudies(initialData, searchText));
  }, []);

  useEffect(() => {
    setFilteredStudies(filterStudies(allStudies, searchText));
    setPage(1);
  }, [allStudies, searchText]);

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <SideBar />
      <main className="flex flex-col flex-1 ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <div></div>
        <div className="flex flex-col gap-10">
          <div className="flex gap-6">
            <Button
              variant="solid"
              size="md"
              className="px-3 py-2 gap-2"
              onClick={() => setIsBookmarkOpen(!isBookmarkOpen)}
            >
              <img src={isBookmarkOpen ? BookmarkFillSvg : BookmarkSvg} alt="북마크" />
              태그 검색하기
            </Button>
            <div className="relative w-3/8 ">
              <Input
                type="text"
                placeholder="찾으시는 스터디가 있나요 ?"
                className="rounded-[22px] border-2 border-gray-200 text-body-2"
                onChange={(e) => {
                  handleSearch(e.currentTarget.value);
                }}
              />
              <img src={SearchSvg} alt="검색" className="absolute right-5 top-3" />
            </div>
          </div>
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
              {filteredStudies.map((study) => (
                <StudyCard key={study.id} study={study} />
              ))}
            </div>
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
