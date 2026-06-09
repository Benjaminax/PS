import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { painClusters } from "../data/mockData";
import type { NavItem } from "../components/Sidebar";

export type AuthView = "login" | "signup";
export type Plan = "free" | "pro";
export type RunStatus = "idle" | "queued" | "processing" | "complete" | "failed";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  runsUsedThisMonth: number;
}

export interface Project {
  id: string;
  name: string;
  niche: string;
  createdAt: string;
}

export interface ResearchRun {
  id: string;
  projectId: string;
  query: string;
  status: RunStatus;
  progress: number;
  stage: string;
  createdAt: string;
  clusterCount: number;
  sources: string[];
}

interface PersistedState {
  user: User | null;
  onboarded: boolean;
  projects: Project[];
  activeProjectId: string | null;
  researchRuns: ResearchRun[];
  activeRunId: string | null;
}

const STORAGE_KEY = "painSignalAppState";
const PAGE_KEY = "painSignalActivePage";

const RUN_STAGES = [
  "Ingesting Reddit & Hacker News…",
  "Extracting pain signals…",
  "Clustering similar problems…",
  "Scoring opportunities…",
  "Generating startup ideas…",
];

const VALID_PAGES: NavItem[] = [
  "overview", "research", "feed", "pain", "ideas", "audience",
  "pipeline", "content", "competitors", "exports", "settings", "profile",
];

function defaultProjects(): Project[] {
  return [
    {
      id: "proj-default",
      name: "SaaS Growth Signals",
      niche: "B2B SaaS distribution",
      createdAt: new Date().toISOString(),
    },
  ];
}

function loadState(): PersistedState {
  if (typeof window === "undefined") {
    return {
      user: null,
      onboarded: false,
      projects: defaultProjects(),
      activeProjectId: "proj-default",
      researchRuns: [],
      activeRunId: null,
    };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        user: null,
        onboarded: false,
        projects: defaultProjects(),
        activeProjectId: "proj-default",
        researchRuns: [],
        activeRunId: null,
      };
    }
    return JSON.parse(raw) as PersistedState;
  } catch {
    return {
      user: null,
      onboarded: false,
      projects: defaultProjects(),
      activeProjectId: "proj-default",
      researchRuns: [],
      activeRunId: null,
    };
  }
}

