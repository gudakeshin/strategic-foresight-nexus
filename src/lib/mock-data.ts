
// Mock data service for our Strategic Foresight Dashboard

// ─── Types ────────────────────────────────────────────────────────────────────

export type TrendDirection = "up" | "down" | "neutral";

export interface IndustryOutlook {
  industry: string;
  score: number;
  previousScore: number;
  trendDirection: TrendDirection;
  signals: number;
  riskLevel: "low" | "medium" | "high";
  leadingIndicator: string;
  shortTermForecast: string;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  trendDirection: TrendDirection;
  categories: string[];
  unit: string;
  data: { date: string; value: number }[];
}

export interface Signal {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  category: string;
  impact: "low" | "medium" | "high";
  industries: string[];
  signal_strength: number;
  related_indicators: string[];
}

export interface ForecastScenario {
  id: string;
  name: string;
  description: string;
  probability: number;
  impact: "positive" | "negative" | "neutral";
  indicators: {
    indicator_id: string;
    forecast_values: { date: string; value: number }[];
  }[];
}

/** User-created strategic scenario shown in the Scenario Explorer. */
export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  probability: number;
  /** Maps this scenario to one of the three forecast scenarios for chart display. */
  forecastScenarioId: "baseline" | "optimistic" | "pessimistic";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Deterministic mulberry32 PRNG — stable output across page refreshes. */
