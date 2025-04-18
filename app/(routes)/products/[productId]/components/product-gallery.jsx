'use client'
import Image from 'next/image'
import { useState } from 'react'
import GalleryTab from './product-gallery/gallery-tab'

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className="grid grid-cols-1 gap-2 h-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4">
      <Image
          src={mainImage.url}
          alt={mainImage.alt || "Main product image"}
          fill
          priority
        />
      </div>
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