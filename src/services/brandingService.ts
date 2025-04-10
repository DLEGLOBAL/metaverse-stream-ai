
import { toast } from "@/hooks/use-toast";

// Base URL for Supabase functions
const FUNCTION_BASE_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

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
      throw new Error(errorData.error || 'Failed to generate content');
    }

    const data = await response.json();

    // Process the response based on the type
    if (type === 'logo') {
      // For logos, we'll generate 4 variations
      const baseImage = data.image;
      // In a real implementation, we'd generate multiple images or variations
      // For this example, we'll use the same image 4 times
      return { logos: [baseImage, baseImage, baseImage, baseImage] };
    } else if (type === 'theme') {
      return { themes: data.themes };
    } else if (type === 'image') {
      // For images, generate 4 images (2 banners, 2 profile pics)
      const baseImage = data.image;
      // In a real implementation, we'd generate multiple images 
      // For this example, we'll use the same image 4 times
      return { images: [baseImage, baseImage, baseImage, baseImage] };
    }

    return {};
  } catch (error) {
    console.error('Error generating branding:', error);
    toast({
      title: 'Generation Failed',
      description: error instanceof Error ? error.message : 'Failed to generate content',
      variant: 'destructive',
    });
    throw error;
  }
};
