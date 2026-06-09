import { Check, Loader2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export function RunProgressOverlay() {
  const { activeRun } = useApp();

  if (!activeRun || activeRun.status === "complete" || activeRun.status === "idle") {
    return null;
  }

  const isDone = activeRun.status === "complete";

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30 backdrop-blur-sm p-6">
      <div
        className="w-full max-w-md rounded-[22px] p-6 glass-panel"
        style={{ border: "1px solid rgba(15,23,42,0.1)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          {isDone ? (
            <Check size={20} style={{ color: "#0f172a" }} />
          ) : (
            <Loader2 size={20} className="animate-spin" style={{ color: "#0f172a" }} />
          )}
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "15px", color: "#0f172a" }}>
              {isDone ? "Research complete" : "Running research"}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.5)" }}>
              {activeRun.query}
            </p>
          </div>
        </div>

        <div className="h-2 rounded-full mb-3 overflow-hidden" style={{ background: "rgba(15,23,42,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${activeRun.progress}%`,
              background: "linear-gradient(90deg, #0f172a, #334155)",
            }}
          />
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.55)" }}>
          {activeRun.stage}
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(15,23,42,0.35)", marginTop: "8px" }}>
          Sources: {activeRun.sources.join(", ")}
        </p>
      </div>
    </div>
  );
}
