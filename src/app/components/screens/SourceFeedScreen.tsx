import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Search, ArrowUpRight, ThumbsUp, MessageCircle, Bookmark } from "lucide-react";
import { CompanyLogo } from "../ui/CompanyLogo";
import { sourcePosts } from "../../data/mockData";
import { useApp } from "../../context/AppContext";

export function SourceFeedScreen() {
  const { highlightPostId } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(
    () =>
      sourcePosts.filter((post) => {
        const query = search.toLowerCase();
        return (
          !query ||
          post.title.toLowerCase().includes(query) ||
          post.body.toLowerCase().includes(query) ||
          post.platform.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }),
    [search]
  );

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".feed-post"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: "power3.out" });
  }, [filteredPosts.length]);

  useEffect(() => {
    if (highlightPostId && ref.current) {
      const el = ref.current.querySelector(`[data-post-id="${highlightPostId}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightPostId]);

  return (
    <div ref={ref} className="flex flex-col h-full overflow-hidden px-8 py-6">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#0f172a", textTransform: "capitalize" }}>Source Feed</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>
            watch live conversations turn into product signals.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm w-80">
          <Search size={14} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search feed..."
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>
      </div>

      <div className="flex gap-3 mb-5">
        {[
          { label: "Sources", value: "Reddit + HN", color: "#0f172a" },
          { label: "Posts", value: String(sourcePosts.length), color: "#0f172a" },
          { label: "High intent", value: String(sourcePosts.filter((p) => p.score >= 70).length), color: "#f87171" },
          { label: "Avg score", value: String(Math.round(sourcePosts.reduce((s, p) => s + p.score, 0) / sourcePosts.length)), color: "#facc15" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)" }}>{label}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color, fontWeight: 500 }}>{value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {filteredPosts.map((post) => {
          const highlighted = highlightPostId === post.id;
          return (
            <div
              key={post.id}
              data-post-id={post.id}
              className="feed-post rounded-2xl p-5 transition-all duration-200 group"
              style={{
                background: highlighted ? "rgba(15,23,42,0.05)" : "rgba(255,255,255,0.08)",
                border: highlighted ? "2px solid rgba(15,23,42,0.2)" : "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <div className="flex items-start gap-4">
                <CompanyLogo
                  domain={post.domain}
                  name={post.company ?? post.platform}
                  alt={`${post.company ?? post.platform} logo`}
                  className="h-8 w-8 shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.5)" }}>{post.sub}</span>
                    <span style={{ color: "rgba(15,23,42,0.2)", fontSize: "10px" }}>·</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.35)" }}>{post.user}</span>
                    <span style={{ color: "rgba(15,23,42,0.2)", fontSize: "10px" }}>·</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.3)" }}>{post.time}</span>
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight size={11} style={{ color: "rgba(15,23,42,0.2)" }} className="group-hover:text-[#0f172a] transition-colors" />
                    </a>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "6px" }}>{post.title}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12.5px", color: "rgba(15,23,42,0.65)", lineHeight: "1.5" }}>{post.body}</p>
                  <div className="flex items-center gap-3 mt-3">
                    {post.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md" style={{ background: "rgba(15,23,42,0.08)", border: "1px solid rgba(15,23,42,0.15)", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#0f172a", fontWeight: 500 }}>
                        {t}
                      </span>
                    ))}
                    <div className="flex items-center gap-3 ml-auto">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={11} style={{ color: "rgba(15,23,42,0.35)" }} />
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(15,23,42,0.45)" }}>{post.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={11} style={{ color: "rgba(15,23,42,0.35)" }} />
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(15,23,42,0.45)" }}>{post.comments}</span>
                      </div>
                      <button
                        type="button"
                        aria-label={saved[post.id] ? "Unsave post" : "Save post"}
                        onClick={() => setSaved((s) => ({ ...s, [post.id]: !s[post.id] }))}
                        className="text-inherit"
                      >
                        <Bookmark size={13} fill={saved[post.id] ? "#0f172a" : "none"} style={{ color: saved[post.id] ? "#0f172a" : "rgba(15,23,42,0.35)" }} />
                      </button>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#0f172a", fontWeight: 600 }}>{post.score}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
