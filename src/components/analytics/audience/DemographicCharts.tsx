
import React from 'react';
import AgeDistributionChart from './AgeDistributionChart';
import GenderDistributionChart from './GenderDistributionChart';
import DeviceDistributionChart from './DeviceDistributionChart';

interface DemographicChartsProps {
  ageGroups: {
    name: string;
    value: number;
  }[];
  genderDistribution: {
    name: string;
    value: number;
  }[];
  deviceData: {
    name: string;
    value: number;
  }[];
}

const DemographicCharts = ({ ageGroups, genderDistribution, deviceData }: DemographicChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <AgeDistributionChart ageGroups={ageGroups} />
      <GenderDistributionChart genderDistribution={genderDistribution} />
      <DeviceDistributionChart deviceData={deviceData} />
    </div>
  );
};

export default DemographicCharts;
