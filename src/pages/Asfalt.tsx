import ServicePageLayout from "./components/ServicePageLayout";
import type { ServicePageData } from "./components/ServicePageLayout";

const data: ServicePageData = {
  slug: "asfalt",
  title: "Асфальти-",
  titleAccent: "рование",
  subtitle: "Дороги, дворы, парковки",
  description: "Укладка горячего и холодного асфальта для дорог, дворовых территорий, парковок и промышленных площадок. Гарантия 3 года. Собственная техника, без посредников.",
  heroImg: "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/63eaa6e7-9174-48c8-a25b-f5b8688465e0.jpg",
  price: "от 1 200 ₽/м²",
  priceNote: "Выезд замерщика — бесплатно. Смета в день обращения. Работаем с НДС.",
  stats: [
    { value: "3 года", label: "гарантия" },
    { value: "15+", label: "единиц техники" },
    { value: "24 ч", label: "выезд на объект" },
    { value: "500+", label: "объектов сдано" },
  ],
  features: [
    { icon: "Layers", title: "Горячий асфальт", desc: "Классическая технология укладки горячей асфальтобетонной смеси. Подходит для дорог, дворов, парковок с интенсивным трафиком." },
    { icon: "Thermometer", title: "Холодный асфальт", desc: "Работы при температуре до −10°C. Ямочный ремонт и небольшие участки — быстро и без простоев." },
    { icon: "Building2", title: "Подготовка основания", desc: "Выемка грунта, устройство щебёночного основания, профилирование и уплотнение перед укладкой." },
    { icon: "ShieldCheck", title: "Гарантия 3 года", desc: "Фиксируем гарантийные обязательства в договоре. При появлении дефектов устраняем за свой счёт." },
    { icon: "Truck", title: "Своя техника", desc: "Асфальтоукладчики Vogele, катки Hamm, самосвалы МАЗ — не арендуем, не зависим от третьих лиц." },
    { icon: "FileText", title: "Полный пакет документов", desc: "Работаем с НДС, ЭДО (Диадок/СБИС), закрывающие документы в день сдачи объекта." },
  ],
  steps: [
    { num: "1", title: "Заявка", desc: "Оставьте заявку — перезвоним за 30 минут" },
    { num: "2", title: "Замер", desc: "Бесплатный выезд, замеры и расчёт стоимости" },
    { num: "3", title: "Договор", desc: "Фиксируем цену и сроки в договоре" },
    { num: "4", title: "Работы", desc: "Выполняем своей техникой и бригадой" },
    { num: "5", title: "Сдача", desc: "Подписываем акт, выдаём гарантийный талон" },
  ],
  calc: {
    unit: "м²",
    basePrice: 1200,
    options: [
      {
        label: "Площадь объекта",
        items: [
          { label: "до 200 м²", value: 150 },
          { label: "200–500 м²", value: 350 },
          { label: "500–1 000 м²", value: 750 },
          { label: "1 000–3 000 м²", value: 2000 },
          { label: "от 3 000 м²", value: 4000 },
        ],
      },
      {
        label: "Тип объекта",
        items: [
          { label: "Двор / парковка", value: 0 },
          { label: "Дорога с разметкой", value: 150 },
          { label: "Промплощадка (тяжёлая нагрузка)", value: 300 },
        ],
      },
      {
        label: "Тип покрытия",
        items: [
          { label: "Мелкозернистый (стандарт)", value: 0 },
          { label: "Крупнозернистый (нижний слой)", value: -100 },
          { label: "Цветной асфальт", value: 400 },
        ],
      },
      {
        label: "Подготовка основания",
        items: [
          { label: "Основание готово", value: 0 },
          { label: "Щебёночная подготовка", value: 300 },
          { label: "Полная (выемка + щебень)", value: 700 },
        ],
      },
    ],
  },
  gallery: [
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/63eaa6e7-9174-48c8-a25b-f5b8688465e0.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/97c634f7-9d08-47e1-b54d-43c004450d83.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/a0db16d8-3ff3-40f8-aa02-71eb417c312e.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/bf7c5966-3e98-472f-aacf-9cb1179f8628.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/743ebb95-8d22-4310-82df-925fc56f822a.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/58857beb-7868-45cc-a054-534e6722a2be.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/3cb4a87a-75d7-48d5-b35d-8c98f534f48e.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/f78516b0-d44e-4cb7-8f78-f2e979bce31e.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/2b5a6c5f-3ac9-4a73-a359-0638bece9f7f.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/30175a44-367c-4846-aa5c-1db198f45b0b.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/83df33c2-ff74-4e72-aa15-5e6ed2578375.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/5bb8578a-df42-4e57-a771-7146f69907d1.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/fc31aa5c-9f01-4ef6-98fc-da094f021214.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/5749fb2b-0f24-457e-94f2-a6ff17911c1c.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/db98b213-ff82-4cfc-8404-2cd28a8ef079.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/210d40db-e5fd-4fbd-9ff4-9fcaf8c8b666.jpg",
  ],
  faq: [
    { q: "Какая минимальная площадь для заказа асфальтирования?", a: "Минимальный заказ — 200 м². При меньшем объёме стоимость рассчитывается индивидуально, но мы стараемся найти решение для каждого клиента." },
    { q: "Сколько времени занимает укладка асфальта?", a: "Стандартная парковка 500–1000 м² — 1–2 рабочих дня. Срок зависит от объёма работ, сложности объекта и необходимости подготовки основания." },
    { q: "При какой температуре можно укладывать асфальт?", a: "Горячий асфальт укладывают при температуре воздуха от +5°C. Холодный асфальт работает до −10°C — применяем его в зимний период для ямочного ремонта." },
    { q: "Включает ли цена подготовку основания?", a: "Базовая цена от 1 200 ₽/м² — это укладка асфальта на готовое основание. Подготовка (выемка грунта, щебёночная подготовка) рассчитывается отдельно и прописывается в смете." },
    { q: "Работаете ли с юридическими лицами и НДС?", a: "Да, работаем с юридическими лицами и ИП. Предоставляем полный пакет документов: договор, КС-2, КС-3, счёт-фактуру. Работаем с ЭДО (Диадок, СБИС)." },
    { q: "Какая гарантия на асфальтирование?", a: "Гарантия — 3 года и фиксируется в договоре. Если в гарантийный период появляются трещины или просадки по нашей вине — устраняем бесплатно." },
  ],
};

export default function Asfalt() {
  return <ServicePageLayout data={data} />;
}