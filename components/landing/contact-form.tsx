"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-400 focus:outline-none";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  // El envío todavía no está conectado a un backend ni a un CRM.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8">
        <h3 className="text-base font-bold text-ink">Mensaje recibido</h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          Gracias por escribirnos. Un especialista te contacta dentro del
          siguiente día hábil.
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-5"
          onClick={() => setSent(false)}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="nombre">
          <input
            id="nombre"
            name="nombre"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={fieldClass}
          />
        </Field>

        <Field label="Correo corporativo" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="nombre@empresa.com"
            className={fieldClass}
          />
        </Field>

        <Field label="Empresa" htmlFor="empresa">
          <input
            id="empresa"
            name="empresa"
            required
            autoComplete="organization"
            placeholder="Nombre de la empresa"
            className={fieldClass}
          />
        </Field>

        <Field label="Tamaño del equipo" htmlFor="equipo">
          <select id="equipo" name="equipo" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="1-50">1 a 50 personas</option>
            <option value="51-250">51 a 250 personas</option>
            <option value="251-1000">251 a 1.000 personas</option>
            <option value="1000+">Más de 1.000 personas</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="¿Qué necesitas resolver?" htmlFor="mensaje">
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            required
            placeholder="Cuéntanos brevemente el contexto de tu operación."
            className={`${fieldClass} resize-y`}
          />
        </Field>
      </div>

      <Button type="submit" variant="brand" className="mt-6 w-full sm:w-auto">
        Enviar mensaje
      </Button>
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
        className="mb-2 block text-xs font-semibold text-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
