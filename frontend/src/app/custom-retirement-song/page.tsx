import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreateSongForm from '../CreateSongForm';
import {
  SparklesIcon,
  ShieldCheckIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Custom Retirement & Farewell Song | Personalized Tribute Gift',
  description:
    'Send off a retiring coworker, boss, or parent with an unforgettable custom song celebrating their career, achievements, and inside jokes. From $4.99 with free preview.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/custom-retirement-song',
  },
  openGraph: {
    title: 'Custom Retirement & Farewell Song | Personalized Song Maker',
    description:
      'Turn career milestones, office inside jokes, and heartfelt farewells into a custom studio song. Free audio preview in 2 minutes.',
    url: 'https://www.personalizedsongmaker.com/custom-retirement-song',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Custom Retirement & Farewell Song Keepsake',
      description:
        'A custom studio song celebrating a coworker, mentor, or parent retiring after decades of dedication.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      offers: {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/custom-retirement-song',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.93',
        reviewCount: '980',
      },
    },
  ],
};

export default function CustomRetirementSongPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-orange-50/20 to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-amber-800 bg-amber-100/80 border border-amber-200 mb-6 shadow-sm">
              <SparklesIcon className="h-4 w-4 text-amber-600" />
              The Ultimate Retirement &amp; Farewell Send-Off
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              Celebrate Decades of Hard Work With a <br />
              <span className="text-amber-600">Custom Studio Retirement Song</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Skip boring greeting cards and predictable plaques. We turn career milestones, office inside jokes, and well-wishes into a full studio song in <strong className="text-slate-900">under 3 minutes</strong> for just <strong className="text-amber-600">$4.99</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-600/25 transition-all text-center"
              >
                Create Retirement Song (Listen Free)
              </a>
              <Link
                href="/custom-birthday-song"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                Birthday Song Ideas →
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" /> Free Audio Preview
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <MusicalNoteIcon className="h-5 w-5 text-amber-600" /> 2 Musical Styles Included
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <VideoCameraIcon className="h-5 w-5 text-purple-600" /> 720p Video with Career Photos
              </span>
            </div>
          </div>
        </section>

        {/* Creation Form */}
        <section id="create" className="py-16 sm:py-24 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-800 bg-amber-100 border border-amber-200 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-600" />
                Retirement Tribute Studio
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Tell Us About Their Career &amp; Memories
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Mention how long they worked, their favorite stories, or their retirement hobbies (golf, travel, gardening).
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
            <span className="font-semibold text-slate-700 block mb-2">Explore Related Keepsake Gifts:</span>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/custom-birthday-song" className="text-amber-700 hover:underline">Birthday Songs</Link>
              <span>•</span>
              <Link href="/custom-fathers-day-song" className="text-amber-700 hover:underline">Song for Dad</Link>
              <span>•</span>
              <Link href="/songfinch-alternative" className="text-amber-700 hover:underline">Songfinch Alternative</Link>
              <span>•</span>
              <Link href="/photo-video-maker-with-custom-song" className="text-amber-700 hover:underline">Photo Video Maker</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
