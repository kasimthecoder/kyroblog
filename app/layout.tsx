import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { getHomePage } from "@/lib/data";
import { SiteNotLive } from "@/components/site-not-live";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL as string) ?? "https://blog.kyrocms.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KyroBlog — Thoughts on code, design, and building",
    template: "%s | KyroBlog",
  },
  description:
    "A minimal blog about web development, TypeScript, and building developer tools.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "KyroBlog",
    title: "KyroBlog — Thoughts on code, design, and building",
    description:
      "A minimal blog about web development, TypeScript, and building developer tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KyroBlog",
    description:
      "A minimal blog about web development, TypeScript, and building developer tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homePage = await getHomePage();
  if (!homePage?.is_live) {
    return (
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body className="antialiased min-h-screen flex flex-col font-sans">
          <NextTopLoader color="#DA7756" showSpinner={false} />
          <main className="flex-1">
            <SiteNotLive />
          </main>
        </body>
      </html>
    );
  }
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <NextTopLoader color="#DA7756" showSpinner={false} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
