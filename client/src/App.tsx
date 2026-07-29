import { useEffect, useRef, useState } from 'react';
import { getOptions, postRecommend } from './api';
import type {
  FeatureDraft, FeatureInput, FeatureKey, OptionsResponse, Recommendation,
} from './types';
import { FeatureForm } from './components/FeatureForm';
import { Results } from './components/Results';

export default function App() {
  const [options, setOptions] = useState<OptionsResponse | null>(null);
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const [draft, setDraft] = useState<FeatureDraft>({});
  const [result, setResult] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load the form options once on mount
  useEffect(() => {
    getOptions()
      .then(setOptions)
      .catch((e: Error) => setOptionsError(e.message));
  }, []);

  const handleChange = (key: FeatureKey, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const rec = await postRecommend(draft as FeatureInput);
      setResult(rec);
      // Smoothly scroll to the results after they render
      window.setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDraft({});
    setResult(null);
    setError(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="bg-gradient-to-r from-pink-600 to-fuchsia-600 bg-clip-text text-4xl font-extrabold text-transparent">
          GlowUp ✨
        </h1>
        <p className="mt-2 text-gray-600">
          Tell us your facial features and get a personalized makeup, outfit-color, and jewelry plan.
        </p>
      </header>

      {optionsError && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
          Failed to load form options: {optionsError}. Please make sure the backend is running on port 4000.
        </div>
      )}

      {!options && !optionsError && (
        <div className="py-20 text-center text-gray-400">Loading the questionnaire…</div>
      )}

      {options && (
        <div className="space-y-8">
          <FeatureForm
            options={options}
            draft={draft}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
              {error}
            </div>
          )}

          {result && (
            <div ref={resultsRef} className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Your GlowUp Plan</h2>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-600 transition hover:border-pink-300 hover:text-pink-600"
                >
                  Start over
                </button>
              </div>
              <Results data={result} />
            </div>
          )}
        </div>
      )}

      <footer className="mt-16 text-center text-xs text-gray-400">
        GlowUp · Recommendations are rule-based suggestions — trust your own taste too 💕
      </footer>
    </div>
  );
}
