import ChervonBtnNextBck from '@/assets/icons/chervonBtnNextBck.svg';
import ChervonBtnPrevBck from '@/assets/icons/chervonBtnPrevBck.svg';
import ChervonBtnNextGray from '@/assets/icons/chervonBtnNextGray.svg';
import ChervonBtnPrevGray from '@/assets/icons/chervonBtnPrevGray.svg';

interface CarouselNavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export function CarouselNavButtons({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: CarouselNavButtonsProps) {
  return (
    <div className="flex gap-1">
      <button onClick={onPrev} disabled={!canGoPrev} aria-label="Previous studies">
        <img src={canGoPrev ? ChervonBtnPrevBck : ChervonBtnPrevGray} alt="" />
      </button>
      <button onClick={onNext} disabled={!canGoNext} aria-label="Next studies">
        <img src={canGoNext ? ChervonBtnNextBck : ChervonBtnNextGray} alt="" />
      </button>
    </div>
  );
}
