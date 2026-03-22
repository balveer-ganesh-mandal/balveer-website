"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Contact() {
  const { lang } = useLanguage();

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "We'd love to hear from you. Reach out to us for any queries, donations, or volunteer opportunities.",
      addressTitle: "Our Office",
      addressDesc: "Balveer Ganesh Mandal (Chandicha Pawan Ganpati), Kalipura, Malkapur, Dist. Buldhana, Maharashtra - 443101",
      phoneTitle: "Phone",
      phoneDesc: "+91 XXXXX XXXXX",
      emailTitle: "Email",
      emailDesc: "chandichapaawanganpati@gmail.com",
      timeTitle: "Visiting Hours",
      timeDesc: "Everyday: 10:00 AM - 8:00 PM",
    },
    mr: {
      title: "संपर्क साधा",
      subtitle: "आम्हाला तुमच्याकडून ऐकायला आवडेल. कोणत्याही चौकशी, देणगी वा स्वयंसेवक संधीसाठी आमच्याशी संपर्क साधा.",
      addressTitle: "आमचे कार्यालय",
      addressDesc: "बालवीर गणेश मंडळ (चांदीचा पावन गणपती), काळीपुरा, मलकापूर, जि. बुलढाणा महाराष्ट्र - ४४३१०१",
      phoneTitle: "फोन",
      phoneDesc: "+९१ XXXXX XXXXX",
      emailTitle: "ईमेल",
      emailDesc: "chandichapaawanganpati@gmail.com",
      timeTitle: "भेटण्याची वेळ",
      timeDesc: "दररोज: सकाळी ९:०० ते सायंकाळी ७:००",
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-[#fffdfc] text-gray-800 font-sans pb-20">
      {/* Header Banner */}
      <div className="bg-[#4a0808] text-white py-16 text-center border-b-4 border-[#d4af37] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-[#fceabb] drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto px-4 text-sm md:text-base">
            {t.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border text-center border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 rounded-2xl hover:shadow-[0_10px_30px_rgba(185,28,28,0.1)] transition-all hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-red-50 text-[#be1111] rounded-full flex items-center justify-center mb-6 mx-auto">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#4a0808] mb-3">{t.addressTitle}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t.addressDesc}
            </p>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border text-center border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 rounded-2xl hover:shadow-[0_10px_30px_rgba(185,28,28,0.1)] transition-all hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-red-50 text-[#be1111] rounded-full flex items-center justify-center mb-6 mx-auto">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#4a0808] mb-3">{t.phoneTitle}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t.phoneDesc}
            </p>
          </motion.div>

          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white border text-center border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 rounded-2xl hover:shadow-[0_10px_30px_rgba(185,28,28,0.1)] transition-all hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-red-50 text-[#be1111] rounded-full flex items-center justify-center mb-6 mx-auto">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#4a0808] mb-3">{t.emailTitle}</h3>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=chandichapaawanganpati@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#be1111] hover:underline leading-relaxed text-sm break-all font-medium">
              {t.emailDesc}
            </a>
          </motion.div>

          {/* Time Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white border text-center border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 rounded-2xl hover:shadow-[0_10px_30px_rgba(185,28,28,0.1)] transition-all hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-red-50 text-[#be1111] rounded-full flex items-center justify-center mb-6 mx-auto">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#4a0808] mb-3">{t.timeTitle}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t.timeDesc}
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
