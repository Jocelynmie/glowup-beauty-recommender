// Facial features submitted by the user
export interface FeatureInput {
  faceShape: FaceShape;
  skinTone: SkinTone;
  undertone: Undertone;
  eyeShape: EyeShape;
  lipShape: LipShape;
  eyebrow: Eyebrow;
}

export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond';
export type SkinTone = 'fair' | 'light' | 'medium' | 'tan' | 'deep';
export type Undertone = 'cool' | 'warm' | 'neutral';
export type EyeShape = 'almond' | 'round' | 'monolid' | 'hooded' | 'upturned' | 'downturned';
export type LipShape = 'full' | 'thin' | 'wide' | 'small';
export type Eyebrow = 'straight' | 'arched' | 'rounded';

// A single option (with label and hint), used by the frontend to render the form
export interface Option<T extends string = string> {
  value: T;
  label: string;
  hint?: string;
}

// Makeup advice
export interface MakeupAdvice {
  contour: string;      // contouring
  blush: string;        // blush
  eyes: string;         // eye makeup
  brows: string;        // brows
  lips: string;         // lips
  palette: ColorSwatch[]; // recommended makeup color palette
}

// Outfit color palette
export interface OutfitAdvice {
  season: string;       // seasonal color type
  description: string;
  bestColors: ColorSwatch[];
  avoidColors: ColorSwatch[];
  neutrals: ColorSwatch[];
}

// Jewelry advice
export interface JewelryAdvice {
  metal: string;        // metal tone (gold / silver / rose gold)
  earrings: string;     // earrings
  necklace: string;     // necklace
  notes: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface Recommendation {
  summary: string;
  makeup: MakeupAdvice;
  outfit: OutfitAdvice;
  jewelry: JewelryAdvice;
}
