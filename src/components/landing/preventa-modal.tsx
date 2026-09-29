"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { preventa } from "@/content/preventa";

const storageKey = "veltor-preventa-dismissed";

export function PreventaModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/preventa") return;
    if (window.localStorage.getItem(storageKey)) return;

    const timer = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const dismiss = () => {
    window.localStorage.setItem(storageKey, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Cerrar preventa"
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        onClick={dismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="preventa-title"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-void shadow-2xl"
      >
        <div className="relative aspect-4/5">
          <Image
            src={preventa.image.src}
            alt={preventa.image.alt}
            fill
            sizes="(max-width: 480px) 100vw, 28rem"
            className="object-cover object-[70%_40%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-void via-void/55 to-void/20" />

          <button
            type="button"
            onClick={dismiss}
            aria-label="Cerrar"
            className="absolute top-4 right-4 grid size-9 place-items-center rounded-full border border-white/20 bg-void/50 text-white backdrop-blur-sm"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[11px] font-medium tracking-[0.2em] text-brand-400 uppercase">
              {preventa.eyebrow}
            </p>
            <h2
              id="preventa-title"
              className="mt-3 text-3xl font-semibold leading-[0.95] tracking-[-0.04em] text-white"
            >
              {preventa.headline}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65">{preventa.body}</p>

            <div className="mt-6 flex flex-col gap-2">
              <ButtonLink
                href={preventa.actions.whatsapp.href}
                target="_blank"
                rel="noreferrer"
                onClick={dismiss}
              >
                {preventa.actions.whatsapp.label}
              </ButtonLink>
              <ButtonLink
                href={preventa.actions.page.href}
                variant="secondary"
                onClick={dismiss}
              >
                {preventa.actions.page.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
