import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { C, PHONE, PHONE_HREF } from "./constants";

interface Stat { label: string; value: string }
interface Feature { icon: string; title: string; desc: string }
interface Step { num: string; title: string; desc: string }
interface CalcOption { label: string; value: number }
interface FaqItem { q: string; a: string }

export interface ServicePageData {
  slug: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  description: string;
  heroImg: string;
  stats: Stat[];
  features: Feature[];
  steps: Step[];
  price: string;
  priceNote: string;
  gallery?: string[];
  faq?: FaqItem[];
  calc?: {
    unit: string;
    basePrice: number;
    options: { label: string; items: CalcOption[] }[];
  };
}

const ACCENTS = [
  { border: "rgba(56,232,255,0.4)",   icon: "rgba(56,232,255,0.10)",  color: "#38e8ff",  glow: "rgba(56,232,255,0.15)" },
  { border: "rgba(255,209,64,0.4)",   icon: "rgba(255,209,64,0.10)",  color: "#ffd140",  glow: "rgba(255,209,64,0.15)" },
  { border: "rgba(129,140,248,0.4)",  icon: "rgba(129,140,248,0.10)", color: "#a5b4fc",  glow: "rgba(129,140,248,0.15)" },
  { border: "rgba(251,146,60,0.4)",   icon: "rgba(251,146,60,0.10)",  color: "#fb923c",  glow: "rgba(251,146,60,0.15)" },
  { border: "rgba(74,222,128,0.4)",   icon: "rgba(74,222,128,0.10)",  color: "#4ade80",  glow: "rgba(74,222,128,0.15)" },
  { border: "rgba(232,121,249,0.4)",  icon: "rgba(232,121,249,0.10)", color: "#e879f9",  glow: "rgba(232,121,249,0.15)" },
];

function accent(i: number) { return ACCENTS[i % ACCENTS.length]; }

