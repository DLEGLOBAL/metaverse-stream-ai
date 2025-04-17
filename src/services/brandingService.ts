
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Base URL for Supabase functions
const FUNCTION_BASE_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'https://dvqzltgyrrndyrndmclb.supabase.co/functions/v1';

export interface ThemeColor {
  name: string;
  value: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColor[];
}

export interface GenerateResponse {
  logos?: string[];
  themes?: Theme[];
  images?: string[];
}

export const generateBranding = async (
  prompt: string, 
  type: 'logo' | 'theme' | 'image'
): Promise<GenerateResponse> => {
  try {
    console.log(`Generating ${type} with prompt: ${prompt}`);

    // Fallback to mock data if we're in development or if the function fails
    const useMockData = import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_DATA === 'true';
    
    if (useMockData) {
      console.log('Using mock data for branding generation');
      return getMockData(type);
    }

    // Try using Supabase client first (preferred method)
    try {
      const { data, error } = await supabase.functions.invoke('generate-branding', {
        body: {
          prompt,
          type: type === 'logo' ? 'image' : type,
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      console.log(`Generated ${type} successfully via Supabase client:`, data);
      return processResponse(data, type);
    } catch (supabaseError) {
      console.warn('Supabase client invocation failed, falling back to fetch:', supabaseError);
      
      // Fallback to direct fetch if Supabase client fails
      const response = await fetch(`${FUNCTION_BASE_URL}/generate-branding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          type: type === 'logo' ? 'image' : type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from generate-branding:', errorData);
        throw new Error(errorData.error || `Failed to generate ${type}`);
      }

      const data = await response.json();
      console.log(`Generated ${type} successfully via fetch:`, data);
      return processResponse(data, type);
    }
  } catch (error) {
    console.error('Error generating branding:', error);
    toast({
      title: 'Generation Failed',
      description: error instanceof Error ? error.message : 'Failed to generate content. Please try again later.',
      variant: 'destructive',
    });
    
    // Return mock data as fallback when generation fails
    console.log('Returning mock data due to failure');
    return getMockData(type);
  }
};

// Helper function to process the response based on the type
const processResponse = (data: any, type: 'logo' | 'theme' | 'image'): GenerateResponse => {
  if (type === 'logo') {
    // For logos, we'll generate 4 variations
    const baseImage = data.image;
    // In a real implementation, we'd generate multiple images or variations
    return { logos: [baseImage, baseImage, baseImage, baseImage] };
  } else if (type === 'theme') {
    return { themes: data.themes };
  } else if (type === 'image') {
    // For images, generate 4 images (2 banners, 2 profile pics)
    const baseImage = data.image;
    // In a real implementation, we'd generate multiple images 
    return { images: [baseImage, baseImage, baseImage, baseImage] };
  }
  return {};
};

// Helper function to generate mock data for testing and fallback
const getMockData = (type: 'logo' | 'theme' | 'image'): GenerateResponse => {
  const mockImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzMzNjZGRiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5NZXRhU3RyZWFtPC90ZXh0Pjwvc3ZnPg==';
  
  if (type === 'logo') {
    return { logos: [mockImage, mockImage, mockImage, mockImage] };
  } else if (type === 'theme') {
    return { 
      themes: [
        {
          id: "theme-mock-1",
          name: "MetaStream Primary",
          colors: [
            { name: "primary", value: "#3B82F6" },
            { name: "secondary", value: "#1D4ED8" },
            { name: "accent", value: "#F59E0B" },
            { name: "background", value: "#1E293B" },
            { name: "text", value: "#F8FAFC" }
          ]
        },
        {
          id: "theme-mock-2",
          name: "MetaStream Vibrant",
          colors: [
            { name: "primary", value: "#8B5CF6" },
            { name: "secondary", value: "#7C3AED" },
            { name: "accent", value: "#EC4899" },
            { name: "background", value: "#18181B" },
            { name: "text", value: "#F9FAFB" }
          ]
        },
        {
          id: "theme-mock-3",
          name: "MetaStream Subtle",
          colors: [
            { name: "primary", value: "#10B981" },
            { name: "secondary", value: "#059669" },
            { name: "accent", value: "#6366F1" },
            { name: "background", value: "#F8FAFC" },
            { name: "text", value: "#1E293B" }
          ]
        }
      ] 
    };
  } else if (type === 'image') {
    return { images: [mockImage, mockImage, mockImage, mockImage] };
  }
  
  return {};
};
