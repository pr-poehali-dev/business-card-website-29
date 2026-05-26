import ServicePageLayout from "./components/ServicePageLayout";
import type { ServicePageData } from "./components/ServicePageLayout";

const data: ServicePageData = {
  slug: "blagoustrojstvo",
  title: "Благо-",
  titleAccent: "устройство",
  subtitle: "Дворы, парки, территории",
  description: "Комплексное благоустройство придомовых территорий, дворов ЖК, парков и общественных пространств. Дорожки, газон, освещение, детские площадки, водоотвод.",
  heroImg: "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/fda1552e-c2b0-44e3-8078-58ab4780dbde.jpg",
  price: "от 900 ₽/м²",
  priceNote: "Стоимость зависит от состава работ и материалов. Выезд замерщика бесплатно.",
  stats: [
    { value: "100+", label: "территорий сдано" },
    { value: "3 года", label: "гарантия" },
    { value: "14 дн", label: "средний срок" },
    { value: "1 бригада", label: "весь цикл работ" },
  ],
  features: [
    { icon: "TreePine", title: "Дорожки и тропинки", desc: "Асфальтовые, тротуарные и грунтовые дорожки с правильным уклоном и водоотводом." },
    { icon: "Sun", title: "Газон и озеленение", desc: "Посев газонной травы, укладка рулонного газона, посадка кустарников и деревьев." },
    { icon: "Zap", title: "Освещение", desc: "Установка фонарных столбов, декоративной подсветки, прокладка кабеля." },
    { icon: "Droplets", title: "Дренаж и ливнёвка", desc: "Система водоотведения: лотки, дождеприёмники, трубы — предотвращаем затопление." },
    { icon: "Play", title: "Детские площадки", desc: "Поставка и монтаж игрового оборудования, безопасное покрытие, ограждение." },
    { icon: "ParkingCircle", title: "Парковочные зоны", desc: "Разметка, бордюры, знаки, заезды — оборудуем парковки в составе благоустройства." },
  ],
  steps: [
    { num: "1", title: "Заявка", desc: "Оставьте заявку — перезвоним за 30 минут" },
    { num: "2", title: "Замер", desc: "Выезд, обмер территории, согласование состава работ" },
    { num: "3", title: "Проект", desc: "Визуализация и смета по каждому виду работ" },
    { num: "4", title: "Работы", desc: "Комплексное выполнение всего объёма" },
    { num: "5", title: "Сдача", desc: "Приёмка с жителями или управляющей компанией" },
  ],
  calc: {
    unit: "м²",
    basePrice: 900,
    options: [
      {
        label: "Площадь территории",
        items: [
          { label: "до 300 м²", value: 200 },
          { label: "300–700 м²", value: 500 },
          { label: "700–1 500 м²", value: 1100 },
          { label: "1 500–3 000 м²", value: 2200 },
          { label: "от 3 000 м²", value: 3500 },
        ],
      },
      {
        label: "Тип территории",
        items: [
          { label: "Двор жилого дома", value: 0 },
          { label: "Двор ЖК / ТСЖ", value: 100 },
          { label: "Парк / общественное пространство", value: 250 },
        ],
      },
      {
        label: "Состав работ",
        items: [
          { label: "Дорожки + газон", value: 0 },
          { label: "+ освещение", value: 200 },
          { label: "+ детская площадка", value: 350 },
          { label: "Полный комплекс", value: 700 },
        ],
      },
    ],
  },
  gallery: [
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/fda1552e-c2b0-44e3-8078-58ab4780dbde.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/60697997-e77f-48b6-b930-a624b85c5791.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/3d31bcda-3dbf-407a-ba91-8dd99e88adf3.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/e75e410b-6a87-4839-8619-65bb65de9546.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/683dc952-4c0a-44d7-99cb-bc437d0fdbb8.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/bf7c5966-3e98-472f-aacf-9cb1179f8628.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/d5a32b9a-29c6-45c3-8958-04922b525713.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/bf49774c-5029-49a2-b40b-d01b9770f1e1.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/b5f6bd73-e0c4-42e1-99be-b9f65f298aad.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/49c3b7fc-0f0a-4e24-bbea-73a13006ac47.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/2a445d86-17ca-4642-b11e-ce34f1c42024.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/f16927c4-5196-4644-8582-f18e795cf449.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/f7dbeec9-4280-4a5b-983f-c47ab8e44f45.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/f355f819-6a25-4449-b050-e9b680498da8.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/8b8a83a6-afa2-4cc1-9950-1d0d315f01c7.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/e262ac4b-a0bd-45c5-9f1c-d9c64aff480f.jpg",
    "https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/files/ba2fccb5-754c-49fe-809c-720bd2103736.jpg",
  ],
  faq: [
    { q: "Что входит в комплексное благоустройство?", a: "Стандартный комплекс: дорожки, газон, освещение, дренаж, детская площадка, парковка. Мы беремся за всё под ключ — один договор, одна бригада, один подрядчик." },
    { q: "Работаете ли с ЖК и управляющими компаниями?", a: "Да, это наш основной профиль. Работаем с УК, ТСЖ, застройщиками и городской администрацией. Опыт работы в рамках программ по благоустройству дворов." },
    { q: "Сколько времени занимает благоустройство двора?", a: "Средний двор ЖК (1 000–2 000 м²) — 14–21 рабочий день. Срок зависит от состава работ, поставки оборудования и погодных условий. Фиксируем сроки в договоре." },
    { q: "Нужно ли согласование проекта?", a: "Для стандартного благоустройства в пределах придомовой территории согласование не требуется. Для работ на городских землях, парках или у дорог — помогаем получить разрешение." },
    { q: "Какая гарантия на благоустройство?", a: "3 года на все виды работ. На детское игровое оборудование — гарантия производителя (обычно 2–5 лет). Все обязательства фиксируются в договоре." },
  ],
};

export default function Blagoustrojstvo() {
  return <ServicePageLayout data={data} />;
}