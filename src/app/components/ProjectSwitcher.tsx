import { useState, type MouseEvent } from "react";
import { ChevronDown, FolderPlus, Check, Trash2 } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { useApp } from "../context/AppContext";
import type { Project } from "../context/AppContext";

function confirmDeleteProject(project: Project) {
  return window.confirm(
    `Delete "${project.name}"? This will permanently remove the project and all of its research runs.`
  );
}

export function ProjectSwitcher({ collapsed }: { collapsed: boolean }) {
  const { projects, activeProject, setActiveProjectId, createProject, deleteProject } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");

  if (collapsed) return null;

  const handleCreate = () => {
    if (!name.trim()) return;
    createProject(name.trim(), niche.trim() || "General");
    setName("");
    setNiche("");
    setShowNew(false);
  };

  const handleDelete = (project: Project, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirmDeleteProject(project)) return;
    deleteProject(project.id);
  };

  return (
    <div className="px-3 mb-4">
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(15,23,42,0.35)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "6px" }}>
        Project
      </p>
      {activeProject ? (
        <Listbox value={activeProject.id} onChange={setActiveProjectId}>
          <div className="relative">
            <Listbox.Button
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-left"
              style={{ background: "rgba(15,23,42,0.04)", border: "1px solid rgba(15,23,42,0.08)" }}
            >
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {activeProject.name}
              </span>
              <ChevronDown size={12} style={{ color: "rgba(15,23,42,0.4)", flexShrink: 0 }} />
            </Listbox.Button>
            <Listbox.Options className="absolute top-full left-0 right-0 mt-1 rounded-xl shadow-lg z-50 py-1 max-h-48 overflow-y-auto" style={{ background: "rgba(255,255,255,0.98)", border: "1px solid rgba(15,23,42,0.1)" }}>
              {projects.map((p) => (
                <Listbox.Option
                  key={p.id}
                  value={p.id}
                  className="px-3 py-2 cursor-pointer hover:bg-slate-50"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px" }}
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {selected ? <Check size={12} className="flex-shrink-0" /> : <span className="w-3 flex-shrink-0" />}
                        <span className={`truncate ${selected ? "font-semibold" : ""}`}>{p.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(p, e)}
                        className="flex-shrink-0 p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        aria-label={`Delete ${p.name}`}
                        title={`Delete ${p.name}`}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </Listbox.Option>
              ))}
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="w-full px-3 py-2 flex items-center gap-2 text-left border-t"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#0f172a", borderColor: "rgba(15,23,42,0.06)" }}
              >
                <FolderPlus size={12} /> New project
              </button>
            </Listbox.Options>
          </div>
        </Listbox>
      ) : (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)", marginBottom: "8px" }}>
          No projects yet. Create one to get started.
        </p>
      )}
      {(showNew || !activeProject) && (
        <div className="mt-2 p-3 rounded-xl flex flex-col gap-2" style={{ background: "rgba(15,23,42,0.03)", border: "1px solid rgba(15,23,42,0.08)" }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="rounded-lg px-2 py-1.5 text-xs outline-none"
            style={{ border: "1px solid rgba(15,23,42,0.1)", fontFamily: "'Inter', sans-serif" }}
          />
          <input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Niche (optional)"
            className="rounded-lg px-2 py-1.5 text-xs outline-none"
            style={{ border: "1px solid rgba(15,23,42,0.1)", fontFamily: "'Inter', sans-serif" }}
          />
          <button
            type="button"
            onClick={handleCreate}
            className="py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "#0f172a", color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
}
