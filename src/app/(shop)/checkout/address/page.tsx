import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";

import { getCountries, getUserAddress } from "@/actions";
import { auth } from '@/auth.config';

export default async function AddressPage() {
  
  const countries = await getCountries();

  const session = await auth();

  if ( !session?.user ) {
    return (
      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
        No hay sesión de usuario
      </h3>
    );
  }

  const userAddress = await getUserAddress(session.user.id) ?? undefined;
  


  return (
    <div className="mb-16">
      <Title title="Dirección" subtitle="Entrega" />
      <AddressForm countries={countries} userStoredAddress={userAddress} />
    </div>
  );
}
