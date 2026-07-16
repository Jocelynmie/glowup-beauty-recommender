import type {
  Option, FaceShape, SkinTone, Undertone, EyeShape, LipShape, Eyebrow, ColorSwatch,
} from './types.js';

// ---------------------------------------------------------------------------
// Form options (value + label + hint)
// ---------------------------------------------------------------------------
export const OPTIONS = {
  faceShape: [
    { value: 'oval', label: 'Oval', hint: 'Classic, well-balanced proportions' },
    { value: 'round', label: 'Round', hint: 'Full cheeks, shorter chin' },
    { value: 'square', label: 'Square', hint: 'Defined, angular jawline' },
    { value: 'heart', label: 'Heart', hint: 'Wide forehead, pointed chin' },
    { value: 'long', label: 'Long', hint: 'Length noticeably greater than width' },
    { value: 'diamond', label: 'Diamond', hint: 'Widest at the cheekbones, narrow forehead and chin' },
  ] as Option<FaceShape>[],

  skinTone: [
    { value: 'fair', label: 'Fair', hint: 'Very light skin, burns easily' },
    { value: 'light', label: 'Light', hint: 'Light to medium skin' },
    { value: 'medium', label: 'Medium', hint: 'Medium, slightly warm' },
    { value: 'tan', label: 'Tan', hint: 'Deeper, healthy tan' },
    { value: 'deep', label: 'Deep', hint: 'Deep brown skin' },
  ] as Option<SkinTone>[],

  undertone: [
    { value: 'cool', label: 'Cool', hint: 'Wrist veins look blue/purple; suits silver' },
    { value: 'warm', label: 'Warm', hint: 'Wrist veins look green; suits gold' },
    { value: 'neutral', label: 'Neutral', hint: 'Can pull off both cool and warm' },
  ] as Option<Undertone>[],

  eyeShape: [
    { value: 'almond', label: 'Almond', hint: 'Classic oval, slightly lifted outer corner' },
    { value: 'round', label: 'Round', hint: 'Large, round, tall eyes' },
    { value: 'monolid', label: 'Monolid', hint: 'No crease in the lid' },
    { value: 'hooded', label: 'Hooded', hint: 'Lid partly covered' },
    { value: 'upturned', label: 'Upturned', hint: 'Outer corner lifts up' },
    { value: 'downturned', label: 'Downturned', hint: 'Outer corner drops; soft look' },
  ] as Option<EyeShape>[],

  lipShape: [
    { value: 'full', label: 'Full', hint: 'Plump lip shape' },
    { value: 'thin', label: 'Thin', hint: 'Slim lips' },
    { value: 'wide', label: 'Wide', hint: 'Wider distance between corners' },
    { value: 'small', label: 'Small', hint: 'Petite mouth' },
  ] as Option<LipShape>[],

  eyebrow: [
    { value: 'straight', label: 'Straight', hint: 'Flat, straight brow' },
    { value: 'arched', label: 'Arched', hint: 'Prominently lifted arch' },
    { value: 'rounded', label: 'Rounded', hint: 'Soft, curved brow' },
  ] as Option<Eyebrow>[],
} as const;

// ---------------------------------------------------------------------------
// Seasonal color palettes (based on the four-season color theory,
// categorized by undertone + brightness)
// ---------------------------------------------------------------------------
export interface SeasonPalette {
  season: string;
  description: string;
  bestColors: ColorSwatch[];
  avoidColors: ColorSwatch[];
  neutrals: ColorSwatch[];
}

