import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getCountryName } from '@/utils/getCountries';
import ProductActions from './product-details/product-actions';

export default function ProductDetails({ data }) {
  return (
    <div className="space-y-6">
      {/* Product Name and Price */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-2xl font-semibold mt-2">${data.price}</p>
      </div>

      {/* Color and Size */}
      <div className="space-y-5">
        <div className="flex gap-4 items-center">
          <h3 className="text-sm font-medium">Color:</h3>
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: data.color.value }}
          ></div>
        </div>

        {/* Size */}
        <div className="flex gap-4 items-center">
          <h3 className="text-sm font-medium">Size:</h3>
          <Badge className="text-base" variant="secondary">{data.size.value}</Badge>
        </div>
        
        {/* Location */}
        <div className="flex gap-3">
          <span className="text-muted-foreground">Location:</span>  
          <span className="flex items-center">
            {getCountryName(data.location)}
          </span>
        </div>
      </div>

      {/* Product Description */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Description</h3>
        <p className="text-sm text-muted-foreground">
          {data.description ||
            `This beautiful ${data.category.name.toLowerCase()} is a perfect 
            addition to your collection.
            Its ${data.color.name.toLowerCase()} color and
            ${data.size.name.toLowerCase()} size make it
            a versatile piece for any occasion.`
          }
        </p>
      </div>
      
      <ProductActions 
      data={data}
      />
    </div>
  );
}