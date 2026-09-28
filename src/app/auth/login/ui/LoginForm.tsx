"use client";

import { useEffect } from 'react';
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { authenticate } from "@/actions";
import { IoInformationOutline } from "react-icons/io5";
import clsx from 'clsx';
// import { useRouter } from 'next/navigation';

export const LoginForm = () => {


  // const router = useRouter();
  const [state, dispatch] = useActionState(authenticate, undefined);
  
  console.log(state);

  useEffect(() => {
    if ( state === 'Success' ) {
      // redireccionar
      // router.replace('/');
      window.location.replace('/shop');
    }

  },[state]);



  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email" className="field-label">Correo electrónico</label>
      <input
        className="field mb-6"
        type="email"
        name="email"
      />

      <label htmlFor="password" className="field-label">Contraseña</label>
      <input
        className="field mb-6"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Credenciales no son correctas
            </p>
          </div>
        )}
      </div>

        <LoginButton />
      {/* <button type="submit" className="btn-primary">
        Ingresar
      </button> */}

      {/* divisor l ine */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-white/10"></div>
        <div className="px-3 text-xs uppercase tracking-[0.14em] text-white/35">O</div>
        <div className="flex-1 border-t border-white/10"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      className={ clsx("w-full", {
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={ pending }
      >
      Ingresar
    </button>
  );
}
