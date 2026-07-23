import { CoordinatorOutput, Language } from '../types';

export interface PromptRequest {
  prompt: string;
  category: 'volunteer' | 'water' | 'house' | 'rashan' | 'solar' | 'donor_appeal' | 'general';
  language?: Language;
}

export async function generateCoordinatorResponse(request: PromptRequest): Promise<{ output: string; source: string }> {
  try {
    const response = await fetch('/api/coordinator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error || `Server error ${response.status}`);
    }

    const data = await response.json();
    return {
      output: data.output || 'No output generated.',
      source: data.source || 'server'
    };
  } catch (error: any) {
    console.error("Failed to generate coordinator output:", error);
    throw error;
  }
}
