"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Calendar, Users, Heart, Trophy, Sparkles } from "lucide-react";

const content = {
  en: {
    title: "Our History",
    subtitle: "The Legacy of Balveer Ganesh Mandal (Chandicha Pawan Ganpati) — Since 1924",
    backToHome: "Back to Home",

    // Section 1 - Origins
    section1Title: "The Beginning — A Bond of Friendship",
    section1Text1: "Balveer Ganesh Mandal (Chandicha Pawan Ganpati) was born out of a deep friendship and shared devotion. The Mandal was started by a group of young friends during their high school days — Late Shri. Nimbadas Pimparkar, Shri. Rajabhau Dawale, Shri. Hande, and other like-minded companions who shared a common dream of celebrating Ganeshotsav in their community.",
    section1Text2: "What began as a youthful initiative quickly grew into something much larger. These founding members, still in their teens, pooled their resources and rallied the neighborhood to organize the very first Ganeshotsav celebrations. Their energy, dedication, and unwavering faith in Lord Ganesh laid the foundation for a Mandal that would stand the test of time for over a century.",
    section1Text3: "Their vision was simple yet powerful — to bring the community together through devotion, to celebrate with discipline and harmony, and to create a tradition that future generations would carry forward with pride.",
    section1Caption: "Where it all began — a bond of friendship and devotion",

    // Section 2 - Aajane's Murtis
    section2Title: "The Artistry of Shri. Aajane, Amravati",
    section2Text1: "One of the early hallmarks of Balveer Ganesh Mandal was its commitment to bringing the finest Ganesh murtis (idols) for the annual celebration. The Mandal established a cherished tradition of commissioning murtis from one of Amravati's most renowned sculptors — Shri. Aajane.",
    section2Text2: "Shri. Aajane was celebrated for his exquisite craftsmanship and attention to detail. His murtis were known throughout the region, and he took immense pride in his art — so much so that each idol bore his distinctive trademark signature: \"Aajane, Amravati\" — a hallmark of quality and devotion that devotees instantly recognized.",
    section2Text3: "Year after year, the beautifully sculpted murtis became a centerpiece of the Mandal's celebrations, drawing devotees from far and wide. This partnership between the Mandal and Shri. Aajane elevated the artistic standard of Ganeshotsav in Malkapur and set the tone for the Mandal's dedication to excellence in worship.",
    section2Caption: "The grand celebration tradition of our Mandal",

    // Section 3 - Golden Jubilee & Silver Idol
    section3Title: "The Golden Jubilee — A Silver Milestone",
    section3Text1: "The defining moment in the history of Balveer Ganesh Mandal came during its Golden Jubilee — the 50th anniversary celebration. To mark this historic milestone, the Mandal took a momentous decision that would forever change its identity: the purchase of a magnificent silver Ganesh idol, standing approximately 3 feet tall.",
    section3Text2: "The Silver Ganpati, as it came to be lovingly known, was acquired with great reverence and celebration. The Golden Jubilee festivities were grand and joyous — the entire community came together to celebrate this landmark achievement. The silver idol became a symbol of the Mandal's devotion, perseverance, and the collective faith of its members.",
    section3Text3: "To this day, the Silver Ganpati remains the crown jewel of Balveer Ganesh Mandal. It is the major attraction for all devotees during Ganeshotsav and the Visarjan Miravnuk (immersion procession). The Ganpati is considered immensely sacred and fulfilling — devotees believe that offering prayers to this silver idol brings blessings, peace, and the fulfillment of their heartfelt wishes.",

    // Section 4 - Downfall & Revival
    section4Title: "The Challenge & The Revival of 2022",
    section4Text1: "Like all great institutions, Balveer Ganesh Mandal too faced its share of challenges. After decades of glory, the Mandal went through a difficult phase lasting nearly 15 to 20 years. Both economic constraints and a decline in active participation took their toll. The celebrations, though continuing, were no longer at the grand scale that the Mandal was once known for.",
    section4Text2: "But the spirit of the Mandal could not be kept down for long. In 2022, a wave of youthful energy breathed new life into the organization. The young generation, in close association with the respected senior committee members, stepped up to revive the Mandal. They brought fresh ideas, modern thinking, and tireless enthusiasm while honoring the traditions and values laid down by the founders.",
    section4Text3: "This revival was not just about grand celebrations — it was about reclaiming the Mandal's identity, reconnecting with the community, and ensuring that the legacy of Late Shri. Nimbadas Pimparkar, Shri. Rajabhau Dawale, Shri. Hande, and all the founding members continues to inspire generations to come.",

    // Section 5 - Our Uniqueness
    section5Title: "What Makes Us Unique",
    section5Text1: "Balveer Ganesh Mandal has always been distinguished by its unique approach to celebrating Ganeshotsav. In an era where festivals are often associated with noise and chaos, our Mandal stands apart as a beacon of:",
    uniqueItems: [
      "Peace — Our celebrations are conducted in a serene and peaceful atmosphere, allowing devotees to connect with the divine in tranquility",
      "Discipline — Every aspect of the 10-day festival is organized with meticulous discipline and planning",
      "Silence & Harmony — We believe that true devotion comes from a calm heart, and our celebrations reflect this philosophy",
      "The Sacred Silver Idol — Our approximately 3-foot tall silver Ganesh idol remains the centerpiece and major attraction, revered by all devotees",
      "Community Bond — The Mandal's century-long journey is a testament to the power of unity, friendship, and shared faith"
    ],
    section5Text2: "The story of Balveer Ganesh Mandal is not just the story of a festival committee — it is the story of a group of high school friends whose devotion built a legacy that has endured for over a century. It is the story of a community, bound together by faith, love, and an unwavering commitment to celebrating Lord Ganesh with peace, purity, and pride.",

    // Timeline
    timelineTitle: "Key Milestones",
    milestones: [
      { year: "1924", text: "Mandal founded by Late Shri. Nimbadas Pimparkar, Shri. Rajabhau Dawale, Shri. Hande and friends during their high school days" },
      { year: "1930s–60s", text: "Tradition of commissioning exquisite murtis from renowned sculptor Shri. Aajane of Amravati, known for his signature mark" },
      { year: "~1974", text: "Golden Jubilee celebrated with great joy — the magnificent 3-foot silver Ganesh idol is acquired, becoming the Mandal's crown jewel" },
      { year: "2000s–2010s", text: "A challenging phase of 15–20 years with economic and manpower difficulties" },
      { year: "2022", text: "The youth, in collaboration with the senior committee, revive the Mandal to its former glory" },
    ],
  },
  mr: {
    title: "आमचा इतिहास",
    subtitle: "बालवीर गणेश मंडळ (चांदीचा पावन गणपती) चा वारसा — स्थापना : १९२४",
    backToHome: "मुख्यपृष्ठावर जा",

    // Section 1
    section1Title: "सुरुवात — मैत्रीचे बंध",
    section1Text1: "बालवीर गणेश मंडळ (चांदीचा पावन गणपती) हे गाढ मैत्री आणि समान भक्तीभावातून जन्मले. कै. श्री. निंबादास पिंपरकर, श्री. राजाभाऊ डवले, श्री. हांडे आणि इतर समविचारी मित्रांनी त्यांच्या शालेय जीवनातच या मंडळाची स्थापना केली — त्यांचे समाजात गणेशोत्सव साजरा करण्याचे एक समान स्वप्न होते.",
    section1Text2: "तरुण वयातील या उपक्रमाने लवकरच मोठे रूप धारण केले. हे संस्थापक सदस्य, अजूनही किशोरवयीन असताना, त्यांनी आपल्या साधनसामग्रीचा एकत्रित वापर केला आणि पहिल्या गणेशोत्सवाच्या आयोजनासाठी संपूर्ण परिसराला एकत्र आणले. त्यांची ऊर्जा, समर्पण आणि श्री गणेशावरील अतूट श्रद्धा यांनी एका शतकाहून अधिक काळ टिकणाऱ्या मंडळाचा पाया रचला.",
    section1Text3: "त्यांची दृष्टी साधी पण प्रभावी होती — भक्तीतून समुदायाला एकत्र आणणे, शिस्त आणि सुसंवादाने उत्सव साजरा करणे, आणि भावी पिढ्या अभिमानाने पुढे नेतील अशी परंपरा निर्माण करणे.",
    section1Caption: "जिथे सर्व सुरू झाले — मैत्री आणि भक्तीचे बंध",

    // Section 2
    section2Title: "श्री. आजने, अमरावती यांची कलाकुसर",
    section2Text1: "बालवीर गणेश मंडळाचे सुरुवातीचे एक प्रमुख वैशिष्ट्य म्हणजे वार्षिक उत्सवासाठी सर्वोत्तम गणेश मूर्ती आणण्याची बांधिलकी. मंडळाने अमरावतीचे प्रसिद्ध शिल्पकार श्री. आजाने यांच्याकडून मूर्ती बनवून घेण्याची एक जपलेली परंपरा स्थापन केली.",
    section2Text2: "श्री. आजने हे त्यांच्या अप्रतिम हस्तकलेसाठी आणि बारीक तपशिलांसाठी प्रसिद्ध होते. त्यांच्या मूर्ती संपूर्ण भागात ओळखल्या जात — आणि त्यांना त्यांच्या कलेचा इतका अभिमान होता की प्रत्येक मूर्तीवर त्यांची विशिष्ट स्वाक्षरी \"आजने, अमरावती\" असायची — गुणवत्ता आणि भक्तीचे प्रतीक जे भक्त लगेच ओळखत.",
    section2Text3: "वर्षानुवर्षे, या सुंदर कोरलेल्या मूर्ती मंडळाच्या उत्सवाचे मध्यवर्ती आकर्षण बनल्या, दूरदूरवरून भक्तांना आकर्षित करत. मंडळ आणि श्री. आजने यांच्यातील या नात्याने मलकापूरमधील गणेशोत्सवाचा कलात्मक दर्जा उंचावला.",
    section2Caption: "आमच्या मंडळाची भव्य उत्सव परंपरा",

    // Section 3
    section3Title: "सुवर्णमहोत्सव — एक चांदीचा टप्पा",
    section3Text1: "बालवीर गणेश मंडळाच्या इतिहासातील निर्णायक क्षण आला तो सुवर्णमहोत्सवाच्या वेळी — ५० व्या वर्धापनदिनाच्या उत्सवात. या ऐतिहासिक टप्प्याच्या निमित्ताने, मंडळाने एक महत्त्वपूर्ण निर्णय घेतला जो त्यांची ओळख कायमची बदलणार होता: अंदाजे ३ फूट उंचीच्या भव्य चांदीच्या गणेश मूर्तीची खरेदी.",
    section3Text2: "चांदीचा गणपती, ज्या नावाने तो प्रेमाने ओळखला जाऊ लागला, मोठ्या श्रद्धेने आणि उत्साहाने आणला गेला. सुवर्णमहोत्सव भव्य आणि आनंददायी होता — संपूर्ण समाज या ऐतिहासिक उपलब्धीचा उत्सव साजरा करण्यासाठी एकत्र आला. चांदीची मूर्ती मंडळाच्या भक्ती, चिकाटी आणि सदस्यांच्या सामूहिक श्रद्धेचे प्रतीक बनली.",
    section3Text3: "आजही, चांदीचा गणपती हा बालवीर गणेश मंडळाचा मुकुटमणी आहे. गणेशोत्सव आणि विसर्जन मिरवणुकीत तो सर्व भक्तांचे प्रमुख आकर्षण आहे. हा गणपती अत्यंत पवित्र आणि मनोकामना पूर्ण करणारा मानला जातो — भक्तांचा विश्वास आहे की या चांदीच्या मूर्तीसमोर प्रार्थना केल्यास आशीर्वाद, शांती आणि मनोकामनांची पूर्तता होते.",

    // Section 4
    section4Title: "आव्हान आणि २०२२ चे पुनरुत्थान",
    section4Text1: "सर्व महान संस्थांप्रमाणेच, बालवीर गणेश मंडळालाही आव्हानांचा सामना करावा लागला. दशकांच्या गौरवानंतर, मंडळ जवळपास १५ ते २० वर्षे एका कठीण टप्प्यातून गेले. आर्थिक अडचणी आणि सक्रिय सहभागात घट — या दोन्हींचा परिणाम झाला. उत्सव सुरू राहिले, पण मंडळ एकेकाळी ज्या भव्य पातळीसाठी ओळखले जायचे त्या पातळीवर ते राहिले नाहीत.",
    section4Text2: "पण मंडळाची भावना फार काळ दबलेली राहू शकत नव्हती. २०२२ मध्ये, तरुणाईच्या उर्जेने संघटनेत नवा प्राण फुंकला. तरुण पिढीने, अनुभवी ज्येष्ठ समिती सदस्यांच्या सहकार्याने, मंडळाला पुनरुज्जीवित करण्यासाठी पुढाकार घेतला. त्यांनी संस्थापकांनी घालून दिलेल्या परंपरा आणि मूल्यांचा सन्मान करत ताजे विचार, आधुनिक दृष्टीकोन आणि अथक उत्साह आणला.",
    section4Text3: "हे पुनरुत्थान केवळ भव्य उत्सवाबद्दल नव्हते — ते मंडळाची ओळख पुन्हा मिळवण्याबद्दल, समाजाशी पुन्हा जोडले जाण्याबद्दल, आणि कै. श्री. निंबादास पिंपरकर, श्री. राजाभाऊ डवले, श्री. हांडे आणि सर्व संस्थापक सदस्यांचा वारसा येणाऱ्या पिढ्यांना प्रेरणा देत राहील याची खात्री करण्याबद्दल होते.",

    // Section 5
    section5Title: "आमचे वेगळेपण",
    section5Text1: "बालवीर गणेश मंडळ नेहमीच गणेशोत्सव साजरा करण्याच्या आपल्या अनोख्या पद्धतीने वेगळे राहिले आहे. सण अनेकदा गोंगाट आणि गडबडीशी जोडले जातात अशा काळातही, आमचे मंडळ या गोष्टींचे प्रतीक म्हणून उभे आहे:",
    uniqueItems: [
      "शांतता — आमचा उत्सव शांत आणि सुखद वातावरणात साजरा केला जातो, ज्यामुळे भक्तांना निवांतपणे देवाशी जोडता येते",
      "शिस्त — १० दिवसीय उत्सवाचा प्रत्येक पैलू कसोशीने नियोजनबद्ध आणि शिस्तबद्ध पद्धतीने आयोजित केला जातो",
      "मौन आणि सुसंवाद — आमचा विश्वास आहे की खरी भक्ती शांत हृदयातून येते, आणि आमचा उत्सव हे तत्त्व प्रतिबिंबित करतो",
      "पवित्र चांदीची मूर्ती — आमची अंदाजे ३ फूट उंचीची चांदीची गणेश मूर्ती हे मध्यवर्ती आकर्षण आणि सर्व भक्तांचे श्रद्धास्थान",
      "समुदाय बंध — मंडळाचा शतकी प्रवास हा एकतेच्या, मैत्रीच्या आणि सामायिक श्रद्धेच्या सामर्थ्याचा पुरावा आहे"
    ],
    section5Text2: "बालवीर गणेश मंडळाची कथा ही केवळ एका उत्सव समितीची कथा नाही — ती शालेय मित्रांच्या एका गटाची कथा आहे ज्यांच्या भक्तीने शतकभर टिकणारा वारसा निर्माण केला. ती एका समुदायाची कथा आहे, जो श्रद्धा, प्रेम आणि शांतता, पवित्रता आणि अभिमानाने श्री गणेशाचा उत्सव साजरा करण्याच्या अटूट बांधिलकीने एकत्र बांधलेला आहे.",

    // Timeline
    timelineTitle: "महत्त्वाचे टप्पे",
    milestones: [
      { year: "१९२४", text: "कै. श्री. निंबादास पिंपरकर, श्री. राजाभाऊ डवले, श्री. हांडे आणि मित्रांनी शालेय जीवनातच मंडळाची स्थापना केली" },
      { year: "१९३०–६० चे दशक", text: "अमरावतीचे प्रसिद्ध शिल्पकार श्री. आजने यांच्याकडून सुंदर मूर्ती आणण्याची परंपरा — त्यांच्या विशिष्ट स्वाक्षरीसाठी प्रसिद्ध" },
      { year: "~१९७४", text: "सुवर्णमहोत्सव आनंदाने साजरा — भव्य ३ फूट उंचीच्या चांदीच्या गणेश मूर्तीची खरेदी, मंडळाचा मुकुटमणी" },
      { year: "२०००–२०१० चे दशक", text: "आर्थिक आणि मनुष्यबळाच्या अडचणींसह १५–२० वर्षांचा आव्हानात्मक टप्पा" },
      { year: "२०२२", text: "तरुणाईने ज्येष्ठ समितीच्या सहकार्याने मंडळाला पुन्हा पूर्ववैभवात आणले" },
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
                {t.section1Caption}
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

      {/* Section 2 - Aajane's Murtis */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#8b0000]/10 to-[#fceabb]/30 rounded-2xl -z-10" />
              <Image
                src="/mandal-modern.png"
                alt="Balveer Ganesh Mandal - Grand Celebrations"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl border-4 border-white w-full h-auto object-cover"
              />
              <p className="text-center text-xs text-gray-400 mt-2 italic">
                {t.section2Caption}
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

      {/* Section 3 - Golden Jubilee & Silver Idol */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#fef5f5] to-[#fff8f0]">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-red-50 rounded-full text-[#8b0000]"><Sparkles size={24} /></div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#4a0808]">{t.section3Title}</h2>
            </div>
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[#be1111] to-transparent rounded-full mx-auto" />
          </motion.div>
          <motion.div className="space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <p className="text-gray-600 leading-relaxed">{t.section3Text1}</p>
            <p className="text-gray-600 leading-relaxed">{t.section3Text2}</p>
            <p className="text-gray-600 leading-relaxed font-medium text-gray-700">{t.section3Text3}</p>
          </motion.div>
        </div>
      </section>

      {/* Section 4 - Challenge & Revival with Image */}
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
              <p className="text-gray-600 leading-relaxed">{t.section4Text2}</p>
              <p className="text-gray-600 leading-relaxed">{t.section4Text3}</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#fceabb]/30 to-[#8b0000]/10 rounded-2xl -z-10" />
              <Image
                src="/mandal-social.png"
                alt="Balveer Ganesh Mandal - Community Revival"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl border-4 border-white w-full h-auto object-cover"
              />
              <p className="text-center text-xs text-gray-400 mt-2 italic">
                {lang === 'en' ? 'The community that rebuilt together' : 'एकत्र येऊन पुन्हा उभारलेला समाज'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5 - Our Uniqueness */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#4a0808] via-[#8b0000] to-[#4a0808] text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#fceabb]">{t.section5Title}</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[#fceabb] to-transparent rounded-full mx-auto mt-4" />
          </motion.div>
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <p className="text-red-100 leading-relaxed text-center">{t.section5Text1}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {t.uniqueItems.map((item, i) => (
                <div key={i} className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex items-start gap-3 hover:bg-white/15 transition-colors ${i === t.uniqueItems.length - 1 && t.uniqueItems.length % 2 !== 0 ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''}`}>
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
