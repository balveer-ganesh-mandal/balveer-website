"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CreditCard, Building2, Phone, HeartHandshake, QrCode } from "lucide-react";
import Image from "next/image";

export default function DonatePage() {
    const { lang } = useLanguage();

    const content = {
        en: {
            title: "Support Our Mandal",
            subtitle: "Your generous contribution fuels our tradition and social initiatives",
            back: "Back to Home",
            appealTitle: "Why Donate?",
            appealText: "Balveer Ganesh Mandal has been organizing Ganeshotsav and serving the community since 1924. Your donations help us organize the grand Utsav, conduct social work like Annadaan (food distribution), blood donation camps, and support the underprivileged. Every contribution, big or small, makes a significant difference.",
            bankDetailsTitle: "Direct Bank Transfer",
            bankNameLabel: "Bank Name",
            bankName: "State Bank of India",
            accNameLabel: "Account Name",
            accName: "Balveer Ganesh Mandal",
            accNumLabel: "Account Number",
            accNum: "00000000000",
            ifscLabel: "IFSC Code",
            ifsc: "SBIN0000000",
            qrTitle: "Scan & Pay via UPI",
            qrSubtitle: "Pay easily using Google Pay, PhonePe, or Paytm",
            contactText: "For any donation related queries or to collect a physical receipt, please contact us:",
            contactName: "Treasurer Name",
        },
        mr: {
            title: "मंडळाला सहकार्य करा",
            subtitle: "तुमच्या बहुमूल्य योगदानामुळे आमची परंपरा आणि सामाजिक उपक्रम अधिक भक्कम होतात",
            back: "मुख्य पृष्ठावर जा",
            appealTitle: "देणगी का द्यावी?",
            appealText: "बालवीर गणेश मंडळ १९२४ पासून गणेशोत्सव साजरा करत असून समाजाची सेवा करत आहे. तुमची देणगी आम्हाला हा भव्य उत्सव आयोजित करण्यासाठी, अन्नदान, रक्तदान शिबिरांसारखी सामाजिक कार्ये करण्यासाठी आणि गरजू लोकांना मदत करण्यासाठी उपयुक्त ठरते. तुमचे प्रत्येक लहान-मोठे योगदान महत्त्वपूर्ण आहे.",
            bankDetailsTitle: "थेट बँक ट्रान्सफर",
            bankNameLabel: "बँकेचे नाव",
            bankName: "स्टेट बँक ऑफ इंडिया",
            accNameLabel: "खात्याचे नाव",
            accName: "बालवीर गणेश मंडळ",
            accNumLabel: "खाते क्रमांक",
            accNum: "00000000000",
            ifscLabel: "IFSC कोड",
            ifsc: "SBIN0000000",
            qrTitle: "UPI द्वारे स्कॅन करून पे करा",
            qrSubtitle: "Google Pay, PhonePe, किंवा Paytm द्वारे सहज पेमेंट करा",
            contactText: "देणगी संदर्भातील कोणत्याही चौकशीसाठी किंवा प्रत्यक्ष पावती मिळवण्यासाठी कृपया आमच्याशी संपर्क साधा:",
            contactName: "खजिनदाराचे नाव",
        }
    };

    const t = content[lang];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-[#fffdfc] font-sans pb-24">
            {/* Header Section */}
            <section className="bg-[#4a0808] py-16 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#fceabb] hover:text-white transition-colors mb-8 text-sm font-semibold tracking-wide uppercase">
                        <ArrowLeft size={16} /> {t.back}
                    </Link>

                    <div className="text-center space-y-4">
                        <motion.h1
                            initial="hidden" animate="visible" variants={fadeInUp}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-[#fceabb] tracking-wider drop-shadow-md"
                        >
                            {t.title}
                        </motion.h1>
                        <motion.div
                            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1 w-32 bg-[#be1111] mx-auto rounded-full"
                        />
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            className="text-[#fceabb]/80 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto"
                        >
                            {t.subtitle}
                        </motion.p>
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 mt-16 space-y-16 relative z-10">
                {/* Appeal Section */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                    className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-[#e6ddd5] text-center max-w-4xl mx-auto relative overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] to-[#be1111] opacity-50 group-hover:opacity-100 transition-opacity" />
                    <HeartHandshake className="text-[#be1111] w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h2 className="text-2xl md:text-3xl font-bold text-[#4a0808] mb-6 font-serif">{t.appealTitle}</h2>
                    <p className={`text-gray-700 leading-relaxed max-w-3xl mx-auto ${lang === 'mr' ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
                        {t.appealText}
                    </p>
                </motion.div>

                {/* Donation Methods Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-8">

                    {/* Bank Details Card */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col relative"
                    >
                        <div className="absolute -top-6 left-8 bg-[#4a0808] p-4 rounded-xl shadow-lg">
                            <Building2 className="text-[#fceabb] w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#4a0808] mb-8 mt-4 pl-2 font-serif border-b border-gray-100 pb-4">
                            {t.bankDetailsTitle}
                        </h3>

                        <div className="space-y-6 flex-1 text-gray-800">
                            <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-gray-50 rounded-lg hover:bg-red-50/50 transition-colors">
                                <span className="font-semibold text-gray-500 w-40 mb-1 sm:mb-0">{t.bankNameLabel}</span>
                                <span className="font-bold text-lg">{t.bankName}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-gray-50 rounded-lg hover:bg-red-50/50 transition-colors">
                                <span className="font-semibold text-gray-500 w-40 mb-1 sm:mb-0">{t.accNameLabel}</span>
                                <span className="font-bold text-lg">{t.accName}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-gray-50 rounded-lg hover:bg-red-50/50 transition-colors">
                                <span className="font-semibold text-gray-500 w-40 mb-1 sm:mb-0">{t.accNumLabel}</span>
                                <span className="font-bold text-lg font-mono tracking-wider text-[#be1111]">{t.accNum}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-gray-50 rounded-lg hover:bg-red-50/50 transition-colors">
                                <span className="font-semibold text-gray-500 w-40 mb-1 sm:mb-0">{t.ifscLabel}</span>
                                <span className="font-bold text-lg font-mono tracking-wider">{t.ifsc}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* QR Code Section */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-[#4a0808] to-[#be1111] p-8 rounded-2xl shadow-xl border border-red-900 h-full flex flex-col items-center justify-center text-center relative overflow-hidden"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#fceabb] opacity-5 rounded-full blur-2xl" />

                        <div className="relative z-10 w-full flex flex-col items-center">
                            <div className="bg-white/10 p-4 rounded-full mb-6 backdrop-blur-sm shadow-inner border border-white/20">
                                <QrCode className="text-[#fceabb] w-10 h-10" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif drop-shadow-md">
                                {t.qrTitle}
                            </h3>
                            <p className="text-[#fceabb]/90 mb-8 max-w-sm">
                                {t.qrSubtitle}
                            </p>

                            {/* QR Code Placeholder/Image */}
                            <div className="bg-white p-4 rounded-xl shadow-2xl transition-transform hover:scale-105 duration-500">
                                <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-100 flex items-center justify-center border-4 border-gray-50 rounded-lg relative overflow-hidden group">
                                    <QrCode className="text-gray-300 w-24 h-24 absolute" />
                                    {/* Replace this with actual QR Image */}
                                    {/* <Image src="/path-to-your-qr-code.png" alt="UPI QR Code" fill className="object-cover" /> */}
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                        <span className="text-white font-bold text-sm">QR Code<br />Coming Soon</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-3 text-white/80 bg-black/20 px-6 py-2 rounded-full border border-white/10">
                                <CreditCard size={18} className="text-[#fceabb]" />
                                <span className="text-sm font-medium tracking-wide">Accepted Everywhere</span>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Contact Banner */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.6 }}
                    className="bg-[#fff8f0] border-l-4 border-[#d4af37] p-6 md:p-8 rounded-r-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-gray-700 font-medium text-lg">{t.contactText}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow border border-[#e6ddd5] shrink-0 text-gray-800 hover:border-[#be1111] hover:text-[#8b0000] transition-colors cursor-default">
                        <Phone size={20} className="text-[#be1111]" />
                        <span className="font-bold">{t.contactName} - +91 XXXXXXXXXX</span>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
