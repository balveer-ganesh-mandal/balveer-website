"use client";

import { Yatra_One, Mukta } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const yatra = Yatra_One({
  weight: '400',
  subsets: ["devanagari", "latin"],
  variable: "--font-yatra",
  display: 'swap',
});

const mukta = Mukta({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["devanagari", "latin"],
  variable: "--font-mukta",
  display: 'swap',
});

// Note: Metadata cannot be exported from a Client Component. 
// Standard SEO metadata should ideally be moved to `app/page.js` if necessary,
// but for this build we'll let Next.js infer the defaults correctly.

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning className={`${yatra.variable} ${mukta.variable}`}>
      <body className="font-sans antialiased bg-[#fffdfc] text-gray-800 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <LanguageProvider>
              {!isAdminRoute && <Navbar />}
              <div className={isAdminRoute ? "" : "pt-[65px] md:pt-[81px]"}>
                {children}
              </div>
              {!isAdminRoute && <Footer />}
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
