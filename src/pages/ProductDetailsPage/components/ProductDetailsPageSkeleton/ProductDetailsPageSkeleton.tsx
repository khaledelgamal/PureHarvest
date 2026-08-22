import { classNames } from '@/utils';
import { sectionContainer, sectionPaddingY } from '@/constants/global.styles';

export const ProductDetailsPageSkeleton = () => {
  return (
    <div className={classNames(sectionContainer, sectionPaddingY)}>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Left Column: Product Images Skeleton */}
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-1/2">
          {/* Thumbnails */}
          <div className="flex md:flex-col items-center gap-3 h-auto md:h-[500px]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gray-100 animate-pulse flex-shrink-0"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 aspect-square rounded-lg bg-gray-100 animate-pulse" />
        </div>

        {/* Right Column: Product Main Info Skeleton */}
        <div className="flex flex-col flex-1 gap-6">
          {/* Title & Badge */}
          <div className="flex items-center gap-4">
            <div className="h-9 w-3/5 bg-gray-100 rounded-md animate-pulse" />
            <div className="h-6 w-20 bg-gray-100 rounded-md animate-pulse" />
          </div>

          {/* Rating & SKU */}
          <div className="flex items-center gap-4">
            <div className="h-5 w-28 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-6 w-16 bg-gray-100 rounded animate-pulse" />
          </div>

          <hr className="border-gray-100" />

          {/* Brand & Share */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-12 bg-gray-100 rounded animate-pulse" />
              <div className="h-14 w-20 bg-gray-100 rounded border border-gray-100 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-20 bg-gray-100 rounded animate-pulse" />
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Description paragraphs */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
          </div>

          {/* Quantity & CTA buttons */}
          <div className="flex items-center flex-wrap gap-4 border-y border-gray-100 py-6">
            <div className="h-[50px] w-[130px] rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
            <div className="h-[50px] flex-1 min-w-[200px] max-w-[400px] rounded-full bg-gray-100 animate-pulse" />
            <div className="h-[50px] w-[50px] rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
          </div>

          {/* Category & Tags */}
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-52 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-16">
        <div className="flex justify-center border-b border-gray-100 pb-4">
          <div className="flex gap-8 md:gap-16">
            <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-6 w-36 bg-gray-100 rounded animate-pulse" />
            <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        <div className="mt-8 space-y-3 max-w-2xl">
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-11/12 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPageSkeleton;
