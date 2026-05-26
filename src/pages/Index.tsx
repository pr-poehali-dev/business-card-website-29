import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/fd91c0c7-8bb2-4659-bd63-cab84f331cb2.jpg";
const PHONE = "+7 (960) 169-09-90";
const PHONE_HREF = "tel:+79601690990";

const SERVICES = [
  { icon: "Layers", num: "01", title: "Укладка асфальта", desc: "Горячий и холодный асфальт для дорог, дворов, парковок любой площади. Гарантия — 3 года." },
  { icon: "Hammer", num: "02", title: "Ямочный ремонт", desc: "Ликвидируем выбоины и трещины за 24 часа. Литой и щебёночный асфальтобетон." },
  { icon: "Warehouse", num: "03", title: "Промышленные площадки", desc: "Заводские территории, логистика, склады. Усиленное основание под тяжёлую технику." },
  { icon: "Car", num: "04", title: "Парковки", desc: "Полный цикл: разметка, дренаж, бордюры, освещение. До 500 машино-мест." },
  { icon: "TreePine", num: "05", title: "Благоустройство", desc: "Пешеходные зоны, тротуары, велодорожки. Тротуарная плитка и мелкозернистый асфальт." },
  { icon: "FileText", num: "06", title: "Документация", desc: "Геодезические изыскания, проект, согласование с администрацией НН и области." },
];

const WORKS = [
  { title: "ЖК «Новинки Smart City»", area: "12 000", type: "Двор + парковка", year: "2024" },
  { title: "Завод ГАЗ, склад №4", area: "8 500", type: "Промплощадка", year: "2024" },
  { title: "ТЦ «Небо», ул. Родионова", area: "5 200", type: "Открытая парковка", year: "2023" },
  { title: "Московское шоссе, 10 км", area: "3 400", type: "Ямочный ремонт", year: "2024" },
  { title: "ЖК «Анкудиновский Парк»", area: "9 800", type: "Двор и дорожки", year: "2023" },
  { title: "Логопарк «Бор»", area: "22 000", type: "Промплощадка", year: "2024" },
];

const REVIEWS = [
  { name: "Сергей Никонов", role: "УК «Уют», Нижний Новгород", text: "Заасфальтировали 4 двора в нашем ЖК. Работали аккуратно, без задержек. Жители в восторге!", stars: 5 },
  { name: "Алёна Кузьмина", role: "ИП, автостоянка «Центральная»", text: "Парковка на 80 мест — ровная, красивая. Зиму пережило без единой трещины. Всё по договору.", stars: 5 },
  { name: "Роман Третьяков", role: "Директор ООО «ПромСтрой НН»", text: "Работаем на всех объектах только с Фаворитом. Соблюдают сроки, всё по смете, без сюрпризов.", stars: 5 },
  { name: "Наталья Берёзова", role: "Администрация МО Кстово", text: "Ямочный ремонт 18 км. Отличное качество, сдали раньше срока. Сотрудничество продолжаем.", stars: 5 },
];

