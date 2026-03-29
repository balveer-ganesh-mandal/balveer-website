import { Yatra_One, Mukta } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "Balveer Ganesh Mandal",
  description: "Balveer Ganesh Mandal (Chandicha Pawan Ganpati) - Celebrating tradition and devotion.",
  openGraph: {
    title: "Balveer Ganesh Mandal",
    description: "Balveer Ganesh Mandal (Chandicha Pawan Ganpati) - Celebrating tradition and devotion.",
    url: "/",
    siteName: "Balveer Ganesh Mandal",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "mr_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balveer Ganesh Mandal",
    description: "Balveer Ganesh Mandal (Chandicha Pawan Ganpati) - Celebrating tradition and devotion.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${yatra.variable} ${mukta.variable}`}>
      <body className="font-sans antialiased bg-[#fffdfc] text-gray-800 transition-colors duration-300">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
