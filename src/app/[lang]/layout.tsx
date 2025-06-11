import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound, usePathname } from "next/navigation";
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  let messages;
  try {
    messages = (await import(`@/locales/${params.lang}.json`)).default;
  } catch (error) {
    notFound(); // Handle invalid locales
  }

  const locales = ['en', 'ne'];

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {locales.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`/${locale}${usePathname().replace(`/${params.lang}`, '')}`}
          />
        ))}
      </head>
      <body
        className="min-h-screen w-full flex flex-col flex-grow"
      >
        <NextIntlClientProvider locale={params.lang} messages={messages}>
          <Navbar lang={params.lang} />
          {children}
          <Footer lang={params.lang} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