export default function ServicePageLayout({ data }: { data: ServicePageData }) {
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [calcSelections, setCalcSelections] = useState<number[]>(() =>
    (data.calc?.options ?? []).map(() => 0)
  );
  const [areaSlider, setAreaSlider] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);
  const [totalAnimating, setTotalAnimating] = useState(false);

  const areaItems = data.calc?.options[0]?.items ?? [];
  const areaIdx = Math.round(areaSlider / 100 * (areaItems.length - 1));

  const calcTotal = data.calc
    ? (() => {
        const area = areaItems[areaIdx]?.value ?? 0;
        let price = data.calc.basePrice;
        for (let i = 1; i < data.calc.options.length; i++) {
          price += data.calc.options[i]?.items[calcSelections[i]]?.value ?? 0;
        }
        return area * price;
      })()
    : 0;

  useEffect(() => {
    if (calcTotal !== prevTotal) {
      setTotalAnimating(true);
      const t = setTimeout(() => setTotalAnimating(false), 300);
      setPrevTotal(calcTotal);
      return () => clearTimeout(t);
    }
  }, [calcTotal]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.bg, color: "#fff" }}>

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

      {/* ── КАЛЬКУЛЯТОР ── */}
      {data.calc && (
        <section className="py-20 relative overflow-hidden" style={{ background: C.bg }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, rgba(255,209,64,0.06) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom right, rgba(56,232,255,0.04) 0%, transparent 65%)" }} />

          <div className="max-w-screen-xl mx-auto px-5 relative">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
                style={{ background: "rgba(255,209,64,0.08)", border: "1px solid rgba(255,209,64,0.28)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.gold }} />
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: C.gold }}>Онлайн-расчёт</span>
              </div>
              <h2 className="font-black text-4xl md:text-5xl uppercase leading-tight">
                Калькулятор <span style={{ color: C.gold }}>стоимости</span>
              </h2>
              <p className="mt-3 text-sm max-w-lg" style={{ color: C.muted }}>Укажите параметры — получите ориентировочную стоимость. Точная цена после выезда замерщика.</p>
            </div>

            <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

              {/* Левая часть — параметры */}
              <div className="space-y-8">

                {/* Ползунок площади */}
                <div className="rounded-2xl p-6" style={{ background: "linear-gradient(145deg,#1e2438,#252b3d)", border: "1px solid rgba(255,209,64,0.2)" }}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,209,64,0.12)" }}>
                        <Icon name="Maximize2" size={14} style={{ color: C.gold } as React.CSSProperties} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.subtle }}>{data.calc.options[0]?.label}</span>
                    </div>
                    <div className="font-black text-base px-3 py-1 rounded-lg" style={{ color: C.gold, background: "rgba(255,209,64,0.1)", border: "1px solid rgba(255,209,64,0.2)" }}>
                      {areaItems[areaIdx]?.label ?? "—"}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="relative h-2 rounded-full mb-1" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-150"
                        style={{ width: `${areaSlider}%`, background: `linear-gradient(90deg,${C.goldDark},${C.gold})` }} />
                      <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 transition-all duration-150"
                        style={{ left: `calc(${areaSlider}% - 10px)`, background: C.gold, borderColor: C.goldDark, boxShadow: "0 0 10px rgba(255,209,64,0.5)" }} />
                    </div>
                    <input type="range" min={0} max={100} step={1}
                      value={areaSlider}
                      onChange={e => setAreaSlider(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                      style={{ height: "24px", top: "-11px", margin: 0 }}
                    />
                  </div>

                  <div className="flex justify-between mt-4">
                    {areaItems.map((item, ii) => {
                      const pos = areaItems.length > 1 ? ii / (areaItems.length - 1) : 0;
                      const isActive = areaIdx === ii;
                      return (
                        <button key={ii}
                          onClick={() => setAreaSlider(Math.round(pos * 100))}
                          className="flex flex-col items-center gap-1.5 transition-all"
                          style={{ opacity: isActive ? 1 : 0.35 }}>
                          <div className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: isActive ? C.gold : "rgba(255,255,255,0.4)", transform: isActive ? "scale(1.5)" : "scale(1)" }} />
                          <span className="text-[9px] font-bold hidden sm:block leading-tight text-center max-w-[60px]" style={{ color: isActive ? C.gold : C.muted }}>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Остальные опции — карточки */}
                {data.calc.options.slice(1).map((opt, oi) => {
                  const realOi = oi + 1;
                  return (
                    <div key={realOi}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 rounded-full" style={{ background: C.gold }} />
                        <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.subtle }}>{opt.label}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {opt.items.map((item, ii) => {
                          const isActive = calcSelections[realOi] === ii;
                          return (
                            <button key={ii}
                              onClick={() => {
                                const next = [...calcSelections];
                                next[realOi] = ii;
                                setCalcSelections(next);
                              }}
                              className="relative text-left px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200"
                              style={isActive
                                ? { background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000", boxShadow: "0 4px 20px rgba(240,192,48,0.25)", transform: "translateY(-1px)" }
                                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: C.subtle }
                              }>
                              {isActive && (
                                <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.2)" }}>
                                  <Icon name="Check" size={10} />
                                </div>
                              )}
                              <span className="leading-tight block pr-4">{item.label}</span>
                              {item.value > 0 && (
                                <span className="text-[10px] font-semibold mt-0.5 block" style={{ color: isActive ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.25)" }}>
                                  +{item.value.toLocaleString("ru-RU")} ₽/{data.calc!.unit}
                                </span>
                              )}
                              {item.value === 0 && (
                                <span className="text-[10px] font-semibold mt-0.5 block" style={{ color: isActive ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.2)" }}>
                                  базовая цена
                                </span>
                              )}
                              {item.value < 0 && (
                                <span className="text-[10px] font-semibold mt-0.5 block" style={{ color: isActive ? "rgba(0,0,0,0.5)" : "rgba(74,222,128,0.5)" }}>
                                  {item.value.toLocaleString("ru-RU")} ₽/{data.calc!.unit}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Правая часть — итог */}
              <div className="rounded-2xl overflow-hidden sticky top-24" style={{ background: "linear-gradient(160deg,#1a2035,#252b3d)", border: "1px solid rgba(255,209,64,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
                <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: C.muted }}>Ориентировочная стоимость</div>
                  <div className="transition-all duration-300" style={{ transform: totalAnimating ? "scale(1.05)" : "scale(1)" }}>
                    <div className="font-black leading-none" style={{ fontSize: "clamp(2.2rem,6vw,3.2rem)", color: totalAnimating ? "#fff" : C.gold, transition: "color 0.3s" }}>
                      {calcTotal > 0 ? calcTotal.toLocaleString("ru-RU") + " ₽" : "—"}
                    </div>
                  </div>
                  <div className="text-xs mt-2" style={{ color: C.muted }}>
                    {areaItems[areaIdx]?.value ?? 0} {data.calc.unit} ×{" "}
                    {(() => {
                      let p = data.calc!.basePrice;
                      for (let i = 1; i < data.calc!.options.length; i++) {
                        p += data.calc!.options[i]?.items[calcSelections[i]]?.value ?? 0;
                      }
                      return p.toLocaleString("ru-RU");
                    })()} ₽/{data.calc.unit}
                  </div>
                </div>

                <div className="px-6 py-4 space-y-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: C.muted }}>Ваши параметры</div>
                  <div className="flex items-start gap-2 text-xs" style={{ color: C.subtle }}>
                    <Icon name="Maximize2" size={12} style={{ color: C.gold, marginTop: 1, flexShrink: 0 } as React.CSSProperties} />
                    <span>{data.calc.options[0]?.label}: <span style={{ color: "#fff" }}>{areaItems[areaIdx]?.label ?? "—"}</span></span>
                  </div>
                  {data.calc.options.slice(1).map((opt, oi) => (
                    <div key={oi} className="flex items-start gap-2 text-xs" style={{ color: C.subtle }}>
                      <Icon name="ChevronRight" size={12} style={{ color: C.gold, marginTop: 1, flexShrink: 0 } as React.CSSProperties} />
                      <span>{opt.label}: <span style={{ color: "#fff" }}>{opt.items[calcSelections[oi + 1]]?.label}</span></span>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 space-y-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  {[
                    { icon: "MapPin", text: "Бесплатный выезд замерщика" },
                    { icon: "FileText", text: "Смета в день обращения" },
                    { icon: "ShieldCheck", text: "Фиксированная цена в договоре" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-xs" style={{ color: C.subtle }}>
                      <Icon name={icon as "MapPin"} size={13} style={{ color: C.gold, flexShrink: 0 } as React.CSSProperties} />
                      {text}
                    </div>
                  ))}
                </div>

                <div className="p-4">
                  <a href={PHONE_HREF}
                    className="flex items-center justify-center gap-2 font-black text-sm py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000", boxShadow: "0 8px 24px rgba(240,192,48,0.3)" }}>
                    <Icon name="Phone" size={15} />
                    Уточнить точную цену
                  </a>
                  <p className="text-center text-[10px] mt-2" style={{ color: C.muted }}>Перезвоним за 30 минут</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ГАЛЕРЕЯ ── */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20 relative overflow-hidden" style={{ background: C.bgDeep }}>
          <div className="max-w-screen-xl mx-auto px-5">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
                style={{ background: "rgba(56,232,255,0.08)", border: "1px solid rgba(56,232,255,0.25)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.cyan }} />
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: C.cyan }}>Наши объекты</span>
              </div>
              <h2 className="font-black text-4xl md:text-5xl uppercase leading-tight">
                Фото <span style={{ color: C.cyan }}>работ</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {data.gallery.map((src, i) => (
                <button key={i} onClick={() => setLightbox(src)}
                  className="relative overflow-hidden rounded-2xl group"
                  style={{ aspectRatio: "4/3", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(10,14,24,0.55)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(56,232,255,0.2)", border: "1px solid rgba(56,232,255,0.5)" }}>
                      <Icon name="ZoomIn" size={18} style={{ color: C.cyan } as React.CSSProperties} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Лайтбокс */}
          {lightbox && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.92)" }}
              onClick={() => setLightbox(null)}>
              <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
                <Icon name="X" size={20} />
              </button>
              <img src={lightbox} alt="" className="max-w-full max-h-[90vh] rounded-2xl object-contain"
                onClick={e => e.stopPropagation()} />
            </div>
          )}
        </section>
      )}

      {/* ── FAQ ── */}
      {data.faq && data.faq.length > 0 && (
        <section className="py-20 relative overflow-hidden" style={{ background: C.bg }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="max-w-screen-xl mx-auto px-5 relative">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
                style={{ background: "rgba(56,232,255,0.08)", border: "1px solid rgba(56,232,255,0.25)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.cyan }} />
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: C.cyan }}>Частые вопросы</span>
              </div>
              <h2 className="font-black text-4xl md:text-5xl uppercase leading-tight">
                Вопросы и <span style={{ color: C.gold }}>ответы</span>
              </h2>
            </div>
            <div className="max-w-3xl space-y-3">
              {data.faq.map((item, i) => (
                <div key={i} className="rounded-2xl overflow-hidden transition-all"
                  style={{ background: "linear-gradient(145deg, #252b3d, #1e2438)", border: `1px solid ${openFaq === i ? "rgba(255,209,64,0.4)" : "rgba(255,255,255,0.08)"}` }}>
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-black text-sm md:text-base leading-snug">{item.q}</span>
                    <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: openFaq === i ? "rgba(255,209,64,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${openFaq === i ? "rgba(255,209,64,0.4)" : "rgba(255,255,255,0.1)"}` }}>
                      <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={15}
                        style={{ color: openFaq === i ? C.gold : C.muted } as React.CSSProperties} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 border-t" style={{ borderColor: "rgba(255,209,64,0.15)" }}>
                      <p className="pt-4 leading-relaxed" style={{ fontSize: 14.5, color: C.subtle }}>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ФОРМА ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: C.bgDeep }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <div className="max-w-xl mx-auto rounded-2xl p-8" style={{ background: "linear-gradient(145deg, #252b3d, #1e2438)", border: `1px solid ${C.borderCyan}` }}>
            {sent ? (
              <div className="py-10 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(34,211,238,0.12)", border: `1px solid ${C.borderCyan}` }}>
                  <Icon name="CheckCircle" size={32} style={{ color: C.cyan } as React.CSSProperties} />
                </div>
                <h3 className="font-black text-xl uppercase">Заявка принята!</h3>
                <p style={{ fontSize: 14.5, color: C.subtle }}>Перезвоним в течение 5 минут в рабочее время</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-8" style={{ background: C.gold }} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>Бесплатный расчёт</span>
                  </div>
                  <h2 className="font-black text-2xl uppercase">Оставить заявку</h2>
                  <p className="mt-2" style={{ fontSize: 14.5, color: C.subtle }}>
                    {data.priceNote}
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { key: "name", ph: "Имя или компания", icon: "User" },
                    { key: "phone", ph: "Телефон +7 (___) ___-__-__", icon: "Phone" },
                  ].map(({ key, ph, icon }) => (
                    <div key={key} className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon name={icon} fallback="Info" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                      </div>
                      <input
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.borderCyan}`, color: "#fff" }}
                        onFocus={e => (e.target.style.borderColor = C.cyan)}
                        onBlur={e => (e.target.style.borderColor = C.borderCyan)}
                        placeholder={ph}
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                      />
                    </div>
                  ))}
                  <div className="relative">
                    <div className="absolute left-3 top-3.5 pointer-events-none">
                      <Icon name="MessageSquare" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                    </div>
                    <textarea rows={3}
                      className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.borderCyan}`, color: "#fff" }}
                      onFocus={e => (e.target.style.borderColor = C.cyan)}
                      onBlur={e => (e.target.style.borderColor = C.borderCyan)}
                      placeholder="Объём работ, адрес объекта, пожелания"
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                    />
                  </div>
                  <button
                    onClick={() => { if (form.name && form.phone) setSent(true); }}
                    className="w-full font-black text-base py-4 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000", boxShadow: "0 4px 20px rgba(240,192,48,0.3)" }}>
                    Получить расчёт →
                  </button>
                  <p className="text-center text-[10px]" style={{ color: "#374151" }}>
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── ПОДВАЛ ── */}
      <footer style={{ background: C.bgDark, borderTop: `1px solid ${C.border}` }}>
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: "10px 20px" }}>
          <div className="max-w-screen-xl mx-auto flex items-center gap-2.5">
            <Icon name="Info" size={14} style={{ color: C.muted, flexShrink: 0 } as React.CSSProperties} />
            <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
              Обращаем ваше внимание, что сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой.
            </p>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-80" style={{ textDecoration: "none" }}>
            <svg width="42" height="47" viewBox="0 0 200 220" style={{ filter: "drop-shadow(0 2px 10px rgba(255,209,64,0.4))", flexShrink: 0 }}>
              <defs>
                <clipPath id="footSpShield">
                  <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"/>
                </clipPath>
                <linearGradient id="footSpFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="transparent"/>
                  <stop offset="100%" stopColor="rgba(10,14,24,0.7)"/>
                </linearGradient>
              </defs>
              <image
                href="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/bucket/c86c5623-6496-4556-91b1-3ddf8e92b89a.jpg"
                x="18" y="6" width="164" height="188"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#footSpShield)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="url(#footSpFade)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="none" stroke="#ffd140" strokeWidth="4"/>
            </svg>
            <div className="leading-[1.2] text-left">
              <div className="text-[8px] font-bold uppercase tracking-[0.22em]" style={{ color: C.muted }}>КОМПАНИЯ · ОНЛАЙН</div>
              <div className="font-black text-[14px] tracking-wide" style={{ color: C.gold }}>ООО Фаворит</div>
              <div className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.muted }}>АСФАЛЬТИРОВАНИЕ НН</div>
            </div>
          </Link>
          <p className="text-xs text-center" style={{ color: C.muted }}>
            © 2015–2026 ООО «Фаворит» — аренда манипуляторов в Нижнем Новгороде и области
          </p>
          <div className="flex items-center gap-5">
            <button className="text-xs transition-opacity hover:opacity-80" style={{ color: C.cyan, background: "none", border: "none", cursor: "pointer" }}>
              Политика конфиденциальности
            </button>
            <Link to="/" className="text-xs transition-opacity hover:opacity-70" style={{ color: C.muted }}>
              ← На главную
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}