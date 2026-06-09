import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Wifi } from "lucide-react";
import { Sidebar, NavItem } from "./components/Sidebar";
import { SourceFeed } from "./components/SourceFeed";
import { Overview } from "./components/screens/Overview";
import { ResearchRuns } from "./components/screens/ResearchRuns";
import { SourceFeedScreen } from "./components/screens/SourceFeedScreen";
import { PainClusters } from "./components/screens/PainClusters";
import { StartupIdeas } from "./components/screens/StartupIdeas";
import { AudienceMap } from "./components/screens/AudienceMap";
import { PipelineAnalytics } from "./components/screens/PipelineAnalytics";
import { ContentStudio } from "./components/screens/ContentStudio";
import { Competitors } from "./components/screens/Competitors";
import { Exports } from "./components/screens/Exports";
import { Settings } from "./components/screens/Settings";
import { Profile } from "./components/screens/Profile";
import { AppProvider, useApp } from "./context/AppContext";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { Onboarding } from "./components/onboarding/Onboarding";
import { RunProgressOverlay } from "./components/RunProgressOverlay";
import { UpgradeModal } from "./components/UpgradeModal";
import { SplashScreen } from "./components/SplashScreen";

const screenWithFeed: NavItem[] = ["overview", "feed", "pain", "ideas", "pipeline"];

function Screen({ active, avatarSrc, onAvatarChange }: { active: NavItem; avatarSrc: string | null; onAvatarChange: (src: string) => void }) {
  switch (active) {
    case "overview": return <Overview />;
    case "research": return <ResearchRuns />;
    case "feed": return <SourceFeedScreen />;
    case "pain": return <PainClusters />;
    case "ideas": return <StartupIdeas />;
    case "audience": return <AudienceMap />;
    case "pipeline": return <PipelineAnalytics />;
    case "content": return <ContentStudio />;
    case "competitors": return <Competitors />;
    case "exports": return <Exports />;
    case "settings": return <Settings />;
    case "profile": return <Profile avatarSrc={avatarSrc} onAvatarChange={onAvatarChange} />;
    default: return <Overview />;
  }
}

function AppRouter() {
  const { user, onboarded, authView } = useApp();
  if (!user) return authView === "signup" ? <Signup /> : <Login />;
  if (!onboarded) return <Onboarding />;
  return <Dashboard />;
}

function Dashboard() {
  const { activePage, navigate, user } = useApp();
  const [showSplash, setShowSplash] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showSplash || !containerRef.current) return;
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" });
  }, [showSplash]);

  const handleNav = (id: NavItem) => {
    if (id === activePage) {
      setMobileMenuOpen(false);
      return;
    }

    const goToPage = () => {
      navigate(id);
      setMobileMenuOpen(false);
    };

    if (!contentRef.current) {
      goToPage();
      return;
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        goToPage();
        gsap.fromTo(contentRef.current!, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" });
      },
    });
  };

  const showFeed = screenWithFeed.includes(activePage);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div
        ref={containerRef}
        className="w-screen h-screen overflow-hidden flex flex-col md:flex-row relative"
        style={{
          background: "var(--background)",
          opacity: showSplash ? 0 : 1,
          pointerEvents: showSplash ? "none" : "auto",
        }}
        aria-hidden={showSplash}
      >
      <RunProgressOverlay />
      <UpgradeModal />

      <div className="fixed pointer-events-none glow-spot" style={{ width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 65%)", top: "-150px", left: "80px", filter: "blur(50px)", opacity: 0.75 }} />
      <div className="fixed pointer-events-none glow-spot" style={{ width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)", bottom: "-80px", right: "180px", filter: "blur(44px)", opacity: 0.70 }} />

      <div className="md:hidden flex items-center justify-between p-3 mx-3 mt-3 mb-0 glass-panel shrink-0" style={{ borderRadius: "16px" }}>
        <button onClick={() => handleNav("overview")} className="flex items-center gap-2" style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer" }} aria-label="Go to Overview">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white"><Wifi size={16} strokeWidth={2.5} /></div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "13px", color: "#0f172a", letterSpacing: "1px" }}>PAINSIGNAL</span>
        </button>
        <button onClick={() => setMobileMenuOpen(true)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-700" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>

      {mobileMenuOpen && <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />}

      <div className={`fixed md:relative z-50 h-full transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <Sidebar
          active={activePage}
          onChange={handleNav}
          onCloseMobile={() => setMobileMenuOpen(false)}
          avatarSrc={avatarSrc}
          userName={user?.name}
          userPlan={user?.plan === "pro" ? "Pro Plan" : "Free Plan"}
        />
      </div>

      <div className="flex-1 m-3 md:ml-0 overflow-hidden glass-panel" style={{ borderRadius: "22px" }}>
        <div ref={contentRef} className="h-full overflow-hidden">
          <Screen active={activePage} avatarSrc={avatarSrc} onAvatarChange={setAvatarSrc} />
        </div>
      </div>

      {showFeed && (
        <div className="m-3 ml-0 overflow-hidden hidden lg:flex flex-col glass-panel" style={{ borderRadius: "22px", width: "300px", flexShrink: 0 }}>
          <SourceFeed />
        </div>
      )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
