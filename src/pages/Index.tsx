import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/7897c21a-b422-4b40-8fd5-700ffff4a3c9.jpg";

const NAV_LINKS = [
  ["hero", "Главная"],
  ["services", "Услуги"],
  ["portfolio", "Объекты"],
  ["calc", "Стоимость"],
  ["reviews", "Отзывы"],
  ["contacts", "Контакты"],
];

const SERVICES = [
  { icon: "Layers", title: "Укладка асфальта", desc: "Жилые дворы, парковки, дороги. Горячий и холодный асфальт. Гарантия 3 года." },
  { icon: "SquareStack", title: "Ямочный ремонт", desc: "Заделка ям и выбоин. Выезд за 24 часа. Работаем круглый год." },
  { icon: "Warehouse", title: "Промышленные площадки", desc: "Заводские территории, склады, логистические комплексы. До 50 000 м²." },
  { icon: "Car", title: "Парковки и стоянки", desc: "Разметка и асфальтирование парковок «под ключ». Дренаж и бордюры." },
  { icon: "TreePine", title: "Благоустройство", desc: "Пешеходные дорожки, тротуары, площадки. Тротуарная плитка и асфальт." },
  { icon: "Ruler", title: "Проектирование", desc: "Геодезия, проектная документация, согласование с администрацией НН." },
];

const PORTFOLIO = [
  { title: "ЖК «Новинки Смарт Сити»", area: "12 000 м²", type: "Двор и парковка", year: "2024" },
  { title: "Завод ГАЗ, территория склада", area: "8 500 м²", type: "Промплощадка", year: "2024" },
  { title: "ТЦ «Небо», ул. Родионова", area: "5 200 м²", type: "Парковка", year: "2023" },
  { title: "Шоссе Московское, 10 км", area: "3 400 м²", type: "Ямочный ремонт", year: "2024" },
  { title: "ЖК «Анкудиновский парк»", area: "9 800 м²", type: "Двор и дорожки", year: "2023" },
  { title: "Логопарк «Бор»", area: "22 000 м²", type: "Промплощадка", year: "2024" },
];

const REVIEWS = [
  { name: "Сергей Никонов", role: "Управляющая компания «Уют»", text: "Заасфальтировали 4 двора в нашем ЖК. Работали аккуратно, без задержек. Жители очень довольны!", stars: 5 },
  { name: "Алёна Кузьмина", role: "ИП, автостоянка", text: "Сделали парковку на 80 машин. Хорошая геометрия, ровное покрытие. Зиму пережило отлично!", stars: 5 },
  { name: "Роман Третьяков", role: "Директор, ООО «ПромСтрой НН»", text: "Работаем с ними на всех наших объектах. Надёжный подрядчик, соблюдают сроки и бюджет.", stars: 5 },
  { name: "Наталья Берёзова", role: "Городская администрация, МО Кстово", text: "Выполнили ямочный ремонт 18 км дорог. Хорошее качество, всё в срок. Рекомендуем.", stars: 5 },
];

