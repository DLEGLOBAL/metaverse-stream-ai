
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import { AppProvider } from './contexts/AppContext';
import { VRProvider } from './contexts/VRContext';
import { Toaster } from './components/ui/toaster';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Scenes from './pages/Scenes';
import Sources from './pages/Sources';
import Streaming from './pages/Streaming';
import AiTools from './pages/AiTools';
import Settings from './pages/Settings';
import Studio from './pages/Studio';
import Community from './pages/Community';
import CreatorNetwork from './pages/CreatorNetwork';
import VRIntegration from './pages/VRIntegration';
import Audio from './pages/Audio';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import Chat from './pages/Chat';
import Pricing from './pages/Pricing';
import VideoEditing from './pages/VideoEditing';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <VRProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/landing" element={<Landing />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/scenes" element={<Scenes />} />
              <Route path="/dashboard/sources" element={<Sources />} />
              <Route path="/dashboard/streaming" element={<Streaming />} />
              <Route path="/dashboard/ai-tools" element={<AiTools />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/studio" element={<Studio />} />
              <Route path="/dashboard/community" element={<Community />} />
              <Route path="/dashboard/creator-network" element={<CreatorNetwork />} />
              <Route path="/dashboard/vr" element={<VRIntegration />} />
              <Route path="/dashboard/audio" element={<Audio />} />
              <Route path="/dashboard/pricing" element={<Pricing />} />
              <Route path="/dashboard/video-editing" element={<VideoEditing />} />
              
              <Route path="/scenes" element={<Scenes />} />
              <Route path="/sources" element={<Sources />} />
              <Route path="/streaming" element={<Streaming />} />
              <Route path="/ai-tools" element={<AiTools />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/community" element={<Community />} />
              <Route path="/creator-network" element={<CreatorNetwork />} />
              <Route path="/vr-integration" element={<VRIntegration />} />
              <Route path="/audio" element={<Audio />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/video-editing" element={<VideoEditing />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </VRProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
