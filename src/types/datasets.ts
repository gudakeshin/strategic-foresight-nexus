
export interface Dataset {
  id: number;
  name: string;
  rows: number;
  columns: number;
  lastUpdated: string;
  previewColumns: string[];
  previewRows: (string | number)[][];
}

export interface Algorithm {
  id: number;
  name: string;
  bestFor: string;
  keyStrengths: string;
  rank: number;
}

export interface ForecastData {
  month: string;
  actual?: number;
  forecast: number;
  lower: number;
  upper: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
