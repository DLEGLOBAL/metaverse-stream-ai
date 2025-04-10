
import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Define the form schema
const formSchema = z.object({
  prompt: z.string().min(3, {
    message: "Prompt must be at least 3 characters long",
  }),
});

export type BrandingFormValues = z.infer<typeof formSchema>;

interface BrandingPromptFormProps {
  form: UseFormReturn<BrandingFormValues>;
  onSubmit: (data: BrandingFormValues) => void;
  isGenerating: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  generatePromptSuggestion: () => void;
}

const BrandingPromptForm = ({
  form,
  onSubmit,
  isGenerating,
  activeTab,
  setActiveTab,
  generatePromptSuggestion
}: BrandingPromptFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Prompt</FormLabel>
              <div className="flex items-start gap-2">
                <FormControl>
                  <Input 
                    placeholder="E.g., A futuristic gaming logo for my Twitch stream" 
                    className="h-20 resize-none"
                    {...field} 
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={generatePromptSuggestion}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <FormDescription>
                Describe the style, colors, and elements you want to include.
              </FormDescription>
            </FormItem>
          )}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="logo">Logos</TabsTrigger>
            <TabsTrigger value="theme">Themes</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button 
          type="submit" 
          className="w-full bg-meta-teal hover:bg-meta-teal/90 text-meta-dark-blue"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export { BrandingPromptForm, formSchema };
