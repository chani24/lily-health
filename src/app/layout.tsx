import "./globals.css";
import "./components.css";
import "./page.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lily Health - A new platform of care for mothers.",
  description:
    "Revolutionizing maternal care: Discover our innovative platform designed to empower and support mothers throughout their journey to motherhood. Join us for a new era of personalized, compassionate care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
