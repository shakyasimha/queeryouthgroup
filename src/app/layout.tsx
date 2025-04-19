import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Queer Youth Group Nepal",
  description: "",
  icons: {
    icon: "/qyg-logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen w-full flex flex-col flex-grow"
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
