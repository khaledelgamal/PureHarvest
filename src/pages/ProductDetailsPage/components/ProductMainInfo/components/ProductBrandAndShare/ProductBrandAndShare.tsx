import {
  FacebookButton,
  TwitterButton,
  PinterestButton,
  InstagramButton,
} from '@/components/Buttons/SocialButton/SocialButton';
import type { Product } from '@/services/supabase/products/types';

interface ProductBrandAndShareProps {
  product: Product;
}

export const ProductBrandAndShare = ({ product }: ProductBrandAndShareProps) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-900 font-medium">Brand:</span>
        {product.brand ? (
          <div className="border border-gray-200 rounded p-1 flex items-center justify-center bg-white w-fit h-14">
            <span className="text-xs font-medium text-center">{product.brand.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">N/A</span>
        )}
      </div>

      <div className="flex items-center justify-start">
        <p className="text-sm">Share item:</p>
        <FacebookButton />
        <TwitterButton />
        <PinterestButton />
        <InstagramButton />
      </div>
    </div>
  );
};

export default ProductBrandAndShare;
