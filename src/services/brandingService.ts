
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
    
    // Only use mock data in development if VITE_USE_MOCK_DATA is explicitly set to true
    // This ensures we try to generate real content by default
    const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
    
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
        
        // Check for specific error messages
        if (error.message && error.message.includes('HUGGING_FACE_ACCESS_TOKEN is not set')) {
          toast({
            title: 'Missing API Key',
            description: 'The Hugging Face Access Token is required for image generation. Please configure it in your Supabase edge function secrets.',
            variant: 'destructive',
          });
          throw new Error('Hugging Face Access Token not configured');
        }
        
        throw new Error(error.message);
      }

      console.log(`Generated ${type} successfully via Supabase client:`, data);
      return processResponse(data, type);
    } catch (supabaseError) {
      console.warn('Supabase client invocation failed, falling back to fetch:', supabaseError);
      
      // Get the current session using the correct API
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      
      // Fallback to direct fetch if Supabase client fails
      const response = await fetch(`${FUNCTION_BASE_URL}/generate-branding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          prompt,
          type: type === 'logo' ? 'image' : type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from generate-branding:', errorData);
        
        // Check for specific error messages in the response
        if (errorData.error && errorData.error.includes('HUGGING_FACE_ACCESS_TOKEN is not set')) {
          toast({
            title: 'Missing API Key',
            description: 'The Hugging Face Access Token is required for image generation. Please configure it in your Supabase edge function secrets.',
            variant: 'destructive',
          });
          throw new Error('Hugging Face Access Token not configured');
        }
        
        throw new Error(errorData.error || `Failed to generate ${type}`);
      }

      const data = await response.json();
      console.log(`Generated ${type} successfully via fetch:`, data);
      return processResponse(data, type);
    }
  } catch (error) {
    console.error('Error generating branding:', error);
    
    // Don't show duplicate toast if we've already shown a specific one
    if (!error.message?.includes('Hugging Face Access Token not configured')) {
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate content. Please try again later.',
        variant: 'destructive',
      });
    }
    
    // Return empty result instead of mock data on failure
    // This makes it clearer to the user that generation failed
    return {
      logos: type === 'logo' ? [] : undefined,
      themes: type === 'theme' ? [] : undefined,
      images: type === 'image' ? [] : undefined,
    };
  }
};

// Helper function to process the response based on the type
const processResponse = (data: any, type: 'logo' | 'theme' | 'image'): GenerateResponse => {
  if (type === 'logo') {
    const baseImage = data.image;
    if (!baseImage) {
      console.error('No image data returned for logo');
      return { logos: [] };
    }
    // Generate variations of the logo to simulate multiple options
    return { logos: [baseImage, baseImage, baseImage, baseImage] };
  } else if (type === 'theme') {
    if (!data.themes) {
      console.error('No themes data returned');
      return { themes: [] };
    }
    return { themes: data.themes };
  } else if (type === 'image') {
    const baseImage = data.image;
    if (!baseImage) {
      console.error('No image data returned for image');
      return { images: [] };
    }
    // Generate variations of the image to simulate multiple options
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
