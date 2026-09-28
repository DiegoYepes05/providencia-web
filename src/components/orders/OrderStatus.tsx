import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        "mb-5 inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase",
        {
          "border-red-400/40 text-red-400": !isPaid,
          "border-brand-400/40 text-brand-400": isPaid,
        }
      )}
    >
      <IoCardOutline className="size-4" />
      <span className="mx-2">{isPaid ? "Pagada" : "No pagada"}</span>
    </div>
  );
};
