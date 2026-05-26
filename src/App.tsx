
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Asfalt from "./pages/Asfalt";
import Angary from "./pages/Angary";
import Blagoustrojstvo from "./pages/Blagoustrojstvo";
import Bruschatka from "./pages/Bruschatka";
import Yamochny from "./pages/Yamochny";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/asfalt" element={<Asfalt />} />
          <Route path="/angary" element={<Angary />} />
          <Route path="/blagoustrojstvo" element={<Blagoustrojstvo />} />
          <Route path="/bruschatka" element={<Bruschatka />} />
          <Route path="/yamochny" element={<Yamochny />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;