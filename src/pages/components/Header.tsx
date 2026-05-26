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
          <img src="/favicon.svg" alt="Фаворит" className="w-14 h-14" style={{ filter: "drop-shadow(0 2px 10px rgba(240,192,48,0.4))" }} />
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