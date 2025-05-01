
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send } from 'lucide-react';

interface InsightPanelProps {
  selectedAlgorithm: string;
  company: string;
  industry: string;
}

const InsightPanel = ({ selectedAlgorithm, company, industry }: InsightPanelProps) => {
  const [query, setQuery] = useState('');
  const [conversationHistory, setConversationHistory] = useState<{ role: 'assistant' | 'user', content: string }[]>([
    {
      role: 'assistant',
      content: `Based on the ${selectedAlgorithm} forecast for ${company} in the ${industry} industry, a 1% increase in interest rates is projected to reduce quarterly revenue by approximately 3.2%. Key sensitivity factors include consumer spending elasticity (high) and fixed-cost structure (moderate). Would you like to simulate other economic scenarios?`
    }
  ]);

  const handleSendMessage = () => {
    if (!query.trim()) return;
    
    // Add the user's message to the conversation
    setConversationHistory([...conversationHistory, { role: 'user', content: query }]);
    
    // In a real application, this would trigger an API call to an LLM
    setTimeout(() => {
      const mockResponses = [
        `For ${company}, if inflation rises by 2% over the next 6 months, the model predicts cost of goods sold would increase by 4.8%, potentially reducing profit margins by 2.1%. This is primarily driven by raw material costs and supply chain pressures typical in the ${industry} sector.`,
        `Based on the sensitivity analysis, ${company}'s cost structure shows a 0.7 elasticity to commodity prices. This means for every 1% increase in relevant commodity indices, costs rise by approximately 0.7%. This is slightly below the ${industry} industry average of 0.85.`,
        `The forecast suggests that ${company}'s revenue has a seasonal pattern with Q4 typically showing 18% higher performance than Q2. This seasonality is more pronounced than the industry average of 12% variance.`
      ];
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setConversationHistory([...conversationHistory, 
        { role: 'user', content: query },
        { role: 'assistant', content: randomResponse }
      ]);
      setQuery('');
    }, 1000);
  };

  return (
    <Card className="h-[350px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          AI Insights & Analysis
        </CardTitle>
        <CardDescription>Ask questions about the forecast and economic impacts</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto mb-4 space-y-4">
          {conversationHistory.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'assistant' 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about economic impacts on the business..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow"
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightPanel;
