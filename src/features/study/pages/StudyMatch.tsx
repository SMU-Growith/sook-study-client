import { AuthHeader } from '@/components/layout/AuthHeader';
import { SideBar } from '@/components/ui/SideBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { matchingStudiesData } from '../studyMatchIng';
import { StudyCard, type Study } from '@/components/ui/StudyCard';
import { matchedStudiesData } from '../studyMatchDone';
import { matchStudiesData } from '../studyMatch';
import ArrowLeftSvg from '@/assets/arrow/arrowLeft.svg';
import ArrowRightSvg from '@/assets/arrow/arrowRight.svg';
import ArrowBottomSvg from '@/assets/arrow/arrowBottom.svg';
import BookmarkSvg from '@/assets/icons/bookmark.svg';
import BookmarkFillSvg from '@/assets/icons/bookmarkFill.svg';
import SearchSvg from '@/assets/icons/search.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Tag } from '@/components/ui/Tag';
import { DropdownList } from '@/components/ui/DropdownList';
import { CATEGORIES } from '@/constants/index';

type TopCategory = keyof typeof CATEGORIES;
type SubCategory = keyof (typeof CATEGORIES)['분야'];

export function StudyMatch() {
  const navigate = useNavigate();

  const [studyStatus, setStudyStatus] = useState('전체');
  const [allStudies, setAllStudies] = useState<Study[]>([]);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTopCategory, setActiveTopCategory] = useState<TopCategory>('분야');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory>('학업');

  const TOTAL_PAGES = 5; // [lf] 총 페이지 수 받아오기
  const pageNumbers = [1, 2, 3, 4, 5]; // [lf] 페이지 번호 배열
  const [page, setPage] = useState(1); // [lf] 현재 페이지

  const [searchText, setSearchText] = useState('');
  const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);

  const renderFilterOptions = () => {
    if (activeTopCategory === '분야') {
      const currentOptions = CATEGORIES['분야'];
      const subCategories = Object.keys(currentOptions) as SubCategory[];
      // 서브카테고리를 드랍다운으로 표시
      // [lf] select box로 변경해야 됨

      return (
        <>
          <div className="relative">
            <Button variant="default" size="md" onClick={() => setDropdownOpen(!isDropdownOpen)}>
              {activeSubCategory}
              <img src={ArrowBottomSvg} alt="드랍다운" className="ml-1" />
            </Button>
            {isDropdownOpen && (
              <DropdownList
                options={subCategories}
                isSearchable={false}
                onSelect={(value) => {
                  setActiveSubCategory(value as SubCategory);
                  setDropdownOpen(false);
                }}
              />
            )}
          </div>

          <div className="flex gap-2">
            {currentOptions[activeSubCategory]?.map((tag) => (
              <Tag key={tag} onClick={() => handleTagToggle(tag)}>
                {tag}
              </Tag>
            ))}
          </div>
        </>
      );
    }

    // '진행방식' 또는 '스터디 성향' 카테고리인 경우
    const currentOptions = CATEGORIES[activeTopCategory] as readonly string[];

    return (
      <div className="flex gap-2">
        {currentOptions.map((tag) => (
          <Tag key={tag} onClick={() => handleTagToggle(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
    );
  };

  const handleTagToggle = (tag: string) => {
    // 조건1. 없는 태그만 추가
    setSelectedTags((prevTags) => {
      // 조건1. 선택된 태그가 5개 이상이면 추가 못함
      if (prevTags.length >= 5) return prevTags;
      // 조건1. 없는 태그만 추가
      if (!prevTags.includes(tag)) {
        return [...prevTags, tag];
      }
      return prevTags;
    });
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleStudyStatus = (status: string) => {
    setStudyStatus(status);
    setPage(1);
  };

  const filterStudies = (studies: Study[], text: string): Study[] => {
    if (!text) return studies;
    const lowerText = text.toLowerCase();
    return studies.filter(
      (study) =>
        study.title.toLowerCase().includes(lowerText) ||
        study.tags.every((tag) => tag.toLowerCase().includes(lowerText))
    );
  };

  const applyFilters = () => {
    // TODO 백엔드에서 필터링된 데이터 받아오기

    let studies = matchStudiesData;

    // 상태 필터링
    if (studyStatus === '모집중') studies = matchingStudiesData;
    else if (studyStatus === '모집 완료') studies = matchedStudiesData;

    // 검색 필터링
    studies = filterStudies(studies, searchText);

    // 태그 필터링
    if (selectedTags.length > 0) {
      studies = studies.filter((study) => selectedTags.every((tag) => study.tags.includes(tag)));
    }

    console.log('selectedTags:', selectedTags);
    console.log(
      'study.tags:',
      studies.map((s) => s.tags)
    );

    setFilteredStudies(studies);
    setPage(1);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setPage(1);
  };

  useEffect(() => {
    setAllStudies(matchStudiesData);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [studyStatus, searchText, selectedTags]);

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <SideBar />
      <main className="flex flex-col flex-1 ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <div></div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
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
            {isBookmarkOpen && (
              <div className="flex flex-col rounded-[20px] border-2 border-gray-200 px-6 py-[18px]">
                <div className="flex items-center gap-2 mb-6">
                  <img src={BookmarkFillSvg} alt="북마크" />
                  {selectedTags.length === 0 ? (
                    <span className="text-body-2-semibold text-gray-400">
                      최대 5개까지 태그 검색이 가능해요.
                    </span>
                  ) : (
                    <>
                      {selectedTags.map((tag) => (
                        <Tag key={tag} deleteable onDelete={() => removeTag(tag)}>
                          {tag}
                        </Tag>
                      ))}
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    {Object.keys(CATEGORIES).map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setActiveTopCategory(category as TopCategory);
                        }}
                      >
                        <span
                          className={`text-body-1-semibold ${activeTopCategory === category ? '' : 'text-gray-200'}`}
                        >
                          {category}
                        </span>
                      </button>
                    ))}
                  </div>
                  {renderFilterOptions()}
                </div>
              </div>
            )}
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
