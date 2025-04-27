'use client'
import Image from 'next/image'
import { useState } from 'react'
import GalleryTab from './product-gallery/gallery-tab'

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0])
  
  return (
    <div className='flex flex-col gap-4'>
      <div className="relative w-full aspect-square max-h-[300px]">
      <Image
          src={mainImage.url}
          alt={mainImage.alt || "Main product image"}
          fill
          priority
          className='object-contain'
        />
      </div>
      {/* Gallery Tabs */}
      <div className="flex gap-3 flex-wrap">
        {images.map((image, index) => (
          <GalleryTab
            key={index}
            image={image}
            setMainImage={setMainImage}
            isActive={image.url === mainImage.url}
          />
        ))}
      </div>
    </div>
  )
}