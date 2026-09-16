import { Container } from "@/components/ui/container";
import { ReservationForm } from "@/components/product-landing/reservation-form";
import { formatPrecio, whatsappHref, type Producto } from "@/content/productos";

export function ProductReserve({ producto }: { producto: Producto }) {
  const reserva = producto.reserva;
  if (!reserva || !reserva.disponible) return null;

  return (
    <section
      id="reservar"
      className="relative scroll-mt-24 overflow-hidden bg-[#0b0e14] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ backgroundColor: "var(--accent)" }}
      />

      <Container className="relative py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p
              data-anim
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--accent)" }}
            >
              {reserva.etiqueta}
            </p>
            <h2
              data-anim
              className="mt-5 text-[1.875rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]"
            >
              Reserva tu {producto.nombre} y la separamos a tu nombre
            </h2>
            <p
              data-anim
              className="mt-5 max-w-md text-[15px] leading-7 text-white/55"
            >
              Elige color, ciudad y fecha. Confirmamos disponibilidad el mismo
              día y apartamos la unidad {reserva.vigenciaDias} días con un
              abono de {formatPrecio(reserva.deposito)}.
            </p>

            <ol data-anim-group className="mt-10 space-y-5">
              {reserva.pasos.map((paso, index) => (
                <li key={paso.id} data-anim className="flex gap-4">
                  <span
                    className="grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{paso.titulo}</p>
                    <p className="mt-1 text-sm leading-6 text-white/50">
                      {paso.descripcion}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              data-anim
              href={whatsappHref(producto.cta.whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {producto.cta.whatsapp.etiqueta}
            </a>
          </div>

          <div data-anim="scale-in">
            <ReservationForm producto={producto} />
          </div>
        </div>
      </Container>
    </section>
  );
}
