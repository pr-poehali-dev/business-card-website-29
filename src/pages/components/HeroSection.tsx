import { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { C, HERO_IMG, PHONE, PHONE_HREF, WORKS } from "./constants";

interface HeroSectionProps {
  go: (id: string) => void;
}

const SLIDES = [{ img: HERO_IMG, tag: "", title: "", area: "", city: "" }, ...WORKS];
const INTERVAL = 5000;
const FADE_MS = 800;

export default function HeroSection({ go }: HeroSectionProps) {
  const [cur, setCur] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCur((c) => {
        const n = (c + 1) % SLIDES.length;
        setNext(n);
        setTimeout(() => { setCur(n); setNext(null); }, FADE_MS);
        return c;
      });
    }, INTERVAL);
  }

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function goTo(i: number) {
    if (i === cur || next !== null) return;
    setNext(i);
    setTimeout(() => { setCur(i); setNext(null); }, FADE_MS);
    startTimer();
  }

  function advance(dir: number) {
    if (next !== null) return;
    const n = (cur + dir + SLIDES.length) % SLIDES.length;
    setNext(n);
    setTimeout(() => { setCur(n); setNext(null); }, FADE_MS);
    startTimer();
  }

  const slide = SLIDES[cur];
  const nextSlide = next !== null ? SLIDES[next] : null;

  return (
    <>
      {/* ── ГЕРОЙ ── */}
      <section id="hero" className="relative overflow-hidden pt-[70px]" style={{ minHeight: "100svh" }}>

        {/* Текущий слайд — уходит */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <img
            src={slide.img}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "saturate(1.2) contrast(1.05)", transition: `opacity ${FADE_MS}ms ease`, opacity: next !== null ? 0 : 1 }}
          />
        </div>

        {/* Следующий слайд — появляется */}
        {nextSlide && (
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <img
              src={nextSlide.img}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "saturate(1.2) contrast(1.05)", animation: `heroFadeIn ${FADE_MS}ms ease forwards` }}
            />
          </div>
        )}

        {/* Градиенты */}
        <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(105deg, rgba(10,14,24,0.88) 0%, rgba(10,14,24,0.55) 60%, rgba(10,14,24,0.15) 100%)" }} />
        <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(to top, rgba(10,14,24,1) 0%, rgba(10,14,24,0.3) 40%, transparent 70%)" }} />

        {/* Карточка объекта — правый верхний угол */}
        <div className="absolute top-[90px] right-5 md:right-10 hidden md:block" style={{ zIndex: 10, width: 270 }}>
          <div style={{
            borderRadius: 14, overflow: "hidden",
            border: "1px solid rgba(34,211,238,0.25)",
            backdropFilter: "blur(12px)",
            background: "rgba(10,14,24,0.70)",
            transition: `opacity ${FADE_MS}ms ease`,
            opacity: slide.tag ? 1 : 0,
          }}>
            <div style={{ height: 3, background: `linear-gradient(to right, ${C.cyan}, ${C.gold})` }} />
            <div style={{ padding: "12px 16px" }}>
              <div style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: C.cyan, marginBottom: 4 }}>
                {slide.tag}
              </div>
              <div style={{ fontWeight: 900, fontSize: 13, textTransform: "uppercase", lineHeight: 1.3, marginBottom: 8 }}>
                {slide.title}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: C.muted }}>
                  <Icon name="Maximize2" size={11} style={{ color: C.muted } as React.CSSProperties} />
                  {slide.area}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: C.muted }}>
                  <Icon name="MapPin" size={11} style={{ color: C.muted } as React.CSSProperties} />
                  {slide.city}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="relative max-w-screen-xl mx-auto px-5 flex flex-col justify-center"
          style={{ minHeight: "calc(100svh - 70px)", paddingTop: "3rem", paddingBottom: "6rem", zIndex: 3 }}>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(34,211,238,0.08)", border: `1px solid rgba(34,211,238,0.25)`, color: C.cyan }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.cyan }} />
              Нижний Новгород и область · Работаем 24/7
            </div>

            <h1 className="font-black leading-[1.0] mb-6" style={{ fontSize: "clamp(2.4rem,6vw,5rem)", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              Профессиональное<br />
              <span style={{ color: C.cyan }}>асфальтирование</span><br />
              в Нижнем Новгороде
            </h1>

            <p className="text-lg leading-relaxed mb-7 max-w-xl" style={{ color: C.light }}>
              Укладка асфальта, ямочный ремонт, парковки, промзоны — под ключ.<br />Подача бригады за 24 часа. Гарантия 3 года.
            </p>

            <div className="inline-flex items-center gap-3 rounded-xl px-5 py-3 mb-8"
              style={{ background: "rgba(240,192,48,0.12)", border: `1px solid rgba(240,192,48,0.4)`, backdropFilter: "blur(8px)" }}>
              <Icon name="Layers" size={20} style={{ color: C.gold } as React.CSSProperties} />
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: C.muted }}>Стоимость работ</div>
                <div className="font-black text-2xl" style={{ color: C.gold }}>от 1 200 ₽/м²</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
              {[
                ["Clock", "Начало работ от 1 дня"],
                ["CalendarCheck", "Мин. заказ — 200 м²"],
                ["Users", "Собственная бригада"],
                ["Receipt", "Работаем с НДС"],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.subtle }}>
                  <Icon name={icon} fallback="Check" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={PHONE_HREF}
                className="flex items-center gap-2 font-black text-sm px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg"
                style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000", boxShadow: "0 4px 20px rgba(240,192,48,0.4)" }}>
                <Icon name="Phone" size={16} />
                Позвонить: {PHONE}
              </a>
              <button onClick={() => go("form")}
                className="font-black text-sm px-8 py-4 rounded-full border transition-all hover:scale-105"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
                Оставить заявку
              </button>
            </div>
          </div>
        </div>

        {/* Стрелки */}
        <button onClick={() => advance(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
          style={{ zIndex: 10, width: 44, height: 44, background: "rgba(10,14,24,0.55)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff" }}>
          <Icon name="ChevronLeft" size={20} />
        </button>
        <button onClick={() => advance(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
          style={{ zIndex: 10, width: 44, height: 44, background: "rgba(10,14,24,0.55)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff" }}>
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Точки */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              height: 6, borderRadius: 3, border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.35s ease, background 0.35s ease",
              width: i === cur ? 28 : 6,
              background: i === cur ? C.cyan : "rgba(255,255,255,0.22)",
            }} />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ zIndex: 10 }}>
          <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.muted }}>Листайте</div>
          <Icon name="ChevronDown" size={20} style={{ color: C.cyan } as React.CSSProperties} />
        </div>

        <style>{`@keyframes heroFadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      </section>

      {/* ── СТАТЫ ── */}
      <div style={{ background: C.bgDark, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-screen-xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x" style={{ borderColor: C.border }}>
          {[
            { val: "350+", label: "Объектов сдано" },
            { val: "800к м²", label: "Уложено асфальта" },
            { val: "11 лет", label: "На рынке НН" },
            { val: "24 ч", label: "Выезд на замер" },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <div className="font-black text-3xl" style={{ color: C.cyan }}>{s.val}</div>
              <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: C.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
