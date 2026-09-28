import Image from "next/image";
import Link from "next/link";
import { getLandingCatalog } from "@/actions";
import { Container } from "@/components/ui/container";
import { lineup } from "@/content/landing";

export async function ProductsPreview() {
  const items = await getLandingCatalog();

  return (
    <section id="modelos" className="scroll-mt-20 bg-void">
      <Container className="py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p
              data-anim
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
            >
              {lineup.eyebrow}
            </p>
            <h2
              data-anim
              className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl"
            >
              {lineup.heading}
            </h2>
          </div>
          <p
            data-anim
            className="text-[11px] uppercase tracking-[0.16em] text-white/40"
          >
            {lineup.aside}
          </p>
        </div>

        <ul className="mt-16 grid gap-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {items.map((item) => (
            <li key={item.slug} data-anim-group>
              <Link href={`/product/${item.slug}`} className="group block">
                <div
                  data-anim="scale-in"
                  className="relative aspect-4/3 overflow-hidden bg-panel"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                <div
                  data-anim
                  className="mt-8 flex items-baseline justify-between gap-4"
                >
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {item.name}
                  </h3>
                  <p className="shrink-0 text-sm text-white/45">{item.price}</p>
                </div>

                <p data-anim className="mt-3 max-w-md text-sm leading-6 text-white/50">
                  {item.description}
                </p>

                <dl
                  data-anim
                  className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6"
                >
                  {item.specs.map((spec) => (
                    <div key={spec.label}>
                      <dd className="text-sm font-semibold text-white">
                        {spec.value}
                      </dd>
                      <dt className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/40">
                        {spec.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
