import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown, Play, Save, Check } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { CompanyLogo } from "../ui/CompanyLogo";
import { useApp } from "../../context/AppContext";

const sources = [
  { name: "Reddit", domain: "reddit.com", subs: "4.2k posts", active: true },
  { name: "Hacker News", domain: "news.ycombinator.com", subs: "1.9k posts", active: true },
  { name: "Indie Hackers", domain: "indiehackers.com", subs: "1.3k posts", active: true },
  { name: "Product Hunt", domain: "producthunt.com", subs: "1.2k posts", active: false },
  { name: "X / Twitter", domain: "x.com", subs: "940 posts", active: false },
  { name: "LinkedIn", domain: "linkedin.com", subs: "810 posts", active: false },
  { name: "Quora", domain: "quora.com", subs: "570 posts", active: false },
  { name: "Github Discussions", domain: "github.com", subs: "448 posts", active: false },
];

const filters = [
  { label: "Audience", value: "Technical Founders", options: ["Technical Founders", "Solo Builders", "PMs", "Designers"] },
  { label: "Region", value: "Global", options: ["Global", "US", "EU", "APAC"] },
  { label: "Language", value: "English", options: ["English", "Spanish", "French", "German"] },
  { label: "Time Range", value: "Last 30 days", options: ["Last 7 days", "Last 30 days", "Last 90 days", "All time"] },
];

export function ResearchRuns() {
  const { startResearchRun, pendingQuery, setPendingQuery, researchRuns, navigate } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(pendingQuery || "AI tools for monitoring in production");
  const [activeFilters, setActiveFilters] = useState(filters.map((f) => f.value));
  const [activeSources, setActiveSources] = useState(sources.map((s) => s.active));
  const [minBuyer, setMinBuyer] = useState(30);
  const [minScore, setMinScore] = useState(60);
  const [willingness, setWillingness] = useState(71);

  useEffect(() => {
    if (pendingQuery) {
      setQuery(pendingQuery);
      setPendingQuery("");
    }
  }, [pendingQuery, setPendingQuery]);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim-in"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" });
  }, []);

  const toggleSource = (i: number) => {
    setActiveSources((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div ref={ref} className="flex flex-col h-full overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
      <div className="anim-in mb-6">
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>
          New Research Run
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
          choose a market, location, and signal filters.
        </p>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Research query or niche..."
          className="mt-4 w-full rounded-xl px-4 py-2.5 outline-none"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(15,23,42,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#0f172a" }}
        />
      </div>

      {/* Top filters row */}
      <div className="anim-in flex gap-2 mb-6 flex-wrap">
        {filters.map((f, i) => (
          <Listbox key={f.label} value={activeFilters[i]} onChange={(val) => setActiveFilters((prev) => prev.map((v, idx) => (idx === i ? val : v)))}>
            <div className="relative">
              <Listbox.Button className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(15,23,42,0.18)" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.5)" }}>{f.label}:</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: "#0f172a" }}>{activeFilters[i]}</span>
                <ChevronDown size={12} style={{ color: "#0f172a" }} />
              </Listbox.Button>
              <Listbox.Options className="absolute top-full mt-1 w-40 rounded-lg shadow-lg z-50" style={{ background: "rgba(255,255,255,0.96)", border: "1px solid rgba(15,23,42,0.18)" }}>
                {f.options.map((opt) => (
                  <Listbox.Option
                    key={opt}
                    value={opt}
                    className="px-3 py-2 cursor-pointer text-sm transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif", color: "#0f172a", background: "rgba(255,255,255,0.06)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)")}
                  >
                    {({ selected }) => (
                      <div className="flex items-center gap-2">
                         {selected && <Check size={14} style={{ color: "#0f172a" }} />}
                        {opt}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        ))}
      </div>

      <div className="anim-in grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sources */}
        <div className="col-span-2">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.6)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px" }}>
            1. Sources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sources.map((src, i) => (
              <div
                key={src.name}
                aria-pressed={activeSources[i]}
                className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 text-left"
                style={{
                  background: activeSources[i] ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.06)",
                  border: activeSources[i] ? "1px solid rgba(15,23,42,0.2)" : "1px solid rgba(255,255,255,0.14)",
                }}
                onClick={() => toggleSource(i)}
              >
                <CompanyLogo domain={src.domain} name={src.name} alt={`${src.name} logo`} className="h-7 w-7 shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: "#0f172a" }}>{src.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(15,23,42,0.4)" }}>{src.subs}</span>
                </div>
                <Switch checked={activeSources[i]} className="pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Signal filters */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.6)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px", marginTop: "24px" }}>
            2. Signal Filters
          </p>
          <div
            className="rounded-2xl p-4 flex flex-col gap-5"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            {[
              { label: "Buyer intent signals", sub: "Include posts mentioning purchasing", val: minBuyer, set: setMinBuyer },
              { label: "Min opportunity score", sub: "Only surface scores above threshold", val: minScore, set: setMinScore },
              { label: "Willingness to pay threshold", sub: "Minimum buying intent score", val: willingness, set: setWillingness },
            ].map(({ label, sub, val, set }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12.5px", color: "#0f172a" }}>{label}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.4)" }}>{sub}</p>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#0f172a" }}>{val}</span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  value={[val]}
                  onValueChange={(vals) => set(vals[0])}
                  className="w-full mt-3 cursor-pointer [&_[data-slot=slider-track]]:bg-slate-200 [&_[data-slot=slider-range]]:bg-slate-900 [&_[data-slot=slider-thumb]]:border-slate-900"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Estimated run */}
        <div className="flex flex-col gap-4">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)" }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.6)", letterSpacing: "0.8px", marginBottom: "16px", textTransform: "uppercase" }}>
              Estimated Run
            </p>
            {[
              { label: "Posts to scan", value: "12.4k", color: "#0f172a" },
              { label: "Areas of source", value: "84k", color: "#0f172a" },
              { label: "Est. run time", value: "8 min", color: "#0f172a" },
              { label: "Research loops", value: "20–35", color: "#0f172a" },
              { label: "Cost per run", value: "$0.42", color: "#0f172a" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.5)" }}>{label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 500, color }}>{value}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              const enabled = sources.filter((_, i) => activeSources[i]).map((s) => s.name);
              startResearchRun(query, enabled.length ? enabled : ["Reddit", "Hacker News"]);
            }}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all duration-200"
            style={{
              background: "rgba(15,23,42,0.2)",
              border: "1px solid rgba(15,23,42,0.35)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#0f172a",
              letterSpacing: "1px",
            }}
          >
            <Play size={13} fill="#0f172a" />
            START RESEARCH RUN
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "rgba(15,23,42,0.6)",
            }}
          >
            <Save size={13} />
            Save as template
          </button>
        </div>
      </div>

      {researchRuns.length > 0 && (
        <div className="anim-in mt-8">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.6)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px" }}>
            Run History
          </p>
          <div className="flex flex-col gap-2">
            {researchRuns.map((run) => (
              <button
                key={run.id}
                type="button"
                onClick={() => run.status === "complete" && navigate("pain")}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-left"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}
              >
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#0f172a" }}>{run.query}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.4)" }}>
                    {new Date(run.createdAt).toLocaleString()} · {run.sources.join(", ")}
                  </p>
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: run.status === "complete" ? "#0f172a" : "#facc15" }}>
                  {run.status} {run.status === "complete" ? `· ${run.clusterCount} clusters` : ""}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


