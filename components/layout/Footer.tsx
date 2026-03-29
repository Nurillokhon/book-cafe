import React from "react";
import {
    FaInstagram,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaRegClock,
    FaStar,
} from "react-icons/fa";

const ACCENT = "#66C2A8";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-[#0f1f1b] text-white">
            <div
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}26` }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}1f` }}
            />

            <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <div className="flex items-center gap-3">
                            <div
                                className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5"
                                style={{ boxShadow: `inset 0 0 0 1px ${ACCENT}33` }}
                            />
                            <div>
                                <div className="text-xl font-semibold tracking-tight">
                                    Book Coffee
                                </div>
                                <div className="text-sm text-white/60">
                                    Toshkent, O‘zbekiston
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                            <div className="inline-flex items-center gap-2 text-white/80">
                                <FaStar className="text-[13px]" style={{ color: ACCENT }} />
                                <span className="font-semibold text-white">4.6</span>
                                <span className="text-white/60">(27)</span>
                            </div>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="text-white/70">UZS 100–150K</div>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="text-white/70">Qahvaxona</div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {["Joyida", "Olib ketish", "Yetkazib berish"].map((x) => (
                                <span
                                    key={x}
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75"
                                >
                                    {x}
                                </span>
                            ))}
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75">
                                Ayol tadbirkorlar
                            </span>
                        </div>

                        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65">
                            Kitob o‘qish, ishlash va bir piyola qahva bilan dam olish uchun
                            ideal maskan.
                        </p>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="grid gap-10 sm:grid-cols-1">
                            <div>
                                <div className="text-sm font-semibold tracking-tight text-white">
                                    Aloqa
                                </div>
                                <ul className="mt-4 space-y-4 text-sm text-white/70">
                                    <li className="flex items-start gap-3">
                                        <FaMapMarkerAlt
                                            className="mt-0.5 text-[14px]"
                                            style={{ color: ACCENT }}
                                        />
                                        <div>
                                            ул. Амира Темура 1, 100084, Tashkent,
                                            Uzbekistan
                                            <div className="mt-1 text-xs text-white/55">
                                                Plus-kod: 87JM+JR
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaRegClock
                                            className="text-[14px]"
                                            style={{ color: ACCENT }}
                                        />
                                        <span>Ochiq · 23:00 da yopiladi</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaPhoneAlt
                                            className="text-[14px]"
                                            style={{ color: ACCENT }}
                                        />
                                        <a
                                            href="tel:+998993558080"
                                            className="transition hover:text-white"
                                        >
                                            +998 99 355 80 80
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaInstagram
                                            className="text-[14px]"
                                            style={{ color: ACCENT }}
                                        />
                                        <a
                                            href="https://instagram.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="transition hover:text-white"
                                        >
                                            instagram.com
                                        </a>
                                    </li>
                                </ul>

                                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="text-xs font-semibold text-white/75">
                                        Narxlar diapazoni
                                    </div>
                                    <div className="mt-1 text-sm text-white">
                                        UZS 100,000–150,000{" "}
                                        <span className="text-white/60">
                                            (kishi boshiga)
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs text-white/55">
                                        12 ta foydalanuvchi ma’lumotiga ko‘ra
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 h-px w-full bg-white/10" />

                <div className="mt-6 flex flex-col gap-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        © {new Date().getFullYear()} Book Coffee. Barcha huquqlar himoyalangan.
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <a href="#save" className="transition hover:text-white/80">
                            Saqlash
                        </a>
                        <a href="#share" className="transition hover:text-white/80">
                            Ulashish
                        </a>
                        <a href="#nearby" className="transition hover:text-white/80">
                            Yaqin joylar
                        </a>
                        <a href="#send" className="transition hover:text-white/80">
                            Telefonga yuborish
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
