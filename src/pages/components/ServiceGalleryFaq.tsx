import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { C, PHONE_HREF } from "./constants";
import { ServicePageData } from "./ServicePageLayout";

export default function ServiceGalleryFaq({ data }: { data: ServicePageData }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* ── ГАЛЕРЕЯ ── */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20 relative overflow-hidden" style={{ background: C.bgDeep }}>
          <div className="max-w-screen-xl mx-auto px-5">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
                style={{ background: "rgba(56,232,255,0.08)", border: "1px solid rgba(56,232,255,0.25)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.cyan }} />
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: C.cyan }}>Наши объекты</span>
              </div>
              <h2 className="font-black text-4xl md:text-5xl uppercase leading-tight">
                Фото <span style={{ color: C.cyan }}>работ</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {data.gallery.map((src, i) => (
                <button key={i} onClick={() => setLightbox(src)}
                  className="relative overflow-hidden rounded-2xl group"
                  style={{ aspectRatio: "4/3", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(10,14,24,0.55)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(56,232,255,0.2)", border: "1px solid rgba(56,232,255,0.5)" }}>
                      <Icon name="ZoomIn" size={18} style={{ color: C.cyan } as React.CSSProperties} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Лайтбокс */}
          {lightbox && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.92)" }}
              onClick={() => setLightbox(null)}>
              <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
                <Icon name="X" size={20} />
              </button>
              <img src={lightbox} alt="" className="max-w-full max-h-[90vh] rounded-2xl object-contain"
                onClick={e => e.stopPropagation()} />
            </div>
          )}
        </section>
      )}

      {/* ── FAQ ── */}
      {data.faq && data.faq.length > 0 && (
        <section className="py-20 relative overflow-hidden" style={{ background: C.bg }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="max-w-screen-xl mx-auto px-5 relative">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
                style={{ background: "rgba(56,232,255,0.08)", border: "1px solid rgba(56,232,255,0.25)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.cyan }} />
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: C.cyan }}>Частые вопросы</span>
              </div>
              <h2 className="font-black text-4xl md:text-5xl uppercase leading-tight">
                Вопросы и <span style={{ color: C.gold }}>ответы</span>
              </h2>
            </div>
            <div className="max-w-3xl space-y-3">
              {data.faq.map((item, i) => (
                <div key={i} className="rounded-2xl overflow-hidden transition-all"
                  style={{ background: "linear-gradient(145deg, #252b3d, #1e2438)", border: `1px solid ${openFaq === i ? "rgba(255,209,64,0.4)" : "rgba(255,255,255,0.08)"}` }}>
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-black text-sm md:text-base leading-snug">{item.q}</span>
                    <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: openFaq === i ? "rgba(255,209,64,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${openFaq === i ? "rgba(255,209,64,0.4)" : "rgba(255,255,255,0.1)"}` }}>
                      <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={15}
                        style={{ color: openFaq === i ? C.gold : C.muted } as React.CSSProperties} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 border-t" style={{ borderColor: "rgba(255,209,64,0.15)" }}>
                      <p className="pt-4 leading-relaxed" style={{ fontSize: 14.5, color: C.subtle }}>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ФОРМА ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: C.bgDeep }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <div className="max-w-xl mx-auto rounded-2xl p-8" style={{ background: "linear-gradient(145deg, #252b3d, #1e2438)", border: `1px solid ${C.borderCyan}` }}>
            {sent ? (
              <div className="py-10 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(34,211,238,0.12)", border: `1px solid ${C.borderCyan}` }}>
                  <Icon name="CheckCircle" size={32} style={{ color: C.cyan } as React.CSSProperties} />
                </div>
                <h3 className="font-black text-xl uppercase">Заявка принята!</h3>
                <p style={{ fontSize: 14.5, color: C.subtle }}>Перезвоним в течение 5 минут в рабочее время</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-8" style={{ background: C.gold }} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>Бесплатный расчёт</span>
                  </div>
                  <h2 className="font-black text-2xl uppercase">Оставить заявку</h2>
                  <p className="mt-2" style={{ fontSize: 14.5, color: C.subtle }}>
                    {data.priceNote}
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { key: "name", ph: "Имя или компания", icon: "User" },
                    { key: "phone", ph: "Телефон +7 (___) ___-__-__", icon: "Phone" },
                  ].map(({ key, ph, icon }) => (
                    <div key={key} className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon name={icon} fallback="Info" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                      </div>
                      <input
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.borderCyan}`, color: "#fff" }}
                        onFocus={e => (e.target.style.borderColor = C.cyan)}
                        onBlur={e => (e.target.style.borderColor = C.borderCyan)}
                        placeholder={ph}
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                      />
                    </div>
                  ))}
                  <div className="relative">
                    <div className="absolute left-3 top-3.5 pointer-events-none">
                      <Icon name="MessageSquare" size={14} style={{ color: C.cyan } as React.CSSProperties} />
                    </div>
                    <textarea rows={3}
                      className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.borderCyan}`, color: "#fff" }}
                      onFocus={e => (e.target.style.borderColor = C.cyan)}
                      onBlur={e => (e.target.style.borderColor = C.borderCyan)}
                      placeholder="Объём работ, адрес объекта, пожелания"
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                    />
                  </div>
                  <button
                    onClick={() => { if (form.name && form.phone) setSent(true); }}
                    className="w-full font-black text-base py-4 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000", boxShadow: "0 4px 20px rgba(240,192,48,0.3)" }}>
                    Получить расчёт →
                  </button>
                  <p className="text-center text-[10px]" style={{ color: "#374151" }}>
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── ПОДВАЛ ── */}
      <footer style={{ background: C.bgDark, borderTop: `1px solid ${C.border}` }}>
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: "10px 20px" }}>
          <div className="max-w-screen-xl mx-auto flex items-center gap-2.5">
            <Icon name="Info" size={14} style={{ color: C.muted, flexShrink: 0 } as React.CSSProperties} />
            <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
              Обращаем ваше внимание, что сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой.
            </p>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-80" style={{ textDecoration: "none" }}>
            <svg width="42" height="47" viewBox="0 0 200 220" style={{ filter: "drop-shadow(0 2px 10px rgba(255,209,64,0.4))", flexShrink: 0 }}>
              <defs>
                <clipPath id="footSpShield">
                  <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z"/>
                </clipPath>
                <linearGradient id="footSpFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="transparent"/>
                  <stop offset="100%" stopColor="rgba(10,14,24,0.7)"/>
                </linearGradient>
              </defs>
              <image
                href="https://cdn.poehali.dev/projects/767a3a56-afb6-4f9c-bffc-569465bff7eb/bucket/c86c5623-6496-4556-91b1-3ddf8e92b89a.jpg"
                x="18" y="6" width="164" height="188"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#footSpShield)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="url(#footSpFade)"/>
              <path d="M100,6 L182,40 L182,118 Q182,166 100,194 Q18,166 18,118 L18,40 Z" fill="none" stroke="#ffd140" strokeWidth="4"/>
            </svg>
            <div className="leading-[1.2] text-left">
              <div className="text-[8px] font-bold uppercase tracking-[0.22em]" style={{ color: C.muted }}>КОМПАНИЯ · ОНЛАЙН</div>
              <div className="font-black text-[14px] tracking-wide" style={{ color: C.gold }}>ООО Фаворит</div>
              <div className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.muted }}>АСФАЛЬТИРОВАНИЕ НН</div>
            </div>
          </Link>
          <p className="text-xs text-center" style={{ color: C.muted }}>
            © 2015–2026 ООО «Фаворит» — аренда манипуляторов в Нижнем Новгороде и области
          </p>
          <div className="flex items-center gap-5">
            <button className="text-xs transition-opacity hover:opacity-80" style={{ color: C.cyan, background: "none", border: "none", cursor: "pointer" }}>
              Политика конфиденциальности
            </button>
            <Link to="/" className="text-xs transition-opacity hover:opacity-70" style={{ color: C.muted }}>
              ← На главную
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
