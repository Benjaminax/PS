import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Search, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import VariableProximity from "../VariableProximity";
import DonutDemo from "../tremor/DonutDemo";
import AreaDemo from "../tremor/AreaDemo";
import { useApp } from "../../context/AppContext";
import { painClusters, startupIdeas } from "../../data/mockData";

const signalData = [
  { day: "Mon", v: 18 },
  { day: "Tue", v: 32 },
  { day: "Wed", v: 28 },
  { day: "Thu", v: 45 },
  { day: "Fri", v: 38 },
  { day: "Sat", v: 52 },
  { day: "Sun", v: 48 },
  { day: "Mon", v: 67 },
  { day: "Tue", v: 58 },
  { day: "Wed", v: 74 },
  { day: "Thu", v: 69 },
  { day: "Fri", v: 82 },
];

function SignalTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.97)",
        border: "1px solid rgba(15,23,42,0.1)",
        borderRadius: "10px",
        padding: "8px 12px",
        boxShadow: "0 4px 20px rgba(15,23,42,0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.45)", marginBottom: "2px", letterSpacing: "0.3px" }}>
        {label}
      </p>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
        {payload[0].value} signals
      </p>
    </div>
  );
}

const statData1 = [{v: 10}, {v: 12}, {v: 15}, {v: 14}, {v: 20}, {v: 22}, {v: 25}];
const statData2 = [{v: 60}, {v: 65}, {v: 62}, {v: 68}, {v: 72}, {v: 75}, {v: 78}];
const statData3 = [{v: 1}, {v: 2}, {v: 2}, {v: 3}, {v: 3}, {v: 3}, {v: 3}];
const statData4 = [{v: 120}, {v: 150}, {v: 180}, {v: 210}, {v: 250}, {v: 280}, {v: 314}];

const statCards = [
  { label: "Pain Points Found", value: "1,248", delta: "+12%", data: statData1, color: "#f87171" },
  { label: "Opportunity Score", value: "78", delta: "+5pt", data: statData2, color: "#94a3b8" },
  { label: "Sources Mined", value: "3/4", delta: "Active", data: statData3, color: "#60a5fa" },
  { label: "High Intent Signals", value: "314", delta: "+28%", data: statData4, color: "#fbbf24" },
];

