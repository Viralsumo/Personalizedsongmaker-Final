import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Customer Support | Personalized Song Maker',
  description:
    'Need help with your custom song order or have a question? Contact the Personalized Song Maker customer care team anytime.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
