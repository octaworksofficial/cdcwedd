"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function RSVPForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [guestCount, setGuestCount] = useState("1");
    const [attending, setAttending] = useState<"yes" | "no" | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!attending) {
            toast.error("Lütfen katılım durumunuzu seçiniz.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    phoneNumber,
                    guestCount: parseInt(guestCount),
                    attending
                })
            });

            if (res.ok) {
                setSuccess(true);
                toast.success("LCV kaydınız başarıyla oluşturuldu. Teşekkürler!");
            } else {
                const data = await res.json();
                throw new Error(data.error || "Bir hata oluştu");
            }
        } catch (error: any) {
            console.error("RSVP submitting error:", error);
            toast.error(error.message || "Kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
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
                        <button
                            onClick={() => setSuccess(false)}
                            className="mt-6 text-sm text-[#8a3324] underline hover:text-[#4a3b32] transition-colors"
                        >
                            Yeni Form Gönder
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
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

                        <div className="relative">
                            <input
                                type="tel"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="peer w-full bg-transparent border-b border-[#4a3b32]/20 py-3 font-serif text-xl text-[#4a3b32] placeholder-transparent focus:border-[#8a3324] focus:outline-none transition-colors"
                                placeholder="Telefon Numarası"
                            />
                            <label
                                htmlFor="phone"
                                className="absolute left-0 -top-3.5 font-sans text-xs font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#8a3324]"
                            >
                                Telefon Numarası
                            </label>
                        </div>

                        <div className="space-y-4">
                            <span className="block font-sans text-xs font-bold uppercase tracking-widest text-gray-400">Katılım Durumu</span>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`relative flex items-center justify-center w-5 h-5 border rounded-full transition-colors ${attending === 'yes' ? 'border-[#8a3324]' : 'border-[#4a3b32]/30 group-hover:border-[#8a3324]'}`}>
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="yes"
                                            checked={attending === "yes"}
                                            onChange={() => setAttending("yes")}
                                            className="hidden"
                                        />
                                        <div className={`w-2.5 h-2.5 bg-[#8a3324] rounded-full transition-transform ${attending === 'yes' ? 'scale-100' : 'scale-0'}`} />
                                    </div>
                                    <span className="font-serif text-lg text-[#4a3b32]">Katılıyorum</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`relative flex items-center justify-center w-5 h-5 border rounded-full transition-colors ${attending === 'no' ? 'border-[#8a3324]' : 'border-[#4a3b32]/30 group-hover:border-[#8a3324]'}`}>
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="no"
                                            checked={attending === "no"}
                                            onChange={() => setAttending("no")}
                                            className="hidden"
                                        />
                                        <div className={`w-2.5 h-2.5 bg-[#8a3324] rounded-full transition-transform ${attending === 'no' ? 'scale-100' : 'scale-0'}`} />
                                    </div>
                                    <span className="font-serif text-lg text-[#4a3b32]">Maalesef</span>
                                </label>
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                id="guests"
                                value={guestCount}
                                onChange={(e) => setGuestCount(e.target.value)}
                                className="peer w-full bg-transparent border-b border-[#4a3b32]/20 py-3 font-serif text-xl text-[#4a3b32] focus:border-[#8a3324] focus:outline-none appearance-none rounded-none cursor-pointer"
                            >
                                <option value="1">1 Kişi</option>
                                <option value="2">2 Kişi</option>
                                <option value="3">3 Kişi</option>
                                <option value="4">4 Kişi</option>
                                <option value="5">5 Kişi</option>
                                <option value="6">6 Kişi</option>
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
                            className="w-full bg-[#4a3b32] py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#f5ebe0] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "GÖNDER"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
