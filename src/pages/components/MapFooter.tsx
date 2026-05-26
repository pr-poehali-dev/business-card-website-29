import Icon from "@/components/ui/icon";
import { C } from "./constants";
import YandexMap from "./YandexMap";

interface Props {
  go: (id: string) => void;
}

export default function MapFooter({ go }: Props) {
  return (
    <>
      {/* ── КАРТА ── */}
      <section className="py-16 relative overflow-hidden" style={{ background: C.bgDeep }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
              style={{ background: `${C.gold}14`, border: `1px solid ${C.gold}35` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.gold }} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: C.gold }}>Мы на карте</span>
            </div>
            <h2 className="font-black text-4xl md:text-5xl uppercase leading-tight">
              Нижний <span style={{ color: C.cyan }}>Новгород</span>
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.borderCyan}`, height: 440 }}>
            <YandexMap />
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
        <div className="max-w-screen-xl mx-auto px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Лого */}
          <button onClick={() => go("hero")} className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-80">
            <svg width="42" height="47" viewBox="0 0 200 220" style={{ filter: "drop-shadow(0 2px 10px rgba(255,209,64,0.4))", flexShrink: 0 }}>
              <defs>
                <clipPath id="footShield">
                  <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"/>
                </clipPath>
                <linearGradient id="footFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="transparent"/>
                  <stop offset="100%" stopColor="rgba(10,14,24,0.7)"/>
                </linearGradient>
              </defs>
              <image
                href="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/bucket/c86c5623-6496-4556-91b1-3ddf8e92b89a.jpg"
                x="18" y="6" width="164" height="188"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#footShield)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="url(#footFade)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="none" stroke="#ffd140" strokeWidth="4"/>
            </svg>
            <div className="leading-[1.2] text-left">
              <div className="text-[8px] font-bold uppercase tracking-[0.22em]" style={{ color: C.muted }}>КОМПАНИЯ · ОНЛАЙН</div>
              <div className="font-black text-[14px] tracking-wide" style={{ color: C.gold }}>ООО Фаворит</div>
              <div className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.muted }}>АСФАЛЬТИРОВАНИЕ НН</div>
            </div>
          </button>
          <p className="text-xs text-center" style={{ color: C.muted }}>
            © 2015–2026 ООО «Фаворит» — аренда манипуляторов в Нижнем Новгороде и области
          </p>
          <div className="flex items-center gap-5">
            <button className="text-xs transition-opacity hover:opacity-80" style={{ color: C.cyan, background: "none", border: "none", cursor: "pointer" }}>
              Политика конфиденциальности
            </button>
            <button onClick={() => go("hero")} className="text-xs transition-opacity hover:opacity-70" style={{ color: C.muted, background: "none", border: "none", cursor: "pointer" }}>
              Наверх ↑
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
