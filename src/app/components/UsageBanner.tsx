import { Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../context/AppContext";

export function UsageBanner({ collapsed = false }: { collapsed?: boolean }) {
  const { user, runsRemaining, setShowUpgradeModal } = useApp();

  if (!user || user.plan === "pro") return null;

  const used = user.runsUsedThisMonth;
  const limit = 3;
  const pct = Math.min(100, (used / limit) * 100);
  const label = `Free plan · ${used}/${limit} runs`;

  return (
    <div className={collapsed ? "mb-1" : "mx-3 mt-2 mb-1"}>
      <button
        type="button"
        onClick={() => runsRemaining === 0 && setShowUpgradeModal(true)}
        title={label}
        aria-label={label}
        className={`flex items-center w-full rounded-xl transition-colors duration-200 hover:bg-slate-50 cursor-pointer ${
          collapsed ? "justify-center px-3 py-2.5" : "gap-3 px-3 py-2"
        }`}
        style={
          collapsed
            ? { border: "none", background: "transparent", cursor: runsRemaining === 0 ? "pointer" : "default" }
            : { background: "rgba(15,23,42,0.04)", border: "1px solid rgba(15,23,42,0.08)", cursor: runsRemaining === 0 ? "pointer" : "default" }
        }
      >
        <Zap
          size={15}
          strokeWidth={1.8}
          className="pointer-events-none shrink-0"
          style={{ color: used >= limit ? "#f87171" : "rgba(15,23,42,0.50)" }}
        />
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="pointer-events-none flex-1 min-w-0 overflow-hidden"
            >
              <div className="flex justify-between mb-1">
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.5)", whiteSpace: "nowrap" }}>
                  {label}
                </span>
                {runsRemaining === 0 && (
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap" }}>
                    Upgrade
                  </span>
                )}
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(15,23,42,0.08)" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: used >= limit ? "#f87171" : "#0f172a" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
