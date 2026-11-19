import { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import NextAuthProvider from "./NextAuthProvider";
import SiteLayout from "./SiteLayout";
import StructuredData from "@/components/StructuredData";
import NavigationProgressBar from "@/components/NavigationProgressBar";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#059669",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://srisadgurutoursandtravels.com"),
  title: {
    default: "Sri Sadhguru Tours & Travels | 24x7 Cabs, Airport Taxi & Car Rentals in Hyderabad",
    template: "%s | Sri Sadhguru Travels Hyderabad",
  },
  description:
    "Book 24x7 cabs, airport taxi to Shamshabad RGIA, outstation pilgrimage packages to Srisailam & Tirupati, and luxury buses in Kukatpally, KPHB, Miyapur, Hitec City, Hyderabad. 50+ commercial vehicles: Swift Dzire, Innova Crysta, Tempo Traveller & AC Coaches. Proprietor: Sri Rathan Kanna. Call +91 81061 17704.",
  keywords: [
    "cabs in kukatpally",
    "cabs in hyderabad",
    "kukatpally taxi service",
    "shamshabad airport taxi",
    "hyderabad airport cab booking",
    "innova crysta car rental hyderabad",
    "swift dzire rental hyderabad",
    "tempo traveller 12 seater hyderabad",
    "tempo traveller 17 seater hyderabad",
    "hyderabad to srisailam car rental",
    "hyderabad to tirupati travels",
    "hyderabad to shirdi cab package",
    "kphb colony car rental",
    "miyapur cab services",
    "hitec city cab booking",
    "sri sadhguru travels",
    "sri sadhguru tours and travels kukatpally",
    "rathan kanna travels",
    "outstation cabs hyderabad",
    "wedding bus rental hyderabad",
    "corporate employee transport hyderabad",
  ],
  authors: [{ name: "Sri Rathan Kanna", url: "https://srisadgurutoursandtravels.com/author" }],
  creator: "Sri Sadhguru Tours & Travels",
  publisher: "Sri Sadhguru Tours & Travels",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://srisadgurutoursandtravels.com",
    siteName: "Sri Sadhguru Tours & Travels",
    title: "Sri Sadhguru Tours & Travels | 24x7 Cabs, Airport Taxi & Car Rentals in Hyderabad",
    description:
      "24x7 doorstep cab dispatch in Kukatpally, KPHB, Miyapur, Hitec City & Shamshabad Airport. 5 to 50 Seater commercial fleet. Zero-surge guaranteed rates. Call +91 81061 17704.",
    images: [
      {
        url: "/images/sri-sadhguru-travels-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Sadhguru Tours & Travels Commercial Fleet Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Sadhguru Tours & Travels | 24x7 Cabs in Hyderabad",
    description:
      "Swift Dzire, Innova Crysta, Tempo Travellers & Luxury Buses. 15-min dispatch across Kukatpally, KPHB & Airport. Call +91 81061 17704.",
    images: ["/images/sri-sadhguru-travels-banner.jpg"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sadhguru Driver",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <StructuredData />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <NavigationProgressBar />
        <NextAuthProvider>
          <ClientCommons />
          <SiteLayout>{children}</SiteLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
