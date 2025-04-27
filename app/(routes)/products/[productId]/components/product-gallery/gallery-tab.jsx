import Image from "next/image";

export default function GalleryTab({ 
  image, 
  setMainImage, 
  isActive 
}) {
  return (
    <div 
      className={`cursor-pointer border-2 rounded-md overflow-hidden ${
        isActive ? 'border-black' : 'border-transparent'
      }`}
      onClick={() => setMainImage(image)}
    >
      <div className="relative overflow-hidden w-16 h-16 ">
      <Image
          src={image.url}
          alt={image.alt || "Product thumbnail"}
          fill
          priority
          className='object-contain'
        />
      </div>
    </div>
  )
}