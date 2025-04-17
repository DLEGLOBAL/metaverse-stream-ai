
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandingPromptForm, formSchema } from '@/components/branding/BrandingPromptForm';
import BrandingContentDisplay from '@/components/branding/BrandingContentDisplay';
import type { BrandingFormValues } from '@/components/branding/BrandingPromptForm';
import { generateBranding, Theme } from '@/services/branding/brandingService';
import { useCustomTheme } from '@/contexts/theme/CustomThemeContext';

const Branding = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('logo');
  const [generatedItems, setGeneratedItems] = useState<{
    logos: string[];
    themes: Theme[];
    images: string[];
  }>({
    logos: [],
    themes: [],
    images: []
  });

  // Import the CustomTheme context to properly apply themes
  const { addCustomTheme, applyCustomTheme } = useCustomTheme();

  const form = useForm<BrandingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (data: BrandingFormValues) => {
    setIsGenerating(true);
    
    try {
      if (activeTab === 'logo') {
        const result = await generateBranding(data.prompt, 'logo');
        if (result.logos) {
          setGeneratedItems(prev => ({ ...prev, logos: result.logos }));
        }
      } else if (activeTab === 'theme') {
        const result = await generateBranding(data.prompt, 'theme');
        if (result.themes) {
          setGeneratedItems(prev => ({ ...prev, themes: result.themes }));
        }
      } else if (activeTab === 'images') {
        const result = await generateBranding(data.prompt, 'image');
        if (result.images) {
          setGeneratedItems(prev => ({ ...prev, images: result.images }));
        }
      }

      toast({
        title: "Content Generated",
        description: `Your ${activeTab === 'logo' ? 'logos' : activeTab === 'theme' ? 'themes' : 'images'} have been generated based on your prompt!`,
      });
    } catch (error) {
      // Error handling is done in the service
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyTheme = (themeId: string) => {
    const theme = generatedItems.themes.find(t => t.id === themeId);
    if (!theme) return;
    
    console.log("Applying theme:", theme.name);

    // Convert the generated theme to a custom theme format
    const customThemeId = addCustomTheme({
      name: theme.name,
      description: `Generated from prompt: "${form.getValues().prompt}"`,
      isDark: true, // Default to dark theme for generated themes
      colors: {
        background: theme.colors.find(c => c.name === 'background')?.value || '#1a2b4b',
        foreground: theme.colors.find(c => c.name === 'text')?.value || '#f8fafc',
        primary: theme.colors.find(c => c.name === 'primary')?.value || '#0CFFE1',
        secondary: theme.colors.find(c => c.name === 'secondary')?.value || '#2d3748',
        accent: theme.colors.find(c => c.name === 'accent')?.value || '#0CFFE1',
        muted: '#4a5568',
        border: '#2d3748',
      }
    });

    // Apply the newly created custom theme
    if (customThemeId) {
      console.log("Applying custom theme with ID:", customThemeId);
      applyCustomTheme(customThemeId);
      
      toast({
        title: "Theme Applied",
        description: `The ${theme.name} theme has been added to your custom themes and applied.`,
      });
    }
  };

  const handleDownload = (type: string) => {
    toast({
      title: `${type} Downloaded`,
      description: `Your ${type.toLowerCase()} has been downloaded successfully.`,
    });
  };

  const handleDeleteItem = (type: string) => {
    toast({
      title: `${type} Removed`,
      description: `The ${type.toLowerCase()} has been removed.`,
    });
  };

  const generatePromptSuggestion = () => {
    const suggestions = [
      "A futuristic gaming logo with neon colors for a cyberpunk stream",
      "A minimalist esports team logo with blue and white color scheme",
      "A bold, fantasy-themed streaming brand with medieval elements",
      "A retro arcade-inspired design with pixel art for my gaming channel",
      "A space-themed streaming brand with cosmic colors and star elements"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    form.setValue('prompt', randomSuggestion);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>AI Branding Generator | MetaStream</title>
      </Helmet>
      <div className="flex flex-col gap-6 p-6">
        <div className="rounded-lg bg-gradient-to-r from-meta-dark-blue to-meta-purple p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">AI Branding Generator</h1>
                <Sparkles className="h-6 w-6 text-meta-teal" />
              </div>
              <p className="mt-2 text-lg opacity-90">
                Create your perfect streaming brand with AI-generated logos, themes, and images.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Generate Your Brand</CardTitle>
              <CardDescription>
                Describe what you want and our AI will create options for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BrandingPromptForm 
                form={form}
                onSubmit={onSubmit}
                isGenerating={isGenerating}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                generatePromptSuggestion={generatePromptSuggestion}
              />
            </CardContent>
          </Card>

          <BrandingContentDisplay 
            activeTab={activeTab}
            generatedItems={generatedItems}
            onDownload={handleDownload}
            onDelete={handleDeleteItem}
            onApplyTheme={handleApplyTheme}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Branding;
