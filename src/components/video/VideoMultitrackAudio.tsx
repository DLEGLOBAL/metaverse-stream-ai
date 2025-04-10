
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AudioTrack {
  id: string;
  name: string;
  waveformData: number[];
  color: string;
}

interface VideoMultitrackAudioProps {
  currentTime: number;
  duration: number;
  tracks?: AudioTrack[];
}

const VideoMultitrackAudio = ({ 
  currentTime, 
  duration,
  tracks 
}: VideoMultitrackAudioProps) => {
  // Generate a mock waveform pattern if no tracks provided
  const generateWaveformData = (length: number, seed: number = 1): number[] => {
    const data: number[] = [];
    for (let i = 0; i < length; i++) {
      // Create a pattern that looks like audio waves, with some variation based on seed
      const base = Math.sin(i * 0.2 + seed) * 0.5 + 0.5;
      const variation = Math.random() * 0.3;
      const value = Math.min(1, Math.max(0, base + variation));
      data.push(value);
    }
    return data;
  };

  const defaultTracks: AudioTrack[] = [
    {
      id: 'main-audio',
      name: 'Main Audio',
      waveformData: generateWaveformData(200, 1),
      color: 'bg-meta-purple/60'
    },
    {
      id: 'background-music',
      name: 'Background Music',
      waveformData: generateWaveformData(200, 2),
      color: 'bg-meta-teal/60'
    }
  ];

  const audioTracks = tracks || defaultTracks;
  
  return (
    <Card className="w-full">
      <CardContent className="pt-4 pb-1 space-y-2">
        <div className="text-xs text-gray-400 mb-1">Multi-Track Audio</div>
        
        {audioTracks.map((track, trackIndex) => (
          <div key={track.id} className="relative">
            <div className="text-[10px] text-gray-400 absolute -top-3 left-0">{track.name}</div>
            <div className="h-8 relative border border-gray-700 rounded-md bg-black/30">
              {/* Waveform visualization */}
              <div className="absolute inset-0 flex items-center justify-between px-1">
                {track.waveformData.map((height, index) => (
                  <div 
                    key={index}
                    className={`w-[0.3%] ${track.color}`}
                    style={{ 
                      height: `${height * 80}%`,
                      opacity: index / track.waveformData.length < currentTime / duration ? 1 : 0.4
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {/* Playhead - shared across all tracks */}
        <div className="relative h-0">
          <div 
            className="absolute top-[-108%] h-[108%] w-px bg-meta-teal z-10" 
            style={{ left: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoMultitrackAudio;
