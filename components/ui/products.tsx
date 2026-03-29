"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import OrderModal from "@/components/ui/OrderModal";

type Category = "All" | "Coffee" | "Dessert" | "Tea" | "Breakfast";

type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    size: string;
    category: Exclude<Category, "All">;
    imageSrc: string;
};

const ACCENT = "#66C2A8";

const PRODUCTS: Product[] = [
    {
        id: "latte-classic",
        title: "Klassik Latte",
        description:
            "Bug‘da isitilgan sut bilan mayin espresso — muvozanatli, yumshoq va yoqimli.",
        price: 300,
        size: "350 ml",
        category: "Coffee",
        imageSrc: "/images/coffee.webp",
    },
    {
        id: "americano",
        title: "Americano",
        description: "Issiq suv bilan suyultirilgan kuchli espresso — toza va yengil yakun.",
        price: 250,
        size: "350 ml",
        category: "Coffee",
        imageSrc: "/images/coffee.webp",
    },
    {
        id: "cappuccino",
        title: "Cappuccino",
        description: "Espresso, bug‘da isitilgan sut va yengil ko‘pik — klassik kafe ta’mi.",
        price: 280,
        size: "250 ml",
        category: "Coffee",
        imageSrc: "/images/coffee.webp",
    },
    {
        id: "flat-white",
        title: "Flat White",
        description: "Espresso ustida baxmaldek mikroko‘pik — kuchli, kremli, nafis.",
        price: 320,
        size: "250 ml",
        category: "Coffee",
        imageSrc: "/images/coffee.webp",
    },
    {
        id: "mocha",
        title: "Mocha",
        description: "Kakao va sut qo‘shilgan espresso — qahva va desert kayfiyati birga.",
        price: 340,
        size: "350 ml",
        category: "Coffee",
        imageSrc: "/images/coffee.webp",
    },
    {
        id: "cheesecake-ny",
        title: "Nyu-York Cheesecake",
        description: "Kremli, to‘yimli va klassik — sariyog‘li asos bilan.",
        price: 250,
        size: "150 g",
        category: "Dessert",
        imageSrc: "/images/hero.png",
    },
    {
        id: "brownie",
        title: "Qora shokoladli Brauniy",
        description: "Ichkarisi yumshoq, chetlari qarsildoq — kakao ta’mi chuqur.",
        price: 220,
        size: "120 g",
        category: "Dessert",
        imageSrc: "/images/hero.png",
    },
    {
        id: "croissant",
        title: "Sariyog‘li Kruassan",
        description: "Qatlam-qavat, yoqimli hid va oltinrang nozik qobiq.",
        price: 180,
        size: "90 g",
        category: "Breakfast",
        imageSrc: "/images/hero.png",
    },
    {
        id: "matcha-latte",
        title: "Matcha Latte",
        description: "Sut bilan matcha — mayin, yashil va sokin kayfiyat.",
        price: 330,
        size: "350 ml",
        category: "Tea",
        imageSrc: "/images/coffee.webp",
    },
    {
        id: "earl-grey",
        title: "Earl Grey",
        description: "Bergamotli qora choy — sitrus ohanglari, toza va nafis.",
        price: 200,
        size: "400 ml",
        category: "Tea",
        imageSrc: "/images/hero.png",
    },
    {
        id: "chai",
        title: "Ziravorli Choy",
        description: "Qora choy va iliq ziravorlar — bir piyolada rohat.",
        price: 240,
        size: "350 ml",
        category: "Tea",
        imageSrc: "/images/hero.png",
    },
    {
        id: "avocado-toast",
        title: "Avokado Tosti",
        description: "Qarsildoq sourdough, kremli avokado va limonli yengil yakun.",
        price: 360,
        size: "220 g",
        category: "Breakfast",
        imageSrc: "/images/hero.png",
    },
];

const CATEGORY_LABELS: Record<Category, string> = {
    All: "Hammasi",
    Coffee: "Qahva",
    Dessert: "Desert",
    Tea: "Choy",
    Breakfast: "Nonushta",
};

const CATEGORIES: Category[] = ["All", "Coffee", "Dessert", "Tea", "Breakfast"];

function formatPrice(price: number) {
    return `${price} so'm`;
}

export default function Products() {
    const [active, setActive] = useState<Category>("All");
    const [orderOpen, setOrderOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
        undefined,
    );

    const filtered = useMemo(() => {
        if (active === "All") return PRODUCTS;
        return PRODUCTS.filter((p) => p.category === active);
    }, [active]);

    return (
        <section className="relative overflow-hidden bg-[#1F3A34]/90 py-16">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/40" />
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}33` }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}26` }}
            />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            Mahsulotlar
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                            Kayfiyatingizga mos tanlang — qahva klassikalari, desertlar, choy va yengil tamaddilar.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((c) => {
                            const isActive = c === active;
                            return (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setActive(c)}
                                    className={[
                                        "rounded-full px-4 py-2 text-sm font-medium backdrop-blur transition",
                                        "border",
                                        isActive
                                            ? "border-white/20 bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                                            : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white",
                                    ].join(" ")}
                                    style={isActive ? { boxShadow: `0 0 0 1px ${ACCENT}40` } : undefined}
                                >
                                    {CATEGORY_LABELS[c]}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((p, idx) => (
                        <article
                            key={p.id}
                            className="group overflow-hidden rounded-3xl border border-white/10 bg-black/25 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:bg-black/30"
                            style={{
                                animation: "premium-fade-up 800ms cubic-bezier(0.2,0.8,0.2,1) both",
                                animationDelay: `${Math.min(idx * 70, 420)}ms`,
                            }}
                        >
                            <div className="relative aspect-4/3 overflow-hidden">
                                <Image
                                    src={p.imageSrc}
                                    alt={p.title}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-black/0 to-black/60" />
                                <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                                    {CATEGORY_LABELS[p.category]}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg font-semibold tracking-tight text-white">
                                    {p.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    {p.description}
                                </p>

                                <div className="mt-5 flex items-end justify-between">
                                    <div>
                                        <div className="text-2xl font-semibold text-white">
                                            {formatPrice(p.price)}
                                        </div>
                                        <div className="mt-1 text-xs text-white/55">
                                            {p.size}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedProduct(p.title);
                                            setOrderOpen(true);
                                        }}
                                        className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/15 hover:text-white"
                                        style={{ boxShadow: `0 0 0 1px ${ACCENT}33` }}
                                    >
                                        Buyurtma
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <OrderModal
                open={orderOpen}
                onClose={() => setOrderOpen(false)}
                product={selectedProduct}
            />
        </section>
    );
}
