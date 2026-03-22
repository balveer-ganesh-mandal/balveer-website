"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function TermsConditions() {
  const { lang } = useLanguage();

  const content = {
    en: {
      title: "Terms & Conditions",
      lastUpdated: "Last Updated: August 2025",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          paragraphs: [
            "By accessing and using the Balveer Ganesh Mandal website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services."
          ]
        },
        {
          heading: "2. Website Usage",
          paragraphs: [
            "You agree to use the site only for lawful purposes. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website."
          ]
        },
        {
          heading: "3. Donations",
          paragraphs: [
            "All donations made through our website are voluntary. We appreciate your support, which helps in organizing the Ganeshotsav and conducting various social initiatives."
          ]
        },
        {
          heading: "4. Intellectual Property",
          paragraphs: [
            "The content on this website, including but not limited to the text, graphics, images, logos, and videos, is the property of Balveer Ganesh Mandal and is protected by applicable copyright and trademark law."
          ]
        },
        {
          heading: "5. Modifications",
          paragraphs: [
            "Balveer Ganesh Mandal reserves the right to revise these Terms & Conditions at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms & Conditions."
          ]
        }
      ]
    },
    mr: {
      title: "अटी आणि शर्ती",
      lastUpdated: "शेवटचे अपडेट: ऑगस्ट २०२५",
      sections: [
        {
          heading: "१. अटींची स्वीकृती",
          paragraphs: [
            "बालवीर गणेश मंडळ वेबसाइटवर प्रवेश करून आणि वापरून, तुम्ही या कराराच्या अटी आणि तरतुदींना बांधील असण्यास सहमत आहात. याव्यतिरिक्त, या वेबसाइटच्या विशिष्ट सेवा वापरताना, तुम्ही अशा सेवांना लागू असलेल्या कोणत्याही मार्गदर्शक तत्त्वांनुसार किंवा नियमांच्या अधीन असाल."
          ]
        },
        {
          heading: "२. वेबसाइट वापर",
          paragraphs: [
            "तुम्ही केवळ कायदेशीर हेतूंसाठी साइट वापरण्यास सहमत आहात. तुम्ही आमची वेबसाइट अशा कोणत्याही प्रकारे वापरू नये ज्यामुळे वेबसाइटचे नुकसान होईल किंवा वेबसाइटची उपलब्धता किंवा प्रवेशयोग्यता कमी होईल."
          ]
        },
        {
          heading: "३. देणग्या",
          paragraphs: [
            "आमच्या वेबसाइटद्वारे केलेल्या सर्व देणग्या ऐच्छिक आहेत. आम्ही तुमच्या पाठिंब्याची प्रशंसा करतो, ज्यामुळे गणेशोत्सव आयोजित करण्यात आणि विविध सामाजिक उपक्रम राबविण्यास मदत होते."
          ]
        },
        {
          heading: "४. बौद्धिक संपदा",
          paragraphs: [
            "या वेबसाइटवरील सामग्री, ज्यामध्ये मजकूर, ग्राफिक्स, प्रतिमा, लोगो आणि व्हिडिओ समाविष्ट आहेत (परंतु मर्यादित नाही), बालवीर गणेश मंडळाची मालमत्ता आहे आणि ती लागू कॉपीराइट आणि ट्रेडमार्क कायद्याद्वारे संरक्षित आहे."
          ]
        },
        {
          heading: "५. सुधारणा",
          paragraphs: [
            "बालवीर गणेश मंडळ कोणत्याही सूचनेशिवाय या अटी आणि शर्तींमध्ये सुधारणा करण्याचा अधिकार राखून ठेवते. ही वेबसाइट वापरून, तुम्ही या अटी आणि शर्तींच्या तत्कालीन वर्तमान आवृत्तीला बांधील असण्यास सहमत आहात."
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
