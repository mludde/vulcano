import { siteConfig } from "@/lib/site-config";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <svg
        viewBox="0 0 100 34"
        className="h-4 w-auto text-foreground"
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
      <span className="font-script text-3xl leading-none">
        {siteConfig.logoName}
      </span>
    </span>
  );
}
