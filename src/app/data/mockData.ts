export interface SourcePost {
  id: number;
  platform: string;
  sub: string;
  user: string;
  time: string;
  title: string;
  body: string;
  tags: string[];
  score: number;
  upvotes: number;
  comments: number;
  color: string;
  letter: string;
  url: string;
  company?: string;
  domain?: string;
}

export interface PainCluster {
  id: string;
  name: string;
  urgency: "High" | "Medium" | "Low";
  freq: string;
  wtp: string;
  score: number;
  trend: number[];
  validatedPain: string;
  quotes: string[];
  sourcePostIds: number[];
}

export interface StartupIdea {
  id: string;
  name: string;
  desc: string;
  fit: number;
  effort: "Low" | "Med" | "High";
  signal: "High" | "Med" | "Low";
  market: string;
  cluster: string;
  clusterId: string;
  sourcePostIds: number[];
  mvpGuidance: string;
  mvpFeatures: string[];
}

export const sourcePosts: SourcePost[] = [
  {
    id: 1,
    platform: "Reddit",
    sub: "r/startups",
    user: "u/Priya_E",
    time: "2m ago",
    title: "FactKit monitoring in production?",
    body: "Has anyone tried FactKit beyond dev environment? Looking at costs for 12-person teams. Current solution misses critical edge cases in prod.",
    tags: ["Tooling", "B2B"],
    score: 87,
    upvotes: 156,
    comments: 34,
    color: "#ff4500",
    letter: "R",
    url: "https://reddit.com/r/startups/comments/example1",
    company: "FactKit",
    domain: "factkit.com",
  },
  {
    id: 2,
    platform: "Hacker News",
    sub: "Ask HN",
    user: "throwaway2847",
    time: "6m ago",
    title: "Need better async exception tracking",
    body: "We're missing ~40% of edge case exceptions in production. Our current logging setup is completely inadequate. What are devs actually using?",
    tags: ["DevOps", "Infrastructure"],
    score: 74,
    upvotes: 203,
    comments: 61,
    color: "#ff6600",
    letter: "HN",
    url: "https://news.ycombinator.com/item?id=example2",
    company: "Sentry",
    domain: "sentry.io",
  },
  {
    id: 3,
    platform: "Hacker News",
    sub: "Show HN",
    user: "@v_s",
    time: "11m ago",
    title: "OpenTelemetry setup is painful",
    body: "Spent 8 hours configuring spans and I'm still missing traces. This is supposed to be the standard? Someone please build a better DX for this.",
    tags: ["Observability", "Tooling"],
    score: 68,
    upvotes: 94,
    comments: 18,
    color: "#ff6600",
    letter: "HN",
    url: "https://news.ycombinator.com/item?id=example3",
    company: "Honeycomb",
    domain: "honeycomb.io",
  },
  {
    id: 4,
    platform: "Reddit",
    sub: "r/startups",
    user: "buildfast99",
    time: "18m ago",
    title: "Where do I find early users?",
    body: "Launched 3 weeks ago, 12 signups total — all friends. My product solves a real problem but I genuinely don't know where to find people who'd care.",
    tags: ["Growth", "Distribution"],
    score: 61,
    upvotes: 47,
    comments: 23,
    color: "#ff4500",
    letter: "R",
    url: "https://reddit.com/r/startups/comments/example4",
    company: "Superhuman",
    domain: "superhuman.com",
  },
  {
    id: 5,
    platform: "Reddit",
    sub: "r/SaaS",
    user: "clara_m",
    time: "25m ago",
    title: "Most analytics tools are too bloated",
    body: "I just need a heatmap and a funnel. I don't need 400 features I'll never use. Why is every tool trying to be everything?",
    tags: ["Analytics", "UX"],
    score: 55,
    upvotes: 38,
    comments: 12,
    color: "#ff4500",
    letter: "R",
    url: "https://reddit.com/r/SaaS/comments/example5",
    company: "Amplitude",
    domain: "amplitude.com",
  },
  {
    id: 6,
    platform: "Reddit",
    sub: "r/SaaS",
    user: "u/dev_anon",
    time: "31m ago",
    title: "Chargeback rate jumped 8%",
    body: "Chargeback rate jumped 8% this month. No obvious reason. Payment processor support is useless.",
    tags: ["Payments"],
    score: 49,
    upvotes: 29,
    comments: 15,
    color: "#ff4500",
    letter: "R",
    url: "https://reddit.com/r/SaaS/comments/example6",
    company: "Chargebee",
    domain: "chargebee.com",
  },
];

