import Image from "next/image";
import { productImageSrc } from "@/utils";

interface Props {
  src?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width = 300,
  height = 300,
  fill = false,
  sizes,
}: Props) => {
  const localSrc = productImageSrc(src);

  if (fill) {
    return (
      <Image
        src={localSrc}
        alt={alt}
        fill
        sizes={sizes ?? "200px"}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
    />
  );
};
