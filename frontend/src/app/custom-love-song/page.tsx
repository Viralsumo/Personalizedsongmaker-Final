import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreateSongForm from '../CreateSongForm';
import {
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Custom Love Song for Girlfriend or Boyfriend | Personalized Romantic Gift',
  description:
    'Surprise your partner with a custom romantic studio song starring your real love story, names, and memories. Acoustic ballad or pop in 2 mins from $4.99 with free preview.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/custom-love-song',
  },
  openGraph: {
    title: 'Custom Love Song for Girlfriend or Boyfriend | Personalized Song Maker',
    description:
      'Turn your favorite moments, late-night talks, and promises into a heartfelt custom love song. Free audio preview in 2 minutes.',
    url: 'https://www.personalizedsongmaker.com/custom-love-song',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Custom Romantic Love Song & Video',
      description:
        'A studio-quality custom love song written from your personal dating story, memories, and emotions for your girlfriend, boyfriend, or spouse.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      offers: {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/custom-love-song',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.95',
        reviewCount: '1410',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What should I mention in my custom love song?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mention how you first fell for them, your cute nicknames, favorite songs you sing together, places you visited, their quirky habits you adore, and your dreams for the future.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I hear the song preview before paying?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can generate your lyrics and listen to 2 complete studio recordings completely free before deciding to purchase.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I send this love song to my partner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every purchase includes full MP3 downloads, a 1-tap WhatsApp sharing link, and a private personalized gift page with your personal message.',
          },
        },
      ],
    },
  ],
};

export default function CustomLoveSongPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-pink-50/70 via-rose-50/30 to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-pink-700 bg-pink-100/80 border border-pink-200 mb-6 shadow-sm">
              <HeartIcon className="h-4 w-4 text-pink-600" />
              The Most Thoughtful Romantic Surprise
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              A Custom Love Song Written <br />
              <span className="text-pink-600">Just For Them, About Only You Two</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Flowers fade, but a personalized love song lasts forever. Turn late-night talks, inside jokes, and raw affection into a radio-quality track in <strong className="text-slate-900">under 3 minutes</strong> for just <strong className="text-pink-600">$4.99</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-600/25 transition-all text-center"
              >
                Create Your Love Song (Listen Free)
              </a>
              <Link
                href="/personalized-anniversary-song"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                Anniversary Ideas →
              </Link>
            </div>

            {/* Reassurance Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" /> Free Audio Preview
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <MusicalNoteIcon className="h-5 w-5 text-pink-600" /> 2 Musical Styles Included
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <VideoCameraIcon className="h-5 w-5 text-purple-600" /> 720p Video Keepsake
              </span>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="create" className="py-16 sm:py-24 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-pink-700 bg-pink-100 border border-pink-200 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-pink-600" />
                Romantic Song Studio
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Tell Us About Your Partner
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                No songwriting experience needed! Enter your memories and our AI studio handles the rest.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-200">
              <CreateSongForm />
            </div>
          </div>
        </section>

        {/* Why a Song is the Ultimate Romantic Gift */}
        <section className="py-16 bg-slate-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900">Why a Custom Song Beats Store-Bought Gifts</h3>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-2xl mb-2 block">😭</span>
                <h4 className="font-bold text-slate-900 text-base">Unbeatable Emotional Impact</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Hearing their own name, pet names, and favorite private memories sung in a studio-quality track reliably produces happy tears.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-2xl mb-2 block">📱</span>
                <h4 className="font-bold text-slate-900 text-base">Easy to Share Anywhere</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Send it over WhatsApp, play it in the car during date night, or share a private gift page made just for them.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-2xl mb-2 block">⏳</span>
                <h4 className="font-bold text-slate-900 text-base">A Keepsake for Life</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Chocolates get eaten and jewelry sits in a drawer. A custom song can be listened to on every anniversary for decades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links Hub */}
        <section className="py-12 bg-white border-t border-gray-200 text-center text-xs text-slate-500">
          <div className="max-w-3xl mx-auto px-6">
            <span className="font-semibold text-slate-700 block mb-2">Explore More Personalized Songs:</span>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/personalized-anniversary-song" className="text-pink-600 hover:underline">Anniversary Songs</Link>
              <span>•</span>
              <Link href="/custom-wedding-song" className="text-pink-600 hover:underline">Wedding &amp; First Dance</Link>
              <span>•</span>
              <Link href="/custom-birthday-song" className="text-pink-600 hover:underline">Birthday Songs</Link>
              <span>•</span>
              <Link href="/songfinch-alternative" className="text-pink-600 hover:underline">Songfinch Alternative</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
