
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

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
    <Card className="border-gray-700 hover:border-meta-teal/50 transition-colors overflow-hidden">
      <div className="bg-gradient-to-r from-meta-purple to-meta-dark-blue/80 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="h-5 w-5 text-yellow-400" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
      <CardContent className="p-6">
        <div className="mb-6 text-center">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-gray-400 ml-2">/{period}</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">{additionalInfo}</p>
        </div>
        
        <Button 
          className="w-full bg-button-gradient text-meta-dark-blue hover:brightness-110"
          onClick={onSubscribe}
        >
          Subscribe Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default MetaStarsCard;
