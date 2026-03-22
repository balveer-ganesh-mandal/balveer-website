"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Youtube, Facebook, Instagram, Mail, Calendar, HandCoins, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { lang } = useLanguage();
  const [isLive, setIsLive] = useState(false);
  const [events, setEvents] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const getImageUrl = (path) => path?.startsWith('/uploads') ? `${API_URL}${path}` : path;

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

    fetch(`${API_URL}/api/live-status`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.isLive === 'boolean') {
          setIsLive(data.isLive);
        }
      })
      .catch(err => console.error("Failed to fetch live status:", err));

    fetch(`${API_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        }
      })
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  const content = {
    en: {
      title: "Balveer Ganesh Mandal",
      historyTitle: "Our History",
      historyText1:
        "Balveer Ganesh Mandal (Chandicha Pawan Ganpati) was born out of a deep friendship — founded by Late Shri. Nimbadas Pimparkar, Shri. Rajabhau Dawale, Shri. Hande, and other friends during their high school days. What started as a youthful initiative quickly grew into one of Malkapur's most cherished traditions.",
      historyText2:
        "The Mandal's defining moment came during its Golden Jubilee, when it acquired a magnificent 3-foot silver Ganesh idol — the crown jewel that remains the major attraction for all devotees during Ganeshotsav and the Visarjan Miravnuk to this day.",
      historyText3:
        "After facing challenges, the youth revived the Mandal in 2022 in association with the respected committee. Our Mandal is unique in celebrating the 10-day festival with peace, discipline, silence, and harmony — a tradition our founders envisioned over a century ago.",
      readMore: "Read Full History",
      visarjanTitle: "The Grand Festival",
      visarjanText:
        "Balveer Ganesh Mandal is not just a festival committee; it is the unwavering faith of Malkapur. The true essence of our Ganeshotsav lies in our highly disciplined, peaceful, and devotion-filled celebrations. Devotees gather in huge numbers with profound enthusiasm to witness the mesmerizing 3-foot pure silver idol of our beloved Bappa. Our immersion procession (Visarjan Miravnuk), marked by absolute discipline and a sea of devotees, stands as a living testament to our century-old legacy.",
      winnerBanner: "Enter Special Banner Text Here",
      eventsTitle: "Upcoming Events",
      eventsSubtitle: "Join us in our upcoming cultural and social initiatives",
      event1Title: "Ganeshotsav 2026 Preparations",
      event1Date: "August 15, 2026",
      event1Time: "10:00 AM Onwards",
      event1Loc: "Mandal Karyalay, Malkapur",
      event1Desc: "Kickoff meeting and volunteer drive for the upcoming grand Ganeshotsav. All devotees are welcome to participate.",
      donateTitle: "Support Our Mandal",
      donateDesc: "Your generous contributions fuel our devotion and empower our social initiatives like Annadaan, medical help, and grand Utsav celebrations.",
      donateBtn: "Donate Now",
    },
    mr: {
      title: "बालवीर गणेश मंडळ",
      subtitle: "स्थापना : १९२४",
      historyTitle: "आमचा इतिहास",
      historyText1:
        "बालवीर गणेश मंडळ (चांदीचा पावन गणपती) याची सुरुवात खऱ्या मैत्रीतून आणि समान भक्तीभावातून झाली. कै. श्री. निंबादास पिंपरकर, श्री. राजाभाऊ डवले, श्री. हांडे आणि त्यांचे इतर मित्र — या सर्वांनी शाळेत असतानाच एकत्र येऊन या मंडळाची स्थापना केली. त्या काळातील एका साध्या पण मनापासूनच्या उपक्रमाने पुढे मलकापूरच्या सर्वात जुन्या आणि जपल्या जाणाऱ्या परंपरांपैकी एक स्थान मिळवले — जी परंपरा आजही तितक्याच उत्साहाने आणि श्रद्धेने पुढे नेली जात आहे.",
      historyText2:
        "मंडळाच्या इतिहासातील सर्वात महत्त्वाचा क्षण आला तो सुवर्णमहोत्सवाच्या वेळी — जेव्हा सुमारे ३ फूट उंचीची भव्य चांदीची गणेशमूर्ती मंडळात स्थापन करण्याचा निर्णय घेण्यात आला. त्या दिवसापासून ही मूर्ती मंडळाची खरी ओळख बनली आणि आजही गणेशोत्सवात व विसर्जन मिरवणुकीत ती प्रत्येक भक्ताच्या मनाला साद घालते.",
      historyText3:
        "आव्हानांना तोंड दिल्यानंतर, २०२२ मध्ये तरुणाईने ज्येष्ठ समितीच्या सहकार्याने मंडळाला पुनरुज्जीवित केले. आमचे मंडळ शांतता, शिस्त, मौन आणि सुसंवादाने १० दिवसीय उत्सव साजरा करण्याच्या अनोख्या परंपरेसाठी ओळखले जाते — एक परंपरा जी आमच्या संस्थापकांनी शतकापूर्वी कल्पिली होती.",
      readMore: "संपूर्ण इतिहास वाचा",
      visarjanTitle: "आमचा भव्य गणेशोत्सव",
      visarjanText:
        "बालवीर गणेश मंडळ हे केवळ एक उत्सव मंडळ नसून ती मलकापूरकरांची एक अढळ श्रद्धा आहे. आमच्या गणेशोत्सवाची खरी ओळख म्हणजे अत्यंत शिस्तबद्ध, शांततामय आणि भक्तिमय वातावरणात संपन्न होणारा सोहळा. ३ फुटी भव्य चांदीच्या गणपतीचे विलोभनीय रूप पाहण्यासाठी आणि बाप्पाचा आशीर्वाद घेण्यासाठी भाविक मोठ्या संख्येने आणि उत्साहाने गर्दी करतात. विसर्जन मिरवणुकीतील शिस्त आणि भाविकांचा अथांग सागर हे आमच्या शतकोत्तर परंपरेचे जिवंत उदाहरण आहे.",
      winnerBanner: "येथे तुमचा विशेष संदेश लिहा",
      eventsTitle: "आगामी उपक्रम",
      eventsSubtitle: "आमच्या आगामी सांस्कृतिक आणि सामाजिक उपक्रमांमध्ये सहभागी व्हा",
      event1Title: "गणेशोत्सव २०२६ पूर्वतयारी",
      event1Date: "१५ ऑगस्ट २०२६",
      event1Time: "सकाळी १०:०० पासून",
      event1Loc: "मंडळ कार्यालय, मलकापूर",
      event1Desc: "आगामी भव्य गणेशोत्सवासाठी स्वयंसेवक नोंदणी आणि नियोजन बैठक. सर्व भाविकांचे स्वागत आहे.",
      donateTitle: "मंडळाला सहकार्य करा",
      donateDesc: "तुमच्या बहुमोल योगदानामुळे आमची भक्ती आणि अन्नदान, वैद्यकीय मदत तसेच उत्सवासारखे सामाजिक उपक्रम अधिक भक्कम होतात.",
      donateBtn: "आता दान करा",
    },
  };
  const t = content[lang];

  return (
    <main className="relative min-h-screen bg-[#fffdfc] text-gray-800 font-sans overflow-hidden">
      {/* Top Banner Area (Secondary strip below Navbar) */}
      <div className="w-full bg-[#9b1515] text-[#fceabb] py-2 px-4 text-center text-xs md:text-sm shadow-inner relative overflow-hidden z-[90]">
        <span className="relative z-10 font-medium tracking-wide inline-block w-full break-words">
          {lang === 'en' ? 'Established : 1924' : 'स्थापना : १९२४'}
        </span>
      </div>

      {/* 
        #########################################
        HERO SECTION (Mandala & Glowing Idol) 
        ######################################### 
      */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden bg-white group cursor-default">
        {/* Modern Bright Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[radial-gradient(circle,rgba(255,160,50,0.15)_0%,rgba(255,255,255,0)_70%)] rounded-full z-0 pointer-events-none transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:bg-[radial-gradient(circle,rgba(255,160,50,0.25)_0%,rgba(255,255,255,0)_70%)]" />

        {/* Subtle decorative border arches */}
        < div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#8b0000]/10 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 drop-shadow-[0_0_40px_rgba(212,175,55,0.6)]"
        >
          <div className="relative w-[320px] h-[480px] sm:w-[500px] sm:h-[750px] lg:w-[600px] lg:h-[850px]">
            <Image
              src="/cpg.png"
              alt="Balveer Ganesh Mandal Ganpati"
              fill
              className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-in-out drop-shadow-lg"
              sizes="(max-w-1024px) 100vw, 70vw"
              priority
            />
          </div>
        </motion.div>

        {/* Sacred Banner (Bottom Center instead of Left for symmetry) */}
        {/* Floating Winner Badge (Bottom Left) */}
        {/* Floating Winner Badge (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-6 md:bottom-12 left-2 md:left-12 bg-white border border-gray-100 p-1.5 md:p-2 shadow-xl rounded-md z-20 flex items-center pr-4 md:pr-8"
        >
          <div className="bg-[#b91c1c] text-white px-2 py-1.5 md:px-4 md:py-2 rounded-sm font-semibold tracking-wide text-xs md:text-sm shadow-sm transition-transform hover:-translate-y-0.5 cursor-default text-center">
            Winner (Best Decoration)
          </div>
        </motion.div>
      </section>

      {/* 
        #########################################
        DOCUMENTARY VIDEO SECTION 
        ######################################### 
      */}
      <section className="py-20 relative bg-[#fef5f5]">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video w-full rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-black group border-[8px] border-[#d4af37]/80 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(212,175,55,0.4)] transition-all duration-500 ease-in-out cursor-pointer"
          >
            {/* Embedded YouTube Video */}
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/OXuwtLD6Y4k"
              title="Balveer Ganesh Mandal Documentary"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          </motion.div>
        </div>
      </section >

      {/* 
        #########################################
        HISTORY SECTION (Clean White Layout) 
        ######################################### 
      */}
      <section className="py-24 relative bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="relative aspect-[4/3] md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl bg-[#fffdfc] border border-gray-100 group flex items-center justify-center p-4"
          >
            <div className="relative w-full h-full">
              <Image
                src="/cpg.png"
                alt="History of the Mandal"
                fill
                className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-in-out drop-shadow-lg"
                sizes="(max-w-768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-3 overflow-hidden">
              <motion.h2
                className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#be1111] to-[#6b0a0a] pb-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {t.historyTitle}
              </motion.h2>
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-[#be1111] to-transparent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>

            <div className="space-y-4 text-gray-600 font-sans text-sm md:text-base leading-relaxed">
              <p>{t.historyText1}</p>
              <p>{t.historyText2}</p>
              <p>{t.historyText3}</p>
            </div>

            <div className="pt-4">
              <Link href="/about" className="inline-block bg-[#df2f2f] hover:bg-[#b01e1e] text-white px-6 py-2.5 rounded text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-[0_10px_20px_rgba(185,28,28,0.3)] hover:-translate-y-1 border border-red-700">
                {t.readMore}
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 
        #########################################
        VISARJAN CEREMONY SECTION 
        ######################################### 
      */}
      <section className="py-24 relative bg-[#fef5f5]">
        <div className="max-w-4xl mx-auto px-6 relative z-10">

          <div className="text-center mb-10 space-y-4 flex flex-col items-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#be1111] to-[#8b0000] pb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t.visarjanTitle}
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-transparent via-[#be1111] to-transparent rounded-full mb-4"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.p
              className="text-gray-600 font-sans max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t.visarjanText}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black group hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(185,28,28,0.3)] transition-all duration-500 ease-in-out cursor-pointer"
          >
            {/* Embedded YouTube Video */}
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/OXuwtLD6Y4k"
              title="Visarjan Ceremony Documentary"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          </motion.div>

        </div>
      </section>

      {/* 
        #########################################
        UPCOMING EVENTS SECTION
        ######################################### 
      */}
      <section className="py-24 relative bg-white border-t border-gray-100">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">

          <div className="text-center mb-16 space-y-4">
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-[#4a0808]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Calendar className="inline-block w-8 h-8 md:w-10 md:h-10 text-[#d4af37] mr-3 -mt-2" />
              {t.eventsTitle}
            </motion.h2>
            <motion.p
              className="text-gray-600 font-sans max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.eventsSubtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {events.length > 0 ? (
              events.map((ev, index) => {
                const delay = index * 0.2;
                let badgeText = "";
                if (ev.type === "meeting") badgeText = lang === 'en' ? 'Meeting' : 'बैठक';
                else if (ev.type === "social") badgeText = lang === 'en' ? 'Social Work' : 'सामाजिक उपक्रम';
                else if (ev.type === "celebration") badgeText = lang === 'en' ? 'Celebration' : 'उत्सव';
                else badgeText = lang === 'en' ? 'General' : 'सामान्य';

                return (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay }}
                    className="bg-[#fffdfc] p-6 md:p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#e6ddd5] group hover:border-[#be1111]/30 hover:shadow-xl transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#d4af37] to-[#be1111] transform origin-top scale-y-50 group-hover:scale-y-100 transition-transform duration-500" />
                    <div className="pl-4 flex flex-col md:flex-row gap-6 md:gap-8 min-h-[200px]">
                      {/* Left Side: Details */}
                      <div className="flex-1 flex flex-col justify-start">
                        <div>
                          <span className="inline-block px-3 py-1 bg-red-50 text-[#be1111] text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                            {badgeText}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#4a0808] mb-4 font-serif">{ev.title[lang]}</h3>

                        <div className="space-y-3 mb-6 flex flex-col items-start text-sm text-gray-600">
                          <div className="flex items-center gap-2"><Calendar size={16} className="text-[#d4af37]" /> <span className="font-semibold">{ev.date[lang]}</span></div>
                          {ev.time?.[lang] && <div className="flex items-center gap-2"><Clock size={16} className="text-gray-400" /> <span>{ev.time[lang]}</span></div>}
                          {ev.loc?.[lang] && <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400" /> <span>{ev.loc[lang]}</span></div>}
                        </div>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4 mt-auto">
                          {ev.desc[lang]}
                        </p>
                      </div>

                      {/* Right Side: Poster Space */}
                      <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0 flex items-center justify-center">
                        {ev.poster ? (
                          <div className="w-full rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                            <img src={getImageUrl(ev.poster)} alt={ev.title[lang]} className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="hidden md:block w-full h-full min-h-[150px]"></div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="md:col-span-2 text-center text-gray-500 py-12 italic">
                {lang === 'en' ? 'No new events scheduled right now. Check back soon!' : 'सध्या कोणतेही नवीन कार्यक्रम नाहीत. लवकरच पुन्हा तपासा!'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 
        #########################################
        DONATIONS CTA SECTION
        ######################################### 
      */}
      <section className="py-20 bg-gradient-to-br from-[#4a0808] to-[#9b1515] relative overflow-hidden">
        {/* Decorative Watermark/BG */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#fceabb] opacity-5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="bg-white/10 p-5 rounded-full mb-8 backdrop-blur-sm border border-white/20">
              <HandCoins className="w-12 h-12 text-[#fceabb]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 drop-shadow-lg tracking-wide text-[#fceabb]">
              {t.donateTitle}
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {t.donateDesc}
            </p>
            <a
              href="/donate"
              className="group relative px-8 py-4 bg-[#fceabb] text-[#4a0808] rounded-full font-bold text-lg md:text-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(252,234,187,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="relative z-10">{t.donateBtn}</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FIXED FLOATING ELEMENTS */}
      {
        isLive && (
          <div className="fixed bottom-6 left-4 z-[90]">
            <a
              href="#broadcast"
              className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-full font-bold tracking-wide text-xs md:text-sm shadow-xl hover:bg-[#8b0000] transition-all hover:scale-105 border-2 border-transparent hover:border-[#fceabb]/50 hidden md:flex items-center gap-2 group"
            >
              <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-ping absolute opacity-75" />
              <div className="w-2.5 h-2.5 bg-red-200 rounded-full relative" />
              {lang === 'en' ? 'Live Stream' : 'थेट प्रक्षेपण'}
            </a>
          </div>
        )
      }

      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[90] hidden md:flex">
        {/* Replace YOUR_LINK_HERE with your social profiles */}
        <a href="https://www.youtube.com/@balveerganeshmandalkalipur4361" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#b91c1c] hover:scale-110 transition-all">
          <Youtube size={18} />
        </a>
        <a href="https://www.facebook.com/balveerganesh.mandalkalipura.5" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#b91c1c] hover:scale-110 transition-all">
          <Facebook size={18} />
        </a>
        <a href="https://www.instagram.com/balveer_ganesh_mandal_malkapur/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#b91c1c] hover:scale-110 transition-all">
          <Instagram size={18} />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=chandichapaawanganpati@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#b91c1c] hover:scale-110 transition-all"
        >
          <Mail size={18} />
        </a>
      </div>
    </main >
  );
}