export function makePrng(seed: number) {
  let s = seed;
  return () => {
    s |= 0; s = s + 0x6d2b79f5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function generateTimeSeriesData(
  months: number,
  minValue: number,
  maxValue: number,
  volatility: number,
  seed = 42
): { date: string; value: number }[] {
  const rand = makePrng(seed);
  const data: { date: string; value: number }[] = [];
  let currentValue = minValue + rand() * (maxValue - minValue);
  const today = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    const change = (rand() - 0.5) * volatility;
    currentValue = Math.max(minValue, Math.min(maxValue, currentValue + change));
    data.push({ date: date.toISOString().slice(0, 10), value: parseFloat(currentValue.toFixed(2)) });
  }
  return data;
}

export function generateForecastData(
  months: number,
  startValue: number,
  targetValue: number,
  volatility: number,
  seed = 99
): { date: string; value: number }[] {
  const rand = makePrng(seed);
  const data: { date: string; value: number }[] = [];
  let currentValue = startValue;
  const today = new Date();
  const step = (targetValue - startValue) / months;

  for (let i = 0; i < months; i++) {
    const date = new Date(today);
    date.setMonth(today.getMonth() + i + 1);
    const change = step + (rand() - 0.5) * volatility;
    currentValue += change;
    data.push({ date: date.toISOString().slice(0, 10), value: parseFloat(currentValue.toFixed(2)) });
  }
  return data;
}

function isoDateDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function isoDateDaysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

// ─── Industry outlook data ────────────────────────────────────────────────────

export const industryOutlooks: IndustryOutlook[] = [
  {
    industry: "Technology",
    score: 78,
    previousScore: 72,
    trendDirection: "up",
    signals: 12,
    riskLevel: "low",
    leadingIndicator: "Semiconductor Sales",
    shortTermForecast: "Continued growth expected in cloud services and AI adoption",
  },
  {
    industry: "Healthcare",
    score: 65,
    previousScore: 68,
    trendDirection: "down",
    signals: 8,
    riskLevel: "medium",
    leadingIndicator: "Healthcare Spending",
    shortTermForecast: "Regulatory changes may impact profit margins",
  },
  {
    industry: "Finance",
    score: 72,
    previousScore: 70,
    trendDirection: "up",
    signals: 10,
    riskLevel: "medium",
    leadingIndicator: "Interest Rates",
    shortTermForecast: "Digital banking driving growth despite interest rate pressures",
  },
  {
    industry: "Manufacturing",
    score: 58,
    previousScore: 64,
    trendDirection: "down",
    signals: 15,
    riskLevel: "high",
    leadingIndicator: "PMI",
    shortTermForecast: "Supply chain disruptions continue to impact production",
  },
  {
    industry: "Energy",
    score: 70,
    previousScore: 65,
    trendDirection: "up",
    signals: 9,
    riskLevel: "medium",
    leadingIndicator: "Oil Prices",
    shortTermForecast: "Renewable energy investments accelerating transition",
  },
  {
    industry: "Retail",
    score: 62,
    previousScore: 60,
    trendDirection: "up",
    signals: 11,
    riskLevel: "medium",
    leadingIndicator: "Consumer Confidence",
    shortTermForecast: "E-commerce growth offsetting physical retail challenges",
  },
];

// ─── Economic indicators ──────────────────────────────────────────────────────

export const economicIndicators: EconomicIndicator[] = [
  { id: "gdp_growth", name: "GDP Growth Rate", value: 3.2, previousValue: 2.8, trendDirection: "up", categories: ["macroeconomic", "primary"], unit: "%", data: generateTimeSeriesData(12, 2.5, 3.5, 0.3, 101) },
  { id: "inflation", name: "Inflation Rate", value: 2.9, previousValue: 3.2, trendDirection: "down", categories: ["macroeconomic", "primary"], unit: "%", data: generateTimeSeriesData(12, 2.5, 3.5, 0.2, 102) },
  { id: "unemployment", name: "Unemployment Rate", value: 4.1, previousValue: 4.3, trendDirection: "down", categories: ["labor", "primary"], unit: "%", data: generateTimeSeriesData(12, 3.8, 4.5, 0.2, 103) },
  { id: "consumer_confidence", name: "Consumer Confidence Index", value: 105.4, previousValue: 101.8, trendDirection: "up", categories: ["sentiment", "primary"], unit: "points", data: generateTimeSeriesData(12, 95, 110, 3, 104) },
  { id: "interest_rate", name: "Interest Rate", value: 4.75, previousValue: 5.0, trendDirection: "down", categories: ["financial", "primary"], unit: "%", data: generateTimeSeriesData(12, 4.5, 5.5, 0.25, 105) },
  { id: "housing_starts", name: "Housing Starts", value: 1460, previousValue: 1420, trendDirection: "up", categories: ["housing", "secondary"], unit: "thousands", data: generateTimeSeriesData(12, 1350, 1500, 50, 106) },
  { id: "manufacturing_pmi", name: "Manufacturing PMI", value: 52.8, previousValue: 51.5, trendDirection: "up", categories: ["manufacturing", "secondary"], unit: "points", data: generateTimeSeriesData(12, 48, 54, 1.5, 107) },
  { id: "retail_sales", name: "Retail Sales Growth", value: 3.1, previousValue: 2.9, trendDirection: "up", categories: ["consumer", "secondary"], unit: "%", data: generateTimeSeriesData(12, 2, 4, 0.5, 108) },
];

// ─── Recent signals ───────────────────────────────────────────────────────────

export const recentSignals: Signal[] = [
  {
    id: "sig_001",
    title: "Semiconductor Shortage Easing",
    description: "Global semiconductor supplies showing signs of improvement as production capacity increases",
    source: "Industry Report",
    date: isoDateDaysAgo(1),
    category: "Supply Chain",
    impact: "medium",
    industries: ["Technology", "Manufacturing", "Automotive"],
    signal_strength: 75,
    related_indicators: ["manufacturing_pmi", "tech_stock_index"],
  },
  {
    id: "sig_002",
    title: "Central Bank Signals Rate Cut",
    description: "Federal Reserve hints at potential interest rate cuts in upcoming meeting",
    source: "Federal Reserve",
    date: isoDateDaysAgo(2),
    category: "Monetary Policy",
    impact: "high",
    industries: ["Finance", "Real Estate", "Retail"],
    signal_strength: 85,
    related_indicators: ["interest_rate", "bond_yields"],
  },
  {
    id: "sig_003",
    title: "Renewable Energy Investment Surge",
    description: "Major increase in capital flows to renewable energy projects following new climate policy",
    source: "Energy Investment Monitor",
    date: isoDateDaysAgo(4),
    category: "Energy Transition",
    impact: "medium",
    industries: ["Energy", "Utilities", "Manufacturing"],
    signal_strength: 70,
    related_indicators: ["renewable_investment", "energy_futures"],
  },
  {
    id: "sig_004",
    title: "AI Regulation Framework Proposed",
    description: "New regulatory framework for artificial intelligence applications announced",
    source: "Government Press Release",
    date: isoDateDaysAgo(5),
    category: "Regulation",
    impact: "high",
    industries: ["Technology", "Healthcare", "Finance"],
    signal_strength: 80,
    related_indicators: ["tech_regulation_index", "ai_adoption_rate"],
  },
  {
    id: "sig_005",
    title: "Supply Chain Diversification Accelerating",
    description: "Companies rapidly shifting to diversified supply chains to improve resilience",
    source: "Supply Chain Quarterly",
    date: isoDateDaysAgo(7),
    category: "Global Trade",
    impact: "medium",
    industries: ["Manufacturing", "Retail", "Technology"],
    signal_strength: 65,
    related_indicators: ["global_trade_volume", "shipping_costs"],
  },
];

// ─── Forecast scenarios ───────────────────────────────────────────────────────

export const forecastScenarios: ForecastScenario[] = [
  {
    id: "baseline",
    name: "Baseline Scenario",
    description: "Current trajectory with moderate growth and managed inflation",
    probability: 60,
    impact: "neutral",
    indicators: [
      { indicator_id: "gdp_growth", forecast_values: generateForecastData(8, 3.2, 3.5, 0.2, 201) },
      { indicator_id: "inflation", forecast_values: generateForecastData(8, 2.9, 2.7, 0.2, 202) },
      { indicator_id: "unemployment", forecast_values: generateForecastData(8, 4.1, 4.0, 0.1, 203) },
    ],
  },
  {
    id: "optimistic",
    name: "Optimistic Scenario",
    description: "Accelerated growth driven by technology innovation and policy support",
    probability: 25,
    impact: "positive",
    indicators: [
      { indicator_id: "gdp_growth", forecast_values: generateForecastData(8, 3.2, 4.2, 0.3, 211) },
      { indicator_id: "inflation", forecast_values: generateForecastData(8, 2.9, 2.4, 0.2, 212) },
      { indicator_id: "unemployment", forecast_values: generateForecastData(8, 4.1, 3.6, 0.2, 213) },
    ],
  },
  {
    id: "pessimistic",
    name: "Pessimistic Scenario",
    description: "Economic contraction due to global instability and inflation pressures",
    probability: 15,
    impact: "negative",
    indicators: [
      { indicator_id: "gdp_growth", forecast_values: generateForecastData(8, 3.2, 1.8, 0.4, 221) },
      { indicator_id: "inflation", forecast_values: generateForecastData(8, 2.9, 4.1, 0.3, 222) },
      { indicator_id: "unemployment", forecast_values: generateForecastData(8, 4.1, 5.2, 0.3, 223) },
    ],
  },
];

// ─── Strategic scenarios (Scenario Explorer) ──────────────────────────────────

export const scenariosData: Scenario[] = [
  {
    id: "1",
    title: "Global Economic Slowdown",
    description: "Analysis of potential market impacts from global economic slowdown across key regions",
    category: "Economic",
    createdAt: isoDateDaysAgo(47),
    updatedAt: isoDateDaysAgo(21),
    probability: 65,
    forecastScenarioId: "pessimistic",
  },
  {
    id: "2",
    title: "Supply Chain Disruption",
    description: "Evaluation of supply chain resilience under various disruption scenarios",
    category: "Operations",
    createdAt: isoDateDaysAgo(65),
    updatedAt: isoDateDaysAgo(29),
    probability: 48,
    forecastScenarioId: "pessimistic",
  },
  {
    id: "3",
    title: "Regulatory Changes Impact",
    description: "Assessment of upcoming regulatory changes and their potential business impact",
    category: "Regulatory",
    createdAt: isoDateDaysAgo(39),
    updatedAt: isoDateDaysAgo(24),
    probability: 82,
    forecastScenarioId: "baseline",
  },
  {
    id: "4",
    title: "Technological Disruption",
    description: "Analysis of emerging technologies and their disruptive potential on industry",
    category: "Technology",
    createdAt: isoDateDaysAgo(51),
    updatedAt: isoDateDaysAgo(34),
    probability: 70,
    forecastScenarioId: "optimistic",
  },
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getIndicatorById(id: string): EconomicIndicator | undefined {
  return economicIndicators.find(indicator => indicator.id === id);
}

export function getScenarioById(id: string): ForecastScenario | undefined {
  return forecastScenarios.find(scenario => scenario.id === id);
}
