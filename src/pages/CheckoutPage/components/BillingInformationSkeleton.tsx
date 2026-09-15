export const BillingInformationSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 w-full" aria-busy="true" role="status">
      {/* Title */}
      <div className="h-8 w-56 bg-gray-100 rounded-md animate-pulse" />

      {/* Row 1: First name, Last name, Company name */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
          <div className="h-[49px] w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
          <div className="h-[49px] w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-44 bg-gray-100 rounded animate-pulse" />
          <div className="h-[49px] w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Row 2: Street Address */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
        <div className="h-[49px] w-full bg-gray-100 rounded-md animate-pulse" />
      </div>

      {/* Row 3: Country, State, Zip Code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
          <div className="h-[49px] w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
          <div className="h-[49px] w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
          <div className="h-[49px] w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Row 4: Email, Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
          <div className="h-[49px] w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
          <div className="h-[49px] w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Row 5: Additional Info */}
      <div className="mt-6 flex flex-col gap-6">
        <div className="h-8 w-44 bg-gray-100 rounded-md animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
          <div className="h-[114px] w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BillingInformationSkeleton;
