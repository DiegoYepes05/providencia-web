"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Runtime de animaciones del sitio. Se monta una sola vez en el layout raíz y
 * maneja todo por atributos `data-*`, así las secciones siguen siendo Server
 * Components sin refs ni wrappers extra:
 *
 *   data-anim="fade-up" | "fade" | "scale-in"
 *       Elemento que entra al hacer scroll. `data-anim` sin valor = "fade-up".
 *
 *   data-anim-group            Agrupa los `[data-anim]` que tenga dentro en un
 *   data-anim-group="load"     solo trigger con stagger. Con "load" arranca al
 *                              montar en vez de esperar el scroll.
 *
 *   data-count-to="60"         Contador tipo dashboard. Admite
 *   data-count-decimals="2"    `data-count-suffix` y `data-count-prefix`.
 *
 *   data-parallax="0.12"       Desplazamiento suave ligado al scroll.
 *
 * El estado inicial oculto vive en CSS (ver globals.css) para que no haya
 * parpadeo entre el HTML prerenderizado y la hidratación.
 */
export function ScrollAnimations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const html = document.documentElement;
      const hash = window.location.hash;

      // CSS smooth + ScrollTrigger no pueden convivir: el scroll animado
      // deja triggers a medias y GSAP explota al leer `.end`.
      html.style.scrollBehavior = "auto";
      if (hash) {
        document
          .querySelector(hash)
          ?.scrollIntoView({ behavior: "instant", block: "start" });
        html.getBoundingClientRect();
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        revealAll();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Con hash el viewport ya no está en el hero: crear ScrollTrigger
        // ahora es la receta del crash `.end`, y las entradas se quedan a medias.
        if (hash) {
          revealAll();
          return;
        }

        try {
          bindReveals();
          bindParallax();
          bindCounters();
        } catch {
          revealAll();
        }
      });

      return () => {
        html.style.scrollBehavior = "";
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}

function revealAll() {
  gsap.set("[data-anim]", { opacity: 1, y: 0, scale: 1 });
  document
    .querySelectorAll<HTMLElement>("[data-count-to]")
    .forEach((el) => renderCount(el, readCountTarget(el)));
}

function bindReveals() {
  gsap.utils.toArray<HTMLElement>("[data-anim-group]").forEach((group) => {
    const items = gsap.utils.toArray<HTMLElement>(
      group.querySelectorAll("[data-anim]"),
    );
    if (!items.length) return;

    const onLoad = group.dataset.animGroup === "load";

    try {
      const timeline = gsap.timeline({
        defaults: { duration: 0.65, ease: "power2.out" },
        delay: onLoad ? 0.05 : 0,
        ...(onLoad
          ? {}
          : {
              scrollTrigger: { trigger: group, start: "top 80%", once: true },
            }),
      });

      addReveal(timeline, items, onLoad ? 0.07 : 0.09);
    } catch {
      gsap.set(items, { opacity: 1, y: 0, scale: 1 });
    }
  });

  gsap.utils
    .toArray<HTMLElement>("[data-anim]:not([data-anim-group] *)")
    .forEach((el) => {
      try {
        const timeline = gsap.timeline({
          defaults: { duration: 0.65, ease: "power2.out" },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });

        addReveal(timeline, [el], 0);
      } catch {
        gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      }
    });
}

function bindParallax() {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const trigger = el.parentElement;
    if (!trigger?.isConnected) return;

    const factor = Number(el.dataset.parallax) || 0.12;

    try {
      gsap.fromTo(
        el,
        { yPercent: -factor * 50 },
        {
          yPercent: factor * 50,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    } catch {
      gsap.set(el, { yPercent: 0 });
    }
  });
}

function bindCounters() {
  gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach((el) => {
    const target = readCountTarget(el);
    const counter = { value: 0 };
    renderCount(el, 0);

    try {
      gsap.to(counter, {
        value: target,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => renderCount(el, counter.value),
      });
    } catch {
      renderCount(el, target);
    }
  });
}

/** Agrega los tweens de entrada directamente sobre `timeline`, todos en t=0. */
function addReveal(
  timeline: gsap.core.Timeline,
  items: HTMLElement[],
  stagger: number,
) {
  const byKind = {
    up: items.filter((el) => revealKind(el) === "fade-up"),
    fade: items.filter((el) => revealKind(el) === "fade"),
    scale: items.filter((el) => revealKind(el) === "scale-in"),
  };

  if (byKind.up.length) {
    timeline.fromTo(
      byKind.up,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, stagger },
      0,
    );
  }
  if (byKind.fade.length) {
    timeline.fromTo(byKind.fade, { opacity: 0 }, { opacity: 1, stagger }, 0);
  }
  if (byKind.scale.length) {
    timeline.fromTo(
      byKind.scale,
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, stagger },
      0,
    );
  }
}

/**
 * JSX serializa un atributo sin valor (`data-anim`) como `"true"`, así que
 * cualquier valor que no sea un modo conocido cae en el de por defecto.
 */
function revealKind(el: HTMLElement) {
  const value = el.dataset.anim;
  return value === "fade" || value === "scale-in" ? value : "fade-up";
}

function readCountTarget(el: HTMLElement) {
  return Number(el.dataset.countTo) || 0;
}

function renderCount(el: HTMLElement, value: number) {
  const decimals = Number(el.dataset.countDecimals) || 0;
  const formatted = value.toLocaleString("es-CO", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  el.textContent = `${el.dataset.countPrefix ?? ""}${formatted}${el.dataset.countSuffix ?? ""}`;
}
