import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { User, Bell, Key, Globe, Shield, ChevronDown, FolderKanban, Trash2 } from "lucide-react";
import { Disclosure } from "@headlessui/react";
import { Switch } from "../ui/switch";
import { useApp } from "../../context/AppContext";

const toggleSettings = [
  { label: "Email notifications on run complete", key: "email" },
  { label: "Auto-save research runs", key: "autosave" },
  { label: "Dark mode", key: "dark" },
  { label: "Beta features", key: "beta" },
];

export function Settings() {
  const { user, setShowUpgradeModal, runsRemaining, projects, activeProject, deleteProject } = useApp();

  const handleDeleteProject = (id: string, name: string) => {
    if (
      !window.confirm(
        `Delete "${name}"? This will permanently remove the project and all of its research runs.`
      )
    ) {
      return;
    }
    deleteProject(id);
  };
  const ref = useRef<HTMLDivElement>(null);
  const [toggles, setToggles] = useState<Record<string, boolean>>({ email: true, autosave: true, dark: true, beta: false });

  const sections = [
    {
      icon: User,
      title: "Profile",
      fields: [
        { label: "Full Name", value: user?.name ?? "", type: "text" },
        { label: "Email", value: user?.email ?? "", type: "email" },
        { label: "Workspace", value: user?.email?.split("@")[0] ?? "", type: "text" },
      ],
    },
    {
      icon: Key,
      title: "API Keys",
      fields: [
        { label: "OpenAI Key", value: "sk-••••••••••••••••••••", type: "password" },
        { label: "Anthropic Key", value: "sk-ant-••••••••••••", type: "password" },
      ],
    },
    {
      icon: Globe,
      title: "Research Defaults",
      fields: [
        { label: "Default Region", value: "Global", type: "text" },
        { label: "Default Language", value: "English", type: "text" },
        { label: "Default Time Range", value: "Last 30 days", type: "text" },
      ],
    },
  ];

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim-in"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" });
  }, []);

  const toggle = (key: string) => setToggles((t) => ({ ...t, [key]: !t[key] }));

  return (
    <div ref={ref} className="flex flex-col h-full overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
      <div className="anim-in mb-5">
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>Settings</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
          manage your account and research preferences.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="anim-in grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          {sections.map(({ icon: Icon, title, fields }) => (
            <Disclosure key={title} defaultOpen>
              {({ open }) => (
                <>
                  <Disclosure.Button type="button" className="flex items-center justify-between w-full rounded-2xl p-4 transition-all" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
                    <div className="flex items-center gap-2">
                      <Icon size={13} style={{ color: "#0f172a" }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>{title}</span>
                    </div>
                    <ChevronDown size={16} style={{ color: "#0f172a", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms" }} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="mt-2 flex flex-col gap-3 pl-4">
                    {fields.map((f) => (
                      <div key={f.label}>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)", display: "block", marginBottom: "5px" }}>{f.label}</label>
                        <input
                          type={f.type}
                          defaultValue={f.value}
                          className="w-full rounded-xl px-3 py-2 outline-none transition-colors duration-150"
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.16)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "#0f172a",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(15,23,42,0.3)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.16)")}
                    />
                  </div>
                ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Bell size={13} style={{ color: "#0f172a" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>Preferences</span>
            </div>
            <div className="flex flex-col gap-3">
              {toggleSettings.map(({ label, key }) => (
                <div key={key} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.7)" }}>{label}</span>
                  <Switch
                    checked={toggles[key]}
                    onCheckedChange={() => toggle(key)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div className="flex items-center gap-2 mb-4">
              <FolderKanban size={13} style={{ color: "#0f172a" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>Projects</span>
            </div>
            {projects.length === 0 ? (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.5)" }}>
                No projects yet. Create one from the sidebar.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5"
                    style={{ background: "rgba(15,23,42,0.04)", border: "1px solid rgba(15,23,42,0.08)" }}
                  >
                    <div className="min-w-0">
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
                        {project.name}
                        {activeProject?.id === project.id && (
                          <span style={{ fontWeight: 500, color: "rgba(15,23,42,0.45)", marginLeft: "6px" }}>· Active</span>
                        )}
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)", marginTop: "2px" }}>
                        {project.niche}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project.id, project.name)}
                      className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      aria-label={`Delete ${project.name}`}
                      title={`Delete ${project.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Shield size={13} style={{ color: "#0f172a" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>Plan</span>
            </div>
            <div className="rounded-xl p-3 mb-3" style={{ background: "rgba(15,23,42,0.06)", border: "1px solid rgba(15,23,42,0.15)" }}>
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>
                  {user?.plan === "pro" ? "Pro" : "Free"}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#0f172a" }}>
                  {user?.plan === "pro" ? "$49/mo" : "$0/mo"}
                </span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.5)" }}>
                {user?.plan === "pro"
                  ? "Unlimited runs · All sources · Priority support"
                  : `${user?.runsUsedThisMonth ?? 0}/3 runs used · ${runsRemaining === Infinity ? "∞" : runsRemaining} remaining`}
              </p>
            </div>
            {user?.plan !== "pro" && (
              <button
                type="button"
                onClick={() => setShowUpgradeModal(true)}
                className="w-full py-2.5 rounded-xl mb-3"
                style={{ background: "#0f172a", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600 }}
              >
                Upgrade to Pro — $49/mo
              </button>
            )}
            <div className="flex flex-col gap-1.5">
              {(user?.plan === "pro"
                ? ["Unlimited research runs", "Access to all sources", "Markdown & PDF exports", "Priority email support"]
                : ["3 research runs per month", "Reddit + Hacker News", "Markdown export", "Email on run complete"]
              ).map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#0f172a" }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.55)" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="py-3 rounded-xl"
            style={{
              background: "rgba(15,23,42,0.15)",
              border: "1px solid rgba(15,23,42,0.25)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#0f172a",
              letterSpacing: "0.5px",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}


