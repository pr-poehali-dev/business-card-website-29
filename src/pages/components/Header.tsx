import Icon from "@/components/ui/icon";
import { C, NAV, PHONE, PHONE_HREF } from "./constants";

interface HeaderProps {
  activeNav: string;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  go: (id: string) => void;
}

export default function Header({ activeNav, menuOpen, setMenuOpen, go }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b" style={{ background: "rgba(15,20,34,0.97)", borderColor: C.border, backdropFilter: "blur(16px)" }}>
      <div className="max-w-screen-xl mx-auto px-5 h-[70px] flex items-center justify-between gap-4">

        <button onClick={() => go("hero")} className="flex items-center gap-2 shrink-0">
          {/* Герб-щит с фото катка */}
          <svg width="52" height="58" viewBox="0 0 200 220" style={{ filter: "drop-shadow(0 2px 12px rgba(240,192,48,0.45))", flexShrink: 0 }}>
            <defs>
              <clipPath id="hShield">
                <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"/>
              </clipPath>
              <linearGradient id="hFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="transparent"/>
                <stop offset="100%" stopColor="rgba(10,14,24,0.8)"/>
              </linearGradient>
            </defs>
            <image
              href="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/bucket/c86c5623-6496-4556-91b1-3ddf8e92b89a.jpg"
              x="18" y="6" width="164" height="188"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#hShield)"/>
            <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"
              fill="url(#hFade)"/>
            <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"
              fill="none" stroke="#f0c030" strokeWidth="4"/>
          </svg>
          <div className="leading-[1.2] text-left">
            <div className="text-[8px] font-bold uppercase tracking-[0.25em]" style={{ color: C.muted }}>КОМПАНИЯ · ОНЛАЙН</div>
            <div className="font-black text-[15px] tracking-wide" style={{ color: C.gold }}>ООО Фаворит</div>
            <div className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.muted }}>Асфальтирование НН</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}
              className="text-[11px] font-bold uppercase tracking-wider transition-colors"
              style={{ color: activeNav === id ? C.cyan : C.muted }}>
              {label}
            </button>
          ))}
          <button onClick={() => go("contacts")}
            className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md flex items-center gap-2"
            style={{ background: "rgba(220,38,38,0.85)", color: "#fff" }}>
            Асфальтирование
            <span className="px-1.5 py-0.5 rounded text-[9px] font-black" style={{ background: C.cyan, color: "#000" }}>NEW</span>
          </button>
        </nav>

        <a href={PHONE_HREF}
          className="hidden md:flex items-center gap-2 font-black text-sm rounded-full px-4 py-2 border transition-all hover:scale-105"
          style={{ borderColor: C.gold, color: C.gold }}>
          <Icon name="Phone" size={13} />
          {PHONE}
        </a>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: C.muted }}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-5 py-5 flex flex-col gap-4 border-t" style={{ background: C.bgDeep, borderColor: C.border }}>
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="text-left text-sm font-bold uppercase tracking-widest" style={{ color: C.subtle }}>{label}</button>
          ))}
          <a href={PHONE_HREF} className="font-black text-base mt-1" style={{ color: C.gold }}>{PHONE}</a>
        </div>
      )}
    </header>
  );
}