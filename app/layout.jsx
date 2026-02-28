import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Raksha Hash | India's First NCII Prevention Tool",
    description: "Protect your private images with client-side hashing. Privacy-first digital shield for women. Prevent Non-Consensual Intimate Imagery (NCII) spread.",
    keywords: ["NCII", "Non-Consensual Intimate Imagery", "cybersecurity for women", "revenge porn prevention", "hash protection", "online safety India", "safeguard privacy", "StopNCII India", "Raksha Hash"],
    metadataBase: new URL("https://www.raksha.amanblaze.in"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Raksha Hash | India's First NCII Prevention Tool",
        description: "A completely secure, browser-based tool to fingerprint and block non-consensual intimate imagery before it spreads.",
        url: "https://www.raksha.amanblaze.in",
        siteName: "Raksha Hash",
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Raksha Hash | Stop NCII in India",
        description: "Secure your privacy. Block intimate imagery from spreading on Indian platforms with client-side hashing.",
    },
};

const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Raksha Hash",
    "operatingSystem": "Any",
    "applicationCategory": "SecurityApplication",
    "description": "India's first browser-based NCII prevention tool. Use client-side hashing to secure your private images from non-consensual sharing.",
    "url": "https://www.raksha.amanblaze.in",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Raksha Hash India",
        "url": "https://www.raksha.amanblaze.in"
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
                />
                <LanguageProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
