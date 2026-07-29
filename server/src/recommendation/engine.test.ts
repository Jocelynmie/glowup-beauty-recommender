import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recommend } from './engine.js';
import type { FeatureInput } from './types.js';

// A baseline valid input; each test overrides only the fields it cares about.
function make(overrides: Partial<FeatureInput> = {}): FeatureInput {
  return {
    faceShape: 'oval',
    skinTone: 'light',
    undertone: 'neutral',
    eyeShape: 'almond',
    lipShape: 'full',
    eyebrow: 'straight',
    ...overrides,
  };
}

// --- Season / color-type mapping (undertone × skin depth) ---------------

test('cool + light → Cool Summer', () => {
  const r = recommend(make({ undertone: 'cool', skinTone: 'fair' }));
  assert.equal(r.outfit.season, 'Cool Summer');
});

test('cool + deep → Cool Winter', () => {
  const r = recommend(make({ undertone: 'cool', skinTone: 'deep' }));
  assert.equal(r.outfit.season, 'Cool Winter');
});

test('warm + light → Warm Spring', () => {
  const r = recommend(make({ undertone: 'warm', skinTone: 'light' }));
  assert.equal(r.outfit.season, 'Warm Spring');
});

test('warm + tan (deep bucket) → Warm Autumn', () => {
  const r = recommend(make({ undertone: 'warm', skinTone: 'tan' }));
  assert.equal(r.outfit.season, 'Warm Autumn');
});

test('neutral + medium (light bucket) → Soft Neutral', () => {
  const r = recommend(make({ undertone: 'neutral', skinTone: 'medium' }));
  assert.equal(r.outfit.season, 'Soft Neutral (Light)');
});

test('neutral + deep → Deep Neutral', () => {
  const r = recommend(make({ undertone: 'neutral', skinTone: 'deep' }));
  assert.equal(r.outfit.season, 'Deep Neutral');
});

// --- Jewelry metal by undertone ----------------------------------------

test('cool undertone → silver jewelry', () => {
  const r = recommend(make({ undertone: 'cool' }));
  assert.match(r.jewelry.metal, /Silver/);
});

test('warm undertone → gold jewelry', () => {
  const r = recommend(make({ undertone: 'warm' }));
  assert.match(r.jewelry.metal, /Gold/);
});

// --- Lip palette matches the undertone ---------------------------------

test('warm undertone lip palette includes a coral', () => {
  const r = recommend(make({ undertone: 'warm' }));
  const names = r.makeup.palette.map((c) => c.name);
  assert.ok(names.some((n) => /Coral/.test(n)), `expected a coral in ${names.join(', ')}`);
});

test('every lip swatch has a valid hex code', () => {
  const r = recommend(make());
  for (const swatch of r.makeup.palette) {
    assert.match(swatch.hex, /^#[0-9A-Fa-f]{6}$/, `${swatch.name} has bad hex ${swatch.hex}`);
  }
});

// --- Face shape drives distinct contour/blush/jewelry advice -----------

test('different face shapes yield different contour advice', () => {
  const round = recommend(make({ faceShape: 'round' })).makeup.contour;
  const square = recommend(make({ faceShape: 'square' })).makeup.contour;
  assert.notEqual(round, square);
});

test('face shape drives earring advice', () => {
  const round = recommend(make({ faceShape: 'round' })).jewelry.earrings;
  const long = recommend(make({ faceShape: 'long' })).jewelry.earrings;
  assert.notEqual(round, long);
});

// --- Every field is populated for all valid inputs ---------------------

test('all six face shapes produce a fully populated recommendation', () => {
  const shapes: FeatureInput['faceShape'][] = ['oval', 'round', 'square', 'heart', 'long', 'diamond'];
  for (const faceShape of shapes) {
    const r = recommend(make({ faceShape }));
    assert.ok(r.summary.length > 0);
    assert.ok(r.makeup.contour && r.makeup.blush && r.makeup.eyes && r.makeup.brows && r.makeup.lips);
    assert.ok(r.outfit.bestColors.length > 0);
    assert.ok(r.jewelry.metal && r.jewelry.earrings && r.jewelry.necklace);
  }
});
