
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

const Branding = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('logo');
  const [generatedItems, setGeneratedItems] = useState<{
    logos: string[];
    themes: {id: string, name: string, colors: {name: string, value: string}[]}[];
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
      // Simulate generation with mock data
      // In a real implementation, you would call an API to generate content
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (activeTab === 'logo') {
        const mockLogos = [
          'https://via.placeholder.com/300x300.png?text=AI+Generated+Logo+1',
          'https://via.placeholder.com/300x300.png?text=AI+Generated+Logo+2',
          'https://via.placeholder.com/300x300.png?text=AI+Generated+Logo+3',
          'https://via.placeholder.com/300x300.png?text=AI+Generated+Logo+4',
        ];
        setGeneratedItems(prev => ({ ...prev, logos: mockLogos }));
      } else if (activeTab === 'theme') {
        const mockThemes = [
          {
            id: 'theme1',
            name: 'Neon Future',
            colors: [
              { name: 'primary', value: '#0CFFE1' },
              { name: 'secondary', value: '#8B5CF6' },
              { name: 'accent', value: '#F97316' },
              { name: 'background', value: '#1a2b4b' },
              { name: 'text', value: '#FFFFFF' }
            ]
          },
          {
            id: 'theme2',
            name: 'Retro Wave',
            colors: [
              { name: 'primary', value: '#FF2E63' },
              { name: 'secondary', value: '#252A34' },
              { name: 'accent', value: '#08D9D6' },
              { name: 'background', value: '#221F26' },
              { name: 'text', value: '#EAEAEA' }
            ]
          },
          {
            id: 'theme3',
            name: 'Forest Gaming',
            colors: [
              { name: 'primary', value: '#3EC70B' },
              { name: 'secondary', value: '#2D4263' },
              { name: 'accent', value: '#FFDD93' },
              { name: 'background', value: '#0F3460' },
              { name: 'text', value: '#E6E6E6' }
            ]
          }
        ];
        setGeneratedItems(prev => ({ ...prev, themes: mockThemes }));
      } else if (activeTab === 'images') {
        const mockImages = [
          'https://via.placeholder.com/600x300.png?text=Banner+1',
          'https://via.placeholder.com/600x300.png?text=Banner+2',
          'https://via.placeholder.com/300x300.png?text=Profile+Pic+1',
          'https://via.placeholder.com/300x300.png?text=Profile+Pic+2',
        ];
        setGeneratedItems(prev => ({ ...prev, images: mockImages }));
      }

      toast({
        title: "Content Generated",
        description: `Your ${activeTab === 'logo' ? 'logos' : activeTab === 'theme' ? 'themes' : 'images'} have been generated based on your prompt!`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyTheme = (themeId: string) => {
    toast({
      title: "Theme Applied",
      description: "The selected theme has been applied to your dashboard.",
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
    <>
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
    </>
  );
};

export default Branding;
