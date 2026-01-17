"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { grainTexture } from "@/lib/textures";

interface EnvelopeProps {
    onOpen: () => void;
}

export function Envelope({ onOpen }: EnvelopeProps) {
    const [isOpen, setIsOpen] = useState(false);

    // We split the screen into two panels for a "Gate" opening effect
    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        setTimeout(() => {
            onOpen();
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            {/* Background/Underlay (visible as they open) - Warm off-white */}
            <div className="absolute inset-0 bg-[#fdf8f6]" />

            {/* LEFT PANEL */}
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: isOpen ? "-100%" : 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 h-full w-1/2 bg-[#f5ebe0] z-20 flex items-center justify-end border-r border-[#e6dace] shadow-lg"
            >
                <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: grainTexture }}></div>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: isOpen ? "100%" : 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-0 h-full w-1/2 bg-[#f5ebe0] z-20 flex items-center justify-start border-l border-[#e6dace] shadow-lg"
            >
                <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: grainTexture }}></div>
            </motion.div>

            {/* CONTENT LAYER (Centered Seal & Text) - Fades out as gates open */}
            <motion.div
                className="relative z-30 flex flex-col items-center justify-center cursor-pointer group"
                onClick={handleOpen}
                animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 1.05 : 1, pointerEvents: isOpen ? "none" : "auto" }}
                transition={{ duration: 0.8 }}
            >
                {/* Seal */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full bg-[#8a3324] shadow-2xl border-[6px] border-[#7a2e20]"
                >
                    <span className="font-script text-5xl md:text-6xl text-[#e6dace]">CD</span>
                    {/* Wax texture overlay */}
                    <div className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay"
                        style={{ backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent)` }}
                    />
                </motion.div>

                <div className="mt-16 text-center">
                    <h1 className="font-script text-6xl md:text-[7rem] text-[#4a3b32] tracking-wide font-normal leading-tight">
                        Ceren & Deniz Can
                    </h1>
                    <p className="mt-8 font-sans text-xs md:text-xs uppercase tracking-[0.4em] text-[#8a3324] transition-all duration-700 ease-out group-hover:tracking-[0.5em] opacity-80">
                        Davetiyeyi Açmak İçin Dokunun
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
