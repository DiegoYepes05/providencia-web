import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/logo";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/shop");
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-center bg-void px-6 py-16">
      <Logo href="/shop" />
      <div className="mt-12 w-full max-w-md">{children}</div>
    </main>
  );
}
