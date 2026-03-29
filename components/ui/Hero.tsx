/** @format */

import Image from "next/image";

export default function Hero() {
    return (
        <section
            className="relative bg-[url('/images/hero.png')] bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
        >
            <div className="pointer-events-none absolute inset-0 bg-black/45" />
            <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 py-16 sm:px-6 md:min-h-screen lg:px-8">
                <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative z-10 w-full max-w-2xl text-center lg:text-left">
                        <div
                            className="absolute -top-2 left-2 h-full w-full blur-[90px] rounded-full"
                            style={{ backgroundColor: "#66C2A833" }}
                        ></div>
                        <div className="space-y-2">
                            <h1 className="flex flex-wrap justify-center gap-x-3 text-4xl font-bold leading-tight text-black sm:text-6xl lg:justify-start lg:text-7xl">
                                <span
                                    className="block hover:translate-x-2 transition duration-300 text-[#66C2A8]/90 "
                                >
                                    Dam ol.
                                </span>
                                <span className="block text-[#66C2A8]/90 hover:translate-x-4 transition duration-300">
                                    Diqqat.
                                </span>
                                <span className="block text-[#66C2A8]/90 bg-clip-text  hover:translate-x-6 transition duration-300">
                                    Zavqlan.
                                </span>
                            </h1>
                        </div>
                        <div className="mt-6 h-[2px] w-24  rounded-full"></div>
                        <h2 className="mx-auto mt-8 max-w-2xl text-base font-bold leading-relaxed tracking-tight text-white sm:text-xl lg:mx-0 lg:text-3xl">
                            Kitob o‘qish, ishlash va bir piyola qahva bilan dam olish uchun ideal maskan.
                            <br />
                        </h2>
                    </div>
                    <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
                        <Image
                            src="/images/coffee.webp"
                            alt="Qahva"
                            width={640}
                            height={420}
                            priority
                            className="h-auto w-full object-contain"
                            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 92vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
