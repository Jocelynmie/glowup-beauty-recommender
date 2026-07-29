import Anthropic from '@anthropic-ai/sdk';
import type { FeatureInput, Recommendation } from './types.js';

// Optional AI enhancement layer.
//
// Takes the deterministic rule-based recommendation and asks Claude to rewrite
// the *prose* (summary + advice text) into a warmer, more personalized voice.
// Color palettes are left untouched — those stay deterministic and come from
// the knowledge base. If no API key is configured, or the call fails for any
// reason, we fall back to the original rule-based recommendation so the app
// keeps working offline.

// JSON schema for the refined text fields Claude returns. Palettes are NOT
// included — we merge those back from the rule-based result afterwards.
const REFINEMENT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    summary: { type: 'string' },
    makeup: {
      type: 'object',
      additionalProperties: false,
      properties: {
        contour: { type: 'string' },
        blush: { type: 'string' },
        eyes: { type: 'string' },
        brows: { type: 'string' },
        lips: { type: 'string' },
      },
      required: ['contour', 'blush', 'eyes', 'brows', 'lips'],
    },
    outfit: {
      type: 'object',
      additionalProperties: false,
      properties: { description: { type: 'string' } },
      required: ['description'],
    },
    jewelry: {
      type: 'object',
      additionalProperties: false,
      properties: {
        earrings: { type: 'string' },
        necklace: { type: 'string' },
        notes: { type: 'string' },
      },
      required: ['earrings', 'necklace', 'notes'],
    },
  },
  required: ['summary', 'makeup', 'outfit', 'jewelry'],
} as const;

interface Refinement {
  summary: string;
  makeup: { contour: string; blush: string; eyes: string; brows: string; lips: string };
  outfit: { description: string };
  jewelry: { earrings: string; necklace: string; notes: string };
}

export function aiEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

// Returns the enhanced recommendation, or the original `base` if AI is
// unavailable or the call fails. `usedAi` reports which path was taken.
export async function enhance(
  input: FeatureInput,
  base: Recommendation,
): Promise<{ recommendation: Recommendation; usedAi: boolean }> {
  if (!aiEnabled()) {
    return { recommendation: base, usedAi: false };
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 2048,
      system:
        'You are GlowUp, a warm, encouraging personal beauty and style advisor. ' +
        'You will be given a set of facial features and a rule-based styling plan. ' +
        'Rewrite the prose so it feels personal, specific, and confidence-boosting — ' +
        'keep every concrete recommendation (products, techniques, placements, metals, ' +
        'colors) factually intact, just make the wording warmer and more tailored. ' +
        'Keep each field concise (1-3 sentences). Do not invent new color names or hex codes.',
      messages: [
        {
          role: 'user',
          content:
            `Facial features: ${JSON.stringify(input)}\n\n` +
            `Rule-based plan to refine:\n${JSON.stringify(
              {
                summary: base.summary,
                makeup: {
                  contour: base.makeup.contour,
                  blush: base.makeup.blush,
                  eyes: base.makeup.eyes,
                  brows: base.makeup.brows,
                  lips: base.makeup.lips,
                },
                outfit: { season: base.outfit.season, description: base.outfit.description },
                jewelry: {
                  metal: base.jewelry.metal,
                  earrings: base.jewelry.earrings,
                  necklace: base.jewelry.necklace,
                  notes: base.jewelry.notes,
                },
              },
              null,
              2,
            )}`,
        },
      ],
      output_config: {
        format: { type: 'json_schema', schema: REFINEMENT_SCHEMA },
      },
    } as Anthropic.MessageCreateParamsNonStreaming);

    const textBlock = response.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return { recommendation: base, usedAi: false };
    }

    const refined = JSON.parse(textBlock.text) as Refinement;

    // Merge the refined prose back over the base, keeping all deterministic
    // color palettes and the season label from the rule engine.
    const recommendation: Recommendation = {
      summary: refined.summary,
      makeup: { ...base.makeup, ...refined.makeup },
      outfit: { ...base.outfit, description: refined.outfit.description },
      jewelry: { ...base.jewelry, ...refined.jewelry },
    };
    return { recommendation, usedAi: true };
  } catch (err) {
    console.error('AI enhancement failed, falling back to rule-based result:', err);
    return { recommendation: base, usedAi: false };
  }
}
