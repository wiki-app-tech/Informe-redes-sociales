export type PlatformType = 'all' | 'facebook' | 'instagram' | 'website' | 'twitter' | 'youtube' | 'beacons' | 'whatsapp';

export type CityFilter = 'todas' | 'ushuaia' | 'rio_grande' | 'tolhuin';

export type CategoryType = 'prevencion_vial' | 'institucional' | 'cadetes_capacitacion' | 'busqueda_rescate' | 'alertas_seguridad' | 'comunidad_tramites';

export type TabId =
  // ── Core ──
  | 'overview' | 'feed' | 'directory'
  // ── Enterprise Modules ──
  | 'instagram-analyzer' | 'realtime-ga4' | 'multiplatform-analytics' | 'report-wizard' | 'time-optimizer' | 'hashtag-tracker' | 'instagram-link-manager'
  // ── Reporting ──
  | 'informe-institucional' | 'dashboard-plataforma' | 'ranking-posts' | 'monitor-hashtags'
  // ── Planificacion ──
  | 'planificador' | 'aprobacion' | 'asistente-ia' | 'alertas-reels'
  // ── Analitica ──
  | 'analytics' | 'comparativa' | 'best-times' | 'integraciones'
  // ── Legacy ──
  | 'beacons' | 'recommendations';

// ── INSTAGRAM PROFILE ANALYZER TYPES ──
export interface InstagramAudienceBreakdown {
  realPeople: { pct: number; count: number; description: string };
  influencers: { pct: number; count: number; description: string };
  massFollowers: { pct: number; count: number; description: string };
  suspiciousBots: { pct: number; count: number; description: string };
}

export interface InstagramDemographics {
  gender: { female: number; male: number };
  ageBrackets: { range: string; pct: number }[];
  cities: { city: string; province: string; pct: number; count: number }[];
  countries: { country: string; flag: string; pct: number }[];
  languages: { lang: string; pct: number }[];
}

export interface InstagramSentimentData {
  overall: { positive: number; neutral: number; negative: number };
  sentimentScore: number; // 0 - 100
  topics: { topic: string; positive: number; neutral: number; negative: number; count: number; emoji: string }[];
  keywords: { word: string; count: number; sentiment: 'positive' | 'neutral' | 'negative'; weight: number }[];
  sampleComments: { id: string; user: string; text: string; sentiment: 'positive' | 'neutral' | 'negative'; date: string; postTitle: string; likes: number }[];
}

export interface InstagramGrowthData {
  currentFollowers: number;
  monthlyGrowthRate: number;
  netMonthlyGain: number;
  avgWeeklyGained: number;
  avgWeeklyLost: number;
  timeline: { month: string; followers: number; netGain: number; reach: number }[];
  milestones: { target: string; targetFollowers: number; estimatedDays: number; projectedDate: string }[];
}

export interface InstagramFormatMetric {
  format: string;
  label: string;
  er: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  avgSaves: number;
  avgReach: number;
  multiplier: string;
  icon: string;
  color: string;
}

export interface InstagramTopPost {
  id: string;
  title: string;
  format: 'Reel' | 'Carrusel' | 'Foto';
  date: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  viewsOrReach: number;
  er: number;
  sentiment: { pos: number; neu: number; neg: number };
  tags: string[];
  url: string;
}

export interface InstagramProfileAuditData {
  handle: string;
  displayName: string;
  url: string;
  verified: boolean;
  avatarUrl: string;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  ratio: number;
  qualityScore: number;
  qualityGrade: string;
  engagementRate: number;
  benchmarkEr: number;
  audience: InstagramAudienceBreakdown;
  demographics: InstagramDemographics;
  sentiment: InstagramSentimentData;
  growth: InstagramGrowthData;
  formats: InstagramFormatMetric[];
  topPosts: InstagramTopPost[];
  recommendations: { title: string; desc: string; impact: string; priority: 'Alta' | 'Media' }[];
}

// ── OCI ROLES ──
export type OciRole = {
  id: string;
  name: string;
  rank: string;
  city: string;
  phone?: string;
  email?: string;
  department: string;
};

// ── COMPETITORS ──
export type Competitor = {
  id: string;
  name: string;
  shortName: string;
  url: string;
  province: string;
  flag: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  followers: { facebook: number; instagram: number; twitter: number; youtube: number };
  monthlyPosts: number;
  engagementRate: number;
  monthlyReach: number;
  responseTime: string;
  contentTypes: string[];
  accentColor: string;
};

