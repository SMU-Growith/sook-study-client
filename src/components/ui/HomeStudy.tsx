import { useState } from 'react';
import { Button } from './button';
import { CarouselNavButtons } from './CarouselNavButtons';
import { StudyCardGroup } from './StudyCardGroup';
import type { Study } from './StudyCard';

const popularStudiesData: Study[] = [
  {
    id: 1,
    status: '모집중',
    title: 'Figma 스터디하실 분 모집합니다!',
    tags: ['디자인', '온라인/오프라인', '체계적인'],
    author: '민서송이',
    likeCount: 12,
  },
  {
    id: 2,
    status: '모집중',
    title: 'React 실력 키우실 분! 초보도 환영!',
    tags: ['개발', '온라인', '자율적인'],
    author: '개발왕',
    likeCount: 25,
  },
  {
    id: 3,
    status: '모집완료',
    title: '토익 900점 목표로 같이 공부하실 분 모집합니다.',
    tags: ['어학', '오프라인', '체계적인'],
    author: '영어고수',
    likeCount: 8,
  },
  {
    id: 4,
    status: '모집중',
    title: 'CS 스터디 취준생 모여라',
    tags: ['개발', '온라인', '자율적인'],
    author: '컴공눈송',
    likeCount: 30,
  },
  {
    id: 5,
    status: '모집중',
    title: 'UX/UI 포트폴리오 만들 디자이너 구함',
    tags: ['디자인', '오프라인', '체계적인'],
    author: '디자인장인',
    likeCount: 18,
  },
  {
    id: 6,
    status: '모집중',
    title: '알고리즘 문제풀이 코테 박살내기',
    tags: ['개발', '온라인', '자율적인'],
    author: '코딩천재',
    likeCount: 40,
  },
  {
    id: 7,
    status: '모집완료',
    title: '사이드 플젝 하실 분 기획자/개발자',
    tags: ['개발', '온라인', '자율적인'],
    author: 'PM지망생',
    likeCount: 22,
  },
  {
    id: 8,
    status: '모집중',
    title: '영어 회화 스터디 주 2회 진행',
    tags: ['어학', '오프라인', '체계적인'],
    author: '유학생',
    likeCount: 15,
  },
];

const CARDS_PER_VIEW = 3; // 한 번에 보여줄 카드 수
const MOVE_BY = 2; // 한 번에 이동할 카드 수

interface HomeStudyProps {
  type?: 'popular' | 'latest';
  onCardClick: () => void;
}

const handlePrev = () => {
  console.log('Previous button clicked');
};
const handleNext = () => {
  console.log('Next button clicked');
};

const canGoPrev = true;
const canGoNext = true;

export function HomeStudy({ type, onCardClick }: HomeStudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const studyData = type === 'popular' ? popularStudiesData : popularStudiesData.slice().reverse();
  const totalStudies = studyData.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - MOVE_BY, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + MOVE_BY, totalStudies - CARDS_PER_VIEW));
  };

  const visibleStudies = studyData.slice(currentIndex, currentIndex + CARDS_PER_VIEW);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalStudies - CARDS_PER_VIEW;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="heading-1">
          {type === 'popular' ? '인기있는 숙터디에요 !' : '새로운 숙터디에요 !'}
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
      <StudyCardGroup studies={visibleStudies} onCardClick={onCardClick} />
    </div>
  );
}
