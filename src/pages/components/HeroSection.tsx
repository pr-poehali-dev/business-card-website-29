import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { C, PHONE, PHONE_HREF, WORKS } from "./constants";

interface HeroSectionProps {
  go: (id: string) => void;
}

const PHOTOS = WORKS.slice(0, 6).map(w => ({ img: w.img, tag: w.tag, title: w.title }));

const POSITIONS = [
  { top: "8%",  right: "2%",  w: 220, h: 155, rotate: 2,   delay: 0.1 },
  { top: "5%",  right: "28%", w: 195, h: 140, rotate: -2,  delay: 0.25 },
  { top: "38%", right: "0%",  w: 240, h: 165, rotate: 1.5, delay: 0.4 },
  { top: "36%", right: "30%", w: 210, h: 150, rotate: -1,  delay: 0.55 },
  { top: "68%", right: "5%",  w: 200, h: 140, rotate: -2,  delay: 0.7 },
  { top: "66%", right: "28%", w: 185, h: 135, rotate: 2.5, delay: 0.85 },
];

export default function HeroSection({ go }: HeroSectionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes photoIn {
          from { opacity: 0; transform: scale(0.82) translateY(22px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes photoFloat {
          0%, 100% { transform: translateY(0px) rotate(var(--r)); }
          50%       { transform: translateY(-6px) rotate(var(--r)); }
        }
      `}</style>

      {/* ── ГЕРОЙ ── */}
      <section id="hero" className="relative overflow-hidden pt-[70px]"
        style={{ minHeight: "100svh", background: C.bgDark }}>

        {/* Фоновый паттерн */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(34,211,238,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(240,192,48,0.04) 0%, transparent 50%)",
          zIndex: 0,
        }} />

        {/* Сетка */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 0,
        }} />

        {/* Коллаж фото — правая половина */}
        <div className="absolute inset-0 hidden lg:block" style={{ zIndex: 1 }}>
          {PHOTOS.map((p, i) => {
            const pos = POSITIONS[i];
            return (
              <div key={i} style={{
                position: "absolute",
                top: pos.top,
                right: pos.right,
                width: pos.w,
                height: pos.h,
                borderRadius: 14,
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.10)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
                animation: visible
                  ? `photoIn 0.65s cubic-bezier(0.22,1,0.36,1) ${pos.delay}s both, photoFloat 5s ease-in-out ${pos.delay + 1}s infinite`
                  : "none",
                ["--r" as string]: `${pos.rotate}deg`,
                opacity: visible ? undefined : 0,
                zIndex: i === 0 || i === 2 || i === 4 ? 3 : 2,
              }}>
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(1.15) contrast(1.05)" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(10,14,24,0.75) 0%, transparent 50%)",
                }} />
                <div style={{
                  position: "absolute", bottom: 8, left: 10, right: 10,
                  fontSize: 9, fontWeight: 900, textTransform: "uppercase",
                  letterSpacing: "0.1em", color: "#fff", lineHeight: 1.3,
                  textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                }}>
                  <span style={{ color: C.cyan, marginRight: 4 }}>●</span>{p.tag}
                </div>
              </div>
            );
          })}

          {/* Тень слева от коллажа — плавный переход к тексту */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(10,14,24,1) 0%, rgba(10,14,24,0.85) 35%, rgba(10,14,24,0.3) 60%, transparent 100%)",
            zIndex: 4,
            pointerEvents: "none",
          }} />
        </div>

        {/* Градиент снизу */}
        <div className="absolute inset-0" style={{
          zIndex: 5,
          background: "linear-gradient(to top, rgba(10,14,24,1) 0%, rgba(10,14,24,0.15) 30%, transparent 55%)",
          pointerEvents: "none",
        }} />

        {/* Контент */}
        <div className="relative max-w-screen-xl mx-auto px-5 flex flex-col justify-center"
          style={{ minHeight: "calc(100svh - 70px)", paddingTop: "3rem", paddingBottom: "6rem", zIndex: 6 }}>
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

        {/* Скролл вниз */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 7 }}>
          <button onClick={() => go("services")}
            className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
            style={{ color: C.muted }}>
            <span className="text-[9px] font-bold uppercase tracking-widest">Смотреть ниже</span>
            <Icon name="ChevronDown" size={18} />
          </button>
        </div>
      </section>
    </>
  );
}
