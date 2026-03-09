import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals.css";
import { ReactNode } from "react";

import Navbar from "./components/Navbar";

import { SettingsProvider } from "./SettingsContext";
import SettingsToggleBar from "./components/SettingsToggleBar";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Expropriation – Legal Guide",
  description: "Guide to expropriation and advance possession",
};
// title: "Ekspropriasjon – juridisk veiviser",
//   description: "Informasjon og veiviser om ekspropriasjon og forhåndstiltredelse",

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="no">
      <body>
        <SettingsProvider>
           <Navbar />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
