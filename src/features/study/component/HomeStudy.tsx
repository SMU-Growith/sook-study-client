import { useState } from "react";
import { CarouselNavButtons } from "@/components/ui/CarouselNavButtons";
// import { popularStudiesData } from "../popularStudy";
import { StudyCard } from "@/components/ui/StudyCard";
import { HomeStudyApi } from "../api/study";
import type { HomeStudyResult } from "../api/studyType";
import { useQuery } from "@tanstack/react-query";

const CARDS_PER_VIEW = 3; // 한 번에 보여줄 카드 수
const MOVE_BY = 2; // 한 번에 이동할 카드 수

interface HomeStudyProps {
  type?: "popular" | "latest";
  onCardClick: () => void;
}

export function HomeStudy({ type, onCardClick }: HomeStudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sortParam = type === "popular" ? "scrapCount" : "createdAt";

  // 홈 스터디 데이터 조회
  const { data: homeStudies = [] } = useQuery<HomeStudyResult[]>({
    queryKey: ["homeStudies", type, sortParam],
    queryFn: () => HomeStudyApi(0, 10, sortParam),
  });

  const studyData = homeStudies;
  // const studyData =
  //   type === "popular"
  //     ? popularStudiesData
  //     : popularStudiesData.slice().reverse();
  const totalStudies = studyData.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - MOVE_BY, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + MOVE_BY, totalStudies - CARDS_PER_VIEW)
    );
  };

  const visibleStudies = studyData.slice(
    currentIndex,
    currentIndex + CARDS_PER_VIEW
  );

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalStudies - CARDS_PER_VIEW;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="heading-1">
          {type === "popular" ? "인기있는 숙터디에요 !" : "새로운 숙터디에요 !"}
        </h2>
        <div className="flex gap-1">
          <CarouselNavButtons
            onPrev={handlePrev}
            onNext={handleNext}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
          />
        </div>
      </div>
      <div className="flex gap-5">
        {visibleStudies.map((study) => (
          <StudyCard
            key={study.studyId}
            study={study}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}
