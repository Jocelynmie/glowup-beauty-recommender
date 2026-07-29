// Frontend types — kept in sync with the backend domain model (server/src/recommendation/types.ts)

export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond';
export type SkinTone = 'fair' | 'light' | 'medium' | 'tan' | 'deep';
export type Undertone = 'cool' | 'warm' | 'neutral';
export type EyeShape = 'almond' | 'round' | 'monolid' | 'hooded' | 'upturned' | 'downturned';
export type LipShape = 'full' | 'thin' | 'wide' | 'small';
export type Eyebrow = 'straight' | 'arched' | 'rounded';

export interface FeatureInput {
  faceShape: FaceShape;
  skinTone: SkinTone;
  undertone: Undertone;
  eyeShape: EyeShape;
  lipShape: LipShape;
  eyebrow: Eyebrow;
}

// A partial version used while the user is still filling out the form
export type FeatureDraft = Partial<FeatureInput>;

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

// Shape of GET /api/options
export interface OptionsResponse {
  faceShape: Option[];
  skinTone: Option[];
  undertone: Option[];
  eyeShape: Option[];
  lipShape: Option[];
  eyebrow: Option[];
}

// The six feature keys, in display order
export type FeatureKey = keyof OptionsResponse;

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface MakeupAdvice {
  contour: string;
  blush: string;
  eyes: string;
  brows: string;
  lips: string;
  palette: ColorSwatch[];
}

export interface OutfitAdvice {
  season: string;
  description: string;
  bestColors: ColorSwatch[];
  avoidColors: ColorSwatch[];
  neutrals: ColorSwatch[];
}

export interface JewelryAdvice {
  metal: string;
  earrings: string;
  necklace: string;
  notes: string;
}

export interface Recommendation {
  summary: string;
  makeup: MakeupAdvice;
  outfit: OutfitAdvice;
  jewelry: JewelryAdvice;
  // Present on responses from the AI endpoint: whether AI refinement actually ran
  usedAi?: boolean;
}
