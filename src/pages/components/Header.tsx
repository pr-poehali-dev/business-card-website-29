import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { C, NAV, PHONE, PHONE_HREF } from "./constants";

interface HeaderProps {
  activeNav: string;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  go: (id: string) => void;
}

const SERVICES_MENU = [
  { to: "/asfalt",          icon: "Layers",     label: "Асфальтирование",   price: "от 1 200 ₽/м²" },
  { to: "/yamochny",        icon: "Hammer",     label: "Ямочный ремонт",    price: "от 800 ₽/м²"   },
  { to: "/blagoustrojstvo", icon: "TreePine",   label: "Благоустройство",   price: "от 900 ₽/м²"   },
  { to: "/bruschatka",      icon: "Grid3x3",    label: "Брусчатка и плитка",price: "от 1 400 ₽/м²" },
  { to: "/angary",          icon: "Building2",  label: "Ангары под ключ",   price: "от 4 500 ₽/м²" },
];

export default function Header({ activeNav, menuOpen, setMenuOpen, go }: HeaderProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ borderBottom: "1px solid rgba(240,192,48,0.25)" }}>
      {/* Фото-подложка */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <img
          src="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/58857beb-7868-45cc-a054-534e6722a2be.jpg"
          alt="" className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.35) saturate(0.6)", transform: "scaleX(-1)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,14,24,0.98) 0%, rgba(10,14,24,0.82) 50%, rgba(10,14,24,0.7) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${C.gold} 0%, rgba(240,192,48,0.3) 60%, transparent 100%)` }} />
        <div className="absolute inset-0" style={{ backdropFilter: "blur(2px)" }} />
      </div>
      <div className="relative max-w-screen-xl mx-auto px-5 h-[70px] flex items-center justify-between gap-4" style={{ zIndex: 1 }}>

        <button onClick={() => go("hero")} className="flex items-center gap-2 shrink-0">
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
            <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="url(#hFade)"/>
            <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="none" stroke="#ffd140" strokeWidth="4"/>
          </svg>
          <div className="leading-[1.2] text-left">
            <div className="text-[8px] font-bold uppercase tracking-[0.25em]" style={{ color: C.muted }}>КОМПАНИЯ · ОНЛАЙН</div>
            <div className="font-black text-[15px] tracking-wide" style={{ color: C.gold }}>ООО Фаворит</div>
            <div className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.muted }}>Асфальтирование НН</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-5">
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}
              className="text-[11px] font-bold uppercase tracking-wider transition-colors"
              style={{ color: activeNav === id ? C.cyan : C.muted }}>
              {label}
            </button>
          ))}

          {/* Выпадающее меню «Услуги» */}
          <div className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}>
            <button
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md transition-all"
              style={{ background: "rgba(220,38,38,0.85)", color: "#fff" }}>
              Услуги
              <Icon name={servicesOpen ? "ChevronUp" : "ChevronDown"} size={11} />
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black" style={{ background: C.cyan, color: "#000" }}>NEW</span>
            </button>

            {servicesOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl overflow-hidden shadow-2xl border"
                style={{ background: "rgba(30,36,56,0.99)", borderColor: C.borderCyan, backdropFilter: "blur(24px)" }}>
                <div className="p-2">
                  {SERVICES_MENU.map((s) => (
                    <Link key={s.to} to={s.to}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
                      style={{ textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(34,211,238,0.07)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)" }}>
                        <Icon name={s.icon} fallback="Layers" size={15} style={{ color: C.cyan } as React.CSSProperties} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-xs uppercase tracking-wide text-white truncate">{s.label}</div>
                        <div className="text-[10px] font-semibold" style={{ color: C.muted }}>{s.price}</div>
                      </div>
                      <Icon name="ChevronRight" size={12} style={{ color: C.muted } as React.CSSProperties} />
                    </Link>
                  ))}
                </div>
                <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <button onClick={() => { go("form"); setServicesOpen(false); }}
                    className="w-full font-black text-[10px] uppercase tracking-widest py-2 rounded-lg transition-all hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000" }}>
                    Получить расчёт →
                  </button>
                </div>
              </div>
            )}
          </div>
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

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="lg:hidden relative px-5 py-5 flex flex-col gap-3 border-t" style={{ background: "rgba(10,14,24,0.97)", borderColor: "rgba(240,192,48,0.2)", zIndex: 1 }}>
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="text-left text-sm font-bold uppercase tracking-widest py-1" style={{ color: C.subtle }}>{label}</button>
          ))}
          <div className="h-px my-1" style={{ background: C.border }} />
          <div className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: C.muted }}>Страницы услуг</div>
          {SERVICES_MENU.map((s) => (
            <Link key={s.to} to={s.to} onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-1.5"
              style={{ textDecoration: "none" }}>
              <Icon name={s.icon} fallback="Layers" size={14} style={{ color: C.cyan } as React.CSSProperties} />
              <span className="text-sm font-bold" style={{ color: C.subtle }}>{s.label}</span>
              <span className="text-[10px] ml-auto" style={{ color: C.muted }}>{s.price}</span>
            </Link>
          ))}
          <a href={PHONE_HREF} className="font-black text-base mt-2" style={{ color: C.gold }}>{PHONE}</a>
        </div>
      )}
    </header>
  );
}