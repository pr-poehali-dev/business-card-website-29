import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/9986e217-5eed-40ef-8d2d-543498f0532e.jpg";
const PHONE = "+7 960 169-09-90";
const PHONE_HREF = "tel:+79601690990";

const NAV = [
  ["services", "Преимущества"],
  ["tech", "Техника"],
  ["works", "Услуги"],
  ["how", "Как это работает"],
  ["contacts", "Контакты"],
];

const SERVICES = [
  { icon: "Layers", title: "Укладка асфальта", desc: "Горячий и холодный асфальт для дорог, дворов и парковок. Гарантия 3 года.", price: "от 1 200 ₽/м²" },
  { icon: "Hammer", title: "Ямочный ремонт", desc: "Заделка выбоин и трещин. Выезд за 24 часа. Работаем круглый год.", price: "от 800 ₽/м²" },
  { icon: "Warehouse", title: "Промышленные площадки", desc: "Заводы, склады, логистика. Усиленное основание под тяжёлую технику.", price: "от 1 050 ₽/м²" },
  { icon: "Car", title: "Парковки", desc: "Полный цикл: разметка, дренаж, бордюры. До 500 машино-мест.", price: "от 1 100 ₽/м²" },
  { icon: "TreePine", title: "Благоустройство", desc: "Тротуары, дорожки, велосипедные зоны. Тротуарная плитка и асфальт.", price: "от 900 ₽/м²" },
  { icon: "FileText", title: "Проектирование", desc: "Геодезия, документация, согласование с администрацией НН.", price: "по запросу" },
];

const TECH = [
  { name: "Асфальтоукладчик Vogele 1800-3", cap: "Ширина укладки до 9 м", count: "2 ед." },
  { name: "Каток Hamm HD 120", cap: "Рабочая масса 12 т", count: "3 ед." },
  { name: "Автосамосвал МАЗ-6501", cap: "Грузоподъёмность 20 т", count: "6 ед." },
  { name: "Фреза дорожная Wirtgen", cap: "Глубина фрезерования 30 см", count: "1 ед." },
  { name: "Мини-каток Ammann ARX 23", cap: "Для узких мест и дворов", count: "2 ед." },
  { name: "Автогудронатор ДС-142Б", cap: "Объём 7 000 л", count: "1 ед." },
];

const HOW = [
  { num: "01", title: "Заявка", desc: "Оставьте заявку или позвоните — ответим за 30 минут" },
  { num: "02", title: "Замер", desc: "Приедем на объект, сделаем замеры и расчёт — бесплатно" },
  { num: "03", title: "Договор", desc: "Фиксируем цену, сроки и условия в договоре" },
  { num: "04", title: "Работы", desc: "Выполняем в срок своей техникой и бригадой" },
  { num: "05", title: "Сдача", desc: "Подписываем акт, выдаём гарантийный талон на 3 года" },
];

const REVIEWS = [
  { name: "Сергей Никонов", role: "УК «Уют», Н. Новгород", text: "Заасфальтировали 4 двора. Работали аккуратно, жители довольны. Рекомендуем!", stars: 5 },
  { name: "Алёна Кузьмина", role: "ИП, автостоянка", text: "Парковка на 80 мест — ровная, зиму пережила без трещин. Всё по договору.", stars: 5 },
  { name: "Роман Третьяков", role: "ООО «ПромСтрой НН»", text: "Работаем только с Фаворитом. Сроки соблюдают, смета не меняется.", stars: 5 },
  { name: "Наталья Берёзова", role: "Администрация МО Кстово", text: "Ямочный ремонт 18 км. Сдали раньше срока. Продолжаем сотрудничество.", stars: 5 },
];

