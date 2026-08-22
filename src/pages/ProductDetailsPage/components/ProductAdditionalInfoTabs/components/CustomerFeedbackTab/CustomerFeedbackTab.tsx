import Star from '@/pages/ShopPage/components/Star/Star';
import { Button } from '@/components/Buttons/Button/Button';
import type { Product } from '@/services/supabase/products/types';
import useProductReviews from './hooks/useProductReviews';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CustomerFeedbackSkeleton from './components/CustomerFeedbackSkeleton/CustomerFeedbackSkeleton';

dayjs.extend(relativeTime);

interface Props {
  product: Product;
}

export const CustomerFeedbackTab = ({ product }: Props) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProductReviews(product.id);

  const reviews = data?.pages.flatMap(page => page?.reviews || []) || [];

  if (isLoading) {
    return <CustomerFeedbackSkeleton count={3} />;
  }

  if (isError) {
    return <div className="py-8 text-center text-danger">Failed to load reviews.</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full pt-8 lg:max-w-[760px]">
      {reviews.map(review => {
        const userName =
          [review.user?.firstName, review.user?.lastName].filter(Boolean).join(' ') || 'Customer';
        const userInitial = (review.user?.firstName || userName).charAt(0).toUpperCase();

        return (
          <div
            key={review.id}
            className="flex gap-4 items-start pb-6 border-b border-gray-100 last:border-0"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              {review.user?.avatarUrl ? (
                <img
                  src={review.user.avatarUrl}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold bg-gray-200">
                  {userInitial}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h5 className="font-semibold text-gray-900 text-sm">
                    {userName}
                  </h5>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fillPercentage={Math.min(1, Math.max(0, review.rating - i))} />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">{dayjs(review.createdAt).fromNow()}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mt-1">{review.comment}</p>
            </div>
          </div>
        );
      })}

      {hasNextPage && (
        <div className="flex justify-start mt-2">
          <Button
            className="rounded-full px-8 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-none"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};
