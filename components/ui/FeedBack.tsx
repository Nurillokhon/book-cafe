
/** @format */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Shadows from "../shadows";

const FeedBack = () => {
    const ACCENT = "#66C2A8";
    const { t } = useTranslation();

    const testimonials = useMemo(() => {
        const items = t("feedback.items", { returnObjects: true }) as Array<{
            name: string;
            role: string;
            text: string;
        }>;
        return Array.isArray(items) ? items : [];
    }, [t]);

    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const t = window.setInterval(() => {
            setIdx((i) => (i + 1) % testimonials.length);
        }, 4500);
        return () => window.clearInterval(t);
    }, [paused, testimonials.length]);

    const active = testimonials[idx]!;

    const next = () => setIdx((i) => (i + 1) % testimonials.length);
    const prev = () =>
        setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="relative overflow-hidden bg-[#1F3A34]/90 py-16">
            <Shadows />

            <div className="relative mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:mb-10">
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {t("feedback.title")}
                    </h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                        {t("feedback.subtitle")}
                    </p>
                </div>

                <div
                    className="relative mx-auto max-w-3xl"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div className="rounded-3xl border border-white/10 bg-[#0f1f1b]/55 p-7 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-9">
                        <div className="flex items-start justify-between gap-4">
                            <div
                                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border"
                                style={{
                                    borderColor: `${ACCENT}40`,
                                    backgroundColor: `${ACCENT}14`,
                                }}
                            >
                                <Quote className="h-5 w-5" style={{ color: ACCENT }} />
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={prev}
                                    aria-label={t("feedback.prev")}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={next}
                                    aria-label={t("feedback.next")}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 min-h-[120px] sm:min-h-[112px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <p className="text-base leading-relaxed text-white/85 sm:text-lg">
                                        “{active.text}”
                                    </p>
                                    <div className="mt-6 flex items-center justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-semibold text-white">
                                                {active.name}
                                            </div>
                                            <div className="text-xs text-white/55">{active.role}</div>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            {testimonials.map((_, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    aria-label={`Fikr ${i + 1}`}
                                                    onClick={() => setIdx(i)}
                                                    className="h-2.5 w-2.5 rounded-full transition"
                                                    style={{
                                                        backgroundColor:
                                                            i === idx ? ACCENT : "rgba(255,255,255,0.22)",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedBack;
