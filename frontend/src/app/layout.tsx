'use client';

import { usePathname } from 'next/navigation';
import "./globals.css";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutWrapper>{children}</LayoutWrapper>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSharePage = pathname.startsWith('/share/');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Personalized Song Maker | Turn Your Story Into a Song</title>
        <meta name="description" content="Create a unique, personalized song from your stories. The perfect gift for any occasion. Fast, affordable, and heartfelt." />
      </head>
      <body className="antialiased bg-white text-slate-700">
        {!isSharePage && <Header />}
        {children}
        {!isSharePage && <Footer />}
      </body>
    </html>
  );
}
