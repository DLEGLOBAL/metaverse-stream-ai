
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Download, Palette, Image, Loader2, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the form schema
const formSchema = z.object({
  prompt: z.string().min(3, {
    message: "Prompt must be at least 3 characters long",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Branding = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('logo');
  const [generatedItems, setGeneratedItems] = useState<{
    logos: string[];
    themes: {id: string, name: string, colors: {[key: string]: string}}[];
    images: string[];
  }>({
    logos: [],
    themes: [],
    images: []
  });

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
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
            colors: {
              primary: '#0CFFE1',
              secondary: '#8B5CF6',
              accent: '#F97316',
              background: '#1a2b4b',
              text: '#FFFFFF',
            }
          },
          {
            id: 'theme2',
            name: 'Retro Wave',
            colors: {
              primary: '#FF2E63',
              secondary: '#252A34',
              accent: '#08D9D6',
              background: '#221F26',
              text: '#EAEAEA',
            }
          },
          {
            id: 'theme3',
            name: 'Forest Gaming',
            colors: {
              primary: '#3EC70B',
              secondary: '#2D4263',
              accent: '#FFDD93',
              background: '#0F3460',
              text: '#E6E6E6',
            }
          },
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

  const handleDownload = (type: string, url?: string) => {
    toast({
      title: `${type} Downloaded`,
      description: `Your ${type.toLowerCase()} has been downloaded successfully.`,
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

                    <Tabs defaultValue="logo" value={activeTab} onValueChange={setActiveTab}>
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
              </CardContent>
            </Card>

            {/* Generated Content Display */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Your Brand Assets</CardTitle>
                <CardDescription>
                  {activeTab === 'logo' ? 'Select and download your perfect logo' : 
                   activeTab === 'theme' ? 'Choose a color theme for your brand' : 
                   'Download images for your stream and social media'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="logo" className="mt-0">
                  {generatedItems.logos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {generatedItems.logos.map((logo, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={logo} 
                            alt={`Generated Logo ${index + 1}`} 
                            className="w-full aspect-square object-cover rounded-md border border-border"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleDownload('Logo', logo)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 border border-dashed rounded-md">
                      <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        Your generated logos will appear here
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="theme" className="mt-0">
                  {generatedItems.themes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {generatedItems.themes.map((theme) => (
                        <div 
                          key={theme.id} 
                          className="border rounded-md p-4 hover:border-meta-teal transition-colors"
                        >
                          <h3 className="font-medium mb-2">{theme.name}</h3>
                          <div className="flex space-x-2 my-3">
                            {Object.entries(theme.colors).map(([key, color]) => (
                              <div 
                                key={key}
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: color }}
                                title={`${key}: ${color}`}
                              />
                            ))}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleApplyTheme(theme.id)}
                          >
                            <Palette className="h-4 w-4 mr-1" />
                            Apply Theme
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 border border-dashed rounded-md">
                      <Palette className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        Your generated themes will appear here
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="images" className="mt-0">
                  {generatedItems.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedItems.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image} 
                            alt={`Generated Image ${index + 1}`} 
                            className="w-full aspect-video object-cover rounded-md border border-border"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleDownload('Image', image)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 border border-dashed rounded-md">
                      <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        Your generated images will appear here
                      </p>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Branding;
