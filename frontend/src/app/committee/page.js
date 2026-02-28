"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { Users, Star, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CommitteePage() {
    const { lang } = useLanguage();
    const [subCommittees, setSubCommittees] = useState([]);
    const [isLoadingSub, setIsLoadingSub] = useState(true);

    const [coreCommittee, setCoreCommittee] = useState(null);
    const [isLoadingCore, setIsLoadingCore] = useState(true);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        // Fetch Sub Committees
        fetch(`${API_URL}/sub-committee`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSubCommittees(data);
                }
                setIsLoadingSub(false);
            })
            .catch(err => {
                console.error("Failed to fetch sub-committees:", err);
                setIsLoadingSub(false);
            });

        // Fetch Core Committee
        fetch(`${API_URL}/api/core-committee`)
            .then(res => res.json())
            .then(data => {
                if (data && data.president) {
                    setCoreCommittee(data);
                }
                setIsLoadingCore(false);
            })
            .catch(err => {
                console.error("Failed to fetch core committee:", err);
                setIsLoadingCore(false);
            });
    }, []);


    const content = {
        en: {
            title: "Our Respected Committee",
            subtitle: "The Dedicated Members of Balveer Ganesh Mandal",
            back: "Back to Home",
            presidentTitle: "President",
            vicePresidentTitle: "Vice President",
            treasurerTitle: "Treasurer",
            secretaryTitle: "Secretary",
            advisoryTitle: "Advisory Board",
            membersTitle: "Working Members",
            subCommitteeTitle: "Sub Committees",
        },
        mr: {
            title: "आमची आदरणीय समिती",
            subtitle: "बालवीर गणेश मंडळाचे समर्पित सदस्य",
            back: "मुख्य पृष्ठावर जा",
            presidentTitle: "अध्यक्ष",
            vicePresidentTitle: "उपाध्यक्ष",
            treasurerTitle: "खजिनदार",
            secretaryTitle: "सचिव",
            advisoryTitle: "सल्लागार मंडळ",
            membersTitle: "कार्यकारी सदस्य",
            subCommitteeTitle: "उपसमित्या",
        }
    };

    const t = content[lang];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-[#fffdfc] font-sans pb-24">
            {/* Header Profile Section */}
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
                            className="text-[#fceabb]/80 text-lg md:text-xl font-medium tracking-wide"
                        >
                            {t.subtitle}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 mt-16 space-y-24 relative">

                {isLoadingCore ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50 space-y-4">
                        <Loader2 className="animate-spin text-[#8b0000]" size={48} />
                        <p className="text-[#8b0000] font-medium">{lang === 'en' ? 'Loading committee members...' : 'समिती सदस्यांची माहिती लोड करत आहे...'}</p>
                    </div>
                ) : coreCommittee ? (
                    <>
                        {/* Top Leadership (President & Vice President Stacked) */}
                        <section className="relative z-10">
                            <div className="flex justify-center flex-wrap gap-12 lg:gap-24">
                                {/* President Cards */}
                                {coreCommittee.president?.map((pres, idx) => (
                                    <motion.div key={`pres-${idx}`} initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col items-center">
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] to-[#be1111] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                                            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#8b0000] shadow-2xl transform group-hover:scale-105 transition-transform duration-500 bg-white">
                                                <img src={pres.img} alt="President" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#4a0808] text-[#fceabb] px-6 py-2 rounded-full shadow-lg border border-[#d4af37]/30 whitespace-nowrap z-20">
                                                <Star size={16} className="inline mr-2 text-[#d4af37]" />
                                                <span className="font-bold tracking-widest uppercase text-xs sm:text-sm">{t.presidentTitle}</span>
                                                <Star size={16} className="inline ml-2 text-[#d4af37]" />
                                            </div>
                                        </div>
                                        <h3 className={`mt-10 font-bold text-[#4a0808] text-center max-w-[200px] md:max-w-[260px] mx-auto leading-snug break-words ${lang === 'en' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                                            {pres.name[lang]}
                                        </h3>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Vice Presidents */}
                            {coreCommittee.vicePresident && coreCommittee.vicePresident.length > 0 && (
                                <div className="flex justify-center flex-wrap gap-12 lg:gap-24 mt-16 pt-8 border-t border-red-900/10">
                                    {coreCommittee.vicePresident.map((vp, idx) => (
                                        <motion.div key={`vp-${idx}`} initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.2 }} className="flex flex-col items-center">
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-[#8b0000] to-[#be1111] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                                                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#be1111] shadow-xl transform group-hover:scale-105 transition-transform duration-500 bg-white">
                                                    <img src={vp.img} alt="Vice President" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#8b0000] text-white px-5 py-1.5 rounded-full shadow-lg border border-red-700/50 whitespace-nowrap z-20">
                                                    <span className="font-bold tracking-wider uppercase text-xs">{t.vicePresidentTitle}</span>
                                                </div>
                                            </div>
                                            <h3 className={`mt-8 font-bold text-[#4a0808] text-center max-w-[200px] md:max-w-[260px] mx-auto leading-snug break-words ${lang === 'en' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                                                {vp.name[lang]}
                                            </h3>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Co-Vice Presidents */}
                            {coreCommittee.coVicePresident && coreCommittee.coVicePresident.length > 0 && (
                                <div className="flex justify-center flex-wrap gap-10 lg:gap-20 mt-16 pt-8 border-t border-red-900/10">
                                    {coreCommittee.coVicePresident.map((covp, idx) => (
                                        <motion.div key={`covp-${idx}`} initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.3 }} className="flex flex-col items-center">
                                            <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-[#e6ddd5] to-[#d4af37] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-lg transform group-hover:scale-105 transition-transform duration-500 bg-white">
                                                    <img src={covp.img} alt="Co-Vice President" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#d4af37] text-[#4a0808] px-5 py-1.5 rounded-full shadow border border-[#be1111]/30 whitespace-nowrap z-20">
                                                    <span className="font-bold tracking-wider uppercase text-xs">{lang === 'en' ? 'Co-Vice President' : 'सह-उपाध्यक्ष'}</span>
                                                </div>
                                            </div>
                                            <h3 className={`mt-8 font-bold text-[#4a0808] text-center max-w-[180px] md:max-w-[240px] mx-auto leading-snug break-words ${lang === 'en' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
                                                {covp.name[lang]}
                                            </h3>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Core Leadership (Secretary, Treasurer) */}
                        {coreCommittee.coreLeaders && coreCommittee.coreLeaders.length > 0 && (
                            <section className="relative z-10 pt-16 mt-16 border-t border-red-900/10">
                                <div className="flex justify-center flex-wrap gap-12 lg:gap-24">
                                    {coreCommittee.coreLeaders.map((leader, i) => (
                                        <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col items-center">
                                            <div className="relative group">
                                                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[#8b0000] shadow-md group-hover:shadow-xl group-hover:border-[#be1111] transition-all duration-300 bg-white">
                                                    <img src={leader.img} alt={leader.role[lang]} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                                </div>
                                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-[#8b0000] px-4 py-1 rounded-full shadow border-b border-[#8b0000] whitespace-nowrap z-20">
                                                    <span className="font-bold tracking-wide uppercase text-[10px] md:text-xs">{leader.role[lang]}</span>
                                                </div>
                                            </div>
                                            <h3 className={`mt-6 font-bold text-[#4a0808] text-center max-w-[180px] md:max-w-[220px] mx-auto leading-snug break-words ${lang === 'en' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                                                {leader.name[lang]}
                                            </h3>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Advisory Board List */}
                        {coreCommittee.advisors && coreCommittee.advisors.length > 0 && (
                            <section className="relative z-10 pt-16 mt-16 bg-[#fff8f0] -mx-6 px-6 py-16 shadow-inner border-y border-[#e6ddd5]">
                                <div className="max-w-4xl mx-auto">
                                    <div className="text-center mb-10">
                                        <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#4a0808] drop-shadow-sm">{t.advisoryTitle}</h2>
                                        <div className="h-0.5 w-16 bg-[#d4af37] mx-auto mt-4 rounded-full" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center text-lg font-medium text-gray-700">
                                        {coreCommittee.advisors.map((advisor, i) => (
                                            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#be1111]/30 hover:text-[#8b0000] transition-all cursor-default relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fceabb]/20 to-transparent group-hover:translate-x-full -translate-x-full transition-transform duration-700" />
                                                <span className={`font-semibold ${lang === 'mr' ? 'text-xl' : ''}`}>{advisor.name[lang]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Working Members List */}
                        {coreCommittee.members && coreCommittee.members.length > 0 && (
                            <section className="relative z-10 pb-16">
                                <div className="max-w-5xl mx-auto">
                                    <div className="text-center mb-12 flex items-center justify-center gap-4">
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#8b0000]/30 hidden md:block" />
                                        <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#8b0000] px-4 flex items-center gap-3">
                                            <Users size={24} className="text-[#d4af37]" /> {t.membersTitle}
                                        </h2>
                                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#8b0000]/30 hidden md:block" />
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center text-base text-gray-800">
                                        {coreCommittee.members.map((member, i) => (
                                            <div key={i} className={`py-3 px-2 rounded hover:bg-red-50 hover:text-[#8b0000] transition-colors border-b border-gray-100 last:border-0 font-medium cursor-default truncate ${lang === 'mr' ? 'text-lg' : ''}`}>
                                                {member.name[lang]}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                ) : null}

                {/* Sub Committees Section */}
                <section className="relative z-10 pt-8 pb-16 border-t border-red-900/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 flex items-center justify-center gap-4">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#8b0000]/30 hidden md:block" />
                            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#8b0000] px-4 flex items-center gap-3">
                                <Users size={24} className="text-[#d4af37]" /> {t.subCommitteeTitle}
                            </h2>
                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#8b0000]/30 hidden md:block" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {isLoadingSub ? (
                                <div className="col-span-3 flex justify-center py-10 opacity-50">
                                    <Loader2 className="animate-spin text-[#8b0000]" size={40} />
                                </div>
                            ) : subCommittees.length > 0 ? (
                                subCommittees.map((sub, i) => (
                                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-[#e6ddd5] hover:shadow-md transition-shadow relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] to-[#be1111] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                        <h3 className="text-xl font-bold text-[#4a0808] mb-4 text-center border-b border-gray-100 pb-3">
                                            {sub.title[lang]}
                                        </h3>
                                        <div className="space-y-3">
                                            {sub.members && sub.members.length > 0 ? (
                                                sub.members.map((member, j) => (
                                                    <div key={j} className={`text-center text-gray-800 font-medium ${lang === 'mr' ? 'text-lg' : 'text-base'}`}>
                                                        {member.name[lang]}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className={`text-center text-gray-500 italic ${lang === 'mr' ? 'text-lg' : 'text-base'}`}>
                                                    {lang === 'en' ? 'To be announced' : 'लवकरच जाहीर केले जातील'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-10 text-gray-500 italic">
                                    {lang === 'en' ? 'Sub-committees will be announced soon.' : 'उपसमित्या लवकरच जाहीर केल्या जातील.'}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
