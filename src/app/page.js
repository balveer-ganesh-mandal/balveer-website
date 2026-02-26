"use client";

import Image from "next/image";
import { PlayCircle, Youtube, Facebook, Instagram, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { lang } = useLanguage();
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch('/api/live-status')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.isLive === 'boolean') {
          setIsLive(data.isLive);
        }
      })
      .catch(err => console.error("Failed to fetch live status:", err));
  }, []);

  const content = {
    en: {
      title: "Balveer Ganesh Mandal",
      subtitle: "Established : 1924",
      historyTitle: "Our History",
      historyText1:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      historyText2:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      historyText3:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      readMore: "Read Full History",
      visarjanTitle: "2025",
      visarjanText:
        "Enter your Ganeshotsav description or devotional text here. Highlight the grandeur and emotional connection of the event. Nunc id cursus metus aliquam eleifend mi in nulla posuere.",
      winnerBanner: "Enter Special Banner Text Here",
    },
    mr: {
      title: "बालवीर गणेश मंडळ",
      subtitle: "स्थापना : १९२४",
      historyTitle: "आमचा इतिहास",
      historyText1:
        "येथे तुमच्या मंडळाचा किंवा संस्थेचा मुख्य इतिहास थोडक्यात लिहा. हा मजकूर बदलून तुम्ही तुमचा स्वतःचा माहितीपूर्ण मजकूर टाकू शकता. लोकांना तुमच्या कार्याबद्दल माहिती देणारा हा सुरुवातीचा परिच्छेद असावा.",
      historyText2:
        "त्यानंतरच्या काही महत्त्वाच्या घडामोडी किंवा टप्पे या दुसऱ्या परिच्छेदात लिहावेत. मंडळाने समाजासाठी केलेले योगदान आणि त्यांचे महत्त्व तुम्ही येथे विशद करू शकता.",
      historyText3:
        "भविष्यातील उद्दिष्टे किंवा सध्या सुरू असलेल्या मोठ्या उपक्रमांबद्दल थोडक्यात माहिती देऊन या भागाचा समारोप करावा. यामुळे वाचकांना मंडळाशी जोडलेले वाटेल.",
      readMore: "संपूर्ण इतिहास वाचा",
      visarjanTitle: "२०२५",
      visarjanText:
        "येथे तुमच्या गणेशोत्सवाची भव्यता आणि त्यामागील भावनेबद्दल थोडक्यात वर्णन लिहा. भाविकांचा उत्साह आणि सोहळ्याचे विलोभनीय स्वरूप येथे मांडता येईल.",
      winnerBanner: "येथे तुमचा विशेष संदेश लिहा",
    },
  }; const t = content[lang];

  return (
    <main className="relative min-h-screen bg-[#fffdfc] text-gray-800 font-sans overflow-hidden">
      {/* Top Banner Area (Secondary strip below Navbar) */}
      <div className="w-full bg-primary text-primary-foreground py-2 px-4 text-center text-xs md:text-sm shadow-inner relative overflow-hidden z-[90]">
        <span className="relative z-10 font-medium tracking-wide inline-block w-full break-words">
          Balveer Ganesh Mandal (Chandicha Pawan Ganpati) | Established : 1924
        </span>
      </div>

      {/* 
        #########################################
        HERO SECTION (Mandala & Glowing Idol) 
        ######################################### 
      */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden bg-background group cursor-default">
        {/* Modern Bright Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[radial-gradient(circle,rgba(234,88,12,0.15)_0%,rgba(255,255,255,0)_70%)] rounded-full z-0 pointer-events-none transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:bg-[radial-gradient(circle,rgba(234,88,12,0.25)_0%,rgba(255,255,255,0)_70%)]" />

        {/* Subtle decorative border arches */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

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
          className="absolute bottom-6 md:bottom-12 left-2 md:left-12 bg-background border border-border/20 p-1.5 md:p-2 shadow-xl rounded-md z-20 flex items-center pr-4 md:pr-8"
        >
          <div className="bg-primary text-primary-foreground px-2 py-1.5 md:px-4 md:py-2 rounded-sm font-semibold tracking-wide text-xs md:text-sm shadow-sm transition-transform hover:-translate-y-0.5 cursor-default text-center">
            Winner (Best Decoration)
          </div>
        </motion.div>
      </section>

      {/* 
        #########################################
        DOCUMENTARY VIDEO SECTION 
        ######################################### 
      */}
      <section className="py-20 relative bg-muted">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video w-full rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-black group border-[8px] border-border/80 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(234,88,12,0.4)] transition-all duration-500 ease-in-out cursor-pointer"
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
      <section className="py-24 relative bg-background">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="relative aspect-[4/3] md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl bg-muted border border-border/20 group flex items-center justify-center p-4"
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
                className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-temple-red pb-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {t.historyTitle}
              </motion.h2>
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full"
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
              <button className="bg-primary hover:bg-temple-red text-primary-foreground px-6 py-2.5 rounded text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:-translate-y-1 border border-primary/50">
                Read More
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 
        #########################################
        VISARJAN CEREMONY SECTION 
        ######################################### 
      */}
      <section className="py-24 relative bg-muted">
        <div className="max-w-4xl mx-auto px-6 relative z-10">

          <div className="text-center mb-10 space-y-4 flex flex-col items-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-temple-red pb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t.visarjanTitle}
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-4"
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

      {/* FOOTER */}
      <footer className="bg-secondary text-secondary-foreground py-16 lg:py-20 relative overflow-hidden font-sans border-t border-secondary-foreground/10 shadow-[inset_0_10px_30px_rgba(0,0,0,0.3)]">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

            {/* Column 1: About (Larger Column) */}
            <div className="md:col-span-5 space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold font-serif text-primary tracking-wide">
                {lang === 'en' ? 'Balveer Ganesh Mandal (Chandicha Pawan Ganpati)' : 'बालवीर गणेश मंडळ (चांदीचा पावन गणपती)'}
              </h3>
              <p className="text-secondary-foreground/70 leading-relaxed text-sm md:text-base max-w-md">
                {lang === 'en'
                  ? 'Established in 1924, we are dedicated to celebrating Ganeshotsav with devotion, cultural pride, and community service in Malkapur.'
                  : '१९२४ मध्ये स्थापित, आम्ही मलकापूरमध्ये भक्ती, सांस्कृतिक अभिमान आणि समाजसेवेसह गणेशोत्सव साजरा करण्यासाठी समर्पित आहोत.'}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-6 lg:pl-20">
              <h3 className={`font-bold text-primary/90 ${lang === 'en' ? 'text-sm xl:text-base uppercase tracking-[0.2em]' : 'text-lg md:text-xl tracking-normal'}`}>
                {lang === 'en' ? 'Quick Links' : 'महत्वाच्या लिंक्स'}
              </h3>
              <ul className="space-y-4 text-secondary-foreground/70 text-sm font-medium">
                <li><a href="#info" className="hover:text-primary transition-colors inline-block transform hover:translate-x-1 duration-200">{lang === 'en' ? 'Mandal Info' : 'मंडळ माहिती'}</a></li>
                <li><a href="#initiatives" className="hover:text-primary transition-colors inline-block transform hover:translate-x-1 duration-200">{lang === 'en' ? 'Initiatives' : 'उपक्रम'}</a></li>
                <li><a href="#broadcast" className="hover:text-primary transition-colors inline-block transform hover:translate-x-1 duration-200">{lang === 'en' ? 'Media & Gallery' : 'प्रसारमाध्यमे'}</a></li>
              </ul>
            </div>

            {/* Column 3: Contact & Social */}
            <div className="md:col-span-4 space-y-6">
              <h3 className={`font-bold text-primary/90 ${lang === 'en' ? 'text-sm xl:text-base uppercase tracking-[0.2em]' : 'text-lg md:text-xl tracking-normal'}`}>
                {lang === 'en' ? 'Connect With Us' : 'संपर्क साधा'}
              </h3>

              <div className="space-y-6 text-secondary-foreground/70 text-sm">
                {/* Email */}
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=chandichapaawanganpati@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors group">
                  <div className="bg-secondary-foreground/5 p-2.5 rounded-lg border border-secondary-foreground/10 group-hover:border-primary/40 group-hover:bg-secondary-foreground/10 transition-all shadow-sm">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <span className="truncate font-medium">chandichapaawanganpati@gmail.com</span>
                </a>

                {/* Socials */}
                <div className="flex gap-4 pt-2">
                  <a href="https://www.instagram.com/balveer_ganesh_mandal_malkapur/" target="_blank" rel="noopener noreferrer" className="bg-secondary-foreground/5 p-3 rounded-full border border-secondary-foreground/10 hover:bg-gradient-to-br hover:from-primary hover:to-orange-400 hover:text-white hover:border-transparent transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(234,88,12,0.3)] duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href="https://www.facebook.com/balveerganesh.mandalkalipura.5" target="_blank" rel="noopener noreferrer" className="bg-secondary-foreground/5 p-3 rounded-full border border-secondary-foreground/10 hover:bg-gradient-to-br hover:from-primary hover:to-orange-400 hover:text-white hover:border-transparent transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(234,88,12,0.3)] duration-300">
                    <Facebook size={18} />
                  </a>
                  <a href="https://www.youtube.com/@balveerganeshmandalkalipur4361" target="_blank" rel="noopener noreferrer" className="bg-secondary-foreground/5 p-3 rounded-full border border-secondary-foreground/10 hover:bg-gradient-to-br hover:from-primary hover:to-orange-400 hover:text-white hover:border-transparent transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(234,88,12,0.3)] duration-300">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Banner */}
          <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide text-secondary-foreground/50">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <p className="font-serif text-lg text-primary/80 mb-1">॥ श्री गणेशाय नमः ॥</p>
              <p className="font-serif text-lg text-primary/80 mb-2 md:mb-0">॥ जय गणेश ॥</p>
            </div>
            <p className="text-center md:text-right">
              © {new Date().getFullYear()} Balveer Ganesh Mandal (Chandicha Pawan Ganpati). {lang === 'en' ? 'All sacred rights reserved.' : 'सर्व हक्क राखीव.'}
            </p>
          </div>
        </div>
      </footer>

      {/* FIXED FLOATING ELEMENTS */}
      {isLive && (
        <div className="fixed bottom-6 left-4 z-[90]">
          <a
            href="#broadcast"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold tracking-wide text-xs md:text-sm shadow-xl hover:bg-temple-red transition-all hover:scale-105 border-2 border-transparent hover:border-border/50 hidden md:flex items-center gap-2 group"
          >
            <div className="w-2.5 h-2.5 bg-orange-200 rounded-full animate-ping absolute opacity-75" />
            <div className="w-2.5 h-2.5 bg-orange-100 rounded-full relative" />
            {lang === 'en' ? 'Live Stream' : 'थेट प्रक्षेपण'}
          </a>
        </div>
      )}

      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[90] hidden md:flex">
        {/* Replace YOUR_LINK_HERE with your social profiles */}
        <a href="https://www.youtube.com/@balveerganeshmandalkalipur4361" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background shadow-md border border-border/20 rounded-full flex items-center justify-center text-secondary/50 hover:text-primary hover:scale-110 transition-all">
          <Youtube size={18} />
        </a>
        <a href="https://www.facebook.com/balveerganesh.mandalkalipura.5" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background shadow-md border border-border/20 rounded-full flex items-center justify-center text-secondary/50 hover:text-primary hover:scale-110 transition-all">
          <Facebook size={18} />
        </a>
        <a href="https://www.instagram.com/balveer_ganesh_mandal_malkapur/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background shadow-md border border-border/20 rounded-full flex items-center justify-center text-secondary/50 hover:text-primary hover:scale-110 transition-all">
          <Instagram size={18} />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=chandichapaawanganpati@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-background shadow-md border border-border/20 rounded-full flex items-center justify-center text-secondary/50 hover:text-primary hover:scale-110 transition-all"
        >
          <Mail size={18} />
        </a>
      </div>
    </main >
  );
}