
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Award } from 'lucide-react';

const CreatorTiers = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-meta-teal" />
          Creator Tiers
        </CardTitle>
        <CardDescription>
          Unlock more benefits as you grow your audience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TierCard 
          title="Rising Star"
          icon={<TrendingUp className="h-5 w-5" />}
          requirements="50-500 followers"
          benefits={["Basic analytics", "Community access", "Stream templates"]}
          active={true}
        />
        
        <TierCard 
          title="Established Creator"
          icon={<Star className="h-5 w-5" />}
          requirements="500-5,000 followers"
          benefits={["Advanced analytics", "Priority support", "Monetization tools"]}
          active={false}
        />
        
        <TierCard 
          title="Elite Partner"
          icon={<Award className="h-5 w-5" />}
          requirements="5,000+ followers"
          benefits={["Revenue sharing", "Exclusive features", "Marketing opportunities"]}
          active={false}
        />
      </CardContent>
    </Card>
  );
};

interface TierCardProps {
  title: string;
  icon: React.ReactNode;
  requirements: string;
  benefits: string[];
  active: boolean;
}

const TierCard = ({ title, icon, requirements, benefits, active }: TierCardProps) => (
  <div className={`border rounded-lg p-4 ${active ? 'border-meta-teal bg-sidebar-accent/10' : 'border-border'}`}>
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${active ? 'bg-meta-teal/20 text-meta-teal' : 'bg-muted text-muted-foreground'}`}>
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {active && <Badge className="bg-meta-teal text-meta-dark-blue">Current Tier</Badge>}
    </div>
    <p className="text-sm text-muted-foreground mb-2">{requirements}</p>
    <ul className="space-y-1">
      {benefits.map((benefit, index) => (
        <li key={index} className="text-sm flex items-center gap-2">
          <span className="text-meta-teal">•</span> {benefit}
        </li>
      ))}
    </ul>
  </div>
);

export default CreatorTiers;
