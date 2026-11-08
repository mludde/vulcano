export type FactKey =
  | "area"
  | "bedrooms"
  | "bathrooms"
  | "garage"
  | "balcony"
  | "terrace"
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
  // balcone: portafinestra con ringhiera
  balcony: (
    <>
      <path d="M8 11.5V3.5h8v8" />
      <path d="M12 3.5v8" />
      <path d="M3 14.5h18" />
      <path d="M5.5 14.5V19M9.5 14.5V19M14.5 14.5V19M18.5 14.5V19" />
      <rect x="2" y="19" width="20" height="2.5" rx="0.8" />
    </>
  ),
  // terrazzo: sdraio con sole
  terrace: (
    <>
      <path d="M4.5 7l6 7h9.5" />
      <path d="M20 14v5.5M10.5 14l-2 5.5M3 19.5h18" />
      <circle cx="18" cy="6" r="2.5" />
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
