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

const SITE_URL = "https://skycabsbangalore.com/";

export const viewport: Viewport = {
  themeColor: "#059669",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title: {
    default: "Sky Cabs Bangalore | Reliable Cabs Across Bengaluru",
    template: "%s | Sky Cabs Bangalore",
  },
  description:
    "Book 24x7 cabs in Bengaluru with Sky Cabs Bangalore. Airport transfers to Kempegowda International Airport (BLR), outstation cabs to Mysuru, Tirupati, Coorg, Ooty, Chennai and Mangaluru, local rentals and group travel. Prime Sedan to 52-seater buses, subject to availability. Call +91 96323 45415.",
  keywords: [
    "sky cabs bangalore",
    "cabs in bangalore",
    "cabs in bengaluru",
    "bangalore airport taxi",
    "kempegowda airport taxi",
    "blr airport cab booking",
    "outstation cabs bangalore",
    "bangalore to mysuru cabs",
    "bangalore to tirupati cabs",
    "bangalore to coorg cabs",
    "bangalore to ooty cabs",
    "bangalore to chennai cabs",
    "bangalore to mangaluru cabs",
    "prime sedan rental bangalore",
    "innova crysta car rental bangalore",
    "tempo traveller 12 seater bangalore",
    "force urbania rental bangalore",
    "passenger bus rental bangalore",
    "begur cabs",
    "electronic city cabs",
    "koramangala cabs",
    "whitefield cabs",
    "wedding bus rental bangalore",
    "corporate employee transport bangalore",
  ],
  authors: [{ name: "Sky Cabs Bangalore", url: SITE_URL }],
  creator: "Sky Cabs Bangalore",
  publisher: "Sky Cabs Bangalore",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Sky Cabs Bangalore",
    title: "Sky Cabs Bangalore | Reliable Cabs Across Bengaluru",
    description:
      "Airport transfers to Kempegowda International Airport (BLR), outstation cabs, local rentals and group travel across Bengaluru. Prime Sedan to 52-seater buses, subject to availability. Call +91 96323 45415.",
    images: [
      {
        url: "/images/Airport-cabs.jpg",
        alt: "Sky Cabs Bangalore airport taxi and cabs across Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Cabs Bangalore | Cabs Across Bengaluru",
    description:
      "Airport taxis, outstation cabs and group travel from Bengaluru. Prime Sedan to 52-seater buses, subject to availability. Call +91 96323 45415.",
    images: ["/images/Airport-cabs.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sky Cabs Bangalore",
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
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <head>
        <StructuredData />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
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
