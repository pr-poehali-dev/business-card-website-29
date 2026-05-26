import ServicePageLayout from "./components/ServicePageLayout";
import type { ServicePageData } from "./components/ServicePageLayout";

const data: ServicePageData = {
  slug: "bruschatka",
  title: "Укладка",
  titleAccent: "брусчатки",
  subtitle: "Тротуарная плитка и брусчатка",
  description: "Укладка тротуарной плитки и брусчатки для дворов, пешеходных зон, въездов и общественных пространств. Ровная укладка, точная геометрия, долговечное основание.",
  heroImg: "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/60160284-2ef3-4d77-a8e0-7dc4c429b93d.jpg",
  price: "от 1 400 ₽/м²",
  priceNote: "В стоимость включены материалы, подготовка основания и бордюры. Замер бесплатно.",
  stats: [
    { value: "150+", label: "объектов уложено" },
    { value: "3 года", label: "гарантия" },
    { value: "30+ лет", label: "срок службы" },
    { value: "20+", label: "видов плитки" },
  ],
  features: [
    { icon: "Grid3x3", title: "Гранитная брусчатка", desc: "Натуральный гранит — максимальная прочность и долговечность. Идеально для пешеходных зон и въездов." },
    { icon: "Square", title: "Тротуарная плитка", desc: "Вибропрессованная и вибролитая плитка различных форм и цветов. Укладка на песчано-цементное основание." },
    { icon: "Minus", title: "Бордюры и поребрики", desc: "Установка бордюрного камня по периметру. Фиксация на бетонный раствор — не смещается со временем." },
    { icon: "Droplets", title: "Водоотведение", desc: "Правильные уклоны, водоотводные лотки — вода не застаивается на поверхности." },
    { icon: "Layers", title: "Подготовка основания", desc: "Выемка грунта, геотекстиль, щебень, песок — основание, которое не просядет." },
    { icon: "Palette", title: "Узорная укладка", desc: "Декоративные рисунки, узоры, контрастные вставки — индивидуальный дизайн покрытия." },
  ],
  steps: [
    { num: "1", title: "Заявка", desc: "Оставьте заявку — перезвоним за 30 минут" },
    { num: "2", title: "Замер", desc: "Выезд, обмер, подбор материала и цвета" },
    { num: "3", title: "Смета", desc: "Фиксированная цена с учётом всех работ" },
    { num: "4", title: "Укладка", desc: "Основание → бордюры → плитка → швы" },
    { num: "5", title: "Сдача", desc: "Акт выполненных работ и гарантийный талон" },
  ],
  calc: {
    unit: "м²",
    basePrice: 1400,
    options: [
      {
        label: "Площадь укладки",
        items: [
          { label: "до 50 м²", value: 40 },
          { label: "50–150 м²", value: 100 },
          { label: "150–400 м²", value: 280 },
          { label: "400–800 м²", value: 600 },
          { label: "от 800 м²", value: 1000 },
        ],
      },
      {
        label: "Материал",
        items: [
          { label: "Вибропрессованная плитка", value: 0 },
          { label: "Вибролитая плитка", value: 200 },
          { label: "Гранитная брусчатка", value: 900 },
          { label: "Клинкерная брусчатка", value: 1200 },
        ],
      },
      {
        label: "Узор укладки",
        items: [
          { label: "Прямая / «кирпич»", value: 0 },
          { label: "«Ёлочка» / диагональ", value: 100 },
          { label: "Декоративный узор", value: 350 },
        ],
      },
      {
        label: "Бордюры",
        items: [
          { label: "Без бордюров", value: 0 },
          { label: "Стандартный бордюр", value: 80 },
          { label: "Гранитный бордюр", value: 250 },
        ],
      },
    ],
  },
  gallery: [
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/60160284-2ef3-4d77-a8e0-7dc4c429b93d.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/e19218a0-b8cf-4855-801c-2173fbb7aa49.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/c5df7935-20a0-4dc5-b2a0-2755d185db16.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/cb5d57fd-688d-49bc-bef5-f1e62a78b63c.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/ac75e147-b6f5-4c1d-9759-55e454a9930f.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/fda1552e-c2b0-44e3-8078-58ab4780dbde.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/683dc952-4c0a-44d7-99cb-bc437d0fdbb8.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/f163f97e-9181-4367-b141-7e7b8145c178.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/94452f3e-c5bc-4163-bc01-48125e057eff.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/9d59f14c-913c-491e-910c-faf0d3cd61ea.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/7c4378c7-5066-472c-b629-c3d348692227.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/1dfa06d8-e9e2-40bf-a395-dbc05087cb83.jpg",
  ],
  faq: [
    { q: "Какая плитка лучше — вибропрессованная или вибролитая?", a: "Вибропрессованная прочнее и устойчивее к нагрузкам — подходит для парковок и въездов. Вибролитая красивее, с чёткими гранями — лучше для пешеходных зон. Поможем подобрать под вашу задачу." },
    { q: "Сколько прослужит тротуарная плитка?", a: "При правильной укладке и основании — 25–30 лет. Гранитная брусчатка служит 50+ лет. Главное — качественное основание из щебня и песка, которое мы делаем по технологии." },
    { q: "Можно ли укладывать плитку осенью?", a: "Да, при температуре от +5°C. В мороз работы не ведём — песок и цемент не схватываются должным образом. Оптимальный сезон — с апреля по октябрь." },
    { q: "Входит ли подготовка основания в цену?", a: "Базовая цена от 1 400 ₽/м² включает укладку плитки, песчано-цементное основание и засыпку швов. Выемка грунта и щебёночная подготовка рассчитываются отдельно и прописываются в смете." },
    { q: "Делаете ли вы бордюры и водоотводные лотки?", a: "Да, это стандартная часть работ. Бордюры устанавливаем на бетонный раствор — не «гуляют» со временем. Водоотводные лотки подбираем под нагрузку и объём осадков." },
  ],
};

export default function Bruschatka() {
  return <ServicePageLayout data={data} />;
}