const PRICE_TIERS: { label: string; range: string; price: number }[] = [
  { label: "Мини", range: "до 500 м²", price: 1800 },
  { label: "Стандарт", range: "500–2000 м²", price: 1550 },
  { label: "Бизнес", range: "2000–5000 м²", price: 1300 },
  { label: "Крупный", range: "от 5000 м²", price: 1050 },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.4 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ to, suffix = "", dur = 1800 }: { to: number; suffix?: string; dur?: number }) {
  const { ref, inView } = useInView();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let t: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.floor(p * to));
      if (p < 1) t = requestAnimationFrame(tick);
    };
    t = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(t);
  }, [inView, to, dur]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Index() {
  const [nav, setNav] = useState("hero");
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState(1000);
  const [form, setForm] = useState({ name: "", phone: "", obj: "" });
  const [sent, setSent] = useState(false);

  const tier = PRICE_TIERS.find((t, i) => {
    if (i === 0 && area < 500) return true;
    if (i === 1 && area >= 500 && area < 2000) return true;
    if (i === 2 && area >= 2000 && area < 5000) return true;
    if (i === 3 && area >= 5000) return true;
    return false;
  }) ?? PRICE_TIERS[0];

  const total = area * tier.price;

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  useEffect(() => {
    const ids = ["hero", "services", "works", "calc", "reviews", "contacts"];
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setNav(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) ob.observe(el); });
    return () => ob.disconnect();
  }, []);

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-montserrat overflow-x-hidden selection:bg-amber-500 selection:text-black">

      {/* ─── ШАПКА ─── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-5 h-[68px] flex items-center justify-between gap-6">

          {/* Лого */}
          <button onClick={() => go("hero")} className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-9 h-9 bg-amber-500 skew-x-[-8deg]" />
              <span className="absolute inset-0 flex items-center justify-center font-black text-black text-sm tracking-tighter">Ф</span>
            </div>
            <div className="leading-none">
              <div className="font-black text-base tracking-[0.08em] uppercase">Фаворит</div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-[0.15em]">Асфальтирование НН</div>
            </div>
          </button>

          {/* Навигация */}
          <nav className="hidden lg:flex items-center gap-8">
            {[["hero","Главная"],["services","Услуги"],["works","Объекты"],["calc","Цены"],["reviews","Отзывы"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => go(id)}
                className={`relative text-[11px] font-bold uppercase tracking-[0.15em] transition-colors pb-0.5 ${nav === id ? "text-amber-500" : "text-zinc-400 hover:text-white"}`}>
                {label}
                {nav === id && <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-amber-500" />}
              </button>
            ))}
          </nav>

          {/* Телефон + кнопка */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <a href={PHONE_HREF} className="text-sm font-black tracking-tight hover:text-amber-500 transition-colors flex items-center gap-2">
              <span className="w-6 h-6 bg-amber-500/15 rounded-sm flex items-center justify-center">
                <Icon name="Phone" size={12} className="text-amber-500" />
              </span>
              {PHONE}
            </a>
            <button onClick={() => go("contacts")}
              className="bg-amber-500 hover:bg-amber-400 text-black font-black text-[11px] uppercase tracking-[0.15em] px-5 py-2.5 transition-all hover:scale-105 active:scale-95 skew-x-[-4deg]">
              Заявка
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-zinc-900 border-t border-white/5 px-5 py-5 flex flex-col gap-4">
            {[["hero","Главная"],["services","Услуги"],["works","Объекты"],["calc","Цены"],["reviews","Отзывы"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className="text-left font-bold text-sm uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors">{label}</button>
            ))}
            <a href={PHONE_HREF} className="text-amber-500 font-black text-sm mt-1">{PHONE}</a>
          </div>
        )}
      </header>

      {/* ─── ГЕРОЙ ─── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Фото */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Асфальтирование Фаворит НН" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-zinc-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />
        </div>

        {/* Диагональные полосы */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[0,1,2,3].map(i => (
            <div key={i} className="absolute h-full w-px bg-gradient-to-b from-transparent via-amber-500 to-transparent"
              style={{ left: `${20 + i * 22}%`, transform: "skewX(-15deg)", animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>

        <div className="relative max-w-screen-xl mx-auto px-5 pt-24 pb-52 w-full">
          <div className="max-w-2xl">
            {/* Бейдж */}
            <div className="inline-flex items-center gap-3 mb-8 bg-amber-500/10 border border-amber-500/25 px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.25em]">Нижний Новгород и область · Работаем с 2013</span>
            </div>

            <h1 className="font-black text-[clamp(2.4rem,8vw,5.8rem)] leading-[0.92] uppercase tracking-tight mb-7">
              Асфаль-<br />тируем<br /><span className="text-amber-500 italic">Фаворит</span>
            </h1>

            <p className="text-zinc-300 text-lg leading-relaxed mb-10 max-w-lg">
              Дороги, дворы, парковки, промзоны — берём любые объекты под ключ. Более 350 сданных объектов по НН и области.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button onClick={() => go("calc")}
                className="group bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-widest px-8 py-4 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                Рассчитать цену
                <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href={PHONE_HREF}
                className="border-2 border-white/20 hover:border-amber-500 text-white hover:text-amber-500 font-black text-sm uppercase tracking-widest px-8 py-4 transition-all flex items-center gap-2">
                <Icon name="Phone" size={15} />
                {PHONE}
              </a>
            </div>

            {/* Быстрые факты */}
            <div className="flex flex-wrap gap-6">
              {[["ShieldCheck","Гарантия 3 года"], ["Clock","Выезд за 24 ч"], ["BadgeCheck","Своя техника"]].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <Icon name={icon} fallback="Check" size={14} className="text-amber-500" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Счётчики */}
        <div className="absolute bottom-0 inset-x-0 bg-zinc-900/95 backdrop-blur border-t border-white/5">
          <div className="max-w-screen-xl mx-auto px-5 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/5">
            {[
              { to: 350, suffix: "+", label: "Объектов сдано" },
              { to: 800, suffix: "к м²", label: "Уложено асфальта" },
              { to: 11, suffix: " лет", label: "На рынке НН" },
              { to: 24, suffix: " ч", label: "Выезд на замер" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <div className="font-black text-4xl text-amber-500 tabular-nums">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── УСЛУГИ ─── */}
      <section id="services" className="py-28 bg-zinc-950">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.25em] mb-4">— Что мы делаем</p>
              <h2 className="font-black text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight">
                Наши<br /><span className="text-amber-500">услуги</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed md:text-right">
              Полный цикл дорожных работ от проекта до сдачи объекта с исполнительной документацией
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div key={i}
                className="group border border-white/5 hover:border-amber-500/40 p-8 transition-all duration-300 hover:bg-zinc-900/60 cursor-pointer relative overflow-hidden">
                <div className="absolute top-5 right-5 font-black text-5xl text-white/4 group-hover:text-amber-500/8 transition-colors leading-none select-none">
                  {s.num}
                </div>
                <div className="w-11 h-11 bg-amber-500/10 group-hover:bg-amber-500/20 flex items-center justify-center mb-6 transition-colors skew-x-[-4deg]">
                  <Icon name={s.icon} fallback="Layers" size={20} className="text-amber-500" />
                </div>
                <h3 className="font-black text-base uppercase tracking-wide mb-3 group-hover:text-amber-500 transition-colors">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ОБЪЕКТЫ ─── */}
      <section id="works" className="py-28 bg-zinc-900">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="mb-16">
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.25em] mb-4">— Выполненные проекты</p>
            <h2 className="font-black text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight">
              Наши<br /><span className="text-amber-500">объекты</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WORKS.map((w, i) => (
              <div key={i}
                className="group bg-zinc-950 hover:bg-zinc-800 border border-white/5 hover:border-amber-500/30 p-7 transition-all duration-300 relative overflow-hidden">
                {/* Угловой акцент */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-amber-500/20 group-hover:border-t-amber-500/40 transition-colors" />

                <div className="flex items-start justify-between mb-5">
                  <span className="inline-block bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1">{w.type}</span>
                  <span className="text-zinc-600 text-xs font-bold">{w.year}</span>
                </div>
                <h3 className="font-black text-base uppercase tracking-tight mb-3 group-hover:text-amber-500 transition-colors leading-tight">{w.title}</h3>
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Icon name="Maximize2" size={12} className="text-amber-500 shrink-0" />
                  <span className="font-bold">{parseInt(w.area).toLocaleString("ru")} м²</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КАЛЬКУЛЯТОР ─── */}
      <section id="calc" className="py-28 bg-zinc-950">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="mb-16">
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.25em] mb-4">— Онлайн-расчёт</p>
            <h2 className="font-black text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight">
              Стои-<br /><span className="text-amber-500">мость</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Ползунок + тарифы */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-zinc-900 border border-white/5 p-8">
                <div className="flex items-end justify-between mb-6">
                  <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Площадь объекта</span>
                  <span className="font-black text-4xl text-white tabular-nums">{area.toLocaleString("ru")} <span className="text-xl text-zinc-400">м²</span></span>
                </div>
                <input type="range" min={50} max={10000} step={50} value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full cursor-pointer accent-amber-500 h-1" />
                <div className="flex justify-between text-zinc-600 text-xs mt-3 font-bold">
                  <span>50 м²</span><span>10 000 м²</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {PRICE_TIERS.map((t) => {
                  const active = tier.label === t.label;
                  return (
                    <div key={t.label}
                      className={`p-5 border transition-all ${active ? "border-amber-500 bg-amber-500/10" : "border-white/5 bg-zinc-900 hover:border-white/15"}`}>
                      <div className={`text-xs font-black uppercase tracking-widest mb-1 ${active ? "text-amber-500" : "text-zinc-500"}`}>{t.label}</div>
                      <div className={`font-black text-2xl mb-1 ${active ? "text-white" : "text-zinc-300"}`}>{t.price.toLocaleString("ru")} ₽</div>
                      <div className="text-zinc-500 text-xs">{t.range}</div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-amber-500 p-6 flex items-center justify-between">
                <div>
                  <div className="text-black/60 text-xs font-bold uppercase tracking-widest mb-1">Итого от</div>
                  <div className="font-black text-4xl text-black">{total.toLocaleString("ru")} ₽</div>
                  <div className="text-black/60 text-xs mt-1">* без учёта подготовки основания</div>
                </div>
                <Icon name="Calculator" size={48} className="text-black/20" />
              </div>
            </div>

            {/* Форма */}
            <div className="lg:col-span-2 bg-zinc-900 border border-white/5 p-8">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
                  <div className="w-16 h-16 bg-amber-500/20 flex items-center justify-center">
                    <Icon name="CheckCircle" size={32} className="text-amber-500" />
                  </div>
                  <h3 className="font-black text-xl uppercase">Заявка отправлена!</h3>
                  <p className="text-zinc-400 text-sm">Перезвоним в течение 30 минут в рабочее время</p>
                </div>
              ) : (
                <>
                  <h3 className="font-black text-lg uppercase mb-1">Вызвать замерщика</h3>
                  <p className="text-zinc-500 text-sm mb-7 leading-relaxed">Приедем, замерим, дадим точную смету — бесплатно</p>
                  <div className="space-y-4">
                    {[
                      { key: "name", label: "Ваше имя", ph: "Иван Петров" },
                      { key: "phone", label: "Телефон", ph: "+7 (___) ___-__-__" },
                      { key: "obj", label: "Адрес объекта", ph: "ул. Горького 12, НН" },
                    ].map(({ key, label, ph }) => (
                      <div key={key}>
                        <label className="text-zinc-500 text-[10px] uppercase tracking-widest block mb-2">{label}</label>
                        <input
                          className="w-full bg-zinc-950 border border-white/10 focus:border-amber-500 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-zinc-700"
                          placeholder={ph}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => { if (form.name && form.phone) setSent(true); }}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-[0.2em] py-4 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Отправить заявку →
                    </button>
                    <p className="text-zinc-700 text-[10px] text-center leading-relaxed">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ОТЗЫВЫ ─── */}
      <section id="reviews" className="py-28 bg-zinc-900">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="mb-16">
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.25em] mb-4">— Клиенты о нас</p>
            <h2 className="font-black text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight">
              От<span className="text-amber-500">зывы</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-zinc-950 border border-white/5 hover:border-amber-500/20 p-8 transition-colors relative group overflow-hidden">
                <div className="absolute -right-2 -top-4 font-black text-[9rem] text-white/3 group-hover:text-amber-500/5 transition-colors select-none leading-none">"</div>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: r.stars }).map((_, j) => <Icon key={j} name="Star" size={13} className="text-amber-500" />)}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-7 italic relative">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 flex items-center justify-center shrink-0 skew-x-[-4deg]">
                    <Icon name="User" size={14} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="font-black text-xs uppercase tracking-wide">{r.name}</div>
                    <div className="text-zinc-600 text-xs mt-0.5">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КОНТАКТЫ ─── */}
      <section id="contacts" className="py-28 bg-zinc-950">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="mb-16">
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.25em] mb-4">— Связаться</p>
            <h2 className="font-black text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight">
              Конта<span className="text-amber-500">кты</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Инфо */}
            <div className="space-y-5">
              {[
                { icon: "Phone", label: "Телефон", val: PHONE, sub: "Звоните в любое время" },
                { icon: "MapPin", label: "Город", val: "Нижний Новгород", sub: "Работаем по всей области" },
                { icon: "Clock", label: "Режим", val: "Пн–Пт 8:00–19:00", sub: "Приём заявок — круглосуточно" },
              ].map((c) => (
                <a key={c.label}
                  href={c.icon === "Phone" ? PHONE_HREF : undefined}
                  className="flex items-start gap-5 group p-5 bg-zinc-900 border border-white/5 hover:border-amber-500/30 transition-colors">
                  <div className="w-11 h-11 bg-amber-500/10 group-hover:bg-amber-500/20 flex items-center justify-center shrink-0 transition-colors">
                    <Icon name={c.icon} fallback="Info" size={17} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.15em] mb-0.5">{c.label}</div>
                    <div className="font-black text-base">{c.val}</div>
                    <div className="text-zinc-600 text-xs mt-0.5">{c.sub}</div>
                  </div>
                </a>
              ))}

              {/* Города */}
              <div className="p-5 bg-zinc-900 border border-white/5">
                <div className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.15em] mb-3">Работаем в городах</div>
                <div className="flex flex-wrap gap-2">
                  {["НН","Кстово","Бор","Дзержинск","Балахна","Арзамас","Выкса","Павлово"].map((city) => (
                    <span key={city} className="bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5">{city}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Большой CTA */}
            <div className="relative bg-zinc-900 border border-white/5 p-10 overflow-hidden flex flex-col justify-between min-h-80">
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "repeating-linear-gradient(-45deg, #f59e0b 0px, #f59e0b 1px, transparent 1px, transparent 12px)"
              }} />
              <div className="relative">
                <div className="font-black text-2xl uppercase leading-tight mb-4">
                  Позвоните нам<br />прямо сейчас
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Выезд замерщика в день обращения. Смета бесплатно. Работаем с юрлицами и физлицами.
                </p>
              </div>
              <div className="relative flex flex-col gap-3">
                <a href={PHONE_HREF}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-black text-base uppercase tracking-widest px-8 py-5 transition-all hover:scale-[1.02] active:scale-[0.98] text-center flex items-center justify-center gap-3">
                  <Icon name="Phone" size={18} />
                  {PHONE}
                </a>
                <button onClick={() => go("calc")}
                  className="border-2 border-white/10 hover:border-amber-500 text-zinc-300 hover:text-amber-500 font-black text-xs uppercase tracking-widest px-8 py-4 transition-all text-center">
                  Онлайн-расчёт стоимости →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ПОДВАЛ ─── */}
      <footer className="border-t border-white/5 py-8 bg-zinc-950">
        <div className="max-w-screen-xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-7 h-7 bg-amber-500 skew-x-[-8deg]" />
              <span className="absolute inset-0 flex items-center justify-center font-black text-black text-xs">Ф</span>
            </div>
            <span className="font-black text-sm tracking-widest uppercase">Фаворит</span>
          </div>
          <p className="text-zinc-700 text-xs">© 2024 Фаворит. Асфальтирование в Нижнем Новгороде</p>
          <button onClick={() => go("hero")} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Наверх ↑</button>
        </div>
      </footer>
    </div>
  );
}
