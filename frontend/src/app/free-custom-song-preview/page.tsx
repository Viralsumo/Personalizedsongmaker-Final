import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreateSongForm from '../CreateSongForm';
import {
  SparklesIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Free Custom Song Preview | Listen Before You Buy | Personalized Song Maker',
  description:
    'Experience the only custom song maker where you can generate lyrics and listen to 2 complete studio recordings 100% free with zero upfront payment.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/free-custom-song-preview',
  },
  openGraph: {
    title: 'Free Custom Song Preview | Listen to Your Song Free',
    description:
      'Turn your personal story into a studio song with zero upfront payment. Listen to 30s studio preview clips free before paying.',
    url: 'https://www.personalizedsongmaker.com/free-custom-song-preview',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Custom Song Free Audio Preview',
      description:
        'A risk-free personalized song generator where customers can hear complete studio audio previews before purchasing.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      offers: {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/free-custom-song-preview',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.96',
        reviewCount: '1940',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is the song preview really 100% free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You do not need to enter a credit card, PayPal, or payment details. You enter your details, generate custom lyrics, and listen to 2 complete 30-second studio preview recordings for free.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost if I want the full song?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unlocking both full-length MP3 tracks and your shareable gift page costs just $4.99. You can also upgrade to the Deluxe Video Keepsake with your photos for $9.99.',
          },
        },
      ],
    },
  ],
};

export default function FreeCustomSongPreviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50/30 to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-200 mb-6 shadow-sm">
              <ShieldCheckIcon className="h-4 w-4 text-emerald-600" />
              100% Free To Try • No Credit Card Required
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              Listen to Your Custom Song <br />
              <span className="text-emerald-600">Completely Free Before You Pay</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Why pay \$199 upfront to services like Songfinch without knowing if you will like the melody? We let you write custom lyrics and hear <strong className="text-slate-900">2 complete studio audio previews</strong> completely free in under 2 minutes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all text-center"
              >
                Start Your Free Preview Now
              </a>
              <Link
                href="/best-custom-song-services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                Compare Song Services →
              </Link>
            </div>
          </div>
        </section>

        {/* Creation Form */}
        <section id="create" className="py-16 sm:py-24 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-emerald-600" />
                Zero Risk Song Creator
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Enter Your Story Below
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Your preview will be ready in under 2 minutes. You only pay if you love it.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-200">
              <CreateSongForm />
            </div>
          </div>
        </section>

        {/* Internal Links Hub */}
        <section className="py-12 bg-slate-50 border-t border-gray-200 text-center text-xs text-slate-500">
          <div className="max-w-3xl mx-auto px-6">
            <span className="font-semibold text-slate-700 block mb-2">Explore Popular Occasion Songs:</span>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/custom-wedding-song" className="text-emerald-700 hover:underline">Wedding Songs</Link>
              <span>•</span>
              <Link href="/personalized-anniversary-song" className="text-emerald-700 hover:underline">Anniversary Songs</Link>
              <span>•</span>
              <Link href="/custom-birthday-song" className="text-emerald-700 hover:underline">Birthday Songs</Link>
              <span>•</span>
              <Link href="/photo-video-maker-with-custom-song" className="text-emerald-700 hover:underline">Photo Video Keepsake</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
