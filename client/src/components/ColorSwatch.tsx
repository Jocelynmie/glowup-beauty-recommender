import { useState } from 'react';
import type { ColorSwatch as Swatch } from '../types';

// Decide readable text color (black/white) against a given hex background
function contrastText(hex: string): string {
  const c = hex.replace('#', '');
  const full = c.length === 3 ? c.split('').map((x) => x + x).join('') : c;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  // relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#333333' : '#ffffff';
}

export function SwatchList({ colors }: { colors: Swatch[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => (
        <ColorChip key={c.name + c.hex} swatch={c} />
      ))}
    </div>
  );
}

function ColorChip({ swatch }: { swatch: Swatch }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(swatch.hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard may be unavailable (e.g. non-secure context); fail silently
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={`Click to copy ${swatch.hex}`}
      className="group flex items-center gap-2 rounded-full border border-black/5 bg-white/70 py-1 pl-1 pr-3 shadow-sm transition hover:shadow-md"
    >
      <span
        className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold"
        style={{ backgroundColor: swatch.hex, color: contrastText(swatch.hex) }}
      >
        {copied ? '✓' : ''}
      </span>
      <span className="text-sm text-gray-700">
        {swatch.name}
        <span className="ml-1 text-[11px] uppercase tracking-wide text-gray-400 group-hover:text-gray-500">
          {swatch.hex}
        </span>
      </span>
    </button>
  );
}
