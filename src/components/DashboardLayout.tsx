import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, ChevronDown, Menu, X, BarChart3, Globe, Zap, Lightbulb, MessageSquare, Settings, Database, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: BarChart3 },
  { path: '/signals', label: 'Signals', icon: Zap },
  { path: '/datasets', label: 'Dataset Library', icon: Database },
  { path: '/analysis', label: 'Economic Analysis', icon: BarChart },
  { path: '/insights', label: 'Industry Insights', icon: Globe },
  { path: '/scenarios', label: 'Scenarios', icon: Lightbulb },
  { path: '/recommendations', label: 'Recommendations', icon: MessageSquare },
];

interface NavLinksProps {
  onNavigate?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onNavigate }) => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-gray-100 text-primary'
        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
    }`;

  return (
    <>
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link key={path} to={path} className={linkClass(path)} onClick={onNavigate}>
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </Link>
      ))}
    </>
  );
};

const SettingsLink: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  const location = useLocation();
  const linkClass = `flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    location.pathname === '/settings'
      ? 'bg-gray-100 text-primary'
      : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
  }`;
  return (
    <Link to="/settings" className={linkClass} onClick={onNavigate}>
      <Settings className="h-4 w-4 shrink-0" />
      Settings
    </Link>
  );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const closeMobile = () => setMobileNavOpen(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-white border-r border-border shadow-sm">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl text-primary">Strategic Foresight</span>
        </div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-border">
          <SettingsLink />
        </div>
      </div>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={closeMobile} />
          <div className="relative z-50 flex flex-col w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Strategic Foresight</span>
              </div>
              <Button variant="ghost" size="icon" onClick={closeMobile}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
              <NavLinks onNavigate={closeMobile} />
            </nav>
            <div className="p-4 border-t border-border">
              <SettingsLink onNavigate={closeMobile} />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="lg:hidden flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-semibold">Strategic Foresight</span>
            </div>
            <h1 className="hidden lg:block text-xl font-medium text-gray-800">
              Strategic Insights Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                    JD
                  </div>
                  <span className="hidden md:inline-block">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
