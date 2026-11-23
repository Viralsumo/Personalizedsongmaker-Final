import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreateSongForm from '../CreateSongForm';
import {
  SparklesIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Songlorious Alternative: Custom Studio Songs from $4.99 (In 2 Mins)',
  description:
    'Comparing Songlorious vs Personalized Song Maker. Discover why thousands choose our instant custom songs from $4.99 with free previews over $190+ fees and 5-day waits.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/songlorious-alternative',
  },
  openGraph: {
    title: 'Songlorious Alternative: Custom Studio Songs from $4.99 | 2026 Comparison',
    description:
      'Turn your personal story into a studio-grade song in 2 minutes for $4.99 instead of $190+. Side-by-side comparison, samples, and free preview.',
    url: 'https://www.personalizedsongmaker.com/songlorious-alternative',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Personalized Song Maker - Songlorious Alternative',
      description:
        'An affordable, instant alternative to Songlorious that creates studio-quality personalized songs and photo videos in under 3 minutes.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      offers: {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/songlorious-alternative',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.94',
        reviewCount: '1310',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does Personalized Song Maker compare to Songlorious?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Songlorious charges $190 to $260 and takes 4 to 7 days with zero audio previews. Personalized Song Maker costs just $4.99 for essential audio or $9.99 for a full 720p HD photo video, delivers in under 3 minutes, and lets you listen to complete audio previews 100% free before purchasing.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I hear my custom song before paying?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! That is our biggest advantage over Songlorious. You enter your story, generate custom lyrics, and listen to 2 complete studio recordings before spending a dime.',
          },
        },
      ],
    },
  ],
};

export default function SongloriousAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-slate-50/30 to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 bg-indigo-100/80 border border-indigo-200 mb-6 shadow-sm">
              <SparklesIcon className="h-4 w-4 text-indigo-600" />
              Honest 2026 Comparison
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              Looking for a Songlorious Alternative? <br />
              <span className="text-indigo-600">Get Studio Songs for $4.99 in 2 Minutes</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Songlorious charges <strong className="text-slate-900">$190+ upfront</strong> and makes you wait <strong className="text-slate-900">5 days</strong> with zero preview. Discover why thousands of smart gifters choose PersonalizedSongMaker for instant delivery, free audio previews, and full 720p video keepsakes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 transition-all text-center"
              >
                Create Your Song Now ($4.99)
              </a>
              <a
                href="#comparison"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                See Side-by-Side Comparison ↓
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" /> Free Audio Preview
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <CurrencyDollarIcon className="h-5 w-5 text-indigo-600" /> 97% Cheaper Than Songlorious
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ClockIcon className="h-5 w-5 text-purple-600" /> Under 3 Minutes Turnaround
              </span>
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison Table */}
        <section id="comparison" className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Side-by-Side Comparison
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                How PersonalizedSongMaker compares to Songlorious in 2026.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm">
                    <th className="py-4 px-6 font-bold">Feature</th>
                    <th className="py-4 px-6 font-bold text-slate-400">Songlorious</th>
                    <th className="py-4 px-6 font-bold text-indigo-400 bg-slate-800">PersonalizedSongMaker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-900">Starting Price</td>
                    <td className="py-4 px-6 text-slate-500">$190.00+</td>
                    <td className="py-4 px-6 font-bold text-indigo-600 bg-indigo-50/40">$4.99 (97% Cheaper)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-900">Turnaround Speed</td>
                    <td className="py-4 px-6 text-slate-500">4 to 7 Days</td>
                    <td className="py-4 px-6 font-bold text-indigo-600 bg-indigo-50/40">Under 3 Minutes (Instant)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-900">Listen Before Paying</td>
                    <td className="py-4 px-6 text-red-500 font-medium">❌ No (Full charge upfront)</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-indigo-50/40">✓ 100% Free Audio Previews</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-900">Song Versions Included</td>
                    <td className="py-4 px-6 text-slate-500">1 Version Only</td>
                    <td className="py-4 px-6 font-bold text-indigo-600 bg-indigo-50/40">2 Unique Musical Styles</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-900">720p HD Video Keepsake</td>
                    <td className="py-4 px-6 text-slate-500">Not Available / Extra \$100+</td>
                    <td className="py-4 px-6 font-bold text-indigo-600 bg-indigo-50/40">Included in \$9.99 Deluxe Tier</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Creation Form */}
        <section id="create" className="py-16 sm:py-24 bg-slate-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-indigo-600" />
                Instant Song Studio
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Experience It For Yourself Free
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Enter your story below and hear your 2 studio recordings in 2 minutes. Zero commitment.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-200">
              <CreateSongForm />
            </div>
          </div>
        </section>

        {/* Internal Links Hub */}
        <section className="py-12 bg-white border-t border-gray-200 text-center text-xs text-slate-500">
          <div className="max-w-3xl mx-auto px-6">
            <span className="font-semibold text-slate-700 block mb-2">Compare Other Custom Song Options:</span>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/songfinch-alternative" className="text-indigo-600 hover:underline">Songfinch Alternative</Link>
              <span>•</span>
              <Link href="/best-custom-song-services" className="text-indigo-600 hover:underline">Best Song Services 2026</Link>
              <span>•</span>
              <Link href="/personalized-anniversary-song" className="text-indigo-600 hover:underline">Anniversary Songs</Link>
              <span>•</span>
              <Link href="/custom-wedding-song" className="text-indigo-600 hover:underline">Wedding Songs</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
