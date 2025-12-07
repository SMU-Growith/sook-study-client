import { AuthHeader } from "@/components/layout/AuthHeader";
import { SideBar } from "@/components/ui/SideBar";
import { useState } from "react";
import { StudyCard } from "@/components/ui/StudyCard";
import ArrowLeftSvg from "@/assets/arrow/arrowLeft.svg";
import ArrowRightSvg from "@/assets/arrow/arrowRight.svg";
import ArrowBottomSvg from "@/assets/arrow/arrowBottom.svg";
import BookmarkSvg from "@/assets/icons/bookmark.svg";
import BookmarkFillSvg from "@/assets/icons/bookmarkFill.svg";
import SearchSvg from "@/assets/icons/search.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Tag } from "@/components/ui/Tag";
import { DropdownList } from "@/components/ui/DropdownList";
import { CATEGORIES } from "@/constants/index";
import { useQuery } from "@tanstack/react-query";
import type { StudyResult } from "../api/studyType";
import { SearchStudyApi } from "../api/study";
import { STUDY_STATUS_LABEL } from "../constants";

type TopCategory = keyof typeof CATEGORIES;
type SubCategory = keyof (typeof CATEGORIES)["분야"];

export function StudyMatch() {
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  type StudyStatusFilter = "ALL" | "ACTIVE" | "CLOSED";
  const [selectedStatus, setSelectedStatus] =
    useState<StudyStatusFilter>("ALL");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const [activeTopCategory, setActiveTopCategory] =
    useState<TopCategory>("분야");
  const [activeSubCategory, setActiveSubCategory] =
    useState<SubCategory>("학업");

  const pageNumbers = [1, 2, 3, 4, 5]; // [lf] 페이지 번호 배열
  const [page, setPage] = useState(1); // [lf] 현재 페이지

  type StudyStatusApi = "ACTIVE" | "CLOSED" | undefined;
  const apiStudyStatus: StudyStatusApi =
    selectedStatus === "ALL" ? undefined : selectedStatus;

  const studyFieldNames: string[] = [];

  function mapFormats(tags: string[]) {
    const formats: ("ONLINE" | "OFFLINE" | "HYBRID")[] = [];
    tags.forEach((tag) => {
      if (tag === "온라인") formats.push("ONLINE");
      else if (tag === "오프라인") formats.push("OFFLINE");
      else if (tag === "온·오프라인 병행") formats.push("HYBRID");
    });
    return formats;
  }

  function mapStyles(tags: string[]) {
    const styles: (
      | "SYSTEMATIC"
      | "FREE"
      | "COOPERATIVE"
      | "RESULT_ORIENTED"
    )[] = [];
    tags.forEach((tag) => {
      if (tag === "체계적인") styles.push("SYSTEMATIC");
      else if (tag === "자유로운") styles.push("FREE");
      else if (tag === "협력적인") styles.push("COOPERATIVE");
      else if (tag === "실적중심") styles.push("RESULT_ORIENTED");
    });
    return styles;
  }

  const studyFormats = mapFormats(selectedTags);
  const studyStyleCategories = mapStyles(selectedTags);

  const { data: studies = [] } = useQuery<StudyResult[]>({
    queryKey: [
      "searchStudies",
      studyFieldNames,
      studyFormats,
      studyStyleCategories,
      apiStudyStatus,
      searchText,
      0,
      9,
      "createdAt",
    ],
    queryFn: () =>
      SearchStudyApi(
        studyFieldNames,
        studyFormats,
        studyStyleCategories,
        apiStudyStatus,
        searchText,
        0,
        9,
        "createdAt"
      ),
  });

  const renderFilterOptions = () => {
    if (activeTopCategory === "분야") {
      const currentOptions = CATEGORIES["분야"];
      const subCategories = Object.keys(currentOptions) as SubCategory[];
      // 서브카테고리를 드랍다운으로 표시
      // [lf] select box로 변경해야 됨

      return (
        <>
          <div className="relative">
            <Button
              variant="default"
              size="md"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
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
    setSelectedStatus(status);
    setPage(1);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setPage(1);
  };

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
                <img
                  src={isBookmarkOpen ? BookmarkFillSvg : BookmarkSvg}
                  alt="북마크"
                />
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
                <img
                  src={SearchSvg}
                  alt="검색"
                  className="absolute right-5 top-3"
                />
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
                        <Tag
                          key={tag}
                          deleteable
                          onDelete={() => removeTag(tag)}
                        >
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
                          className={`text-body-1-semibold ${activeTopCategory === category ? "" : "text-gray-200"}`}
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
              {(["ALL", "ACTIVE", "CLOSED"] as StudyStatusFilter[]).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => handleStudyStatus(status)}
                  >
                    <h3
                      className={`heading-3 ${selectedStatus === status ? "" : "text-gray-200"}`}
                    >
                      {STUDY_STATUS_LABEL[status]}
                    </h3>
                  </button>
                )
              )}
            </div>
            <div className="grid grid-cols-3 gap-5">
              {studies.map((study) => (
                <StudyCard key={study.studyId} study={study} />
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
                ${page == p ? "text-white bg-gray-400 hover:bg-gray-300" : "text-gray-400 hover:bg-gray-100"}`}
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
