export const productImageSrc = (src?: string | null) => {
  if (!src) return "/imgs/placeholder.jpg";
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return `/products/${src}`;
};
