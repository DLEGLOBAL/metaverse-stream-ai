
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  isActive: boolean;
  startTime?: number;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  isActive,
  startTime = Date.now(),
  className = ''
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  
  useEffect(() => {
    // Reset the timer when starting
    if (isActive) {
      setElapsedTime(0);
      
      // Start interval for counter
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
      
      // Cleanup interval on unmount or when inactive
      return () => clearInterval(intervalId);
    }
  }, [isActive, startTime]);
  
  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };
  
  if (!isActive) {
    return null;
  }
  
  return (
    <div className={`flex items-center space-x-1.5 ${className}`}>
      <Clock className="h-4 w-4" />
      <span>{formatTime(elapsedTime)}</span>
    </div>
  );
};

export default CountdownTimer;
