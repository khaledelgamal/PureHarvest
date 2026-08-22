import ReactMarkdown from 'react-markdown';
import { ProductDetailsVideo } from '../ProductDetailsVideo/ProductDetailsVideo';
import type { Product } from '@/services/supabase/products/types';

interface Props {
  product: Product;
}

export const DescriptionTab = ({ product }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full pt-8">
      {/* Left side: Markdown */}
      <div className="flex-1 text-gray-500 text-sm leading-relaxed prose max-w-none prose-sm prose-p:text-gray-500 prose-li:text-gray-500 prose-ul:list-image-[url(/check-circle.svg)]">
        <ReactMarkdown>{product.description || '*No description available.*'}</ReactMarkdown>
      </div>

      <ProductDetailsVideo />
    </div>
  );
};
