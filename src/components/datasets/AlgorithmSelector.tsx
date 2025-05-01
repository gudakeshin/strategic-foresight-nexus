
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Algorithm {
  id: number;
  name: string;
  bestFor: string;
  keyStrengths: string;
  rank: number;
}

interface AlgorithmSelectorProps {
  algorithms: Algorithm[];
  selectedAlgorithm: string;
  onSelectAlgorithm: (algorithm: string) => void;
  disabled: boolean;
}

const AlgorithmSelector = ({
  algorithms,
  selectedAlgorithm,
  onSelectAlgorithm,
  disabled
}: AlgorithmSelectorProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Choose Algorithm</CardTitle>
        <CardDescription>Select an algorithm for your analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Select 
          value={selectedAlgorithm} 
          onValueChange={onSelectAlgorithm}
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an algorithm" />
          </SelectTrigger>
          <SelectContent>
            {algorithms.map((algorithm) => (
              <SelectItem key={algorithm.id} value={algorithm.name}>
                {algorithm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedAlgorithm && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium mb-2 text-gray-800">Algorithm Details</h4>
            {algorithms.find(a => a.name === selectedAlgorithm) && (
              <div className="text-sm space-y-2">
                <p><span className="font-medium">Rank:</span> {algorithms.find(a => a.name === selectedAlgorithm)?.rank}</p>
                <p><span className="font-medium">Best For:</span> {algorithms.find(a => a.name === selectedAlgorithm)?.bestFor}</p>
                <p><span className="font-medium">Key Strengths:</span> {algorithms.find(a => a.name === selectedAlgorithm)?.keyStrengths}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlgorithmSelector;
