import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TrendingUp, Users, MessageSquare, DollarSign, ArrowRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        border: "1px solid rgba(15,23,42,0.1)",
        borderRadius: "10px",
        padding: "8px 12px",
        boxShadow: "0 4px 20px rgba(15,23,42,0.1)",
        backdropFilter: "blur(12px)",
      }}
    >
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.45)", marginBottom: "2px", letterSpacing: "0.3px" }}>{label}</p>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{payload[0].value} signals</p>
    </div>
  );
}

const funnelData = [
  { stage: "Awareness", count: 1842, color: "#60a5fa" },
  { stage: "Replies", count: 386, color: "#a78bfa" },
  { stage: "Trials", count: 74, color: "#0f172a" },
  { stage: "Paid", count: 28, color: "#facc15" },
];

const timelineData = [
  { day: "Mon", v: 42 }, { day: "Tue", v: 58 }, { day: "Wed", v: 51 }, { day: "Thu", v: 74 }, { day: "Fri", v: 68 }, { day: "Sat", v: 55 }, { day: "Sun", v: 82 },
];

const pipeline = [
  { stage: "New Leads", items: [
    { name: "u/LolaC_Dev", tag: "Reddit", score: 88, status: "Warm" },
    { name: "@WebstormDev", tag: "X", score: 71, status: "Cold" },
  ]},
  { stage: "In Contact", items: [
    { name: "Weatherspoon82", tag: "IH", score: 79, status: "Hot" },
    { name: "lindaP3789_ql", tag: "LinkedIn", score: 65, status: "Warm" },
  ]},
  { stage: "Follow-up", items: [
    { name: "u/LongDab_123", tag: "Reddit", score: 55, status: "Warm" },
    { name: "@SafeFlow.io", tag: "PH", score: 62, status: "Hot" },
  ]},
  { stage: "Qualified", items: [
    { name: "u/crewdle-corp", tag: "Reddit", score: 91, status: "Hot" },
  ]},
];

const statusColor = (s: string) => s === "Hot" ? "#f87171" : s === "Warm" ? "#facc15" : "#94a3b8";

export function PipelineAnalytics() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim-in"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" });
  }, []);

  return (
    <div ref={ref} className="flex flex-col h-full overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
      <div className="anim-in mb-5">
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>Pipeline &amp; Analytics</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
          track acquisition funnel and growth metrics across all sources.
        </p>
      </div>

      {/* Stat cards */}
      <div className="anim-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Awareness Reached", value: "1,248", delta: "+12% · last 7 days", icon: Users, color: "#60a5fa" },
          { label: "Positive Replies", value: "78", delta: "+5 from last week", icon: MessageSquare, color: "#a78bfa" },
          { label: "Total Replied", value: "314", delta: "+28% · last 7 days", icon: TrendingUp, color: "#0f172a" },
          { label: "Sources Mined", value: "5/4", delta: "last 7 days", icon: DollarSign, color: "#facc15" },
        ].map(({ label, value, delta, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)" }}>{label}</span>
              <Icon size={13} style={{ color }} />
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "24px", color: "#0f172a", fontWeight: 500 }}>{value}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.35)", marginTop: "3px" }}>{delta}</p>
          </div>
        ))}
      </div>

      <div className="anim-in grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        {/* Funnel */}
        <div className="col-span-1 lg:col-span-2 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a", display: "block", marginBottom: "16px" }}>
            Conversion Funnel
          </span>
          <div className="flex items-center gap-2">
            {funnelData.map((f, i) => (
              <div key={f.stage} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-full rounded-lg flex items-end justify-center"
                    style={{
                      height: `${Math.max(24, (f.count / 1842) * 80)}px`,
                      background: `${f.color}20`,
                      border: `1px solid ${f.color}40`,
                      minHeight: "24px",
                    }}
                  />
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: f.color, fontWeight: 500, marginTop: "6px" }}>{f.count}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.4)", textAlign: "center" }}>{f.stage}</p>
                </div>
                {i < funnelData.length - 1 && <ArrowRight size={12} style={{ color: "rgba(15,23,42,0.25)", flexShrink: 0, marginBottom: "28px" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline chart */}
        <div className="col-span-1 lg:col-span-3 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>Signal Activity</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.4)" }}>Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fill: "rgba(15,23,42,0.4)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(15,23,42,0.12)", strokeWidth: 1, strokeDasharray: "4 2" }} />
              <Area type="monotone" dataKey="v" stroke="#0f172a" strokeWidth={2} fill="url(#actGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Kanban pipeline */}
      <div className="anim-in">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.4)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px" }}>
          Pipeline
        </p>
        <div className="grid grid-cols-4 gap-3">
          {pipeline.map((col) => (
            <div key={col.stage} className="flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(15,23,42,0.5)", letterSpacing: "0.5px" }}>{col.stage}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(15,23,42,0.35)" }}>{col.items.length}</span>
              </div>
              {col.items.map((item, i) => (
                <div key={i} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#0f172a" }}>{item.name}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor(item.status) }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "9px", color: "rgba(15,23,42,0.5)" }}>{item.tag}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#0f172a" }}>{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


