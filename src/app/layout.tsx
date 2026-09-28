import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { ScrollAnimations } from "@/components/motion/scroll-animations";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${interTight.variable} h-full`}
    >
      <head>
        <noscript>
          <style>{`[data-anim]{opacity:1 !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-void text-ink">
        {children}
        <ScrollAnimations />
      </body>
    </html>
  );
}
