
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

export function DateTimePicker({
  date,
  onDateChange,
  className,
  placeholder = "Select date and time",
  minDate,
  maxDate,
  disabled = false,
}: DateTimePickerProps) {
  // Initialize the time state with the current date's time or current time
  const [timeValue, setTimeValue] = React.useState<string>(() => {
    if (date) {
      return `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;
    }
    return "";
  });

  // Update the time when the date changes
  React.useEffect(() => {
    if (date) {
      setTimeValue(
        `${String(date.getHours()).padStart(2, "0")}:${String(
          date.getMinutes()
        ).padStart(2, "0")}`
      );
    }
  }, [date]);

  // Handle time change
  const handleTimeChange = (time: string) => {
    setTimeValue(time);
    
    if (!date) return;
    
    const newDate = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    
    onDateChange(newDate);
  };

  // Handle date change
  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) {
      onDateChange(undefined);
      return;
    }
    
    // If we have a time value, apply it to the new date
    if (timeValue) {
      const [hours, minutes] = timeValue.split(":").map(Number);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
    }
    
    onDateChange(newDate);
  };

  // Format the display value for the button
  const formatDisplayValue = () => {
    if (!date) return placeholder;
    
    const dateFormat = timeValue ? "PPP 'at' p" : "PPP";
    return format(date, dateFormat);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left",
            !date && "text-gray-500",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="flex-grow truncate">{formatDisplayValue()}</span>
            {date && <Clock className="ml-2 h-4 w-4 opacity-70" />}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          className="pointer-events-auto"
          disabled={(calendarDate) => {
            if (minDate && calendarDate < minDate) return true;
            if (maxDate && calendarDate > maxDate) return true;
            return false;
          }}
        />
        
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <Input
              type="time"
              value={timeValue}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-full"
              disabled={disabled || !date}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
