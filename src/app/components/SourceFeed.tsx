import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Circle, Rss, Sparkles } from "lucide-react";
import { CompanyLogo } from "./ui/CompanyLogo";
import { sourcePosts } from "../data/mockData";
import { useApp } from "../context/AppContext";

const platformIcon = (platform: string) => {
  if (platform === "Reddit") return Rss;
  if (platform === "Hacker News") return Sparkles;
  return null;
};

export function SourceFeed() {
  const { highlightPostId, navigate } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pulseActive, setPulseActive] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.querySelectorAll(".feed-card"),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: "power2.out", delay: 0.5 }
    );
    const interval = setInterval(() => setPulseActive((p) => !p), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full"
      style={{ width: "300px", shrink: 0, background: "rgba(255,255,255,0.95)", borderLeft: "1px solid rgba(15,23,42,0.08)" }}
    >
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}>
        <button type="button" onClick={() => navigate("feed")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "#0f172a", letterSpacing: "0.5px" }}>
            Source Feed
          </span>
        </button>
        <div className="flex items-center gap-1.5">
          <Circle size={8} fill={pulseActive ? "#22c55e" : "rgba(34,197,94,0.35)"} stroke="none" style={{ transition: "fill 0.3s" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 700, color: "#166534", letterSpacing: "1px" }}>LIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto nice-scrollbar flex flex-col gap-2 px-3 py-3">
        {sourcePosts.map((item) => {
          const highlighted = highlightPostId === item.id;
          return (
            <div
              key={item.id}
              className="feed-card rounded-xl p-3 group transition-all duration-200 hover-soft"
              style={{
                background: highlighted ? "rgba(15,23,42,0.04)" : "#ffffff",
                boxShadow: "0 10px 20px rgba(15,23,42,0.04)",
                border: highlighted ? "2px solid rgba(15,23,42,0.25)" : "1px solid rgba(15,23,42,0.08)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <CompanyLogo
                  domain={item.domain}
                  name={item.company ?? item.platform}
                  alt={`${item.company ?? item.platform} logo`}
                  className="h-6 w-6 shrink-0"
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-2 min-w-0" style={{ overflow: "hidden" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 700, color: "#0f172a", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.company ?? item.title.slice(0, 24)}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 flex-shrink-0">
                      {(() => {
                        const Icon = platformIcon(item.platform);
                        return Icon ? <Icon size={12} style={{ color: item.color }} /> : null;
                      })()}
                      {item.platform}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.55)" }}>{item.sub}</span>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <ArrowUpRight size={12} style={{ color: "rgba(15,23,42,0.3)" }} className="group-hover:text-[#0f172a] transition-colors" />
                </a>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11.5px", color: "#0f172a", lineHeight: "1.5", marginBottom: "8px" }}>
                {item.body}
              </p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md" style={{ background: "rgba(15,23,42,0.08)", border: "1px solid rgba(15,23,42,0.1)", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#0f172a", fontWeight: 500 }}>
                  {item.tags[0]}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#0f172a", fontWeight: 500 }}>{item.score}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
