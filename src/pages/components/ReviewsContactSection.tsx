import { useState } from "react";
import Icon from "@/components/ui/icon";
import { C, REVIEWS, PHONE, PHONE_HREF } from "./constants";
import { accent, ACCENTS, SectionTitle, PhotoDivider, FormState } from "./SharedUI";

interface Props {
  form: FormState;
  setForm: (v: FormState) => void;
  sent: boolean;
  setSent: (v: boolean) => void;
  go: (id: string) => void;
}

const BG_OVERLAY = `linear-gradient(to bottom, rgba(10,14,24,0.4) 0%, rgba(10,14,24,0.25) 50%, rgba(10,14,24,0.45) 100%)`;

function SectionBg({ img }: { img: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <img src={img} alt="" className="w-full h-full object-cover object-center" style={{ filter: "brightness(1.0) saturate(0.9)" }} />
      <div className="absolute inset-0" style={{ background: BG_OVERLAY }} />
    </div>
  );
}

const REQUISITES = [
  { label: "Полное наименование", value: "Общество с ограниченной ответственностью «ФАВОРИТ»" },
  { label: "ИНН / КПП", value: "5250077990 / 525001001" },
  { label: "ОГРН", value: "1235200013531" },
  { label: "Юридический адрес", value: "607657, Нижегородская обл., Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13" },
  { label: "Расчётный счёт", value: "40702810316020000009" },
  { label: "Банк", value: "АО «АЛЬФА-БАНК»" },
  { label: "К/с", value: "30101810200000000593" },
  { label: "БИК", value: "044525593" },
  { label: "ОКВЭД", value: "46.71" },
  { label: "Директор", value: "Мкртчян Саргис Варужанович" },
];

function RequisitesBlock() {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(value: string, label: string) {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  const fullText = REQUISITES.map(r => `${r.label}: ${r.value}`).join("\n");

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(37,43,61,0.85)", border: `1px solid rgba(255,255,255,0.08)`, backdropFilter: "blur(12px)" }}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,209,64,0.12)" }}>
            <Icon name="FileText" size={14} style={{ color: C.gold } as React.CSSProperties} />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>Реквизиты</span>
        </div>
        <button
          onClick={() => copy(fullText, "__all__")}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full transition-all"
          style={{ background: copied === "__all__" ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)", color: copied === "__all__" ? "#4ade80" : C.muted, border: `1px solid ${copied === "__all__" ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.08)"}` }}>
          <Icon name={copied === "__all__" ? "Check" : "Copy"} size={11} />
          {copied === "__all__" ? "Скопировано" : "Копировать всё"}
        </button>
      </div>
      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {REQUISITES.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => copy(value, label)}
            className="w-full flex items-start justify-between gap-3 px-5 py-3 text-left transition-all group"
            style={{ background: copied === label ? "rgba(74,222,128,0.06)" : "transparent" }}
            onMouseEnter={e => { if (copied !== label) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
            onMouseLeave={e => { if (copied !== label) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: C.muted }}>{label}</div>
              <div className="text-sm font-semibold leading-snug" style={{ color: copied === label ? "#4ade80" : "#d1dae8" }}>{value}</div>
            </div>
            <div className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name={copied === label ? "Check" : "Copy"} size={12} style={{ color: copied === label ? "#4ade80" : C.muted } as React.CSSProperties} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReviewsContactSection({ form, setForm, sent, setSent, go }: Props) {
  const inputStyle = {
    background: "rgba(255,255,255,0.07)",
    border: `1px solid ${C.borderCyan}`,
    color: "#fff",
  };

  return (
    <>
      {/* ── ОТЗЫВЫ ── */}
      <section id="reviews" className="py-24 relative overflow-hidden">
        <SectionBg img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/99e7f943-818a-4bc9-a5f6-b90a6889755f.jpg" />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <SectionTitle accent={C.cyan} label="Клиенты о нас" title={<>От<span style={{ color: C.gold }}>зывы</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => {
              const a = accent(i);
              return (
                <div key={i}
                  className="relative rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                  style={{ background: `linear-gradient(145deg, rgba(37,43,61,0.9), rgba(30,36,56,0.9))`, border: `1px solid ${a.border}`, backdropFilter: "blur(8px)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 12px 40px ${a.glow}`;
                    e.currentTarget.style.borderColor = a.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = a.border;
                  }}>
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

      <PhotoDivider
        img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/c044d8db-6cca-4aa4-9ab7-7f0ccc8c8d40.jpg"
        label='Оставить <span style="color:#38e8ff">заявку</span>'
        sublabel="Бесплатный расчёт"
        bgFrom={C.bg} bgTo={C.bgDeep}
      />

      {/* ── ФОРМА ЗАЯВКИ ── */}
      <section id="form" className="py-24 relative overflow-hidden">
        <SectionBg img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/c044d8db-6cca-4aa4-9ab7-7f0ccc8c8d40.jpg" />
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
              <div className="grid grid-cols-2 gap-3">
                {[
                  { img: "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/9e7d4986-f95c-402b-91f0-8c6e71aca8ef.jpg", label: "Замерщик бесплатно", badge: "0 ₽" },
                  { img: "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/4fac4d37-02ce-4216-96af-3a2a158f4d6b.jpg", label: "Договор и гарантия", badge: "ДОГОВОР" },
                  { img: "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/5eaf8366-b7a6-49b4-8d8c-7c9aea756113.jpg", label: "Смета в день звонка", badge: "СЕГОДНЯ" },
                  { img: "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/743ebb95-8d22-4310-82df-925fc56f822a.jpg", label: "Ответим за 5 минут", badge: "БЫСТРО" },
                ].map(({ img, label, badge }, i) => {
                  const a = accent(i);
                  return (
                    <div key={i} className="relative rounded-2xl overflow-hidden" style={{ height: 130, border: `1px solid ${a.border}` }}>
                      <img src={img} alt={label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,24,0.85) 40%, transparent)" }} />
                      <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 flex items-end justify-between gap-1">
                        <span className="text-[10px] font-black uppercase leading-tight" style={{ color: "#fff" }}>{label}</span>
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full shrink-0"
                          style={{ background: a.glow, color: a.color, border: `1px solid ${a.border}`, backdropFilter: "blur(6px)" }}>
                          {badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl p-8" style={{ background: "rgba(37,43,61,0.85)", border: `1px solid ${C.borderCyan}`, backdropFilter: "blur(12px)" }}>
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

      <PhotoDivider
        img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/f703c39b-47e7-430c-9935-13763dc5fc81.jpg"
        label='Конта<span style="color:#38e8ff">кты</span>'
        sublabel="Связаться"
        bgFrom={C.bgDeep} bgTo={C.bg}
      />

      {/* ── КОНТАКТЫ ── */}
      <section id="contacts" className="py-24 relative overflow-hidden">
        <SectionBg img="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/f703c39b-47e7-430c-9935-13763dc5fc81.jpg" />
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
                    style={{ background: `rgba(37,43,61,0.85)`, border: `1px solid ${a.border}`, textDecoration: "none", backdropFilter: "blur(8px)" }}
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
              <div className="rounded-2xl p-5" style={{ background: `rgba(37,43,61,0.85)`, border: `1px solid ${ACCENTS[3].border}`, backdropFilter: "blur(8px)" }}>
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

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-8 flex flex-col justify-between gap-6 relative overflow-hidden"
                style={{ background: `rgba(37,43,61,0.85)`, border: `1px solid ${C.borderGold}`, backdropFilter: "blur(12px)" }}>
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

              {/* ── РЕКВИЗИТЫ ── */}
              <RequisitesBlock />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}