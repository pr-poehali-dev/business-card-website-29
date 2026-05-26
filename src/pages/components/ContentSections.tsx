import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { C, SERVICES, TECH, HOW, WORKS, REVIEWS, PHONE, PHONE_HREF } from "./constants";

interface FormState {
  name: string;
  phone: string;
  address: string;
  area: string;
  comment: string;
}

interface ContentSectionsProps {
  form: FormState;
  setForm: (v: FormState) => void;
  sent: boolean;
  setSent: (v: boolean) => void;
  go: (id: string) => void;
}

/* Палитра акцентов для карточек — по кругу */
const ACCENTS = [
  { border: "rgba(56,232,255,0.4)",   icon: "rgba(56,232,255,0.10)",  color: "#38e8ff",  glow: "rgba(56,232,255,0.15)" },
  { border: "rgba(255,209,64,0.4)",   icon: "rgba(255,209,64,0.10)",  color: "#ffd140",  glow: "rgba(255,209,64,0.15)" },
  { border: "rgba(129,140,248,0.4)",  icon: "rgba(129,140,248,0.10)", color: "#a5b4fc",  glow: "rgba(129,140,248,0.15)" },
  { border: "rgba(251,146,60,0.4)",   icon: "rgba(251,146,60,0.10)",  color: "#fb923c",  glow: "rgba(251,146,60,0.15)" },
  { border: "rgba(74,222,128,0.4)",   icon: "rgba(74,222,128,0.10)",  color: "#4ade80",  glow: "rgba(74,222,128,0.15)" },
  { border: "rgba(232,121,249,0.4)",  icon: "rgba(232,121,249,0.10)", color: "#e879f9",  glow: "rgba(232,121,249,0.15)" },
];

function accent(i: number) { return ACCENTS[i % ACCENTS.length]; }

