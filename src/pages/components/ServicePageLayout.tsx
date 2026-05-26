import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { C, PHONE, PHONE_HREF } from "./constants";

interface Stat { label: string; value: string }
interface Feature { icon: string; title: string; desc: string }
interface Step { num: string; title: string; desc: string }

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
          <img src={data.heroImg} alt={data.title} className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(15,20,34,0.25), rgba(15,20,34,0.75) 80%, ${C.bgDark})` }} />
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

      {/* ── ФОРМА ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: C.bg }}>
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
        {/* Дисклеймер */}
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: "10px 20px" }}>
          <div className="max-w-screen-xl mx-auto flex items-center gap-2.5">
            <Icon name="Info" size={14} style={{ color: C.muted, flexShrink: 0 } as React.CSSProperties} />
            <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
              Обращаем ваше внимание, что сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой.
            </p>
          </div>
        </div>
        {/* Копирайт */}
        <div className="max-w-screen-xl mx-auto px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center md:text-left" style={{ color: C.muted }}>
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