interface AppContextValue {
  user: User | null;
  onboarded: boolean;
  authView: AuthView;
  setAuthView: (view: AuthView) => void;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  completeOnboarding: (projectName: string, niche: string) => void;
  projects: Project[];
  activeProject: Project | null;
  setActiveProjectId: (id: string) => void;
  createProject: (name: string, niche: string) => void;
  deleteProject: (id: string) => void;
  researchRuns: ResearchRun[];
  activeRun: ResearchRun | null;
  runsRemaining: number;
  canStartRun: boolean;
  startResearchRun: (query: string, sources?: string[]) => boolean;
  activePage: NavItem;
  navigate: (page: NavItem) => void;
  highlightPostId: number | null;
  highlightClusterId: string | null;
  viewEvidence: (postId: number) => void;
  viewCluster: (clusterId: string) => void;
  viewClusterFromIdea: (clusterId: string) => void;
  upgradeToPro: () => void;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (open: boolean) => void;
  pendingQuery: string;
  setPendingQuery: (q: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadState);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [activePage, setActivePage] = useState<NavItem>(() => {
    if (typeof window === "undefined") return "overview";
    const stored = window.localStorage.getItem(PAGE_KEY) as NavItem | null;
    return stored && VALID_PAGES.includes(stored) ? stored : "overview";
  });
  const [highlightPostId, setHighlightPostId] = useState<number | null>(null);
  const [highlightClusterId, setHighlightClusterId] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [pendingQuery, setPendingQuery] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    window.localStorage.setItem(PAGE_KEY, activePage);
  }, [activePage]);

  const navigate = useCallback((page: NavItem) => {
    setActivePage(page);
  }, []);

  const activeProject =
    state.projects.find((p) => p.id === state.activeProjectId) ?? state.projects[0] ?? null;

  const activeRun =
    state.researchRuns.find((r) => r.id === state.activeRunId) ?? null;

  const runsLimit = state.user?.plan === "pro" ? Infinity : 3;
  const runsUsed = state.user?.runsUsedThisMonth ?? 0;
  const runsRemaining =
    runsLimit === Infinity ? Infinity : Math.max(0, runsLimit - runsUsed);
  const canStartRun = runsRemaining > 0 || runsLimit === Infinity;

  const login = useCallback((email: string, _password: string) => {
    if (!email.trim()) return false;
    const name = email.split("@")[0].replace(/[._]/g, " ");
    setState((s) => ({
      ...s,
      user: {
        id: "user-1",
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email.trim(),
        plan: s.user?.plan ?? "free",
        runsUsedThisMonth: s.user?.runsUsedThisMonth ?? 0,
      },
      onboarded: true,
    }));
    return true;
  }, []);

  const signup = useCallback((name: string, email: string, _password: string) => {
    if (!name.trim() || !email.trim()) return false;
    setState((s) => ({
      ...s,
      user: {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        plan: "free",
        runsUsedThisMonth: 0,
      },
      onboarded: false,
    }));
    return true;
  }, []);

  const logout = useCallback(() => {
    setState({
      user: null,
      onboarded: false,
      projects: defaultProjects(),
      activeProjectId: "proj-default",
      researchRuns: [],
      activeRunId: null,
    });
    setAuthView("login");
    setActivePage("overview");
  }, []);

  const completeOnboarding = useCallback((projectName: string, niche: string) => {
    const id = `proj-${Date.now()}`;
    setState((s) => ({
      ...s,
      onboarded: true,
      projects: [{ id, name: projectName, niche, createdAt: new Date().toISOString() }],
      activeProjectId: id,
    }));
  }, []);

  const createProject = useCallback((name: string, niche: string) => {
    const id = `proj-${Date.now()}`;
    setState((s) => ({
      ...s,
      projects: [...s.projects, { id, name, niche, createdAt: new Date().toISOString() }],
      activeProjectId: id,
    }));
  }, []);

  const setActiveProjectId = useCallback((id: string) => {
    setState((s) => ({ ...s, activeProjectId: id }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setState((s) => {
      const remaining = s.projects.filter((p) => p.id !== id);
      const remainingRuns = s.researchRuns.filter((r) => r.projectId !== id);
      const activeRunDeleted = s.researchRuns.some(
        (r) => r.id === s.activeRunId && r.projectId === id
      );

      return {
        ...s,
        projects: remaining,
        activeProjectId:
          s.activeProjectId === id ? (remaining[0]?.id ?? null) : s.activeProjectId,
        researchRuns: remainingRuns,
        activeRunId: activeRunDeleted ? null : s.activeRunId,
      };
    });
  }, []);

  const simulateRun = useCallback(
    (runId: string) => {
      let step = 0;
      const tick = () => {
        step += 1;
        const progress = Math.min(100, Math.round((step / RUN_STAGES.length) * 100));
        const isDone = step >= RUN_STAGES.length;

        setState((s) => ({
          ...s,
          researchRuns: s.researchRuns.map((r) =>
            r.id === runId
              ? {
                  ...r,
                  status: isDone ? "complete" : "processing",
                  progress,
                  stage: isDone ? "Complete" : RUN_STAGES[step - 1],
                  clusterCount: isDone ? painClusters.length : r.clusterCount,
                }
              : r
          ),
        }));

        if (!isDone) {
          setTimeout(tick, 900);
        } else {
          setActivePage("pain");
        }
      };

      setTimeout(() => {
        setState((s) => ({
          ...s,
          researchRuns: s.researchRuns.map((r) =>
            r.id === runId ? { ...r, status: "processing", progress: 5, stage: RUN_STAGES[0] } : r
          ),
        }));
        tick();
      }, 600);
    },
    []
  );

  const startResearchRun = useCallback(
    (query: string, sources = ["Reddit", "Hacker News"]) => {
      if (!state.user || !activeProject) return false;
      if (!canStartRun) {
        setShowUpgradeModal(true);
        return false;
      }

      const runId = `run-${Date.now()}`;
      const newRun: ResearchRun = {
        id: runId,
        projectId: activeProject.id,
        query: query || "General market scan",
        status: "queued",
        progress: 0,
        stage: "Queued",
        createdAt: new Date().toISOString(),
        clusterCount: 0,
        sources,
      };

      setState((s) => ({
        ...s,
        researchRuns: [newRun, ...s.researchRuns],
        activeRunId: runId,
        user: s.user
          ? {
              ...s.user,
              runsUsedThisMonth:
                s.user.plan === "pro" ? s.user.runsUsedThisMonth : s.user.runsUsedThisMonth + 1,
            }
          : null,
      }));

      simulateRun(runId);
      return true;
    },
    [state.user, activeProject, canStartRun, simulateRun]
  );

  const viewEvidence = useCallback((postId: number) => {
    setHighlightPostId(postId);
    setActivePage("feed");
  }, []);

  const viewCluster = useCallback((clusterId: string) => {
    setHighlightClusterId(clusterId);
    setActivePage("pain");
  }, []);

  const viewClusterFromIdea = useCallback((clusterId: string) => {
    setHighlightClusterId(clusterId);
    setActivePage("pain");
  }, []);

  const upgradeToPro = useCallback(() => {
    setState((s) => ({
      ...s,
      user: s.user ? { ...s.user, plan: "pro" } : null,
    }));
    setShowUpgradeModal(false);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      user: state.user,
      onboarded: state.onboarded,
      authView,
      setAuthView,
      login,
      signup,
      logout,
      completeOnboarding,
      projects: state.projects,
      activeProject,
      setActiveProjectId,
      createProject,
      deleteProject,
      researchRuns: state.researchRuns.filter(
        (r) => !activeProject || r.projectId === activeProject.id
      ),
      activeRun,
      runsRemaining,
      canStartRun,
      startResearchRun,
      activePage,
      navigate,
      highlightPostId,
      highlightClusterId,
      viewEvidence,
      viewCluster,
      viewClusterFromIdea,
      upgradeToPro,
      showUpgradeModal,
      setShowUpgradeModal,
      pendingQuery,
      setPendingQuery,
    }),
    [
      state,
      authView,
      login,
      signup,
      logout,
      completeOnboarding,
      activeProject,
      setActiveProjectId,
      createProject,
      deleteProject,
      activeRun,
      runsRemaining,
      canStartRun,
      startResearchRun,
      activePage,
      navigate,
      highlightPostId,
      highlightClusterId,
      viewEvidence,
      viewCluster,
      viewClusterFromIdea,
      upgradeToPro,
      showUpgradeModal,
      pendingQuery,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
