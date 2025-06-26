import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Queer Youth Group Nepal",
  description: "",
  icons: {
    icon: "/qyg-logo.svg",
  }
};

const locales = ["en", "ne"];
type Locale = typeof locales[number];

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const lang = params.lang as Locale; 

  if(!locales.includes(lang)) notFound();

  return (
    <html lang={lang}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body
        className="min-h-screen w-full flex flex-col flex-grow"
      >
        <Navbar lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
