import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ScrollAnimations } from "@/components/motion/scroll-animations";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
    // `data-scroll-behavior` hace que Next desactive el scroll suave durante
    // las transiciones de ruta. Sin esto el scroll sigue animándose mientras
    // ScrollTrigger mide posiciones, y el parallax se crea con datos a medias.
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} h-full`}
    >
      <head>
        {/* Sin JS no corre GSAP, así que el contenido debe quedar visible. */}
        <noscript>
          <style>{`[data-anim]{opacity:1 !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <ScrollAnimations />
      </body>
    </html>
  );
}
