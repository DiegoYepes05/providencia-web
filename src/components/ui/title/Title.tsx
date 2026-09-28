interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mb-10 ${className ?? ""}`}>
      {subtitle && (
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400">
          {subtitle}
        </p>
      )}
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h1>
    </div>
  );
};
