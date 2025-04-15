
import React from 'react';
import LocationChart from './LocationChart';
import ViewingHabitsChart from './ViewingHabitsChart';

interface ViewingPatternsChartsProps {
  locationData: {
    country: string;
    viewers: number;
  }[];
  viewingHabits: {
    hour: string;
    weekday: number;
    weekend: number;
  }[];
}

const ViewingPatternsCharts = ({ locationData, viewingHabits }: ViewingPatternsChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <LocationChart locationData={locationData} />
      <ViewingHabitsChart viewingHabits={viewingHabits} />
    </div>
  );
};

export default ViewingPatternsCharts;
