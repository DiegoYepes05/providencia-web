"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';


import type { Address, Country } from '@/interfaces';
import { useAddressStore } from '@/store';
import { deleteUserAddress, setUserAddress } from '@/actions';


type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
}


interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}


export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {

  const router = useRouter();
  const { handleSubmit, register, formState: { isValid }, reset } = useForm<FormInputs>({
    defaultValues: {
      ...(userStoredAddress as any),
      rememberAddress: false,
    }
  });

  const { data: session } = useSession({
    required: true,
  })

  const setAddress = useAddressStore( state => state.setAddress );
  const address = useAddressStore( state => state.address );



  useEffect(() => {
    if ( address.firstName ) {
      reset(address)
    }
  },[address, reset])
  




  const onSubmit = async( data: FormInputs ) => {
    

    const { rememberAddress, ...restAddress } = data;

    setAddress(restAddress);

    if ( rememberAddress ) {
      await setUserAddress(restAddress, session!.user.id );
    } else {
      await deleteUserAddress(session!.user.id);
    }

    router.push('/checkout');

  }



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
    >
      <div className="flex flex-col">
        <span className="field-label">Nombres</span>
        <input
          type="text"
          className="field"
          {...register("firstName", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <span className="field-label">Apellidos</span>
        <input
          type="text"
          className="field"
          {...register("lastName", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <span className="field-label">Dirección</span>
        <input
          type="text"
          className="field"
          {...register("address", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <span className="field-label">Dirección 2 (opcional)</span>
        <input type="text" className="field" {...register("address2")} />
      </div>

      <div className="flex flex-col">
        <span className="field-label">Código postal</span>
        <input
          type="text"
          className="field"
          {...register("postalCode", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <span className="field-label">Ciudad</span>
        <input
          type="text"
          className="field"
          {...register("city", { required: true })}
        />
      </div>

      <div className="flex flex-col">
        <span className="field-label">País</span>
        <select
          className="field appearance-none"
          {...register("country", { required: true })}
        >
          <option value="" className="bg-void text-white">
            [ Seleccione ]
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.id} className="bg-void text-white">
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <span className="field-label">Teléfono</span>
        <input
          type="text"
          className="field"
          {...register("phone", { required: true })}
        />
      </div>

      <div className="flex flex-col sm:col-span-2">
        <label className="mb-8 inline-flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="size-4 rounded border-white/20 bg-transparent accent-brand-400"
            {...register("rememberAddress")}
          />
          <span className="text-sm text-white/70">¿Recordar dirección?</span>
        </label>

        <button
          disabled={!isValid}
          type="submit"
          className={clsx("w-full sm:w-auto", {
            "btn-primary": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
