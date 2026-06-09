import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  FlaskConical,
  Radio,
  Layers,
  Lightbulb,
  Map,
  BarChart3,
  PenTool,
  Swords,
  FileDown,
  Settings,
  Menu,
  Wifi,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { ProjectSwitcher } from "./ProjectSwitcher";
import { UsageBanner } from "./UsageBanner";
import { useApp } from "../context/AppContext";

export type NavItem =
  | "overview"
  | "research"
  | "feed"
  | "pain"
  | "ideas"
  | "audience"
  | "pipeline"
  | "content"
  | "competitors"
  | "exports"
  | "settings"
  | "profile";

const navItems: { id: NavItem; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "research", label: "Research Runs", icon: FlaskConical },
  { id: "feed", label: "Source Feed", icon: Radio },
  { id: "pain", label: "Pain Clusters", icon: Layers },
  { id: "ideas", label: "Startup Ideas", icon: Lightbulb },
  { id: "audience", label: "Audience Map", icon: Map },
  { id: "pipeline", label: "Pipeline & Analytics", icon: BarChart3 },
  { id: "content", label: "Content Studio", icon: PenTool },
  { id: "competitors", label: "Competitors", icon: Swords },
  { id: "exports", label: "Exports", icon: FileDown },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "profile", label: "My Profile", icon: UserCircle2 },
];

interface SidebarProps {
  active: NavItem;
  onChange: (id: NavItem) => void;
  onCloseMobile?: () => void;
  avatarSrc?: string | null;
  userName?: string;
  userPlan?: string;
}

