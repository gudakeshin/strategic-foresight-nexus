
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CompanyInputsProps {
  company: string;
  setCompany: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
}

const CompanyInputs = ({ company, setCompany, industry, setIndustry }: CompanyInputsProps) => {
  const industries = [
    "Banking & Financial Services",
    "Information Technology",
    "Manufacturing",
    "Retail & E-commerce",
    "Healthcare & Pharmaceuticals",
    "Energy & Utilities",
    "Telecommunications",
    "Consumer Goods",
    "Automotive",
    "Real Estate"
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Company Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input 
            id="company" 
            placeholder="Enter company name" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInputs;
