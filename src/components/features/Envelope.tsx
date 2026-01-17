"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EnvelopeProps {
    onOpen: () => void;
}

export function Envelope({ onOpen }: EnvelopeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        // Delay the actual "onOpen" callback to let animations play
        setTimeout(() => {
            onOpen();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-md p-4"
                onClick={handleOpen}
            >
                <div className="relative aspect-[4/3] w-full cursor-pointer perspective-1000 group">
                    {/* Envelope Body */}
                    <div className="absolute inset-0 z-10 flex items-end justify-center rounded-b-lg bg-[#f5ebe0] shadow-2xl overflow-hidden">
                        {/* Text on Envelope */}
                        <div className="mb-12 text-center opacity-80">
                            <p className="font-serif text-2xl font-semibold tracking-widest text-[#4a3b32]">
                                Ceren & Deniz Can
                            </p>
                            <p className="mt-2 text-sm uppercase tracking-widest text-[#8a3324]">
                                Özel Davetiye
                            </p>
                        </div>
                    </div>

                    {/* Top Flap */}
                    <motion.div
                        initial={{ rotateX: 0 }}
                        animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 20 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ transformOrigin: "top" }}
                        className="absolute top-0 left-0 z-20 h-1/2 w-full origin-top rounded-t-lg bg-[#e6dace] shadow-lg backface-hidden"
                    >
                        {/* Wax Seal */}
                        <motion.div
                            animate={{ opacity: isOpen ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-[-24px] left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[#8a3324] shadow-md border-4 border-[#7a2e20]"
                        >
                            <span className="font-serif text-2xl font-bold text-[#e6dace]">CD</span>
                        </motion.div>
                    </motion.div>

                    {/* Inner Content (Invitation Card) - Slides up/out */}
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: isOpen ? -100 : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="absolute inset-x-4 bottom-4 z-0 h-[90%] rounded bg-white shadow-inner flex flex-col items-center justify-center text-center p-6"
                    >
                        <p className="font-serif text-xl italic text-gray-500">Davetlisiniz...</p>
                    </motion.div>

                </div>

                {!isOpen && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="mt-8 text-center font-sans text-white/80 tracking-widest uppercase text-sm"
                    >
                        Açmak için dokunun
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}