// Cool -> Summer/Winter; Warm -> Spring/Autumn; further split by skin depth
export const SEASON_PALETTES: Record<string, SeasonPalette> = {
  // Cool + light: Cool Summer
  coolLight: {
    season: 'Cool Summer',
    description: 'Suits low-saturation, grayish cool tones — soft and refined overall.',
    bestColors: [
      { name: 'Hazy Blue', hex: '#8FA6C4' },
      { name: 'Lotus Pink', hex: '#D9A7B0' },
      { name: 'Lavender', hex: '#B7A6D6' },
      { name: 'Dusty Rose', hex: '#C08497' },
      { name: 'Mint Green', hex: '#A8CBB7' },
    ],
    avoidColors: [
      { name: 'Orange', hex: '#E8752B' },
      { name: 'Bright Yellow', hex: '#F2D024' },
    ],
    neutrals: [
      { name: 'Slate Blue', hex: '#5D6B82' },
      { name: 'Pearl White', hex: '#F0ECE6' },
      { name: 'Cocoa Gray', hex: '#8A8078' },
    ],
  },
  // Cool + deep: Cool Winter
  coolDeep: {
    season: 'Cool Winter',
    description: 'Suits high-contrast, pure and saturated cool tones — striking and brightening.',
    bestColors: [
      { name: 'Royal Blue', hex: '#1E4FA3' },
      { name: 'True Red', hex: '#C8102E' },
      { name: 'Magenta', hex: '#C71585' },
      { name: 'Emerald', hex: '#0B6E4F' },
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    avoidColors: [
      { name: 'Earth Brown', hex: '#8B5A2B' },
      { name: 'Mustard Yellow', hex: '#C9A227' },
    ],
    neutrals: [
      { name: 'Pure Black', hex: '#111111' },
      { name: 'Cool Gray', hex: '#4A4E57' },
      { name: 'Navy', hex: '#1F2A44' },
    ],
  },
  // Warm + light: Warm Spring
  warmLight: {
    season: 'Warm Spring',
    description: 'Suits bright, clear warm tones — makes your complexion look young and lively.',
    bestColors: [
      { name: 'Coral Orange', hex: '#FF7F50' },
      { name: 'Chick Yellow', hex: '#F6D860' },
      { name: 'Fresh Green', hex: '#9BCB5A' },
      { name: 'Peach Pink', hex: '#F7B7A3' },
      { name: 'Sky Cyan', hex: '#77C3D9' },
    ],
    avoidColors: [
      { name: 'Deep Black', hex: '#111111' },
      { name: 'Cool Gray', hex: '#6B7079' },
    ],
    neutrals: [
      { name: 'Cream White', hex: '#FBF3E0' },
      { name: 'Warm Camel', hex: '#C9A26A' },
      { name: 'Light Brown', hex: '#B08155' },
    ],
  },
  // Warm + deep: Warm Autumn
  warmDeep: {
    season: 'Warm Autumn',
    description: 'Suits low-brightness, earthy, rich warm tones — mature and refined.',
    bestColors: [
      { name: 'Brick Red', hex: '#A63A24' },
      { name: 'Mustard Yellow', hex: '#C9A227' },
      { name: 'Olive Green', hex: '#6B6B23' },
      { name: 'Pumpkin Orange', hex: '#D2691E' },
      { name: 'Caramel Brown', hex: '#8B5A2B' },
    ],
    avoidColors: [
      { name: 'Fluorescent Pink', hex: '#FF2D95' },
      { name: 'Ice Blue', hex: '#BEE3F0' },
    ],
    neutrals: [
      { name: 'Chocolate Brown', hex: '#4B3621' },
      { name: 'Khaki', hex: '#8F7A50' },
      { name: 'Beige Brown', hex: '#D8C3A5' },
    ],
  },
  // Neutral + light
  neutralLight: {
    season: 'Soft Neutral (Light)',
    description: 'Works with both cool and warm; suits soft, low-to-mid saturation colors — versatile and easy to wear.',
    bestColors: [
      { name: 'Misty Blue', hex: '#9FB1C4' },
      { name: 'Bean Paste Pink', hex: '#D3A0A0' },
      { name: 'Sage Green', hex: '#A7B79A' },
      { name: 'Oatmeal', hex: '#E3D9C6' },
      { name: 'Morandi Purple', hex: '#B6A7BE' },
    ],
    avoidColors: [
      { name: 'Neon', hex: '#39FF14' },
    ],
    neutrals: [
      { name: 'Gray Beige', hex: '#CFC6B8' },
      { name: 'Mid Gray', hex: '#8C8C8C' },
      { name: 'Soft White', hex: '#F4F1EA' },
    ],
  },
  // Neutral + deep
  neutralDeep: {
    season: 'Deep Neutral',
    description: 'Works with both cool and warm; suits mid-to-high saturation rich colors — steady and elegant.',
    bestColors: [
      { name: 'Wine Red', hex: '#7B1E3B' },
      { name: 'Dark Green', hex: '#274A3C' },
      { name: 'Navy Blue', hex: '#1F2A44' },
      { name: 'Ginger Yellow', hex: '#C88A1A' },
      { name: 'Deep Purple', hex: '#5B2A63' },
    ],
    avoidColors: [
      { name: 'Pastel Pink', hex: '#F7D6E0' },
    ],
    neutrals: [
      { name: 'Charcoal Gray', hex: '#3A3A3A' },
      { name: 'Deep Coffee', hex: '#4B3621' },
      { name: 'Ivory White', hex: '#EFE9DD' },
    ],
  },
};

// Lip color palettes: given by undertone + skin tone
export const LIP_PALETTES: Record<Undertone, ColorSwatch[]> = {
  cool: [
    { name: 'Magenta', hex: '#C71585' },
    { name: 'Raspberry', hex: '#B03060' },
    { name: 'True Red (blue-based)', hex: '#C8102E' },
    { name: 'Rosy Mauve', hex: '#B76E79' },
  ],
  warm: [
    { name: 'Coral Orange', hex: '#FF6F5E' },
    { name: 'Brick Red', hex: '#A63A24' },
    { name: 'Pumpkin', hex: '#D2691E' },
    { name: 'Warm Maple', hex: '#B14A3B' },
  ],
  neutral: [
    { name: 'Muted Red', hex: '#B5544F' },
    { name: 'Rose Milk Tea', hex: '#C48A82' },
    { name: 'Plum', hex: '#8E4B5B' },
    { name: 'True Red', hex: '#C41E3A' },
  ],
};
