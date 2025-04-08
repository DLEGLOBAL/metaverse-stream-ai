
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Studio from "./pages/Studio";
import Scenes from "./pages/Scenes";
import Audio from "./pages/Audio";
import Sources from "./pages/Sources";
import AiTools from "./pages/AiTools";
import VRIntegration from "./pages/VRIntegration";
import Streaming from "./pages/Streaming";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { AppProvider } from "./contexts/AppContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/studio" element={<Studio />} />
            <Route path="/dashboard/scenes" element={<Scenes />} />
            <Route path="/dashboard/audio" element={<Audio />} />
            <Route path="/dashboard/sources" element={<Sources />} />
            <Route path="/dashboard/ai-tools" element={<AiTools />} />
            <Route path="/dashboard/vr" element={<VRIntegration />} />
            <Route path="/dashboard/streaming" element={<Streaming />} />
            <Route path="/dashboard/community" element={<Community />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
