
import React from 'react';
import { Card } from '@/components/ui/card';

const CreatorCTA = () => {
  return (
    <Card className="w-full overflow-hidden">
      <div className="bg-feature-gradient text-white p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Ready to take your streaming to the next level?</h2>
            <p className="opacity-90">
              Apply to join our exclusive creator network today and unlock premium features, 
              training resources, and monetization opportunities.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white hover:bg-white/90 text-meta-dark-blue transition-colors px-6 py-3 rounded-lg font-semibold">
              Apply Now
            </button>
            <button className="border border-white text-white hover:bg-white/10 transition-colors px-6 py-3 rounded-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreatorCTA;
