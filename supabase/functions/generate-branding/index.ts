
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set")
    }

    const { prompt, type } = await req.json()
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Missing required field: prompt" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      )
    }

    if (type === "image") {
      // Generate images using OpenAI DALL-E
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: `${prompt}, high quality, detailed, 4k`,
          n: 1,
          size: "1024x1024",
          response_format: "b64_json"
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("OpenAI API error:", errorData)
        throw new Error(errorData.error?.message || "Failed to generate image with OpenAI")
      }

      const data = await response.json()
      const imageBase64 = data.data[0].b64_json
      const dataUrl = `data:image/png;base64,${imageBase64}`

      return new Response(
        JSON.stringify({ image: dataUrl }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    } else if (type === "theme") {
      // For themes, we'll use OpenAI GPT to generate color palettes
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a design assistant that creates color palettes. Output in JSON format only."
            },
            {
              role: "user",
              content: `Generate three different color palettes for: ${prompt}. Each palette should include: primary, secondary, accent, background, and text colors. Use HEX codes. Return ONLY JSON in this format: 
              {
                "themes": [
                  {
                    "id": "theme-1",
                    "name": "Name for theme 1",
                    "colors": [
                      {"name": "primary", "value": "#HEXCODE"},
                      {"name": "secondary", "value": "#HEXCODE"},
                      {"name": "accent", "value": "#HEXCODE"},
                      {"name": "background", "value": "#HEXCODE"},
                      {"name": "text", "value": "#HEXCODE"}
                    ]
                  },
                  {
                    "id": "theme-2",
                    "name": "Name for theme 2",
                    "colors": [...]
                  },
                  {
                    "id": "theme-3",
                    "name": "Name for theme 3",
                    "colors": [...]
                  }
                ]
              }`
            }
          ],
          temperature: 0.7
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("OpenAI API error:", errorData)
        throw new Error(errorData.error?.message || "Failed to generate themes with OpenAI")
      }

      const data = await response.json()
      const content = data.choices[0].message.content
      
      try {
        // Parse the JSON response from GPT
        const parsedThemes = JSON.parse(content)
        
        // Add unique IDs based on timestamp
        const themesWithUniqueIds = parsedThemes.themes.map((theme, index) => ({
          ...theme,
          id: `theme-${Date.now()}-${index + 1}`
        }))
        
        return new Response(
          JSON.stringify({ themes: themesWithUniqueIds }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
      } catch (error) {
        console.error("Error parsing OpenAI response:", error)
        console.log("Raw response:", content)
        throw new Error("Failed to parse theme data from OpenAI")
      }
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
