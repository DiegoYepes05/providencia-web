export type IconName =
  | "layers"
  | "bolt"
  | "shield"
  | "pulse"
  | "server"
  | "people"
  // Specs de producto
  | "autonomia"
  | "velocidad"
  | "motor"
  | "carga"
  | "peso"
  | "capacidad"
  // Features de producto
  | "freno"
  | "suspension"
  | "tablero"
  | "bateria"
  | "portaequipaje"
  | "luces";

const paths: Record<IconName, React.ReactNode> = {
  layers: (
    <>
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </>
  ),
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4 2.9 7.4 7 9 4.1-1.6 7-5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  pulse: (
    <>
      <path d="M3 12h4l2.5-6 3 12L15 12h6" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M16 5.5a3.2 3.2 0 0 1 0 6.4" />
      <path d="M17.5 14.8c2.1.7 3.5 2.5 3.5 5.2" />
    </>
  ),

  autonomia: (
    <>
      <rect x="2" y="8" width="16" height="9" rx="2.5" />
      <path d="M21 11.5v2.5" />
      <path d="M5.5 12.5h6" />
      <path d="M8.5 12.5h.01" />
    </>
  ),
  velocidad: (
    <>
      <path d="M3.6 17a9 9 0 1 1 16.8 0" />
      <path d="m12 13 4-3.5" />
      <circle cx="12" cy="13.6" r="1.4" />
      <path d="M3.6 17h3M17.4 17h3" />
    </>
  ),
  motor: (
    <>
      <circle cx="12" cy="12" r="8.3" />
      <path d="M12.8 7.4 9.6 12.4h2.6l-.6 4.2 3.4-5.2h-2.8l.6-4Z" />
    </>
  ),
  carga: (
    <>
      <path d="M9 3v4M15 3v4" />
      <path d="M7 7h10v4a5 5 0 0 1-10 0V7Z" />
      <path d="M12 16v5" />
    </>
  ),
  peso: (
    <>
      <path d="M6.5 8h11l2.5 12H4L6.5 8Z" />
      <circle cx="12" cy="5.4" r="2.4" />
      <path d="M9.5 14.5h5" />
    </>
  ),
  capacidad: (
    <>
      <path d="M3 8.6 12 4l9 4.6v6.8L12 20l-9-4.6V8.6Z" />
      <path d="M3 8.6 12 13l9-4.4M12 13v7" />
    </>
  ),

  freno: (
    <>
      <circle cx="12" cy="12" r="8.3" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.7v3M12 17.3v3M3.7 12h3M17.3 12h3" />
    </>
  ),
  suspension: (
    <>
      <path d="M12 2.8v3.4" />
      <path d="M8.4 7.2h7.2l-7.2 2.8h7.2l-7.2 2.8h7.2l-7.2 2.8h7.2" />
      <path d="M12 17.8v3.4" />
    </>
  ),
  tablero: (
    <>
      <rect x="2.6" y="5" width="18.8" height="12.4" rx="2.4" />
      <path d="M6.4 14.2a5.6 5.6 0 0 1 11.2 0" />
      <path d="m12 14.2 2.6-3.4" />
    </>
  ),
  bateria: (
    <>
      <rect x="5" y="6.6" width="14" height="14.4" rx="2.4" />
      <path d="M9.6 6.6V3.4h4.8v3.2" />
      <path d="M9.4 13.8h5.2M12 11.2v5.2" />
    </>
  ),
  portaequipaje: (
    <>
      <rect x="3.4" y="9.6" width="17.2" height="7.4" rx="1.8" />
      <path d="M8 9.6V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2.6" />
      <path d="M6.4 17v3M17.6 17v3" />
    </>
  ),
  luces: (
    <>
      <path d="M11 5.4a6.6 6.6 0 0 1 0 13.2H8.6a6.6 6.6 0 0 1 0-13.2H11Z" />
      <path d="M15.4 8.6h4.2M15.4 12h5M15.4 15.4h4.2" />
    </>
  ),
};

export function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
