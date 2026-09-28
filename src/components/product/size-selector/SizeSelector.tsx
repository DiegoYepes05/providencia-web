interface Props {
  selectedSize?: string;
  availableSizes: string[];
  onSizeChanged: (size: string) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}: Props) => {
  if (availableSizes.length === 0) return null;

  return (
    <div className="my-5">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
        Disponible
      </p>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSizeChanged(size)}
            className={
              size === selectedSize
                ? "rounded-md bg-brand-400 px-3 py-2 text-sm font-semibold text-void"
                : "rounded-md border border-white/15 px-3 py-2 text-sm text-white/70"
            }
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
