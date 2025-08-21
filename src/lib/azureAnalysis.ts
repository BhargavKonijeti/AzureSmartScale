import OpenAI from "openai";
import { AnalysisResult } from "@/components/AnalysisTable";

export const getAzureRequirementsPrompt = (jsonContent: any) => `
You are an expert Azure cloud architect.
Given the following user requirements in JSON:

${JSON.stringify(jsonContent, null, 2)}
Please:
1. Recommend the best cost effective Azure Pricing tier
2. Estimate a typical monthly cost.
3. Justify the recommendation based on required features.
4. List key features available in the recommended tier.

Respond ONLY with valid JSON.
Do not include explanations or extra text.
The JSON must strictly match this structure:

{
  "AzureResourceDetails": [
    {
      "AzureResourceName": "string",
      "RecommendedPricingTier": "string",
      "EstimatedMonthlyCost": "string",
      "Justification": "string",
      "FeatureHighlights": ["string"],
      "CostSavings": "string",
      "TierType": "string"
    }
  ]
}
`;

export const analyzeAzureResources = async (
  jsonData: any
): Promise<AnalysisResult[]> => {
  try {
    const client = new OpenAI({
      apiKey: "",
      baseURL: `https://azsmartscale.openai.azure.com/openai/deployments/gpt-4`,
      defaultQuery: { "api-version": "2024-12-01-preview" },
      dangerouslyAllowBrowser: true, // ⚠️ remove in production
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4", // Must match your Azure deployment name
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Always return valid JSON only.",
        },
        { role: "user", content: getAzureRequirementsPrompt(jsonData) },
      ],
      max_tokens: 500,
      response_format: { type: "json_object" }, // 👈 strict JSON
    });

    const response = completion.choices[0]?.message?.content || "{}";
    console.log("OpenAI Response:", response);

    const parsed = JSON.parse(response);

    // Handle case: model might return { AzureResourceDetails: [...] }
    if (parsed.AzureResourceDetails) {
      return parsed.AzureResourceDetails as AnalysisResult[];
    }

    // If it’s already an array
    if (Array.isArray(parsed)) {
      return parsed as AnalysisResult[];
    }

    return [parsed as AnalysisResult];
  } catch (error) {
    console.error("Error:", error);
    return [
      {
        AzureResourceName: "Analysis Error",
        RecommendedPricingTier: "Standard",
        EstimatedMonthlyCost: "$0.00/month",
        Justification:
          "Unable to analyze resources. Please check your connection and try again.",
        FeatureHighlights: ["Error occurred during analysis"],
        CostSavings: "$0/month",
      },
    ];
  }
};
