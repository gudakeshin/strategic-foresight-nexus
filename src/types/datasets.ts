
export interface Dataset {
  id: number;
  name: string;
  rows: number;
  columns: number;
  lastUpdated: string;
}

export interface Algorithm {
  id: number;
  name: string;
  bestFor: string;
  keyStrengths: string;
  rank: number;
}