const STATS = [
  { val: "350", suffix: "+", label: "Объектов сдано" },
  { val: "800", suffix: "к м²", label: "Уложено асфальта" },
  { val: "11", suffix: " лет", label: "Работаем в НН" },
  { val: "48", suffix: " ч", label: "Выезд на объект" },
];

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimCounter({ val, suffix }: { val: string; suffix: string }) {
  const { ref, visible } = useInView(0.5);
  const [count, setCount] = useState(0);
  const target = parseInt(val);
  useEffect(() => {
    if (!visible) return;
    let start: number;
    const run = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [visible, target]);
  return (
    <div ref={ref} className="text-center group">
      <div className="font-montserrat text-5xl font-black text-orange-500 mb-1 tabular-nums">
        {visible ? count : 0}{suffix}
      </div>
    </div>
  );
}

const AREA_PRICES: [string, number][] = [
  ["До 500 м²", 1800],
  ["500–1000 м²", 1600],
  ["1000–3000 м²", 1400],
  ["Свыше 3000 м²", 1200],
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [area, setArea] = useState(500);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const getPrice = () => {
    if (area < 500) return 1800;
    if (area < 1000) return 1600;
    if (area < 3000) return 1400;
    return 1200;
  };

  const totalPrice = area * getPrice();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const ids = NAV_LINKS.map(([id]) => id);
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id); }); },
      { threshold: 0.35 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#111213] text-white min-h-screen font-montserrat overflow-x-hidden">

      {/* ── NAV ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#111213]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
              <Icon name="Layers" size={16} className="text-white" />
            </div>
            <span className="font-montserrat font-black text-lg tracking-tight">
              АСФАЛЬТ<span className="text-orange-500">НН</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`text-xs font-semibold uppercase tracking-widest transition-colors ${activeNav === id ? "text-orange-500" : "text-gray-400 hover:text-white"}`}>
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+78312000000" className="hidden md:flex items-center gap-2 text-sm font-bold text-white hover:text-orange-500 transition-colors">
              <Icon name="Phone" size={14} className="text-orange-500" />
              +7 (831) 200-00-00
            </a>
            <button onClick={() => scrollTo("contacts")} className="hidden md:block bg-orange-500 text-white font-bold text-xs px-5 py-2.5 uppercase tracking-widest hover:bg-orange-400 transition-colors">
              Заявка
            </button>
            <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-[#1a1b1c] border-t border-white/5 px-5 py-5 flex flex-col gap-4">
            {NAV_LINKS.map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-left font-montserrat font-bold text-sm uppercase tracking-widest text-gray-300 hover:text-orange-500 transition-colors">
                {label}
              </button>
            ))}
            <a href="tel:+78312000000" className="text-orange-500 font-bold text-sm mt-2">+7 (831) 200-00-00</a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111213] via-[#111213]/85 to-[#111213]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111213] via-transparent to-transparent" />

        {/* texture grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)"
        }} />

        <div className="relative max-w-7xl mx-auto px-5 pt-20 pb-44 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-7">
              <div className="h-px w-10 bg-orange-500" />
              <span className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em]">Нижний Новгород и область</span>
            </div>
            <h1 className="font-montserrat font-black text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] uppercase mb-7 tracking-tight">
              Профес-<br />сиональное<br /><span className="text-orange-500">асфальти-<br />рование</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              Дороги, дворы, парковки и промышленные площадки. Работаем с 2013 года. Гарантия на покрытие — 3 года.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("calc")} className="bg-orange-500 hover:bg-orange-400 text-white font-black text-sm px-8 py-4 uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                Рассчитать стоимость
              </button>
              <button onClick={() => scrollTo("portfolio")} className="border-2 border-white/20 hover:border-orange-500 text-white hover:text-orange-500 font-bold text-sm px-8 py-4 uppercase tracking-widest transition-all">
                Наши объекты
              </button>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="absolute bottom-0 inset-x-0 bg-[#1a1b1c]/90 backdrop-blur-sm border-t border-white/5">
          <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <AnimCounter val={s.val} suffix={s.suffix} />
                <div className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-[#1a1b1c]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { icon: "ShieldCheck", title: "Гарантия 3 года", desc: "Письменный договор и гарантийный талон на каждый объект" },
              { icon: "Zap", title: "Выезд за 24 часа", desc: "Замер и коммерческое предложение в день обращения" },
              { icon: "BadgeCheck", title: "Своя техника", desc: "Весь парк — наш. Никаких субподрядчиков и переплат" },
            ].map((item) => (
              <div key={item.title} className="bg-[#1a1b1c] p-8 flex gap-5 hover:bg-[#222325] transition-colors group">
                <div className="w-12 h-12 bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <Icon name={item.icon} fallback="Check" size={22} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-montserrat font-black text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 bg-[#111213]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-orange-500" />
                <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em]">Что мы делаем</span>
              </div>
              <h2 className="font-montserrat font-black text-4xl md:text-6xl uppercase leading-none tracking-tight">
                Наши<br /><span className="text-orange-500">услуги</span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm max-w-sm md:text-right leading-relaxed">
              Полный цикл дорожных работ: от проектирования до сдачи объекта с документами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-[#111213] hover:bg-[#1a1b1c] p-8 transition-colors group cursor-pointer border-b border-white/5 md:border-b-0">
                <div className="w-10 h-10 bg-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                  <Icon name={s.icon} fallback="Layers" size={20} className="text-orange-500" />
                </div>
                <h3 className="font-montserrat font-black text-base uppercase tracking-wide mb-3 group-hover:text-orange-500 transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Подробнее <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-28 bg-[#1a1b1c]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em]">Реализованные проекты</span>
            </div>
            <h2 className="font-montserrat font-black text-4xl md:text-6xl uppercase leading-none tracking-tight">
              Наши<br /><span className="text-orange-500">объекты</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.map((p, i) => (
              <div key={i} className="group bg-[#111213] border border-white/5 hover:border-orange-500/30 p-7 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-500/5 rounded-full group-hover:bg-orange-500/10 transition-colors" />
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">{p.type}</span>
                  <span className="text-gray-600 text-xs font-bold">{p.year}</span>
                </div>
                <h3 className="font-montserrat font-black text-base uppercase tracking-tight mb-3 group-hover:text-orange-500 transition-colors leading-tight">{p.title}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon name="Square" size={12} className="text-orange-500" />
                  <span className="font-bold">{p.area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALC ── */}
      <section id="calc" className="py-28 bg-[#111213]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em]">Быстрый расчёт</span>
            </div>
            <h2 className="font-montserrat font-black text-4xl md:text-6xl uppercase leading-none tracking-tight">
              Стои-<br /><span className="text-orange-500">мость</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold uppercase tracking-wide text-gray-400">Площадь объекта</span>
                  <span className="font-montserrat font-black text-2xl text-white">{area.toLocaleString("ru")} м²</span>
                </div>
                <input
                  type="range" min={50} max={10000} step={50} value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-gray-600 text-xs mt-2">
                  <span>50 м²</span><span>10 000 м²</span>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                {AREA_PRICES.map(([label, price]) => (
                  <div key={label} className={`flex justify-between items-center px-4 py-3 border transition-colors ${getPrice() === price ? "border-orange-500 bg-orange-500/10" : "border-white/5 bg-[#1a1b1c]"}`}>
                    <span className="text-sm font-semibold">{label}</span>
                    <span className={`font-black text-sm ${getPrice() === price ? "text-orange-500" : "text-gray-500"}`}>{price.toLocaleString("ru")} ₽/м²</span>
                  </div>
                ))}
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 px-6 py-5 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-wide">Примерная сумма</span>
                <span className="font-montserrat font-black text-3xl text-orange-500">{totalPrice.toLocaleString("ru")} ₽</span>
              </div>
              <p className="text-gray-600 text-xs mt-3">* Без учёта подготовки основания. Точный расчёт — после выезда замерщика</p>
            </div>

            <div className="bg-[#1a1b1c] border border-white/5 p-8">
              <h3 className="font-montserrat font-black text-xl uppercase mb-1">Вызвать замерщика</h3>
              <p className="text-gray-500 text-sm mb-7">Приедем, замерим и дадим точную смету — бесплатно</p>
              <div className="space-y-4">
                {[
                  { key: "name", label: "Имя", ph: "Иван Петров" },
                  { key: "phone", label: "Телефон", ph: "+7 (___) ___-__-__" },
                  { key: "address", label: "Адрес объекта", ph: "ул. Горького, 12, Нижний Новгород" },
                ].map(({ key, label, ph }) => (
                  <div key={key}>
                    <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">{label}</label>
                    <input
                      className="w-full bg-[#111213] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-700"
                      placeholder={ph}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-montserrat font-black text-sm px-8 py-4 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Вызвать замерщика →
                </button>
                <p className="text-gray-600 text-xs text-center">Ответим в течение 30 минут в рабочее время</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-28 bg-[#1a1b1c]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em]">Мнения клиентов</span>
            </div>
            <h2 className="font-montserrat font-black text-4xl md:text-6xl uppercase leading-none tracking-tight">
              От<span className="text-orange-500">зывы</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-[#111213] border border-white/5 p-8 relative overflow-hidden group hover:border-orange-500/20 transition-colors">
                <div className="absolute top-5 right-6 font-montserrat font-black text-8xl text-orange-500/10 leading-none select-none">"</div>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={13} className="text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-7 italic">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={14} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="font-montserrat font-black text-xs uppercase tracking-wide">{r.name}</div>
                    <div className="text-gray-600 text-xs mt-0.5">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-28 bg-[#111213]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em]">Свяжитесь с нами</span>
            </div>
            <h2 className="font-montserrat font-black text-4xl md:text-6xl uppercase leading-none tracking-tight">
              Конта<span className="text-orange-500">кты</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", val: "+7 (831) 200-00-00", sub: "Звонки принимаем круглосуточно" },
                { icon: "Mail", label: "Email", val: "info@asfalt-nn.ru", sub: "Ответ в течение 2 часов" },
                { icon: "MapPin", label: "Офис", val: "г. Нижний Новгород, ул. Родионова, 23", sub: "Пн–Пт: 9:00–18:00" },
                { icon: "Truck", label: "Зона работ", val: "Нижний Новгород и вся область", sub: "Выезд по НН — бесплатно" },
              ].map((c) => (
                <div key={c.label} className="flex gap-5 group">
                  <div className="w-11 h-11 bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors mt-0.5">
                    <Icon name={c.icon} fallback="Info" size={17} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="text-gray-600 text-[10px] uppercase tracking-widest font-bold mb-0.5">{c.label}</div>
                    <div className="font-montserrat font-black text-sm">{c.val}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{c.sub}</div>
                  </div>
                </div>
              ))}

              {/* mini CTA */}
              <div className="mt-8 bg-orange-500 p-6">
                <p className="font-montserrat font-black text-base uppercase mb-1">Нужна срочная заявка?</p>
                <p className="text-orange-100 text-sm mb-4">Ямочный ремонт — выедем за 24 часа</p>
                <a href="tel:+78312000000" className="inline-flex items-center gap-2 bg-white text-orange-500 font-black text-sm px-5 py-2.5 uppercase tracking-widest hover:bg-orange-50 transition-colors">
                  <Icon name="Phone" size={14} />
                  Позвонить
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-[#1a1b1c] border border-white/5 flex flex-col items-center justify-center min-h-64 gap-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,165,0,0.3) 30px, rgba(255,165,0,0.3) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,165,0,0.3) 30px, rgba(255,165,0,0.3) 31px)"
              }} />
              <div className="relative text-center">
                <Icon name="MapPin" size={40} className="text-orange-500 mx-auto mb-3" />
                <p className="font-montserrat font-black text-base uppercase tracking-wide">Нижний Новгород</p>
                <p className="text-gray-500 text-sm mt-1">и Нижегородская область</p>
                <div className="mt-4 inline-flex flex-wrap gap-2 justify-center">
                  {["Кстово", "Бор", "Дзержинск", "Балахна", "Арзамас"].map((city) => (
                    <span key={city} className="bg-orange-500/10 text-orange-500 text-xs font-bold px-3 py-1 uppercase tracking-wide">{city}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-7 bg-[#0e0f10]">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-montserrat font-black text-base tracking-tight">
            АСФАЛЬТ<span className="text-orange-500">НН</span>
          </div>
          <p className="text-gray-700 text-xs">© 2024 АсфальтНН. Дорожные работы в Нижнем Новгороде</p>
          <button onClick={() => scrollTo("hero")} className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Наверх ↑</button>
        </div>
      </footer>
    </div>
  );
}
