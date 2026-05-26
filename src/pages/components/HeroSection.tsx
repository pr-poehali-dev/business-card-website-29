import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { C, PHONE, PHONE_HREF, WORKS, HERO_IMG } from "./constants";

interface HeroSectionProps {
  go: (id: string) => void;
}

const PHOTOS = [
  HERO_IMG,
  ...WORKS.slice(0, 5).map(w => w.img),
];

export default function HeroSection({ go }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % PHOTOS.length);
        setFading(false);
      }, 1200);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes kenBurns0 {
          from { transform: scale(1.0) translate(0%, 0%); }
          to   { transform: scale(1.12) translate(-2%, -1%); }
        }
        @keyframes kenBurns1 {
          from { transform: scale(1.08) translate(1%, 1%); }
          to   { transform: scale(1.0) translate(-1%, 0%); }
        }
        @keyframes kenBurns2 {
          from { transform: scale(1.0) translate(-1%, 0%); }
          to   { transform: scale(1.1) translate(2%, 1%); }
        }
        @keyframes kenBurns3 {
          from { transform: scale(1.1) translate(0%, -1%); }
          to   { transform: scale(1.0) translate(1%, 1%); }
        }
        @keyframes kenBurns4 {
          from { transform: scale(1.0) translate(1%, 1%); }
          to   { transform: scale(1.12) translate(-1%, -1%); }
        }
        @keyframes kenBurns5 {
          from { transform: scale(1.08) translate(-2%, 0%); }
          to   { transform: scale(1.0) translate(0%, 1%); }
        }
        .kb-0 { animation: kenBurns0 7.2s ease-in-out forwards; }
        .kb-1 { animation: kenBurns1 7.2s ease-in-out forwards; }
        .kb-2 { animation: kenBurns2 7.2s ease-in-out forwards; }
        .kb-3 { animation: kenBurns3 7.2s ease-in-out forwards; }
        .kb-4 { animation: kenBurns4 7.2s ease-in-out forwards; }
        .kb-5 { animation: kenBurns5 7.2s ease-in-out forwards; }
      `}</style>

      <section id="hero" className="relative overflow-hidden pt-[70px]"
        style={{ minHeight: "100svh", background: C.bgDark }}>

        {/* Фото — полный экран с Ken Burns */}
        <div className="absolute inset-0" style={{ zIndex: 0, overflow: "hidden" }}>
          <img
            key={current}
            src={PHOTOS[current]}
            alt=""
            className={`w-full h-full object-cover kb-${current % 6}`}
            style={{
              filter: "saturate(1.1) contrast(1.05) brightness(1.0)",
              opacity: fading ? 0 : 1,
              transition: "opacity 1.2s ease",
              transformOrigin: "center center",
            }}
          />
        </div>

        {/* Тёмный слой слева для читаемости текста */}
        <div className="absolute inset-0" style={{
          zIndex: 1,
          background: "linear-gradient(100deg, rgba(10,14,24,0.92) 0%, rgba(10,14,24,0.7) 40%, rgba(10,14,24,0.2) 70%, transparent 100%)",
        }} />
        {/* Тёмный слой снизу */}
        <div className="absolute inset-0" style={{
          zIndex: 1,
          background: "linear-gradient(to top, rgba(10,14,24,1) 0%, rgba(10,14,24,0.4) 25%, transparent 55%)",
        }} />

        {/* Точки-индикаторы */}
        <div className="absolute bottom-20 right-6 flex flex-col gap-2" style={{ zIndex: 10 }}>
          {PHOTOS.map((_, i) => (
            <button key={i}
              onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 600); }}
              style={{
                width: 6, height: i === current ? 22 : 6,
                borderRadius: 4,
                background: i === current ? C.cyan : "rgba(255,255,255,0.25)",
                border: "none", cursor: "pointer",
                transition: "all 0.4s ease",
                padding: 0,
              }} />
          ))}
        </div>

        {/* Контент */}
        <div className="relative max-w-screen-xl mx-auto px-5 flex flex-col justify-center"
          style={{ minHeight: "calc(100svh - 70px)", paddingTop: "3rem", paddingBottom: "6rem", zIndex: 5 }}>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(56,232,255,0.08)", border: `1px solid rgba(56,232,255,0.28)`, color: C.cyan }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.cyan }} />
              Нижний Новгород и область · Работаем 24/7
            </div>

            <h1 className="leading-[1.05] mb-6 whitespace-nowrap" style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif", fontSize: "clamp(2rem, 5.2vw, 5.4rem)", letterSpacing: "0.02em", textShadow: "0 2px 30px rgba(0,0,0,0.7)" }}>
              Профессиональное <span style={{ color: C.cyan }}>асфальтирование</span> в НН
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
                ["Clock",        "Начало работ от 1 дня"],
                ["CalendarCheck","Мин. заказ — 200 м²"],
                ["Users",        "Собственная бригада"],
                ["Receipt",      "Работаем с НДС"],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.subtle }}>
                  <Icon name={icon} fallback="Check" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={PHONE_HREF}
                className="flex items-center gap-2 font-black text-sm px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95"
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" style={{ zIndex: 6 }}>
          <button onClick={() => go("services")}
            className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-60"
            style={{ color: C.muted, background: "none", border: "none", cursor: "pointer" }}>
            <span className="text-[9px] font-bold uppercase tracking-widest">Смотреть ниже</span>
            <Icon name="ChevronDown" size={18} />
          </button>
        </div>
      </section>
    </>
  );
}