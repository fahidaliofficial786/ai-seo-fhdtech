export type CheckStatus = "pass" | "warn" | "fail" | "info";

export interface AuditCheck {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
  why?: string;
  fix?: string;
  impact?: "critical" | "high" | "medium" | "low";
}

export interface AuditCategory {
  id: string;
  name: string;
  score: number; // 0-100
  weight: number;
  checks: AuditCheck[];
}

export interface DetectedPlatform {
  name: string;
  confidence: "high" | "medium" | "low";
  signal: string;
}

export interface PageSpeedStrategyResult {
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    fcp: { value: string; score: number };
    lcp: { value: string; score: number };
    cls: { value: string; score: number };
    tbt: { value: string; score: number };
    speedIndex: { value: string; score: number };
    interactive: { value: string; score: number };
  };
}

export interface AuditResult {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  ok: boolean;
  error?: string;
  httpStatus: number;
  responseMs: number;
  overallScore: number;
  grade: string;
  platforms: DetectedPlatform[];
  aiCrawlers: { name: string; allowed: boolean }[];
  meta: {
    title?: string;
    description?: string;
    h1Count: number;
    wordCount: number;
    imgCount: number;
    imgMissingAlt: number;
    internalLinks: number;
    externalLinks: number;
    schemaTypes: string[];
    ogTags: number;
    twitterTags: number;
    https: boolean;
    hasRobots: boolean;
    hasSitemap: boolean;
    hasLlmsTxt: boolean;
  };
  categories: AuditCategory[];
  summary: {
    critical: number;
    warnings: number;
    passed: number;
    total: number;
  };
  estimates: {
    trafficUplift: string;
    aiVisibilityUplift: string;
    fixTime: string;
  };
  headings?: { tag: string; text: string }[];
  images?: { src: string; alt: string; hasAlt: boolean }[];
  extractedLinks?: { href: string; text: string; isExternal: boolean }[];
  keywordAnalysis?: {
    keyword: string;
    density: number;
    count: number;
    inTitle: boolean;
    inDescription: boolean;
    inH1: boolean;
  };
  pageSpeed?: {
    mobile: PageSpeedStrategyResult;
    desktop: PageSpeedStrategyResult;
  };
}
