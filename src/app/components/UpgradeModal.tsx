import { Check, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export function UpgradeModal() {
  const { showUpgradeModal, setShowUpgradeModal, upgradeToPro, user } = useApp();

  if (!showUpgradeModal) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/30 backdrop-blur-sm p-6">
      <div className="w-full max-w-md rounded-[22px] p-6 glass-panel relative" style={{ border: "1px solid rgba(15,23,42,0.1)" }}>
        <button
          type="button"
          onClick={() => setShowUpgradeModal(false)}
          className="absolute top-4 right-4"
          aria-label="Close"
        >
          <X size={16} style={{ color: "rgba(15,23,42,0.4)" }} />
        </button>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px", color: "rgba(15,23,42,0.45)", textTransform: "uppercase", marginBottom: "8px" }}>
          Usage limit reached
        </p>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "20px", color: "#0f172a", marginBottom: "8px" }}>
          Upgrade to Pro
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.55)", marginBottom: "20px" }}>
          Free plan includes 3 research runs per month. You&apos;ve used {user?.runsUsedThisMonth ?? 0} of 3.
        </p>
        <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(15,23,42,0.05)", border: "1px solid rgba(15,23,42,0.1)" }}>
          <div className="flex justify-between mb-3">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px" }}>Pro</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px" }}>$49/mo</span>
          </div>
          {["Unlimited research runs", "Reddit + Hacker News + all sources", "Markdown & PDF exports", "Priority support"].map((f) => (
            <div key={f} className="flex items-center gap-2 mb-1.5">
              <Check size={12} style={{ color: "#0f172a" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.65)" }}>{f}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={upgradeToPro}
          className="w-full py-3 rounded-xl"
          style={{ background: "#0f172a", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600 }}
        >
          Upgrade now
        </button>
      </div>
    </div>
  );
}
