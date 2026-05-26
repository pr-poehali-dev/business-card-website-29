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

export default function ServicePageLayout({ data }: { data: ServicePageData }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.bg, color: "#fff" }}>
      <ServiceHeader data={data} />
      <ServiceContent data={data} />
      {data.calc && <ServiceCalc calc={data.calc} />}
      <ServiceGalleryFaq data={data} />
    </div>
  );
}