export const painClusters: PainCluster[] = [
  {
    id: "cluster-growth-users",
    name: "hard to find first users",
    urgency: "High",
    freq: "Very High",
    wtp: "Medium",
    score: 284,
    trend: [2, 5, 4, 8, 6, 10, 9],
    validatedPain: "Founders can't get anyone to test their product despite having a working MVP. Distribution feels like a black box.",
    quotes: [
      "I've built something useful but have no idea where to find the right people to show it to.",
      "Launched 3 weeks ago, 12 signups total — all friends. I genuinely don't know where to find people who'd care.",
    ],
    sourcePostIds: [4],
  },
  {
    id: "cluster-growth-landing",
    name: "landing page not converting",
    urgency: "High",
    freq: "High",
    wtp: "High",
    score: 176,
    trend: [3, 4, 6, 5, 8, 7, 9],
    validatedPain: "Founders have traffic but visitors don't convert. Messaging and proof are misaligned with buyer intent.",
    quotes: [
      "Getting clicks but zero signups. Something is wrong with my landing page copy.",
      "Visitors bounce in under 10 seconds — I can't tell if it's positioning or design.",
    ],
    sourcePostIds: [5],
  },
  {
    id: "cluster-devops-async",
    name: "async exception tracking gaps",
    urgency: "High",
    freq: "High",
    wtp: "High",
    score: 174,
    trend: [3, 4, 6, 5, 8, 7, 9],
    validatedPain: "Production async workloads lose exceptions that sync logging misses entirely.",
    quotes: [
      "We're missing ~40% of edge case exceptions in production.",
      "Our current logging setup is completely inadequate for async Node services.",
    ],
    sourcePostIds: [2],
  },
  {
    id: "cluster-devops-otel",
    name: "OpenTelemetry setup is painful",
    urgency: "Medium",
    freq: "High",
    wtp: "Medium",
    score: 129,
    trend: [2, 3, 5, 4, 6, 5, 7],
    validatedPain: "Teams spend days configuring OTel with poor defaults and still miss traces.",
    quotes: [
      "Spent 8 hours configuring spans and I'm still missing traces.",
      "Someone please build a better DX for OpenTelemetry.",
    ],
    sourcePostIds: [3],
  },
  {
    id: "cluster-payments",
    name: "credit infra not reliable",
    urgency: "High",
    freq: "Low",
    wtp: "High",
    score: 108,
    trend: [1, 2, 1, 3, 2, 4, 3],
    validatedPain: "SaaS teams see unexplained chargeback spikes with no actionable processor support.",
    quotes: [
      "Chargeback rate jumped 8% this month. No obvious reason.",
      "Payment processor support is useless when fraud patterns shift.",
    ],
    sourcePostIds: [6],
  },
];

