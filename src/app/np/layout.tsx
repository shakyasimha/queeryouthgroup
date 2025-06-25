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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body
        className="min-h-screen w-full flex flex-col flex-grow"
      >
        <Navbar lang="np" />
        {children}
        <Footer lang="np" />
      </body>
    </html>
  );
}
