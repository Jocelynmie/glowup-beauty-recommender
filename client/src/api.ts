import type { FeatureInput, OptionsResponse, Recommendation } from './types';

// All requests go through the Vite dev proxy (/api -> http://localhost:4000)
const BASE = '/api';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore JSON parse errors, keep the default message
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

// Fetch the form options used to render the questionnaire
export async function getOptions(): Promise<OptionsResponse> {
  const res = await fetch(`${BASE}/options`);
  return handle<OptionsResponse>(res);
}

// Check backend health and whether AI enhancement is configured
export async function getHealth(): Promise<{ ok: boolean; aiEnabled: boolean }> {
  const res = await fetch(`${BASE}/health`);
  return handle<{ ok: boolean; aiEnabled: boolean }>(res);
}

// Submit the selected features and get a recommendation back.
// When `useAi` is true, hits the AI-enhanced endpoint (which itself falls back
// to the rule-based result server-side if AI is unavailable).
export async function postRecommend(
  input: FeatureInput,
  useAi = false,
): Promise<Recommendation> {
  const res = await fetch(`${BASE}/recommend${useAi ? '/ai' : ''}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handle<Recommendation>(res);
}
