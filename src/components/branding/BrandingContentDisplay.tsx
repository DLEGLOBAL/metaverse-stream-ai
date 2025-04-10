
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LogoDisplaySection from '@/components/branding/LogoDisplaySection';
import ThemeDisplaySection from '@/components/branding/ThemeDisplaySection';
import ImageDisplaySection from '@/components/branding/ImageDisplaySection';

interface ThemeColor {
  name: string;
  value: string;
}

interface Theme {
  id: string;
  name: string;
  colors: ThemeColor[];
}

interface BrandingContentDisplayProps {
  activeTab: string;
  generatedItems: {
    logos: string[];
    themes: Theme[];
    images: string[];
  };
  onDownload: (type: string) => void;
  onDelete: (type: string) => void;
  onApplyTheme: (themeId: string) => void;
}

const BrandingContentDisplay = ({
  activeTab,
  generatedItems,
  onDownload,
  onDelete,
  onApplyTheme
}: BrandingContentDisplayProps) => {
  return (
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
        <Tabs value={activeTab}>
          <TabsList className="hidden">
            <TabsTrigger value="logo">Logos</TabsTrigger>
            <TabsTrigger value="theme">Themes</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>
          
          <TabsContent value="logo" className="mt-0">
            <LogoDisplaySection 
              logos={generatedItems.logos} 
              onDownload={onDownload} 
              onDelete={onDelete} 
            />
          </TabsContent>

          <TabsContent value="theme" className="mt-0">
            <ThemeDisplaySection 
              themes={generatedItems.themes} 
              onApply={onApplyTheme} 
            />
          </TabsContent>

          <TabsContent value="images" className="mt-0">
            <ImageDisplaySection 
              images={generatedItems.images} 
              onDownload={onDownload} 
              onDelete={onDelete} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BrandingContentDisplay;
