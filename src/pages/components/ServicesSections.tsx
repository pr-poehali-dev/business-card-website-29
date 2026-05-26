import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { C, SERVICES, TECH, HOW, WORKS } from "./constants";
import { accent, Card, SectionTitle, PhotoDivider } from "./SharedUI";

const BG_OVERLAY = `linear-gradient(to bottom, rgba(10,14,24,0.4) 0%, rgba(10,14,24,0.25) 50%, rgba(10,14,24,0.45) 100%)`;

function SectionBg({ img }: { img: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <img src={img} alt="" className="w-full h-full object-cover object-center" style={{ filter: "brightness(1.0) saturate(0.9)" }} />
      <div className="absolute inset-0" style={{ background: BG_OVERLAY }} />
    </div>
  );
}

export default function ServicesSections() {
  return (
    <>
      {/* ── УСЛУГИ ── */}
      <section id="works" className="py-24 relative overflow-hidden">
        <SectionBg img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/2ec06ac1-15ac-4c4a-b880-302a0aeb3a54.jpg" />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.cyan} label="Что мы делаем" title={<>Наши <span style={{ color: C.gold }}>услуги</span></>} />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SERVICES.map((s, i) => {
              const a = accent(i);
              const img = (s as typeof s & { img?: string }).img;
              return (
                <div key={i}
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                  style={{ background: `linear-gradient(145deg, #252b3d, #1e2438)`, border: `1px solid ${a.border}` }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px ${a.glow}`; e.currentTarget.style.borderColor = a.color; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = a.border; }}>

                  {/* Фото */}
                  <div className="relative h-32 sm:h-44 lg:h-52 overflow-hidden shrink-0">
                    {img ? (
                      <img src={img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${a.glow}, rgba(18,22,36,0.6))` }}>
                        <Icon name={s.icon} fallback="Layers" size={48} style={{ color: a.color, opacity: 0.4 } as React.CSSProperties} />
                      </div>
                    )}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(18,22,36,0.85) 100%)" }} />

                    {/* Цена — крупно поверх фото снизу */}
                    <div className="absolute bottom-0 left-0 right-0 px-2 sm:px-4 pb-2 sm:pb-3 pt-4 sm:pt-6"
                      style={{ background: "linear-gradient(to top, rgba(18,22,36,0.95), transparent)" }}>
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-0.5">
                        <h3 className="font-black text-[10px] sm:text-sm uppercase leading-snug tracking-wide text-white drop-shadow">{s.title}</h3>
                        <span className="text-xs sm:text-base font-black leading-none whitespace-nowrap"
                          style={{ color: a.color, textShadow: `0 0 20px ${a.glow}` }}>
                          {s.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Описание — скрыто на мобиле */}
                  <div className="hidden sm:flex p-4 flex-col flex-1">
                    <div className="h-px mb-3 w-10 rounded-full" style={{ background: `linear-gradient(to right, ${a.color}, transparent)` }} />
                    <p className="leading-relaxed flex-1" style={{ fontSize: 13.5, color: "#a8b8cc" }}>{s.desc}</p>
                    {s.href && (
                      <Link to={s.href}
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-all hover:gap-2.5 mt-3"
                        style={{ color: a.color, textDecoration: "none" }}>
                        Подробнее
                        <Icon name="ArrowRight" size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ФОТО-РАЗДЕЛИТЕЛЬ ── */}
      <PhotoDivider
        img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/d5302b7b-0f12-46f2-8718-081db8c572ba.jpg"
        label='Наша <span style="color:#ffd140">техника</span>'
        sublabel="Собственный парк"
        bgFrom={C.bg} bgTo={C.bgDeep}
      />

      {/* ── ТЕХНИКА ── */}
      <section id="tech" className="py-24 relative overflow-hidden">
        <SectionBg img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/b30d6621-8b71-49bd-a023-b57ed513ef98.jpg" />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH.map((t, i) => (
              <Card key={i} i={i} icon="Truck" title={t.name} badge="" desc={t.cap} />
            ))}
          </div>
        </div>
      </section>

      <PhotoDivider
        img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/4f631491-fdcd-46fa-a9d9-5b93bf5a3039.jpg"
        label='Как это <span style="color:#38e8ff">работает</span>'
        sublabel="Просто и прозрачно"
        bgFrom={C.bgDeep} bgTo={C.bg}
      />

      {/* ── КАК РАБОТАЕТ ── */}
      <section id="services" className="py-24 relative overflow-hidden">
        <SectionBg img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/8a2044f9-1f3d-402b-bc04-723fcffaee4f.jpg" />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.cyan} label="Просто и прозрачно" title={<>Как это <span style={{ color: C.gold }}>работает</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {HOW.map((h, i) => (
              <Card key={i} i={i} icon="ArrowRight" title={h.title} badge={h.num} desc={h.desc} />
            ))}
          </div>
        </div>
      </section>

      <PhotoDivider
        img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/ec73bf99-c0e3-49c3-9722-5f313c5fdc4f.jpg"
        label='Примеры <span style="color:#ffd140">работ</span>'
        sublabel="Выполненные объекты"
        bgFrom={C.bg} bgTo={C.bgDeep}
      />

      {/* ── ПРИМЕРЫ РАБОТ ── */}
      <section id="portfolio" className="py-24 relative overflow-hidden">
        <SectionBg img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/d60c5334-4db9-40cc-9968-5af6d8eb6616.jpg" />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.cyan} label="Выполненные объекты" title={<>Примеры <span style={{ color: C.gold }}>работ</span></>} />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {WORKS.map((w, i) => {
              const a = accent(i);
              return (
                <div key={i}
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2"
                  style={{ background: `linear-gradient(145deg, #252b3d, #1e2438)`, border: `1px solid ${a.border}` }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 16px 48px ${a.glow}`;
                    e.currentTarget.style.borderColor = a.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = a.border;
                  }}>

                  <div className="relative h-36 sm:h-52 overflow-hidden">
                    <img src={w.img} alt={w.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(18,22,36,0.95))" }} />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                        style={{ background: a.glow, color: a.color, border: `1px solid ${a.border}`, backdropFilter: "blur(8px)" }}>
                        {w.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1 text-[10px] sm:text-xs font-black"
                      style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                      <Icon name="Maximize2" size={10} />
                      {w.area}
                    </div>
                    {/* Название поверх фото снизу — только мобиль */}
                    <div className="absolute bottom-0 left-0 right-0 px-2 pb-7 pt-4 sm:hidden"
                      style={{ background: "linear-gradient(to top, rgba(18,22,36,0.98), transparent)" }}>
                      <h3 className="font-black text-[10px] uppercase tracking-wide text-white leading-tight">{w.title}</h3>
                    </div>
                  </div>

                  <div className="hidden sm:block p-5">
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