import Icon from "@/components/ui/icon";
import { C } from "./constants";

export interface FormState {
  name: string;
  phone: string;
  address: string;
  area: string;
  comment: string;
}

export const ACCENTS = [
  { border: "rgba(56,232,255,0.4)",   icon: "rgba(56,232,255,0.10)",  color: "#38e8ff",  glow: "rgba(56,232,255,0.15)" },
  { border: "rgba(255,209,64,0.4)",   icon: "rgba(255,209,64,0.10)",  color: "#ffd140",  glow: "rgba(255,209,64,0.15)" },
  { border: "rgba(129,140,248,0.4)",  icon: "rgba(129,140,248,0.10)", color: "#a5b4fc",  glow: "rgba(129,140,248,0.15)" },
  { border: "rgba(251,146,60,0.4)",   icon: "rgba(251,146,60,0.10)",  color: "#fb923c",  glow: "rgba(251,146,60,0.15)" },
  { border: "rgba(74,222,128,0.4)",   icon: "rgba(74,222,128,0.10)",  color: "#4ade80",  glow: "rgba(74,222,128,0.15)" },
  { border: "rgba(232,121,249,0.4)",  icon: "rgba(232,121,249,0.10)", color: "#e879f9",  glow: "rgba(232,121,249,0.15)" },
];

export function accent(i: number) { return ACCENTS[i % ACCENTS.length]; }

export const DOT_BG = "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)";
export const LINE_BG = "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)";

export function Card({
  i, icon, title, badge, desc, extra,
}: {
  i: number;
  icon: string;
  title: string;
  badge: string;
  desc: string;
  extra?: React.ReactNode;
}) {
  const a = accent(i);
  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group"
      style={{
        background: `linear-gradient(145deg, #252b3d, #1e2438)`,
        border: `1px solid ${a.border}`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 12px 40px ${a.glow}, 0 0 0 1px ${a.border}`;
        e.currentTarget.style.borderColor = a.color;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = a.border;
      }}
    >
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${a.glow}, transparent 70%)` }} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: a.icon, border: `1px solid ${a.border}` }}>
              <Icon name={icon} fallback="Layers" size={20} style={{ color: a.color } as React.CSSProperties} />
            </div>
            <h3 className="font-black text-sm uppercase leading-snug tracking-wide">{title}</h3>
          </div>
          <span className="shrink-0 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: a.icon, color: a.color, border: `1px solid ${a.border}`, whiteSpace: "nowrap" }}>
            {badge}
          </span>
        </div>

        <div className="h-px mb-4 w-12 rounded-full" style={{ background: `linear-gradient(to right, ${a.color}, transparent)` }} />

        <p className="leading-relaxed" style={{ fontSize: 14.5, color: C.subtle }}>{desc}</p>

        {extra && <div className="mt-4">{extra}</div>}
      </div>
    </div>
  );
}

export function SectionTitle({ accent: accentColor, label, title }: { accent: string; label: string; title: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
        style={{ background: `${accentColor}14`, border: `1px solid ${accentColor}35` }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
        <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accentColor }}>{label}</span>
      </div>
      <h2 className="font-black text-4xl md:text-6xl uppercase leading-tight">{title}</h2>
    </div>
  );
}
