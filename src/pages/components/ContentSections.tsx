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
  { border: "rgba(34,211,238,0.45)",  icon: "rgba(34,211,238,0.12)",  color: "#22d3ee" },
  { border: "rgba(240,192,48,0.45)",  icon: "rgba(240,192,48,0.12)",  color: "#f0c030" },
  { border: "rgba(99,102,241,0.45)",  icon: "rgba(99,102,241,0.12)",  color: "#818cf8" },
  { border: "rgba(239,68,68,0.45)",   icon: "rgba(239,68,68,0.12)",   color: "#f87171" },
  { border: "rgba(34,197,94,0.45)",   icon: "rgba(34,197,94,0.12)",   color: "#4ade80" },
  { border: "rgba(168,85,247,0.45)",  icon: "rgba(168,85,247,0.12)",  color: "#c084fc" },
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
      className="relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(20,25,40,0.9)",
        border: `1px solid ${a.border}`,
        boxShadow: `0 0 0 0 ${a.border}`,
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px ${a.border}`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Большой номер-фон */}
      <div className="absolute right-4 bottom-2 font-black select-none leading-none pointer-events-none"
        style={{ fontSize: "5.5rem", color: a.border, lineHeight: 1 }}>
        {String(i + 1).padStart(2, "0")}
      </div>

      <div className="relative">
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-center gap-3">
            {/* Иконка */}
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: a.icon, border: `1px solid ${a.border}` }}>
              <Icon name={icon} fallback="Layers" size={20} style={{ color: a.color } as React.CSSProperties} />
            </div>
            {/* Заголовок */}
            <h3 className="font-black text-sm uppercase leading-snug">{title}</h3>
          </div>
          {/* Бейдж */}
          <span className="shrink-0 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: a.icon, color: a.color, border: `1px solid ${a.border}`, whiteSpace: "nowrap" }}>
            {badge}
          </span>
        </div>

        {/* Разделитель */}
        <div className="h-px mb-4 w-12" style={{ background: a.border }} />

        <p className="leading-relaxed" style={{ fontSize: 14.5, color: "#a8b3c7" }}>{desc}</p>

        {extra && <div className="mt-4">{extra}</div>}
      </div>
    </div>
  );
}

/* Заголовок секции */
function SectionTitle({ accent: accentColor, label, title }: { accent: string; label: string; title: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-8" style={{ background: accentColor }} />
        <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: accentColor }}>{label}</span>
      </div>
      <h2 className="font-black text-4xl md:text-6xl uppercase leading-tight">{title}</h2>
    </div>
  );
}

export default function ContentSections({ form, setForm, sent, setSent, go }: ContentSectionsProps) {
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${C.borderCyan}`,
    color: "#fff",
  };

  return (
    <>
      {/* ── УСЛУГИ ── */}
      <section id="works" className="py-24" style={{ background: C.bg }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <SectionTitle accent={C.cyan} label="Что мы делаем" title={<>Наши <span style={{ color: C.gold }}>услуги</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <Card key={i} i={i} icon={s.icon} title={s.title} badge={s.price} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ТЕХНИКА ── */}
      <section id="tech" className="py-24" style={{ background: C.bgDeep }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <SectionTitle accent={C.gold} label="Собственный парк" title={<>Наша <span style={{ color: C.cyan }}>техника</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH.map((t, i) => (
              <Card key={i} i={i} icon="Truck" title={t.name} badge={t.count} desc={t.cap} />
            ))}
          </div>
        </div>
      </section>

      {/* ── КАК РАБОТАЕТ ── */}
      <section id="services" className="py-24" style={{ background: C.bg }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <SectionTitle accent={C.cyan} label="Просто и прозрачно" title={<>Как это <span style={{ color: C.gold }}>работает</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {HOW.map((h, i) => (
              <Card key={i} i={i} icon="ArrowRight" title={h.title} badge={h.num} desc={h.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ПРИМЕРЫ РАБОТ ── */}
      <section id="portfolio" className="py-24" style={{ background: C.bgDeep }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <SectionTitle accent={C.cyan} label="Выполненные объекты" title={<>Примеры <span style={{ color: C.gold }}>работ</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKS.map((w, i) => {
              const a = accent(i);
              return (
                <div key={i}
                  className="relative rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(20,25,40,0.9)", border: `1px solid ${a.border}` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px ${a.border}`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>

                  {/* Фото */}
                  <div className="relative h-48 overflow-hidden">
                    <img src={w.img} alt={w.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,14,24,0.92))" }} />
                    {/* Бейдж */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(10,14,24,0.75)", color: a.color, border: `1px solid ${a.border}`, backdropFilter: "blur(6px)" }}>
                        {w.tag}
                      </span>
                    </div>
                    {/* Номер */}
                    <div className="absolute bottom-1 right-3 font-black select-none pointer-events-none leading-none"
                      style={{ fontSize: "4rem", color: a.border }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="h-px mb-4 w-10" style={{ background: a.border }} />
                    <h3 className="font-black text-sm uppercase tracking-wide mb-2">{w.title}</h3>
                    <p className="leading-relaxed mb-4" style={{ fontSize: 14.5, color: "#a8b3c7" }}>{w.desc}</p>
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: C.subtle }}>
                        <Icon name="Maximize2" size={12} />
                        {w.area}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: C.subtle }}>
                        <Icon name="MapPin" size={12} />
                        {w.city}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ОТЗЫВЫ ── */}
      <section id="reviews" className="py-24" style={{ background: C.bg }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <SectionTitle accent={C.cyan} label="Клиенты о нас" title={<>От<span style={{ color: C.gold }}>зывы</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => {
              const a = accent(i);
              return (
                <div key={i}
                  className="relative rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(20,25,40,0.9)", border: `1px solid ${a.border}` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px ${a.border}`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
                  {/* Большая кавычка */}
                  <div className="absolute right-4 top-0 font-black select-none pointer-events-none leading-none"
                    style={{ fontSize: "7rem", color: a.border }}>
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
      <section id="form" className="py-24" style={{ background: C.bgDeep }}>
        <div className="max-w-screen-xl mx-auto px-5">
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

            <div className="rounded-2xl p-8 border" style={{ background: "rgba(15,20,34,0.9)", borderColor: C.borderCyan }}>
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
      <section id="contacts" className="py-24" style={{ background: C.bg }}>
        <div className="max-w-screen-xl mx-auto px-5">
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
                    style={{ background: "rgba(20,25,40,0.9)", border: `1px solid ${a.border}`, textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 24px ${a.border}`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
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
              <div className="rounded-2xl p-5" style={{ background: "rgba(20,25,40,0.9)", border: `1px solid ${ACCENTS[3].border}` }}>
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
              style={{ background: `linear-gradient(135deg, ${C.bgDark}, ${C.bgDeep})`, border: `1px solid ${C.borderGold}` }}>
              <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${C.gold}, transparent)` }} />
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

      {/* ── ПОДВАЛ ── */}
      <footer className="py-7 border-t" style={{ background: C.bgDark, borderColor: C.border }}>
        <div className="max-w-screen-xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg width="36" height="40" viewBox="0 0 200 220" style={{ filter: "drop-shadow(0 1px 8px rgba(240,192,48,0.4))", flexShrink: 0 }}>
              <defs>
                <clipPath id="fShield">
                  <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"/>
                </clipPath>
                <linearGradient id="fFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="transparent"/>
                  <stop offset="100%" stopColor="rgba(10,14,24,0.8)"/>
                </linearGradient>
              </defs>
              <image
                href="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/bucket/c86c5623-6496-4556-91b1-3ddf8e92b89a.jpg"
                x="18" y="6" width="164" height="188"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#fShield)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"
                fill="url(#fFade)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"
                fill="none" stroke="#f0c030" strokeWidth="4"/>
            </svg>
            <span className="font-black text-sm tracking-wide uppercase" style={{ color: C.gold }}>ООО Фаворит</span>
          </div>
          <p className="text-xs" style={{ color: "#374151" }}>© 2024 Фаворит. Асфальтирование в Нижнем Новгороде</p>
          <button onClick={() => go("hero")} className="text-xs transition-colors" style={{ color: "#374151" }}>Наверх ↑</button>
        </div>
      </footer>
    </>
  );
}