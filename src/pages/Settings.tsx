import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const SettingsPage: React.FC = () => {
  const [profileName, setProfileName] = useState('John Doe');
  const [profileEmail, setProfileEmail] = useState('john.doe@company.com');

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [signalDigest, setSignalDigest] = useState(true);
  const [scenarioUpdates, setScenarioUpdates] = useState(false);
  const [recommendationAlerts, setRecommendationAlerts] = useState(true);

  const [autoRefresh, setAutoRefresh] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [forecastHorizon, setForecastHorizon] = useState('12');
  const [defaultIndustry, setDefaultIndustry] = useState('Technology');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-semibold select-none">
                JD
              </div>
              <div>
                <p className="font-medium">{profileName}</p>
                <p className="text-sm text-muted-foreground">{profileEmail}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="profile-name">Name</Label>
                <Input
                  id="profile-name"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={profileEmail}
                  onChange={e => setProfileEmail(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={() => toast.success('Profile saved')}
            >
              Save Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for high-impact signals</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Signal Digest</Label>
                <p className="text-sm text-muted-foreground">Weekly summary of all signals</p>
              </div>
              <Switch checked={signalDigest} onCheckedChange={setSignalDigest} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Scenario Updates</Label>
                <p className="text-sm text-muted-foreground">Notifications when scenarios are updated</p>
              </div>
              <Switch checked={scenarioUpdates} onCheckedChange={setScenarioUpdates} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Recommendation Alerts</Label>
                <p className="text-sm text-muted-foreground">Alerts for new strategic recommendations</p>
              </div>
              <Switch checked={recommendationAlerts} onCheckedChange={setRecommendationAlerts} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data & Display</CardTitle>
            <CardDescription>Customize data refresh and display preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-refresh Data</Label>
                <p className="text-sm text-muted-foreground">Automatically refresh dashboard data every 15 minutes</p>
              </div>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact View</Label>
                <p className="text-sm text-muted-foreground">Show more data with reduced spacing</p>
              </div>
              <Switch checked={compactView} onCheckedChange={setCompactView} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="forecast-horizon">Default Forecast Horizon</Label>
                <Select value={forecastHorizon} onValueChange={setForecastHorizon}>
                  <SelectTrigger id="forecast-horizon">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="default-industry">Default Industry</Label>
                <Select value={defaultIndustry} onValueChange={setDefaultIndustry}>
                  <SelectTrigger id="default-industry">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Energy">Energy</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions — proceed with caution</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => toast.success('All filters cleared')}
            >
              Clear All Filters
            </Button>
            <Button
              variant="destructive"
              onClick={() => toast.success('Dashboard reset to defaults')}
            >
              Reset Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
