
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import { AppProvider } from './contexts/AppContextProvider';
import { AuthProvider } from './hooks/useAuth';
import { VRProvider } from './contexts/VRContext';
import { DesktopProvider } from './contexts/DesktopContext';
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
import Chat from './pages/Chat';
import Pricing from './pages/Pricing';
import VideoEditing from './pages/VideoEditing';
import Branding from './pages/Branding';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <VRProvider>
            <DesktopProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/landing" element={<Landing />} />
                  <Route path="/auth" element={<Auth />} />
                  
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
                  <Route path="/dashboard/branding" element={<Branding />} />
                  <Route path="/dashboard/profile" element={<Profile />} />
                  <Route path="/dashboard/checkout" element={<Checkout />} />
                  
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
                  <Route path="/branding" element={<Branding />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
              <Toaster />
            </DesktopProvider>
          </VRProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