// ── HASHTAG DATA ──
export type HashtagPost = {
  id: string;
  platform: 'facebook' | 'instagram' | 'twitter';
  date: string;
  content: string;
  likes: number;
  shares: number;
  reach: number;
  category: string;
};

// ── APPROVAL WORKFLOW ──
export type ApprovalStatus = 'borrador' | 'revision' | 'aprobado' | 'publicado' | 'rechazado';

export type ApprovalItem = {
  id: string;
  title: string;
  platform: string;
  category: string;
  author: string;
  createdAt: string;
  scheduledAt: string;
  status: ApprovalStatus;
  content: string;
  mediaType: 'imagen' | 'reel' | 'historia' | 'carrusel' | 'texto';
  reviewer?: string;
  notes?: string;
};

// ── PLANNER ITEM ──
export type PlannerItem = {
  id: string;
  day: number; // 0=Mon, 6=Sun
  hour: number;
  platform: string;
  content: string;
  format: 'Reel' | 'Historia' | 'Post' | 'Carrusel' | 'Video';
  status: 'programado' | 'borrador' | 'publicado';
  category: string;
  color: string;
};

// ── BEST TIMES TYPES ──
export type BestTimesPlatformId = 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'youtube' | 'linkedin';

export type HeatCell = {
  hour: number;   // 0-23
  value: number;  // 0-100 (activity percentage)
};

export type DaySchedule = {
  day: string;
  cells: HeatCell[];
  peakHours: number[];
};

export type BestTimesPlatform = {
  id: BestTimesPlatformId;
  name: string;
  handle: string;
  bestHour: string;
  bestDays: string[];
  colorScheme: 'pink' | 'blue' | 'gray' | 'purple' | 'red' | 'teal';
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  schedule: DaySchedule[];
  topSlots: { day: string; hours: string[]; }[];
  insight: string;
  source: string;
};

export type SocialAccount = {
  id: string;
  name: string;
  platform: PlatformType;
  handle: string;
  url: string;
  followers: number;
  growthRate: number;
  engagementRate: number;
  monthlyPosts: number;
  monthlyReach: number;
  verified: boolean;
  avatarUrl: string;
};

export type MetricCard = {
  id: string;
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  period: string;
  description: string;
  icon: string;
};

export type SocialPost = {
  id: string;
  platform: 'facebook' | 'instagram' | 'website';
  author: string;
  authorHandle: string;
  date: string;
  timeAgo: string;
  category: CategoryType;
  categoryLabel: string;
  city: CityFilter;
  cityLabel: string;
  content: string;
  mediaType: 'image' | 'gallery' | 'video' | 'alert';
  mediaUrl?: string;
  likes: number;
  shares: number;
  comments: number;
  reach: number;
  sentiment: 'positivo' | 'neutral' | 'alerta';
  url: string;
  isFeatured?: boolean;
};

export type LocationDistribution = {
  city: string;
  percentage: number;
  followersCount: number;
  color: string;
};

export type MonthlyTrend = {
  month: string;
  facebookReach: number;
  instagramReach: number;
  engagement: number;
  posts: number;
};

export type CategoryBreakdown = {
  category: CategoryType;
  label: string;
  postCount: number;
  avgEngagement: number;
  percentage: number;
  color: string;
};

export type StationContact = {
  id: string;
  city: 'Ushuaia' | 'Río Grande' | 'Tolhuin' | 'ushuaia' | 'rio_grande' | 'tolhuin';
  cityLabel?: string;
  name: string;
  address: string;
  phone: string;
  jurisdiction?: string;
  lat?: number;
  lng?: number;
  whatsapp?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  isEmergency101?: boolean;
};

export type StrategicRecommendation = {
  id: string;
  title: string;
  description: string;
  priority: 'Alta' | 'Media' | 'Sugerencia';
  impact: string;
  targetPlatform: string;
};

// ── BEACONS.AI TYPES ──
export type BeaconsLinkCategory = 'social' | 'website' | 'tramites' | 'contact' | 'emergency';

export type BeaconsLink = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: BeaconsLinkCategory;
  clicks: number;
  clickRate: number;
  isActive: boolean;
  platform: PlatformType | 'whatsapp';
  emoji: string;
};

export type BeaconsProfile = {
  handle: string;
  displayName: string;
  bio: string;
  url: string;
  totalClicks: number;
  monthlyClicks: number;
  clickGrowth: number;
  topLinkClicks: number;
  uniqueVisitors: number;
  avgTimeOnPage: string;
  theme: string;
  verifiedAt: string;
};
