import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  MapPin,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Calendar,
  Edit3,
  Check,
  X,
  TrendingUp,
  Users,
  Zap,
  Star,
  Award,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const SKILLS = [
  "Product Research",
  "Pain Signal Analysis",
  "Market Validation",
  "Founder Outreach",
  "Community Growth",
  "User Interviews",
  "Startup Strategy",
  "Competitive Analysis",
  "Content Distribution",
  "B2B SaaS",
];

const STATS = [
  { label: "Research Runs", value: "284", icon: Zap, delta: "+12 this week" },
  { label: "Pain Clusters", value: "1,473", icon: TrendingUp, delta: "+89 this month" },
  { label: "Ideas Generated", value: "62", icon: Star, delta: "+8 today" },
  { label: "Sources Active", value: "8", icon: Users, delta: "All connected" },
];

const TIMELINE = [
  {
    role: "Founder & Researcher",
    org: "PainSignal OS",
    period: "2024 – Present",
    desc: "Building the pain-signal intelligence layer for early-stage founders.",
    icon: Briefcase,
  },
  {
    role: "Product Lead",
    org: "Stealth SaaS",
    period: "2022 – 2024",
    desc: "Led product discovery and GTM for a B2B community analytics tool.",
    icon: BookOpen,
  },
  {
    role: "Indie Maker",
    org: "Product Hunt #1",
    period: "2021",
    desc: "Launched micro-SaaS tools, reaching #1 Product of the Day.",
    icon: Award,
  },
];

function EditableField({
  value,
  onSave,
  multiline = false,
  className = "",
}: {
  value: string;
  onSave: (v: string) => void;
  multiline?: boolean;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = () => {
    onSave(draft.trim() || value);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <span className="inline-flex items-start gap-1 w-full">
        {multiline ? (
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            className={`flex-1 bg-transparent border-b border-slate-400 outline-none resize-none ${className}`}
          />
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className={`flex-1 bg-transparent border-b border-slate-400 outline-none ${className}`}
          />
        )}
        <button onClick={commit} className="mt-0.5 text-emerald-600 hover:text-emerald-700"><Check size={14} /></button>
        <button onClick={cancel} className="mt-0.5 text-slate-400 hover:text-slate-600"><X size={14} /></button>
      </span>
    );
  }

  return (
    <span
      className={`group inline-flex items-center gap-1 cursor-pointer ${className}`}
      onClick={() => setEditing(true)}
    >
      {value}
      <Edit3 size={11} className="opacity-0 group-hover:opacity-40 transition-opacity shrink-0 ml-0.5" />
    </span>
  );
}

