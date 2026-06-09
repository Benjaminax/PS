import { useState } from "react";

interface CompanyLogoProps {
  domain?: string;
  name?: string;
  company?: string;
  alt?: string;
  className?: string;
}

function normalizeDomain(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
}

export function CompanyLogo({
  domain,
  name,
  company,
  alt,
  className = "h-6 w-6",
}: CompanyLogoProps) {
  const [imageError, setImageError] = useState(false);
  const clientId = import.meta.env.VITE_BRANDFETCH_CLIENT_ID;
  const label = name ?? company ?? domain ?? "Company";
  const normalizedDomain = domain ? normalizeDomain(domain) : "";

  if (!clientId || !normalizedDomain || imageError) {
    return null;
  }

  return (
    <img
      src={`https://cdn.brandfetch.io/${encodeURIComponent(normalizedDomain)}/fallback/lettermark?c=${encodeURIComponent(clientId)}`}
      alt={alt ?? `${label} logo`}
      className={`rounded-xl object-contain ${className}`}
      loading="lazy"
      decoding="async"
      referrerPolicy="strict-origin-when-cross-origin"
      onError={() => setImageError(true)}
    />
  );
}
