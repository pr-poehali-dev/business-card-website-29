import { useState, useEffect } from "react";
import { C } from "./components/constants";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ContentSections from "./components/ContentSections";

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

  return (
    <div className="min-h-screen font-montserrat overflow-x-hidden" style={{ background: C.bg, color: "#fff" }}>
      <Header activeNav={activeNav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} go={go} />
      <HeroSection go={go} />
      <ContentSections form={form} setForm={setForm} sent={sent} setSent={setSent} go={go} />
    </div>
  );
}
