
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchFilters = ({ searchQuery, onSearchChange }: SearchFiltersProps) => {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search datasets..."
          className="pl-8 pr-4 py-2"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
      </div>
      <Button variant="outline" size="sm">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};

export default SearchFilters;
