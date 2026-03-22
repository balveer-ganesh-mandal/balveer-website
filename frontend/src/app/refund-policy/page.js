"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RefundPolicy() {
  const { lang } = useLanguage();

  const content = {
    en: {
      title: "Refund Policy",
      lastUpdated: "Last Updated: August 2025",
      intro: "Balveer Ganesh Mandal is a registered non-profit organization. We greatly appreciate your voluntary donations.",
      sections: [
        {
          heading: "1. General Policy",
          paragraphs: [
            "All donations made online through our website are generally non-refundable. Since our operations and events rely on the generosity of our devotees, once a donation is made, it goes directly towards our planned social initiatives and Ganeshotsav preparations."
          ]
        },
        {
          heading: "2. Erroneous Transactions",
          paragraphs: [
            "If an error has occurred while making a donation online (e.g., your account was charged twice or charged for a larger amount than intended), please contact us within 7 days of the transaction.",
            "Refunds for erroneous transactions are subject to internal review and will be processed only after verification of the transaction failure or error with our payment gateway partner."
          ]
        },
        {
          heading: "3. Refund Process",
          paragraphs: [
            "Approved refunds will be credited back to the original source of payment within 7-10 working days, depending on your bank's policies."
          ]
        },
        {
          heading: "4. Contact Us for Refunds",
          paragraphs: [
            "To request a refund for an erroneous transaction, please reach out via email or phone using the details provided on our Contact Us page."
          ]
        }
      ]
    },
    mr: {
      title: "परतावा धोरण",
      lastUpdated: "शेवटचे अपडेट: ऑगस्ट २०२५",
      intro: "बालवीर गणेश मंडळ ही एक ना-नफा संस्था आहे. आपल्या ऐच्छिक देणग्या आमच्यासाठी मोलाच्या असून, त्याबद्दल आम्ही मनःपूर्वक आभारी आहोत.",
      sections: [
        {
          heading: "१. सामान्य धोरण",
          paragraphs: [
            "आमच्या वेबसाइटद्वारे ऑनलाइन केलेल्या सर्व देणग्या सामान्यतः परत न करण्यायोग्य असतात. आमचे उपक्रम आणि कार्यक्रम आमच्या भक्तांच्या औदार्यावर अवलंबून असल्याने, एकदा देणगी दिली की ती थेट आमच्या नियोजित सामाजिक उपक्रम आणि गणेशोत्सवाच्या तयारीत वापरली जाते."
          ]
        },
        {
          heading: "२. चुकीचे व्यवहार",
          paragraphs: [
            "ऑनलाइन देणगी देताना काही त्रुटी आढळल्यास (उदा., तुमच्या खात्यातून दोनदा पैसे कापले गेले किंवा चुकून जास्त रक्कम कापली गेली), कृपया व्यवहाराच्या ७ दिवसांच्या आत आमच्याशी संपर्क साधा.",
            "चुकीच्या व्यवहारांसाठी परतावा हा आमच्या अंतर्गत छाननीच्या अधीन राहील आणि पेमेंट गेटवे भागीदारासोबत व्यवहार त्रुटीची पडताळणी झाल्यानंतरच त्यावर प्रक्रिया केली जाईल."
          ]
        },
        {
          heading: "३. परतावा प्रक्रिया",
          paragraphs: [
            "मंजूर केलेले परतावे तुमच्या बँकेच्या धोरणांवर अवलंबून, ७-१० कामकाजाच्या दिवसांत पेमेंटच्या मूळ खात्यावर जमा केले जातील."
          ]
        },
        {
          heading: "४. परताव्यासाठी संपर्क साधा",
          paragraphs: [
            "चुकीच्या व्यवहारासाठी परताव्याची विनंती करण्यासाठी, कृपया आमच्या 'संपर्क साधा' पानावर दिलेल्या तपशीलांचा वापर करून ईमेल किंवा फोनद्वारे संपर्क साधा."
          ]
        }
      ]
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
            {t.lastUpdated}
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-8 md:p-12 rounded-2xl"
        >
          <div className="mb-10 text-center">
            <p className="text-lg text-[#be1111] font-medium max-w-2xl mx-auto leading-relaxed">
              {t.intro}
            </p>
          </div>

          {t.sections.map((section, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <h2 className="text-2xl font-bold text-[#4a0808] mb-4 font-serif">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-gray-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <Link href="/contact" className="inline-block px-8 py-3 bg-[#be1111] text-white rounded-full font-bold shadow-md hover:shadow-lg hover:bg-[#8b0000] transition-colors">
              {lang === 'en' ? 'Contact Support' : 'संपर्क साधा'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
