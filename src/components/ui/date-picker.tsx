
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

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  showTimeInput?: boolean;
  timeValue?: string;
  onTimeChange?: (time: string) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

export function DatePicker({
  date,
  onDateChange,
  className,
  placeholder = "Pick a date",
  showTimeInput = false,
  timeValue = "",
  onTimeChange,
  minDate,
  maxDate,
  disabled = false,
}: DatePickerProps) {
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
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          className="pointer-events-auto"
          disabled={(calendarDate) => {
            if (minDate && calendarDate < minDate) return true;
            if (maxDate && calendarDate > maxDate) return true;
            return false;
          }}
        />
        
        {showTimeInput && (
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <Input
                type="time"
                value={timeValue}
                onChange={(e) => onTimeChange?.(e.target.value)}
                className="w-full"
                disabled={disabled}
              />
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
