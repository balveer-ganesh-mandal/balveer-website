"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when a link is clicked
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navContent = {
    en: {
      title: "॥ Balveer Ganesh Mandal (Chandicha Pawan Ganpati) ॥",
      shortTitle: "॥ Balveer Ganesh Mandal ॥",
      info: "Mandal Info",
      committee: "Our Committee",
      initiatives: "Initiatives",
      broadcast: "Broadcast Media",
      more: "More",
      gallery: "Photo Gallery",
      donate: "Donate",
    },
    mr: {
      title: "॥ बालवीर गणेश मंडळ (चांदीचा पावन गणपती) ॥",
      shortTitle: "॥ बालवीर गणेश मंडळ ॥",
      info: "मंडळ माहिती",
      committee: "आमची समिती",
      initiatives: "उपक्रम",
      broadcast: "प्रसारमाध्यमे",
      more: "अधिक",
      gallery: "छायाचित्र गॅलरी",
      donate: "देणगी",
    }
  };
  const t = navContent[lang];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-primary/95 backdrop-blur-sm shadow-xl font-sans text-primary-foreground border-b border-primary/50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center transition-all duration-300">

        {/* Logo and Name */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group z-[101]" onClick={closeMenu}>
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-secondary/20 group-hover:scale-105 transition-transform bg-background flex items-center justify-center p-1 shadow-lg shrink-0">
            <img
              src="/logo.png"
              alt="Mandal Logo"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <div className="flex flex-col">
            {/* Show short title on mobile, full title on sm and above */}
            <span className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-white tracking-wider drop-shadow-md font-serif whitespace-normal sm:whitespace-nowrap max-w-[200px] sm:max-w-none leading-tight sm:leading-normal group-hover:text-secondary-foreground transition-colors">
              <span className="sm:hidden block">{t.shortTitle}</span>
              <span className="hidden sm:block">{t.title}</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold tracking-wide">
          {/* Dropdown for Mandal Info */}
          <div className="relative group">
            <Link href="/#info" className="flex items-center gap-1 hover:text-secondary-foreground transition-colors py-4">
              {t.info} <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            <div className="absolute top-full left-0 mt-0 w-48 bg-primary/95 backdrop-blur-md border border-primary/50 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100">
              <div className="p-2 flex flex-col">
                <Link href="/committee" className="px-4 py-3 text-primary-foreground hover:bg-secondary hover:text-secondary-foreground rounded transition-colors block border-b border-primary/20 last:border-0 font-medium tracking-wider">
                  {t.committee}
                </Link>
              </div>
            </div>
          </div>
          <Link href="/#initiatives" className="flex items-center gap-1 hover:text-secondary-foreground transition-colors group">
            {t.initiatives} <ChevronDown size={14} className="opacity-70 group-hover:translate-y-0.5 transition-transform" />
          </Link>

          {/* Dropdown for Broadcast Media */}
          <div className="relative group">
            <Link href="/#broadcast" className="flex items-center gap-1 hover:text-secondary-foreground transition-colors py-4">
              {t.broadcast} <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            <div className="absolute top-full left-0 mt-0 w-48 bg-primary/95 backdrop-blur-md border border-primary/50 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100">
              <div className="p-2 flex flex-col">
                <Link href="/gallery" className="px-4 py-3 text-primary-foreground hover:bg-secondary hover:text-secondary-foreground rounded transition-colors block border-b border-primary/20 last:border-0 font-medium tracking-wider">
                  {t.gallery}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link href="/#more" className="flex items-center gap-1 hover:text-secondary-foreground transition-colors py-4">
              {t.more} <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            <div className="absolute top-full left-0 mt-0 w-48 bg-primary/95 backdrop-blur-md border border-primary/50 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100">
              <div className="p-2 flex flex-col">
                <Link href="/donate" className="px-4 py-3 text-primary-foreground hover:bg-secondary hover:text-secondary-foreground rounded transition-colors block border-b border-primary/20 last:border-0 font-medium tracking-wider flex items-center gap-2">
                  {t.donate}
                </Link>
              </div>
            </div>
          </div>

          {/* Language Toggle in Navbar */}
          <button
            onClick={() => setLang(lang === "en" ? "mr" : "en")}
            className="bg-background text-primary hover:bg-secondary hover:text-secondary-foreground px-4 py-2 rounded-full font-bold shadow-md transition-all ml-4 w-24 text-center border border-primary/20"
          >
            {lang === "en" ? "मराठी" : "English"}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center z-[101]">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary-foreground hover:text-secondary-foreground p-2 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-secondary border-t border-primary/20 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-6 text-base font-medium tracking-wide">
              {/* Mandal Info Section */}
              <div className="flex flex-col gap-2">
                <Link href="/#info" onClick={closeMenu} className="text-secondary-foreground font-bold pb-2 border-b border-primary/20">
                  {t.info}
                </Link>
                <Link href="/committee" onClick={closeMenu} className="text-white hover:text-secondary-foreground pl-4 py-1 transition-colors">
                  • {t.committee}
                </Link>
              </div>

              {/* Initiatives */}
              <Link href="/#initiatives" onClick={closeMenu} className="text-secondary-foreground font-bold pb-2 border-b border-primary/20">
                {t.initiatives}
              </Link>

              {/* Broadcast Media Section */}
              <div className="flex flex-col gap-2">
                <Link href="/#broadcast" onClick={closeMenu} className="text-secondary-foreground font-bold pb-2 border-b border-primary/20">
                  {t.broadcast}
                </Link>
                <Link href="/gallery" onClick={closeMenu} className="text-white hover:text-secondary-foreground pl-4 py-1 transition-colors">
                  • {t.gallery}
                </Link>
              </div>

              {/* More Section */}
              <div className="flex flex-col gap-2">
                <Link href="/#more" onClick={closeMenu} className="text-secondary-foreground font-bold pb-2 border-b border-primary/20">
                  {t.more}
                </Link>
                <Link href="/donate" onClick={closeMenu} className="text-white hover:text-secondary-foreground pl-4 py-1 transition-colors flex items-center gap-2">
                  {t.donate}
                </Link>
              </div>

              {/* Mobile Language Toggle */}
              <div className="pt-2 flex justify-center pb-4">
                <button
                  onClick={() => {
                    setLang(lang === "en" ? "mr" : "en");
                    closeMenu();
                  }}
                  className="bg-primary text-primary-foreground hover:bg-background hover:text-primary px-8 py-2.5 rounded-full font-bold shadow-md transition-all text-center w-full max-w-[200px]"
                >
                  {lang === "en" ? "मराठी मध्ये वाचा" : "Read in English"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}