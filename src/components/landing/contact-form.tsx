"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400">
          Mensaje recibido
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
          Te contactamos en el día.
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/50">
          Un asesor confirma disponibilidad, ciudad y el siguiente paso.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8"
          onClick={() => setSent(false)}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="nombre">
          <input
            id="nombre"
            name="nombre"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className="field"
          />
        </Field>
        <Field label="Correo" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="correo@ejemplo.com"
            className="field"
          />
        </Field>
      </div>
      <Field label="Ciudad" htmlFor="ciudad">
        <input
          id="ciudad"
          name="ciudad"
          required
          placeholder="Bogotá"
          className="field"
        />
      </Field>
      <Field label="Mensaje" htmlFor="mensaje">
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          required
          placeholder="Cuéntanos qué modelo te interesa."
          className="field resize-y"
        />
      </Field>
      <Button type="submit" className="w-full sm:w-auto">
        Enviar mensaje
        <span aria-hidden="true">→</span>
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
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
    </div>
  );
}
