
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface ThemeColorPickerProps {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  defaultValue: string;
}

export const ThemeColorPicker = ({ 
  name, 
  label, 
  form, 
  defaultValue 
}: ThemeColorPickerProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="mb-3">
          <div className="flex items-center justify-between">
            <FormLabel className="text-sm font-medium text-gray-300">
              {label}
            </FormLabel>
            <div className="flex items-center space-x-2">
              <div 
                className="w-5 h-5 rounded-full border border-gray-600" 
                style={{ backgroundColor: field.value }}
              />
              <FormControl>
                <Input 
                  type="color" 
                  className="w-16 h-8 p-0 border-none bg-transparent" 
                  {...field} 
                />
              </FormControl>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
