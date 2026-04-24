const OrderDetailsPageSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-7 w-40 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-4 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="h-9 w-28 bg-gray-100 rounded-full animate-pulse" />
      </div>

      {/* Addresses + Summary skeleton */}
      <div className="bg-white flex gap-6 px-6 pt-6">
        <div className="rounded-md border border-gray-100 w-full flex divide-x divide-gray-100">
          <div className="p-4 flex-1 space-y-3">
            <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="p-4 flex-1 space-y-3">
            <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        <div className="rounded-md border border-gray-100 w-80 p-4 space-y-3">
          <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Progress Tracker skeleton */}
      <div className="px-12 py-7">
        <div className="h-16 bg-gray-100 rounded animate-pulse" />
      </div>

      {/* Products Table skeleton */}
      <div className="p-6 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
};
export default OrderDetailsPageSkeleton;
