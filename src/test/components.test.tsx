import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecommendationCard, { type Recommendation } from '@/components/RecommendationCard';
import OutlookScoreCard from '@/components/OutlookScoreCard';
import SignalFeed from '@/components/SignalFeed';
import DashboardLayout from '@/components/DashboardLayout';
import { type IndustryOutlook, type Signal } from '@/lib/mock-data';

const mockRecommendation: Recommendation = {
  id: '1',
  title: 'Test Recommendation',
  description: 'A test recommendation description.',
  category: 'Technology',
  priority: 'high',
  impact: 85,
  effort: 60,
  status: 'pending',
  createdAt: '2025-01-01',
  source: 'AI',
};

const mockOutlook: IndustryOutlook = {
  industry: 'Technology',
  score: 78,
  previousScore: 72,
  trendDirection: 'up',
  signals: 12,
  riskLevel: 'low',
  leadingIndicator: 'Semiconductor Sales',
  shortTermForecast: 'Continued growth expected',
};

const mockSignal: Signal = {
  id: 'sig_001',
  title: 'Test Signal',
  description: 'A test signal description.',
  source: 'Test Source',
  date: new Date().toISOString().slice(0, 10),
  category: 'Supply Chain',
  impact: 'high',
  industries: ['Technology', 'Manufacturing'],
  signal_strength: 75,
  related_indicators: ['manufacturing_pmi'],
};

describe('RecommendationCard', () => {
  it('renders the title and description', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('Test Recommendation')).toBeInTheDocument();
    expect(screen.getByText('A test recommendation description.')).toBeInTheDocument();
  });

  it('shows priority badge', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });

  it('shows status badge', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('shows impact and effort values', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('shows source badge', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('renders correctly for each priority level', () => {
    const priorities: Recommendation['priority'][] = ['high', 'medium', 'low'];
    priorities.forEach(priority => {
      const { unmount } = render(
        <RecommendationCard recommendation={{ ...mockRecommendation, priority }} />
      );
      expect(
        screen.getByText(`${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`)
      ).toBeInTheDocument();
      unmount();
    });
  });
});

describe('OutlookScoreCard', () => {
  it('renders the industry name', () => {
    render(<OutlookScoreCard outlook={mockOutlook} />);
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });

  it('renders the score', () => {
    render(<OutlookScoreCard outlook={mockOutlook} />);
    expect(screen.getByText('78')).toBeInTheDocument();
  });

  it('renders the risk level badge', () => {
    render(<OutlookScoreCard outlook={mockOutlook} />);
    expect(screen.getByText('Low Risk')).toBeInTheDocument();
  });

  it('renders the outlook score label', () => {
    render(<OutlookScoreCard outlook={mockOutlook} />);
    expect(screen.getByText('Outlook Score')).toBeInTheDocument();
  });

  it('renders bearish/neutral/bullish scale labels', () => {
    render(<OutlookScoreCard outlook={mockOutlook} />);
    expect(screen.getByText('Bearish')).toBeInTheDocument();
    expect(screen.getByText('Neutral')).toBeInTheDocument();
    expect(screen.getByText('Bullish')).toBeInTheDocument();
  });
});

describe('SignalFeed', () => {
  it('renders signal title and description', () => {
    render(<SignalFeed signals={[mockSignal]} />);
    expect(screen.getByText('Test Signal')).toBeInTheDocument();
    expect(screen.getByText('A test signal description.')).toBeInTheDocument();
  });

  it('respects the limit prop', () => {
    const signals = [
      { ...mockSignal, id: '1', title: 'Signal One' },
      { ...mockSignal, id: '2', title: 'Signal Two' },
      { ...mockSignal, id: '3', title: 'Signal Three' },
    ];
    render(<SignalFeed signals={signals} limit={2} />);
    expect(screen.getByText('Signal One')).toBeInTheDocument();
    expect(screen.getByText('Signal Two')).toBeInTheDocument();
    expect(screen.queryByText('Signal Three')).not.toBeInTheDocument();
  });

  it('renders an empty list without crashing', () => {
    const { container } = render(<SignalFeed signals={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('shows impact badge', () => {
    render(<SignalFeed signals={[mockSignal]} />);
    expect(screen.getByText('High Impact')).toBeInTheDocument();
  });

  it('shows affected industries', () => {
    render(<SignalFeed signals={[mockSignal]} />);
    expect(screen.getByText(/Technology, Manufacturing/)).toBeInTheDocument();
  });
});

describe('DashboardLayout navigation', () => {
  const renderLayout = (path = '/') =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <DashboardLayout>
          <div>content</div>
        </DashboardLayout>
      </MemoryRouter>
    );

  it('renders all primary nav items', () => {
    renderLayout();
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Signals').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dataset Library').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Scenarios').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Recommendations').length).toBeGreaterThan(0);
  });

  it('renders page content inside the layout', () => {
    renderLayout();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('opens mobile nav when hamburger is clicked', () => {
    renderLayout();
    const hamburger = screen.getByLabelText('Open navigation menu');
    fireEvent.click(hamburger);
    // After opening, close button should appear
    const closeButtons = screen.getAllByRole('button').filter(
      btn => btn.getAttribute('aria-label') !== 'Open navigation menu'
        && btn.querySelector('svg') !== null
        && btn.closest('[class*="z-50"]') !== null
    );
    expect(closeButtons.length).toBeGreaterThan(0);
  });

  it('highlights the active route', () => {
    renderLayout('/scenarios');
    const links = screen.getAllByRole('link', { name: /scenarios/i });
    const activeLink = links.find(l => l.classList.contains('text-primary'));
    expect(activeLink).toBeDefined();
  });
});
