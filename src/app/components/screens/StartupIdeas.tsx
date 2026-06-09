import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Lightbulb, ArrowUpRight, ChevronUp, ChevronDown, Layers, ExternalLink } from "lucide-react";
import { startupIdeas, getPostsByIds } from "../../data/mockData";
import { useApp } from "../../context/AppContext";

const effortColor = (e: string) => e === "Low" ? "#0f172a" : e === "Med" ? "#facc15" : "#f87171";
const signalColor = (s: string) => s === "High" ? "#0f172a" : "#facc15";

export function StartupIdeas() {
  const { viewClusterFromIdea, viewEvidence, navigate } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const [votes, setVotes] = useState<Record<number, 1 | -1 | 0>>({});
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim-in"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" });
  }, []);

  const vote = (i: number, dir: 1 | -1) => {
    setVotes((v) => ({ ...v, [i]: v[i] === dir ? 0 : dir }));
  };

  return (
    <div ref={ref} className="flex flex-col h-full overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
      <div className="anim-in mb-5 flex items-end justify-between">
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>Startup Ideas</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
            validated opportunities surfaced from signal clusters.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("exports")}
          className="px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(15,23,42,0.06)", border: "1px solid rgba(15,23,42,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#0f172a", fontWeight: 600 }}
        >
          Export report →
        </button>
      </div>

      <div className="anim-in flex flex-col gap-2">
        {startupIdeas.map((idea, i) => {
          const evidence = getPostsByIds(idea.sourcePostIds);
          return (
            <div
              key={idea.id}
              role="button"
              tabIndex={0}
              aria-expanded={selected === i}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
              style={{
                background: selected === i ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.08)",
                border: selected === i ? "1px solid rgba(15,23,42,0.2)" : "1px solid rgba(255,255,255,0.14)",
              }}
              onClick={() => setSelected(selected === i ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(selected === i ? null : i);
                }
              }}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="flex flex-col items-center gap-0.5 shrink-0">
                  <button type="button" onClick={(e) => { e.stopPropagation(); vote(i, 1); }} className="p-0.5 rounded transition-colors" style={{ color: votes[i] === 1 ? "#0f172a" : "rgba(15,23,42,0.3)" }}>
                    <ChevronUp size={14} />
                  </button>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#0f172a" }}>
                    {idea.fit + (votes[i] === 1 ? 1 : votes[i] === -1 ? -1 : 0)}
                  </span>
                  <button type="button" onClick={(e) => { e.stopPropagation(); vote(i, -1); }} className="p-0.5 rounded transition-colors" style={{ color: votes[i] === -1 ? "#f87171" : "rgba(15,23,42,0.3)" }}>
                    <ChevronDown size={14} />
                  </button>
                </div>

                <Lightbulb size={16} style={{ color: signalColor(idea.signal), flexShrink: 0 }} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>{idea.name}</span>
                    <ArrowUpRight size={12} style={{ color: "rgba(15,23,42,0.3)" }} />
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.55)", lineHeight: "1.4" }}>{idea.desc}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(15,23,42,0.35)" }}>Market</p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{idea.market}</p>
                  </div>
                  <div className="px-2 py-1 rounded-lg" style={{ background: `${effortColor(idea.effort)}12`, border: `1px solid ${effortColor(idea.effort)}25` }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.4)" }}>Effort</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: effortColor(idea.effort), fontWeight: 600 }}>{idea.effort}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.10)", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.4)" }}>
                    {idea.cluster}
                  </span>
                </div>
              </div>

              {selected === i && (
                <div className="px-5 pb-4 pt-0">
                  <div className="rounded-xl p-4 mt-2 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(15,23,42,0.4)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "6px" }}>
                        MVP Guidance
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12.5px", color: "rgba(15,23,42,0.75)", lineHeight: 1.5 }}>
                        {idea.mvpGuidance}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {idea.mvpFeatures.map((f) => (
                          <span key={f} className="px-2 py-1 rounded-md" style={{ background: "rgba(15,23,42,0.06)", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#0f172a" }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: "Signal Strength", value: idea.signal, color: signalColor(idea.signal) },
                        { label: "Build Effort", value: idea.effort, color: effortColor(idea.effort) },
                        { label: "Market Size", value: idea.market, color: "#0f172a" },
                      ].map(({ label, value, color }) => (
                        <div key={label}>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.4)" }}>{label}</p>
                          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "16px", color, fontWeight: 500, marginTop: "3px" }}>{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: "rgba(15,23,42,0.08)" }}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); viewClusterFromIdea(idea.clusterId); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                        style={{ background: "rgba(15,23,42,0.06)", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#0f172a", border: "none", cursor: "pointer" }}
                      >
                        <Layers size={12} /> View pain cluster
                      </button>
                      {evidence.map((post) => (
                        <button
                          key={post.id}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); viewEvidence(post.id); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.08)", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.65)", border: "1px solid rgba(15,23,42,0.08)", cursor: "pointer" }}
                        >
                          <ExternalLink size={11} /> {post.platform} evidence
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
