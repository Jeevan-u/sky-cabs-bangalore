// Tests for OpenRouter Client
import { OpenRouterClient } from '../lib/openrouter';

describe('OpenRouterClient', () => {
  const originalApiKey = process.env.OPENROUTER_API_KEY;

  afterEach(() => {
    process.env.OPENROUTER_API_KEY = originalApiKey;
    jest.restoreAllMocks();
  });

  describe('isConfigured', () => {
    it('returns false when OPENROUTER_API_KEY is not defined', () => {
      delete process.env.OPENROUTER_API_KEY;
      expect(OpenRouterClient.isConfigured()).toBe(false);
    });

    it('returns false when OPENROUTER_API_KEY is empty or whitespace', () => {
      process.env.OPENROUTER_API_KEY = '   ';
      expect(OpenRouterClient.isConfigured()).toBe(false);
    });

    it('returns true when a valid key is provided', () => {
      process.env.OPENROUTER_API_KEY = 'sk-or-v1-testkey123456';
      expect(OpenRouterClient.isConfigured()).toBe(true);
    });
  });

  describe('createChatCompletion', () => {
    it('returns error when API key is missing', async () => {
      delete process.env.OPENROUTER_API_KEY;
      const res = await OpenRouterClient.createChatCompletion({
        messages: [{ role: 'user', content: 'Hello' }],
      });
      expect(res.success).toBe(false);
      expect(res.error).toContain('OPENROUTER_API_KEY');
    });

    it('sends correct headers and payload to OpenRouter', async () => {
      process.env.OPENROUTER_API_KEY = 'sk-or-v1-mock-key';

      const mockResponse = {
        id: 'gen-123',
        model: 'google/gemini-2.5-flash',
        choices: [
          {
            message: {
              role: 'assistant',
              content: JSON.stringify({ options: ['Great ride!', 'Fast service', 'Loved it'] }),
            },
          },
        ],
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as any);

      const res = await OpenRouterClient.createChatCompletion({
        messages: [{ role: 'user', content: 'Generate reviews' }],
        jsonMode: true,
      });

      expect(res.success).toBe(true);
      expect(res.content).toContain('Great ride!');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://openrouter.ai/api/v1/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer sk-or-v1-mock-key',
            'HTTP-Referer': 'https://www.srisadhgurutoursandtravels.com',
            'X-Title': 'Sri Sadhguru Tours & Travels',
          }),
        })
      );
    });

    it('handles HTTP error gracefully without throwing', async () => {
      process.env.OPENROUTER_API_KEY = 'sk-or-v1-mock-key';

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: async () => 'Invalid API key',
      } as any);

      const res = await OpenRouterClient.createChatCompletion({
        messages: [{ role: 'user', content: 'Hi' }],
      });

      expect(res.success).toBe(false);
      expect(res.error).toContain('401');
    });
  });
});
