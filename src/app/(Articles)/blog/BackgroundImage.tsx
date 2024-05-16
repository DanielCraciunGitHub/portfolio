import Image from "next/image";
import InfoLibrary from "@/../public/images/info-library.png";

interface BackgroundImageProps {}

export const BackgroundImage = ({}: BackgroundImageProps) => {
  return (
    <Image
      alt="Background"
      src={InfoLibrary}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      className="-z-50 object-cover"
    />
  );
};
