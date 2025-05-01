
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DatasetLibrary from "./pages/DatasetLibrary";
import Scenarios from "./pages/Scenarios";
import Signals from "./pages/Signals";
import IndustryInsights from "./pages/IndustryInsights";
import Recommendations from "./pages/Recommendations";
import Analysis from "./pages/Analysis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/datasets" element={<DatasetLibrary />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/signals" element={<Signals />} />
          <Route path="/insights" element={<IndustryInsights />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/analysis" element={<Analysis />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
