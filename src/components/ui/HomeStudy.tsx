import { Button } from './button';
import { StudyCardGroup } from './StudyCardGroup';

interface HomeStudyProps {
  type?: 'popular' | 'latest';
  onCardClick: () => void;
}
export function HomeStudy({ type, onCardClick }: HomeStudyProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="heading-1">
          {type === 'popular' ? '인기있는 숙터디에요 !' : '새로운 숙터디에요 !'}
        </h2>
        <div className="flex gap-1">
          <Button variant="primary" size="sm">
            더보기
          </Button>
          <Button variant="primary" size="sm">
            더보기
          </Button>
        </div>
      </div>
      <StudyCardGroup onCardClick={onCardClick} />
    </div>
  );
}
