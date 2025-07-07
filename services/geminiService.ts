import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { Settings, SeoData } from '../types';

const cleanJsonString = (text: string): string => {
    let jsonStr = text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    return jsonStr;
};

export const validateApiKey = async (apiKey: string): Promise<{ isValid: boolean; error: string | null }> => {
    if (!apiKey) {
        return { isValid: false, error: 'API Key cannot be empty.' };
    }
    
    if (!apiKey.startsWith('AI')) {
        return { isValid: false, error: 'Invalid API Key format.' };
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        // Use a lightweight call to check if the key is valid for the Gemini API
        await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-04-17',
            contents: 'test',
        });
        return { isValid: true, error: null };
    } catch (e: any) {
        console.error("API Key validation failed:", e);
        if (e.message && (e.message.includes("API key not valid") || e.message.includes("API_KEY_INVALID"))) {
             return { isValid: false, error: 'The provided API key is not valid. Please check it and try again.' };
        }
        return { isValid: false, error: 'Could not validate the API key. Ensure it is a correct Gemini API key and try again.' };
    }
};


export const generateSeoForImage = async (base64Image: string, settings: Settings, apiKey: string): Promise<SeoData> => {
    if (!apiKey) {
        throw new Error("API Key not provided.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg', // Assuming jpeg, could be dynamic
            data: base64Image.split(',')[1], // remove the "data:image/jpeg;base64," part
        },
    };

    const textPart = {
        text: `Analyze this image and generate SEO metadata.
        Provide the output in JSON format with the following keys: "title", "description", "tags".

        Constraints:
        - "title": A compelling SEO title, maximum ${settings.maxTitleLength} characters.
        - "description": An engaging meta description, maximum ${settings.maxDescriptionLength} characters.
        - "tags": An array of exactly ${settings.tagCount} relevant SEO tags. Each tag must be in snake_case and lowercase.

        Example format:
        {
          "title": "A short descriptive title",
          "description": "A slightly longer description of the image content.",
          "tags": ["example_tag_one", "example_tag_two"]
        }
        `,
    };

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-04-17', // Using a model that supports vision and JSON output
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: 'application/json',
                temperature: 0.4,
            },
        });
        
        const rawText = response.text;
        if (!rawText) {
            throw new Error("API returned an empty response.");
        }
        
        const cleanedJson = cleanJsonString(rawText);
        
        const parsedData = JSON.parse(cleanedJson) as SeoData;

        // Validate the structure
        if (!parsedData.title || !parsedData.description || !Array.isArray(parsedData.tags)) {
            throw new Error("Invalid JSON structure received from API.");
        }
        
        return parsedData;

    } catch (e) {
        console.error("Gemini API call failed:", e);
        if (e instanceof Error) {
            throw new Error(`Failed to process image with AI: ${e.message}`);
        }
        throw new Error("An unknown error occurred during AI processing.");
    }
};