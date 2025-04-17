
import { supabase } from "@/integrations/supabase/client";
import { FUNCTION_BASE_URL, handleApiResponse } from "../api/apiClient";
import { BrandingApiParams, GenerateResponse } from "./types";
import { toast } from "@/hooks/use-toast";

export async function generateBrandingApi(
  params: BrandingApiParams
): Promise<GenerateResponse> {
  try {
    // Try using Supabase client first (preferred method)
    try {
      const { data, error } = await supabase.functions.invoke("generate-branding", {
        body: params
      });

      if (error) {
        console.error('Supabase function error:', error);
        
        // Check for specific error messages
        if (error.message && error.message.includes('OPENAI_API_KEY is not set')) {
          toast({
            title: 'Missing API Key',
            description: 'The OpenAI API Key is required for image and theme generation. Please configure it in your Supabase edge function secrets.',
            variant: 'destructive',
          });
        }
        
        throw new Error(error.message);
      }

      console.log(`Generated ${params.type} successfully via Supabase client:`, data);
      return data as GenerateResponse;
    } 
    catch (supabaseError) {
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
        body: JSON.stringify(params),
      });

      const result = await handleApiResponse<GenerateResponse>(response);
      if (result.error) {
        throw new Error(result.error);
      }
      
      console.log(`Generated ${params.type} successfully via fetch:`, result.data);
      return result.data || {};
    }
  } catch (error) {
    console.error('Error generating branding:', error);
    // Return empty result for the specific type
    throw error;
  }
}
