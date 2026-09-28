"use client";

import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  max?: number;
  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({
  quantity,
  max,
  onQuantityChanged,
}: Props) => {
  const canDecrease = quantity > 1;
  const canIncrease = max == null || quantity < max;

  return (
    <div className="inline-flex items-center border-b border-white/20">
      <button
        type="button"
        aria-label="Disminuir cantidad"
        disabled={!canDecrease}
        className="grid size-10 place-items-center text-white/70 hover:text-white disabled:cursor-not-allowed disabled:text-white/20"
        onClick={() => canDecrease && onQuantityChanged(quantity - 1)}
      >
        <IoRemoveOutline size={18} />
      </button>

      <span className="min-w-8 text-center text-sm font-semibold text-white tabular-nums">
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Aumentar cantidad"
        disabled={!canIncrease}
        className="grid size-10 place-items-center text-white/70 hover:text-white disabled:cursor-not-allowed disabled:text-white/20"
        onClick={() => canIncrease && onQuantityChanged(quantity + 1)}
      >
        <IoAddOutline size={18} />
      </button>
    </div>
  );
};
