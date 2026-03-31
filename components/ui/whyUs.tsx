
/** @format */

"use client";

import { BookOpen, Coffee, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyUs = () => {
    const ACCENT = "#66C2A8";
  const { t } = useTranslation();
    const items = [
        {
      title: t("whyUs.items.qualityTitle"),
      text: t("whyUs.items.qualityText"),
            Icon: ShieldCheck,
        },
        {
      title: t("whyUs.items.varietyTitle"),
      text: t("whyUs.items.varietyText"),
            Icon: BookOpen,
        },
        {
      title: t("whyUs.items.comfortTitle"),
      text: t("whyUs.items.comfortText"),
            Icon: Coffee,
        },
    ] as const;

    return (
        <section className="h-[40vh] relative overflow-hidden bg-[#1F3A34]/90 bg-[url('/images/about.jpg')] bg-cover bg-center bg-no-repeat bg-scroll py-16 md:bg-fixed">
            <div className="pointer-events-none absolute inset-0 bg-black/55" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-black/50" />
            <div className="relative mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:mb-10">
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {t("whyUs.title")}
                    </h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          {t("whyUs.subtitle")}
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(({ title, text, Icon }) => (
                        <div
                            key={title}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f1f1b]/55 p-6 backdrop-blur transition hover:bg-[#0f1f1b]/65"
                        >
                            <div
                                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition"
                                style={{ backgroundColor: `${ACCENT}2A` }}
                                aria-hidden
                            />

                            <div className="relative flex items-start gap-4">
                                <div
                                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-white"
                                    style={{
                                        borderColor: `${ACCENT}40`,
                                        backgroundColor: `${ACCENT}14`,
                                    }}
                                >
                                    <Icon className="h-5 w-5" style={{ color: `${ACCENT}` }} />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-base font-semibold text-white">
                                        {title}
                                    </div>
                                    <div className="mt-1 text-sm leading-relaxed text-white/70">
                                        {text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
