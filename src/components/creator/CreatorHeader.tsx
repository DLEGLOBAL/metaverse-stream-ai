
import React from 'react';
import { Star, Users, Award } from 'lucide-react';

const CreatorHeader = () => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-meta-dark-blue to-meta-purple p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Star className="h-8 w-8 text-meta-cyan" /> 
            MetaStars Creator Network
          </h1>
          <p className="mt-2 text-lg opacity-90">
            Join our exclusive network of content creators and get access to special features, training programs, and monetization opportunities.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-meta-teal" />
              <span>5,000+ Creators</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-meta-teal" />
              <span>Premium Benefits</span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button className="bg-button-gradient hover:opacity-90 transition-opacity text-meta-dark-blue font-semibold px-6 py-3 rounded-lg">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorHeader;
