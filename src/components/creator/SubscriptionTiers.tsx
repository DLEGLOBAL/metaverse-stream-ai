
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, BadgeCheck, BarChart4, Shield, Users } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const SubscriptionTiers = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const handleToggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly');
    toast({
      title: `${billingCycle === 'monthly' ? 'Yearly' : 'Monthly'} billing selected`,
      description: `You'll now see ${billingCycle === 'monthly' ? 'yearly' : 'monthly'} subscription prices.`,
    });
  };
  
  const handleSubscribe = (tier: string) => {
    toast({
      title: "Subscription processing",
      description: `You are subscribing to the ${tier} plan. This feature will be fully implemented soon.`,
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-meta-teal" />
              Subscription Plans
            </CardTitle>
            <CardDescription>
              Choose the perfect plan for your streaming needs
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <Switch 
              checked={billingCycle === 'yearly'} 
              onCheckedChange={handleToggleBillingCycle}
            />
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              Yearly <Badge className="ml-1 bg-meta-teal/20 text-meta-teal">Save 16%</Badge>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <SubscriptionCard
            title="Starter"
            icon={<Star className="h-5 w-5" />}
            description="Perfect for beginners building their audience"
            price={billingCycle === 'monthly' ? 9.99 : 99.99}
            billingCycle={billingCycle}
            yearlyDiscount={20}
            features={[
              "Basic AI scene management",
              "720p streaming quality",
              "2 custom stream templates",
              "Community support",
              "Basic analytics"
            ]}
            onSubscribe={() => handleSubscribe("Starter")}
            highlighted={false}
          />
          
          {/* Professional Plan */}
          <SubscriptionCard
            title="Professional"
            icon={<BarChart4 className="h-5 w-5" />}
            description="For growing streamers seeking more features"
            price={billingCycle === 'monthly' ? 19.99 : 199.99}
            billingCycle={billingCycle}
            yearlyDiscount={16}
            features={[
              "Advanced AI scene optimization",
              "1080p streaming quality",
              "10 custom stream templates",
              "Priority email support",
              "Enhanced analytics",
              "Multi-platform streaming",
              "VR content creation tools"
            ]}
            onSubscribe={() => handleSubscribe("Professional")}
            highlighted={true}
          />
          
          {/* Enterprise Plan */}
          <SubscriptionCard
            title="Enterprise"
            icon={<Shield className="h-5 w-5" />}
            description="For serious content creators and teams"
            price={billingCycle === 'monthly' ? 29.99 : 299.99}
            billingCycle={billingCycle}
            yearlyDiscount={16}
            features={[
              "Premium AI-powered tools",
              "4K streaming quality",
              "Unlimited custom templates",
              "24/7 dedicated support",
              "Advanced analytics & reports",
              "Multi-user access",
              "Custom branding options",
              "Exclusive early feature access",
              "API access for extensions"
            ]}
            onSubscribe={() => handleSubscribe("Enterprise")}
            highlighted={false}
          />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>All plans include our core streaming features and platform updates.</p>
          <p className="mt-1">Need a custom solution? <a href="#" className="text-meta-teal hover:underline">Contact our sales team</a>.</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface SubscriptionCardProps {
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

const SubscriptionCard = ({ 
  title, 
  icon, 
  description, 
  price, 
  billingCycle, 
  yearlyDiscount, 
  features, 
  onSubscribe,
  highlighted
}: SubscriptionCardProps) => {
  return (
    <div className={`
      rounded-lg overflow-hidden border 
      ${highlighted 
        ? 'border-meta-teal shadow-lg shadow-meta-teal/10 relative' 
        : 'border-gray-700'
      }
    `}>
      {highlighted && (
        <div className="absolute top-0 right-0 bg-meta-teal text-meta-dark-blue text-xs font-semibold px-3 py-1 rounded-bl-lg">
          Popular
        </div>
      )}
      
      <div className={`p-6 ${highlighted ? 'bg-meta-teal/10' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`p-2 rounded-full ${highlighted ? 'bg-meta-teal/20 text-meta-teal' : 'bg-gray-800 text-gray-300'}`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        
        <p className="text-gray-400 mb-4 min-h-[40px]">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${price.toFixed(2)}</span>
            <span className="text-gray-400 ml-2">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
          </div>
          
          {billingCycle === 'yearly' && (
            <p className="text-meta-teal text-sm mt-1">
              Save ${(price * (yearlyDiscount/100)).toFixed(2)} ({yearlyDiscount}% off)
            </p>
          )}
        </div>
        
        <Button 
          className={`w-full ${highlighted 
            ? 'bg-button-gradient text-meta-dark-blue hover:brightness-110' 
            : 'bg-meta-dark-blue border border-meta-teal/30 hover:bg-meta-teal/10 text-white'
          }`}
          onClick={onSubscribe}
        >
          Subscribe Now
        </Button>
      </div>
      
      <div className="p-6 border-t border-gray-700 bg-gray-900/30">
        <h4 className="font-medium mb-4">What's included:</h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`h-4 w-4 mr-2 mt-1 ${highlighted ? 'text-meta-teal' : 'text-gray-400'}`} />
              <span className="text-sm text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionTiers;
