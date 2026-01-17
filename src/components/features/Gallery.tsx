"use client";

import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import Image from "next/image";

// Placeholder images - in a real app these would be assets
const photos = [
    "/placeholder-1.jpg", // We don't have these, so I'll use colored divs if images fail or just rely on alt text for now in dev
    "/placeholder-2.jpg",
    "/placeholder-3.jpg",
    "/placeholder-4.jpg",
];

export function Gallery() {
    return (
        <section className="py-24 px-6 bg-[#fdf8f6]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="mb-4 font-serif text-3xl md:text-4xl text-[#4a3b32]">Anılarımız</h2>
                <p className="mb-12 font-sans text-gray-500 italic">Birlikte biriktirdiğimiz güzel anlar...</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {photos.map((photo, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 shadow-md group"
                        >
                            {/* 
                 For now, since we don't have real images, I'll use Unsplash placeholders 
                 or just a robust fallback. I'll use a solid color with text for the demo 
                 if I can't guarantee external images. 
                 Let's try standard colored backgrounds for the 'new project' without external assets.
               */}
                            <div className="absolute inset-0 flex items-center justify-center bg-[#e6dace] text-[#4a3b32]/50 font-serif">
                                Foto {i + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="rounded-xl border-2 border-dashed border-[#8a3324]/30 bg-[#f5ebe0]/30 p-8 md:p-12"
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8a3324]/10 text-[#8a3324]">
                            <Upload size={32} />
                        </div>
                        <h3 className="font-serif text-2xl text-[#4a3b32]">Fotoğraflarınızı Paylaşın</h3>
                        <p className="max-w-md text-sm text-gray-600">
                            Düğün günümüzden kareleri bizimle paylaşmak için aşağıdaki butona tıklayabilirsiniz.
                        </p>
                        <button
                            className="mt-4 rounded-full bg-[#8a3324] px-8 py-3 font-sans text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
                            onClick={() => alert("Fotoğraf yükleme özelliği yakında aktif olacak!")}
                        >
                            Fotoğraf Yükle
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
