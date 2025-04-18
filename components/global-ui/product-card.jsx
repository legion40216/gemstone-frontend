"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { 
  Expand, 
  MapPin, 
  ShoppingBag, 
  Star 
} from 'lucide-react';

import useModalStore from '@/hooks/useModalStore';
import useCart from '@/hooks/useCartStore';
import { getCountryName } from '@/utils/getCountries';

import { Badge } from '@/components/ui/badge';
import Currency from '@/components/global-ui/currency';
import IconButton from '@/components/global-ui/icon-button';

const ProductCard = ({ item }) => {
  const router = useRouter();
  const { addItem } = useCart();  
  const { openModal } = useModalStore();

  const handleClick = () => {
    router.push(`/products/${item?.id}`);
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    openModal(item);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(item);  // Use the addItem function from useCart
  };

  return (
    <div className="bg-white rounded-xl border p-3 space-y-3 
    hover:shadow-md transition h-full flex flex-col"
    >
    <div className="aspect-square overflow-hidden rounded-xl relative group">
      <Image
        className="aspect-square object-cover h-full w-full transition 
        group-hover:scale-105"
        fill
        src={item?.images?.[0]?.url}
        alt={item?.name}
      />
  
      <div 
        className="opacity-0 group-hover:opacity-100 transition absolute inset-0 
        bg-black/30 flex items-center justify-center cursor-pointer" 
        onClick={handleClick}
      >
        <div className="flex gap-3">
          <IconButton
            onClick={handleExpand}
            icon={<Expand size={24} className="text-muted-foreground" />}
          />
          <IconButton
            onClick={handleAddToCart}
            icon={<ShoppingBag size={24} className="text-muted-foreground" />}
          />
        </div>
      </div>
  
      {item?.isFeatured && (
        <Badge className="absolute top-2 left-2 
        bg-yellow-400 text-yellow-800 hover:bg-yellow-400"
        >
          <Star size={12} className="mr-1" /> Featured
        </Badge>
      )}
    </div>
  
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex justify-between gap-3">
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{item?.name}</h3>
            <p className="text-sm text-muted-foreground">{item?.category?.name}</p>
          </div>
        </div>
    
        <div>
          <Currency value={item?.price} />
        </div>
      </div>
  
      {/* New Location Section */}
      {item?.location && (
        <div className="text-sm flex flex-wrap justify-between items-center mt-2">
          <span className="text-muted-foreground">Location:</span>  
          <span className="flex items-center">
          <MapPin className="w-3 h-3 mr-1"/>{getCountryName(item.location)}
          </span>
        </div>
      )}
    </div>  
  </div>
  );
};
export default ProductCard;