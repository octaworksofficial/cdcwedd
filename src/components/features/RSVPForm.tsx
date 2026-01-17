"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export function RSVPForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <section className="py-24 px-6 bg-[#f5ebe0]">
            <div className="max-w-md mx-auto rounded-2xl bg-white p-8 md:p-12 shadow-xl">
                <h2 className="mb-2 text-center font-serif text-3xl md:text-4xl text-[#4a3b32]">LCV</h2>
                <p className="mb-8 text-center font-sans text-sm text-gray-500">Lütfen 1 Şubat 2026'ya kadar dönüş yapınız.</p>

                {success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                    >
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check size={32} />
                        </div>
                        <h3 className="mb-2 font-serif text-2xl text-[#4a3b32]">Teşekkürler!</h3>
                        <p className="text-gray-600">Katılım durumunuz bize ulaştı.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="mb-2 block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Ad Soyad</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 font-serif text-[#4a3b32] focus:border-[#8a3324] focus:outline-none focus:ring-1 focus:ring-[#8a3324]"
                                placeholder="İsim ve Soyisim"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Katılım Durumu</label>
                            <div className="flex gap-4">
                                <label className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-3 hover:bg-gray-50 has-[:checked]:border-[#8a3324] has-[:checked]:bg-[#8a3324]/5 has-[:checked]:text-[#8a3324]">
                                    <input type="radio" name="attending" value="yes" className="hidden" required />
                                    <span className="font-sans text-sm font-medium">Katılıyorum</span>
                                </label>
                                <label className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-3 hover:bg-gray-50 has-[:checked]:border-[#8a3324] has-[:checked]:bg-[#8a3324]/5 has-[:checked]:text-[#8a3324]">
                                    <input type="radio" name="attending" value="no" className="hidden" />
                                    <span className="font-sans text-sm font-medium">Katılamıyorum</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="guests" className="mb-2 block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Kişi Sayısı</label>
                            <select
                                id="guests"
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 font-serif text-[#4a3b32] focus:border-[#8a3324] focus:outline-none focus:ring-1 focus:ring-[#8a3324]"
                            >
                                <option value="1">1 Kişi</option>
                                <option value="2">2 Kişi</option>
                                <option value="3">3 Kişi</option>
                                <option value="4">4 Kişi</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-lg bg-[#8a3324] py-4 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#7a2e20] disabled:bg-gray-400"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Gönder"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
