import { Wifi } from "lucide-react";

export const APP_NAME = "PAINSIGNAL";
export const APP_TAGLINE = "Evidence before you build";

interface AppBrandProps {
  size?: "sm" | "md" | "lg";
  layout?: "inline" | "stacked";
  showTagline?: boolean;
  className?: string;
}

const iconSizes = { sm: 16, md: 22, lg: 34 } as const;
const boxClasses = {
  sm: "h-8 w-8 rounded-xl",
  md: "h-11 w-11 rounded-2xl",
  lg: "h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-[20px] shadow-xl",
} as const;
const nameStyles = {
  sm: { fontSize: "13px", fontWeight: 700, letterSpacing: "1px" },
  md: { fontSize: "14px", fontWeight: 800, letterSpacing: "1.2px" },
  lg: { fontSize: "24px", fontWeight: 800, letterSpacing: "1.5px" },
} as const;

export function AppBrand({ size = "md", layout = "inline", showTagline = false, className = "" }: AppBrandProps) {
  const isStacked = layout === "stacked";

  return (
    <div className={`flex ${isStacked ? "flex-col items-center gap-4" : "items-center gap-3"} ${className}`}>
      <div
        className={`flex items-center justify-center bg-[#0f172a] text-white flex-shrink-0 ${boxClasses[size]}`}
        aria-hidden
      >
        <Wifi size={iconSizes[size]} strokeWidth={2.5} />
      </div>
      <div className={isStacked ? "flex flex-col items-center" : undefined}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#0f172a",
            whiteSpace: "nowrap",
            ...nameStyles[size],
          }}
        >
          {APP_NAME}
        </span>
        {showTagline && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: size === "lg" ? "13px" : "11px",
              color: "rgba(15,23,42,0.45)",
              marginTop: isStacked ? "4px" : "2px",
            }}
          >
            {APP_TAGLINE}
          </p>
        )}
      </div>
    </div>
  );
}
