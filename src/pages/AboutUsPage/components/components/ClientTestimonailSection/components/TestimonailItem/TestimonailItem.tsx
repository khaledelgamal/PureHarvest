import { Star } from 'lucide-react';
import type { User } from '../../types';
import DoubleQuotationMarkIcon from '@/icons/DoubleQuotationMarkIcon';

type Props = {
  comment: string;
  user: User;
  rate: number;
};

const TestimonailItem = ({ comment, user, rate }: Props) => {
  return (
    <div className="embla__slide">
      <div className="p-6 flex flex-col justify-start gap-4 rounded-lg bg-white text-sm">
        <DoubleQuotationMarkIcon className="text-primary w-8 h-6.5" />

        <p>{comment}</p>

        <div className="flex  justify-between">
          {/* User Info */}
          <div className="flex gap-3 items-center justify-center">
            <img src={user.image} alt={user.name} className="w-14 h-14 rounded-full" />
            <div className="flex flex-col ">
              <p>{user.name}</p>
              <p className="text-gray-400">{user.role}</p>
            </div>
          </div>
          {/* Rating */}
          <div className="flex gap-1">
            {/* Icons from lucide react */}
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={i < rate ? 'text-warn fill-warn' : 'text-gray-300'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestimonailItem;
