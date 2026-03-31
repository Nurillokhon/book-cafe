/** @format */

"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { DEFAULT_LANG, Lang, persistLang, SUPPORTED_LANGS } from "@/lib/i18n";

const ACCENT = "#66C2A8";

const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  uz: "O‘zbek",
  ru: "Русский",
};

export default function Navbar() {
  const { t } = useTranslation();
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const current = (i18n.language || DEFAULT_LANG).slice(0, 2) as Lang;
    if ((SUPPORTED_LANGS as readonly string[]).includes(current)) {
      setLang(current);
    }
  }, []);

  const onLangChange = async (next: string) => {
    if (!(SUPPORTED_LANGS as readonly string[]).includes(next)) return;
    const l = next as Lang;
    setLang(l);
    await i18n.changeLanguage(l);
    persistLang(l);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07120f]/75 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5"
            style={{ boxShadow: `inset 0 0 0 1px ${ACCENT}33` }}
            aria-hidden
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-white sm:text-base">
              {t("nav.brand")}
            </div>
            <div className="text-xs text-white/55">Coffee · Books · Space</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="lang">
            {t("nav.language")}
          </label>
          <select
            id="lang"
            value={lang}
            onChange={(e) => onLangChange(e.target.value)}
            className="h-10 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white/85 outline-none backdrop-blur transition hover:bg-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10"
          >
            {SUPPORTED_LANGS.map((l) => (
              <option key={l} value={l} className="bg-[#07120f]">
                {LANG_LABEL[l]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

