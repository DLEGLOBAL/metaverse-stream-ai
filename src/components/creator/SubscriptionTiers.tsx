
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, BadgeCheck, BarChart4, Shield, Users, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

// Add the missing SubscriptionCard component
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        
        <div className="mt-12 mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            MetaStars Creator Plans
          </h2>
          <p className="text-gray-400 mt-2">
            Exclusive plans for professional content creators. All plans include the same premium features with flexible payment options.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Annual Plan */}
          <div className="rounded-lg overflow-hidden border border-yellow-500/30 bg-gradient-to-b from-yellow-950/20 to-transparent">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-full bg-yellow-500/10 text-yellow-400">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">Annual Plan</h3>
              </div>
              
              <p className="text-gray-400 mb-4">Best value annual payment</p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">$1,500</span>
                  <span className="text-gray-400 ml-2">/year</span>
                </div>
                <p className="text-yellow-400 text-sm mt-1">Save with one annual payment</p>
              </div>
              
              <Button 
                className="w-full bg-yellow-500/20 border border-yellow-500/30 hover:bg-yellow-500/30 text-yellow-400"
                onClick={() => handleSubscribe("MetaStars Annual")}
              >
                Subscribe Annually
              </Button>
            </div>
            
            <MetaStarsFeatures />
          </div>
          
          {/* Bi-Annual Plan */}
          <div className="rounded-lg overflow-hidden border border-yellow-500/30 bg-gradient-to-b from-yellow-950/20 to-transparent">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-full bg-yellow-500/10 text-yellow-400">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">Bi-Annual Plan</h3>
              </div>
              
              <p className="text-gray-400 mb-4">Two convenient payments</p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">$750</span>
                  <span className="text-gray-400 ml-2">/6 months</span>
                </div>
                <p className="text-yellow-400 text-sm mt-1">Two payments of $750</p>
              </div>
              
              <Button 
                className="w-full bg-yellow-500/20 border border-yellow-500/30 hover:bg-yellow-500/30 text-yellow-400"
                onClick={() => handleSubscribe("MetaStars Bi-Annual")}
              >
                Subscribe Bi-Annually
              </Button>
            </div>
            
            <MetaStarsFeatures />
          </div>
          
          {/* Monthly Plan */}
          <div className="rounded-lg overflow-hidden border border-yellow-500/30 bg-gradient-to-b from-yellow-950/20 to-transparent">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-full bg-yellow-500/10 text-yellow-400">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">Monthly Plan</h3>
              </div>
              
              <p className="text-gray-400 mb-4">Flexible monthly payments</p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">$125</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-yellow-400 text-sm mt-1">12 monthly payments</p>
              </div>
              
              <Button 
                className="w-full bg-yellow-500/20 border border-yellow-500/30 hover:bg-yellow-500/30 text-yellow-400"
                onClick={() => handleSubscribe("MetaStars Monthly")}
              >
                Subscribe Monthly
              </Button>
            </div>
            
            <MetaStarsFeatures />
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>All plans include our core streaming features and platform updates.</p>
          <p className="mt-1">Need a custom solution? <a href="#" className="text-meta-teal hover:underline">Contact our sales team</a>.</p>
        </div>
      </CardContent>
    </Card>
  );
};

const MetaStarsFeatures = () => {
  return (
    <div className="p-6 border-t border-yellow-500/20 bg-yellow-950/10">
      <h4 className="font-medium mb-4">Premium creator features:</h4>
      <ul className="space-y-3">
        {[
          "Priority stream processing",
          "Dedicated success manager",
          "Custom branding options",
          "Advanced analytics suite",
          "Premium support SLA",
          "Multi-platform streaming",
          "VR content creation tools",
          "AI-powered scene optimization",
          "Exclusive creator community access"
        ].map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-4 w-4 mr-2 mt-1 text-yellow-400" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionTiers;
