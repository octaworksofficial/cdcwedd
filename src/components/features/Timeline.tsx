"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Music, Utensils, GlassWater } from "lucide-react";

const events = [
    {
        time: "19:00",
        title: "Karşılama & Kokteyl",
        icon: GlassWater,
    },
    {
        time: "20:00",
        title: "Nikah Töreni",
        icon: CheckCircle2,
    },
    {
        time: "20:30",
        title: "Yemek Servisi",
        icon: Utensils,
    },
    {
        time: "22:30",
        title: "After Party",
        icon: Music,
    },
];

export function Timeline() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#8a3324]/20 to-transparent" />

            <div className="relative max-w-2xl mx-auto">
                <h2 className="mb-16 text-center font-serif text-3xl md:text-4xl text-[#4a3b32]">Etkinlik Akışı</h2>

                <div className="space-y-12">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center gap-8 relative"
                        >
                            {/* Dot on line */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#fdf8f6] border-4 border-[#8a3324]" />

                            {/* Left Side (Time on desktop, alternate logic needed for mobile?) 
                   Let's do a centered layout for mobile friendliness where time is on one side or stacked. 
                   Actually, let's keep it simple: Time Left, Title Right for all? 
                   Or alternate. Let's do alternate for desktop, stacked for mobile?
                   Let's stick to a clean standardized list for mobile first.
               */}

                            <div className={`flex-1 text-right ${index % 2 === 0 ? "pr-8" : "order-1 pl-8 text-left"}`}>
                                <span className="font-sans text-xl font-bold text-[#8a3324]">{event.time}</span>
                            </div>

                            <div className={`flex-1 ${index % 2 === 0 ? "pl-8 text-left order-1" : "pr-8 text-right"}`}>
                                <div className="flex items-center gap-3 justify-start sm:justify-start">
                                    {/* For the right side items, justify-start is correct. For left side items (index odd), we need justify-end? */}
                                    {index % 2 !== 0 && <div className="flex-1" />}

                                    <h3 className="font-serif text-xl text-[#4a3b32]">{event.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
