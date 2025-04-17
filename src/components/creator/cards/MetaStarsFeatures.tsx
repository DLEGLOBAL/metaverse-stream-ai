
import React from 'react';
import { Check } from 'lucide-react';

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

export default MetaStarsFeatures;
