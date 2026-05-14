import type { Metadata } from "next";
import { Oswald, Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";

// 1. Oswald font setup (Heighted/Condensed look ke liye)
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular aur Bold
  variable: "--font-oswald", 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Ahmed | Portfolio",
  description: "Trainee Frontend Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.className} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}