import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/1d281b3f-2b2f-4841-bfe5-a6bbe86ec09e.jpg";

const services = [
  { icon: "Truck", title: "Манипулятор 5 тонн", desc: "Идеален для частных домов и небольших объектов", price: "от 2 500 ₽/час" },
  { icon: "Container", title: "Манипулятор 10 тонн", desc: "Коммерческие грузы, строительные материалы", price: "от 3 500 ₽/час" },
  { icon: "Building2", title: "Манипулятор 20 тонн", desc: "Промышленные объекты, тяжёлые конструкции", price: "от 5 500 ₽/час" },
  { icon: "Layers", title: "Манипулятор 3 тонны", desc: "Адресная доставка, стеснённые условия", price: "от 1 800 ₽/час" },
  { icon: "Wrench", title: "Длинномер + манипулятор", desc: "Перевозка габаритных и длинномерных грузов", price: "от 4 200 ₽/час" },
  { icon: "Clock", title: "Аренда на смену", desc: "Выгодный тариф — 8 часов работы", price: "от 18 000 ₽/смена" },
];

const portfolio = [
  { title: "Монтаж металлоконструкций", loc: "Москва, 2024", tons: "18 тонн", tag: "Промышленность" },
  { title: "Доставка бетонных блоков", loc: "Подольск, 2024", tons: "12 тонн", tag: "Строительство" },
  { title: "Установка опор ЛЭП", loc: "МО, 2023", tons: "8 тонн", tag: "Инфраструктура" },
  { title: "Перевозка оборудования", loc: "Химки, 2024", tons: "20 тонн", tag: "Промышленность" },
  { title: "Разгрузка пиломатериалов", loc: "Серпухов, 2023", tons: "5 тонн", tag: "Строительство" },
  { title: "Монтаж кровельных панелей", loc: "Москва, 2024", tons: "10 тонн", tag: "Строительство" },
];

const reviews = [
  { name: "Андрей Климов", role: "Прораб, ООО «СтройТех»", text: "Работаем уже 2 года. Всегда приезжают вовремя, техника в отличном состоянии. Рекомендую!", stars: 5 },
  { name: "Марина Волкова", role: "Частный клиент", text: "Заказывала перевозку металлических ворот. Справились быстро и аккуратно. Цена адекватная.", stars: 5 },
  { name: "Дмитрий Соколов", role: "Директор, «МегаСтрой»", text: "Сотрудничаем постоянно. Большой парк машин, гибкие условия. Настоящие профессионалы.", stars: 5 },
  { name: "Игорь Захаров", role: "ИП, Захаров", text: "Срочный заказ выполнили за 3 часа с момента звонка. Выручили в критической ситуации!", stars: 5 },
];

const stats = [
  { num: "500", label: "Выполненных заказов" },
  { num: "12", label: "Единиц техники" },
  { num: "8", label: "Лет на рынке" },
  { num: "24/7", label: "Режим работы" },
];

