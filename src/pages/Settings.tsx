import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const SettingsPage: React.FC = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Application Settings
          </CardTitle>
          <CardDescription>Configure your Strategic Foresight Nexus preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Settings configuration coming soon.</p>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default SettingsPage;
