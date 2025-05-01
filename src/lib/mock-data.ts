
// Mock data service for our Strategic Foresight Dashboard

// Types
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
  data: {
    date: string;
    value: number;
  }[];
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
    forecast_values: {
      date: string;
      value: number;
    }[];
  }[];
}

// Industry outlook data
export const industryOutlooks: IndustryOutlook[] = [
  {
    industry: "Technology",
    score: 78,
    previousScore: 72,
    trendDirection: "up",
    signals: 12,
    riskLevel: "low",
    leadingIndicator: "Semiconductor Sales",
    shortTermForecast: "Continued growth expected in cloud services and AI adoption"
  },
  {
    industry: "Healthcare",
    score: 65,
    previousScore: 68,
    trendDirection: "down",
    signals: 8,
    riskLevel: "medium",
    leadingIndicator: "Healthcare Spending",
    shortTermForecast: "Regulatory changes may impact profit margins"
  },
  {
    industry: "Finance",
    score: 72,
    previousScore: 70,
    trendDirection: "up",
    signals: 10,
    riskLevel: "medium",
    leadingIndicator: "Interest Rates",
    shortTermForecast: "Digital banking driving growth despite interest rate pressures"
  },
  {
    industry: "Manufacturing",
    score: 58,
    previousScore: 64,
    trendDirection: "down",
    signals: 15,
    riskLevel: "high",
    leadingIndicator: "PMI",
    shortTermForecast: "Supply chain disruptions continue to impact production"
  },
  {
    industry: "Energy",
    score: 70,
    previousScore: 65,
    trendDirection: "up",
    signals: 9,
    riskLevel: "medium",
    leadingIndicator: "Oil Prices",
    shortTermForecast: "Renewable energy investments accelerating transition"
  },
  {
    industry: "Retail",
    score: 62,
    previousScore: 60,
    trendDirection: "up",
    signals: 11,
    riskLevel: "medium",
    leadingIndicator: "Consumer Confidence",
    shortTermForecast: "E-commerce growth offsetting physical retail challenges"
  }
];

// Economic indicators data
export const economicIndicators: EconomicIndicator[] = [
  {
    id: "gdp_growth",
    name: "GDP Growth Rate",
    value: 3.2,
    previousValue: 2.8,
    trendDirection: "up",
    categories: ["macroeconomic", "primary"],
    unit: "%",
    data: generateTimeSeriesData(12, 2.5, 3.5, 0.3)
  },
  {
    id: "inflation",
    name: "Inflation Rate",
    value: 2.9,
    previousValue: 3.2,
    trendDirection: "down",
    categories: ["macroeconomic", "primary"],
    unit: "%",
    data: generateTimeSeriesData(12, 2.5, 3.5, 0.2)
  },
  {
    id: "unemployment",
    name: "Unemployment Rate",
    value: 4.1,
    previousValue: 4.3,
    trendDirection: "down",
    categories: ["labor", "primary"],
    unit: "%",
    data: generateTimeSeriesData(12, 3.8, 4.5, 0.2)
  },
  {
    id: "consumer_confidence",
    name: "Consumer Confidence Index",
    value: 105.4,
    previousValue: 101.8,
    trendDirection: "up",
    categories: ["sentiment", "primary"],
    unit: "points",
    data: generateTimeSeriesData(12, 95, 110, 3)
  },
  {
    id: "interest_rate",
    name: "Interest Rate",
    value: 4.75,
    previousValue: 5.0,
    trendDirection: "down",
    categories: ["financial", "primary"],
    unit: "%",
    data: generateTimeSeriesData(12, 4.5, 5.5, 0.25)
  },
  {
    id: "housing_starts",
    name: "Housing Starts",
    value: 1460,
    previousValue: 1420,
    trendDirection: "up",
    categories: ["housing", "secondary"],
    unit: "thousands",
    data: generateTimeSeriesData(12, 1350, 1500, 50)
  },
  {
    id: "manufacturing_pmi",
    name: "Manufacturing PMI",
    value: 52.8,
    previousValue: 51.5,
    trendDirection: "up",
    categories: ["manufacturing", "secondary"],
    unit: "points",
    data: generateTimeSeriesData(12, 48, 54, 1.5)
  },
  {
    id: "retail_sales",
    name: "Retail Sales Growth",
    value: 3.1,
    previousValue: 2.9,
    trendDirection: "up",
    categories: ["consumer", "secondary"],
    unit: "%",
    data: generateTimeSeriesData(12, 2, 4, 0.5)
  }
];