export function Profile({
  avatarSrc,
  onAvatarChange,
}: {
  avatarSrc: string | null;
  onAvatarChange: (src: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("Jake Kim");
  const [title, setTitle] = useState("Founder & Pain-Signal Researcher");
  const [bio, setBio] = useState(
    "I build tools that turn online conversation into validated startup signals. Obsessed with founder distribution, community research, and zero-to-one products."
  );
  const [location, setLocation] = useState("San Francisco, CA");
  const [website, setWebsite] = useState("jakekim.co");
  const [twitter, setTwitter] = useState("@jakekim");
  const [linkedin, setLinkedin] = useState("in/jakekim");
  const [github, setGithub] = useState("jakekim-dev");

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".anim-in"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onAvatarChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, [onAvatarChange]);

  return (
    <div ref={ref} className="flex flex-col h-full overflow-y-auto px-6 py-6" style={{ scrollbarWidth: "none" }}>
      {/* Cover Banner */}
      <div
        className="anim-in relative rounded-2xl mb-0 overflow-hidden shrink-0"
        style={{
          height: "140px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #1d4ed8 100%)",
        }}
      >
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.4) 0%, transparent 50%)",
          }}
        />
        <div className="absolute bottom-3 right-4">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.5px",
            }}
          >
            PAINSIGNAL // FOUNDER OS
          </span>
        </div>
      </div>

      {/* Avatar row overlapping banner */}
      <div className="anim-in relative flex items-end justify-between px-4 -mt-10 mb-4 shrink-0">
        <div className="relative group">
          <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt={name} />
            ) : (
              <AvatarFallback
                className="text-white text-xl font-bold"
                style={{ background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)" }}
              >
                {name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            )}
          </Avatar>
          {/* Camera overlay */}
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Change profile picture"
          >
            <Camera size={18} className="text-white" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Plan badge */}
        <div className="mb-2 flex gap-2">
          <Badge
            className="text-[10px] uppercase tracking-widest px-3 py-1"
            style={{ background: "rgba(15,23,42,0.08)", color: "#0f172a", border: "1px solid rgba(15,23,42,0.15)" }}
          >
            Pro Plan
          </Badge>
          <Badge
            className="text-[10px] uppercase tracking-widest px-3 py-1"
            style={{ background: "rgba(16,185,129,0.1)", color: "#059669", border: "1px solid rgba(16,185,129,0.25)" }}
          >
            ✦ Verified
          </Badge>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Name + title + bio */}
          <div className="anim-in rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "24px", color: "#0f172a", lineHeight: 1.1 }}>
              <EditableField value={name} onSave={setName} className="text-[24px] font-extrabold text-slate-900" />
            </h1>
            <p className="mt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#3b82f6", fontWeight: 500 }}>
              <EditableField value={title} onSave={setTitle} className="text-[14px] text-blue-500" />
            </p>
            <Separator className="my-3 bg-slate-100" />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(15,23,42,0.65)", lineHeight: 1.65 }}>
              <EditableField value={bio} onSave={setBio} multiline className="text-[13px] text-slate-600 leading-relaxed w-full" />
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mt-4">
              {[
                { icon: MapPin, val: location, set: setLocation },
                { icon: Globe, val: website, set: setWebsite },
                { icon: Twitter, val: twitter, set: setTwitter },
                { icon: Linkedin, val: linkedin, set: setLinkedin },
                { icon: Github, val: github, set: setGithub },
              ].map(({ icon: Icon, val, set }) => (
                <span key={val} className="flex items-center gap-1.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.55)" }}>
                  <Icon size={13} className="shrink-0 text-slate-400" />
                  <EditableField value={val} onSave={set} className="text-[12px] text-slate-500" />
                </span>
              ))}
              <span className="flex items-center gap-1.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.45)" }}>
                <Calendar size={13} className="shrink-0 text-slate-400" />
                Joined March 2024
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="anim-in grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(({ label, value, icon: Icon, delta }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.18 }}
                className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
              >
                <Icon size={14} style={{ color: "#0f172a", marginBottom: "8px", opacity: 0.6 }} />
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "22px", color: "#0f172a" }}>{value}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.5)", marginTop: "2px" }}>{label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#059669", marginTop: "4px", fontWeight: 500 }}>{delta}</p>
              </motion.div>
            ))}
          </div>

          {/* Experience timeline */}
          <div className="anim-in rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.4)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "16px" }}>Experience</p>
            <div className="flex flex-col gap-5">
              {TIMELINE.map(({ role, org, period, desc, icon: Icon }, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(15,23,42,0.06)", border: "1px solid rgba(15,23,42,0.1)" }}>
                      <Icon size={14} style={{ color: "#0f172a" }} />
                    </div>
                    {i < TIMELINE.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: "rgba(15,23,42,0.08)" }} />}
                  </div>
                  <div className="pb-4 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0f172a" }}>{role}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#3b82f6" }}>@ {org}</span>
                    </div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(15,23,42,0.35)", marginTop: "2px", marginBottom: "5px" }}>{period}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.55)", lineHeight: "1.55" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Contact card */}
          <div className="anim-in rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.4)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "14px" }}>Contact</p>
            <div className="flex flex-col gap-3">
              {[
                { icon: Mail, label: "Email", val: "jake@painsignal.co" },
                { icon: Twitter, label: "Twitter", val: twitter },
                { icon: Linkedin, label: "LinkedIn", val: linkedin },
                { icon: Github, label: "GitHub", val: github },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(15,23,42,0.06)" }}>
                    <Icon size={13} style={{ color: "#0f172a" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(15,23,42,0.35)", letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#0f172a", fontWeight: 500 }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="anim-in rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.4)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "14px" }}>Skills & Focus Areas</p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-[11px] font-medium py-1"
                  style={{ background: "rgba(15,23,42,0.04)", borderColor: "rgba(15,23,42,0.12)", color: "rgba(15,23,42,0.7)" }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievement card */}
          <div className="anim-in rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.06) 0%, rgba(29,78,216,0.06) 100%)", border: "1px solid rgba(15,23,42,0.12)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(15,23,42,0.4)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "14px" }}>Achievements</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Research Streak", val: "21 days 🔥" },
                { label: "Top Cluster Quality", val: "94 / 100" },
                { label: "Ideas to Validation", val: "12 shipped" },
                { label: "Member Since", val: "March 2024" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.55)" }}>{label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#0f172a", fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
