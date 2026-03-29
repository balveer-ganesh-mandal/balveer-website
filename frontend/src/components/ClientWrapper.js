"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy_client_id_during_build'}>
        <AuthProvider>
          <LanguageProvider>
            {!isAdminRoute && <Navbar />}
            <div className={isAdminRoute ? "" : "pt-[65px] md:pt-[81px]"}>
              {children}
            </div>
            {!isAdminRoute && <Footer />}
          </LanguageProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}
