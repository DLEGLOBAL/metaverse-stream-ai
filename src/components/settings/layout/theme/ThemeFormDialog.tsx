
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ThemeColorPicker } from './ThemeColorPicker';
import { UseFormReturn } from 'react-hook-form';

interface ThemeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<any>;
  title: string;
  description: string;
  onSubmit: (data: any) => void;
}

export const ThemeFormDialog = ({ 
  open, 
  onOpenChange, 
  form, 
  title, 
  description, 
  onSubmit 
}: ThemeFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-meta-dark-blue text-white border border-meta-teal/30">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Custom Theme" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="A brief description of your theme" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isDark"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Dark Mode</FormLabel>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="toggle"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-sm font-medium mb-3">Color Palette</h4>
              
              <div className="space-y-2">
                <ThemeColorPicker name="background" label="Background" form={form} defaultValue="#1a2b4b" />
                <ThemeColorPicker name="foreground" label="Foreground" form={form} defaultValue="#f8fafc" />
                <ThemeColorPicker name="primary" label="Primary" form={form} defaultValue="#0CFFE1" />
                <ThemeColorPicker name="secondary" label="Secondary" form={form} defaultValue="#2d3748" />
                <ThemeColorPicker name="accent" label="Accent" form={form} defaultValue="#0CFFE1" />
                <ThemeColorPicker name="muted" label="Muted" form={form} defaultValue="#4a5568" />
                <ThemeColorPicker name="border" label="Border" form={form} defaultValue="#2d3748" />
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                type="submit" 
                className="bg-meta-teal text-meta-dark-blue hover:bg-meta-teal/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Theme
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
