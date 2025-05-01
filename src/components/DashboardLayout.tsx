
import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, ChevronDown, Menu, BarChart3, Globe, Zap, Lightbulb, MessageSquare, Settings, Database, BarChart } from 'lucide-react';
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

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-white border-r border-border shadow-sm">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl text-primary">Strategic Foresight</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-gray-700 ${isActive('/') ? 'bg-gray-100 text-primary' : 'hover:bg-gray-100 hover:text-primary'} font-medium`}
            onClick={() => navigate('/')}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-gray-700 ${isActive('/signals') ? 'bg-gray-100 text-primary' : 'hover:bg-gray-100 hover:text-primary'} font-medium`}
            onClick={() => navigate('/signals')}
          >
            <Zap className="mr-2 h-4 w-4" />
            Signals
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-gray-700 ${isActive('/datasets') ? 'bg-gray-100 text-primary' : 'hover:bg-gray-100 hover:text-primary'} font-medium`}
            onClick={() => navigate('/datasets')}
          >
            <Database className="mr-2 h-4 w-4" />
            Dataset Library
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-gray-700 ${isActive('/analysis') ? 'bg-gray-100 text-primary' : 'hover:bg-gray-100 hover:text-primary'} font-medium`}
            onClick={() => navigate('/analysis')}
          >
            <BarChart className="mr-2 h-4 w-4" />
            Economic Analysis
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-gray-700 ${isActive('/insights') ? 'bg-gray-100 text-primary' : 'hover:bg-gray-100 hover:text-primary'} font-medium`}
            onClick={() => navigate('/insights')}
          >
            <Globe className="mr-2 h-4 w-4" />
            Industry Insights
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-gray-700 ${isActive('/scenarios') ? 'bg-gray-100 text-primary' : 'hover:bg-gray-100 hover:text-primary'} font-medium`}
            onClick={() => navigate('/scenarios')}
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Scenarios
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-gray-700 ${isActive('/recommendations') ? 'bg-gray-100 text-primary' : 'hover:bg-gray-100 hover:text-primary'} font-medium`}
            onClick={() => navigate('/recommendations')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Recommendations
          </Button>
        </nav>
        <div className="p-4 border-t border-border">
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-gray-700 ${isActive('/settings') ? 'bg-gray-100 text-primary' : 'hover:bg-gray-100 hover:text-primary'} font-medium`}
            onClick={() => navigate('/settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-white shadow-sm">
          <div className="flex lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="lg:hidden flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="font-semibold">Strategic Foresight</span>
          </div>
          <div className="hidden lg:flex">
            <h1 className="text-xl font-medium text-gray-800">Strategic Insights Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
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

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
