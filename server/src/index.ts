import express from 'express';
import cors from 'cors';
import { OPTIONS } from './recommendation/knowledgeBase.js';
import { recommend } from './recommendation/engine.js';
import { enhance, aiEnabled } from './recommendation/aiEnhance.js';
import type { FeatureInput } from './recommendation/types.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Health check — also reports whether AI enhancement is available
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, aiEnabled: aiEnabled() });
});

// 返回所有表单选项，供前端动态渲染
app.get('/api/options', (_req, res) => {
  res.json(OPTIONS);
});

// 校验输入是否为合法枚举值
function validate(body: any): { ok: true; value: FeatureInput } | { ok: false; error: string } {
  const fields: (keyof typeof OPTIONS)[] = [
    'faceShape', 'skinTone', 'undertone', 'eyeShape', 'lipShape', 'eyebrow',
  ];
  for (const f of fields) {
    const value = body?.[f];
    const allowed = OPTIONS[f].map((o) => o.value);
    if (typeof value !== 'string' || !allowed.includes(value as never)) {
      return { ok: false, error: `Field "${f}" is missing or invalid; expected one of: ${allowed.join(' / ')}` };
    }
  }
  return { ok: true, value: body as FeatureInput };
}

// Core recommendation endpoint (rule-based, deterministic)
app.post('/api/recommend', (req, res) => {
  const result = validate(req.body);
  if (!result.ok) {
    return res.status(400).json({ error: result.error });
  }
  const recommendation = recommend(result.value);
  res.json(recommendation);
});

// AI-enhanced recommendation — refines the rule-based prose via Claude, and
// gracefully falls back to the rule-based result if AI is unavailable.
app.post('/api/recommend/ai', async (req, res) => {
  const result = validate(req.body);
  if (!result.ok) {
    return res.status(400).json({ error: result.error });
  }
  const base = recommend(result.value);
  const { recommendation, usedAi } = await enhance(result.value, base);
  res.json({ ...recommendation, usedAi });
});

app.listen(PORT, () => {
  console.log(`✨ GlowUp API is running: http://localhost:${PORT}`);
});
