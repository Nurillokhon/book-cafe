/** @format */

"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { DEFAULT_LANG, Lang, persistLang, SUPPORTED_LANGS } from "@/lib/i18n";
import Image from "next/image";

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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07120f]/92 backdrop-blur supports-backdrop-filter:bg-[#07120f]/80">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="text-sm font-semibold tracking-tight text-white sm:text-base">
          {t("nav.brand")}
        </div>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="lang">
            {t("nav.language")}
          </label>
          <select
            id="lang"
            value={lang}
            onChange={(e) => onLangChange(e.target.value)}
            className="h-10 rounded-full border border-white/10 bg-[#0f1f1b]/70 px-4 text-sm font-semibold text-white/90 outline-none backdrop-blur transition hover:bg-[#0f1f1b]/85 focus:border-white/20 focus:ring-2 focus:ring-white/10"
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

