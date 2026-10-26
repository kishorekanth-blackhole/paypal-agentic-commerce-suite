export interface SolutionTrack {
  id: string;
  name: string;
  tier: string;
  description: string;
  keyRequirements: string[];
  recommendedArchitecture: string;
}

// Aliased for backwards compatibility
export type HackathonTrack = SolutionTrack;

export interface AgentPolicy {
  spendingCap: number;
  autoApproveThreshold: number;
  allowedCategories: string[];
  requireBiometricOverThreshold: boolean;
}

export interface MerchantOffer {
  merchantId: string;
  merchantName: string;
  price: number;
  currency: string;
  stock: number;
  channel3TrustScore: number;
  deliveryEstimate: string;
  isOptimalPrice: boolean;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  stock: number;
  vendor: string;
  description: string;
  channel3Sku?: string;
  merchantOffers?: MerchantOffer[];
}

export interface AgentExecutionStep {
  step: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'pending_approval';
  timestamp: string;
  details: string;
}

export interface SimulationResult {
  success: boolean;
  status: 'COMPLETED' | 'PENDING_USER_APPROVAL' | 'REJECTED_BY_POLICY';
  orderId: string | null;
  captureId?: string;
  steps: AgentExecutionStep[];
  requiresApproval?: boolean;
  reason?: string;
  item: {
    name: string;
    price: number;
    currency: string;
  };
  sandboxLogs: {
    request: Record<string, any>;
    response: Record<string, any>;
    webhookEvent?: Record<string, any>;
  };
}

export interface TechnologyFeature {
  name: string;
  provider: string;
  category: string;
  primaryFeature: string;
  howWeUsedIt: string[];
  architectureImpact: string;
  codeSnippetRef: string;
  status: 'Verified Active' | 'Integrated' | 'Production Ready';
}

export interface SoftwareIntegration {
  name: string;
  category: string;
  role: string;
  implementation: string;
  featureCapability: string;
  status: 'Verified Active' | 'Integrated' | 'Production Ready';
}

export interface ProjectBlueprint {
  projectName: string;
  tagline: string;
  solutionDomain: string;
  valueProposition: string;
  executiveSummary: string;
  architecture: {
    agenticLoop: string;
    payPalComponents: string[];
    aiComponents: string[];
    securityGuardrails: string[];
  };
  keyFeatures: {
    title: string;
    description: string;
    payPalHook: string;
  }[];
  devpostSubmission: {
    elevatorPitch: string;
    inspiration: string;
    howWeBuiltIt: string;
    challengesFaced: string;
    accomplishments: string;
    whatsNext: string;
  };
  softwareEcosystem: SoftwareIntegration[];
}

export interface RubricEvaluation {
  totalScore: number;
  scores: {
    technicalExecution: number;
    innovation: number;
    impact: number;
    userExperience: number;
    presentation: number;
  };
  verdict: string;
  strengths: string[];
  weaknesses: string[];
  actionableTips: string[];
  recommendedCategories: string[];
}

// Bryntum Timeline & Task Dependency Models
export interface BryntumTask {
  id: string;
  name: string;
  phase: 'discovery' | 'policy' | 'authorization' | 'settlement' | 'fulfillment' | 'audit';
  software: 'Channel3' | 'Gemini' | 'PayPal' | 'Biometric' | 'AG Grid' | 'Bryntum' | 'Render';
  startMs: number;
  durationMs: number;
  progress: number;
  status: 'completed' | 'in_progress' | 'pending' | 'critical';
  dependencies: string[];
  owner: string;
  slaLimitMs: number;
  meta?: Record<string, any>;
}
