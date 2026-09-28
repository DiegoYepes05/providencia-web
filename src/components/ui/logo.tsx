import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  className,
  priority = false,
}: {
  href?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center", className)}
      aria-label={`${siteConfig.name} — ir al inicio`}
    >
      <Image
        src="/brand/logo.png"
        alt=""
        width={646}
        height={363}
        priority={priority}
        className="h-11 w-auto md:h-12"
      />
    </Link>
  );
}
