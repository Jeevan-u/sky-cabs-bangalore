/**
 * OpenRouter AI Client for Sky Cabs Bangalore
 * Centralized AI engine for:
 * - Dynamic Review Generation (/api/generate-review)
 * - Dashboard Odometer OCR & Reading Verification (OcrService)
 * - Customer Quotation & Trip Assistant
 */

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content:
    | string
    | Array<
        | { type: "text"; text: string }
        | { type: "image_url"; image_url: { url: string } }
      >;
}

export interface OpenRouterCompletionOptions {
  messages: OpenRouterMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

export class OpenRouterClient {
  private static readonly DEFAULT_MODEL =
    process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";
  private static readonly BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
  private static readonly SITE_URL = "https://skycabsbangalore.com/";
  private static readonly SITE_TITLE = "Sky Cabs Bangalore";

  /**
   * Check if OpenRouter is configured
   */
  public static isConfigured(): boolean {
    return Boolean(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim());
  }

  /**
   * Execute chat completion via OpenRouter API
   */
  public static async createChatCompletion(options: OpenRouterCompletionOptions): Promise<{
    success: boolean;
    content: string;
    model: string;
    raw?: any;
    error?: string;
  }> {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        content: "",
        model: options.model || this.DEFAULT_MODEL,
        error: "OPENROUTER_API_KEY is not set in environment.",
      };
    }

    const model = options.model || this.DEFAULT_MODEL;

    const payload: Record<string, any> = {
      model,
      messages: options.messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1000,
    };

    if (options.jsonMode) {
      payload.response_format = { type: "json_object" };
    }

    try {
      const response = await fetch(this.BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.trim()}`,
          "HTTP-Referer": this.SITE_URL,
          "X-Title": this.SITE_TITLE,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        return {
          success: false,
          content: "",
          model,
          error: `OpenRouter API returned HTTP ${response.status}: ${errText}`,
        };
      }

      const data = await response.json();
      const choice = data.choices?.[0];
      const messageContent = choice?.message?.content || "";

      return {
        success: true,
        content: messageContent,
        model: data.model || model,
        raw: data,
      };
    } catch (err: any) {
      return {
        success: false,
        content: "",
        model,
        error: err.message || "Failed to communicate with OpenRouter API.",
      };
    }
  }

  /**
   * Helper for Vision analysis (e.g. Odometer dashboard photos)
   */
  public static async analyzeImage(options: {
    imageUrlOrBase64: string;
    prompt: string;
    model?: string;
    jsonMode?: boolean;
  }) {
    let url = options.imageUrlOrBase64;
    if (!url.startsWith("http") && !url.startsWith("data:")) {
      url = `data:image/jpeg;base64,${url}`;
    }

    const messages: OpenRouterMessage[] = [
      {
        role: "user",
        content: [
          { type: "text", text: options.prompt },
          { type: "image_url", image_url: { url } },
        ],
      },
    ];

    return this.createChatCompletion({
      messages,
      model: options.model || "google/gemini-2.5-flash",
      temperature: 0.1,
      jsonMode: options.jsonMode,
    });
  }
}