export const startupIdeas: StartupIdea[] = [
  {
    id: "idea-distribution",
    name: "Founder Distribution OS",
    desc: "All-in-one distribution workspace for early-stage founders to find & reach users.",
    fit: 84,
    effort: "Med",
    signal: "High",
    market: "$890M",
    cluster: "Growth",
    clusterId: "cluster-growth-users",
    sourcePostIds: [4],
    mvpGuidance: "Start with a niche community matcher + outreach templates. Ship a single-channel wedge (Reddit or IH) before expanding.",
    mvpFeatures: ["Community fit scorer", "Outreach draft generator", "Weekly signal digest"],
  },
  {
    id: "idea-async-tracer",
    name: "Async Error Tracer",
    desc: "Lightweight exception capture for async JS/TS stacks with minimal config.",
    fit: 90,
    effort: "Low",
    signal: "High",
    market: "$2.4B",
    cluster: "DevOps",
    clusterId: "cluster-devops-async",
    sourcePostIds: [2],
    mvpGuidance: "Ship a 5-line SDK for Node async handlers first. Prove 95%+ capture rate vs existing tools on HN threads.",
    mvpFeatures: ["One-line SDK install", "Async stack reconstruction", "Slack alert on new error patterns"],
  },
  {
    id: "idea-otel-wrapper",
    name: "OpenTelemetry Wrapper",
    desc: "Plug-and-play OTel setup with sane defaults for Node, Python and Go.",
    fit: 76,
    effort: "Low",
    signal: "High",
    market: "$1.1B",
    cluster: "DevOps",
    clusterId: "cluster-devops-otel",
    sourcePostIds: [3],
    mvpGuidance: "Opinionated config generator + health check dashboard. Target teams stuck after 4+ hours of manual OTel setup.",
    mvpFeatures: ["Auto-instrumentation wizard", "Trace gap detector", "Export to Grafana/Datadog"],
  },
  {
    id: "idea-landing-validator",
    name: "Landing Page Validator",
    desc: "Real-time CRO scoring and suggestions based on visitor behavior data.",
    fit: 72,
    effort: "Med",
    signal: "Med",
    market: "$340M",
    cluster: "Growth",
    clusterId: "cluster-growth-landing",
    sourcePostIds: [5],
    mvpGuidance: "Chrome extension that scores copy clarity + social proof gaps before you spend on ads.",
    mvpFeatures: ["Copy clarity score", "Proof element checklist", "Competitor headline compare"],
  },
  {
    id: "idea-chargeback",
    name: "Chargeback Shield",
    desc: "ML-powered fraud detection layer between your payment processor and customers.",
    fit: 63,
    effort: "High",
    signal: "Med",
    market: "$2.1B",
    cluster: "Payments",
    clusterId: "cluster-payments",
    sourcePostIds: [6],
    mvpGuidance: "Start with Stripe webhook rules + anomaly alerts. Defer ML until you have 3 months of labeled disputes.",
    mvpFeatures: ["Dispute spike alerts", "Risk rule builder", "Processor-agnostic dashboard"],
  },
];

export function getPostsByIds(ids: number[]): SourcePost[] {
  return sourcePosts.filter((p) => ids.includes(p.id));
}

export function getClusterById(id: string): PainCluster | undefined {
  return painClusters.find((c) => c.id === id);
}

export function buildMarkdownReport(projectName: string, runQuery: string): string {
  const lines = [
    `# PainSignal Research Report`,
    ``,
    `**Project:** ${projectName}`,
    `**Query:** ${runQuery}`,
    `**Generated:** ${new Date().toLocaleDateString()}`,
    ``,
    `## Executive Summary`,
    `Analysis of ${sourcePosts.length} public conversations surfaced ${painClusters.length} ranked pain clusters and ${startupIdeas.length} startup opportunities.`,
    ``,
    `## Pain Clusters`,
    ...painClusters.map(
      (c, i) =>
        `${i + 1}. **${c.name}** — Score: ${c.score} | Urgency: ${c.urgency} | WTP: ${c.wtp}\n   ${c.validatedPain}`
    ),
    ``,
    `## Evidence Quotes`,
    ...painClusters.flatMap((c) =>
      c.quotes.map((q) => `- "${q}" _(${c.name})_`)
    ),
    ``,
    `## Startup Ideas`,
    ...startupIdeas.map(
      (idea) =>
        `### ${idea.name}\n${idea.desc}\n\n**MVP:** ${idea.mvpGuidance}\n\n**Build first:** ${idea.mvpFeatures.join(", ")}`
    ),
    ``,
    `---`,
    `_Exported from PainSignal_`,
  ];
  return lines.join("\n");
}
