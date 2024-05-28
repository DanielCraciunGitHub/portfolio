import Image from "next/image";
import InfoLibrary from "@/../public/images/info-library.png";
import { cn } from "@/lib/utils";

interface BackgroundImageProps {
  className: string;
}

export const BackgroundImage = ({ className }: BackgroundImageProps) => {
  return (
    <Image
      alt="Background"
      src={InfoLibrary}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      className={cn("-z-50 object-cover", className)}
    />
  );
};
