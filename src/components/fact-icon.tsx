export type FactKey =
  | "area"
  | "bedrooms"
  | "bathrooms"
  | "garage"
  | "balcony"
  | "elevator"
  | "garden";

const paths: Record<FactKey, React.ReactNode> = {
  // superficie: i quattro angoli di una stanza
  area: (
    <>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </>
  ),
  // camere: letto con cuscino
  bedrooms: (
    <>
      <path d="M3 20V5M3 16h18M21 20v-7a3 3 0 0 0-3-3h-9v6" />
      <circle cx="6.5" cy="12" r="1.8" />
    </>
  ),
  // bagni: vasca con rubinetto
  bathrooms: (
    <>
      <path d="M4 12h16v2.5a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 4 14.5V12Z" />
      <path d="M6 12V6.5A2.5 2.5 0 0 1 10.5 5M7 19l-1 2M17 19l1 2" />
    </>
  ),
  // garage: auto vista di lato
  garage: (
    <>
      <path d="M5 16H3.5v-4.5L5.5 6h13l2 5.5V16H19" />
      <path d="M3.5 11.5h17M8 16h8" />
      <circle cx="7" cy="16.5" r="1.8" />
      <circle cx="17" cy="16.5" r="1.8" />
    </>
  ),
  // balcone: portafinestra a croce sopra una balaustra a riquadri
  balcony: (
    <>
      <path d="M6.5 13V4h11v9" />
      <path d="M12 4v5M6.5 9h11" strokeWidth="1.3" />
      <path d="M3 13h18v7.5H3Z" />
      <path d="M9 13v7.5M15 13v7.5" strokeWidth="1.5" />
    </>
  ),
  // ascensore: cabina con porte e frecce su/giù
  elevator: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="0.6" />
      <path d="M12 3v18" strokeWidth="1" />
      <path d="M8.25 18V6.5M6.6 8.1l1.65-1.65 1.65 1.65" strokeWidth="1.15" />
      <path d="M15.75 6v11.5M14.1 15.9l1.65 1.65 1.65-1.65" strokeWidth="1.15" />
    </>
  ),
  // giardino: pianta che germoglia
  garden: (
    <>
      <path d="M12 21V11" />
      <path d="M12 15c-4.5 0-6.5-2.5-6.5-6.5 4.5 0 6.5 2.5 6.5 6.5Z" />
      <path d="M12 12c0-4 2-6.5 6.5-6.5 0 4-2 6.5-6.5 6.5Z" />
      <path d="M4 21h16" />
    </>
  ),
};

export function FactIcon({ name }: { name: FactKey }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
