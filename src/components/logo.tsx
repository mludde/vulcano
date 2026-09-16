import { siteConfig } from "@/lib/site-config";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <svg
        viewBox="0 0 100 34"
        className="h-3 w-auto text-foreground sm:h-4"
        aria-hidden="true"
      >
        <path
          d="M8 32 L50 4 L92 32"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="whitespace-nowrap font-script text-xl leading-none sm:text-2xl md:text-3xl">
        {siteConfig.logoName}
      </span>
    </span>
  );
}
