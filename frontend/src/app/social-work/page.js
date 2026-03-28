"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HandHelping, HeartHandshake, X, Phone, User, CheckCircle, MapPin, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";

// Map equipment types to local images
const EQUIPMENT_IMAGES = {
    wheelchair: "/images/wheelchair.png",
    walker: "/images/walker.png",
};

// Hardcoded descriptions since we removed them from DB
const EQUIPMENT_DESC = {
    en: {
        wheelchair: "Comfortable and foldable manual wheelchairs available for community use to ease mobility challenges.",
        walker: "Lightweight, sturdy medical walkers providing essential support and balance for recovery or aging.",
    },
    mr: {
        wheelchair: "गरजूंच्या साहाय्यासाठी आरामदायक आणि फोल्ड करण्यायोग्य मॅन्युअल व्हीलचेअर्स उपलब्ध आहेत.",
        walker: "बरे होण्यासाठी किंवा वाढत्या वयात आवश्यक आधार आणि समतोल प्रदान करणारे हलके, मजबूत मेडिकल वॉकर्स.",
    }
};

// Rotating quotes — Healthcare, disability aid & social service by Indian personalities
const QUOTES = [
    { en: "The true measure of any society can be found in how it treats its most vulnerable members.", mr: "कोणत्याही समाजाचे खरे मोजमाप त्याच्या सर्वात असुरक्षित सदस्यांशी कसे वागतो यावरून होते.", author: "डॉ. बाबासाहेब आंबेडकर" },
    { en: "A helping hand to the disabled is worth more than a thousand prayers.", mr: "दिव्यांगांना दिलेला एक मदतीचा हात हजार प्रार्थनांपेक्षा मौल्यवान आहे.", author: "संत तुकाराम" },
    { en: "To give someone the ability to walk again is to give them back their dignity and freedom.", mr: "एखाद्याला पुन्हा चालण्याची क्षमता देणे म्हणजे त्याचा सन्मान आणि स्वातंत्र्य परत देणे होय.", author: "विनोबा भावे" },
    { en: "The duty of a ruler is to ensure that no subject suffers from illness or disability without aid.", mr: "राज्यकर्त्याचे कर्तव्य आहे की कोणताही प्रजाजन आजारपण किंवा अपंगत्वात मदतीशिवाय राहणार नाही.", author: "छत्रपती शिवाजी महाराज" },
    { en: "True wealth is not measured in money, but in the lives we touch and the smiles we create.", mr: "खरी संपत्ती पैशाने मोजली जात नाही, तर आपण ज्यांच्या आयुष्याला स्पर्श करतो आणि जे हास्य आपण निर्माण करतो त्यात ती मोजली जाते.", author: "बालवीर गणेश मंडळ" },
    { en: "Serving the sick and the helpless is the highest form of worship.", mr: "आजारी आणि असहाय्यांची सेवा ही पूजेचे सर्वोच्च रूप आहे.", author: "स्वामी विवेकानंद" },
    { en: "Education and healthcare are the two wings on which society rises above poverty.", mr: "शिक्षण आणि आरोग्यसेवा हे दोन पंख आहेत ज्यांवर समाज गरिबीच्या वर उठतो.", author: "सावित्रीबाई फुले" },
    { en: "No act of kindness towards the suffering is ever too small.", mr: "दुःखी माणसांप्रती केलेली कोणतीही दयाळूपणाची कृती कधीही लहान नसते.", author: "संत ज्ञानेश्वर" },
    { en: "The strength of a community lies in caring for those who cannot care for themselves.", mr: "समाजाची ताकद ज्यांना स्वतःची काळजी घेता येत नाही त्यांची काळजी घेण्यात आहे.", author: "छत्रपती शाहू महाराज" },
];

