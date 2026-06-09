import { Wifi } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div
        className="fixed pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)",
          top: "-120px",
          left: "10%",
          filter: "blur(50px)",
        }}
      />
      <div
        className="w-full max-w-md glass-panel rounded-[22px] p-8 relative z-10"
        style={{ border: "1px solid rgba(15,23,42,0.08)" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Wifi size={22} strokeWidth={2.5} />
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "1.2px", color: "#0f172a" }}>
              PAINSIGNAL
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)" }}>
              Evidence before you build
            </p>
          </div>
        </div>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", marginBottom: "4px" }}>
          {title}
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginBottom: "24px" }}>
          {subtitle}
        </p>
        {children}
      </div>
    </div>
  );
}
