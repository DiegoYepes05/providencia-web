"use client";

import { useEffect, useState } from "react";
import { useVariant } from "@/components/product-landing/variant-context";
import { formatPrecio, type Producto } from "@/content/productos";

const field =
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[var(--accent)] focus:outline-none";

type ReservaEnviada = {
  codigo: string;
  variante: string;
  color: string;
  ciudad: string;
  fecha: string;
  horario: string;
};

export function ReservationForm({ producto }: { producto: Producto }) {
  const reserva = producto.reserva;
  const { seleccionado } = useVariant();
  const [enviada, setEnviada] = useState<ReservaEnviada | null>(null);
  const [minFecha, setMinFecha] = useState("");

  useEffect(() => {
    const today = new Date();
    const local = new Date(today.getTime() - today.getTimezoneOffset() * 60_000);
    setMinFecha(local.toISOString().slice(0, 10));
  }, []);

  if (!reserva || !reserva.disponible) return null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const codigo = `PRV-${producto.slug.slice(0, 3).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    const colorSlug = String(data.get("color") ?? seleccionado.slug);
    const color =
      producto.colores.find((item) => item.slug === colorSlug)?.nombre ??
      seleccionado.nombre;

    setEnviada({
      codigo,
      variante: String(data.get("variante") ?? ""),
      color,
      ciudad: String(data.get("ciudad") ?? ""),
      fecha: String(data.get("fecha") ?? ""),
      horario: String(data.get("horario") ?? ""),
    });
  }

  if (enviada) {
    return (
      <div className="rounded-2xl border border-white/12 bg-white/4 p-8">
        <p
          className="text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--accent)" }}
        >
          Reserva confirmada
        </p>
        <h3 className="mt-3 text-lg font-bold">
          {producto.nombre} apartado a tu nombre
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Un asesor te escribe hoy para confirmar el abono de{" "}
          {formatPrecio(reserva.deposito)}. Tu unidad queda separada{" "}
          {reserva.vigenciaDias} días.
        </p>

        <dl className="mt-6 grid gap-3 border-t border-white/10 pt-6 text-sm sm:grid-cols-2">
          <Row etiqueta="Código" valor={enviada.codigo} />
          <Row etiqueta="Versión" valor={`${producto.nombre.split(" ")[0]} ${enviada.variante}`} />
          <Row etiqueta="Color" valor={enviada.color} />
          <Row etiqueta="Ciudad" valor={enviada.ciudad} />
          <Row etiqueta="Fecha" valor={formatFecha(enviada.fecha)} />
          <Row etiqueta="Horario" valor={enviada.horario} />
        </dl>

        <button
          type="button"
          onClick={() => setEnviada(null)}
          className="mt-7 inline-flex h-10 items-center rounded-full border border-white/20 px-5 text-sm font-semibold transition-colors hover:bg-white/10"
        >
          Hacer otra reserva
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/12 bg-white/4 p-8"
    >
      <p className="text-sm leading-6 text-white/55">
        Abono de {formatPrecio(reserva.deposito)} · vigencia{" "}
        {reserva.vigenciaDias} días
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="r-nombre">
          <input
            id="r-nombre"
            name="nombre"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={field}
          />
        </Field>

        <Field label="Celular" htmlFor="r-celular">
          <input
            id="r-celular"
            name="celular"
            type="tel"
            required
            autoComplete="tel"
            placeholder="300 000 0000"
            className={field}
          />
        </Field>

        <Field label="Ciudad" htmlFor="r-ciudad">
          <select
            id="r-ciudad"
            name="ciudad"
            required
            defaultValue={reserva.ciudades[0]}
            className={field}
          >
            {reserva.ciudades.map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Versión" htmlFor="r-variante">
          <select
            id="r-variante"
            name="variante"
            defaultValue={
              producto.variantes.find((item) => item.destacada)?.nombre ??
              producto.variantes[0]?.nombre
            }
            className={field}
          >
            {producto.variantes.map((variante) => (
              <option key={variante.id} value={variante.nombre}>
                {producto.nombre.split(" ")[0]} {variante.nombre}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Fecha de entrega" htmlFor="r-fecha">
          <input
            id="r-fecha"
            name="fecha"
            type="date"
            required
            min={minFecha || undefined}
            defaultValue={minFecha}
            key={minFecha || "fecha-pendiente"}
            className={`${field} scheme-dark`}
          />
        </Field>

        <Field label="Horario" htmlFor="r-horario">
          <select
            id="r-horario"
            name="horario"
            required
            defaultValue={reserva.horarios[0]}
            className={field}
          >
            {reserva.horarios.map((horario) => (
              <option key={horario} value={horario}>
                {horario}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Color" htmlFor="r-color">
          <select
            id="r-color"
            name="color"
            key={seleccionado.slug}
            defaultValue={seleccionado.slug}
            className={field}
          >
            {producto.colores.map((color) => (
              <option key={color.slug} value={color.slug}>
                {color.nombre}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <p className="mt-5 text-xs leading-5 text-white/40">{reserva.nota}</p>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold text-white transition-transform hover:scale-[1.02] sm:w-auto sm:px-8"
        style={{ backgroundColor: "var(--accent)" }}
      >
        {producto.cta.principal.etiqueta}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-semibold text-white/70"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Row({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.12em] text-white/40">
        {etiqueta}
      </dt>
      <dd className="mt-1 font-semibold text-white">{valor}</dd>
    </div>
  );
}

function formatFecha(value: string) {
  if (!value) return "Por confirmar";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
