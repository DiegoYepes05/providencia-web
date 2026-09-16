import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "brand" | "ghost";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-soft",
  secondary:
    "border border-line bg-white text-ink hover:border-ink/25 hover:bg-surface",
  brand: "bg-brand-500 text-white hover:bg-brand-400",
  ghost: "text-ink hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-7 text-sm",
  sm: "h-9 px-4 text-sm",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    variants[variant],
    sizes[size],
    className,
  );
}

/** Permite pasar los `data-*` que consume el runtime de animaciones. */
type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  DataAttributes & {
    variant?: Variant;
    size?: Size;
  };

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={classes(variant, size, className)} {...props} />;
}

type ButtonProps = React.ComponentProps<"button"> &
  DataAttributes & {
    variant?: Variant;
    size?: Size;
  };

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return <button className={classes(variant, size, className)} {...props} />;
}
