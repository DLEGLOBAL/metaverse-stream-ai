
import { toast } from "@/hooks/use-toast";
import { generateBrandingApi } from "./brandingApi";
import { GenerateResponse, BrandingType } from "./types";

export * from "./types";

export const generateBranding = async (
  prompt: string,
  type: BrandingType
): Promise<GenerateResponse> => {
  try {
    console.log(`Generating ${type} with prompt: ${prompt}`);
    
    // Map logo type to image for the API
    const apiType = type === 'logo' ? 'image' : type;
    
    const result = await generateBrandingApi({
      prompt,
      type: apiType,
    });
    
    return processResponse(result, type);
  } catch (error) {
    // Capture the error message - already handled in the API layer
    console.error('Error in generateBranding:', error);
    
    // Return empty result on failure
    return {
      logos: type === 'logo' ? [] : undefined,
      themes: type === 'theme' ? [] : undefined,
      images: type === 'image' ? [] : undefined,
    };
  }
};

// Helper function to process the response based on the type
const processResponse = (data: GenerateResponse, type: BrandingType): GenerateResponse => {
  if (type === 'logo') {
    const images = data.images || [];
    const baseImage = images.length > 0 ? images[0] : '';
    
    if (!baseImage) {
      console.error('No image data returned for logo');
      return { logos: [] };
    }
    
    // Generate multiple options from the base image
    return { logos: [baseImage, baseImage, baseImage, baseImage] };
  } else if (type === 'theme') {
    if (!data.themes || data.themes.length === 0) {
      console.error('No themes data returned');
      return { themes: [] };
    }
    return { themes: data.themes };
  } else if (type === 'image') {
    const images = data.images || [];
    const baseImage = images.length > 0 ? images[0] : '';
    
    if (!baseImage) {
      console.error('No image data returned for image');
      return { images: [] };
    }
    
    // Generate multiple options from the base image
    return { images: [baseImage, baseImage, baseImage, baseImage] };
  }
  return {};
};
