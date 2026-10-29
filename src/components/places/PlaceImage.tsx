import { useState } from 'react'
import { categoryColor } from '../../constants/categories'
import { photoSrc } from '../../utils/images'

interface PlaceImageProps {
  photos?: string[]
  name: string
  type?: string
  className?: string
  alt?: string
}

export default function PlaceImage({ photos, name, type, className, alt }: PlaceImageProps) {
  const color = categoryColor(type || '')
  const [src, setSrc] = useState(() => photoSrc(photos, name, color))
  const [failed, setFailed] = useState(false)

  return (
    <img
      src={src}
      alt={alt || name}
      className={className}
      loading="lazy"
      onError={() => {
        if (failed) return
        setFailed(true)
        setSrc(photoSrc(undefined, name, color))
      }}
    />
  )
}
