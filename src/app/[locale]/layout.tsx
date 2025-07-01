import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Queer Youth Group Nepal",
  description: "",
  icons: {
    icon: "/qyg-logo.svg",
  }
};


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  // Ensure that the incoming locale is valid
  const {locale} = await params;
  
  if(!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className="min-h-screen w-full flex flex-col flex-grow">
        <NextIntlClientProvider>
          {/* Navbar content */}
          <Navbar lang={locale} />

          {children}

          {/* Footer content */}
          <Footer lang={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
