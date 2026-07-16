import type {
  FeatureInput, Recommendation, MakeupAdvice, OutfitAdvice, JewelryAdvice,
  FaceShape, EyeShape, LipShape, Eyebrow, SkinTone, Undertone,
} from './types.js';
import { SEASON_PALETTES, LIP_PALETTES } from './knowledgeBase.js';

// ---------------------------------------------------------------------------
// Contouring / jewelry: mainly determined by face shape
// ---------------------------------------------------------------------------
const CONTOUR_BY_FACE: Record<FaceShape, string> = {
  oval: 'Your proportions are already balanced — just lightly sweep the T-zone and highlight the jawline; heavy contouring is unnecessary.',
  round: 'Add vertical shadow along the sides of the cheeks and jaw angle to lengthen the face; highlight the center of the forehead and chin for more dimension.',
  square: 'Focus on softening the angular jaw: shade the sides of the jaw and temples, with a touch of highlight above the cheekbones.',
  heart: 'Lightly shade the sides of the forehead and the tip of the chin to narrow them; sweep blush horizontally to balance the wider top and narrower bottom.',
  long: 'Shade the hairline and chin horizontally to shorten the face; sweep blush horizontally to add a sense of width.',
  diamond: 'Lightly shade the widest part of the cheekbones and brighten the forehead and chin to balance the diamond contour.',
};

const BLUSH_BY_FACE: Record<FaceShape, string> = {
  oval: 'Apply blush at the highest point of the cheekbone, blending diagonally up toward the temples for a natural glow.',
  round: 'Apply blush diagonally upward below the cheekbone to elongate and slim the face.',
  square: 'Apply blush in a round shape on the apples of the cheeks to soften the overall lines.',
  heart: 'Apply blush horizontally, slightly lower on the apples of the cheeks, to balance the wider top and narrower bottom.',
  long: 'Sweep blush horizontally and avoid vertical placement that would lengthen the face.',
  diamond: 'Apply blush on the apples of the cheeks and sweep outward to soften the width of the cheekbones.',
};

const EYES_BY_SHAPE: Record<EyeShape, string> = {
  almond: 'A versatile eye shape — try a lifted cat-eye liner or gradient blending to enlarge the eyes.',
  round: 'Elongate the eyes: deepen and extend the liner backward at the outer corner, and use less color on the lower lid.',
  monolid: 'Blend a deep color across the width visible when the eyes are open, draw a bold "visible when open" liner, and curl the lashes.',
  hooded: 'Layer a matte deep color on the visible area when the eyes are open to create depth; avoid large areas of shimmer, and keep the liner thin and lifted.',
  upturned: 'Add a bit of color to the lower outer corner to balance the upward lift, with soft overall blending.',
  downturned: 'Lift the liner up at the outer corner and brighten the outer corner to create an uplifted, sparkling eye look.',
};

const BROW_BY_TYPE: Record<Eyebrow, string> = {
  straight: 'Keep the flat, straight brow and just fill in the gaps — it looks approachable and youthful.',
  arched: 'Emphasize the arched brow line for a sharp, confident look; be careful not to let the brow tail drop too low.',
  rounded: 'A soft, curved brow softens the angles and pairs well with a gentle makeup look.',
};

const LIP_TEXTURE_BY_SHAPE: Record<LipShape, string> = {
  full: 'A full lip shape can be applied directly; matte or velvet textures look more refined.',
  thin: 'You can slightly overline the lips and use a same-tone lip gloss to create fullness; choose glossy textures.',
  wide: 'Draw in the corners slightly and focus on a center-of-the-lip "bitten lip" application to make the lips look more concentrated.',
  small: 'Slightly overline the lips and choose a bright or dewy texture to enhance presence.',
};

const METAL_BY_UNDERTONE: Record<Undertone, string> = {
  cool: 'Silver / white gold / platinum',
  warm: 'Gold / rose gold',
  neutral: 'Both gold and silver work; rose gold is especially versatile',
};

