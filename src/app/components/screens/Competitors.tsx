import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ShieldAlert, TrendingUp, Target } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { CompanyLogo } from "../ui/CompanyLogo";

const competitors = [
  { name: "Product Hunt", domain: "producthunt.com", users: 5, cost: 4, validation: 4, audience: 5, ease: 3, score: "High", gap: "High" },
  { name: "Reddit Ads", domain: "reddit.com", users: 4, cost: 3, validation: 3, audience: 4, ease: 4, score: "High", gap: "High" },
  { name: "Google Ads", domain: "google.com", users: 4, cost: 2, validation: 2, audience: 5, ease: 4, score: "Med", gap: "Med" },
  { name: "TurboX Ads", domain: "turboxapp.com", users: 4, cost: 3, validation: 2, audience: 3, ease: 4, score: "Med", gap: "High" },
  { name: "Meral Cold Outreach", domain: "meral.ai", users: 3, cost: 4, validation: 3, audience: 2, ease: 2, score: "Low", gap: "Med" },
  { name: "Founder Communities", domain: "indiehackers.com", users: 3, cost: 5, validation: 4, audience: 2, ease: 3, score: "Med", gap: "Low" },
  { name: "The Opportunity", domain: "painsignal.app", users: 2, cost: 4, validation: 3, audience: 2, ease: 3, score: "Low", gap: "Low" },
];

const gapColor = (g: string) => g === "High" ? "#0f172a" : g === "Med" ? "#facc15" : "#94a3b8";

const Dots = ({ count, max = 5, color }: { count: number; max?: number; color: string }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i < count ? color : "rgba(255,255,255,0.16)" }} />
    ))}
  </div>
);

const positioningCards = [
  { title: "Focus on indie building", body: "Discover real, active pain points from founder community discussions instead of guessing at user problems.", icon: Target },
  { title: "Replace guesswork with live pain signals", body: "Get the data-free collection paths where your users complain and gather invaluable research first.", icon: TrendingUp },
  { title: "Turn conversations into channels", body: "Identify top decision-making paths where your core users engage, then launch into channels that matter.", icon: ShieldAlert },
];

export function Competitors() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim-in"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.45, ease: "power3.out" });
  }, []);

  return (
    <div ref={ref} className="flex flex-col h-full overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
      <div className="anim-in mb-5">
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>Competitor Gap Analysis</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
          see where existing tools fail to solve the pain.
        </p>
      </div>

      {/* Competitor table */}
      <div className="anim-in rounded-2xl p-5 mb-5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200/50 hover:bg-transparent">
              {["Solution", "User Search", "Cost Free", "Validation", "Audience Size", "Ease", "Score", "Gap"].map((h) => (
                <TableHead key={h} className="h-8 px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.8px]">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitors.map((c, i) => (
              <TableRow key={i} className="border-b border-slate-200/20 hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-[13px] text-slate-900 px-2 py-3">
                  <div className="flex items-center gap-2.5">
                    <CompanyLogo
                      domain={c.domain}
                      name={c.name}
                      alt={`${c.name} logo`}
                      className="h-7 w-7 shrink-0"
                    />
                    <span>{c.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-2"><Dots count={c.users} color="#60a5fa" /></TableCell>
                <TableCell className="px-2"><Dots count={c.cost} color="#a78bfa" /></TableCell>
                <TableCell className="px-2"><Dots count={c.validation} color="#facc15" /></TableCell>
                <TableCell className="px-2"><Dots count={c.audience} color="#0f172a" /></TableCell>
                <TableCell className="px-2"><Dots count={c.ease} color="#fb923c" /></TableCell>
                <TableCell className="px-2">
                  <Badge variant="outline" style={{ background: `${gapColor(c.score)}15`, borderColor: `${gapColor(c.score)}25`, color: gapColor(c.score) }} className="text-[10px] uppercase font-semibold">
                    {c.score}
                  </Badge>
                </TableCell>
                <TableCell className="px-2">
                  <Badge variant="outline" style={{ background: `${gapColor(c.gap)}15`, borderColor: `${gapColor(c.gap)}25`, color: gapColor(c.gap) }} className="text-[10px] uppercase font-semibold">
                    {c.gap}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Gap summary + positioning */}
      <div className="anim-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.5)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px" }}>Gap Summary</p>
          {[
            { label: "Founder user acquisition", status: "High", color: "#f87171" },
            { label: "Platform feedback", status: "Med", color: "#facc15" },
            { label: "Review, validate content", status: "Low", color: "#0f172a" },
            { label: "Pain-signal distribution", status: "High", color: "#f87171" },
          ].map(({ label, status, color }) => (
            <div key={label} className="flex items-center gap-2 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.65)", flex: 1 }}>{label}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color, fontWeight: 500 }}>{status}</span>
            </div>
          ))}
          <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.4)" }}>Founder Distribution OS</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.16)" }}>
                <div className="h-full rounded-full" style={{ width: "81%", background: "#0f172a" }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#0f172a" }}>81/100</span>
            </div>
          </div>
        </div>

        {positioningCards.map(({ title, body, icon: Icon }) => (
          <div key={title} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <Icon size={16} style={{ color: "#0f172a", marginBottom: "10px" }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#0f172a", marginBottom: "6px" }}>{title}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.55)", lineHeight: "1.5" }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


