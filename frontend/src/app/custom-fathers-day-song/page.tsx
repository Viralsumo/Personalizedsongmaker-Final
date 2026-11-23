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
  title: 'Custom Father’s Day Song | Personalized Tribute Song for Dad',
  description:
    'Celebrate dad with a custom studio song honoring his guidance, inside jokes, and fatherly love. Country, rock, or acoustic in 2 minutes from $4.99 with free preview.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/custom-fathers-day-song',
  },
  openGraph: {
    title: 'Custom Father’s Day Song | Personalized Song for Dad',
    description:
      'Turn fishing trips, dad jokes, life lessons, and gratitude into a custom radio-quality song for Dad. Free audio preview in 2 minutes.',
    url: 'https://www.personalizedsongmaker.com/custom-fathers-day-song',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Custom Father’s Day Song & Video Keepsake',
      description:
        'A custom tribute song composed specifically for your dad or grandfather, honoring his wisdom, mentorship, and sense of humor.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      offers: {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/custom-fathers-day-song',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.94',
        reviewCount: '1320',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can the song be funny and have dad jokes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can choose an uplifting, humorous tone filled with his favorite dad jokes, barbecue habits, and car advice, or create a deeply emotional acoustic tribute.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I hear the song before paying?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can generate lyrics and listen to 2 complete studio recordings completely free before deciding to purchase.',
          },
        },
      ],
    },
  ],
};

export default function CustomFathersDaySongPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/30 to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-100/80 border border-blue-200 mb-6 shadow-sm">
              <SparklesIcon className="h-4 w-4 text-blue-600" />
              The Most Meaningful Gift For Dad &amp; Grandpa
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              A Custom Song Celebrating <br />
              <span className="text-blue-600">The Man Who Taught You Everything</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Dads are notoriously hard to shop for. Skip another necktie or generic toolbox. Turn his advice, legendary dad jokes, and your gratitude into a studio-quality song in <strong className="text-slate-900">under 3 minutes</strong> for just <strong className="text-blue-600">$4.99</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all text-center"
              >
                Create a Song for Dad (Free Preview)
              </a>
              <Link
                href="/personalized-mothers-day-song"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                Song for Mom →
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" /> Free Audio Preview
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <MusicalNoteIcon className="h-5 w-5 text-blue-600" /> 2 Musical Styles Included
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <VideoCameraIcon className="h-5 w-5 text-purple-600" /> 720p Video with Family Photos
              </span>
            </div>
          </div>
        </section>

        {/* Creation Form */}
        <section id="create" className="py-16 sm:py-24 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-blue-600" />
                Father&apos;s Day Song Studio
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Tell Us About Your Dad
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Share his favorite hobbies, memories, or funny sayings. You will hear 30s studio preview clips free before paying.
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
              <Link href="/personalized-mothers-day-song" className="text-blue-600 hover:underline">Song for Mom</Link>
              <span>•</span>
              <Link href="/custom-birthday-song" className="text-blue-600 hover:underline">Dad&apos;s Birthday Song</Link>
              <span>•</span>
              <Link href="/custom-retirement-song" className="text-blue-600 hover:underline">Retirement Song</Link>
              <span>•</span>
              <Link href="/photo-video-maker-with-custom-song" className="text-blue-600 hover:underline">Photo Video Maker</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
