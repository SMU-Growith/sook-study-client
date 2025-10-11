import { Badge } from './Badge';
import { Tag } from './Tag';
import UserProfileSvg from '@/assets/icons/userProfile.svg';
import HeartSvg from '@/assets/icons/heart.svg';
import HeartFillSvg from '@/assets/icons/heartFill.svg';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

export interface Study {
  id: number;
  title: string;
  status: '모집중' | '모집완료';
  tags: string[];
  author: string;
  likeCount: number;
}

interface StudyCardProps {
  study: Study;
  onCardClick?: () => void;
}

export function StudyCard({ study, onCardClick }: StudyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(study.likeCount);
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
      onCardClick?.();
    }
  };

  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5" onClick={handleCardClick}>
          <div>
            <Badge variant={study.status === '모집중' ? 'purple' : 'black'}>{study.status}</Badge>
          </div>
          <h3 className="heading-3">{study.title}</h3>
          <div className="flex gap-1">
            {study.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
          <hr className="border-t-3 border-gray-100" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={UserProfileSvg} alt="User Profile" />
            <span className="text-body-2-semibold text-gray-400 ml-1">{study.author}</span>
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
