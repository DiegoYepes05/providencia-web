import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "brand" | "ghost";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary: "bg-brand-400 text-void hover:bg-brand-300",
  secondary: "border border-white/20 bg-transparent text-white hover:bg-white/8",
  brand: "bg-brand-400 text-void hover:bg-brand-300",
  ghost: "text-white/70 hover:bg-white/8 hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-7 text-sm",
  sm: "h-9 px-4 text-[13px]",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400",
    variants[variant],
    sizes[size],
    className,
  );
}

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
