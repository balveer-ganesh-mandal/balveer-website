"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Heart, HandHelping, HeartHandshake, Accessibility, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function SocialWork() {
  const { lang } = useLanguage();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      fetch(`${API_URL}/api/inventory`, { cache: "no-store" })
          .then(res => res.json())
          .then(data => {
              if (Array.isArray(data)) setInventory(data);
          }).catch(err => console.error(err));
  }, []);

  const content = {
    en: {
      tag: "Community Service",
      pageTitle: "Social Work",
      quote: "True wealth is not measured in money, but in the lives we touch and the smiles we create. Let's walk this path of compassion together, lifting those who need it most.",
      missionTitle: "Our Initiative",
      missionP1: "We believe that true devotion to Bappa is expressed through service to humanity. Recognizing the challenges faced by the elderly, injured, and differently-abled in our community, we have started a modest but meaningful movement to provide essential mobility aids completely free of charge.",
      missionP2: "If you or anyone you know requires a wheelchair or walker for temporary or long-term use, please reach out to us. This is our small step towards ensuring dignity, independence, and a better quality of life for all.",
      equipmentTitle: "Available Equipment",
      wheelchairTitle: "Wheelchairs",
      wheelchairDesc: "Comfortable and foldable manual wheelchairs available for community use to ease mobility challenges.",
      units: "Units",
      availableNow: "Available Now",
      walkerTitle: "Medical Walkers",
      walkerDesc: "Lightweight, sturdy medical walkers providing essential support and balance for recovery or aging.",
      thanksTitle: "Special Thanks & Gratitude",
      thanksDesc: "This noble initiative is the result of generous hearts who stepped forward to make a tangible difference in society.",
      thanksQuote: "We extend our deepest and most heartfelt gratitude to all the donors and unsung heroes who contributed to this cause. Because of your kindness, someone will move freely today; someone will rediscover their independence. Your contribution is a beacon of hope.",
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
      wheelchairTitle: "व्हीलचेअर्स",
      wheelchairDesc: "गरजूंच्या साहाय्यासाठी आरामदायक आणि फोल्ड करण्यायोग्य मॅन्युअल व्हीलचेअर्स उपलब्ध आहेत.",
      units: "साधने",
      availableNow: "सध्या उपलब्ध",
      walkerTitle: "मेडिकल वॉकर",
      walkerDesc: "बरे होण्यासाठी किंवा वाढत्या वयात आवश्यक आधार आणि समतोल प्रदान करणारे हलके, मजबूत मेडिकल वॉकर्स.",
      thanksTitle: "विशेष आभार आणि कृतज्ञता",
      thanksDesc: "समाजात सकारात्मक बदल घडवून आणण्यासाठी पुढे आलेल्या उदार अंतःकरणांचा हा उदात्त उपक्रम परिणाम आहे.",
      thanksQuote: "या कार्यासाठी योगदान देणार्‍या सर्व देणगीदारांचे आणि अज्ञात नायकांचे आम्ही मनापासून आभार मानतो. तुमच्या दयाळूपणामुळे, आज कोणीतरी मुक्तपणे चालू शकेल; कोणीतरी त्यांचे स्वातंत्र्य पुन्हा मिळवेल. तुमचे योगदान ही आशेचा किरण आहे.",
      appreciation: "मनःपूर्वक आभारांसह,",
      committee: "बालवीर गणेश मंडळ समिती",
      ctaPrompt: "तुम्हाला या उपक्रमात हातभार लावायला आवडेल का?",
      ctaBtn: "देणगी देण्यासाठी संपर्क साधा"
    }
  };

  const t = content[lang] || content.en;

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
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="relative max-w-4xl mx-auto"
          >
            <div className="absolute top-0 left-0 text-6xl text-[#be1111]/10 -translate-x-4 -translate-y-4 font-serif">"</div>
            <p className="text-2xl md:text-3xl text-red-950/80 italic font-medium leading-relaxed px-8">
              {t.quote}
            </p>
            <div className="absolute bottom-0 right-0 text-6xl text-[#be1111]/10 translate-x-4 translate-y-8 font-serif">"</div>
          </motion.div>
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
            
            {/* Dynamic Inventory */}
            {inventory.length > 0 ? (
                inventory.map((item, index) => (
                    <motion.div
                        key={item._id || index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-[#be1111] to-[#8b0000]' : 'from-[#9b1515] to-[#5a0000]'} rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col`}
                    >
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-700 -translate-y-1/2 translate-x-1/4">
                            <Activity className="w-96 h-96 text-[#fceabb]" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-3xl font-bold tracking-wide">{lang === 'mr' ? item.titleMr : item.titleEn}</h3>
                                    <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
                                        <Activity className="w-6 h-6 text-[#fceabb]" />
                                    </div>
                                </div>
                                <p className="text-red-100 text-lg max-w-[90%] leading-snug mb-6">{lang === 'mr' ? item.descriptionMr : item.descriptionEn}</p>
                                
                                {item.imageUrl && (
                                    <div className="w-full h-48 rounded-2xl overflow-hidden shadow-inner border border-white/20 mb-6 bg-white/5 flex items-center justify-center relative group-hover:shadow-red-900/40 transition-shadow">
                                        <img src={`http://localhost:5001${item.imageUrl}`} alt={item.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-end justify-between mt-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black tracking-tighter shadow-sm text-transparent bg-clip-text bg-gradient-to-b from-white to-[#fceabb]">{item.availableUnits}</span>
                                    <span className="text-xl font-medium text-red-200">{t.units}</span>
                                </div>
                                <span className={`px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-black/20 uppercase tracking-wider ${item.availableUnits > 0 ? 'bg-[#fceabb] text-[#8b0000]' : 'bg-red-200 border border-white/30 text-red-900 shadow-none'}`}>
                                    {item.availableUnits > 0 ? t.availableNow : (lang === 'mr' ? 'सध्या उपलब्ध नाही' : 'Not Available')}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))
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
             {/* Decorative hearts */}
             <Heart className="absolute top-4 left-10 w-8 h-8 text-[#be1111]/10 -rotate-12" />
             <Heart className="absolute bottom-4 right-10 w-12 h-12 text-[#be1111]/10 rotate-12" />
             
             <div className="p-4 bg-[#be1111]/10 rounded-full mb-6 border border-[#be1111]/20">
                <Heart className="w-10 h-10 text-[#be1111] fill-[#be1111]/80" />
             </div>
             <h2 className="text-3xl font-bold text-[#be1111] mb-4 drop-shadow-sm">{t.thanksTitle}</h2>
             <p className="text-lg text-gray-700 max-w-2xl font-medium">{t.thanksDesc}</p>
          </div>
          <div className="p-8 md:p-12 text-center bg-white relative">
             <div className="inline-block relative z-10">
                 <p className="text-xl text-gray-800 leading-relaxed italic border-l-4 border-[#be1111] pl-6 text-left max-w-4xl mx-auto">
                    "{t.thanksQuote}"
                 </p>
             </div>
             <div className="mt-8 pt-6 border-t border-gray-100 max-w-lg mx-auto">
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
    </div>
  );
}
