
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
import { generateBranding } from '@/services/brandingService';
import type { Theme } from '@/services/brandingService';

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

  // Initialize the form
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
    // Find the theme
    const theme = generatedItems.themes.find(t => t.id === themeId);
    if (!theme) return;

    // Here you would actually apply the theme to your application
    // For now, we'll just show a toast
    toast({
      title: "Theme Applied",
      description: `The ${theme.name} theme has been applied to your dashboard.`,
    });
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
    <React.Fragment>
      <Helmet>
        <title>AI Branding Generator | MetaStream</title>
      </Helmet>
      <DashboardLayout>
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
            {/* Prompt Input Section */}
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

            {/* Generated Content Display */}
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
    </React.Fragment>
  );
};

export default Branding;
