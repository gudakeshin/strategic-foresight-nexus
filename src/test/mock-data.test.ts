import { describe, it, expect } from 'vitest';
import {
  makePrng,
  generateTimeSeriesData,
  generateForecastData,
  economicIndicators,
  forecastScenarios,
  scenariosData,
  recentSignals,
} from '@/lib/mock-data';

describe('makePrng', () => {
  it('returns values in [0, 1)', () => {
    const rand = makePrng(42);
    for (let i = 0; i < 100; i++) {
      const v = rand();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('is deterministic — same seed produces same sequence', () => {
    const a = makePrng(7);
    const b = makePrng(7);
    for (let i = 0; i < 20; i++) {
      expect(a()).toBe(b());
    }
  });

  it('different seeds produce different sequences', () => {
    const a = makePrng(1);
    const b = makePrng(2);
    const valuesA = Array.from({ length: 10 }, () => a());
    const valuesB = Array.from({ length: 10 }, () => b());
    expect(valuesA).not.toEqual(valuesB);
  });
});

describe('generateTimeSeriesData', () => {
  it('returns the requested number of data points', () => {
    const data = generateTimeSeriesData(12, 2, 4, 0.3, 10);
    expect(data).toHaveLength(12);
  });

  it('values stay within [minValue, maxValue]', () => {
    const data = generateTimeSeriesData(24, 1, 5, 0.5, 20);
    data.forEach(({ value }) => {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(5);
    });
  });

  it('output is stable across calls with same seed', () => {
    const a = generateTimeSeriesData(6, 0, 10, 1, 99);
    const b = generateTimeSeriesData(6, 0, 10, 1, 99);
    expect(a).toEqual(b);
  });

  it('each entry has a valid ISO date string', () => {
    const data = generateTimeSeriesData(3, 0, 1, 0.1, 5);
    data.forEach(({ date }) => {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(date))).toBe(false);
    });
  });

  it('dates are in ascending order', () => {
    const data = generateTimeSeriesData(12, 0, 1, 0.1, 5);
    for (let i = 1; i < data.length; i++) {
      expect(data[i].date >= data[i - 1].date).toBe(true);
    }
  });
});

describe('generateForecastData', () => {
  it('returns the requested number of forecast points', () => {
    const data = generateForecastData(8, 3.2, 4.0, 0.2, 30);
    expect(data).toHaveLength(8);
  });

  it('output is stable across calls with same seed', () => {
    const a = generateForecastData(8, 2.5, 3.5, 0.2, 77);
    const b = generateForecastData(8, 2.5, 3.5, 0.2, 77);
    expect(a).toEqual(b);
  });

  it('all dates are in the future relative to today', () => {
    const today = new Date().toISOString().slice(0, 10);
    const data = generateForecastData(6, 3, 4, 0.1, 50);
    data.forEach(({ date }) => {
      expect(date > today).toBe(true);
    });
  });
});

describe('economicIndicators', () => {
  it('has 8 indicators', () => {
    expect(economicIndicators).toHaveLength(8);
  });

  it('each indicator has 12 historical data points', () => {
    economicIndicators.forEach(ind => {
      expect(ind.data).toHaveLength(12);
    });
  });

  it('every primary indicator has at least one category', () => {
    economicIndicators
      .filter(ind => ind.categories.includes('primary'))
      .forEach(ind => {
        expect(ind.categories.length).toBeGreaterThan(0);
      });
  });

  it('trendDirection is a valid value', () => {
    const valid = new Set(['up', 'down', 'neutral']);
    economicIndicators.forEach(ind => {
      expect(valid.has(ind.trendDirection)).toBe(true);
    });
  });
});

describe('forecastScenarios', () => {
  it('contains baseline, optimistic, and pessimistic scenarios', () => {
    const ids = forecastScenarios.map(s => s.id);
    expect(ids).toContain('baseline');
    expect(ids).toContain('optimistic');
    expect(ids).toContain('pessimistic');
  });

  it('probabilities sum to 100', () => {
    const total = forecastScenarios.reduce((sum, s) => sum + s.probability, 0);
    expect(total).toBe(100);
  });

  it('each scenario has 8 forecast data points per indicator', () => {
    forecastScenarios.forEach(scenario => {
      scenario.indicators.forEach(ind => {
        expect(ind.forecast_values).toHaveLength(8);
      });
    });
  });
});

describe('scenariosData', () => {
  it('every scenario has a valid forecastScenarioId', () => {
    const validIds = new Set(['baseline', 'optimistic', 'pessimistic']);
    scenariosData.forEach(s => {
      expect(validIds.has(s.forecastScenarioId)).toBe(true);
    });
  });

  it('updatedAt is not before createdAt for any scenario', () => {
    scenariosData.forEach(s => {
      expect(s.updatedAt >= s.createdAt).toBe(true);
    });
  });
});

describe('recentSignals', () => {
  it('signal dates are relative to today (within the last 30 days)', () => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const todayStr = today.toISOString().slice(0, 10);
    const cutoff = thirtyDaysAgo.toISOString().slice(0, 10);

    recentSignals.forEach(signal => {
      expect(signal.date <= todayStr).toBe(true);
      expect(signal.date >= cutoff).toBe(true);
    });
  });

  it('impact values are valid', () => {
    const valid = new Set(['low', 'medium', 'high']);
    recentSignals.forEach(s => {
      expect(valid.has(s.impact)).toBe(true);
    });
  });
});
