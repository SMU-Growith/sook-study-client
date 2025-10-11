import { StudyCard, type Study } from './StudyCard';

interface StudyCardGroupProps {
  studies: Study[];
  onCardClick: () => void;
}

export function StudyCardGroup({ studies, onCardClick }: StudyCardGroupProps) {
  return (
    <div className="flex gap-5">
      {studies.map((study) => (
        <StudyCard key={study.id} study={study} onCardClick={onCardClick} />
      ))}
    </div>
  );
}
