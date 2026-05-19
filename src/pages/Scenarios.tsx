
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusCircle, ListChecks, GitBranch, Clock, ArrowRight } from 'lucide-react';
import ScenarioComparisonCard from '@/components/ScenarioComparisonCard';
import { scenariosData, type Scenario } from '@/lib/mock-data';
import { toast } from 'sonner';

const categories = ['all', 'economic', 'operations', 'regulatory', 'technology'];

function isoDateDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

const ScenariosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>(scenariosData);

  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('Economic');
  const [newProbability, setNewProbability] = useState<number>(50);

  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [showBranchDialog, setShowBranchDialog] = useState(false);
  const [branchBaseId, setBranchBaseId] = useState('');
  const [branchName, setBranchName] = useState('');

  const [showTimeDialog, setShowTimeDialog] = useState(false);
  const [timeHorizon, setTimeHorizon] = useState('medium');

  const filtered = scenarios.filter(
    s => activeTab === 'all' || s.category.toLowerCase() === activeTab
  );

  const handleCreateScenario = () => {
    if (!newTitle.trim()) return;

    const forecastMap: Record<string, Scenario['forecastScenarioId']> = {
      Economic: 'pessimistic',
      Operations: 'pessimistic',
      Regulatory: 'baseline',
      Technology: 'optimistic',
    };

    const newScenario: Scenario = {
      id: String(Date.now()),
      title: newTitle,
      description: newDescription,
      category: newCategory,
      createdAt: isoDateDaysAgo(0),
      updatedAt: isoDateDaysAgo(0),
      probability: newProbability,
      forecastScenarioId: forecastMap[newCategory] ?? 'baseline',
    };

    setScenarios(prev => [...prev, newScenario]);
    setShowNewDialog(false);
    setNewTitle('');
    setNewDescription('');
    setNewCategory('Economic');
    setNewProbability(50);
    toast.success('Scenario created');
  };

  const handleBranch = () => {
    if (!branchBaseId || !branchName.trim()) return;
    const base = scenarios.find(s => s.id === branchBaseId);
    if (!base) return;
    const branched: Scenario = {
      ...base,
      id: String(Date.now()),
      title: `${branchName} (Branch)`,
      createdAt: isoDateDaysAgo(0),
      updatedAt: isoDateDaysAgo(0),
    };
    setScenarios(prev => [...prev, branched]);
    setShowBranchDialog(false);
    setBranchBaseId('');
    setBranchName('');
    toast.success('Scenario branched successfully');
  };

  const getTimeHorizonShifts = () => {
    const multipliers: Record<string, number> = {
      short: 0.5,
      medium: 1,
      long: 1.5,
    };
    const m = multipliers[timeHorizon] ?? 1;
    return scenarios.map(s => ({
      ...s,
      adjustedProbability: Math.min(100, Math.round(s.probability * m)),
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Scenarios</h1>
            <p className="text-muted-foreground">
              Create and analyze different future scenarios to prepare strategic responses
            </p>
          </div>
          <Button className="flex gap-2" onClick={() => setShowNewDialog(true)}>
            <PlusCircle className="h-4 w-4" />
            New Scenario
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Scenario Explorer</CardTitle>
                </div>
                <CardDescription>Browse and manage strategic scenarios</CardDescription>
                <Tabs defaultValue="all" className="mt-4" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-5 mb-2">
                    {categories.map(c => (
                      <TabsTrigger key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filtered.map(scenario => (
                    <Card
                      key={scenario.id}
                      className={`transition-colors ${
                        selectedScenario?.id === scenario.id
                          ? 'bg-primary/5 border-primary'
                          : 'bg-muted/40 hover:bg-muted'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{scenario.title}</h3>
                              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                {scenario.category}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{scenario.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedScenario(scenario)}
                            aria-label={`View ${scenario.title} forecast`}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-6 mt-2">
                          <div className="text-xs text-muted-foreground">
                            Last updated: {scenario.updatedAt}
                          </div>
                          <div className="text-xs flex items-center gap-1">
                            <span>Probability:</span>
                            <span className="font-medium">{scenario.probability}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <ScenarioComparisonCard
              activeScenarioId={selectedScenario?.forecastScenarioId}
            />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Scenario Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setShowCompareDialog(true)}
                  >
                    <ListChecks className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>Compare Scenarios</span>
                      <span className="text-xs text-muted-foreground">Analyze multiple scenarios side by side</span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setShowBranchDialog(true)}
                  >
                    <GitBranch className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>Branch Scenarios</span>
                      <span className="text-xs text-muted-foreground">Create variations of existing scenarios</span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setShowTimeDialog(true)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>Time Horizon Analysis</span>
                      <span className="text-xs text-muted-foreground">View impacts across different timeframes</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* New Scenario Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Scenario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="new-title">Title</Label>
              <Input
                id="new-title"
                placeholder="Scenario title"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-desc">Description</Label>
              <Textarea
                id="new-desc"
                placeholder="Describe the scenario..."
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-category">Category</Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger id="new-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Economic">Economic</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Regulatory">Regulatory</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Probability</Label>
                <span className="text-sm font-medium">{newProbability}%</span>
              </div>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[newProbability]}
                onValueChange={([val]) => setNewProbability(val)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateScenario} disabled={!newTitle.trim()}>Create Scenario</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Compare Scenarios Dialog */}
      <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Compare Scenarios</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <div className="grid grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-1">
              {scenarios.map(s => (
                <Card key={s.id} className="bg-muted/40">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-sm">{s.title}</h3>
                      <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">
                        {s.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Probability</span>
                        <span className="font-medium">{s.probability}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${s.probability}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Updated: {s.updatedAt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowCompareDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Branch Scenario Dialog */}
      <Dialog open={showBranchDialog} onOpenChange={setShowBranchDialog}>
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle>Branch Scenario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="branch-base">Base Scenario</Label>
              <Select value={branchBaseId} onValueChange={setBranchBaseId}>
                <SelectTrigger id="branch-base">
                  <SelectValue placeholder="Select a scenario to branch from" />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="branch-name">New Branch Name</Label>
              <Input
                id="branch-name"
                placeholder="Branch name"
                value={branchName}
                onChange={e => setBranchName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBranchDialog(false)}>Cancel</Button>
            <Button onClick={handleBranch} disabled={!branchBaseId || !branchName.trim()}>
              Create Branch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Time Horizon Analysis Dialog */}
      <Dialog open={showTimeDialog} onOpenChange={setShowTimeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Time Horizon Analysis</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <RadioGroup value={timeHorizon} onValueChange={setTimeHorizon} className="flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="short" id="th-short" />
                <Label htmlFor="th-short">Short-term (3 months)</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="medium" id="th-medium" />
                <Label htmlFor="th-medium">Medium-term (12 months)</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="long" id="th-long" />
                <Label htmlFor="th-long">Long-term (36 months)</Label>
              </div>
            </RadioGroup>

            <p className="text-sm text-muted-foreground">
              {timeHorizon === 'short' && 'Short-term analysis focuses on immediate risks and near-term probability shifts. Probabilities are dampened as uncertainty is lower over a 3-month window.'}
              {timeHorizon === 'medium' && 'Medium-term analysis provides a balanced view of scenario likelihood over a 12-month period, using base probabilities as-is.'}
              {timeHorizon === 'long' && 'Long-term analysis amplifies scenario impact as compounding effects increase over 36 months. Probabilities are adjusted upward to reflect accumulating uncertainty.'}
            </p>

            <div className="border rounded-md overflow-x-auto">
              <table className="min-w-full divide-y divide-border text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Scenario</th>
                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Base Prob.</th>
                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Adjusted Prob.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {getTimeHorizonShifts().map(s => (
                    <tr key={s.id}>
                      <td className="px-4 py-2 font-medium">{s.title}</td>
                      <td className="px-4 py-2 text-muted-foreground">{s.category}</td>
                      <td className="px-4 py-2">{s.probability}%</td>
                      <td className="px-4 py-2">
                        <span className={s.adjustedProbability > s.probability ? 'text-red-600' : s.adjustedProbability < s.probability ? 'text-green-600' : ''}>
                          {s.adjustedProbability}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowTimeDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ScenariosPage;