const C = {
  bg: "#1a1f2e",
  bgDeep: "#141928",
  bgDark: "#0f1422",
  cyan: "#22d3ee",
  gold: "#f0c030",
  goldDark: "#d4a017",
  muted: "#6b7280",
  subtle: "#94a3b8",
  light: "#cbd5e1",
  border: "rgba(255,255,255,0.07)",
  borderCyan: "rgba(34,211,238,0.2)",
  borderGold: "rgba(240,192,48,0.25)",
};

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", area: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const ids = ["hero", "services", "tech", "works", "how", "reviews", "contacts"];
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id); }),
      { threshold: 0.2 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) ob.observe(el); });
    return () => ob.disconnect();
  }, []);

  const cardStyle = { background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}` };

  return (
    <div className="min-h-screen font-montserrat overflow-x-hidden" style={{ background: C.bg, color: "#fff" }}>

      {/* ── ШАПКА ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b" style={{ background: "rgba(15,20,34,0.97)", borderColor: C.border, backdropFilter: "blur(16px)" }}>
        <div className="max-w-screen-xl mx-auto px-5 h-[70px] flex items-center justify-between gap-4">

          <button onClick={() => go("hero")} className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
              style={{ background: "#0f1422", boxShadow: "0 2px 14px rgba(240,192,48,0.35)", border: "1.5px solid rgba(240,192,48,0.4)" }}>
              <img src="/favicon.svg" alt="Фаворит" className="w-10 h-10" />
            </div>
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

      {/* ── ГЕРОЙ ── */}
      <section id="hero" className="relative overflow-hidden pt-[70px]" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Асфальтирование Фаворит" className="w-full h-full object-cover" style={{ filter: "saturate(1.2) contrast(1.05)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,14,24,0.88) 0%, rgba(10,14,24,0.55) 60%, rgba(10,14,24,0.15) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,24,1) 0%, rgba(10,14,24,0.3) 40%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-5 flex flex-col justify-center" style={{ minHeight: "calc(100svh - 70px)", paddingTop: "3rem", paddingBottom: "5rem" }}>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(34,211,238,0.08)", border: `1px solid rgba(34,211,238,0.25)`, color: C.cyan }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.cyan }} />
              Нижний Новгород и область · Работаем 24/7
            </div>

            <h1 className="font-black leading-[1.0] mb-6" style={{ fontSize: "clamp(2.4rem,6vw,5rem)", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              Профессиональное<br />
              <span style={{ color: C.cyan }}>асфальтирование</span><br />
              в Нижнем Новгороде
            </h1>

            <p className="text-lg leading-relaxed mb-7 max-w-xl" style={{ color: C.light }}>
              Укладка асфальта, ямочный ремонт, парковки, промзоны — под ключ.<br />Подача бригады за 24 часа. Гарантия 3 года.
            </p>

            {/* Цена-бейдж */}
            <div className="inline-flex items-center gap-3 rounded-xl px-5 py-3 mb-8"
              style={{ background: "rgba(240,192,48,0.12)", border: `1px solid rgba(240,192,48,0.4)`, backdropFilter: "blur(8px)" }}>
              <Icon name="Layers" size={20} style={{ color: C.gold } as React.CSSProperties} />
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: C.muted }}>Стоимость работ</div>
                <div className="font-black text-2xl" style={{ color: C.gold }}>от 1 200 ₽/м²</div>
              </div>
            </div>

            {/* Факты */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
              {[
                ["Clock", "Начало работ от 1 дня"],
                ["CalendarCheck", "Мин. заказ — 200 м²"],
                ["Users", "Собственная бригада"],
                ["Receipt", "Работаем с НДС"],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.subtle }}>
                  <Icon name={icon} fallback="Check" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={PHONE_HREF}
                className="flex items-center gap-2 font-black text-sm px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg"
                style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000", boxShadow: "0 4px 20px rgba(240,192,48,0.4)" }}>
                <Icon name="Phone" size={16} />
                Позвонить: {PHONE}
              </a>
              <button onClick={() => go("form")}
                className="font-black text-sm px-8 py-4 rounded-full border transition-all hover:scale-105"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
                Оставить заявку
              </button>
            </div>
          </div>
        </div>

        {/* Стрелка вниз */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.muted }}>Листайте</div>
          <Icon name="ChevronDown" size={20} style={{ color: C.cyan } as React.CSSProperties} />
        </div>
      </section>

      {/* ── СТАТЫ ── */}
      <div style={{ background: C.bgDark, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-screen-xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x" style={{ borderColor: C.border }}>
          {[
            { val: "350+", label: "Объектов сдано" },
            { val: "800к м²", label: "Уложено асфальта" },
            { val: "11 лет", label: "На рынке НН" },
            { val: "24 ч", label: "Выезд на замер" },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <div className="font-black text-3xl" style={{ color: C.cyan }}>{s.val}</div>
              <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: C.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

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
            {/* Левый текст */}
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

            {/* Форма */}
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
                        value={form[key as keyof typeof form]}
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
    </div>
  );
}