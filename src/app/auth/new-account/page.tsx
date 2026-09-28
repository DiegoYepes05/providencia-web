import { RegisterForm } from "./ui/RegisterForm";

export default function NewAccountPage() {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400">
        Cuenta
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">
        Nueva cuenta
      </h1>
      <p className="mt-2 mb-10 text-sm text-white/45">
        Crea tu acceso para comprar en la tienda Veltor.
      </p>

      <RegisterForm />
    </div>
  );
}
