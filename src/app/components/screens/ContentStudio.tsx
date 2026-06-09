import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Wand2, Copy, Check, Calendar, Send, RefreshCw } from "lucide-react";
import { Tab } from "@headlessui/react";
import { CompanyLogo } from "../ui/CompanyLogo";

const variants = [
  {
    platform: "Reddit",
    domain: "reddit.com",
    score: 92,
    text: "We built a simple tool that lets founders validate product ideas by mining real pain points from Reddit. No more guessing — just signal.",
  },
  {
    platform: "Product Hunt",
    domain: "producthunt.com",
    score: 88,
    text: "Introducing PainSignal — turn conversations into startup ideas. Find where users complain, understand what they need, and launch with confidence.",
  },
  {
    platform: "Twitter/X",
    domain: "x.com",
    score: 79,
    text: "Stop building in the dark. PainSignal scans real conversations to surface high-signal pain points before you write a line of code.",
  },
];

const schedule = [
  { day: "Tue", date: "10", time: "9:00 AM", platform: "Reddit", domain: "reddit.com", status: "scheduled" },
  { day: "Thu", date: "12", time: "2:00 PM", platform: "Product Hunt", domain: "producthunt.com", status: "scheduled" },
  { day: "Fri", date: "13", time: "11:00 AM", platform: "Twitter", domain: "x.com", status: "draft" },
];

export function ContentStudio() {
  const ref = useRef<HTMLDivElement>(null);
  const [brief, setBrief] = useState("pain signal for indie hackers");
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim-in"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" });
  }, []);

  const copy = (i: number, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div ref={ref} className="flex flex-col h-full overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
      <div className="anim-in mb-5">
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>Content Studio</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
          generate signal-backed posts from your research.
        </p>
      </div>

      <div className="anim-in grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left: brief + variants */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Campaign brief */}
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>Campaign Brief</span>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded-md" style={{ background: "rgba(15,23,42,0.1)", border: "1px solid rgba(15,23,42,0.2)", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#0f172a" }}>Pain Clusters</span>
                <span className="px-2 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.5)" }}>Idea Suggested</span>
              </div>
            </div>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="w-full resize-none outline-none rounded-xl p-3"
              rows={3}
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#0f172a", lineHeight: "1.5" }}
            />
            <div className="flex gap-2 mt-3">
              {["Founders", "Solo Builders", "Post Waitlist"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.6)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Generated variants */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>Generated Variants</span>
              <button type="button" className="flex items-center gap-1.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#0f172a" }}>
                <RefreshCw size={12} />
                Regenerate
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {variants.map((v, i) => (
                <div key={i} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <CompanyLogo domain={v.domain} name={v.platform} alt={`${v.platform} logo`} className="h-6 w-6 shrink-0" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: "#0f172a" }}>{v.platform}</span>
                    <div className="ml-auto flex items-center gap-2">
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#0f172a" }}>{v.score}</span>
                      <button
                        type="button"
                        onClick={() => copy(i, v.text)}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}
                      >
                        {copied === i ? <Check size={12} style={{ color: "#0f172a" }} /> : <Copy size={12} style={{ color: "rgba(15,23,42,0.5)" }} />}
                      </button>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.75)", lineHeight: "1.5" }}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: schedule */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-3">
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={13} style={{ color: "#0f172a" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>Schedule</span>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-1 mb-3">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="flex items-center justify-center h-6">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.35)" }}>{d}</span>
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <button
                  type="button"
                  key={d}
                  className="flex items-center justify-center h-7 rounded-lg transition-colors"
                  style={{
                    background: d === 10 || d === 12 || d === 13 ? "rgba(15,23,42,0.15)" : "transparent",
                    border: d === 10 || d === 12 || d === 13 ? "1px solid rgba(15,23,42,0.25)" : "1px solid transparent",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: d === 10 || d === 12 || d === 13 ? "#0f172a" : "rgba(15,23,42,0.4)",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {schedule.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <div className="text-center w-8">
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: "rgba(15,23,42,0.4)" }}>{s.day}</p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#0f172a", fontWeight: 500 }}>{s.date}</p>
                  </div>
                  <CompanyLogo domain={s.domain} name={s.platform} alt={`${s.platform} logo`} className="h-6 w-6 shrink-0" />
                  <div className="flex-1">
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#0f172a" }}>{s.platform}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.4)" }}>{s.time}</p>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{
                      background: s.status === "scheduled" ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.10)",
                      border: s.status === "scheduled" ? "1px solid rgba(15,23,42,0.2)" : "1px solid rgba(255,255,255,0.16)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "9px",
                      color: s.status === "scheduled" ? "#0f172a" : "rgba(15,23,42,0.5)",
                    }}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl mt-3 transition-all duration-200"
              style={{
                background: "rgba(15,23,42,0.2)",
                border: "1px solid rgba(15,23,42,0.25)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "#0f172a",
                letterSpacing: "0.5px",
              }}
            >
              <Send size={12} />
              Approve &amp; Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


