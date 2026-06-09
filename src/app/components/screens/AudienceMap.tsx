import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Users, TrendingUp, Star, ExternalLink } from "lucide-react";

const communities = [
  { name: "r/startups", platform: "Reddit", fit: 9.7, activity: "High", difficulty: "Low", intent: "High", members: "1.2M", opp: 72 },
  { name: "r/SaaS", platform: "Reddit", fit: 9.2, activity: "High", difficulty: "Med", intent: "High", members: "890k", opp: 68 },
  { name: "LinkedIn Founders", platform: "LinkedIn", fit: 8.8, activity: "Med", difficulty: "Low", intent: "Med", members: "450k", opp: 61 },
  { name: "Product Hunt", platform: "PH", fit: 8.3, activity: "High", difficulty: "Very High", intent: "High", members: "640k", opp: 59 },
  { name: "Indie Hackers", platform: "IH", fit: 7.9, activity: "High", difficulty: "Med", intent: "High", members: "120k", opp: 55 },
  { name: "Hacker News", platform: "HN", fit: 7.1, activity: "High", difficulty: "Very High", intent: "Med", members: "2.1M", opp: 50 },
];

const channelData = [
  { channel: "Reddit", reach: 78, engagement: 62, conversion: 14 },
  { channel: "Twitter/X", reach: 65, engagement: 71, conversion: 11 },
  { channel: "LinkedIn", reach: 52, engagement: 48, conversion: 18 },
  { channel: "Product Hunt", reach: 44, engagement: 83, conversion: 22 },
  { channel: "Indie Hackers", reach: 38, engagement: 79, conversion: 19 },
];

const diffColor = (d: string) =>
  d === "Very High" ? "#f87171" : d === "High" ? "#fb923c" : d === "Med" ? "#facc15" : "#0f172a";

export function AudienceMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim-in"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" });
  }, []);

  return (
    <div ref={ref} className="flex flex-col h-full overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
      <div className="anim-in mb-5">
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>Audience Map</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
          find where your ideal users already hang out and what they care about.
        </p>
      </div>

      <div className="anim-in grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {[
          { label: "Top Community", value: "r/startups", sub: "Fit score 9.7", icon: Star, color: "#facc15" },
          { label: "Best Channel", value: "Product Hunt", sub: "22% conversion", icon: TrendingUp, color: "#0f172a" },
          { label: "Total Reach", value: "5.4M", sub: "Across 6 communities", icon: Users, color: "#60a5fa" },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Icon size={13} style={{ color }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.5)" }}>{label}</span>
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 500, color: "#0f172a" }}>{value}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.4)", marginTop: "2px" }}>{sub}</p>
          </div>
        ))}
      </div>

      <div className="anim-in grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Community table */}
        <div className="col-span-1 lg:col-span-3 rounded-2xl p-4 flex flex-col h-[600px]" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>Community Ranking</span>
          </div>
          <div className="grid mb-2 px-2" style={{ gridTemplateColumns: "1fr 60px 80px 80px 60px 50px" }}>
            {["Community", "Fit", "Activity", "Intent", "Members", "Opp"].map((h) => (
              <span key={h} style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(15,23,42,0.35)", letterSpacing: "0.8px", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {communities.map((c, i) => (
              <div
                key={i}
                className="grid items-center px-2 py-2.5 rounded-xl transition-all duration-150"
                style={{ gridTemplateColumns: "1fr 60px 80px 80px 60px 50px" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12.5px", color: "#0f172a" }}>{c.name}</span>
                  <ExternalLink size={10} style={{ color: "rgba(15,23,42,0.25)" }} />
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{c.fit}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.6)" }}>{c.activity}</span>
                <span className="px-2 py-0.5 rounded-md text-center" style={{ background: c.intent === "High" ? "rgba(15,23,42,0.1)" : "rgba(250,204,21,0.1)", border: c.intent === "High" ? "1px solid rgba(15,23,42,0.2)" : "1px solid rgba(250,204,21,0.2)", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: c.intent === "High" ? "#0f172a" : "#facc15", fontWeight: 500, maxWidth: "60px" }}>
                  {c.intent}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(15,23,42,0.45)" }}>{c.members}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#0f172a" }}>{c.opp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel chart */}
        <div className="col-span-1 lg:col-span-2 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a", display: "block", marginBottom: "16px" }}>
            Channel Mix
          </span>
          <div className="flex flex-col gap-4">
            {channelData.map((ch) => (
              <div key={ch.channel}>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#0f172a" }}>{ch.channel}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#0f172a" }}>{ch.conversion}%</span>
                </div>
                <div className="flex gap-1">
                  {[
                    { val: ch.reach, color: "rgba(15,23,42,0.6)" },
                    { val: ch.engagement, color: "rgba(96,165,250,0.6)" },
                    { val: ch.conversion * 3, color: "rgba(250,204,21,0.6)" },
                  ].map(({ val, color }, j) => (
                    <div key={j} className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${val}%`, background: color }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            {[{ label: "Reach", color: "rgba(15,23,42,0.6)" }, { label: "Engagement", color: "rgba(96,165,250,0.6)" }, { label: "Conversion", color: "rgba(250,204,21,0.6)" }].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.45)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


