// "VENDUTO" pill in the top-right corner of a cover image, mirroring the
// "Vendita" tag on the left. The parent must be `relative`.
export function SoldBadge({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span
      className={`absolute rounded-full bg-[#c2412d]/90 font-semibold uppercase text-white backdrop-blur ${
        size === "lg"
          ? "right-6 top-6 px-5 py-2 text-sm tracking-[0.18em]"
          : "right-4 top-4 px-3.5 py-1.5 text-[0.8542rem] tracking-[0.16em]"
      }`}
    >
      Venduto
    </span>
  );
}
