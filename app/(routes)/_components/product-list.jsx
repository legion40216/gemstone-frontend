import React from 'react'

import ProductCard from '@/components/global-ui/product-card'
import NoResults from '@/components/global-ui/no-results'

export default function ProductList({
    title,
    items
}) {
  return (
    <div className="space-y-5">
        <div>
             <h3 className="font-bold text-xl">
                {title}
             </h3>
        </div>
        <div>
          {items.length > 0 ? (
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
    </div>
  )
}