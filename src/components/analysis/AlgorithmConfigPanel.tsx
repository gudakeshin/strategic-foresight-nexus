import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Algorithm } from '@/types/datasets';
import { SlidersHorizontal } from 'lucide-react';

interface AlgorithmConfigPanelProps {
  algorithms: Algorithm[];
  selectedAlgorithm: string;
  onSelectAlgorithm: (value: string) => void;
  forecastHorizon: number;
  setForecastHorizon: (value: number) => void;
  granularity: string;
  setGranularity: (value: string) => void;
}

const AlgorithmConfigPanel = ({
  algorithms,
  selectedAlgorithm,
  onSelectAlgorithm,
  forecastHorizon,
  setForecastHorizon,
  granularity,
  setGranularity
}: AlgorithmConfigPanelProps) => {
  const selectedAlgoDetails = algorithms.find(algo => algo.name === selectedAlgorithm);

  const AlgorithmParameters = () => {
    switch (selectedAlgorithm) {
      case "ARIMA / SARIMA":
        return (
          <div className="space-y-4 mt-4 border-t pt-4">
            <div className="space-y-2">
              <Label className="text-sm">AR Order (p)</Label>
              <Slider 
                defaultValue={[2]} 
                max={10} 
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">MA Order (q)</Label>
              <Slider 
                defaultValue={[1]} 
                max={10} 
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>
        );
      case "Prophet (by Facebook)":
        return (
          <div className="space-y-4 mt-4 border-t pt-4">
            <div className="space-y-2">
              <Label className="text-sm">Seasonality Mode</Label>
              <Select defaultValue="additive">
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="additive">Additive</SelectItem>
                  <SelectItem value="multiplicative">Multiplicative</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Changepoint Prior Scale</Label>
              <Slider 
                defaultValue={[0.05]} 
                min={0.001}
                max={0.5} 
                step={0.001}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.001</span>
                <span>0.25</span>
                <span>0.5</span>
              </div>
            </div>
          </div>
        );
      case "XGBoost / LightGBM":
        return (
          <div className="space-y-4 mt-4 border-t pt-4">
            <div className="space-y-2">
              <Label className="text-sm">Max Depth</Label>
              <Slider 
                defaultValue={[6]} 
                min={3}
                max={10} 
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>3</span>
                <span>6</span>
                <span>10</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Learning Rate</Label>
              <Slider 
                defaultValue={[0.1]} 
                min={0.01}
                max={0.3} 
                step={0.01}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.01</span>
                <span>0.15</span>
                <span>0.3</span>
              </div>
            </div>
          </div>
        );
      case "LSTM (Long Short-Term Memory)":
        return (
          <div className="space-y-4 mt-4 border-t pt-4">
            <div className="space-y-2">
              <Label className="text-sm">Neurons per Layer</Label>
              <Slider 
                defaultValue={[64]} 
                min={16}
                max={128} 
                step={16}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>16</span>
                <span>64</span>
                <span>128</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Sequence Length</Label>
              <Slider 
                defaultValue={[12]} 
                min={3}
                max={24} 
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>3</span>
                <span>12</span>
                <span>24</span>
              </div>
            </div>
          </div>
        );
      case "Random Forest Regressor":
        return (
          <div className="space-y-4 mt-4 border-t pt-4">
            <div className="space-y-2">
              <Label className="text-sm">Number of Trees</Label>
              <Slider 
                defaultValue={[100]} 
                min={10}
                max={500} 
                step={10}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10</span>
                <span>250</span>
                <span>500</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Max Features</Label>
              <Select defaultValue="auto">
                <SelectTrigger>
                  <SelectValue placeholder="Select features" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="sqrt">Sqrt</SelectItem>
                  <SelectItem value="log2">Log2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Model Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="algorithm">Forecasting Algorithm</Label>
          <Select value={selectedAlgorithm} onValueChange={onSelectAlgorithm}>
            <SelectTrigger>
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((algo) => (
                <SelectItem key={algo.id} value={algo.name}>
                  {algo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedAlgoDetails && (
          <div className="text-sm space-y-2 p-3 bg-gray-50 rounded-md">
            <p><span className="font-medium">Best For:</span> {selectedAlgoDetails.bestFor}</p>
            <p><span className="font-medium">Strengths:</span> {selectedAlgoDetails.keyStrengths}</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="horizon" className="text-sm">Forecast Horizon</Label>
            <span className="text-sm font-medium">{forecastHorizon} months</span>
          </div>
          <Slider 
            id="horizon"
            value={[forecastHorizon]} 
            min={1}
            max={24} 
            step={1}
            onValueChange={(value) => setForecastHorizon(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>12</span>
            <span>24</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="granularity">Data Granularity</Label>
          <Select value={granularity} onValueChange={setGranularity}>
            <SelectTrigger>
              <SelectValue placeholder="Select granularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {AlgorithmParameters()}
      </CardContent>
    </Card>
  );
};

export default AlgorithmConfigPanel;
