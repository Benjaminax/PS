import { useState } from "react";
import { Check, ChevronRight, FlaskConical, Layers, Wifi } from "lucide-react";
import { useApp } from "../../context/AppContext";

const steps = [
  {
    title: "Build with evidence, not guesswork",
    body: "PainSignal mines Reddit and Hacker News for real pain points, clusters them, and scores opportunities so you know what to build first.",
  },
  {
    title: "Create your first project",
    body: "Projects keep research runs, clusters, and exports organized by niche or product idea.",
  },
  {
    title: "Run your first research",
    body: "We'll scan public conversations and surface ranked pain clusters in under a minute.",
  },
];

export function Onboarding() {
  const { completeOnboarding, startResearchRun, navigate } = useApp();
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [niche, setNiche] = useState("");
  const [query, setQuery] = useState("early-stage SaaS distribution");

  const finish = () => {
    completeOnboarding(projectName || "My First Project", niche || "General");
    if (query.trim()) {
      startResearchRun(query);
    }
    navigate("overview");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--background)" }}>
      <div className="w-full max-w-lg glass-panel rounded-[22px] p-8" style={{ border: "1px solid rgba(15,23,42,0.08)" }}>
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Wifi size={18} />
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "1px" }}>
            GETTING STARTED
          </span>
        </div>

        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full"
              style={{ background: i <= step ? "#0f172a" : "rgba(15,23,42,0.1)" }}
            />
          ))}
        </div>

        {step === 0 && (
          <div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", marginBottom: "8px" }}>
              {steps[0].title}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(15,23,42,0.6)", lineHeight: 1.6, marginBottom: "24px" }}>
              {steps[0].body}
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: FlaskConical, label: "Research runs" },
                { icon: Layers, label: "Pain clusters" },
                { icon: Check, label: "Export reports" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-xl p-3 text-center" style={{ background: "rgba(15,23,42,0.04)", border: "1px solid rgba(15,23,42,0.08)" }}>
                  <Icon size={18} className="mx-auto mb-2 text-slate-700" />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#0f172a" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", marginBottom: "8px" }}>
              {steps[1].title}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(15,23,42,0.6)", marginBottom: "20px" }}>
              {steps[1].body}
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)", display: "block", marginBottom: "6px" }}>
                  Project name
                </label>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. B2B Analytics Tool"
                  className="w-full rounded-xl px-3 py-2.5 outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(15,23,42,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)", display: "block", marginBottom: "6px" }}>
                  Niche / market
                </label>
                <input
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Developer tools, B2B SaaS"
                  className="w-full rounded-xl px-3 py-2.5 outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(15,23,42,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", marginBottom: "8px" }}>
              {steps[2].title}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(15,23,42,0.6)", marginBottom: "20px" }}>
              {steps[2].body}
            </p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What market should we research?"
              className="w-full rounded-xl px-3 py-2.5 outline-none"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(15,23,42,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}
            />
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", background: "none", border: "none" }}
            >
              Back
            </button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
              style={{ background: "#0f172a", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600 }}
            >
              Continue <ChevronRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={finish}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
              style={{ background: "#0f172a", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600 }}
            >
              Start research <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
