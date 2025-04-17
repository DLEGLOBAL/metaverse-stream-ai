
import { toast } from "@/hooks/use-toast";

// Base URL for Supabase functions
export const FUNCTION_BASE_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'https://dvqzltgyrrndyrndmclb.supabase.co/functions/v1';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  statusCode?: number;
}

// Helper for fetch API error handling
export async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    console.error('API error response:', errorData);
    
    // Check for specific error messages
    if (errorData.error && errorData.error.includes('OPENAI_API_KEY is not set')) {
      toast({
        title: 'Missing API Key',
        description: 'The OpenAI API Key is required for image and theme generation. Please configure it in your Supabase edge function secrets.',
        variant: 'destructive',
      });
    }
    
    return {
      error: errorData.error || `Request failed with status ${response.status}`,
      statusCode: response.status
    };
  }

  return {
    data: await response.json(),
    statusCode: response.status
  };
}
