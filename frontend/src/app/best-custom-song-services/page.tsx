import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreateSongForm from '../CreateSongForm';
import {
  SparklesIcon,
  TrophyIcon,
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: '5 Best Custom Song Websites in 2026 Ranked & Reviewed',
  description:
    'An honest guide to the best personalized custom song services: Songfinch, Songlorious, Personalized Song Maker, and Fiverr compared by price, speed, and audio quality.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/best-custom-song-services',
  },
  openGraph: {
    title: '5 Best Custom Song Websites in 2026 Ranked & Reviewed',
    description:
      'Compare price, turnaround time, audio quality, and preview options for the top custom song gift makers in 2026.',
    url: 'https://www.personalizedsongmaker.com/best-custom-song-services',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'The 5 Best Custom Song Services in 2026 Ranked & Compared',
      description:
        'An unbiased buyer guide evaluating the best personalized song services including Songfinch, Songlorious, and Personalized Song Maker.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      author: {
        '@type': 'Organization',
        name: 'Personalized Song Maker Editorial Team',
      },
    },
  ],
};

export default function BestCustomSongServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/70 via-slate-50/30 to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-purple-700 bg-purple-100/80 border border-purple-200 mb-6 shadow-sm">
              <TrophyIcon className="h-4 w-4 text-purple-600" />
              2026 Buyer&apos;s Guide &amp; Rankings
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              The 5 Best Custom Song Services <br />
              <span className="text-purple-600">Ranked by Price, Speed &amp; Emotion</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Want to gift a one-of-a-kind song for a wedding, birthday, or anniversary? We tested and ranked the top custom music makers so you know where you get the most emotional impact for your money.
            </p>
          </div>
        </section>

        {/* Comparison Ranking Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="space-y-8">
              {/* Rank 1: Personalized Song Maker */}
              <div className="p-8 rounded-3xl border-2 border-purple-500 bg-purple-50/30 shadow-xl relative">
                <span className="absolute -top-3.5 left-8 bg-purple-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  🏆 #1 Best Value &amp; Speed
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">1. Personalized Song Maker</h3>
                    <p className="text-sm text-slate-600 mt-1">Instant delivery • Free audio preview • Deluxe video keepsake</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-3xl font-extrabold text-purple-600">$4.99 - $9.99</span>
                    <span className="text-xs text-slate-500 block">Turnaround: 2 Minutes</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 text-slate-700">
                    <p className="font-semibold text-slate-900">Pros:</p>
                    <p>✓ Listen to 2 studio versions 100% free before paying</p>
                    <p>✓ 2 unique musical interpretations included with every order</p>
                    <p>✓ Full 720p HD photo video with synced subtitles ($9.99)</p>
                    <p>✓ 1-tap WhatsApp sharing + private gift webpage</p>
                  </div>
                  <div className="space-y-1 text-slate-600">
                    <p className="font-semibold text-slate-900">Cons:</p>
                    <p>• Songs delivered digitally (no physical vinyl included)</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-700">Rating: 4.96 / 5.0 (Editor&apos;s Pick)</span>
                  <a href="#create" className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow">
                    Create Free Preview →
                  </a>
                </div>
              </div>

              {/* Rank 2: Songfinch */}
              <div className="p-8 rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">2. Songfinch</h3>
                    <p className="text-sm text-slate-600 mt-1">Human indie session artists</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-2xl font-bold text-slate-900">$199.99+</span>
                    <span className="text-xs text-slate-500 block">Turnaround: 4-7 Days</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                  Songfinch is the original human custom song platform. They connect you with real indie session artists. However, the $199 upfront price tag with zero preview makes it risky if the artist&apos;s style doesn&apos;t match your taste.
                </p>
                <div className="mt-4">
                  <Link href="/songfinch-alternative" className="text-xs text-purple-600 font-bold hover:underline">
                    Read our full Songfinch vs PersonalizedSongMaker review →
                  </Link>
                </div>
              </div>

              {/* Rank 3: Songlorious */}
              <div className="p-8 rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">3. Songlorious</h3>
                    <p className="text-sm text-slate-600 mt-1">Shark Tank featured custom song maker</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-2xl font-bold text-slate-900">$190.00+</span>
                    <span className="text-xs text-slate-500 block">Turnaround: 5-7 Days</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                  Featured on Shark Tank, Songlorious is well-known but suffers from high upfront pricing ($190 for a 3-minute song) and extra charges for video slideshows.
                </p>
                <div className="mt-4">
                  <Link href="/songlorious-alternative" className="text-xs text-purple-600 font-bold hover:underline">
                    Read our full Songlorious vs PersonalizedSongMaker review →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creation Form Anchor */}
        <section id="create" className="py-16 sm:py-24 bg-slate-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-purple-700 bg-purple-100 border border-purple-200 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-purple-600" />
                Rated #1 Custom Song Maker
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Create Your Song Free in 2 Minutes
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Experience why PersonalizedSongMaker was rated the #1 custom song platform in 2026.
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
            <span className="font-semibold text-slate-700 block mb-2">Explore Popular Occasion Songs:</span>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/custom-wedding-song" className="text-purple-600 hover:underline">Wedding Songs</Link>
              <span>•</span>
              <Link href="/personalized-anniversary-song" className="text-purple-600 hover:underline">Anniversary Songs</Link>
              <span>•</span>
              <Link href="/custom-birthday-song" className="text-purple-600 hover:underline">Birthday Songs</Link>
              <span>•</span>
              <Link href="/custom-love-song" className="text-purple-600 hover:underline">Romantic Love Songs</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
