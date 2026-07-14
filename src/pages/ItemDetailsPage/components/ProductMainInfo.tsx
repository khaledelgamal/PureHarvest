import React, { useState } from 'react';
import Star from '@/pages/ShopPage/components/Star/Star';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import QuantityInput from '@/components/Inputs/QuantityInput/QuantityInput';
import { Button } from '@/components/Buttons/Button/Button';
import { AddToWishlistButton } from '@/components/Buttons/AddToWishlistButton/AddToWishlistButton';
import {
  FacebookButton,
  TwitterButton,
  PinterestButton,
  InstagramButton,
} from '@/components/Buttons/SocialButton/SocialButton';
import ShoppingBagIcon from '@/icons/ShoppingBagIcon';

export const ProductMainInfo = () => {
  const [quantity, setQuantity] = useState(5);

  return (
    <div className="flex flex-col flex-1 gap-6">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-900">Chinese Cabbage</h1>
        <span className="bg-primary-soft/30 text-primary-hard px-2 py-1 rounded text-sm font-medium">
          In Stock
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <div className="flex text-warn">
            <Star fillPercentage={1} />
            <Star fillPercentage={1} />
            <Star fillPercentage={1} />
            <Star fillPercentage={1} />
            <Star fillPercentage={0} />
          </div>
          <span className="text-gray-900 font-medium">4 Review</span>
        </div>
        <span>•</span>
        <span>
          SKU: <span className="text-gray-900 font-medium">2,51,594</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <PriceDisplay price={17.28} oldPrice={48.0} size="lg" />
        <span className="bg-danger/10 text-danger px-2 py-1 rounded-full text-xs font-semibold ml-2">
          64% Off
        </span>
      </div>

      <hr className="border-gray-200" />

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-medium">Brand:</span>
          {/* Dummy brand logo */}
          <div className="border border-gray-200 rounded p-1 flex items-center justify-center bg-white w-14 h-14">
            <img
              src="https://placehold.co/40x40/fff/00b207?text=F"
              alt="Farmary Logo"
              className="w-full object-contain"
            />
          </div>
        </div>

        <div className="flex items-center justify-start">
          <p className="text-sm">Share item:</p>
          <FacebookButton />
          <TwitterButton />
          <PinterestButton />
          <InstagramButton />
        </div>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed">
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a
        consequat pulvinar.
      </p>

      <div className="flex items-center flex-wrap gap-4 border-y border-gray-200 py-6">
        <QuantityInput
          value={quantity}
          onIncrease={() => setQuantity(q => q + 1)}
          onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
          className="max-w-[150px] flex-shrink-0"
        />

        <Button className="flex-1 min-w-[200px] max-w-[400px] h-[50px] flex items-center justify-center gap-2 rounded-full text-base font-semibold">
          Add to Cart <ShoppingBagIcon className="w-5 h-5" />
        </Button>

        <AddToWishlistButton className="w-[50px] h-[50px] rounded-full flex-shrink-0 bg-primary-soft/20 text-primary hover:bg-primary-soft/30 border-none flex items-center justify-center" />
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <div>
          <span className="text-gray-900 font-medium mr-1">Category:</span>{' '}
          <span className="text-gray-500">Vegetables</span>
        </div>
        <div>
          <span className="text-gray-900 font-medium mr-1">Tag:</span>{' '}
          <span className="text-gray-500">
            Vegetables Healthy{' '}
            <span className="text-gray-900 underline underline-offset-2">Chinese</span> Cabbage
            Green Cabbage
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductMainInfo;
