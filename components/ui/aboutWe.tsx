import { FaCoffee, FaBook, FaGamepad, FaBirthdayCake } from "react-icons/fa";

export const features = [
    {
        id: 1,
        title: "Aromati qahva",
        description:
            "Yaponiya va Italiya dan import qilingan premium donlar. Har bir kubga arxitektura – to'g'ri harorat, vaqt va harakat.",
        icon: FaCoffee,
    },
    {
        id: 2,
        title: "Ko'p tilli kitoblar",
        description:
            "Adabiyot, san'at, dizayn va biznes bo'yicha 5000+ nusxalar. Har bir til va yo'nalish uchun.",
        icon: FaBook,
    },
    {
        id: 3,
        title: "Stol o'yinlari",
        description:
            "Do'stlar bilan o'tkazish uchun strategiya, karra va mantiq o'yinlari to'plami.",
        icon: FaGamepad,
    },
    {
        id: 4,
        title: "Fresh desertlar",
        description:
            "Har kuni tayyorlanadigan xom asal, shirinliklar va nonushta. Faqat yangi va tabiiy mahsulotlar.",
        icon: FaBirthdayCake,
    },
];

const ACCENT = "#66C2A8";

export default function AboutWe() {
    return (
        <section
            className="relative overflow-hidden bg-[#1F3A34]/90 bg-[url('/images/about.jpg')] bg-cover bg-center bg-no-repeat bg-scroll py-16 md:bg-fixed"
        >
            <div className="pointer-events-none absolute inset-0 bg-black/55" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-black/50" />
            <div
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}2b` }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}26` }}
            />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Biz haqimizda
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                        Qahva, kitob va dam olish bir joyda. Biz sizga diqqat jamlash,
                        ilhom olish va do‘stlar bilan yoqimli vaqt o‘tkazish uchun premium
                        muhit yaratdik.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f, idx) => {
                        const Icon = f.icon;
                        return (
                            <article
                                key={f.id}
                                className="group rounded-3xl border border-white/10 bg-[#1F3A34]/50 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:bg-white/10"
                                style={{
                                    animation:
                                        "premium-fade-up 800ms cubic-bezier(0.2,0.8,0.2,1) both",
                                    animationDelay: `${Math.min(idx * 90, 360)}ms`,
                                }}
                            >
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
                                    style={{ boxShadow: `inset 0 0 0 1px ${ACCENT}30` }}
                                >
                                    <Icon className="text-xl text-white/90" />
                                </div>

                                <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
                                    {f.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    {f.description}
                                </p>

                                <div
                                    className="mt-5 h-[2px] w-10 rounded-full bg-white/20 transition group-hover:w-16"
                                    style={{ backgroundColor: `${ACCENT}80` }}
                                />
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
