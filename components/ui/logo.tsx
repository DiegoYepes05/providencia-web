import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center", className)}
      aria-label={`${siteConfig.name} — ir al inicio`}
    >
      <Image
        src="/brand/logo.png"
        alt={siteConfig.legalName}
        width={414}
        height={295}
        priority
        className="h-14 w-auto md:h-16"
      />
    </Link>
  );
}