// Recent signals data
export const recentSignals: Signal[] = [
  {
    id: "sig_001",
    title: "Semiconductor Shortage Easing",
    description: "Global semiconductor supplies showing signs of improvement as production capacity increases",
    source: "Industry Report",
    date: "2025-04-28",
    category: "Supply Chain",
    impact: "medium",
    industries: ["Technology", "Manufacturing", "Automotive"],
    signal_strength: 75,
    related_indicators: ["manufacturing_pmi", "tech_stock_index"]
  },
  {
    id: "sig_002",
    title: "Central Bank Signals Rate Cut",
    description: "Federal Reserve hints at potential interest rate cuts in upcoming meeting",
    source: "Federal Reserve",
    date: "2025-04-27",
    category: "Monetary Policy",
    impact: "high",
    industries: ["Finance", "Real Estate", "Retail"],
    signal_strength: 85,
    related_indicators: ["interest_rate", "bond_yields"]
  },
  {
    id: "sig_003",
    title: "Renewable Energy Investment Surge",
    description: "Major increase in capital flows to renewable energy projects following new climate policy",
    source: "Energy Investment Monitor",
    date: "2025-04-25",
    category: "Energy Transition",
    impact: "medium",
    industries: ["Energy", "Utilities", "Manufacturing"],
    signal_strength: 70,
    related_indicators: ["renewable_investment", "energy_futures"]
  },
  {
    id: "sig_004",
    title: "AI Regulation Framework Proposed",
    description: "New regulatory framework for artificial intelligence applications announced",
    source: "Government Press Release",
    date: "2025-04-24",
    category: "Regulation",
    impact: "high",
    industries: ["Technology", "Healthcare", "Finance"],
    signal_strength: 80,
    related_indicators: ["tech_regulation_index", "ai_adoption_rate"]
  },
  {
    id: "sig_005",
    title: "Supply Chain Diversification Accelerating",
    description: "Companies rapidly shifting to diversified supply chains to improve resilience",
    source: "Supply Chain Quarterly",
    date: "2025-04-22",
    category: "Global Trade",
    impact: "medium",
    industries: ["Manufacturing", "Retail", "Technology"],
    signal_strength: 65,
    related_indicators: ["global_trade_volume", "shipping_costs"]
  }
];

// Forecast scenarios
export const forecastScenarios: ForecastScenario[] = [
  {
    id: "baseline",
    name: "Baseline Scenario",
    description: "Current trajectory with moderate growth and managed inflation",
    probability: 60,
    impact: "neutral",
    indicators: [
      {
        indicator_id: "gdp_growth",
        forecast_values: generateForecastData(8, 3.2, 3.5, 0.2)
      },
      {
        indicator_id: "inflation",
        forecast_values: generateForecastData(8, 2.9, 2.7, 0.2)
      },
      {
        indicator_id: "unemployment",
        forecast_values: generateForecastData(8, 4.1, 4.0, 0.1)
      }
    ]
  },
  {
    id: "optimistic",
    name: "Optimistic Scenario",
    description: "Accelerated growth driven by technology innovation and policy support",
    probability: 25,
    impact: "positive",
    indicators: [
      {
        indicator_id: "gdp_growth",
        forecast_values: generateForecastData(8, 3.2, 4.2, 0.3)
      },
      {
        indicator_id: "inflation",
        forecast_values: generateForecastData(8, 2.9, 2.4, 0.2)
      },
      {
        indicator_id: "unemployment",
        forecast_values: generateForecastData(8, 4.1, 3.6, 0.2)
      }
    ]
  },
  {
    id: "pessimistic",
    name: "Pessimistic Scenario",
    description: "Economic contraction due to global instability and inflation pressures",
    probability: 15,
    impact: "negative",
    indicators: [
      {
        indicator_id: "gdp_growth",
        forecast_values: generateForecastData(8, 3.2, 1.8, 0.4)
      },
      {
        indicator_id: "inflation",
        forecast_values: generateForecastData(8, 2.9, 4.1, 0.3)
      },
      {
        indicator_id: "unemployment",
        forecast_values: generateForecastData(8, 4.1, 5.2, 0.3)
      }
    ]
  }
];

// Helper functions to generate time series and forecast data
function generateTimeSeriesData(
  months: number, 
  minValue: number, 
  maxValue: number, 
  volatility: number
): { date: string; value: number }[] {
  const data = [];
  let currentValue = minValue + Math.random() * (maxValue - minValue);
  const today = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    const change = (Math.random() - 0.5) * volatility;
    currentValue = Math.max(minValue, Math.min(maxValue, currentValue + change));
    data.push({
      date: date.toISOString().slice(0, 10),
      value: parseFloat(currentValue.toFixed(2))
    });
  }
  
  return data;
}

function generateForecastData(
  months: number,
  startValue: number,
  targetValue: number,
  volatility: number
): { date: string; value: number }[] {
  const data = [];
  let currentValue = startValue;
  const today = new Date();
  const step = (targetValue - startValue) / months;
  
  for (let i = 0; i < months; i++) {
    const date = new Date(today);
    date.setMonth(today.getMonth() + i + 1);
    const change = step + (Math.random() - 0.5) * volatility;
    currentValue = currentValue + change;
    data.push({
      date: date.toISOString().slice(0, 10),
      value: parseFloat(currentValue.toFixed(2))
    });
  }
  
  return data;
}

// Function to get indicator by ID
export function getIndicatorById(id: string): EconomicIndicator | undefined {
  return economicIndicators.find(indicator => indicator.id === id);
}

// Function to get scenario by ID
export function getScenarioById(id: string): ForecastScenario | undefined {
  return forecastScenarios.find(scenario => scenario.id === id);
}
