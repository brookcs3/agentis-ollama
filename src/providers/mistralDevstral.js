// Provider for Mistral Devstral running via Ollama

export default class MistralDevstral {
  constructor({ baseUrl = 'http://localhost:11434' } = {}) {
    this.baseUrl = baseUrl;
    this.model = 'mistral-devstral';
  }

  async chat({ messages, tools }) {
    const body = {
      model: this.model,
      messages,
      tools
    };
    const resp = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!resp.ok) {
      throw new Error(`Devstral API error: ${resp.status}`);
    }
    const data = await resp.json();
    return data;
  }
}
