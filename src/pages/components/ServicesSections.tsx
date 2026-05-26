import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { C, SERVICES, TECH, HOW, WORKS } from "./constants";
import { accent, Card, SectionTitle, DOT_BG, LINE_BG } from "./SharedUI";

export default function ServicesSections() {
  return (
    <>
      {/* ── УСЛУГИ ── */}
      <section id="works" className="py-24 relative overflow-hidden" style={{ background: C.bg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DOT_BG, backgroundSize: "28px 28px", opacity: 0.8 }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${C.cyanDim}0a 0%, transparent 70%)` }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.cyan} label="Что мы делаем" title={<>Наши <span style={{ color: C.gold }}>услуги</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <Card key={i} i={i} icon={s.icon} title={s.title} badge={s.price} desc={s.desc}
                extra={s.href ? (
                  <Link to={s.href}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-all hover:gap-2.5"
                    style={{ color: C.cyan, textDecoration: "none" }}>
                    Подробнее
                    <Icon name="ArrowRight" size={12} />
                  </Link>
                ) : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── ФОТО-РАЗДЕЛИТЕЛЬ ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 260 }}>
        <img
          src="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/d5302b7b-0f12-46f2-8718-081db8c572ba.jpg"
          alt="Наша техника"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.45) saturate(0.8)" }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bg} 0%, transparent 18%, transparent 82%, ${C.bg} 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.bg} 0%, transparent 25%, transparent 75%, ${C.bgDeep} 100%)` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs font-black uppercase tracking-[0.3em] mb-2" style={{ color: C.cyan }}>Собственный парк</div>
            <div className="font-black text-3xl md:text-5xl uppercase" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
              Наша <span style={{ color: C.gold }}>техника</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ТЕХНИКА ── */}
      <section id="tech" className="py-16 relative overflow-hidden" style={{ background: C.bgDeep }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: LINE_BG, backgroundSize: "60px 60px" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{ background: `radial-gradient(ellipse at bottom right, ${C.gold}0d 0%, transparent 65%)` }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH.map((t, i) => (
              <Card key={i} i={i} icon="Truck" title={t.name} badge="" desc={t.cap} />
            ))}
          </div>
        </div>
      </section>

      {/* ── КАК РАБОТАЕТ ── */}
      <section id="services" className="py-24 relative overflow-hidden" style={{ background: C.bg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DOT_BG, backgroundSize: "22px 22px", opacity: 0.6 }} />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] pointer-events-none" style={{ background: `radial-gradient(circle, ${C.cyanDim}08 0%, transparent 70%)` }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.cyan} label="Просто и прозрачно" title={<>Как это <span style={{ color: C.gold }}>работает</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {HOW.map((h, i) => (
              <Card key={i} i={i} icon="ArrowRight" title={h.title} badge={h.num} desc={h.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ПРИМЕРЫ РАБОТ ── */}
      <section id="portfolio" className="py-24 relative overflow-hidden" style={{ background: C.bgDeep }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: LINE_BG, backgroundSize: "50px 50px" }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.cyan} label="Выполненные объекты" title={<>Примеры <span style={{ color: C.gold }}>работ</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKS.map((w, i) => {
              const a = accent(i);
              return (
                <div key={i}
                  className="relative rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2"
                  style={{ background: `linear-gradient(145deg, #252b3d, #1e2438)`, border: `1px solid ${a.border}` }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 16px 48px ${a.glow}`;
                    e.currentTarget.style.borderColor = a.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = a.border;
                  }}>

                  {/* Фото */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={w.img} alt={w.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(18,22,36,0.95))" }} />
                    {/* Бейдж */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                        style={{ background: a.glow, color: a.color, border: `1px solid ${a.border}`, backdropFilter: "blur(8px)" }}>
                        {w.tag}
                      </span>
                    </div>
                    {/* Площадь поверх фото */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-black"
                      style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                      <Icon name="Maximize2" size={11} />
                      {w.area}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="h-0.5 mb-4 w-10 rounded-full" style={{ background: `linear-gradient(to right, ${a.color}, transparent)` }} />
                    <h3 className="font-black text-sm uppercase tracking-wide mb-2">{w.title}</h3>
                    <p className="leading-relaxed mb-4" style={{ fontSize: 14, color: C.subtle }}>{w.desc}</p>
                    <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: C.muted }}>
                      <Icon name="MapPin" size={11} style={{ color: a.color } as React.CSSProperties} />
                      {w.city}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}