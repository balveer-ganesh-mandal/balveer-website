"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const { lang } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: August 2025",
      sections: [
        {
          heading: "1. Information We Collect",
          paragraphs: [
            "Balveer Ganesh Mandal (Chandicha Pawan Ganpati) (\"we,\" \"us,\" or \"our\") respects your privacy. When you visit our website, register as a volunteer, or make a donation, we may collect personal information such as your name, email address, phone number, and payment details."
          ]
        },
        {
          heading: "2. How We Use Your Information",
          paragraphs: [
            "We use the information we collect to:",
            "• Process donations and issue receipts.",
            "• Communicate with you about upcoming events, meetings, and volunteer opportunities.",
            "• Improve our website and services."
          ]
        },
        {
          heading: "3. Information Sharing",
          paragraphs: [
            "We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or processing donations, so long as those parties agree to keep this information confidential."
          ]
        },
        {
          heading: "4. Data Security",
          paragraphs: [
            "We implement a variety of security measures to maintain the safety of your personal information when you place an order, enter, submit, or access your personal information."
          ]
        },
        {
          heading: "5. Contact Us",
          paragraphs: [
            "If you have any questions regarding this Privacy Policy, you may contact us using the information on our Contact Us page."
          ]
        }
      ]
    },
    mr: {
      title: "गोपनीयता धोरण",
      lastUpdated: "शेवटचे अपडेट: ऑगस्ट २०२५",
      sections: [
        {
          heading: "१. आम्ही गोळा करत असलेली माहिती",
          paragraphs: [
            "बालवीर गणेश मंडळ (चांदीचा पावन गणपती) तुमच्या गोपनीयतेचा आदर करते. जेव्हा तुम्ही आमच्या वेबसाइटला भेट देता, स्वयंसेवक म्हणून नोंदणी करता किंवा देणगी देता, तेव्हा आम्ही तुमचे नाव, ईमेल पत्ता, फोन नंबर आणि पेमेंट तपशील यासारखी वैयक्तिक माहिती गोळा करू शकतो."
          ]
        },
        {
          heading: "२. आम्ही तुमची माहिती कशी वापरतो",
          paragraphs: [
            "आम्ही गोळा केलेली माहिती खालील कारणांसाठी वापरतो:",
            "• देणग्यांवर प्रक्रिया करण्यासाठी आणि पावत्या देण्यासाठी.",
            "• आगामी कार्यक्रम, बैठका आणि स्वयंसेवक संधींबद्दल तुमच्याशी संवाद साधण्यासाठी.",
            "• आमची वेबसाइट आणि सेवा सुधारण्यासाठी."
          ]
        },
        {
          heading: "३. माहिती सामायिक करणे",
          paragraphs: [
            "आम्ही तुमची वैयक्तिकरित्या ओळखण्यायोग्य माहिती बाहेरील पक्षांना विकत नाही, व्यापार करत नाही किंवा हस्तांतरित करत नाही. यात आमच्या वेबसाइटचे संचालन, आमचा व्यवसाय व्यवस्थापित करण्यासाठी किंवा देणग्यांवर प्रक्रिया करण्यासाठी मदत करणाऱ्या विश्वासू तृतीय पक्षांचा समावेश नाही, जोपर्यंत ते पक्ष ही माहिती गोपनीय ठेवण्यास सहमत आहेत."
          ]
        },
        {
          heading: "४. डेटा सुरक्षा",
          paragraphs: [
            "तुम्ही तुमची वैयक्तिक माहिती सबमिट करता किंवा त्यात प्रवेश करता तेव्हा तुमच्या वैयक्तिक माहितीची सुरक्षितता राखण्यासाठी आम्ही विविध सुरक्षा उपाय लागू करतो."
          ]
        },
        {
          heading: "५. आमच्याशी संपर्क साधा",
          paragraphs: [
            "या गोपनीयता धोरणाबाबत काही प्रश्न असल्यास, तुम्ही आमच्या 'संपर्क साधा' पानावरील माहिती वापरून आमच्याशी संपर्क साधू शकता."
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
        </motion.div>
      </div>
    </div>
  );
}
