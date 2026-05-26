import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { C, PHONE, PHONE_HREF } from "./constants";
import { ServicePageData } from "./ServicePageLayout";

const ACCENTS = [
  { border: "rgba(56,232,255,0.4)",   color: "#38e8ff" },
  { border: "rgba(255,209,64,0.4)",   color: "#ffd140" },
  { border: "rgba(129,140,248,0.4)",  color: "#a5b4fc" },
  { border: "rgba(251,146,60,0.4)",   color: "#fb923c" },
  { border: "rgba(74,222,128,0.4)",   color: "#4ade80" },
  { border: "rgba(232,121,249,0.4)",  color: "#e879f9" },
];

function accent(i: number) { return ACCENTS[i % ACCENTS.length]; }

export default function ServiceHeader({ data }: { data: ServicePageData }) {
  return (
    <>
      {/* ── ШАПКА ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b" style={{ background: "rgba(24,29,46,0.97)", borderColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-screen-xl mx-auto px-5 h-[70px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <svg width="42" height="47" viewBox="0 0 200 220" style={{ filter: "drop-shadow(0 2px 12px rgba(240,192,48,0.45))", flexShrink: 0 }}>
              <defs>
                <clipPath id="spShield">
                  <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"/>
                </clipPath>
                <linearGradient id="spFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="transparent"/>
                  <stop offset="100%" stopColor="rgba(10,14,24,0.8)"/>
                </linearGradient>
              </defs>
              <image
                href="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/bucket/c86c5623-6496-4556-91b1-3ddf8e92b89a.jpg"
                x="18" y="6" width="164" height="188"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#spShield)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="url(#spFade)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="none" stroke="#ffd140" strokeWidth="4"/>
            </svg>
            <div className="leading-[1.2]">
              <div className="font-black text-[15px] tracking-wide" style={{ color: C.gold }}>ООО Фаворит</div>
              <div className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.muted }}>Нижний Новгород</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors"
              style={{ color: C.muted }}>
              <Icon name="ArrowLeft" size={13} />
              На главную
            </Link>
            <a href={PHONE_HREF}
              className="flex items-center gap-2 font-black text-sm rounded-full px-4 py-2 border transition-all hover:scale-105"
              style={{ borderColor: C.gold, color: C.gold }}>
              <Icon name="Phone" size={13} />
              <span className="hidden sm:inline">{PHONE}</span>
              <span className="sm:hidden">Позвонить</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── ГЕРОЙ ── */}
      <section className="relative pt-[70px] min-h-[60vh] flex items-end pb-16" style={{ background: C.bgDark }}>
        <div className="absolute inset-0">
          <img src={data.heroImg} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(15,20,34,0.15), rgba(15,20,34,0.65) 80%, ${C.bgDark})` }} />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-5 w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 transition-colors hover:opacity-80" style={{ color: C.cyan }}>
            <Icon name="ChevronLeft" size={14} />
            Все услуги
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background: C.cyan }} />
            <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.cyan }}>{data.subtitle}</span>
          </div>
          <h1 className="font-black text-5xl md:text-7xl uppercase leading-tight mb-4">
            {data.title} <span style={{ color: C.gold }}>{data.titleAccent}</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: "#a8b3c7" }}>{data.description}</p>
          <div className="flex flex-wrap gap-4">
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 font-black text-base py-3 px-8 rounded-full transition-all hover:scale-[1.03]"
              style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000" }}>
              <Icon name="Phone" size={16} />
              Получить расчёт
            </a>
            <div className="inline-flex items-center gap-2 font-black text-sm py-3 px-6 rounded-full border"
              style={{ borderColor: C.borderCyan, color: C.cyan }}>
              <Icon name="Tag" size={14} />
              {data.price}
            </div>
          </div>
        </div>
      </section>

      {/* ── СТАТИСТИКА ── */}
      <section className="py-12 border-y" style={{ background: C.bgDeep, borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.stats.map((s, i) => {
              const a = accent(i);
              return (
                <div key={i} className="text-center rounded-2xl p-5" style={{ background: "linear-gradient(145deg, #252b3d, #1e2438)", border: `1px solid ${a.border}` }}>
                  <div className="font-black text-3xl md:text-4xl mb-1" style={{ color: a.color }}>{s.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.muted }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
