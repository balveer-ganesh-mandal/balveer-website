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

export const metadata = {
  metadataBase: new URL("https://www.balveerganeshmandal.online"),
  title: {
    default: "Balveer Ganesh Mandal | Malkapur | बालवीर गणेश मंडळ",
    template: "%s | Balveer Ganesh Mandal"
  },
  description: "बालवीर गणेश मंडळ (चांदीचा पावन गणपती) - Balveer Ganesh Mandal, Malkapur. Celebrating tradition and devotion since 1924. One of the oldest and most revered Ganeshotsav Mandals in Malkapur.",
  keywords: [
    "Balveer Ganesh Mandal",
    "Balveer Ganesh Mandal Malkapur",
    "बालवीर गणेश मंडळ",
    "बालवीर गणेश मंडळ मलकापूर",
    "Chandicha Pavan Ganpati",
    "Malkapur Ganeshotsav",
    "Ganeshotsav Malkapur",
    "Ganesh Chaturthi Malkapur",
    "Oldest Ganesh Mandal Malkapur"
  ],
  authors: [{ name: "Balveer Ganesh Mandal" }],
  creator: "Balveer Ganesh Mandal",
  publisher: "Balveer Ganesh Mandal",
  alternates: {
    canonical: "https://www.balveerganeshmandal.online",
  },
  openGraph: {
    title: "बालवीर गणेश मंडळ | Balveer Ganesh Mandal, Malkapur",
    description: "बालवीर गणेश मंडळ (चांदीचा पावन गणपती) - Celebrating tradition and devotion since 1924. Join us in our cultural and social work.",
    url: "https://www.balveerganeshmandal.online",
    siteName: "Balveer Ganesh Mandal",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Balveer Ganesh Mandal, Malkapur",
      },
    ],
    locale: "mr_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "बालवीर गणेश मंडळ | Balveer Ganesh Mandal",
    description: "बालवीर गणेश मंडळ (चांदीचा पावन गणपती) - Celebrating tradition and devotion since 1924.",
    images: ["/twitter-image.jpg"],
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
