"use client";

import Link from "next/link";
import { ChevronDown, Menu, X, User, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
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
    <nav className="fixed top-0 w-full z-[100] bg-[#be1111] shadow-xl font-sans text-white border-b border-red-700/50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center transition-all duration-300">

        {/* Logo and Name */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group z-[101]" onClick={closeMenu}>
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#fceabb]/40 group-hover:scale-105 transition-transform bg-[#fff8f0] flex items-center justify-center p-1 shadow-lg shrink-0">
            <img
              src="/logo.png"
              alt="Mandal Logo"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <div className="flex flex-col">
            {/* Show short title on mobile, full title on sm and above */}
            <span className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-[#fceabb] tracking-wider drop-shadow-md font-serif whitespace-normal sm:whitespace-nowrap max-w-[200px] sm:max-w-none leading-tight sm:leading-normal">
              <span className="sm:hidden block">{t.shortTitle}</span>
              <span className="hidden sm:block">{t.title}</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold tracking-wide">
          {/* Dropdown for Mandal Info */}
          <div className="relative group">
            <Link href="/#info" className="flex items-center gap-1 hover:text-[#fceabb] transition-colors py-4">
              {t.info} <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            <div className="absolute top-full left-0 mt-0 w-48 bg-[#be1111] border border-red-700/50 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100">
              <div className="p-2 flex flex-col">
                <Link href="/committee" className="px-4 py-3 text-white hover:bg-[#8b0000] hover:text-[#fceabb] rounded transition-colors block border-b border-red-800/50 last:border-0 font-medium tracking-wider">
                  {t.committee}
                </Link>
              </div>
            </div>
          </div>
          <Link href="/#initiatives" className="flex items-center gap-1 hover:text-[#fceabb] transition-colors group">
            {t.initiatives} <ChevronDown size={14} className="opacity-70 group-hover:translate-y-0.5 transition-transform" />
          </Link>

          {/* Dropdown for Broadcast Media */}
          <div className="relative group">
            <Link href="/#broadcast" className="flex items-center gap-1 hover:text-[#fceabb] transition-colors py-4">
              {t.broadcast} <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            <div className="absolute top-full left-0 mt-0 w-48 bg-[#be1111] border border-red-700/50 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100">
              <div className="p-2 flex flex-col">
                <Link href="/gallery" className="px-4 py-3 text-white hover:bg-[#8b0000] hover:text-[#fceabb] rounded transition-colors block border-b border-red-800/50 last:border-0 font-medium tracking-wider">
                  {t.gallery}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link href="/#more" className="flex items-center gap-1 hover:text-[#fceabb] transition-colors py-4">
              {t.more} <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            <div className="absolute top-full left-0 mt-0 w-48 bg-[#be1111] border border-red-700/50 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100">
              <div className="p-2 flex flex-col">
                <Link href="/donate" className="px-4 py-3 text-white hover:bg-[#8b0000] hover:text-[#fceabb] rounded transition-colors block font-medium tracking-wider flex items-center gap-2">
                  {t.donate}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center border-l border-red-700/50 pl-6 ml-2 gap-4">
            {/* Language Toggle in Navbar */}
            <button
              onClick={() => setLang(lang === "en" ? "mr" : "en")}
              className="bg-white/20 p-2 rounded-full hover:bg-white/30 text-white transition-colors flex items-center justify-center"
              title={lang === "en" ? "Switch to Marathi" : "Switch to English"}
            >
              <Globe size={18} />
            </button>

            {/* User Auth Section */}
            {isAuthenticated ? (
              <div className="relative group">
                <Link href="/dashboard" className="flex items-center gap-2 hover:text-[#fceabb] transition-colors py-2">
                  <div className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                    <User size={18} />
                  </div>
                </Link>
                <div className="absolute top-full right-0 mt-0 w-48 bg-[#be1111] border border-red-700/50 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="p-2 flex flex-col">
                    <Link href="/dashboard" className="px-4 py-3 text-white hover:bg-[#8b0000] hover:text-[#fceabb] rounded transition-colors block border-b border-red-800/50 font-medium tracking-wider">
                      My Dashboard
                    </Link>
                    <button onClick={logout} className="px-4 py-3 text-left text-white hover:bg-[#8b0000] hover:text-[#fceabb] rounded transition-colors block font-medium tracking-wider w-full">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="hover:text-[#fceabb] transition-colors font-medium text-sm">
                  Login
                </Link>
                <span className="text-red-300/50 text-xs">|</span>
                <Link href="/signup" className="hover:text-[#fceabb] transition-colors font-medium text-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center z-[101]">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-[#fceabb] p-2 focus:outline-none"
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
            className="lg:hidden bg-[#9b1515] border-t border-red-800/50 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-6 text-base font-medium tracking-wide">
              {/* Mandal Info Section */}
              <div className="flex flex-col gap-2">
                <Link href="/#info" onClick={closeMenu} className="text-[#fceabb] font-bold pb-2 border-b border-red-800/50">
                  {t.info}
                </Link>
                <Link href="/committee" onClick={closeMenu} className="text-white hover:text-[#fceabb] pl-4 py-1 transition-colors">
                  • {t.committee}
                </Link>
              </div>

              {/* Initiatives */}
              <Link href="/#initiatives" onClick={closeMenu} className="text-[#fceabb] font-bold pb-2 border-b border-red-800/50">
                {t.initiatives}
              </Link>

              {/* Broadcast Media Section */}
              <div className="flex flex-col gap-2">
                <Link href="/#broadcast" onClick={closeMenu} className="text-[#fceabb] font-bold pb-2 border-b border-red-800/50">
                  {t.broadcast}
                </Link>
                <Link href="/gallery" onClick={closeMenu} className="text-white hover:text-[#fceabb] pl-4 py-1 transition-colors">
                  • {t.gallery}
                </Link>
              </div>

              {/* More Section */}
              <div className="flex flex-col gap-2">
                <Link href="/#more" onClick={closeMenu} className="text-[#fceabb] font-bold pb-2 border-b border-red-800/50">
                  {t.more}
                </Link>
                <Link href="/donate" onClick={closeMenu} className="text-white hover:text-[#fceabb] pl-4 py-1 transition-colors flex items-center gap-2">
                  {t.donate}
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" onClick={closeMenu} className="text-white hover:text-[#fceabb] pl-4 py-1 transition-colors">
                      • My Dashboard
                    </Link>
                    <button onClick={() => { logout(); closeMenu(); }} className="text-left text-white hover:text-[#fceabb] pl-4 py-1 transition-colors">
                      • Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={closeMenu} className="text-white hover:text-[#fceabb] pl-4 py-1 transition-colors">
                    • Devotee Login
                  </Link>
                )}
              </div>

              {/* Mobile Language Toggle */}
              <div className="pt-2 flex justify-center pb-4">
                <button
                  onClick={() => {
                    setLang(lang === "en" ? "mr" : "en");
                    closeMenu();
                  }}
                  className="bg-white/20 p-3 rounded-full hover:bg-white/30 text-white transition-colors flex items-center justify-center"
                  title={lang === "en" ? "Switch to Marathi" : "Switch to English"}
                >
                  <Globe size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
