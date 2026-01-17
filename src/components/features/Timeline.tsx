"use client";

import { motion } from "framer-motion";

const events = [
    {
        time: "19.00",
        title: "Karşılama & Kokteyl",
        desc: "Hoşgeldiniz"
    },
    {
        time: "20.00",
        title: "Nikah Töreni",
        desc: "Evet diyoruz"
    },
    {
        time: "20.30",
        title: "Yemek Servisi",
        desc: "Lezzetli anlar"
    },
    {
        time: "22.30",
        title: "After Party",
        desc: "Eğlence başlasın"
    },
];

export function Timeline() {
    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-xl mx-auto">
                <h2 className="mb-16 text-center font-serif text-3xl md:text-5xl font-light text-[#4a3b32] tracking-wide">
                    Akış
                </h2>

                <div className="relative border-l border-dashed border-[#8a3324]/30 ml-4 md:ml-auto md:border-l-0 md:flex md:flex-col md:items-center space-y-12 md:space-y-16">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 md:pl-0 md:text-center group"
                        >
                            {/* Dot */}
                            <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#fdf8f6] border border-[#8a3324] md:left-1/2 md:-translate-x-1/2 md:top-0" />

                            {/* Line for Desktop Center - only show if not last item */}
                            {index < events.length - 1 && (
                                <div className="hidden md:block absolute left-1/2 top-2.5 w-px border-l border-dashed border-[#8a3324]/30 -translate-x-1/2 h-16 -z-10" />
                            )}

                            <span className="block font-sans text-sm font-bold tracking-[0.2em] text-[#8a3324] mb-2 md:mt-6">{event.time}</span>
                            <h3 className="font-serif text-2xl text-[#4a3b32] mb-1">{event.title}</h3>
                            <p className="font-sans text-xs uppercase tracking-widest text-gray-500 opacity-60">{event.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
