"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import { login, registerUser } from '@/actions';
import { useState } from 'react';


type FormInputs = {
  name: string;
  email: string;
  password: string;  
}



export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async(data) => {
    setErrorMessage('');
    const { name, email, password } = data;
    
    // Server action
    const resp = await registerUser( name, email, password );

    if ( !resp.ok ) {
      setErrorMessage( resp.message );
      return;
    }

    await login( email.toLowerCase(), password );
    window.location.replace('/shop');


  }


  return (
    <form onSubmit={ handleSubmit( onSubmit ) }  className="flex flex-col">

      {/* {
        errors.name?.type === 'required' && (
          <span className="text-red-500">* El nombre es obligatorio</span>
        )
      } */}


      <label htmlFor="name" className="field-label">Nombre completo</label>
      <input
        className={
          clsx(
            "field mb-6",
            {
              'border-red-500': errors.name,
            }
          )
        }
        type="text"
        autoFocus
        { ...register('name', { required: true }) }
      />

      <label htmlFor="email" className="field-label">Correo electrónico</label>
      <input
        className={
          clsx(
            "field mb-6",
            {
              'border-red-500': errors.email,
            }
          )
        }
        type="email"
        { ...register('email', { required: true, pattern: /^\S+@\S+$/i }) }
      />

      <label htmlFor="password" className="field-label">Contraseña</label>
      <input
        className={
          clsx(
            "field mb-6",
            {
              'border-red-500': errors.password,
            }
          )
        }
        type="password"
        { ...register('password', { required: true, minLength: 6 }) }
      />

      
        <span className="text-red-500">{ errorMessage } </span>
        
      

      <button className="btn-primary w-full">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-white/10"></div>
        <div className="px-3 text-xs uppercase tracking-[0.14em] text-white/35">O</div>
        <div className="flex-1 border-t border-white/10"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
