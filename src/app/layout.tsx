// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sponsoring-as-a-Service",
  description: "Marketing für Unternehmen. Einnahmen für Vereine. Ohne Umwege.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-white text-gray-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