export function Overview() {
  const { activeProject, researchRuns, startResearchRun, navigate, setPendingQuery, pendingQuery } = useApp();
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(pendingQuery || "");

  const topPainPoints = painClusters.slice(0, 6).map((c) => ({
    id: c.id,
    name: c.name,
    score: Math.min(99, Math.round(c.score / 3)),
    opp: c.urgency === "High" ? "High" : c.urgency === "Medium" ? "Med" : "Low",
    mentions: c.score,
  }));

  const suggestedIdeas = startupIdeas.slice(0, 3).map((i) => ({
    name: i.name,
    fit: i.fit,
    effort: i.effort,
    signal: i.signal,
  }));

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll(".anim-in");
    gsap.fromTo(els, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out" });
  }, []);

  const oppColor = (opp: string) =>
    opp === "High" ? "#0f172a" : opp === "Med" ? "#facc15" : "#94a3b8";

  return (
    <div ref={contentRef} className="flex flex-col h-full overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
      {/* Header + Search */}
      <div className="anim-in mb-6" ref={heroRef} style={{ position: "relative" }}>
        <VariableProximity
          label="Turn conversations into startup ideas."
          className="block text-[22px] font-semibold leading-tight text-slate-950"
          fromFontVariationSettings="'wght' 400, 'opsz' 10"
          toFontVariationSettings="'wght' 1000, 'opsz' 48"
          containerRef={heroRef}
          radius={140}
          falloff="linear"
        />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "8px" }}>
          {activeProject ? `${activeProject.name} · ${activeProject.niche}` : "Mine Reddit & HN for real pain points."}
        </p>
      </div>

      {/* Search bar */}
      <div className="anim-in mb-6">
        <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white px-2 py-1.5 shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:shadow-md">
          <div className="flex items-center gap-2 flex-1">
            <Search size={14} className="text-slate-400 ml-2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="AI tools for monitoring in production..."
              className="flex-1 bg-transparent text-xs text-slate-900 outline-none placeholder:text-slate-400"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (query.trim()) {
                startResearchRun(query);
              } else {
                setPendingQuery(query);
                navigate("research");
              }
            }}
            className="rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-slate-800 ml-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            RUN RESEARCH
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="anim-in grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {statCards.map(({ label, value, delta, data, color }) => (
          <div
            key={label}
            className="stat-card rounded-2xl p-4 flex flex-col gap-4 cursor-default"
            style={{
              border: "1px solid rgba(15,23,42,0.08)",
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 1px 3px rgba(15,23,42,0.02)",
            }}
          >
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.6)", fontWeight: 500 }}>
                {label}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)", fontWeight: 500 }}>
                {delta}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "28px", fontWeight: 600, color: "#0f172a", lineHeight: 1 }}>
                {value}
              </span>
              <div className="flex-1 w-full max-w-[100px] h-[36px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id={`grad-${label.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#grad-${label.replace(/\s+/g, '')})`} isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main dashboard content */}
      <div className="anim-in grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Pain points table */}
        <div
          className="col-span-1 xl:col-span-3 rounded-2xl p-4 surface-card"
        >
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "13px", color: "#0f172a" }}>
              Top Pain Points
            </span>
            <button type="button" onClick={() => navigate("pain")} style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.5)", display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer" }}>
              View all <ArrowUpRight size={11} />
            </button>
          </div>
          <div className="flex flex-col gap-0.5">
            {topPainPoints.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5 px-2 rounded-lg transition-all duration-150 group cursor-default"
                style={{ borderBottom: i < topPainPoints.length - 1 ? "1px solid rgba(15,23,42,0.05)" : "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(15,23,42,0.025)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(15,23,42,0.28)", width: "18px", fontWeight: 500 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12.5px", color: "#0f172a", flex: 1, fontWeight: 450 }}>
                  {p.name}
                </span>
                <span
                  className="px-2 py-0.5 rounded-md text-center"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: oppColor(p.opp),
                    background: `${oppColor(p.opp)}14`,
                    border: `1px solid ${oppColor(p.opp)}28`,
                    minWidth: "36px",
                  }}
                >
                  {p.opp}
                </span>
                {/* Mini score bar */}
                <div className="flex items-center gap-2" style={{ width: "80px" }}>
                  <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(15,23,42,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: "linear-gradient(90deg, #0f172a, #334155)" }} />
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#0f172a", width: "24px", textAlign: "right" }}>{p.score}</span>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(15,23,42,0.35)", width: "34px", textAlign: "right" }}>
                  {p.mentions}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth signals & top sources */}
        <div className="col-span-1 xl:col-span-2 flex flex-col gap-4">
          {/* Signal chart */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>
                Signal Over Time
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.4)" }}>
                Last 7 days
              </span>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={signalData}>
                <defs>
                  <linearGradient id="sigGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fill: "rgba(15,23,42,0.45)" }} axisLine={false} tickLine={false} padding={{ left: 8, right: 8 }} />
                <Tooltip
                  content={<SignalTooltip />}
                  cursor={{ stroke: "rgba(15,23,42,0.12)", strokeWidth: 1, strokeDasharray: "4 2" }}
                />
                <Area type="monotone" dataKey="v" stroke="#0f172a" strokeWidth={2} fill="url(#sigGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Suggested ideas */}
          <div
            className="rounded-2xl p-4 flex-1"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>
                Suggested Ideas
              </span>
              <button type="button" onClick={() => navigate("ideas")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <ArrowUpRight size={13} style={{ color: "#0f172a" }} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {suggestedIdeas.map((idea, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-2 px-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: idea.signal === "High" ? "#0f172a" : "#facc15" }}
                  />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#0f172a", flex: 1 }}>
                    {idea.name}
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#0f172a" }}>
                    {idea.fit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {researchRuns.length > 0 && (
        <div className="anim-in mt-4 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "10px" }}>
            Recent Research Runs
          </p>
          <div className="flex flex-col gap-2">
            {researchRuns.slice(0, 3).map((run) => (
              <div key={run.id} className="flex items-center justify-between py-2 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#0f172a" }}>{run.query}</span>
                <span className="px-2 py-0.5 rounded-md" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, color: run.status === "complete" ? "#0f172a" : "#facc15", background: "rgba(15,23,42,0.06)" }}>
                  {run.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="anim-in grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-2 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(15,23,42,0.5)", textTransform: "uppercase" }}>
                Research analytics
              </p>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>
                Visualize pain point clusters and signal trends
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DonutDemo />
            <AreaDemo />
          </div>
        </div>
      </div>
    </div>
  );
}


