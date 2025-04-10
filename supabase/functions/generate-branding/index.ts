
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from "https://esm.sh/@huggingface/inference@2.3.2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const HUGGING_FACE_ACCESS_TOKEN = Deno.env.get("HUGGING_FACE_ACCESS_TOKEN")
    if (!HUGGING_FACE_ACCESS_TOKEN) {
      throw new Error("HUGGING_FACE_ACCESS_TOKEN is not set")
    }

    const { prompt, type } = await req.json()
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Missing required field: prompt" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      )
    }

    const hf = new HfInference(HUGGING_FACE_ACCESS_TOKEN)

    if (type === "image") {
      // Generate images using FLUX model
      const image = await hf.textToImage({
        inputs: `${prompt}, high quality, detailed, 4k`,
        model: "black-forest-labs/FLUX.1-schnell",
      })

      // Convert blob to base64
      const arrayBuffer = await image.arrayBuffer()
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
      const dataUrl = `data:image/jpeg;base64,${base64}`

      return new Response(
        JSON.stringify({ image: dataUrl }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    } else if (type === "theme") {
      // For themes, we'll generate color palettes based on the prompt
      const enhancedPrompt = `Generate a color palette for: ${prompt}. The palette should include 5 colors: primary, secondary, accent, background, and text.`
      
      const result = await hf.textGeneration({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        inputs: enhancedPrompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
        }
      })

      // Parse the colors from the generated text
      // This is a simple implementation - in production you'd want more robust parsing
      const response = result.generated_text
      
      // Create 3 different themes with variations of the palette
      const themes = [
        {
          id: "theme-" + Date.now() + "-1",
          name: prompt.split(" ").slice(0, 3).join(" ") + " Primary",
          colors: extractColorsFromText(response, 1)
        },
        {
          id: "theme-" + Date.now() + "-2",
          name: prompt.split(" ").slice(0, 3).join(" ") + " Vibrant",
          colors: extractColorsFromText(response, 2)
        },
        {
          id: "theme-" + Date.now() + "-3",
          name: prompt.split(" ").slice(0, 3).join(" ") + " Subtle",
          colors: extractColorsFromText(response, 3)
        }
      ]

      return new Response(
        JSON.stringify({ themes }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({ error: "Invalid type. Must be 'image' or 'theme'" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    )
  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    )
  }
})

// Helper function to extract colors from text and create variations
function extractColorsFromText(text: string, variation: number): { name: string; value: string }[] {
  // Default colors in case we can't extract from the text
  const defaultColors = [
    { name: "primary", value: variation === 1 ? "#3B82F6" : variation === 2 ? "#8B5CF6" : "#10B981" },
    { name: "secondary", value: variation === 1 ? "#1D4ED8" : variation === 2 ? "#7C3AED" : "#059669" },
    { name: "accent", value: variation === 1 ? "#F59E0B" : variation === 2 ? "#EC4899" : "#6366F1" },
    { name: "background", value: variation === 1 ? "#1E293B" : variation === 2 ? "#18181B" : "#F8FAFC" },
    { name: "text", value: variation === 1 ? "#F8FAFC" : variation === 2 ? "#F9FAFB" : "#1E293B" }
  ]

  try {
    // Try to extract hex codes - this is a simple regex and might need improvement
    const hexCodes = text.match(/#[a-fA-F0-9]{6}/g) || []
    
    if (hexCodes.length >= 5) {
      return [
        { name: "primary", value: hexCodes[0] },
        { name: "secondary", value: hexCodes[1] },
        { name: "accent", value: hexCodes[2] },
        { name: "background", value: hexCodes[3] },
        { name: "text", value: hexCodes[4] }
      ]
    }
    
    // If we couldn't extract enough hex codes, use the defaults with slight variations
    return defaultColors.map(color => {
      return { 
        name: color.name, 
        value: color.value
      }
    })
  } catch (e) {
    console.error("Error extracting colors:", e)
    return defaultColors
  }
}
