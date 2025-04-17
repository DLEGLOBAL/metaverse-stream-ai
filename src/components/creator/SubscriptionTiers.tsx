
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Star, Crown, BarChart4, Shield, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import SubscriptionCard from './cards/SubscriptionCard';
import MetaStarsCard from './cards/MetaStarsCard';

const SubscriptionTiers = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();
  
  const handleToggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly');
    toast({
      title: `${billingCycle === 'monthly' ? 'Yearly' : 'Monthly'} billing selected`,
      description: `You'll now see ${billingCycle === 'monthly' ? 'yearly' : 'monthly'} subscription prices.`,
    });
  };
  
  const handleSubscribe = (planName: string) => {
    navigate(`/dashboard/checkout?plan=${planName}&cycle=${billingCycle}`);
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
            highlighted={false}
          />
          
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
            highlighted={true}
          />
          
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
          <MetaStarsCard
            title="Annual Plan"
            description="Best value annual payment"
            price="$1,500"
            period="year"
            additionalInfo="Save with one annual payment"
            onSubscribe={() => handleSubscribe("MetaStars Annual")}
          />
          
          <MetaStarsCard
            title="Bi-Annual Plan"
            description="Two convenient payments"
            price="$750"
            period="6 months"
            additionalInfo="Two payments of $750"
            onSubscribe={() => handleSubscribe("MetaStars Bi-Annual")}
          />
          
          <MetaStarsCard
            title="Monthly Plan"
            description="Flexible monthly payments"
            price="$125"
            period="month"
            additionalInfo="12 monthly payments"
            onSubscribe={() => handleSubscribe("MetaStars Monthly")}
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

export default SubscriptionTiers;
