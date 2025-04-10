
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, RefreshCw } from 'lucide-react';

interface VideoHistoryProps {
  history: string[];
  currentIndex: number;
  onJumpTo: (index: number) => void;
}

const VideoHistory = ({ history, currentIndex, onJumpTo }: VideoHistoryProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Edit History</h3>
        <div className="text-xs text-gray-400">
          {history.length} actions
        </div>
      </div>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {history.map((action, index) => (
          <div 
            key={index}
            className={`p-2 rounded-md border ${
              index === currentIndex 
                ? 'border-meta-teal bg-meta-teal/10' 
                : 'border-gray-700 hover:bg-gray-800'
            } cursor-pointer transition-colors`}
            onClick={() => onJumpTo(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {index === 0 ? (
                  <Calendar className="h-4 w-4 text-gray-400" />
                ) : (
                  <Clock className="h-4 w-4 text-gray-400" />
                )}
                <span className={`text-sm ${index === currentIndex ? 'text-meta-teal' : ''}`}>
                  {action}
                </span>
              </div>
              {index === currentIndex && (
                <div className="text-xs px-1.5 py-0.5 rounded-full bg-meta-teal/20 text-meta-teal">
                  Current
                </div>
              )}
            </div>
            <div className="text-xs text-gray-400 mt-1 pl-6">
              {`${index === 0 ? 'Initial state' : `Action ${index}`}`}
            </div>
          </div>
        ))}
        
        {history.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <RefreshCw className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>No history recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoHistory;
