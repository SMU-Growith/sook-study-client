import { Badge } from './Badge';
import { Tag } from './Tag';
import UserProfileSvg from '@/assets/icons/userProfile.svg';
import HeartSvg from '@/assets/icons/heart.svg';
import HeartFillSvg from '@/assets/icons/heartFill.svg';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

export function StudyCard({ onCardClick }: { onCardClick: () => void }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1); // 초기 좋아요 수
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate('/study/detail/1');
    } else {
      onCardClick();
    }
  };

  return (
    <div
      className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5">
          <div>
            <Badge variant="purple">모집중</Badge>
          </div>
          <h3 className="heading-3">
            피그마 스터디하실 분<br />
            모집합니다 !
          </h3>
          <div className="flex gap-1">
            <Tag>디자인</Tag>
            <Tag>온라인/오프라인</Tag>
            <Tag>체계적인</Tag>
          </div>
          <hr className="border-t-3 border-gray-100" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={UserProfileSvg} alt="User Profile" />
            <span className="text-body-2-semibold text-gray-400 ml-1">민서송이</span>
          </div>
          <div className="flex items-center">
            <img
              src={isLiked ? HeartFillSvg : HeartSvg}
              alt="Heart Background"
              onClick={handleLikeClick}
            />
            <span className="text-body-2-semibold text-gray-400 ml-1">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
