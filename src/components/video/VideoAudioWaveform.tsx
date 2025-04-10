
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface VideoAudioWaveformProps {
  currentTime: number;
  duration: number;
}

const VideoAudioWaveform = ({ currentTime, duration }: VideoAudioWaveformProps) => {
  // Generate a mock waveform pattern
  const generateWaveformData = (length: number): number[] => {
    const data: number[] = [];
    for (let i = 0; i < length; i++) {
      // Create a pattern that looks like audio waves
      const base = Math.sin(i * 0.2) * 0.5 + 0.5;
      const variation = Math.random() * 0.3;
      const value = Math.min(1, Math.max(0, base + variation));
      data.push(value);
    }
    return data;
  };

  const waveformData = generateWaveformData(200);
  
  return (
    <Card className="w-full">
      <CardContent className="pt-4 pb-1">
        <div className="text-xs text-gray-400 mb-1">Audio Waveform</div>
        <div className="h-12 relative border border-gray-700 rounded-md bg-black/30">
          {/* Waveform visualization */}
          <div className="absolute inset-0 flex items-center justify-between px-1">
            {waveformData.map((height, index) => (
              <div 
                key={index}
                className="w-[0.3%] bg-meta-purple/60"
                style={{ 
                  height: `${height * 80}%`,
                  opacity: index / waveformData.length < currentTime / duration ? 1 : 0.4
                }}
              ></div>
            ))}
          </div>
          
          {/* Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-meta-teal z-10" 
            style={{ left: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoAudioWaveform;