/* Универсальная карточка */
function Card({
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
      {/* Угловой свет */}
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

/* Заголовок секции */
function SectionTitle({ accent: accentColor, label, title }: { accent: string; label: string; title: React.ReactNode }) {
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

/* Паттерн-фон точки */
const DOT_BG = "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)";
const LINE_BG = "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)";

export default function ContentSections({ form, setForm, sent, setSent, go }: ContentSectionsProps) {
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${C.borderCyan}`,
    color: "#fff",
  };

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

      {/* ── ТЕХНИКА ── */}
      <section id="tech" className="py-24 relative overflow-hidden" style={{ background: C.bgDeep }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: LINE_BG, backgroundSize: "60px 60px" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{ background: `radial-gradient(ellipse at bottom right, ${C.gold}0d 0%, transparent 65%)` }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.gold} label="Собственный парк" title={<>Наша <span style={{ color: C.cyan }}>техника</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH.map((t, i) => (
              <Card key={i} i={i} icon="Truck" title={t.name} badge={t.count} desc={t.cap} />
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

      {/* ── ОТЗЫВЫ ── */}
      <section id="reviews" className="py-24 relative overflow-hidden" style={{ background: C.bg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DOT_BG, backgroundSize: "24px 24px", opacity: 0.7 }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${C.gold}07 0%, transparent 65%)` }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.cyan} label="Клиенты о нас" title={<>От<span style={{ color: C.gold }}>зывы</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => {
              const a = accent(i);
              return (
                <div key={i}
                  className="relative rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                  style={{ background: `linear-gradient(145deg, #252b3d, #1e2438)`, border: `1px solid ${a.border}` }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 12px 40px ${a.glow}`;
                    e.currentTarget.style.borderColor = a.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = a.border;
                  }}>
                  {/* Большая кавычка */}
                  <div className="absolute right-4 top-0 font-black select-none pointer-events-none leading-none"
                    style={{ fontSize: "7rem", color: a.border, fontFamily: "Georgia, serif" }}>
                    "
                  </div>
                  <div className="relative">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <Icon key={j} name="Star" size={13} style={{ color: C.gold } as React.CSSProperties} />
                      ))}
                    </div>
                    <div className="h-px mb-4 w-10" style={{ background: a.border }} />
                    <p className="leading-relaxed mb-6 italic" style={{ fontSize: 15, color: "#d1dae8" }}>«{r.text}»</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: a.icon, border: `1px solid ${a.border}` }}>
                        <Icon name="User" size={14} style={{ color: a.color } as React.CSSProperties} />
                      </div>
                      <div>
                        <div className="font-black text-xs uppercase tracking-wide">{r.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: C.muted }}>{r.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ФОРМА ЗАЯВКИ ── */}
      <section id="form" className="py-24 relative overflow-hidden" style={{ background: C.bgDeep }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: LINE_BG, backgroundSize: "55px 55px" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none" style={{ background: `radial-gradient(ellipse at bottom left, ${C.cyanDim}09 0%, transparent 65%)` }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: C.gold }} />
                <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>Бесплатный расчёт</span>
              </div>
              <h2 className="font-black text-4xl md:text-6xl uppercase leading-tight mb-6">
                Оставить <span style={{ color: C.cyan }}>заявку</span>
              </h2>
              <p className="leading-relaxed mb-8" style={{ fontSize: 16, color: "#a8b3c7" }}>
                Перезвоним за 5 минут, рассчитаем стоимость и подберём бригаду. Выезд замерщика — бесплатно.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "Clock", text: "Ответим за 5 минут", badge: "БЫСТРО" },
                  { icon: "MapPin", text: "Замерщик — бесплатно", badge: "0 ₽" },
                  { icon: "FileText", text: "Смета в день обращения", badge: "СЕГОДНЯ" },
                  { icon: "ShieldCheck", text: "Фиксированная цена", badge: "ДОГОВОР" },
                ].map(({ icon, text, badge }, i) => (
                  <Card key={i} i={i} icon={icon} title={text} badge={badge} desc="" />
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-8" style={{ background: "linear-gradient(145deg, #252b3d, #1e2438)", border: `1px solid ${C.borderCyan}` }}>
              {sent ? (
                <div className="py-12 text-center flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "rgba(34,211,238,0.12)", border: `1px solid ${C.borderCyan}` }}>
                    <Icon name="CheckCircle" size={40} style={{ color: C.cyan } as React.CSSProperties} />
                  </div>
                  <h3 className="font-black text-2xl uppercase">Заявка принята!</h3>
                  <p className="text-sm" style={{ color: C.muted }}>Перезвоним в течение 5 минут в рабочее время</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-black text-xl uppercase mb-6">Оставить заявку</h3>
                  {[
                    { key: "name", ph: "Имя или компания", icon: "User" },
                    { key: "phone", ph: "Телефон +7 (___) ___-__-__", icon: "Phone" },
                    { key: "address", ph: "Адрес объекта", icon: "MapPin" },
                    { key: "area", ph: "Площадь (м²)", icon: "Maximize2" },
                  ].map(({ key, ph, icon }) => (
                    <div key={key} className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon name={icon} fallback="Info" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                      </div>
                      <input
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = C.cyan)}
                        onBlur={e => (e.target.style.borderColor = C.borderCyan)}
                        placeholder={ph}
                        value={form[key as keyof FormState]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      />
                    </div>
                  ))}
                  <div className="relative">
                    <div className="absolute left-3 top-3.5 pointer-events-none">
                      <Icon name="MessageSquare" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                    </div>
                    <textarea rows={3}
                      className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = C.cyan)}
                      onBlur={e => (e.target.style.borderColor = C.borderCyan)}
                      placeholder="Тип работ, особенности объекта"
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    />
                  </div>
                  <button
                    onClick={() => { if (form.name && form.phone) setSent(true); }}
                    className="w-full font-black text-base py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000", boxShadow: "0 4px 20px rgba(240,192,48,0.3)" }}>
                    Оставить заявку →
                  </button>
                  <p className="text-center text-[10px]" style={{ color: "#374151" }}>
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section id="contacts" className="py-24 relative overflow-hidden" style={{ background: C.bg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DOT_BG, backgroundSize: "26px 26px", opacity: 0.7 }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.gold} label="Связаться" title={<>Конта<span style={{ color: C.cyan }}>кты</span></>} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              {[
                { icon: "Phone", label: "Телефон", val: PHONE, sub: "Звонки — круглосуточно", href: PHONE_HREF, badge: "ЗВОНОК" },
                { icon: "MapPin", label: "Город", val: "Нижний Новгород", sub: "Работаем по всей области", href: undefined, badge: "НН" },
                { icon: "Clock", label: "Офис", val: "Пн–Пт 8:00–19:00", sub: "Заявки принимаем 24/7", href: undefined, badge: "24/7" },
              ].map((c, i) => {
                const a = accent(i);
                return (
                  <a key={c.label} href={c.href}
                    className="flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 block"
                    style={{ background: `linear-gradient(145deg, #252b3d, #1e2438)`, border: `1px solid ${a.border}`, textDecoration: "none" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${a.glow}`;
                      (e.currentTarget as HTMLElement).style.borderColor = a.color;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLElement).style.borderColor = a.border;
                    }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: a.icon, border: `1px solid ${a.border}` }}>
                      <Icon name={c.icon} fallback="Info" size={18} style={{ color: a.color } as React.CSSProperties} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: C.muted }}>{c.label}</div>
                      <div className="font-black text-base">{c.val}</div>
                      <div className="text-xs mt-0.5" style={{ color: C.muted }}>{c.sub}</div>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0"
                      style={{ background: a.icon, color: a.color, border: `1px solid ${a.border}` }}>
                      {c.badge}
                    </span>
                  </a>
                );
              })}
              <div className="rounded-2xl p-5" style={{ background: `linear-gradient(145deg, #252b3d, #1e2438)`, border: `1px solid ${ACCENTS[3].border}` }}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: C.muted }}>Работаем в городах</div>
                <div className="flex flex-wrap gap-2">
                  {["НН","Кстово","Бор","Дзержинск","Балахна","Арзамас","Выкса","Павлово"].map((city, i) => {
                    const a = accent(i);
                    return (
                      <span key={city} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                        style={{ background: a.icon, color: a.color, border: `1px solid ${a.border}` }}>
                        {city}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-10 flex flex-col justify-between gap-8 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, #252b3d 0%, #1a1f30 100%)`, border: `1px solid ${C.borderGold}` }}>
              <div className="absolute -right-8 -top-8 w-52 h-52 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.gold}18 0%, transparent 70%)` }} />
              <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.cyanDim}12 0%, transparent 70%)` }} />
              <div className="relative">
                <div className="font-black text-2xl uppercase leading-snug mb-3">Нужен расчёт<br />стоимости?</div>
                <p className="leading-relaxed" style={{ fontSize: 15, color: "#a8b3c7" }}>
                  Выезд замерщика — бесплатно. Смета в день обращения. Работаем с физ. и юр. лицами, НДС.
                </p>
              </div>
              <div className="flex flex-col gap-3 relative">
                <a href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 font-black text-base py-4 rounded-full transition-all hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000" }}>
                  <Icon name="Phone" size={18} />
                  {PHONE}
                </a>
                <button onClick={() => go("form")}
                  className="font-black text-xs py-3 rounded-full border transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: C.muted }}>
                  Заполнить заявку онлайн →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── КАРТА ── */}
      <section style={{ background: C.bgDark, borderTop: `1px solid ${C.border}` }}>
        <iframe
          src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3Af599b5fb73bdbcfea11b78c8612fc71493c58efb8712143741b0752e2ed790f7&lang=ru_RU&scroll=true"
          width="100%"
          height="420"
          frameBorder="0"
          allowFullScreen
          style={{ display: "block", filter: "brightness(0.9) contrast(1.05)" }}
        />
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