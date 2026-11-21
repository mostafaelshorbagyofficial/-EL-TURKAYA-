import type { Metadata, Viewport } from "next";
import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#090C16",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://turkeya.pro-m-edia.com"
  ),
  title: {
    default: "التركايه | TURKEYA — إنتاج أصلي من ProMedia",
    template: "%s | التركايه — TURKEYA",
  },
  description:
    "التركايه (TURKEYA) — برنامج حواري مصري بمعايير إنتاجية سينمائية من إنتاج ProMedia وتقديم محمد الهجان. اكتشف الموسم الأول وفرص الرعاية والشراكات.",
  openGraph: {
    title: "التركايه | TURKEYA — A ProMedia Original Production",
    description:
      "Flagship Egyptian talk-show production by ProMedia hosted by Mohamed Elhagan. Explore Season One, guests, and corporate sponsorship opportunities.",
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/assets/التركايه .png",
        width: 1726,
        height: 911,
        alt: "TURKEYA — A ProMedia Original Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "التركايه | TURKEYA — A ProMedia Original Production",
    description:
      "Flagship Egyptian talk-show production by ProMedia hosted by Mohamed Elhagan.",
    images: ["/assets/التركايه .png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <LanguageProvider initialLocale="ar">{children}</LanguageProvider>
      </body>
    </html>
  );
}
