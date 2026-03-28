"use client";

import { motion } from "framer-motion";
import { Heart, HandHelping, HeartHandshake, Wheelchair, Accessibility } from "lucide-react";

export default function SocialWork() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 pt-28">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold mb-6"
          >
            <HandHelping className="w-5 h-5" />
            <span>Community Service</span>
          </motion.div>

          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            सामाजिक उपक्रम <span className="text-orange-500">Social Work</span>
          </motion.h1>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="relative max-w-4xl mx-auto"
          >
            <div className="absolute top-0 left-0 text-6xl text-orange-200 dark:text-orange-900/50 -translate-x-4 -translate-y-4 font-serif">"</div>
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed px-8">
              True wealth is not measured in money, but in the lives we touch and the smiles we create. Let's walk this path of compassion together, lifting those who need it most.
            </p>
            <div className="absolute bottom-0 right-0 text-6xl text-orange-200 dark:text-orange-900/50 translate-x-4 translate-y-8 font-serif">"</div>
          </motion.div>
        </div>

        {/* Description Section */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <HeartHandshake className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Initiative</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We believe that true devotion to Bappa is expressed through service to humanity. Recognizing the challenges faced by the elderly, injured, and differently-abled in our community, we have started a modest but meaningful movement to provide essential mobility aids completely free of charge.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                If you or anyone you know requires a wheelchair or walker for temporary or long-term use, please reach out to us. This is our small step towards ensuring dignity, independence, and a better quality of life for all.
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
               <div className="relative w-full max-w-sm aspect-square bg-gradient-to-br from-orange-100 to-orange-50 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center border-8 border-white dark:border-gray-900 shadow-xl">
                  <HandHelping className="w-32 h-32 text-orange-500/50" />
                  <div className="absolute inset-0 bg-orange-500/10 dark:bg-orange-500/5 rounded-full animate-pulse"></div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Equipment Available */}
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Available Equipment</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Wheelchairs */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
                {/* Background pattern */}
                <div className="absolute top-0 right-0 opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-700 -translate-y-1/2 translate-x-1/4">
                <Wheelchair className="w-96 h-96" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[250px]">
                <div>
                    <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6 shadow-inner">
                        <Wheelchair className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3 tracking-wide">Wheelchairs</h3>
                    <p className="text-orange-100 text-lg max-w-[80%] leading-snug">Comfortable and foldable manual wheelchairs available for community use to ease mobility challenges.</p>
                </div>
                <div className="flex items-end justify-between mt-8">
                    <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-black tracking-tighter shadow-sm">2</span>
                        <span className="text-xl font-medium text-orange-200">Units</span>
                    </div>
                    <span className="bg-white text-orange-600 px-5 py-2.5 rounded-full text-sm font-bold shadow-md">Available Now</span>
                </div>
                </div>
            </motion.div>

            {/* Walkers */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
                {/* Background pattern */}
                <div className="absolute top-0 right-0 opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-700 -translate-y-1/2 translate-x-1/4">
                    <Accessibility className="w-96 h-96" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between min-h-[250px]">
                <div>
                    <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6 shadow-inner">
                        <Accessibility className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3 tracking-wide">Medical Walkers</h3>
                    <p className="text-indigo-100 text-lg max-w-[80%] leading-snug">Lightweight, sturdy medical walkers providing essential support and balance for recovery or aging.</p>
                </div>
                <div className="flex items-end justify-between mt-8">
                    <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-black tracking-tighter shadow-sm">3</span>
                        <span className="text-xl font-medium text-indigo-200">Units</span>
                    </div>
                    <span className="bg-white text-indigo-600 px-5 py-2.5 rounded-full text-sm font-bold shadow-md">Available Now</span>
                </div>
                </div>
            </motion.div>
            </div>
        </div>

        {/* Special Thanks Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className="bg-pink-500/10 dark:bg-pink-500/5 py-10 px-8 border-b border-pink-100 dark:border-gray-700 flex flex-col items-center justify-center text-center relative overflow-hidden">
             {/* Decorative hearts */}
             <Heart className="absolute top-4 left-10 w-8 h-8 text-pink-300/40 -rotate-12" />
             <Heart className="absolute bottom-4 right-10 w-12 h-12 text-pink-300/40 rotate-12" />
             
             <div className="p-4 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-6">
                <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
             </div>
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Special Thanks & Gratitude</h2>
             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl font-medium">This noble initiative is the result of generous hearts who stepped forward to make a tangible difference in society.</p>
          </div>
          <div className="p-8 md:p-12 text-center bg-gray-50/50 dark:bg-gray-800/50">
             <div className="inline-block">
                 <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-pink-500 pl-6 text-left">
                    "We extend our deepest and most heartfelt gratitude to all the donors and unsung heroes who contributed to this cause. Because of your kindness, someone will move freely today; someone will rediscover their independence. Your contribution is a beacon of hope."
                 </p>
             </div>
             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600 max-w-lg mx-auto">
                <p className="font-semibold text-gray-900 dark:text-white">With heartfelt appreciation,</p>
                <p className="text-orange-500 font-bold mt-1">Balveer Ganesh Mandal Committee</p>
             </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <div className="mt-16 text-center">
             <p className="text-gray-600 dark:text-gray-400 mb-4">Would you like to contribute to this initiative?</p>
             <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-gray-200 dark:shadow-none">
                 Contact Us to Donate
             </button>
        </div>
      </div>
    </div>
  );
}
