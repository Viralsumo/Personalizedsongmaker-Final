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
  title: 'Custom Wedding Song for First Dance & Vows | Personalized Wedding Gift',
  description:
    'Create an emotional custom wedding song for your first dance, bride-to-groom gift, or father-daughter dance. Studio quality with your love story in 2 minutes from $4.99.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/custom-wedding-song',
  },
  openGraph: {
    title: 'Custom Wedding Song for First Dance & Vows | Personalized Song Maker',
    description:
      'Turn how you met, favorite memories, and wedding vows into a studio-quality first dance song. 2 versions + 720p photo video keepsake. Free audio preview.',
    url: 'https://www.personalizedsongmaker.com/custom-wedding-song',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Custom Wedding Song & Video Keepsake',
      description:
        'A personalized wedding song composed from your personal love story, vows, and milestone memories. Perfect for first dances and wedding gifts.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      offers: {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/custom-wedding-song',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.96',
        reviewCount: '1820',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can I use this custom song for our wedding first dance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely! Thousands of couples use PersonalizedSongMaker for their first dance, aisle entrance, or surprise gift to the groom or bride. You receive full high-definition MP3 downloads that your wedding DJ can plug directly into their sound system.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I hear the song before paying anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can craft custom lyrics and listen to 2 complete studio recordings completely free before deciding to purchase.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can we create a video montage with our engagement photos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. With our Deluxe Video Keepsake ($9.99), you can upload up to 10 of your favorite engagement or couple photos. We burn television-grade synchronized lyrics and generate a 720p HD MP4 video you can play on a projector at your wedding reception.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does this compare to hiring a session musician or Songfinch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traditional wedding song services like Songfinch charge $199+ and take 4 to 7 days with no preview. PersonalizedSongMaker delivers 2 radio-quality studio versions in under 3 minutes starting at just $4.99.',
          },
        },
      ],
    },
  ],
};

export default function CustomWeddingSongPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-rose-700 bg-rose-100/80 border border-rose-200 mb-6 shadow-sm">
              <HeartIcon className="h-4 w-4 text-rose-600" />
              The Most Emotional Wedding Gift You Can Give
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              Turn Your Real Love Story Into a <br />
              <span className="text-rose-600">Custom Studio Wedding Ballad</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Every love story deserves its own soundtrack. We weave how you first met, the proposal, and your shared promises into a radio-quality acoustic ballad in <strong className="text-slate-900">under 3 minutes</strong> from just <strong className="text-rose-600">$4.99</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/25 transition-all text-center"
              >
                Create Your Wedding Song (Free Preview)
              </a>
              <Link
                href="/personalized-anniversary-song"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                Explore Anniversary Songs →
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" /> Listen 100% Free First
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <MusicalNoteIcon className="h-5 w-5 text-rose-600" /> 2 Musical Styles Included
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <VideoCameraIcon className="h-5 w-5 text-purple-600" /> 720p Video Keepsake Available
              </span>
            </div>
          </div>
        </section>

        {/* Why a Custom Wedding Song is Unforgettable */}
        <section className="py-16 sm:py-20 bg-rose-50/30">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs uppercase font-extrabold text-rose-600 tracking-wider">Beyond Generic DJ Playlists</span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                3 Magical Ways to Use Your Custom Wedding Song
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xl mb-4">
                  💃
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Your First Dance</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Skip the overplayed radio tracks. Dance together to a melody that sings about your real first date, inside jokes, and promises.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xl mb-4">
                  🎁
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Surprise Groom or Bride Gift</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Play it the morning of the wedding as a surprise during preparations, or have the DJ announce it as a heartfelt dedication.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xl mb-4">
                  📽️
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Reception Video Slideshow</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Combine your song with our Deluxe Video Keepsake to project your engagement photos and synced lyrics on the venue screen!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creation Form Anchor */}
        <section id="create" className="py-16 sm:py-24 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-100 border border-rose-200 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-rose-600" />
                Wedding Music Generator
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Create Your Wedding Song in 2 Minutes
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Enter your story below. You will hear 30s studio preview clips free before paying.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-200">
              <CreateSongForm />
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-slate-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900">Why Couples Choose Us Over Traditional Studios</h3>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-sm">
              <div className="p-5 bg-white rounded-xl border border-gray-200">
                <span className="font-bold text-red-600 block mb-1">Traditional Studios / Songfinch</span>
                <ul className="space-y-1.5 text-slate-600 text-xs">
                  <li>❌ Costs $199 to $400 upfront</li>
                  <li>❌ Takes 4 to 7 days turnaround</li>
                  <li>❌ Zero preview before payment</li>
                  <li>❌ Extra fees for video or revisions</li>
                </ul>
              </div>

              <div className="p-5 bg-white rounded-xl border-2 border-rose-500 shadow-sm">
                <span className="font-bold text-rose-600 block mb-1">Personalized Song Maker</span>
                <ul className="space-y-1.5 text-slate-700 text-xs font-medium">
                  <li>✓ Starts from just $4.99 (50% Launch Deal)</li>
                  <li>✓ Ready in under 3 minutes</li>
                  <li>✓ 100% Free audio preview before paying</li>
                  <li>✓ 2 unique musical interpretations included</li>
                  <li>✓ Full 720p HD photo video keepsake ($9.99)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Wedding Song FAQs</h2>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200">
                <h4 className="font-bold text-slate-900">Can our wedding DJ play this song?</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Yes! When you complete your order, you receive standard 320kbps MP3 audio files that you can send via email or flash drive directly to your wedding DJ or venue audio coordinator.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200">
                <h4 className="font-bold text-slate-900">Which musical style is best for a wedding?</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Acoustic Ballad, Romantic Piano Pop, and Country Ballad are the top choices for weddings, providing smooth, emotional pacing that is easy to dance to.
                </p>
              </div>
            </div>

            {/* Internal Links Hub */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-xs text-slate-500">
              <span className="font-semibold text-slate-700 block mb-2">Explore Related Keepsake Gifts:</span>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/personalized-anniversary-song" className="text-rose-600 hover:underline">Anniversary Songs</Link>
                <span>•</span>
                <Link href="/custom-love-song" className="text-rose-600 hover:underline">Romantic Love Songs</Link>
                <span>•</span>
                <Link href="/songfinch-alternative" className="text-rose-600 hover:underline">Songfinch Alternative</Link>
                <span>•</span>
                <Link href="/photo-video-maker-with-custom-song" className="text-rose-600 hover:underline">Photo Video Maker</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
