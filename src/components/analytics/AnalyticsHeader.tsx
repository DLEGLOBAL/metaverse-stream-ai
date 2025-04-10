
import React from 'react';
import { Calendar, ChevronDown, Filter, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AnalyticsHeaderProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  setDateRange: (range: {from: Date | undefined; to: Date | undefined}) => void;
  activePlatform: string;
  setActivePlatform: (platform: string) => void;
}

const AnalyticsHeader = ({ dateRange, setDateRange, activePlatform, setActivePlatform }: AnalyticsHeaderProps) => {
  // Predefined date range options
  const setDateRangeOption = (days: number) => {
    setDateRange({
      from: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      to: new Date()
    });
  };

  return (
    <div className="rounded-lg bg-gradient-to-r from-meta-dark-blue to-meta-purple p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Stream Analytics</h1>
            <BarChart2 className="h-6 w-6 text-meta-teal" />
          </div>
          <p className="mt-2 text-lg opacity-90">
            Track your performance across all streaming platforms in one place
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-end">
          {/* Platform Filter */}
          <Select value={activePlatform} onValueChange={setActivePlatform}>
            <SelectTrigger className="w-[160px] bg-meta-dark-blue/60 border-meta-teal/20">
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitch">Twitch</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-meta-dark-blue/60 border-meta-teal/20">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd")
                  )
                ) : (
                  "Select date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 border-b">
                <div className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDateRangeOption(7)}
                  >
                    Last Week
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDateRangeOption(30)}
                  >
                    Last Month
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDateRangeOption(90)}
                  >
                    Last 3 Months
                  </Button>
                </div>
              </div>
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({
                      from: range.from,
                      to: range.to,
                    });
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          
          {/* Export Button */}
          <Button className="bg-meta-teal text-meta-dark-blue hover:bg-meta-teal/90">
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
