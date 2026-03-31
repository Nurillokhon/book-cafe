/** @format */

"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { getInitialLang, persistLang } from "@/lib/i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lang = getInitialLang();
    i18n.changeLanguage(lang);
    persistLang(lang);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

