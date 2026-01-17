"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, X, Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface GalleryImage {
    id: number;
    filename: string;
    url: string;
    uploader: string;
    note: string;
    createdAt: string;
}

export function Gallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Upload Form State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploaderName, setUploaderName] = useState("");
    const [uploadNote, setUploadNote] = useState("");

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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Basic validation
            if (!file.type.startsWith("image/")) {
                toast.error("Lütfen geçerli bir resim dosyası seçin.");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Dosya boyutu 5MB'dan küçük olmalıdır.");
                return;
            }
            setSelectedFile(file);
            setIsUploadModalOpen(true);
        }
    };

    const handleUploadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;
        if (!uploaderName.trim()) {
            toast.error("Lütfen adınızı giriniz.");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", uploaderName);
        formData.append("note", uploadNote);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                await fetchImages();
                toast.success("Fotoğrafınız başarıyla yüklendi! Güzel anılarınız için teşekkürler. ✨");
                closeModal();
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Yükleme sırasında bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsUploading(false);
        }
    };

    const closeModal = () => {
        setIsUploadModalOpen(false);
        setSelectedFile(null);
        setUploaderName("");
        setUploadNote("");
    };

    return (
        <section className="py-24 px-6 bg-[#fdf8f6]">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="mb-4 font-serif text-3xl md:text-4xl text-[#4a3b32]">Anılarımız</h2>
                <p className="mb-12 font-sans text-gray-500 italic">Etkinlikteki fotoğraflarımızı paylaşıyoruz...</p>

                {/* Upload Button Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <label className="cursor-pointer inline-flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-[#8a3324]/30 bg-[#f5ebe0]/30 p-8 md:p-12 transition-colors hover:bg-[#8a3324]/5 hover:border-[#8a3324]/50">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8a3324]/10 text-[#8a3324]">
                            <Plus size={32} />
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-[#4a3b32]">Fotoğraf Paylaş</h3>
                            <p className="max-w-md text-sm text-gray-600 mt-2">
                                Düğünümüzden kareleri buraya tıklayarak yükleyebilirsiniz.
                            </p>
                        </div>
                        <input
                            type="file"
                            onChange={handleFileSelect}
                            accept="image/*"
                            className="hidden"
                        />
                    </label>
                </motion.div>

                {/* Gallery Grid */}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="animate-spin text-[#8a3324]" size={32} />
                    </div>
                ) : images.length > 0 ? (
                    <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {images.map((img, i) => (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="break-inside-avoid relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative aspect-[3/4] w-full">
                                    {/* Using aspect ratio for masonry look if desired, or auto height */}
                                    <Image
                                        src={img.url}
                                        alt={`Uploaded by ${img.uploader}`}
                                        width={500}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left text-white">
                                    <p className="font-serif text-lg">{img.uploader}</p>
                                    {img.note && <p className="text-sm opacity-80 line-clamp-2 italic">"{img.note}"</p>}
                                    <p className="text-xs opacity-60 mt-2">
                                        {new Date(img.createdAt).toLocaleDateString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-[#4a3b32]/60">
                        <p>Henüz fotoğraf yok. İlk paylaşan siz olun!</p>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md bg-[#fdf8f6] rounded-2xl shadow-2xl p-6 relative overflow-hidden"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="font-serif text-2xl text-[#4a3b32] mb-6 text-center">Fotoğraf Detayları</h3>

                            <form onSubmit={handleUploadSubmit} className="space-y-4">
                                {selectedFile && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 mb-4">
                                        <Image
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        İsim Soyisim <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={uploaderName}
                                        onChange={(e) => setUploaderName(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#8a3324] focus:ring-1 focus:ring-[#8a3324] outline-none bg-white"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Notunuz (İsteğe bağlı)
                                    </label>
                                    <textarea
                                        value={uploadNote}
                                        onChange={(e) => setUploadNote(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#8a3324] focus:ring-1 focus:ring-[#8a3324] outline-none bg-white h-24 resize-none"
                                        placeholder="Çiftimize iletmek istediğiniz not..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="w-full bg-[#8a3324] text-white rounded-lg py-3 font-medium hover:bg-[#722a1e] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Yükleniyor...
                                        </>
                                    ) : (
                                        "Paylaş"
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
