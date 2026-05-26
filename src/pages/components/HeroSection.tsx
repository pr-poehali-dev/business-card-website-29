import Icon from "@/components/ui/icon";
import { C, HERO_IMG, PHONE, PHONE_HREF } from "./constants";

interface HeroSectionProps {
  go: (id: string) => void;
}

export default function HeroSection({ go }: HeroSectionProps) {
  return (
    <>
      {/* ── ГЕРОЙ ── */}
      <section id="hero" className="relative overflow-hidden pt-[70px]" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Асфальтирование Фаворит" className="w-full h-full object-cover" style={{ filter: "saturate(1.2) contrast(1.05)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,14,24,0.88) 0%, rgba(10,14,24,0.55) 60%, rgba(10,14,24,0.15) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,24,1) 0%, rgba(10,14,24,0.3) 40%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-5 flex flex-col justify-center" style={{ minHeight: "calc(100svh - 70px)", paddingTop: "3rem", paddingBottom: "5rem" }}>
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.muted }}>Листайте</div>
          <Icon name="ChevronDown" size={20} style={{ color: C.cyan } as React.CSSProperties} />
        </div>
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
