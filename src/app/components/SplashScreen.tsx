import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AppBrand } from "./ui/AppBrand";

/** Minimum time splash stays visible — helps on slower connections */
const SPLASH_MIN_MS = 5500;

function waitForPageLoad(): Promise<void> {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logoEl = splashRef.current?.querySelector(".splash-logo");
    if (logoEl) {
      gsap.fromTo(
        logoEl,
        { opacity: 0, scale: 0.95, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" }
      );
    }

    let cancelled = false;

    Promise.all([wait(SPLASH_MIN_MS), waitForPageLoad()]).then(() => {
      if (cancelled || !splashRef.current) return;
      gsap.to(splashRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
          if (!cancelled) onComplete();
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <div className="splash-logo flex flex-col items-center gap-5" style={{ opacity: 1 }}>
        <AppBrand size="lg" layout="inline" />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: "rgba(15,23,42,0.45)",
            marginTop: "-8px",
          }}
        >
          Loading your research workspace…
        </p>
        <div className="w-48 h-1 rounded-full overflow-hidden mt-2" style={{ background: "rgba(15,23,42,0.08)" }}>
          <div
            className="h-full rounded-full splash-progress"
            style={{
              background: "linear-gradient(90deg, #0f172a, #334155)",
              width: "0%",
            }}
          />
        </div>
      </div>
      <style>{`
        .splash-progress {
          animation: splashLoad ${SPLASH_MIN_MS}ms ease-out forwards;
        }
        @keyframes splashLoad {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
