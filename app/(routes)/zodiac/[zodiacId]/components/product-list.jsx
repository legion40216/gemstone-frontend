'use client'
import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'

import { useProducts } from '@/app/actions/use-products'

import ProductCard from '@/components/global-ui/product-card'
import NoResults from '@/components/global-ui/no-results'
import ProductListSkeleton from './product-list/product-list-skeleton'


export default function ProductList({ initialData }) {
  const params = useParams()
  const searchParams = useSearchParams();

  const zodiacId = params.zodiacId;
  const colorId = searchParams.get('colorId');
  const sizeId = searchParams.get('sizeId');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  // Use the useProducts hook to fetch data
  const { products, isLoading, isError } = useProducts({
    zodiacId,
    colorId,
    sizeId,
    maxPrice,
    minPrice,
    initialData,  // Pass initialData for the initial render
  });

  if (isLoading) {
    return <ProductListSkeleton />
  }

  if (isError) {
    return <div>Error loading products.</div>
  }

  return (
    <div className="space-y-5">
      {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 
          sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]"
          >
              {items.map((item) => (
                <ProductCard 
                  key={item.id}
                  item={item}
                />
              ))}
          </div>
      ) : ( 
        <NoResults/>
      )}
    </div>
  )
}
