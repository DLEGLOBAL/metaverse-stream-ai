
import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MetaStarsFeatures from './MetaStarsFeatures';

interface MetaStarsCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  additionalInfo: string;
  onSubscribe: () => void;
}

const MetaStarsCard: React.FC<MetaStarsCardProps> = ({
  title,
  description,
  price,
  period,
  additionalInfo,
  onSubscribe
}) => {
  return (
    <div className="rounded-lg overflow-hidden border border-yellow-500/30 bg-gradient-to-b from-yellow-950/20 to-transparent">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-full bg-yellow-500/10 text-yellow-400">
            <Star className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        
        <p className="text-gray-400 mb-4">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-gray-400 ml-2">/{period}</span>
          </div>
          <p className="text-yellow-400 text-sm mt-1">{additionalInfo}</p>
        </div>
        
        <Button 
          className="w-full bg-yellow-500/20 border border-yellow-500/30 hover:bg-yellow-500/30 text-yellow-400"
          onClick={onSubscribe}
        >
          Subscribe {title}
        </Button>
      </div>
      
      <MetaStarsFeatures />
    </div>
  );
};

export default MetaStarsCard;
