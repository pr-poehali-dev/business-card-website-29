import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { C, PHONE_HREF } from "./constants";
import { ServicePageData } from "./ServicePageLayout";

type CalcData = NonNullable<ServicePageData["calc"]>;

export default function ServiceCalc({ calc }: { calc: CalcData }) {
  const [calcSelections, setCalcSelections] = useState<number[]>(() =>
    calc.options.map(() => 0)
  );
  const [areaSlider, setAreaSlider] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);
  const [totalAnimating, setTotalAnimating] = useState(false);

  const areaItems = calc.options[0]?.items ?? [];
  const areaIdx = Math.round(areaSlider / 100 * (areaItems.length - 1));

  const calcTotal = (() => {
    const area = areaItems[areaIdx]?.value ?? 0;
    let price = calc.basePrice;
    for (let i = 1; i < calc.options.length; i++) {
      price += calc.options[i]?.items[calcSelections[i]]?.value ?? 0;
    }
    return area * price;
  })();

  useEffect(() => {
    if (calcTotal !== prevTotal) {
      setTotalAnimating(true);
      const t = setTimeout(() => setTotalAnimating(false), 300);
      setPrevTotal(calcTotal);
      return () => clearTimeout(t);
    }
  }, [calcTotal]);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: C.bg }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, rgba(255,209,64,0.06) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom right, rgba(56,232,255,0.04) 0%, transparent 65%)" }} />

      <div className="max-w-screen-xl mx-auto px-5 relative">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5"
            style={{ background: "rgba(255,209,64,0.08)", border: "1px solid rgba(255,209,64,0.28)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.gold }} />
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: C.gold }}>Онлайн-расчёт</span>
          </div>
          <h2 className="font-black text-4xl md:text-5xl uppercase leading-tight">
            Калькулятор <span style={{ color: C.gold }}>стоимости</span>
          </h2>
          <p className="mt-3 text-sm max-w-lg" style={{ color: C.muted }}>Укажите параметры — получите ориентировочную стоимость. Точная цена после выезда замерщика.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Левая часть — параметры */}
          <div className="space-y-8">

            {/* Ползунок площади */}
            <div className="rounded-2xl p-6" style={{ background: "linear-gradient(145deg,#1e2438,#252b3d)", border: "1px solid rgba(255,209,64,0.2)" }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,209,64,0.12)" }}>
                    <Icon name="Maximize2" size={14} style={{ color: C.gold } as React.CSSProperties} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.subtle }}>{calc.options[0]?.label}</span>
                </div>
                <div className="font-black text-base px-3 py-1 rounded-lg" style={{ color: C.gold, background: "rgba(255,209,64,0.1)", border: "1px solid rgba(255,209,64,0.2)" }}>
                  {areaItems[areaIdx]?.label ?? "—"}
                </div>
              </div>

              <div className="relative">
                <div className="relative h-2 rounded-full mb-1" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-150"
                    style={{ width: `${areaSlider}%`, background: `linear-gradient(90deg,${C.goldDark},${C.gold})` }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 transition-all duration-150"
                    style={{ left: `calc(${areaSlider}% - 10px)`, background: C.gold, borderColor: C.goldDark, boxShadow: "0 0 10px rgba(255,209,64,0.5)" }} />
                </div>
                <input type="range" min={0} max={100} step={1}
                  value={areaSlider}
                  onChange={e => setAreaSlider(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  style={{ height: "24px", top: "-11px", margin: 0 }}
                />
              </div>

              <div className="flex justify-between mt-4">
                {areaItems.map((item, ii) => {
                  const pos = areaItems.length > 1 ? ii / (areaItems.length - 1) : 0;
                  const isActive = areaIdx === ii;
                  return (
                    <button key={ii}
                      onClick={() => setAreaSlider(Math.round(pos * 100))}
                      className="flex flex-col items-center gap-1.5 transition-all"
                      style={{ opacity: isActive ? 1 : 0.35 }}>
                      <div className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: isActive ? C.gold : "rgba(255,255,255,0.4)", transform: isActive ? "scale(1.5)" : "scale(1)" }} />
                      <span className="text-[9px] font-bold hidden sm:block leading-tight text-center max-w-[60px]" style={{ color: isActive ? C.gold : C.muted }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Остальные опции — карточки */}
            {calc.options.slice(1).map((opt, oi) => {
              const realOi = oi + 1;
              return (
                <div key={realOi}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 rounded-full" style={{ background: C.gold }} />
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.subtle }}>{opt.label}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {opt.items.map((item, ii) => {
                      const isActive = calcSelections[realOi] === ii;
                      return (
                        <button key={ii}
                          onClick={() => {
                            const next = [...calcSelections];
                            next[realOi] = ii;
                            setCalcSelections(next);
                          }}
                          className="relative text-left px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200"
                          style={isActive
                            ? { background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000", boxShadow: "0 4px 20px rgba(240,192,48,0.25)", transform: "translateY(-1px)" }
                            : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: C.subtle }
                          }>
                          {isActive && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.2)" }}>
                              <Icon name="Check" size={10} />
                            </div>
                          )}
                          <span className="leading-tight block pr-4">{item.label}</span>
                          {item.value > 0 && (
                            <span className="text-[10px] font-semibold mt-0.5 block" style={{ color: isActive ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.25)" }}>
                              +{item.value.toLocaleString("ru-RU")} ₽/{calc.unit}
                            </span>
                          )}
                          {item.value === 0 && (
                            <span className="text-[10px] font-semibold mt-0.5 block" style={{ color: isActive ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.2)" }}>
                              базовая цена
                            </span>
                          )}
                          {item.value < 0 && (
                            <span className="text-[10px] font-semibold mt-0.5 block" style={{ color: isActive ? "rgba(0,0,0,0.5)" : "rgba(74,222,128,0.5)" }}>
                              {item.value.toLocaleString("ru-RU")} ₽/{calc.unit}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Правая часть — итог */}
          <div className="rounded-2xl overflow-hidden sticky top-24" style={{ background: "linear-gradient(160deg,#1a2035,#252b3d)", border: "1px solid rgba(255,209,64,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: C.muted }}>Ориентировочная стоимость</div>
              <div className="transition-all duration-300" style={{ transform: totalAnimating ? "scale(1.05)" : "scale(1)" }}>
                <div className="font-black leading-none" style={{ fontSize: "clamp(2.2rem,6vw,3.2rem)", color: totalAnimating ? "#fff" : C.gold, transition: "color 0.3s" }}>
                  {calcTotal > 0 ? calcTotal.toLocaleString("ru-RU") + " ₽" : "—"}
                </div>
              </div>
              <div className="text-xs mt-2" style={{ color: C.muted }}>
                {areaItems[areaIdx]?.value ?? 0} {calc.unit} ×{" "}
                {(() => {
                  let p = calc.basePrice;
                  for (let i = 1; i < calc.options.length; i++) {
                    p += calc.options[i]?.items[calcSelections[i]]?.value ?? 0;
                  }
                  return p.toLocaleString("ru-RU");
                })()} ₽/{calc.unit}
              </div>
            </div>

            <div className="px-6 py-4 space-y-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: C.muted }}>Ваши параметры</div>
              <div className="flex items-start gap-2 text-xs" style={{ color: C.subtle }}>
                <Icon name="Maximize2" size={12} style={{ color: C.gold, marginTop: 1, flexShrink: 0 } as React.CSSProperties} />
                <span>{calc.options[0]?.label}: <span style={{ color: "#fff" }}>{areaItems[areaIdx]?.label ?? "—"}</span></span>
              </div>
              {calc.options.slice(1).map((opt, oi) => (
                <div key={oi} className="flex items-start gap-2 text-xs" style={{ color: C.subtle }}>
                  <Icon name="ChevronRight" size={12} style={{ color: C.gold, marginTop: 1, flexShrink: 0 } as React.CSSProperties} />
                  <span>{opt.label}: <span style={{ color: "#fff" }}>{opt.items[calcSelections[oi + 1]]?.label}</span></span>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 space-y-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {[
                { icon: "MapPin", text: "Бесплатный выезд замерщика" },
                { icon: "FileText", text: "Смета в день обращения" },
                { icon: "ShieldCheck", text: "Фиксированная цена в договоре" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs" style={{ color: C.subtle }}>
                  <Icon name={icon as "MapPin"} size={13} style={{ color: C.gold, flexShrink: 0 } as React.CSSProperties} />
                  {text}
                </div>
              ))}
            </div>

            <div className="p-4">
              <a href={PHONE_HREF}
                className="flex items-center justify-center gap-2 font-black text-sm py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, color: "#000", boxShadow: "0 8px 24px rgba(240,192,48,0.3)" }}>
                <Icon name="Phone" size={15} />
                Уточнить точную цену
              </a>
              <p className="text-center text-[10px] mt-2" style={{ color: C.muted }}>Перезвоним за 30 минут</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
