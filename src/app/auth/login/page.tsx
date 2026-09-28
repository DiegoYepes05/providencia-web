import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400">
        Cuenta
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">
        Ingresar
      </h1>
      <p className="mt-2 mb-10 text-sm text-white/45">
        Accede para ver tus órdenes y continuar la compra.
      </p>

      <LoginForm />
    </div>
  );
}
