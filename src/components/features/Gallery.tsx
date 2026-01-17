"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
    filename: string;
    url: string;
}

export function Gallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch images on mount
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/images");
            const data = await res.json();
            setImages(data.images || []);
        } catch (error) {
            console.error("Failed to fetch images:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith("image/")) {
            alert("Lütfen sadece resim dosyası yükleyin.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert("Dosya boyutu 5MB'dan küçük olmalıdır.");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                // Refresh list
                await fetchImages();
                alert("Fotoğrafınız başarıyla yüklendi! Teşekkür ederiz.");
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Fotoğraf yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsUploading(false);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <section className="py-24 px-6 bg-[#fdf8f6]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="mb-4 font-serif text-3xl md:text-4xl text-[#4a3b32]">Anılarımız</h2>
                <p className="mb-12 font-sans text-gray-500 italic">Birlikte biriktirdiğimiz güzel anlar...</p>

                {/* Gallery Grid */}
                {isLoading ? (
                    <div className="mb-16 flex justify-center">
                        <Loader2 className="animate-spin text-[#8a3324]" size={32} />
                    </div>
                ) : images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {images.map((img, i) => (
                            <motion.div
                                key={img.filename}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 shadow-md group"
                            >
                                <Image
                                    src={img.url}
                                    alt="Wedding memory"
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="mb-16 p-8 border-2 border-dashed border-[#e6dace] rounded-lg text-[#4a3b32]/60">
                        <p>Henüz fotoğraf yüklenmemiş. İlk fotoğrafı siz yükleyin!</p>
                    </div>
                )}

                {/* Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="rounded-xl border-2 border-dashed border-[#8a3324]/30 bg-[#f5ebe0]/30 p-8 md:p-12"
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8a3324]/10 text-[#8a3324]">
                            {isUploading ? <Loader2 className="animate-spin" size={32} /> : <Upload size={32} />}
                        </div>
                        <h3 className="font-serif text-2xl text-[#4a3b32]">Fotoğraflarınızı Paylaşın</h3>
                        <p className="max-w-md text-sm text-gray-600">
                            Düğün günümüzden kareleri veya bizimle olan anılarınızı buraya yükleyebilirsiniz.
                        </p>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <button
                            className="mt-4 rounded-full bg-[#8a3324] px-8 py-3 font-sans text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                            onClick={handleUploadClick}
                            disabled={isUploading}
                        >
                            {isUploading ? "Yükleniyor..." : "Fotoğraf Yükle"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
