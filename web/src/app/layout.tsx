import type { Metadata } from "next";
import { Noto_Serif, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const NotoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const BeVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nurture",
  description: "To-Do app that helps you build good habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${NotoSerif.variable} ${BeVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
