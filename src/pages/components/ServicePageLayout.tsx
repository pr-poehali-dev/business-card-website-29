import { useEffect } from "react";
import { C } from "./constants";
import ServiceHeader from "./ServiceHeader";
import ServiceContent from "./ServiceContent";
import ServiceCalc from "./ServiceCalc";
import ServiceGalleryFaq from "./ServiceGalleryFaq";

interface Stat { label: string; value: string }
interface Feature { icon: string; title: string; desc: string }
interface Step { num: string; title: string; desc: string }
interface CalcOption { label: string; value: number }
interface FaqItem { q: string; a: string }

export interface ServicePageData {
  slug: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  description: string;
  heroImg: string;
  stats: Stat[];
  features: Feature[];
  steps: Step[];
  price: string;
  priceNote: string;
  gallery?: string[];
  faq?: FaqItem[];
  calc?: {
    unit: string;
    basePrice: number;
    options: { label: string; items: CalcOption[] }[];
  };
}

const PAGE_META: Record<string, { title: string; desc: string }> = {
  asfalt:        { title: "Укладка асфальта в Нижнем Новгороде — ООО Фаворит", desc: "Горячий и холодный асфальт для дорог, дворов и парковок в НН. Гарантия 3 года. Звоните: +7 960 169-09-90" },
  yamochny:      { title: "Ямочный ремонт дорог в Нижнем Новгороде — ООО Фаворит", desc: "Заделка выбоин и трещин. Выезд за 24 часа. Горячий асфальт. Звоните: +7 960 169-09-90" },
  angary:        { title: "Строительство ангаров в Нижнем Новгороде — ООО Фаворит", desc: "Металлокаркасные ангары под ключ для производства, склада, сельского хозяйства. От 30 дней. Звоните: +7 960 169-09-90" },
  bruschatka:    { title: "Укладка брусчатки и бордюров в Нижнем Новгороде — ООО Фаворит", desc: "Тротуарная плитка, брусчатка, бордюры для дворов и пешеходных зон. Звоните: +7 960 169-09-90" },
  blagoustrojstvo: { title: "Благоустройство территорий в Нижнем Новгороде — ООО Фаворит", desc: "Комплексное благоустройство дворов, парков, придомовых территорий. Дорожки, газон, озеленение. Звоните: +7 960 169-09-90" },
};

export default function ServicePageLayout({ data }: { data: ServicePageData }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const meta = PAGE_META[data.slug];
    if (meta) {
      document.title = meta.title;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", meta.desc);
    }
    return () => {
      document.title = "Асфальтирование в Нижнем Новгороде — ООО Фаворит";
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", "Укладка асфальта в Нижнем Новгороде и области. Дворы, парковки, дороги, промышленные площадки, ангары. Выезд за 24 часа. Гарантия 3 года. Звоните: +7 960 169-09-90");
    };
  }, [data.slug]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.bg, color: "#fff" }}>
      <ServiceHeader data={data} />
      <ServiceContent data={data} />
      {data.calc && <ServiceCalc calc={data.calc} />}
      <ServiceGalleryFaq data={data} />
    </div>
  );
}