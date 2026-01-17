"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, X, Plus, Download, Calendar, User, MessageCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import heic2any from "heic2any";

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
    const [isProcessing, setIsProcessing] = useState(false);

    // Upload Form State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploaderName, setUploaderName] = useState("");
    const [uploadNote, setUploadNote] = useState("");

    // Detail Modal State
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // HEIC Support
            if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
                setIsProcessing(true);
                toast.info("HEIC formatı dönüştürülüyor, lütfen bekleyin...");
                try {
                    const convertedBlob = await heic2any({
                        blob: file,
                        toType: "image/jpeg",
                        quality: 0.8
                    });

                    const convertedFile = new File(
                        [Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
                        file.name.replace(/\.heic$/i, ".jpg"),
                        { type: "image/jpeg" }
                    );

                    setSelectedFile(convertedFile);
                    setIsUploadModalOpen(true);
                } catch (error) {
                    console.error("HEIC conversion error:", error);
                    toast.error("Format dönüştürme başarısız oldu. Lütfen JPG veya PNG deneyin.");
                } finally {
                    setIsProcessing(false);
                }
                return;
            }

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
                const errorData = await res.json();
                throw new Error(errorData.error || "Upload failed");
            }
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(`Yükleme hatası: ${error.message || "Bir hata oluştu"}`);
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

    const downloadImage = async (img: GalleryImage) => {
        try {
            const response = await fetch(img.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `ceren-deniz-wedding-${img.id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("İndirme başlatılamadı.");
        }
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
                    <label className={`cursor-pointer inline-flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-[#8a3324]/30 bg-[#f5ebe0]/30 p-8 md:p-12 transition-colors hover:bg-[#8a3324]/5 hover:border-[#8a3324]/50 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8a3324]/10 text-[#8a3324]">
                            {isProcessing ? <Loader2 className="animate-spin" size={32} /> : <Plus size={32} />}
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-[#4a3b32]">
                                {isProcessing ? "Fotoğraf İşleniyor..." : "Fotoğraf Paylaş"}
                            </h3>
                            <p className="max-w-md text-sm text-gray-600 mt-2">
                                Düğünümüzden kareleri buraya tıklayarak yükleyebilirsiniz.
                            </p>
                        </div>
                        <input
                            type="file"
                            onChange={handleFileSelect}
                            accept="image/*,.heic"
                            className="hidden"
                            disabled={isProcessing}
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
                                onClick={() => setSelectedImage(img)}
                                className="break-inside-avoid relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
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
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                                    <span className="flex items-center gap-2 font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                                        <Upload size={16} />
                                        İncele
                                    </span>
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md bg-[#fdf8f6] rounded-2xl shadow-2xl p-6 relative overflow-hidden"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="font-serif text-2xl text-[#4a3b32] mb-6 text-center">Fotoğraf Detayları</h3>

                            <form onSubmit={handleUploadSubmit} className="space-y-4">
                                {selectedFile && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 mb-4 shadow-inner">
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
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#8a3324] focus:ring-1 focus:ring-[#8a3324] outline-none bg-white transition-all"
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
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#8a3324] focus:ring-1 focus:ring-[#8a3324] outline-none bg-white h-24 resize-none transition-all"
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

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image Section */}
                            <div className="relative w-full md:w-2/3 h-[50vh] md:h-auto bg-black flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={selectedImage.url}
                                        alt={`Uploaded by ${selectedImage.uploader}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col bg-[#fdf8f6]">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="font-serif text-2xl text-[#4a3b32]">Detaylar</h3>
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-6 flex-1 overflow-y-auto">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 p-2 bg-[#8a3324]/10 rounded-full text-[#8a3324]">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-500">Paylaşan</p>
                                            <p className="font-medium text-lg text-[#4a3b32]">{selectedImage.uploader}</p>
                                        </div>
                                    </div>

                                    {selectedImage.note && (
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 p-2 bg-[#8a3324]/10 rounded-full text-[#8a3324]">
                                                <MessageCircle size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-wider text-gray-500">Not</p>
                                                <p className="text-gray-700 italic">"{selectedImage.note}"</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 p-2 bg-[#8a3324]/10 rounded-full text-[#8a3324]">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-500">Tarih</p>
                                            <p className="text-gray-700">
                                                {new Date(selectedImage.createdAt).toLocaleDateString('tr-TR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => downloadImage(selectedImage)}
                                        className="w-full flex items-center justify-center gap-2 bg-[#8a3324] text-white py-3 rounded-lg hover:bg-[#722a1e] transition-colors"
                                    >
                                        <Download size={20} />
                                        Fotoğrafı İndir
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
