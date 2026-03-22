"use client";

import Link from "next/link";
import { Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-[#4a0808] text-white py-16 lg:py-20 relative overflow-hidden font-sans border-t border-white/10 shadow-[inset_0_10px_30px_rgba(0,0,0,0.3)]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Column 1: About (Larger Column) */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold font-serif text-[#fceabb] tracking-wide">
              {lang === 'en' ? 'Balveer Ganesh Mandal (Chandicha Pawan Ganpati)' : 'बालवीर गणेश मंडळ (चांदीचा पावन गणपती)'}
            </h3>
            <p className="text-white/70 leading-relaxed text-sm md:text-base max-w-md">
              {lang === 'en'
                ? 'Established in 1924, this Ganpati Mandal stands as a symbol of faith and unity in Malkapur. For over a century, we have celebrated Ganeshotsav not merely as a festival, but as a living tradition. Devotion, cultural pride, and community service — these three values continue to guide our journey. Generations have come and gone, but our love for Bappa and our commitment to society has remained unwavering.'
                : '१९२४ साली स्थापन झालेलं हे गणपती मंडळ मलकापूरच्या श्रद्धेचं आणि एकतेचं प्रतीक आहे. गेल्या शंभराहून अधिक वर्षांपासून आम्ही गणेशोत्सव केवळ उत्सव म्हणून नाही, तर एक जिवंत परंपरा म्हणून साजरा करतो. भक्ती, सांस्कृतिक अभिमान आणि समाजसेवा — या तीन मूल्यांवर आमची वाटचाल आजही सुरू आहे. पिढ्या बदलल्या, पण गणरायावरील प्रेम आणि समाजाप्रती असलेली बांधिलकी कायम अढळ राहिली आहे.'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-6 lg:pl-10">
            <h3 className={`font-bold text-[#fceabb]/90 ${lang === 'en' ? 'text-sm xl:text-base uppercase tracking-[0.2em]' : 'text-lg md:text-xl tracking-normal'}`}>
              {lang === 'en' ? 'Quick Links' : 'महत्वाच्या लिंक्स'}
            </h3>
            <ul className="space-y-4 text-white/70 text-sm font-medium">
              <li><Link href="/#info" className="hover:text-[#fceabb] transition-colors inline-block transform hover:translate-x-1 duration-200">{lang === 'en' ? 'Mandal Info' : 'मंडळ माहिती'}</Link></li>
              <li><Link href="/#initiatives" className="hover:text-[#fceabb] transition-colors inline-block transform hover:translate-x-1 duration-200">{lang === 'en' ? 'Initiatives' : 'उपक्रम'}</Link></li>
              <li><Link href="/#broadcast" className="hover:text-[#fceabb] transition-colors inline-block transform hover:translate-x-1 duration-200">{lang === 'en' ? 'Media & Gallery' : 'प्रसारमाध्यमे'}</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Policies */}
          <div className="md:col-span-3 space-y-6 lg:pl-10">
            <h3 className={`font-bold text-[#fceabb]/90 ${lang === 'en' ? 'text-sm xl:text-base uppercase tracking-[0.2em]' : 'text-lg md:text-xl tracking-normal'}`}>
              {lang === 'en' ? 'Legal' : 'कायदेशीर'}
            </h3>
            <ul className="space-y-4 text-white/70 text-sm font-medium">
              <li><Link href="/privacy-policy" className="hover:text-[#fceabb] transition-colors inline-block transform hover:translate-x-1 duration-200">{lang === 'en' ? 'Privacy Policy' : 'गोपनीयता धोरण'}</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-[#fceabb] transition-colors inline-block transform hover:translate-x-1 duration-200">{lang === 'en' ? 'Terms & Conditions' : 'अटी आणि शर्ती'}</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#fceabb] transition-colors inline-block transform hover:translate-x-1 duration-200">{lang === 'en' ? 'Refund Policy' : 'परतावा धोरण'}</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="md:col-span-3 space-y-6">
            <h3 className={`font-bold text-[#fceabb]/90 ${lang === 'en' ? 'text-sm xl:text-base uppercase tracking-[0.2em]' : 'text-lg md:text-xl tracking-normal'}`}>
              {lang === 'en' ? 'Connect With Us' : 'संपर्क साधा'}
            </h3>

            <div className="space-y-6 text-white/70 text-sm">
              {/* Reference Contact Page */}
              <Link href="/contact" className="hover:text-[#fceabb] transition-colors inline-block transform hover:translate-x-1 duration-200 font-medium">
                {lang === 'en' ? 'Contact Us Page' : 'संपर्क पृष्ठ'}
              </Link>
              
              {/* Email */}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=chandichapaawanganpati@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#fceabb] transition-colors group">
                <div className="bg-white/5 p-2.5 rounded-lg border border-white/10 group-hover:border-[#fceabb]/40 group-hover:bg-white/10 transition-all shadow-sm">
                  <Mail size={16} className="text-[#fceabb]" />
                </div>
                <span className="truncate font-medium">chandichapaawanganpati@gmail.com</span>
              </a>

              {/* Socials */}
              <div className="flex gap-4 pt-2">
                <a href="https://www.instagram.com/balveer_ganesh_mandal_malkapur/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full border border-white/10 hover:bg-gradient-to-br hover:from-[#fceabb] hover:to-[#d4af37] hover:text-[#4a0808] hover:border-transparent transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(252,234,187,0.3)] duration-300">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/balveerganesh.mandalkalipura.5" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full border border-white/10 hover:bg-gradient-to-br hover:from-[#fceabb] hover:to-[#d4af37] hover:text-[#4a0808] hover:border-transparent transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(252,234,187,0.3)] duration-300">
                  <Facebook size={18} />
                </a>
                <a href="https://www.youtube.com/@balveerganeshmandalkalipur4361" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full border border-white/10 hover:bg-gradient-to-br hover:from-[#fceabb] hover:to-[#d4af37] hover:text-[#4a0808] hover:border-transparent transition-all transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(252,234,187,0.3)] duration-300">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Banner */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide text-white/50">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="font-serif text-lg text-[#fceabb]/80 mb-1">॥ श्री गणेशाय नमः ॥</p>
            <p className="font-serif text-lg text-[#fceabb]/80 mb-2 md:mb-0">॥ जय गणेश ॥</p>
          </div>
          <p className="text-center md:text-right">
            © {new Date().getFullYear()} Balveer Ganesh Mandal (Chandicha Pawan Ganpati). {lang === 'en' ? 'All sacred rights reserved.' : 'सर्व हक्क राखीव.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
