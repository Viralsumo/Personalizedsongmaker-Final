import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreateSongForm from '../CreateSongForm';
import {
  SparklesIcon,
  ShieldCheckIcon,
  VideoCameraIcon,
  PhotoIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Photo Video Maker with Custom Song & Lyrics | Deluxe Video Keepsake',
  description:
    'Turn your favorite photos into a cinematic 720p HD video paired with a custom personalized studio song and synced subtitles. Ready in 3 mins from $9.99.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/photo-video-maker-with-custom-song',
  },
  openGraph: {
    title: 'Photo Video Maker with Custom Song & Synced Lyrics',
    description:
      'Combine your photos with custom radio-quality music and television-grade subtitles. Free audio preview in 2 minutes.',
    url: 'https://www.personalizedsongmaker.com/photo-video-maker-with-custom-song',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Deluxe Photo Video Keepsake with Custom Song',
      description:
        'A complete 720p HD video montage maker that pairs your photos with an AI-generated studio song and synchronized subtitles.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      offers: {
        '@type': 'Offer',
        price: '9.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/photo-video-maker-with-custom-song',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.97',
        reviewCount: '1150',
      },
    },
  ],
};

export default function PhotoVideoMakerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/70 via-pink-50/30 to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-purple-700 bg-purple-100/80 border border-purple-200 mb-6 shadow-sm">
              <VideoCameraIcon className="h-4 w-4 text-purple-600" />
              All-In-One Music &amp; Video Keepsake
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              Turn Your Photos Into a <br />
              <span className="text-purple-600">Cinematic Video with a Custom Song</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              No need for complex video editing tools or generic stock tracks. We compose an original studio song from your memories and generate a <strong className="text-slate-900">720p HD MP4 video</strong> with your photos and television-grade synced subtitles for just <strong className="text-purple-600">$9.99</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/25 transition-all text-center"
              >
                Create Video Keepsake (Listen Free)
              </a>
              <Link
                href="/custom-wedding-song"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                Wedding Video Ideas →
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" /> Free Audio Preview
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <PhotoIcon className="h-5 w-5 text-purple-600" /> Smart Fit (Zero Cropped Faces)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <MusicalNoteIcon className="h-5 w-5 text-pink-600" /> 2 Soundtrack Versions
              </span>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="py-16 bg-slate-50 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900">Why Our Video Keepsake is Unmatched</h2>
              <p className="mt-2 text-slate-600 text-sm">Professional video production made accessible to everyone in seconds.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl mb-4">
                  🛡️
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Smart Fit Photo Protection</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Vertical, horizontal, and square photos are displayed in their full natural glory with an ambient blurred background. No chopped heads or cut-off friends!
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl mb-4">
                  📺
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Cinematic 2-Line Subtitles</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Grouped into 2-line couplets on a dark frosted glass pill with natural verse and chorus pauses, matching broadcast television and Apple Music standards.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl mb-4">
                  ⚡
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Dual Export Formats</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Export the complete 3-minute master video for big screens and TV projection, plus a snappy 30-second highlight reel for WhatsApp Status &amp; Instagram Stories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="create" className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-purple-700 bg-purple-100 border border-purple-200 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-purple-600" />
                Step 1: Create Your Custom Song Free
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Start Your Video Keepsake
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Enter your story to generate your lyrics and music. You can add your photos directly on the preview screen!
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
              <Link href="/custom-wedding-song" className="text-purple-600 hover:underline">Wedding First Dance</Link>
              <span>•</span>
              <Link href="/personalized-anniversary-song" className="text-purple-600 hover:underline">Anniversary Songs</Link>
              <span>•</span>
              <Link href="/custom-birthday-song" className="text-purple-600 hover:underline">Birthday Songs</Link>
              <span>•</span>
              <Link href="/free-custom-song-preview" className="text-purple-600 hover:underline">Free Song Preview</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