const EARRINGS_BY_FACE: Record<FaceShape, string> = {
  oval: 'Almost anything works — round, teardrop, and geometric styles all look great.',
  round: 'Choose long, teardrop, or tassel earrings to lengthen the facial lines; avoid large hoops.',
  square: 'Round, curved, or teardrop earrings soften the angular jaw; avoid square styles.',
  heart: 'Teardrop or triangular earrings that are wider at the bottom balance the pointed chin; avoid top-heavy styles.',
  long: 'Choose rounder, fuller studs or short earrings to add width; avoid long drops.',
  diamond: 'Studs or earrings with detail at the top balance the narrow forehead; teardrops work well too.',
};

const NECKLACE_BY_FACE: Record<FaceShape, string> = {
  oval: 'Any length works — choose freely based on your neckline.',
  round: 'Choose a long Y-shaped or pendant necklace to lengthen the neckline vertically.',
  square: 'Curved, rounded necklaces or princess-length chains soften the overall contour.',
  heart: 'Mid-length curved necklaces balance the wider top and narrower bottom.',
  long: 'A short choker or collarbone chain adds horizontal layering; avoid overly long pendants.',
  diamond: 'A collarbone chain or short necklace fills the lower half to balance the face shape.',
};

// Select the seasonal color-type key
function pickSeasonKey(tone: Undertone, skin: SkinTone): string {
  const isDeep = skin === 'tan' || skin === 'deep';
  if (tone === 'cool') return isDeep ? 'coolDeep' : 'coolLight';
  if (tone === 'warm') return isDeep ? 'warmDeep' : 'warmLight';
  return isDeep ? 'neutralDeep' : 'neutralLight';
}

function buildMakeup(input: FeatureInput): MakeupAdvice {
  return {
    contour: CONTOUR_BY_FACE[input.faceShape],
    blush: BLUSH_BY_FACE[input.faceShape],
    eyes: EYES_BY_SHAPE[input.eyeShape],
    brows: BROW_BY_TYPE[input.eyebrow],
    lips: `${LIP_TEXTURE_BY_SHAPE[input.lipShape]} Choose the lip color that best suits your skin tone from the palette on the right.`,
    palette: LIP_PALETTES[input.undertone],
  };
}

function buildOutfit(input: FeatureInput): OutfitAdvice {
  const key = pickSeasonKey(input.undertone, input.skinTone);
  const p = SEASON_PALETTES[key];
  return {
    season: p.season,
    description: p.description,
    bestColors: p.bestColors,
    avoidColors: p.avoidColors,
    neutrals: p.neutrals,
  };
}

function buildJewelry(input: FeatureInput): JewelryAdvice {
  return {
    metal: METAL_BY_UNDERTONE[input.undertone],
    earrings: EARRINGS_BY_FACE[input.faceShape],
    necklace: NECKLACE_BY_FACE[input.faceShape],
    notes: input.undertone === 'cool'
      ? 'Cool-toned skin looks brightest with silver jewelry — pearls, diamonds, and sapphires all suit you.'
      : input.undertone === 'warm'
        ? 'Warm-toned skin looks more radiant with gold jewelry — amber, coral, and citrine suit you well.'
        : 'Neutral tones work with both gold and silver; switch metals freely to match your outfit of the day.',
  };
}

const FACE_LABEL: Record<FaceShape, string> = {
  oval: 'oval', round: 'round', square: 'square', heart: 'heart-shaped', long: 'long', diamond: 'diamond',
};

export function recommend(input: FeatureInput): Recommendation {
  const outfit = buildOutfit(input);
  const toneLabel = input.undertone === 'cool' ? 'cool' : input.undertone === 'warm' ? 'warm' : 'neutral';
  return {
    summary: `Based on your ${FACE_LABEL[input.faceShape]} face and ${toneLabel}-toned skin, we matched you with the "${outfit.season}" color palette and put together a full set of makeup, outfit, and jewelry recommendations.`,
    makeup: buildMakeup(input),
    outfit,
    jewelry: buildJewelry(input),
  };
}