export function Sidebar({ active, onChange, onCloseMobile, avatarSrc, userName = "User", userPlan = "Free Plan" }: SidebarProps) {
  const { logout } = useApp();
  const initials = userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!sidebarRef.current) return;
    gsap.fromTo(
      sidebarRef.current.querySelectorAll(".nav-item"),
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (collapsed || !navRef.current || !highlightRef.current) {
      if (highlightRef.current) gsap.to(highlightRef.current, { opacity: 0, duration: 0.16 });
      return;
    }

    const activeButton = navRef.current.querySelector<HTMLButtonElement>("[aria-current='page']");
    if (!activeButton || !navRef.current || !highlightRef.current) {
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    const top = buttonRect.top - navRect.top;
    const height = buttonRect.height;

    gsap.to(highlightRef.current, {
      top,
      height,
      opacity: 1,
      duration: 0.32,
      ease: "power2.out",
    });
  }, [active, collapsed]);

  return (
    <motion.aside
      ref={sidebarRef}
      initial={false}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col shrink-0 h-full py-4 px-3 relative z-10"
      style={{
        background: "rgba(255,255,255,0.97)",
        borderRight: "1px solid rgba(15,23,42,0.07)",
        backdropFilter: "blur(16px)",
        boxShadow: "2px 0 20px rgba(15,23,42,0.04)",
      }}
    >
      {/* Header: Logo + Toggle */}
      <div className={`flex flex-col gap-3 mb-8 ${collapsed ? "items-center" : "items-start"} px-3`}>
        {/* Logo */}
        <motion.button
          layout
          type="button"
          className={`flex items-center gap-2 ${collapsed ? "justify-center w-full" : ""}`}
          style={{ cursor: "pointer", border: "none", background: "transparent", padding: 0 }}
          onClick={() => {
            onChange("overview");
            onCloseMobile?.();
          }}
          title="Go to Overview"
          aria-label="Go to Overview"
        >
          <div className="pointer-events-none flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white flex-shrink-0">
            <Wifi size={20} strokeWidth={2.5} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="pointer-events-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#0f172a",
                  letterSpacing: "1px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                PAINSIGNAL
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Toggle Button / Close Mobile */}
        <motion.div layout className={`flex items-center gap-2 ${collapsed ? "justify-center w-full" : "justify-between w-full pr-2"}`}>
          <motion.button
            layout
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className={`hidden md:inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 flex-shrink-0 ${collapsed ? "h-9 w-9 justify-center" : "h-9 gap-2 px-3"}`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu size={16} className="pointer-events-none shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap pointer-events-none"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(15,23,42,0.6)",
                    letterSpacing: "0.5px",
                  }}
                >
                  MENU
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 flex-shrink-0"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </motion.div>
      </div>

      <ProjectSwitcher collapsed={collapsed} />
      <UsageBanner collapsed={collapsed} />

      {/* Nav */}
      <div ref={navRef} className="relative flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div
          ref={highlightRef}
          className="sidebar-glass-highlight"
          style={{ position: "absolute", left: 10, right: 10, top: 0, height: 0, opacity: 0 }}
        />
        <nav className="relative flex flex-col gap-1 h-full">
          {navItems.map(({ id, label, icon: Icon }, index) => {
          const isActive = active === id;
          return (
            <motion.button
              layout
              type="button"
              key={id}
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
              className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left transition-colors duration-200 cursor-pointer ${collapsed ? "justify-center" : ""}`}
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(15,23,42,0.07) 0%, rgba(15,23,42,0.04) 100%)"
                  : "transparent",
                borderLeft: isActive && !collapsed ? "2px solid #0f172a" : "2px solid transparent",
                paddingLeft: collapsed ? "12px" : isActive ? "10px" : "12px",
                animation: !collapsed ? `slideIn 300ms ease-out ${100 + index * 30}ms both` : "none",
              }}
              onClick={() => {
                onChange(id);
                onCloseMobile?.();
              }}
            >
              <Icon
                size={15}
                strokeWidth={isActive ? 2.5 : 1.8}
                className="pointer-events-none shrink-0"
                style={{ color: isActive ? "#0f172a" : "rgba(15,23,42,0.50)" }}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="pointer-events-none flex-1 min-w-0"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12.5px",
                      fontWeight: isActive ? 700 : 450,
                      color: isActive ? "#0f172a" : "rgba(15,23,42,0.60)",
                      letterSpacing: isActive ? "0.1px" : "0",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
        </nav>
      </div>

      {/* Bottom user hint */}
      <div className={`mt-3 pt-3 ${collapsed ? "flex justify-center" : "px-3"}`} style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
        <motion.button
          layout
          type="button"
          onClick={() => {
            onChange("profile");
            onCloseMobile?.();
          }}
          aria-label="View profile"
          className={`flex items-center w-full rounded-xl px-2 py-2 transition-colors duration-150 hover:bg-slate-100 cursor-pointer ${collapsed ? "justify-center" : "gap-3"}`}
          style={{ border: "none", background: "transparent" }}
        >
          <div
            className={`pointer-events-none w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ring-2 ring-transparent transition-all overflow-hidden ${active === "profile" ? "ring-slate-900 ring-offset-1" : ""}`}
            style={!avatarSrc ? { background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)", fontSize: "10px" } : {}}
          >
            {avatarSrc ? (
              <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="pointer-events-none overflow-hidden whitespace-nowrap text-left flex-1"
              >
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11.5px", fontWeight: 600, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis" }}>{userName}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.40)", overflow: "hidden", textOverflow: "ellipsis" }}>{userPlan}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        {!collapsed && (
          <button
            type="button"
            onClick={logout}
            className="mt-2 flex items-center gap-2 w-full px-3 py-2 rounded-xl text-left transition-colors hover:bg-slate-100"
            style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)" }}
          >
            <LogOut size={13} /> Sign out
          </button>
        )}
      </div>

      <style>{`
        .sidebar-glass-highlight {
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14), 0 20px 40px rgba(15, 23, 42, 0.08);
          pointer-events: none;
          transition: opacity 0.24s ease;
          z-index: 0;
        }

        .nav-item {
          position: relative;
          z-index: 1;
        }

        .nav-item:hover:not([aria-current='page']) {
          background: rgba(15,23,42,0.035) !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </motion.aside>
  );
}


