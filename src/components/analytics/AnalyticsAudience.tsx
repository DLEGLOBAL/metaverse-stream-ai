
import React from 'react';
import { getAudienceData } from '@/services/analyticsService';
import DemographicCharts from './audience/DemographicCharts';
import ViewingPatternsCharts from './audience/ViewingPatternsCharts';
import LanguagesTable from './audience/LanguagesTable';

interface AnalyticsAudienceProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsAudience = ({ dateRange, activePlatform }: AnalyticsAudienceProps) => {
  // Get sample data
  const { 
    ageGroups, 
    genderDistribution, 
    locationData, 
    deviceData, 
    viewingHabits, 
    topLanguages 
  } = getAudienceData(dateRange, activePlatform);

  return (
    <div className="space-y-6">
      {/* Demographic Charts Section */}
      <DemographicCharts 
        ageGroups={ageGroups}
        genderDistribution={genderDistribution}
        deviceData={deviceData}
      />
      
      {/* Viewing Patterns Section */}
      <ViewingPatternsCharts 
        locationData={locationData}
        viewingHabits={viewingHabits}
      />
      
      {/* Languages Table Section */}
      <LanguagesTable topLanguages={topLanguages} />
    </div>
  );
};

export default AnalyticsAudience;
