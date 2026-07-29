import type { Recommendation } from '../types';
import { SwatchList } from './ColorSwatch';

function Card({
  title, icon, stagger, children,
}: {
  title: string; icon: string; stagger: 1 | 2 | 3; children: React.ReactNode;
}) {
  return (
    <section className={`animate-fade-up stagger-${stagger} rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5`}>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
        <span aria-hidden>{icon}</span>
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-pink-500">{label}</div>
      <div className="mt-1 text-sm leading-relaxed text-gray-700">{children}</div>
    </div>
  );
}

export function Results({ data }: { data: Recommendation }) {
  const { makeup, outfit, jewelry } = data;
  return (
    <div className="space-y-5">
      <div className="animate-fade-up rounded-2xl bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 p-5 ring-1 ring-pink-200/50">
        <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Makeup */}
        <Card title="Makeup" icon="💄" stagger={1}>
          <Row label="Contour">{makeup.contour}</Row>
          <Row label="Blush">{makeup.blush}</Row>
          <Row label="Eyes">{makeup.eyes}</Row>
          <Row label="Brows">{makeup.brows}</Row>
          <Row label="Lips">{makeup.lips}</Row>
          <Row label="Lip palette">
            <SwatchList colors={makeup.palette} />
          </Row>
        </Card>

        {/* Outfit */}
        <Card title="Outfit Colors" icon="👗" stagger={2}>
          <Row label="Color type">
            <span className="font-medium text-gray-800">{outfit.season}</span>
            <p className="mt-1 text-gray-600">{outfit.description}</p>
          </Row>
          <Row label="Best colors">
            <SwatchList colors={outfit.bestColors} />
          </Row>
          <Row label="Versatile neutrals">
            <SwatchList colors={outfit.neutrals} />
          </Row>
          <Row label="Colors to avoid">
            <SwatchList colors={outfit.avoidColors} />
          </Row>
        </Card>

        {/* Jewelry */}
        <Card title="Jewelry" icon="💍" stagger={3}>
          <Row label="Metal tone">{jewelry.metal}</Row>
          <Row label="Earrings">{jewelry.earrings}</Row>
          <Row label="Necklace">{jewelry.necklace}</Row>
          <Row label="Notes">{jewelry.notes}</Row>
        </Card>
      </div>
    </div>
  );
}
