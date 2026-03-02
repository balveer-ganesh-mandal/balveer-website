"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Calendar, Users, Heart, Trophy } from "lucide-react";

const content = {
  en: {
    title: "Our History",
    subtitle: "The Legacy of Balveer Ganesh Mandal (Chandicha Pawan Ganpati)",
    backToHome: "Back to Home",

    // Section 1 - Origins
    section1Title: "The Beginning — 1924",
    section1Text1: "Balveer Ganesh Mandal (Chandicha Pawan Ganpati) was established in 1924 in Malkapur, Maharashtra, during the era of the Indian independence movement. Inspired by Lokmanya Tilak's vision of using Ganeshotsav as a way to unite communities, a group of young, passionate devotees came together to form this Mandal.",
    section1Text2: "In its earliest days, the celebrations were humble yet deeply spiritual. A small clay idol was worshipped under a makeshift pandal made of cloth and bamboo, surrounded by oil lamps and marigold garlands. The entire neighborhood would gather, sharing prasad and singing bhajans late into the night.",
    section1Text3: "What set Balveer Ganesh Mandal apart was its founding principle — that Ganeshotsav should not only be a religious festival but also serve as a platform for social upliftment and community bonding.",

    // Section 2 - Growth
    section2Title: "Growth Through the Decades",
    section2Text1: "Over the decades, the Mandal grew from a small neighborhood gathering to one of Malkapur's most respected cultural institutions. Through the 1950s and 60s, the celebrations became grander — larger idols, beautifully decorated pandals, and cultural programs featuring local artists became the hallmark of the Mandal.",
    section2Text2: "By the 1980s and 90s, Balveer Ganesh Mandal had established itself as a cornerstone of community life. The annual Ganeshotsav became a 10-day extravaganza with devotional music, dance performances, dramas, and competitions that brought together people from all walks of life.",
    section2Text3: "Generation after generation, families have passed down their involvement, making the Mandal a multi-generational tradition. Many of today's active members are the grandchildren and great-grandchildren of the founding members.",

    // Section 3 - Modern Era
    section3Title: "The Modern Era — Today",
    section3Text1: "Today, Balveer Ganesh Mandal stands as a symbol of devotion, unity, and social responsibility. Our celebrations have embraced modern technology — with LED-lit pandals, live streaming of aarti and events, and a fully functional website to keep our community connected.",
    section3Text2: "The Mandal now celebrates both Ganeshotsav and Ganesh Jayanti with equal fervor. Our pandal decorations have won numerous awards, and our visarjan processions are among the most vibrant in the region.",
    section3Text3: "But beyond the festivities, what truly defines us is our commitment to our community. From organizing blood donation camps and medical check-up drives to supporting education for underprivileged children, the Mandal has always believed that seva (service) is the highest form of devotion.",

    // Section 4 - Social Work
    section4Title: "Social Service & Community Impact",
    section4Text1: "The mandate of social service has been woven into the fabric of Balveer Ganesh Mandal from day one. Our key initiatives include:",
    socialItems: [
      "Annual Maha Raktadan Shibir (mega blood donation camp) in collaboration with local hospitals",
      "Annadaan (food distribution) drives during festivals and natural calamities",
      "Educational support and scholarship programs for students from economically weaker families",
      "Health awareness camps including eye check-ups and dental care for senior citizens",
      "Environmental initiatives like tree plantations and eco-friendly Ganpati idol promotion"
    ],
    section4Text2: "Through these efforts, the Mandal has touched thousands of lives over the past century, truly embodying the spirit of 'Sarve Bhavantu Sukhinah' — May all beings be happy.",

    // Section 5 - Vision
    section5Title: "Our Vision for the Future",
    section5Text1: "As we approach our centennial year, Balveer Ganesh Mandal looks to the future with renewed energy and purpose. Our vision is to:",
    visionItems: [
      "Preserve and promote our rich cultural heritage while embracing modern methods of community engagement",
      "Expand our social service programs to reach more people in need",
      "Create a digital archive of our 100-year history for future generations",
      "Build stronger connections with devotees worldwide through technology",
      "Inspire the youth to carry forward the legacy of devotion and service"
    ],
    section5Text2: "The story of Balveer Ganesh Mandal is not just the story of a festival committee — it is the story of a community, bound together by faith, love, and an unwavering commitment to the greater good.",

    // Timeline
    timelineTitle: "Key Milestones",
    milestones: [
      { year: "1924", text: "Mandal established by founding devotees in Malkapur" },
      { year: "1950s", text: "First decorated pandal with cultural programs" },
      { year: "1980s", text: "10-day celebration tradition with grand processions" },
      { year: "2000s", text: "Social service initiatives formalized — blood camps, annadaan" },
      { year: "2020s", text: "Digital transformation — website, live streaming, online donations" },
    ],
  },
  mr: {
    title: "आमचा इतिहास",
    subtitle: "बालवीर गणेश मंडळ (चंडीचा पावन गणपती) चा वारसा",
    backToHome: "मुख्यपृष्ठावर जा",

    // Section 1
    section1Title: "सुरुवात — १९२४",
    section1Text1: "बालवीर गणेश मंडळ (चंडीचा पावन गणपती) ची स्थापना १९२४ साली मलकापूर, महाराष्ट्र येथे झाली. भारतीय स्वातंत्र्य चळवळीच्या काळात लोकमान्य टिळकांच्या प्रेरणेने, समाजाला एकत्र आणण्यासाठी गणेशोत्सवाचा वापर करण्याच्या दृष्टीकोनातून, तरुण आणि समर्पित भक्तांच्या एका गटाने हे मंडळ स्थापन केले.",
    section1Text2: "सुरुवातीच्या दिवसांमध्ये उत्सव साधा पण अत्यंत आध्यात्मिक होता. कपड्याच्या आणि बांबूच्या तात्पुरत्या मंडपात एका लहान मातीच्या मूर्तीची पूजा केली जायची, तेलाच्या दिव्यांची आणि झेंडूच्या हारांची शोभा असायची. संपूर्ण परिसरातील लोक एकत्र येऊन प्रसाद वाटत आणि रात्री उशिरापर्यंत भजने गात.",
    section1Text3: "बालवीर गणेश मंडळाचे वैशिष्ट्य म्हणजे त्याचे संस्थापक तत्त्व — गणेशोत्सव केवळ धार्मिक सण नसून तो सामाजिक उन्नती आणि समुदाय बंधनाचे व्यासपीठ असावे.",

    // Section 2
    section2Title: "दशकांमधून वाढ",
    section2Text1: "दशकांच्या कालावधीत, मंडळ एका लहान शेजारच्या मेळाव्यापासून मलकापूरच्या सर्वात आदरणीय सांस्कृतिक संस्थांपैकी एक बनले. १९५०-६० च्या दशकात उत्सव अधिक भव्य झाले — मोठ्या मूर्ती, सुंदर सजवलेले मंडप आणि स्थानिक कलाकारांच्या सांस्कृतिक कार्यक्रमांनी मंडळाची ओळख बनवली.",
    section2Text2: "१९८०-९० च्या दशकापर्यंत, बालवीर गणेश मंडळ सामुदायिक जीवनाचा आधारस्तंभ म्हणून स्थापित झाले. वार्षिक गणेशोत्सव हा भक्तिसंगीत, नृत्य, नाटके आणि स्पर्धांसह १० दिवसांचा महोत्सव बनला, जो सर्व स्तरातील लोकांना एकत्र आणतो.",
    section2Text3: "पिढ्यानपिढ्या कुटुंबांनी त्यांचा सहभाग पुढे चालवला, ज्यामुळे मंडळ एक बहु-पिढी परंपरा बनली. आजचे अनेक सक्रिय सदस्य हे संस्थापक सदस्यांचे नातवंडे आणि पणतवंडे आहेत.",

    // Section 3
    section3Title: "आधुनिक युग — आज",
    section3Text1: "आज, बालवीर गणेश मंडळ भक्ती, एकता आणि सामाजिक जबाबदारीचे प्रतीक म्हणून उभे आहे. आमच्या उत्सवांनी आधुनिक तंत्रज्ञान स्वीकारले आहे — LED प्रकाशित मंडप, आरती आणि कार्यक्रमांचे लाइव्ह स्ट्रीमिंग, आणि आमच्या समुदायाला जोडलेले ठेवण्यासाठी पूर्ण कार्यक्षम वेबसाइट.",
    section3Text2: "मंडळ आता गणेशोत्सव आणि गणेश जयंती दोन्ही समान उत्साहाने साजरे करते. आमच्या मंडपाच्या सजावटीने अनेक पुरस्कार जिंकले आहेत, आणि आमच्या विसर्जन मिरवणुका या भागातील सर्वात चैतन्यमय आहेत.",
    section3Text3: "पण उत्सवांपलीकडे, आम्हाला खरोखर वेगळे करणारी गोष्ट म्हणजे आमची समुदायाप्रती बांधिलकी. रक्तदान शिबिरे आणि आरोग्य तपासणी मोहिमांपासून ते वंचित मुलांच्या शिक्षणाला पाठबळ देण्यापर्यंत, मंडळाने नेहमी सेवा ही भक्तीचे सर्वोच्च रूप मानले आहे.",

    // Section 4
    section4Title: "सामाजिक कार्य आणि समुदाय प्रभाव",
    section4Text1: "सामाजिक सेवेचा आदेश पहिल्या दिवसापासून बालवीर गणेश मंडळाच्या कार्यात विणला गेला आहे. आमच्या प्रमुख उपक्रमांमध्ये:",
    socialItems: [
      "स्थानिक रुग्णालयांच्या सहकार्याने वार्षिक महा रक्तदान शिबिर",
      "सणांमध्ये आणि नैसर्गिक आपत्तींमध्ये अन्नदान मोहिमा",
      "आर्थिकदृष्ट्या दुर्बल कुटुंबातील विद्यार्थ्यांसाठी शैक्षणिक मदत आणि शिष्यवृत्ती कार्यक्रम",
      "ज्येष्ठ नागरिकांसाठी डोळे तपासणी आणि दंत काळजीसह आरोग्य जागृती शिबिरे",
      "वृक्षारोपण आणि पर्यावरण पूरक गणपती मूर्ती प्रोत्साहनासारखे पर्यावरणीय उपक्रम"
    ],
    section4Text2: "गेल्या शतकभरात या प्रयत्नांद्वारे, मंडळाने हजारो लोकांच्या जीवनाला स्पर्श केला आहे, 'सर्वे भवन्तु सुखिनः' या भावनेचे खरे मूर्तिमंत रूप.",

    // Section 5
    section5Title: "भविष्यासाठीची दृष्टी",
    section5Text1: "आमच्या शतकपूर्तीच्या वर्षाकडे वाटचाल करत असताना, बालवीर गणेश मंडळ नव्या ऊर्जेने आणि उद्देशाने भविष्याकडे पाहत आहे. आमची दृष्टी:",
    visionItems: [
      "समुदाय सहभागाच्या आधुनिक पद्धती स्वीकारतानाच आमचा समृद्ध सांस्कृतिक वारसा जतन आणि प्रोत्साहन देणे",
      "अधिकाधिक गरजू लोकांपर्यंत पोहोचण्यासाठी सामाजिक सेवा कार्यक्रमांचा विस्तार करणे",
      "भावी पिढ्यांसाठी आमच्या १०० वर्षांच्या इतिहासाचे डिजिटल संग्रहण तयार करणे",
      "तंत्रज्ञानाद्वारे जगभरातील भक्तांशी मजबूत संबंध निर्माण करणे",
      "भक्ती आणि सेवेचा वारसा पुढे नेण्यासाठी तरुणांना प्रेरित करणे"
    ],
    section5Text2: "बालवीर गणेश मंडळाची कथा ही केवळ एका उत्सव समितीची कथा नाही — ती एका समुदायाची कथा आहे, जो श्रद्धा, प्रेम आणि व्यापक हिताप्रती अटूट बांधिलकीने एकत्र बांधलेला आहे.",

    // Timeline
    timelineTitle: "महत्त्वाचे टप्पे",
    milestones: [
      { year: "१९२४", text: "मलकापूर मध्ये संस्थापक भक्तांनी मंडळाची स्थापना" },
      { year: "१९५०चे दशक", text: "सांस्कृतिक कार्यक्रमांसह पहिला सजावटीचा मंडप" },
      { year: "१९८०चे दशक", text: "भव्य मिरवणुकांसह १० दिवसीय उत्सवाची परंपरा" },
      { year: "२०००चे दशक", text: "सामाजिक सेवा उपक्रम — रक्तदान शिबिर, अन्नदान" },
      { year: "२०२०चे दशक", text: "डिजिटल परिवर्तन — वेबसाइट, लाइव्ह स्ट्रीमिंग, ऑनलाइन दान" },
    ],
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function About() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <main className="relative min-h-screen bg-[#fffdfc] text-gray-800 font-sans overflow-hidden">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#4a0808] via-[#8b0000] to-[#4a0808] text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("/cpg.png")', backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-[#fceabb] hover:text-white text-sm font-medium mb-8 transition-colors">
              <ArrowLeft size={16} /> {t.backToHome}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#fceabb] drop-shadow-lg">
              {t.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-red-100 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
            <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#fceabb] to-transparent rounded-full mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Section 1 - Origins with Image */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 rounded-full text-[#8b0000]"><Calendar size={24} /></div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#4a0808]">{t.section1Title}</h2>
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-[#be1111] to-transparent rounded-full" />
              <p className="text-gray-600 leading-relaxed">{t.section1Text1}</p>
              <p className="text-gray-600 leading-relaxed">{t.section1Text2}</p>
              <p className="text-gray-600 leading-relaxed">{t.section1Text3}</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#fceabb]/30 to-[#8b0000]/10 rounded-2xl -z-10" />
              <Image
                src="/mandal-early.png"
                alt="Balveer Ganesh Mandal - Early Days"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl border-4 border-white w-full h-auto object-cover"
              />
              <p className="text-center text-xs text-gray-400 mt-2 italic">
                {lang === 'en' ? 'The humble beginnings of our Mandal' : 'आमच्या मंडळाची साधी सुरुवात'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#fef5f5] to-[#fff8f0]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-bold font-serif text-[#4a0808] text-center mb-12"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          >
            {t.timelineTitle}
          </motion.h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8b0000] via-[#be1111] to-[#fceabb]" />

            {t.milestones.map((m, i) => (
              <motion.div
                key={i}
                className={`relative flex items-start mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, x: i % 2 === 0 ? -30 : 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.1 } } }}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#8b0000] rounded-full border-4 border-white shadow-lg z-10" style={{ top: '6px' }} />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className={`bg-white p-5 rounded-xl shadow-md border border-red-50 hover:shadow-lg transition-shadow ${i % 2 === 0 ? 'md:ml-auto' : ''}`} style={{ maxWidth: '400px' }}>
                    <span className="text-[#8b0000] font-bold text-lg font-serif">{m.year}</span>
                    <p className="text-gray-600 text-sm mt-1">{m.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 - Growth */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#8b0000]/10 to-[#fceabb]/30 rounded-2xl -z-10" />
              <Image
                src="/mandal-modern.png"
                alt="Balveer Ganesh Mandal - Modern Celebration"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl border-4 border-white w-full h-auto object-cover"
              />
              <p className="text-center text-xs text-gray-400 mt-2 italic">
                {lang === 'en' ? 'Grand celebration with our community' : 'आमच्या समाजासोबत भव्य उत्सव'}
              </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 rounded-full text-[#8b0000]"><Trophy size={24} /></div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#4a0808]">{t.section2Title}</h2>
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-[#be1111] to-transparent rounded-full" />
              <p className="text-gray-600 leading-relaxed">{t.section2Text1}</p>
              <p className="text-gray-600 leading-relaxed">{t.section2Text2}</p>
              <p className="text-gray-600 leading-relaxed">{t.section2Text3}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Modern Era */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#fef5f5] to-[#fff8f0]">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-red-50 rounded-full text-[#8b0000]"><Users size={24} /></div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#4a0808]">{t.section3Title}</h2>
            </div>
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[#be1111] to-transparent rounded-full mx-auto" />
          </motion.div>
          <motion.div className="space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <p className="text-gray-600 leading-relaxed">{t.section3Text1}</p>
            <p className="text-gray-600 leading-relaxed">{t.section3Text2}</p>
            <p className="text-gray-600 leading-relaxed">{t.section3Text3}</p>
          </motion.div>
        </div>
      </section>

      {/* Section 4 - Social Work with Image */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 rounded-full text-[#8b0000]"><Heart size={24} /></div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#4a0808]">{t.section4Title}</h2>
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-[#be1111] to-transparent rounded-full" />
              <p className="text-gray-600 leading-relaxed">{t.section4Text1}</p>
              <ul className="space-y-3 mt-4">
                {t.socialItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#8b0000] to-[#be1111] rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">{i + 1}</span>
                    <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">{t.section4Text2}</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#fceabb]/30 to-[#8b0000]/10 rounded-2xl -z-10" />
              <Image
                src="/mandal-social.png"
                alt="Balveer Ganesh Mandal - Social Work"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl border-4 border-white w-full h-auto object-cover"
              />
              <p className="text-center text-xs text-gray-400 mt-2 italic">
                {lang === 'en' ? 'Community service initiatives' : 'सामाजिक सेवा उपक्रम'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5 - Vision */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#4a0808] via-[#8b0000] to-[#4a0808] text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#fceabb]">{t.section5Title}</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[#fceabb] to-transparent rounded-full mx-auto mt-4" />
          </motion.div>
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <p className="text-red-100 leading-relaxed text-center">{t.section5Text1}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {t.visionItems.map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex items-start gap-3 hover:bg-white/15 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#fceabb] rounded-full flex items-center justify-center text-[#4a0808] text-sm font-bold">{i + 1}</span>
                  <span className="text-red-50 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-red-100 leading-relaxed text-center mt-8 italic text-lg">{t.section5Text2}</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#df2f2f] hover:bg-[#b01e1e] text-white px-8 py-3 rounded-lg text-base font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-[0_10px_20px_rgba(185,28,28,0.3)] hover:-translate-y-1 border border-red-700"
          >
            <ArrowLeft size={18} /> {t.backToHome}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}