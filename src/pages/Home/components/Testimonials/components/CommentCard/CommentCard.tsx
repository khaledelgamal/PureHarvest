import CommaIcon from '@/icons/CommaIcon';
import type { Comment } from './types';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="flex flex-col items-center max-w-sm mx-auto">
      {/* Speech Bubble Card */}
      <div className="relative bg-white rounded-2xl p-8 shadow-md w-full h-[252px]">
        {/* Quote Icon */}
        <div className="flex justify-center mb-4">
          <CommaIcon className="w-10 h-8 text-primary" />
        </div>

        {/* Comment Text */}
        <p className="text-green-gray-600 text-center leading-relaxed">"{comment.comment}"</p>

        {/* Speech Bubble Tail */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2
            w-0 h-0
            border-l-16 border-l-transparent
            border-r-16 border-r-transparent
            border-t-16 border-t-white"
        />
      </div>

      {/* Avatar & Info */}
      <div className="flex flex-col items-center mt-8 gap-2">
        <img
          src={comment.image}
          alt={comment.name}
          className="w-16 h-16 rounded-full object-cover shadow-md"
        />
        <div className="text-center">
          <p className="font-bold text-gray-800">{comment.name}</p>
          <p className="text-gray-500 text-sm">{comment.role}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
