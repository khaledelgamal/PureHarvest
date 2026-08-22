interface CustomerFeedbackSkeletonProps {
  count?: number;
}

export const CustomerFeedbackSkeleton = ({ count = 3 }: CustomerFeedbackSkeletonProps) => {
  return (
    <div className="flex flex-col gap-6 w-full pt-8 lg:max-w-[760px]">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="flex gap-4 items-start pb-6 border-b border-gray-100 last:border-0"
        >
          {/* Avatar Skeleton */}
          <div className="w-12 h-12 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />

          {/* Review Details Skeleton */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
                <div className="h-3.5 w-20 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="h-3.5 w-16 bg-gray-100 rounded animate-pulse" />
            </div>

            <div className="space-y-2 mt-1">
              <div className="h-3.5 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-3.5 w-4/5 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerFeedbackSkeleton;
