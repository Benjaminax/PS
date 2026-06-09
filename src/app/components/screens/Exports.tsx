import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { FileText, Download, Share2, Clipboard, ExternalLink, Check } from "lucide-react";
import { useState } from "react";
import { buildMarkdownReport } from "../../data/mockData";
import { useApp } from "../../context/AppContext";

const formats = [
  { name: "Markdown", desc: "MVP default", icon: FileText, color: "#60a5fa" },
  { name: "PDF", desc: "Best for sharing", icon: FileText, color: "#f87171" },
  { name: "Notion", desc: "Paste into Notion", icon: FileText, color: "#0f172a" },
];

const sections = [
  "Executive Summary",
  "Evidence Quotes",
  "Pain Clusters",
  "Audience Map",
  "Startup Ideas",
  "Competitor Gap",
  "WTP Plan",
  "Tech Stack",
];

const recentExports = [
  { name: "Founder Distribution OS.pdf", date: "May 26, 2025", size: "2.4 MB", status: "done" },
  { name: "User Feedback Map.pdf", date: "May 19, 2025", size: "1.8 MB", status: "done" },
  { name: "Landing Page Executive.pdf", date: "May 12, 2025", size: "1.1 MB", status: "done" },
];

export function Exports() {
  const { activeProject, researchRuns } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [included, setIncluded] = useState(sections.map(() => true));
  const [exported, setExported] = useState(false);
  const [copiedNotion, setCopiedNotion] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const latestRun = researchRuns[0];
  const reportMarkdown = useMemo(
    () => buildMarkdownReport(activeProject?.name ?? "Project", latestRun?.query ?? "Market research"),
    [activeProject, latestRun]
  );

  const downloadExport = (name: string) => {
    const blob = new Blob([reportMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name.replace(".pdf", ".md");
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 1200);
  };

  const handleCopyToNotion = async () => {
    try {
      await navigator.clipboard.writeText(reportMarkdown);
      setCopiedNotion(true);
      setTimeout(() => setCopiedNotion(false), 2000);
    } catch {
      console.warn("Clipboard write failed");
    }
  };

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText("https://app.example.com/share/research-report");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      console.warn("Clipboard write failed");
    }
  };

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim-in"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" });
  }, []);

  const toggleSection = (i: number) => {
    setIncluded((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const handleExport = () => {
    const format = formats[selectedFormat].name;
    if (format === "Markdown") {
      downloadExport(`${activeProject?.name ?? "report"}.md`);
      return;
    }
    const blob = new Blob([reportMarkdown], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeProject?.name ?? "report"}.${format === "PDF" ? "pdf" : "md"}`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div ref={ref} className="flex flex-col h-full overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
      <div className="anim-in mb-5">
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>Export Report</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
          turn your research into a shareable startup memo.
        </p>
      </div>

      <div className="anim-in grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: format + sections */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px" }}>Report Format</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {formats.map((f, i) => (
                <button
                  type="button"
                  key={f.name}
                  onClick={() => setSelectedFormat(i)}
                  className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl transition-all duration-150"
                  style={{
                    background: selectedFormat === i ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.06)",
                    border: selectedFormat === i ? "1px solid rgba(15,23,42,0.25)" : "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <FileText size={18} style={{ color: selectedFormat === i ? "#0f172a" : f.color, opacity: selectedFormat === i ? 1 : 0.6 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: selectedFormat === i ? "#0f172a" : "#0f172a" }}>{f.name}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.4)" }}>{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px" }}>Content to Include</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((s, i) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSection(i)}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-left transition-all duration-150"
                  style={{
                    background: included[i] ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.06)",
                    border: included[i] ? "1px solid rgba(15,23,42,0.18)" : "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: included[i] ? "#0f172a" : "transparent",
                      border: included[i] ? "none" : "1px solid rgba(15,23,42,0.15)",
                    }}
                  >
                    {included[i] && <Check size={10} style={{ color: "#ffffff" }} strokeWidth={3} />}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: included[i] ? "#0f172a" : "rgba(15,23,42,0.45)" }}>{s}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent exports */}
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px" }}>Recent Exports</p>
            <div className="flex flex-col gap-2">
              {recentExports.map((e, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <FileText size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.4)" }}>{e.date} · {e.size}</p>
                  </div>
                  <button type="button" aria-label={`Download ${e.name}`} onClick={() => downloadExport(e.name)} style={{ color: "rgba(15,23,42,0.4)" }}>
                    <Download size={13} />
                  </button>
                  <button type="button" aria-label={`Share ${e.name}`} onClick={() => handleShareLink()} style={{ color: "rgba(15,23,42,0.4)" }}>
                    <Share2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: preview + actions */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-4 max-h-48 overflow-y-auto" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", scrollbarWidth: "none" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(15,23,42,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px" }}>
              Markdown Preview
            </p>
            <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(15,23,42,0.65)", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
              {reportMarkdown.slice(0, 800)}…
            </pre>
          </div>
          <div className="rounded-2xl p-4 flex-1" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px" }}>Report Quality</p>
            {[
              { label: "Signal accuracy", value: "92%", color: "#0f172a" },
              { label: "Quote coverage", value: "88 evidence", color: "#0f172a" },
              { label: "Cluster confidence", value: "High", color: "#0f172a" },
              { label: "Missing items", value: "2", color: "#facc15" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.5)" }}>{label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color, fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all duration-200"
              style={{
                background: exported ? "rgba(15,23,42,0.25)" : "rgba(15,23,42,0.2)",
                border: "1px solid rgba(15,23,42,0.35)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#0f172a",
                letterSpacing: "1px",
              }}
            >
              {exported ? <Check size={14} /> : <Download size={14} />}
              {exported ? "EXPORTED!" : `EXPORT ${formats[selectedFormat].name.toUpperCase()}`}
            </button>
            <button
              type="button"
              onClick={handleCopyToNotion}
              className="flex items-center justify-center gap-2 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(15,23,42,0.6)",
              }}
            >
              <Clipboard size={13} />
              {copiedNotion ? "COPIED" : "Copy to Notion"}
            </button>
            <button
              type="button"
              onClick={handleShareLink}
              className="flex items-center justify-center gap-2 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(15,23,42,0.6)",
              }}
            >
              <ExternalLink size={13} />
              {copiedLink ? "LINK COPIED" : "Share Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


