import type { FeatureDraft, FeatureKey, OptionsResponse } from '../types';

// Display metadata for each feature group (label + emoji + order)
const GROUPS: { key: FeatureKey; title: string; icon: string }[] = [
  { key: 'faceShape', title: 'Face Shape', icon: '🙂' },
  { key: 'skinTone', title: 'Skin Tone', icon: '🎨' },
  { key: 'undertone', title: 'Undertone', icon: '🌡️' },
  { key: 'eyeShape', title: 'Eye Shape', icon: '👁️' },
  { key: 'lipShape', title: 'Lip Shape', icon: '💋' },
  { key: 'eyebrow', title: 'Eyebrow', icon: '✏️' },
];

interface Props {
  options: OptionsResponse;
  draft: FeatureDraft;
  onChange: (key: FeatureKey, value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function FeatureForm({ options, draft, onChange, onSubmit, loading }: Props) {
  const answered = GROUPS.filter((g) => draft[g.key]).length;
  const complete = answered === GROUPS.length;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (complete && !loading) onSubmit();
      }}
      className="space-y-6"
    >
      {GROUPS.map((group) => (
        <fieldset key={group.key} className="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5">
          <legend className="mb-3 flex items-center gap-2 px-1 text-base font-semibold text-gray-800">
            <span aria-hidden>{group.icon}</span>
            {group.title}
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {options[group.key].map((opt) => {
              const selected = draft[group.key] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange(group.key, opt.value)}
                  className={[
                    'rounded-xl border px-3 py-2 text-left transition',
                    selected
                      ? 'border-pink-400 bg-pink-50 ring-2 ring-pink-200'
                      : 'border-gray-200 bg-white hover:border-pink-200 hover:bg-pink-50/40',
                  ].join(' ')}
                >
                  <div className="text-sm font-medium text-gray-800">{opt.label}</div>
                  {opt.hint && <div className="mt-0.5 text-xs leading-snug text-gray-500">{opt.hint}</div>}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur">
        <span className="text-sm text-gray-500">
          {answered} / {GROUPS.length} selected
        </span>
        <button
          type="submit"
          disabled={!complete || loading}
          className={[
            'rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition',
            complete && !loading
              ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600'
              : 'cursor-not-allowed bg-gray-300',
          ].join(' ')}
        >
          {loading ? 'Generating…' : complete ? '✨ Get my recommendations' : 'Complete all fields'}
        </button>
      </div>
    </form>
  );
}
