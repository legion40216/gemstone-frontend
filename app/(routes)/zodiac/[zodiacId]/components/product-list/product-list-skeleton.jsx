import React from 'react'
import ProductSkeleton from './product-list-skeleton/product-skeleton'

export default function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {[...Array(6)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  )
}
