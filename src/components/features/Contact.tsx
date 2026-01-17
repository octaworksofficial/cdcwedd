"use client";

import { MapPin, Phone } from "lucide-react";

export function Contact() {
    return (
        <section className="py-24 px-6 bg-[#fdf8f6]">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="mb-12 font-serif text-3xl md:text-4xl text-[#4a3b32]">İletişim & Konum</h2>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Info */}
                    <div className="space-y-8 text-left p-6 md:p-8 bg-white shadow-lg rounded-xl">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5ebe0] text-[#8a3324]">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="mb-1 font-serif text-xl font-medium text-[#4a3b32]">Teymur Continental Hotel</h3>
                                <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                                    Mücahitler Mah. Gazimuhtar Paşa Blv 52009, Nolu Cadde No:33, 27060 Şehitkamil/Gaziantep
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5ebe0] text-[#8a3324]">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="mb-1 font-serif text-xl font-medium text-[#4a3b32]">Organizasyon</h3>
                                <p className="text-sm text-gray-600">
                                    Detaylı bilgi için: <a href="tel:+905555555555" className="text-[#8a3324] hover:underline">+90 555 555 55 55</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder or Iframe */}
                    <div className="h-[300px] w-full overflow-hidden rounded-xl bg-gray-200 shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.317671765053!2d37.3653!3d37.0766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e13b8e0e7a2b%3A0x6c5a5e3a8b0b5b0!2sTeymur%20Continental%20Hotel!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Teymur Continental Hotel Map"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
