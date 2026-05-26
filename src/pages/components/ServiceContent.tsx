import Icon from "@/components/ui/icon";
import { C } from "./constants";
import { ServicePageData } from "./ServicePageLayout";

const ACCENTS = [
  { border: "rgba(56,232,255,0.4)",   icon: "rgba(56,232,255,0.10)",  color: "#38e8ff",  glow: "rgba(56,232,255,0.15)" },
  { border: "rgba(255,209,64,0.4)",   icon: "rgba(255,209,64,0.10)",  color: "#ffd140",  glow: "rgba(255,209,64,0.15)" },
  { border: "rgba(129,140,248,0.4)",  icon: "rgba(129,140,248,0.10)", color: "#a5b4fc",  glow: "rgba(129,140,248,0.15)" },
  { border: "rgba(251,146,60,0.4)",   icon: "rgba(251,146,60,0.10)",  color: "#fb923c",  glow: "rgba(251,146,60,0.15)" },
  { border: "rgba(74,222,128,0.4)",   icon: "rgba(74,222,128,0.10)",  color: "#4ade80",  glow: "rgba(74,222,128,0.15)" },
  { border: "rgba(232,121,249,0.4)",  icon: "rgba(232,121,249,0.10)", color: "#e879f9",  glow: "rgba(232,121,249,0.15)" },
];

function accent(i: number) { return ACCENTS[i % ACCENTS.length]; }

export default function ServiceContent({ data }: { data: ServicePageData }) {
  return (
    <>
      {/* ── ПРЕИМУЩЕСТВА ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: C.bg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none" style={{ background: `radial-gradient(ellipse at top right, rgba(56,232,255,0.06) 0%, transparent 65%)` }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
              style={{ background: "rgba(56,232,255,0.08)", border: "1px solid rgba(56,232,255,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.cyan }} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: C.cyan }}>Почему выбирают нас</span>
            </div>
            <h2 className="font-black text-4xl md:text-5xl uppercase leading-tight">
              Наши <span style={{ color: C.gold }}>преимущества</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.features.map((f, i) => {
              const a = accent(i);
              return (
                <div key={i}
                  className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5"
                  style={{ background: "linear-gradient(145deg, #252b3d, #1e2438)", border: `1px solid ${a.border}` }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 12px 40px ${a.glow}`;
                    e.currentTarget.style.borderColor = a.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = a.border;
                  }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: a.icon, border: `1px solid ${a.border}` }}>
                      <Icon name={f.icon} fallback="Check" size={20} style={{ color: a.color } as React.CSSProperties} />
                    </div>
                    <h3 className="font-black text-sm uppercase leading-snug">{f.title}</h3>
                  </div>
                  <div className="h-0.5 mb-4 w-10 rounded-full" style={{ background: `linear-gradient(to right, ${a.color}, transparent)` }} />
                  <p className="leading-relaxed" style={{ fontSize: 14.5, color: C.subtle }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── КАК РАБОТАЕМ ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: C.bgDeep }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: `radial-gradient(ellipse at bottom, rgba(255,209,64,0.07) 0%, transparent 65%)` }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
              style={{ background: "rgba(255,209,64,0.08)", border: "1px solid rgba(255,209,64,0.28)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.gold }} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: C.gold }}>Просто и прозрачно</span>
            </div>
            <h2 className="font-black text-4xl md:text-5xl uppercase leading-tight">
              Как мы <span style={{ color: C.cyan }}>работаем</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {data.steps.map((s, i) => {
              const a = accent(i);
              return (
                <div key={i}
                  className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5"
                  style={{ background: "linear-gradient(145deg, #252b3d, #1e2438)", border: `1px solid ${a.border}` }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 12px 40px ${a.glow}`;
                    e.currentTarget.style.borderColor = a.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = a.border;
                  }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                      style={{ background: a.icon, border: `1px solid ${a.border}`, color: a.color }}>
                      {s.num}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{ background: a.icon, color: a.color, border: `1px solid ${a.border}` }}>
                      ШАГ {s.num}
                    </span>
                  </div>
                  <div className="h-0.5 mb-3 w-10 rounded-full" style={{ background: `linear-gradient(to right, ${a.color}, transparent)` }} />
                  <div className="font-black text-sm uppercase mb-2">{s.title}</div>
                  <p style={{ fontSize: 13.5, color: C.subtle, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
