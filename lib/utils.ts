type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * El optimizador de `next/image` rechaza SVG salvo que se active
 * `dangerouslyAllowSVG`, así que los servimos tal cual. Al reemplazar un asset
 * por una foto (jpg/png/webp) vuelve a optimizarse sin cambiar nada más.
 */
export function isSvg(src: string) {
  return src.endsWith(".svg");
}
