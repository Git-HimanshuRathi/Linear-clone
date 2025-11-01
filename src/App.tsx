import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import MyIssues from "./pages/MyIssues";
import Inbox from "./pages/Inbox";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/my-issues" element={<MyIssues />} />
            <Route path="/my-issues/:tab" element={<MyIssues />} />
            <Route path="/projects" element={<Dashboard />} />
            <Route path="/views" element={<Dashboard />} />
            <Route path="/more" element={<Dashboard />} />
            <Route path="/team/issues" element={<Dashboard />} />
            <Route path="/team/projects" element={<Dashboard />} />
            <Route path="/team/views" element={<Dashboard />} />
            <Route path="/import" element={<Dashboard />} />
            <Route path="/invite" element={<Dashboard />} />
            <Route path="/github" element={<Dashboard />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