export default function SocialWork() {
    const { lang } = useLanguage();
    const [inventory, setInventory] = useState([]);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [bookingModal, setBookingModal] = useState(null);
    const [beneficiaryName, setBeneficiaryName] = useState("");
    const [collectorName, setCollectorName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchInventory();
    }, []);

    // Rotate quotes every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex(prev => (prev + 1) % QUOTES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const fetchInventory = () => {
        fetch(`${API_URL}/api/inventory`, { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setInventory(data);
            }).catch(err => console.error(err));
    };

    const handleBookSubmit = async (e) => {
        e.preventDefault();
        if (!bookingModal || !beneficiaryName.trim() || !collectorName.trim() || !userPhone.trim() || !userAddress.trim()) return;
        setIsBooking(true);

        try {
            const res = await fetch(`${API_URL}/api/inventory/book`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    equipmentId: bookingModal._id,
                    beneficiaryName: beneficiaryName.trim(),
                    collectorName: collectorName.trim(),
                    userPhone: userPhone.trim(),
                    address: userAddress.trim(),
                })
            });
            const data = await res.json();
            if (data.success) {
                setBookingSuccess(true);
                fetchInventory();
                setTimeout(() => {
                    setBookingModal(null);
                    setBookingSuccess(false);
                    setBeneficiaryName("");
                    setCollectorName("");
                    setUserPhone("");
                    setUserAddress("");
                }, 2500);
            } else {
                alert(data.error || "Booking failed. Please try again.");
            }
        } catch (err) {
            alert("Could not connect to server. Please try again later.");
        } finally {
            setIsBooking(false);
        }
    };

    const content = {
        en: {
            tag: "Community Service",
            pageTitle: "Social Work",
            missionTitle: "Our Initiative",
            missionP1: "We believe that true devotion to Bappa is expressed through service to humanity. Recognizing the challenges faced by the elderly, injured, and differently-abled in our community, we have started a modest but meaningful movement to provide essential mobility aids completely free of charge.",
            missionP2: "If you or anyone you know requires a wheelchair or walker for temporary or long-term use, please reach out to us. This is our small step towards ensuring dignity, independence, and a better quality of life for all.",
            equipmentTitle: "Available Equipment",
            units: "Units",
            availableNow: "Available Now",
            outOfStock: "All Booked",
            bookNow: "Book Now",
            bookEquipment: "Book Equipment",
            beneficiary: "Person who needs the equipment",
            collector: "Person who will collect it",
            yourPhone: "Phone Number",
            yourAddress: "Address",
            confirmBooking: "Confirm Booking",
            bookingDone: "Booking Confirmed!",
            bookingDoneMsg: "We will contact you shortly. Thank you!",
            thanksTitle: "Special Thanks & Gratitude",
            thanksDesc: "This noble initiative is the result of generous hearts who stepped forward to make a tangible difference in society.",
            thanksQuote: "We sincerely thank all the donors and unknown contributors who have supported this noble cause. Because of your generous help, someone today has regained the strength to walk again, and someone has reclaimed their lost freedom. Your contribution is not just help—it is a new ray of hope.",
            appreciation: "With heartfelt appreciation,",
            committee: "Balveer Ganesh Mandal Committee",
            ctaPrompt: "Would you like to contribute to this initiative?",
            ctaBtn: "Contact Us to Donate"
        },
        mr: {
            tag: "समाजसेवा",
            pageTitle: "सामाजिक उपक्रम",
            quote: "खरी संपत्ती पैशाने मोजली जात नाही, तर आपण ज्यांच्या आयुष्याला स्पर्श करतो आणि जे हास्य आपण निर्माण करतो त्यात ती मोजली जाते. चला या करुणेच्या वाटेवर एकत्र चालूया, आणि गरजूंना आधार देऊया.",
            missionTitle: "आमचा उपक्रम",
            missionP1: "बाप्पाची खरी भक्ती ही मानवसेवेतून व्यक्त होते यावर आमचा विश्वास आहे. समाजातील वृद्ध, जखमी आणि दिव्यांगांसमोरील आव्हाने ओळखून, त्यांना मोफत अत्यावश्यक गतिशीलता साधने (Mobility Aids) पुरवण्याची एक छोटी परंतु अर्थपूर्ण चळवळ आम्ही सुरू केली आहे.",
            missionP2: "तुम्हाला किंवा तुमच्या ओळखीच्या कोणाला तात्पुरत्या किंवा दीर्घकाळासाठी व्हीलचेअर किंवा वॉकरची आवश्यकता असल्यास, कृपया आमच्याशी संपर्क साधा. सर्वांसाठी सन्मान, स्वातंत्र्य आणि जीवनाचा दर्जा सुधारण्याच्या दिशेने हे आमचे एक छोटे पाऊल आहे.",
            equipmentTitle: "उपलब्ध साधने",
            units: "साधने",
            availableNow: "सध्या उपलब्ध",
            outOfStock: "सर्व बुक झाले",
            bookNow: "बुक करा",
            bookEquipment: "साधन बुक करा",
            beneficiary: "ज्या व्यक्तीला साधनाची गरज आहे",
            collector: "साधन घेण्यासाठी येणारी व्यक्ती",
            yourPhone: "फोन नंबर",
            yourAddress: "पत्ता",
            confirmBooking: "बुकिंग कन्फर्म करा",
            bookingDone: "बुकिंग यशस्वी!",
            bookingDoneMsg: "आम्ही लवकरच तुमच्याशी संपर्क करू. धन्यवाद!",
            thanksTitle: "विशेष आभार आणि कृतज्ञता",
            thanksDesc: "समाजात सकारात्मक बदल घडवून आणण्यासाठी पुढे आलेल्या उदार अंतःकरणांचा हा उदात्त उपक्रम परिणाम आहे.",
            thanksQuote: "या पुण्यकार्याला हातभार लावणाऱ्या सर्व देणगीदारांचे आणि अज्ञात योगदानकर्त्यांचे आम्ही मनःपूर्वक आभार मानतो. तुमच्या उदार सहकार्यामुळे आज कोणाच्या पावलांना पुन्हा चालण्याची ताकद मिळाली आहे, तर कोणाला हरवलेले स्वातंत्र्य परत मिळाले आहे. तुमचे योगदान हे केवळ मदत नसून, आशेचा एक नवा किरण आहे.",
            appreciation: "मनःपूर्वक आभारांसह,",
            committee: "बालवीर गणेश मंडळ समिती",
            ctaPrompt: "तुम्हाला या उपक्रमात हातभार लावायला आवडेल का?",
            ctaBtn: "देणगी देण्यासाठी संपर्क साधा"
        }
    };

    const t = content[lang] || content.en;

    // Helper to get image and description for a given item type
    const getImage = (type) => EQUIPMENT_IMAGES[type?.toLowerCase()] || "/images/wheelchair.png";
    const getDesc = (type) => (EQUIPMENT_DESC[lang] || EQUIPMENT_DESC.en)[type?.toLowerCase()] || "";

    return (
        <div className="min-h-screen bg-[#fff8f0] py-20 px-4 sm:px-6 lg:px-8 pt-28 font-sans">
            {/* Container */}
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fceabb] text-[#be1111] font-bold mb-6 shadow-md border border-[#edb95c]/30"
                    >
                        <HandHelping className="w-5 h-5" />
                        <span>{t.tag}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`text-4xl md:text-5xl font-extrabold text-[#be1111] mb-6 tracking-tight ${lang === 'mr' ? 'font-serif' : ''}`}
                        style={{ textShadow: "1px 1px 2px rgba(190, 17, 17, 0.1)" }}
                    >
                        {t.pageTitle}
                    </motion.h1>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={quoteIndex}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.6 }}
                            className="relative max-w-4xl mx-auto"
                        >
                            <div className="absolute top-0 left-0 text-6xl text-[#be1111]/10 -translate-x-4 -translate-y-4 font-serif">&ldquo;</div>
                            <p className="text-2xl md:text-3xl text-red-950/80 italic font-medium leading-relaxed px-8">
                                {lang === 'mr' ? QUOTES[quoteIndex].mr : QUOTES[quoteIndex].en}
                            </p>
                            <p className="mt-4 text-lg font-bold text-[#be1111]/70 tracking-wide">
                                — {QUOTES[quoteIndex].author}
                            </p>
                            <div className="absolute bottom-0 right-0 text-6xl text-[#be1111]/10 translate-x-4 translate-y-8 font-serif">&rdquo;</div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Quote dot indicators */}
                    <div className="flex justify-center gap-1.5 mt-10">
                        {QUOTES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setQuoteIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === quoteIndex ? 'bg-[#be1111] w-6' : 'bg-[#be1111]/20 w-2 hover:bg-[#be1111]/40'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Description Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl shadow-red-900/5 p-8 md:p-12 mb-16 border border-[#fceabb]/60"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-2/3">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[#be1111]/10 rounded-full border border-[#be1111]/20">
                                    <HeartHandshake className="w-8 h-8 text-[#be1111]" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">{t.missionTitle}</h2>
                            </div>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                {t.missionP1}
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed font-semibold text-red-900/90">
                                {t.missionP2}
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="relative w-full max-w-sm aspect-square bg-gradient-to-br from-[#fceabb]/70 to-[#fff8f0] rounded-full flex items-center justify-center border-[12px] border-white shadow-xl shadow-red-900/10">
                                <HandHelping className="w-32 h-32 text-[#be1111]/60 drop-shadow-sm" />
                                <div className="absolute inset-0 bg-[#be1111]/5 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Equipment Available */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-[#be1111] mb-10 pb-4 relative inline-block left-1/2 -translate-x-1/2">
                        {t.equipmentTitle}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#fceabb] rounded-full"></div>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-16">

                        {inventory.length > 0 ? (
                            inventory.map((item, index) => {
                                const available = item.availableUnits;
                                const total = item.totalUnits;
                                const percentAvailable = total > 0 ? (available / total) * 100 : 0;

                                return (
                                    <motion.div
                                        key={item._id || index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.15 }}
                                        className="bg-white rounded-3xl shadow-xl shadow-red-900/10 overflow-hidden border border-[#fceabb]/50 group hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
                                    >
                                        {/* Image Section */}
                                        <div className="relative h-56 bg-gradient-to-br from-[#fceabb]/40 to-[#fff8f0] overflow-hidden">
                                            <img
                                                src={getImage(item.itemType)}
                                                alt={lang === 'mr' ? item.titleMr : item.titleEn}
                                                className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Status Badge */}
                                            <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${available > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                {available > 0 ? t.availableNow : t.outOfStock}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 md:p-8 flex flex-col flex-grow">
                                            <h3 className="text-2xl font-bold text-[#8b0000] mb-2">
                                                {lang === 'mr' ? item.titleMr : item.titleEn}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-6">
                                                {getDesc(item.itemType)}
                                            </p>

                                            {/* Availability Bar — Movie Ticket Style */}
                                            <div className="mb-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {lang === 'mr' ? 'उपलब्धता' : 'Availability'}
                                                    </span>
                                                    <span className="text-sm font-bold text-[#8b0000]">
                                                        {available} / {total} {t.units}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${percentAvailable}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: 0.3 }}
                                                        className={`h-full rounded-full transition-all ${percentAvailable > 50 ? 'bg-green-500' : percentAvailable > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                    />
                                                </div>
                                                {/* Unit dots */}
                                                <div className="flex gap-2 mt-3 flex-wrap">
                                                    {Array.from({ length: total }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${i < available
                                                                ? 'bg-green-100 border-green-400 text-green-700'
                                                                : 'bg-red-100 border-red-300 text-red-500'
                                                                }`}
                                                        >
                                                            {i < available ? '✓' : '✗'}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Book Now — pushed to bottom */}
                                            <div className="mt-auto pt-4">
                                                <button
                                                    onClick={() => available > 0 && setBookingModal(item)}
                                                    disabled={available <= 0}
                                                    className={`w-full py-3.5 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 shadow-lg ${available > 0
                                                        ? 'bg-gradient-to-r from-[#be1111] to-[#8b0000] text-white hover:shadow-red-900/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
                                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                                        }`}
                                                >
                                                    {available > 0 ? t.bookNow : t.outOfStock}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-red-100 shadow-sm">
                                <p className="text-[#be1111] font-semibold text-lg">{lang === 'mr' ? 'सध्या उपकरणाची माहिती उपलब्ध नाही.' : 'No equipment details available at the moment.'}</p>
                                <p className="text-gray-500 text-sm mt-2">{lang === 'mr' ? 'कृपया काही वेळाने पुन्हा तपासा.' : 'Please check back later.'}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Special Thanks Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-xl shadow-red-900/10 overflow-hidden border border-[#fceabb]/50"
                >
                    <div className="bg-gradient-to-r from-[#fff8f0] to-[#fceabb]/30 py-10 px-8 border-b border-[#fceabb] flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <Heart className="absolute top-4 left-10 w-8 h-8 text-[#be1111]/10 -rotate-12" />
                        <Heart className="absolute bottom-4 right-10 w-12 h-12 text-[#be1111]/10 rotate-12" />
                        <div className="p-4 bg-[#be1111]/10 rounded-full mb-6 border border-[#be1111]/20">
                            <Heart className="w-10 h-10 text-[#be1111] fill-[#be1111]/80" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#be1111] mb-4 drop-shadow-sm">{t.thanksTitle}</h2>
                        <p className="text-lg text-gray-700 max-w-2xl font-medium">{t.thanksDesc}</p>
                    </div>
                    <div className="p-8 md:p-12 bg-white">
                        <div className="inline-block relative z-10 w-full">
                            <p className="text-xl text-gray-800 leading-relaxed italic border-l-4 border-[#be1111] pl-6 text-left max-w-4xl mx-auto">
                                &quot;{t.thanksQuote}&quot;
                            </p>
                        </div>

                        {/* Contributors List */}
                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <h3 className="text-center text-xl font-bold text-[#8b0000] mb-6">
                                {lang === 'mr' ? '🙏 या उपक्रमातील योगदानकर्ते' : '🙏 Contributors to this Initiative'}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                                {/* REPLACE THESE WITH YOUR ACTUAL CONTRIBUTOR NAMES */}
                                {[
                                    "Contributor Name 1",
                                    "Contributor Name 2",
                                    "Contributor Name 3",
                                    "Contributor Name 4",
                                    "Contributor Name 5",
                                    "Contributor Name 6",
                                    "Contributor Name 7",
                                    "Contributor Name 8",
                                ].map((name, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        className="bg-gradient-to-br from-[#fff8f0] to-[#fceabb]/30 border border-[#fceabb]/60 rounded-xl px-4 py-3 text-center group hover:shadow-md hover:border-[#be1111]/30 transition-all duration-300"
                                    >
                                        <span className="text-sm font-semibold text-[#8b0000] group-hover:text-[#be1111] transition-colors">{name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 max-w-lg mx-auto text-center">
                            <p className="font-semibold text-gray-600">{t.appreciation}</p>
                            <p className="text-[#be1111] font-bold mt-1 text-lg">{t.committee}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Call to action */}
                <div className="mt-16 text-center">
                    <p className="text-gray-700 font-medium mb-4">{t.ctaPrompt}</p>
                    <Link href="/contact" className="inline-block bg-[#be1111] text-[#fceabb] px-8 py-3.5 rounded-full font-bold hover:bg-[#8b0000] hover:-translate-y-1 transition-all shadow-lg shadow-red-900/30">
                        {t.ctaBtn}
                    </Link>
                </div>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {bookingModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={(e) => e.target === e.currentTarget && !isBooking && setBookingModal(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            {bookingSuccess ? (
                                /* Success State */
                                <div className="p-8 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 12 }}
                                    >
                                        <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.bookingDone}</h3>
                                    <p className="text-gray-500">{t.bookingDoneMsg}</p>
                                </div>
                            ) : (
                                /* Booking Form */
                                <>
                                    <div className="bg-gradient-to-r from-[#be1111] to-[#8b0000] p-6 text-white relative">
                                        <button
                                            onClick={() => setBookingModal(null)}
                                            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                        <h3 className="text-xl font-bold mb-1">{t.bookEquipment}</h3>
                                        <p className="text-red-100 text-sm">
                                            {lang === 'mr' ? bookingModal.titleMr : bookingModal.titleEn}
                                        </p>
                                    </div>
                                    <form onSubmit={handleBookSubmit} className="p-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1.5">{t.beneficiary}</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={beneficiaryName}
                                                    onChange={e => setBeneficiaryName(e.target.value)}
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-[#be1111] focus:border-transparent focus:bg-white transition-all outline-none"
                                                    placeholder={lang === 'mr' ? 'रुग्णाचे / गरजूचे नाव' : 'Name of the person in need'}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1.5">{t.collector}</label>
                                            <div className="relative">
                                                <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={collectorName}
                                                    onChange={e => setCollectorName(e.target.value)}
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-[#be1111] focus:border-transparent focus:bg-white transition-all outline-none"
                                                    placeholder={lang === 'mr' ? 'घेण्यासाठी येणाऱ्याचे नाव' : 'Name of person who will collect'}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1.5">{t.yourPhone}</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={userPhone}
                                                    onChange={e => setUserPhone(e.target.value)}
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-[#be1111] focus:border-transparent focus:bg-white transition-all outline-none"
                                                    placeholder={lang === 'mr' ? 'मोबाईल नंबर' : 'Enter mobile number'}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1.5">{t.yourAddress}</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <textarea
                                                    required
                                                    rows={2}
                                                    value={userAddress}
                                                    onChange={e => setUserAddress(e.target.value)}
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-[#be1111] focus:border-transparent focus:bg-white transition-all outline-none resize-none"
                                                    placeholder={lang === 'mr' ? 'पूर्ण पत्ता' : 'Enter full address'}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isBooking}
                                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#be1111] to-[#8b0000] text-white font-bold text-lg shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {isBooking ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                                    </svg>
                                                    {lang === 'mr' ? 'प्रक्रिया सुरू...' : 'Processing...'}
                                                </span>
                                            ) : t.confirmBooking}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
