import { StudyCard } from './StudyCard';

export function StudyCardGroup() {
  return (
    <div className="flex gap-5">
      <StudyCard />
      <StudyCard />
      <StudyCard />
    </div>
  );
}
