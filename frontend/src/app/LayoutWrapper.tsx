'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { pageview } from './gtag';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSharePage = pathname.startsWith('/share/');

  useEffect(() => {
    if (pathname && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      pageview(pathname);
    }
  }, [pathname]);

  return (
    <>
      {!isSharePage && <Header />}
      {children}
      {!isSharePage && <Footer />}
    </>
  );
}