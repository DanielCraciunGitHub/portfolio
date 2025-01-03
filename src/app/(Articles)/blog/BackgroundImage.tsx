import Image from "next/image"

import { cn } from "@/lib/utils"

import InfoLibrary from "../../../../public/images/info-library.png"

interface BackgroundImageProps {
  className?: string
}

export const BackgroundImage = ({ className }: BackgroundImageProps) => {
  return (
    <Image
      alt="Background"
      src={InfoLibrary}
      placeholder="blur"
      fill
      sizes="100vw"
      className={cn("-z-50 object-cover", className)}
    />
  )
}
