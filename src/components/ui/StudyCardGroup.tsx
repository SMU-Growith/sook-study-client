import { StudyCard } from './StudyCard';

export function StudyCardGroup({ onCardClick }: { onCardClick: () => void }) {
  return (
    <div className="flex gap-5">
      <StudyCard onCardClick={onCardClick} />
      <StudyCard onCardClick={onCardClick} />
      <StudyCard onCardClick={onCardClick} />
    </div>
  );
}
