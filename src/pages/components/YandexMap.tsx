import { useEffect, useRef } from "react";

export default function YandexMap() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af599b5fb73bdbcfea11b78c8612fc71493c58efb8712143741b0752e2ed790f7&lang=ru_RU&scroll=true";
    script.charset = "utf-8";
    script.async = true;

    if (ref.current) {
      ref.current.appendChild(script);
    }

    return () => {
      if (ref.current && script.parentNode === ref.current) {
        ref.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
