"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function RSVPForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <section className="py-32 px-6 bg-[#f5ebe0]/30 border-y border-[#e6dace]">
            <div className="max-w-lg mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-5xl font-light text-[#4a3b32] mb-4">LCV</h2>
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#8a3324]">Lütfen 1 Şubat'a kadar bildirin</p>
                </div>

                {success ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <h3 className="font-serif text-2xl text-[#4a3b32] mb-2">Teşekkürler</h3>
                        <p className="font-sans text-sm text-gray-500 tracking-wider">Katılım durumunuz kaydedildi.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                required
                                className="peer w-full bg-transparent border-b border-[#4a3b32]/20 py-3 font-serif text-xl text-[#4a3b32] placeholder-transparent focus:border-[#8a3324] focus:outline-none transition-colors"
                                placeholder="Ad Soyad"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-0 -top-3.5 font-sans text-xs font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#8a3324]"
                            >
                                Ad Soyad
                            </label>
                        </div>

                        <div className="space-y-4">
                            <span className="block font-sans text-xs font-bold uppercase tracking-widest text-gray-400">Katılım Durumu</span>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center w-5 h-5 border border-[#4a3b32]/30 rounded-full transition-colors group-hover:border-[#8a3324]">
                                        <input type="radio" name="attending" value="yes" className="peer appearance-none" required />
                                        <div className="w-2.5 h-2.5 bg-[#8a3324] rounded-full scale-0 transition-transform peer-checked:scale-100" />
                                    </div>
                                    <span className="font-serif text-lg text-[#4a3b32]">Katılıyorum</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center w-5 h-5 border border-[#4a3b32]/30 rounded-full transition-colors group-hover:border-[#8a3324]">
                                        <input type="radio" name="attending" value="no" className="peer appearance-none" />
                                        <div className="w-2.5 h-2.5 bg-[#8a3324] rounded-full scale-0 transition-transform peer-checked:scale-100" />
                                    </div>
                                    <span className="font-serif text-lg text-[#4a3b32]">Maalesef</span>
                                </label>
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                id="guests"
                                className="peer w-full bg-transparent border-b border-[#4a3b32]/20 py-3 font-serif text-xl text-[#4a3b32] focus:border-[#8a3324] focus:outline-none appearance-none rounded-none"
                            >
                                <option value="1">1 Kişi</option>
                                <option value="2">2 Kişi</option>
                                <option value="3">3 Kişi</option>
                                <option value="4">4 Kişi</option>
                            </select>
                            <label
                                htmlFor="guests"
                                className="absolute left-0 -top-3.5 font-sans text-xs font-bold uppercase tracking-widest text-gray-400"
                            >
                                Kişi Sayısı
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#4a3b32] py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#f5ebe0] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : "GÖNDER"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
