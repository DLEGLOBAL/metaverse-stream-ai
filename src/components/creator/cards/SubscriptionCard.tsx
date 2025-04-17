
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export interface SubscriptionCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  yearlyDiscount: number;
  features: string[];
  onSubscribe: () => void;
  highlighted: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  icon,
  description,
  price,
  billingCycle,
  yearlyDiscount,
  features,
  onSubscribe,
  highlighted
}) => {
  return (
    <div className={`rounded-lg overflow-hidden border ${
      highlighted 
        ? 'border-meta-teal shadow-lg shadow-meta-teal/20 scale-105' 
        : 'border-gray-700'
    } transition-all`}>
      <div className={`p-6 ${highlighted ? 'bg-gradient-to-b from-meta-teal/20 to-transparent' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`p-2 rounded-full ${
            highlighted ? 'bg-meta-teal/20 text-meta-teal' : 'bg-gray-800 text-gray-400'
          }`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {highlighted && (
            <Badge className="ml-auto bg-meta-teal/20 text-meta-teal">Popular</Badge>
          )}
        </div>
        
        <p className="text-gray-400 mb-4">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${price.toFixed(2)}</span>
            <span className="text-gray-400 ml-2">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
          </div>
          {billingCycle === 'yearly' && (
            <p className="text-meta-teal text-sm mt-1">Save {yearlyDiscount}% with annual billing</p>
          )}
        </div>
        
        <Button 
          className={`w-full ${
            highlighted 
              ? 'bg-meta-teal hover:bg-meta-teal/90 text-meta-dark-blue' 
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
          onClick={onSubscribe}
        >
          Subscribe Now
        </Button>
      </div>
      
      <div className="p-6 border-t border-gray-700">
        <h4 className="font-medium mb-4">What's included:</h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`h-4 w-4 mr-2 mt-1 ${
                highlighted ? 'text-meta-teal' : 'text-gray-400'
              }`} />
              <span className="text-sm text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionCard;
