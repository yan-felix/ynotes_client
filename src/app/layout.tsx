import type { Metadata } from "next";
import { Istok_Web } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: '400',
  subsets: ["latin"] 
});

const istokWebRegular = Istok_Web({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  preload: true,
});

export const metadata: Metadata = {
  title: "yNotes",
  description: "A note app, created by Yan Félix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="w-full h-screen">
      <body className={`w-full h-full grid grid-rows-[auto_1fr] ${inter.className && istokWebRegular.className} overflow-y-scroll`}>{children}</body>
    </html>
  );
};
