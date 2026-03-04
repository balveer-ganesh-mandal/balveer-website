"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
    const { lang } = useLanguage();

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const getImageUrl = (path) => path?.startsWith('/uploads') ? `${API_URL}${path}` : path;

    const content = {
        en: {
            title: "Past Memories",
            subtitle: "Glimpses of Balveer Ganesh Mandal through the years",
            back: "Back to Home",
            all: "All Years",
            noImages: "No images found for this year."
        },
        mr: {
            title: "मागील आठवणी",
            subtitle: "बालवीर गणेश मंडळाची वर्षानुवर्षांची झलक",
            back: "मुख्य पृष्ठावर जा",
            all: "सर्व वर्षे",
            noImages: "या वर्षासाठी कोणतीही छायाचित्रे आढळली नाहीत."
        }
    };

    const t = content[lang];

    const [images, setImages] = useState([]);
    const [activeYear, setActiveYear] = useState("All");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/gallery`);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setImages(data);
                    }
                } else {
                    console.error('Failed to fetch gallery items, status:', response.status);
                }
            } catch (err) {
                console.error("Failed to fetch gallery", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGallery();
    }, []);

    // Extract unique years from the data
    const years = ["All", ...Array.from(new Set(images.map(img => img.year)))].sort((a, b) => b === "All" ? 1 : b - a);

    const filteredImages = activeYear === "All"
        ? images
        : images.filter(img => img.year === activeYear);

    return (
        <div className="min-h-screen bg-[#fffdfc] font-sans pb-24">
            {/* Header Section */}
            <section className="bg-[#4a0808] py-16 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#fceabb] hover:text-white transition-colors mb-8 text-sm font-semibold tracking-wide uppercase">
                        <ArrowLeft size={16} /> {t.back}
                    </Link>

                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-[#fceabb] tracking-wider drop-shadow-md">
                            {t.title}
                        </h1>
                        <div className="h-1 w-32 bg-[#be1111] mx-auto rounded-full" />
                        <p className="text-[#fceabb]/80 text-lg md:text-xl font-medium tracking-wide">
                            {t.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 mt-16 space-y-12">
                {/* Year Filters */}
                <div className="flex flex-wrap justify-center gap-4">
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year)}
                            className={`px-6 py-2 rounded-full font-bold tracking-wide transition-all ${activeYear === year
                                ? "bg-[#be1111] text-white shadow-lg scale-105"
                                : "bg-white text-[#8b0000] border border-[#8b0000]/20 hover:bg-red-50 hover:border-[#be1111]"
                                }`}
                        >
                            {year === "All" ? t.all : year}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-20 text-gray-500">
                        <div className="w-12 h-12 border-4 border-[#be1111] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-lg font-medium">Loading memories...</p>
                    </div>
                )}

                {/* Animated Image Grid */}
                {!isLoading && (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredImages.map((img) => (
                                <motion.div
                                    key={img.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative aspect-square rounded-xl overflow-hidden shadow-md group border-4 border-white hover:shadow-2xl hover:border-[#fceabb] transition-all cursor-pointer bg-gray-100"
                                >
                                    <img
                                        src={getImageUrl(img.src)}
                                        alt={img.alt[lang]}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                                        <p className="text-[#fceabb] font-bold text-xl drop-shadow-md">{img.year}</p>
                                        <p className="text-white text-md font-medium">{img.alt[lang]}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Empty State */}
                {!isLoading && filteredImages.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">{t.noImages}</p>
                    </div>
                )}
            </main>
        </div>
    );
}
