import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown, ChevronRight, X, MessageSquare, TrendingUp, DollarSign, Check, ExternalLink } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { painClusters, getPostsByIds } from "../../data/mockData";
import { useApp } from "../../context/AppContext";

const urgencyColor = (u: string) =>
  u === "High" ? "#f87171" : u === "Medium" ? "#facc15" : "#94a3b8";

const miniSparkline = (data: number[]) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 60, h = 24;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export function PainClusters() {
  const { highlightClusterId, viewEvidence, navigate } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(0);
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    if (highlightClusterId) {
      const idx = painClusters.findIndex((c) => c.id === highlightClusterId);
      if (idx >= 0) setSelected(idx);
    }
  }, [highlightClusterId]);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim-in"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.45, ease: "power3.out" });
  }, []);

  const sorted = [...painClusters].sort((a, b) => {
    if (sortBy === "urgency") {
      const order = { High: 3, Medium: 2, Low: 1 };
      return order[b.urgency] - order[a.urgency];
    }
    if (sortBy === "freq") return b.trend.reduce((s, v) => s + v, 0) - a.trend.reduce((s, v) => s + v, 0);
    return b.score - a.score;
  });

  const sel = selected !== null ? sorted[selected] : null;
  const evidencePosts = sel ? getPostsByIds(sel.sourcePostIds) : [];

  return (
    <div ref={ref} className="flex h-full overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden px-8 py-6">
        <div className="anim-in flex items-end justify-between mb-5">
          <div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>
              Pain Clusters
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
              rank recurring problems by urgency, frequency, and willingness to pay.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate("ideas")}
              className="px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(15,23,42,0.06)", border: "1px solid rgba(15,23,42,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#0f172a", fontWeight: 600 }}
            >
              View ideas →
            </button>
            <Listbox value={sortBy} onChange={(val) => setSortBy(val)}>
              <div className="relative">
                <Listbox.Button className="px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all" style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(15,23,42,0.18)", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#0f172a", fontWeight: 600 }}>
                  Sort by: {sortBy}
                  <ChevronDown size={12} />
                </Listbox.Button>
                <Listbox.Options className="absolute top-full right-0 mt-1 w-32 rounded-lg shadow-lg z-50" style={{ background: "rgba(255,255,255,0.96)", border: "1px solid rgba(15,23,42,0.18)" }}>
                  {["score", "urgency", "freq"].map((opt) => (
                    <Listbox.Option key={opt} value={opt} className="px-3 py-2 cursor-pointer text-xs flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif", color: "#0f172a" }}>
                      {({ selected }) => (
                        <>
                          {selected && <Check size={12} />}
                          {opt}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>

        <div className="anim-in grid gap-3 mb-2 px-3" style={{ gridTemplateColumns: "1fr 90px 90px 90px 70px 70px" }}>
          {["Cluster", "Urgency", "Frequency", "WTP", "Trend", "Score"].map((h) => (
            <span key={h} style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(15,23,42,0.35)", letterSpacing: "0.8px", textTransform: "uppercase" }}>
              {h}
            </span>
          ))}
        </div>

        <div className="anim-in flex flex-col gap-1.5 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {sorted.map((c, i) => (
            <button
              type="button"
              key={c.id}
              aria-pressed={selected === i}
              className="grid items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 text-left"
              style={{
                gridTemplateColumns: "1fr 90px 90px 90px 70px 70px",
                background: selected === i ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.06)",
                border: selected === i ? "1px solid rgba(15,23,42,0.18)" : "1px solid rgba(255,255,255,0.12)",
              }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <div className="flex items-center gap-2">
                <ChevronRight size={12} style={{ color: selected === i ? "#0f172a" : "rgba(15,23,42,0.3)", transform: selected === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#0f172a" }}>{c.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-center" style={{ background: `${urgencyColor(c.urgency)}15`, border: `1px solid ${urgencyColor(c.urgency)}25`, fontFamily: "'Inter', sans-serif", fontSize: "11px", color: urgencyColor(c.urgency), fontWeight: 500 }}>
                {c.urgency}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.6)" }}>{c.freq}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.6)" }}>{c.wtp}</span>
              <div>{miniSparkline(c.trend)}</div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#0f172a", fontWeight: 500 }}>{c.score}</span>
            </button>
          ))}
        </div>
      </div>

      {sel && (
        <div className="w-80 shrink-0 flex flex-col py-6 px-5 overflow-y-auto" style={{ background: "rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(255,255,255,0.12)", scrollbarWidth: "none" }}>
          <div className="flex items-start justify-between mb-5">
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(15,23,42,0.4)", letterSpacing: "0.8px", textTransform: "uppercase" }}>
              {sel.name}
            </span>
            <button type="button" onClick={() => setSelected(null)} aria-label="Close panel">
              <X size={14} style={{ color: "rgba(15,23,42,0.4)" }} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl p-4" style={{ background: "rgba(15,23,42,0.06)", border: "1px solid rgba(15,23,42,0.15)" }}>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={12} style={{ color: "#0f172a" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#0f172a" }}>Validated Pain</span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.8)", lineHeight: "1.5" }}>
                {sel.validatedPain}
              </p>
            </div>

            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(15,23,42,0.4)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px" }}>
                Top Quotes
              </p>
              {sel.quotes.map((q, i) => (
                <div key={i} className="mb-3 px-3 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11.5px", color: "rgba(15,23,42,0.7)", lineHeight: "1.5", fontStyle: "italic" }}>
                    &ldquo;{q}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(15,23,42,0.4)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px" }}>
                Source Evidence ({evidencePosts.length})
              </p>
              {evidencePosts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => viewEvidence(post.id)}
                  className="w-full mb-2 px-3 py-2.5 rounded-xl text-left transition-colors hover:bg-slate-50"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#0f172a" }}>{post.title}</span>
                    <ExternalLink size={11} style={{ color: "rgba(15,23,42,0.35)", flexShrink: 0 }} />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.4)" }}>{post.platform} · {post.sub}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Cluster Score", value: sel.score, icon: TrendingUp },
                { label: "WTP Signal", value: sel.wtp, icon: DollarSign },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
                  <Icon size={12} style={{ color: "#0f172a", marginBottom: "6px" }} />
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "16px", color: "#0f172a", fontWeight: 500 }}>{value}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.4)", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
