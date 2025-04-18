import React from 'react'
  
  export default function Billboard({ 
    imageUrl, 
    label 
  }) {
    return (
      <div className="overflow-hidden rounded-xl">
        <div 
          className="relative grid aspect-square place-items-center 
          overflow-hidden bg-cover md:aspect-[3/1]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <h2 className="max-w-xs text-3xl font-bold sm:max-w-xl 
          sm:text-5xl lg:text-6xl"
          >
            {label}
          </h2>
        </div>
      </div>
    )
  }