function StatCard({ num, label }: { num: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isNum = /^\d+$/.test(num);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !isNum) return;
    const target = parseInt(num);
    const duration = 1800;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, isNum, num]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-oswald font-bold text-yellow-400 mb-2">
        {isNum ? (visible ? count + "+" : "0+") : num}
      </div>
      <div className="text-gray-400 text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = ["hero", "services", "portfolio", "reviews", "contacts"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-roboto overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-oswald text-xl font-bold tracking-wider">
            <span className="text-yellow-400">МАНИ</span>МАШ
          </div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
            {[["hero", "Главная"], ["services", "Услуги"], ["portfolio", "Портфолио"], ["reviews", "Отзывы"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`transition-colors ${activeNav === id ? "text-yellow-400" : "text-gray-400 hover:text-white"}`}
              >{label}</button>
            ))}
          </div>
          <button onClick={() => scrollTo("contacts")} className="hidden md:block bg-yellow-400 text-black font-oswald font-bold text-sm px-5 py-2 uppercase tracking-wider hover:bg-yellow-300 transition-colors">
            Заказать
          </button>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#111] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {[["hero", "Главная"], ["services", "Услуги"], ["portfolio", "Портфолио"], ["reviews", "Отзывы"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-gray-300 hover:text-yellow-400 font-oswald uppercase tracking-widest text-sm">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-20 w-[600px] h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-pulse" />
          <div className="absolute top-2/3 -left-20 w-[400px] h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-48 md:pb-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-4 py-2 mb-6 text-yellow-400 text-xs font-oswald uppercase tracking-widest">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse inline-block" />
              Работаем 24/7
            </div>
            <h1 className="font-oswald text-6xl md:text-8xl font-bold leading-none mb-6 uppercase">
              <span className="block text-white">Аренда</span>
              <span className="block text-yellow-400">Манипу-</span>
              <span className="block text-white">ляторов</span>
            </h1>
            <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
              Профессиональная техника для любых грузов. Подъём, монтаж, перевозка — берёмся за задачи любой сложности.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo("contacts")} className="bg-yellow-400 text-black font-oswald font-bold text-base px-8 py-4 uppercase tracking-widest hover:bg-yellow-300 transition-all hover:scale-105 active:scale-95">
                Получить расчёт
              </button>
              <button onClick={() => scrollTo("services")} className="border border-white/20 text-white font-oswald font-bold text-base px-8 py-4 uppercase tracking-widest hover:border-yellow-400 hover:text-yellow-400 transition-colors">
                Наши услуги
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#111]/90 backdrop-blur border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p className="text-yellow-400 font-oswald uppercase tracking-widest text-sm mb-3">Что мы предлагаем</p>
              <h2 className="font-oswald text-5xl md:text-6xl font-bold uppercase leading-none">
                Наши<br /><span className="text-yellow-400">Услуги</span>
              </h2>
            </div>
            <div className="text-gray-500 text-sm max-w-xs">
              Весь парк техники прошёл техосмотр и страхование. Опытные операторы с допусками.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {services.map((s, i) => (
              <div key={i} className="group bg-[#111] hover:bg-[#161616] border border-white/5 hover:border-yellow-400/30 p-8 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                  <Icon name={s.icon} fallback="Truck" size={22} className="text-yellow-400" />
                </div>
                <h3 className="font-oswald text-xl font-bold uppercase mb-3 group-hover:text-yellow-400 transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-oswald font-bold">{s.price}</span>
                  <Icon name="ArrowRight" size={16} className="text-gray-600 group-hover:text-yellow-400 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-yellow-400 font-oswald uppercase tracking-widest text-sm mb-3">Наши работы</p>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold uppercase leading-none">
              Порт<span className="text-yellow-400">фолио</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.map((p, i) => (
              <div key={i} className="group relative bg-[#111] border border-white/5 hover:border-yellow-400/20 p-8 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 group-hover:bg-yellow-400/10 transition-colors" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
                <div className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-oswald uppercase tracking-widest px-3 py-1 mb-6">{p.tag}</div>
                <h3 className="font-oswald text-xl font-bold uppercase mb-2 group-hover:text-yellow-400 transition-colors">{p.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{p.loc}</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon name="Package" size={14} />
                  <span>{p.tons}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-yellow-400 font-oswald uppercase tracking-widest text-sm mb-3">Что говорят клиенты</p>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold uppercase leading-none">
              От<span className="text-yellow-400">зывы</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/5 p-8 relative">
                <div className="text-yellow-400 font-oswald font-bold absolute top-6 right-8 opacity-20 text-5xl leading-none">"</div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed italic">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={16} className="text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-oswald font-bold text-sm uppercase">{r.name}</div>
                    <div className="text-gray-500 text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-yellow-400 font-oswald uppercase tracking-widest text-sm mb-3">Связаться с нами</p>
              <h2 className="font-oswald text-5xl md:text-6xl font-bold uppercase leading-none mb-8">
                Конта<span className="text-yellow-400">кты</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (999) 123-45-67" },
                  { icon: "Mail", label: "Email", val: "info@manimash.ru" },
                  { icon: "MapPin", label: "Адрес", val: "Москва и Московская область" },
                  { icon: "Clock", label: "Режим работы", val: "Круглосуточно, без выходных" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-400/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name={c.icon} fallback="Info" size={16} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">{c.label}</div>
                      <div className="font-oswald font-bold">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 p-8">
              <h3 className="font-oswald text-2xl font-bold uppercase mb-2">Оставить заявку</h3>
              <p className="text-gray-500 text-sm mb-8">Ответим в течение 15 минут</p>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Ваше имя</label>
                  <input
                    className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-600"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Телефон</label>
                  <input
                    className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-600"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Комментарий</label>
                  <textarea
                    rows={4}
                    className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none placeholder-gray-600"
                    placeholder="Опишите задачу: груз, вес, адрес..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  />
                </div>
                <button className="w-full bg-yellow-400 text-black font-oswald font-bold text-sm px-8 py-4 uppercase tracking-widest hover:bg-yellow-300 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Отправить заявку →
                </button>
                <p className="text-gray-600 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой обработки данных</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-oswald text-lg font-bold tracking-wider">
            <span className="text-yellow-400">МАНИ</span>МАШ
          </div>
          <p className="text-gray-600 text-xs">© 2024 МаниМаш. Аренда манипуляторов по Москве и МО</p>
          <button onClick={() => scrollTo("hero")} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Наверх ↑</button>
        </div>
      </footer>
    </div>
  );
}