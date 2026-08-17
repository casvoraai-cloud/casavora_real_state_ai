import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Casavora — Simplifying Property Ownership",
  description:
    "Everything you need to manage your property in one place: documents, maintenance, warranties, tradies and reminders. Join founding members shaping Casavora from day zero.",
  openGraph: {
    title: "Casavora — Simplifying Property Ownership",
    description:
      "Everything you need to manage your property in one place: documents, maintenance, warranties, tradies and reminders.",
    images: ["/favicon.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casavora — Simplifying Property Ownership",
    description:
      "Everything you need to manage your property in one place: documents, maintenance, warranties, tradies and reminders.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.variable} ${plusJakartaSans.variable} min-h-full flex flex-col antialiased`}>
        <Toaster>{children}</Toaster>
      </body>
    </html>
  );
}
