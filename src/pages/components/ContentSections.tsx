import Icon from "@/components/ui/icon";
import { C, SERVICES, TECH, HOW, REVIEWS, PHONE, PHONE_HREF } from "./constants";

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

export default function ContentSections({ form, setForm, sent, setSent, go }: ContentSectionsProps) {
  const cardStyle = { background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}` };

  return (
    <>
      {/* ── УСЛУГИ ── */}
      <section id="works" className="py-24" style={{ background: C.bg }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: C.cyan }} />
              <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.cyan }}>Что мы делаем</span>
            </div>
            <h2 className="font-black text-4xl md:text-6xl uppercase leading-tight">
              Наши <span style={{ color: C.gold }}>услуги</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="rounded-xl p-6 border transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl"
                style={cardStyle}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.borderCyan.replace("0.2", "0.4"))}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ background: "rgba(34,211,238,0.08)" }}>
                  <Icon name={s.icon} fallback="Layers" size={20} style={{ color: C.cyan } as React.CSSProperties} />
                </div>
                <h3 className="font-black text-sm uppercase tracking-wide mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>{s.desc}</p>
                <div className="font-black text-sm" style={{ color: C.gold }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ТЕХНИКА ── */}
      <section id="tech" className="py-24" style={{ background: C.bgDeep }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: C.gold }} />
              <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>Собственный парк</span>
            </div>
            <h2 className="font-black text-4xl md:text-6xl uppercase leading-tight">
              Наша <span style={{ color: C.cyan }}>техника</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH.map((t, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl p-5 border" style={cardStyle}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(240,192,48,0.1)" }}>
                  <Icon name="Truck" size={18} style={{ color: C.gold } as React.CSSProperties} />
                </div>
                <div>
                  <div className="font-black text-sm mb-1">{t.name}</div>
                  <div className="text-xs mb-1" style={{ color: C.muted }}>{t.cap}</div>
                  <div className="text-xs font-bold" style={{ color: C.cyan }}>{t.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КАК РАБОТАЕТ ── */}
      <section id="services" className="py-24" style={{ background: C.bg }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: C.cyan }} />
              <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.cyan }}>Просто и прозрачно</span>
            </div>
            <h2 className="font-black text-4xl md:text-6xl uppercase leading-tight">
              Как это <span style={{ color: C.gold }}>работает</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute top-8 left-8 right-8 h-px hidden lg:block" style={{ background: `linear-gradient(to right, ${C.cyan}, rgba(34,211,238,0.05))` }} />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
              {HOW.map((h) => (
                <div key={h.num} className="flex flex-col items-start lg:items-center text-left lg:text-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center font-black text-xl shrink-0 border-2 transition-all"
                    style={{ background: C.bgDeep, borderColor: C.cyan, color: C.cyan }}>
                    {h.num}
                  </div>
                  <div>
                    <div className="font-black text-sm uppercase mb-2">{h.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.muted }}>{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ОТЗЫВЫ ── */}
      <section id="reviews" className="py-24" style={{ background: C.bgDeep }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: C.cyan }} />
              <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.cyan }}>Клиенты о нас</span>
            </div>
            <h2 className="font-black text-4xl md:text-6xl uppercase leading-tight">
              От<span style={{ color: C.gold }}>зывы</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="rounded-xl p-7 border relative overflow-hidden" style={cardStyle}>
                <div className="absolute -right-3 -top-5 font-black select-none leading-none" style={{ fontSize: "7rem", color: "rgba(34,211,238,0.05)" }}>"</div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => <Icon key={j} name="Star" size={13} style={{ color: C.gold } as React.CSSProperties} />)}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic relative" style={{ color: C.light }}>«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(34,211,238,0.08)" }}>
                    <Icon name="User" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                  </div>
                  <div>
                    <div className="font-black text-xs uppercase tracking-wide">{r.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: C.muted }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
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
              <p className="text-base leading-relaxed mb-8" style={{ color: C.muted }}>
                Перезвоним за 5 минут, рассчитаем стоимость и подберём бригаду. Выезд замерщика — бесплатно.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Clock", text: "Ответим в течение 5 минут" },
                  { icon: "MapPin", text: "Выезд замерщика — бесплатно" },
                  { icon: "FileText", text: "Смета в день обращения" },
                  { icon: "ShieldCheck", text: "Фиксированная цена в договоре" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(34,211,238,0.1)" }}>
                      <Icon name={icon} fallback="Check" size={16} style={{ color: C.cyan } as React.CSSProperties} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: C.subtle }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-8 border" style={{ background: "rgba(15,20,34,0.8)", borderColor: C.borderCyan }}>
              {sent ? (
                <div className="py-12 text-center flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(34,211,238,0.12)" }}>
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
                        className="w-full pl-9 pr-4 py-3 rounded-lg text-sm outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.borderCyan}`, color: "#fff" }}
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
                      className="w-full pl-9 pr-4 py-3 rounded-lg text-sm outline-none transition-all resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.borderCyan}`, color: "#fff" }}
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
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: C.gold }} />
              <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>Связаться</span>
            </div>
            <h2 className="font-black text-4xl md:text-6xl uppercase leading-tight">
              Конта<span style={{ color: C.cyan }}>кты</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              {[
                { icon: "Phone", label: "Телефон", val: PHONE, sub: "Звонки — круглосуточно", href: PHONE_HREF },
                { icon: "MapPin", label: "Город", val: "Нижний Новгород", sub: "Работаем по всей области", href: undefined },
                { icon: "Clock", label: "Офис", val: "Пн–Пт 8:00–19:00", sub: "Заявки принимаем 24/7", href: undefined },
              ].map((c) => (
                <a key={c.label} href={c.href}
                  className="flex items-center gap-5 rounded-xl p-5 border transition-all"
                  style={cardStyle}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(34,211,238,0.08)" }}>
                    <Icon name={c.icon} fallback="Info" size={18} style={{ color: C.cyan } as React.CSSProperties} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: C.muted }}>{c.label}</div>
                    <div className="font-black text-base">{c.val}</div>
                    <div className="text-xs mt-0.5" style={{ color: C.muted }}>{c.sub}</div>
                  </div>
                </a>
              ))}
              <div className="rounded-xl p-5 border" style={cardStyle}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: C.muted }}>Работаем в городах</div>
                <div className="flex flex-wrap gap-2">
                  {["НН","Кстово","Бор","Дзержинск","Балахна","Арзамас","Выкса","Павлово"].map((city) => (
                    <span key={city} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(34,211,238,0.08)", color: C.cyan }}>{city}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-10 flex flex-col justify-between gap-8 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${C.bgDark}, ${C.bgDeep})`, border: `1px solid ${C.borderGold}` }}>
              <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${C.gold}, transparent)` }} />
              <div className="relative">
                <div className="font-black text-2xl uppercase leading-snug mb-3">Нужен расчёт<br />стоимости?</div>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
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
                <button onClick={() => go("hero")}
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ background: "#0f1422", border: "1px solid rgba(240,192,48,0.35)" }}>
              <img src="/favicon.svg" alt="Фаворит" className="w-7 h-7" />
            </div>
            <span className="font-black text-sm tracking-wide uppercase" style={{ color: C.gold }}>ООО Фаворит</span>
          </div>
          <p className="text-xs" style={{ color: "#374151" }}>© 2024 Фаворит. Асфальтирование в Нижнем Новгороде</p>
          <button onClick={() => go("hero")} className="text-xs transition-colors" style={{ color: "#374151" }}>Наверх ↑</button>
        </div>
      </footer>
    </>
  );
}
