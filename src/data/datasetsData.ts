
import { Dataset, Algorithm } from '@/types/datasets';

// Mock datasets
export const datasets: Dataset[] = [
  { id: 1, name: 'Global Economic Indicators', rows: 5842, columns: 27, lastUpdated: '2023-11-15' },
  { id: 2, name: 'Industry Performance Metrics', rows: 3921, columns: 15, lastUpdated: '2023-12-01' },
  { id: 3, name: 'Consumer Sentiment Index', rows: 2145, columns: 12, lastUpdated: '2024-01-10' },
  { id: 4, name: 'Supply Chain Disruptions', rows: 1503, columns: 18, lastUpdated: '2024-02-20' },
  { id: 5, name: 'Market Volatility Indicators', rows: 4218, columns: 22, lastUpdated: '2024-03-05' },
  { id: 6, name: 'Regulatory Change Impact', rows: 987, columns: 14, lastUpdated: '2024-03-28' }
];

// Algorithms with their details
export const algorithms: Algorithm[] = [
  { 
    id: 1, 
    name: 'ARIMA / SARIMA', 
    bestFor: 'Time series with trend & seasonality', 
    keyStrengths: 'Interpretable, strong for univariate forecasts with stationary or seasonal patterns',
    rank: 1
  },
  { 
    id: 2, 
    name: 'Prophet (by Facebook)', 
    bestFor: 'Business forecasting with seasonality and holidays', 
    keyStrengths: 'Easy to use, handles missing data & seasonality automatically, great for business applications',
    rank: 2
  },
  {
    id: 3,
    name: 'XGBoost / LightGBM',
    bestFor: 'Structured/tabular data forecasting',
    keyStrengths: 'High accuracy, handles non-linearities, strong with feature engineering',
    rank: 3
  },
  {
    id: 4,
    name: 'LSTM (Long Short-Term Memory)',
    bestFor: 'Complex time series with long-term dependencies',
    keyStrengths: 'Learns complex temporal relationships, strong in deep learning models',
    rank: 4
  },
  {
    id: 5,
    name: 'Random Forest Regressor',
    bestFor: 'Non-linear forecasting for tabular datasets',
    keyStrengths: 'Robust to overfitting, works well with fewer tuning needs and non-linear data',
    rank: 5
  }
];
