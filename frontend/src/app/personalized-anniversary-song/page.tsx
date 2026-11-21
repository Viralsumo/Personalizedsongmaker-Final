import type { Metadata } from 'next';
import React from 'react';
import CreateSongForm from '../CreateSongForm';
import {
  HeartIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  MusicalNoteIcon,
  LightBulbIcon,
  GiftIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Personalized Anniversary Song | Turn Your Love Story Into a Custom Ballad',
  description:
    'Turn your love story into a custom studio ballad for your wedding anniversary. Celebrate where you met, favorite milestones, and your future together. From $1.99 with free preview.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/personalized-anniversary-song',
  },
  openGraph: {
    title: 'Personalized Anniversary Song | Turn Your Love Story Into Music',
    description:
      'The most emotional anniversary gift you can give. Turn your first date, wedding vows, and shared journey into a studio-quality song in 3 minutes. Free audio preview.',
    url: 'https://www.personalizedsongmaker.com/personalized-anniversary-song',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Personalized Anniversary Song',
      description:
        'A custom romantic song written from your personal love story, special dates, and shared memories for your wedding anniversary.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      offers: {
        '@type': 'Offer',
        price: '1.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/personalized-anniversary-song',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.95',
        reviewCount: '1540',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What details should I include in our anniversary song?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Include where and how you first met, your first date or road trip, wedding day memories, inside jokes, pets, children, challenges you overcame together, and your hopes for the future.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I hear the anniversary song before paying?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can generate lyrics and listen to a studio preview of your track completely free before purchasing the full MP3 download and personalized gift page for $1.99.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which musical style is best for an anniversary song?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sentimental Ballad and Acoustic Pop are the most popular choices for anniversaries, offering warm, emotional acoustic guitars, piano accompaniment, and heartfelt vocal delivery.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I present the song to my spouse or partner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can play it over a candlelit dinner, connect to car Bluetooth on an evening drive, print a QR code linking to your custom gift page inside a card, or share the private gift link.',
          },
        },
      ],
    },
  ],
};

export default function PersonalizedAnniversarySongPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-rose-700 bg-rose-100/80 border border-rose-200 mb-6 shadow-sm">
              <HeartIcon className="h-4 w-4 text-rose-600" />
              The #1 Most Emotional Anniversary Gift
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              Turn Your Love Story Into a <br />
              <span className="text-rose-600">Timeless Custom Anniversary Ballad</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Remember the awkward first date, the late-night talks, and everything you&apos;ve built together. We turn your real journey into a radio-quality acoustic ballad in <strong className="text-slate-900">under 3 minutes</strong> for just <strong className="text-rose-600">$1.99</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/25 transition-all text-center"
              >
                Create Your Anniversary Song ($1.99)
              </a>
              <a
                href="#sample"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                Listen to Romantic Sample ↓
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                Over 15,000 Happy Couples
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
                Free Audio Preview First
              </span>
              <span className="flex items-center gap-2">
                <GiftIcon className="h-5 w-5 text-rose-500" />
                Digital Keepsake Page Included
              </span>
            </div>
          </div>
        </section>

        {/* Milestone Gifting Guide */}
        <section className="py-16 sm:py-20 bg-slate-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Music for Every Anniversary Milestone
              </h2>
              <p className="mt-4 text-slate-600 text-lg">
                Traditional gifts fade away, but a song written about your specific journey lasts forever.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <p className="font-extrabold text-2xl text-rose-600">1st Year</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Paper</p>
                <p className="text-sm text-slate-600 mt-3">
                  The modern take on the &apos;paper&apos; gift: digital lyric sheet and acoustic love story.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <p className="font-extrabold text-2xl text-pink-600">5th Year</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Wood</p>
                <p className="text-sm text-slate-600 mt-3">
                  Celebrating deep roots, buying a first home, adopting pets, and building a foundation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <p className="font-extrabold text-2xl text-purple-600">10th Year</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Tin / Aluminum</p>
                <p className="text-sm text-slate-600 mt-3">
                  A decade of marriage, raising children, overcoming hurdles, and loving deeper than ever.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <p className="font-extrabold text-2xl text-slate-800">25th Year</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Silver Jubilee</p>
                <p className="text-sm text-slate-600 mt-3">
                  A quarter-century celebration. Play it at your anniversary party for a renewal of vows.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <p className="font-extrabold text-2xl text-amber-600">50th Year</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Golden Legacy</p>
                <p className="text-sm text-slate-600 mt-3">
                  A lifetime love song commissioned by children and grandchildren to celebrate 50 years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Audio Sample with Lyric Breakdown */}
        <section id="sample" className="py-16 sm:py-24 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Listen to a Real Custom Anniversary Ballad
            </h2>
            <p className="mt-3 text-slate-600">
              Hear how real memories become timeless acoustic melodies:
            </p>

            <div className="mt-10 p-6 sm:p-8 rounded-2xl border border-gray-200 bg-slate-50 shadow-md text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Our Adventure (5-Year Anniversary)</h3>
                  <p className="text-sm text-slate-500">Style: Sentimental Ballad • Acoustic Guitar &amp; Piano</p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">
                  Studio Sample
                </span>
              </div>

              <audio controls className="w-full mt-5">
                <source src="/samples/sample1.mp3" type="audio/mpeg" />
                Your browser does not support audio playback.
              </audio>

              <div className="mt-6 p-5 rounded-xl bg-white border border-gray-200">
                <p className="font-bold text-slate-900 text-sm mb-2">Lyric Structure Example:</p>
                <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-mono leading-relaxed">
                  <p>
                    <span className="font-bold text-rose-700 font-sans">[Verse 1 - The First Spark]</span><br />
                    Five years ago we shared that rainy stroll,<br />
                    Two nervous strangers, finding one whole soul.<br />
                    From burnt Sunday pancakes to the vows we swore,<br />
                    Every little chapter made me love you more.
                  </p>
                  <p>
                    <span className="font-bold text-rose-700 font-sans">[Chorus - The Emotional Core]</span><br />
                    Through the quiet nights and the roaring storm,<br />
                    It&apos;s your hand in mine that keeps our world warm.<br />
                    Happy anniversary, my forever grace,<br />
                    My whole life begins and ends in your embrace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Storytelling Framework Section */}
        <section className="py-16 sm:py-20 bg-slate-50 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">
                How to Write the Perfect Anniversary Song Prompt
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                Follow our simple 3-part storytelling framework to ensure your song creates an emotional reaction:
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-2.5 py-1 rounded-full">
                  Part 1
                </span>
                <h3 className="mt-4 font-bold text-slate-900 text-base">The Beginning</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Where did you first meet? What was your very first impression? Mention the coffee shop, the university campus, or the city where your love started.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full">
                  Part 2
                </span>
                <h3 className="mt-4 font-bold text-slate-900 text-base">The Journey &amp; Laughter</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Share funny quirks, your favorite vacation together, how you support each other through tough days, or private jokes only the two of you share.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                  Part 3
                </span>
                <h3 className="mt-4 font-bold text-slate-900 text-base">The Vow for Tomorrow</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Reaffirm your commitment. Tell them why you would choose them all over again, and look forward to the decades ahead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Reusable Song Creator Form pre-configured for Anniversary */}
        <div id="create" className="bg-white py-12">
          <CreateSongForm
            initialOccasion="Anniversary"
            initialStyle="Sentimental Ballad"
            title="Create Your Anniversary Ballad"
            subtitle="Share your partner's name, where you met, favorite memories, and why you love them. We will write the lyrics and compose your song in minutes."
          />
        </div>

        {/* Comprehensive Anniversary FAQ Section */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center">
              Frequently Asked Questions About Anniversary Songs
            </h2>
            <div className="mt-12 space-y-6">
              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <h3 className="text-lg font-bold text-slate-900">
                  Can I play this song at our anniversary dinner or party?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Yes! You get a crystal-clear 320kbps MP3 audio file that you can download directly to your phone, computer, or music library, plus an interactive gift link that streams instantly on any device.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <h3 className="text-lg font-bold text-slate-900">
                  Can I edit the lyrics if a name or memory needs tweaking?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Yes, right after entering your story, you review the complete rhyming lyrics before the song is composed. You can adjust details or regenerate lines in seconds.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <h3 className="text-lg font-bold text-slate-900">
                  Do I have to pay upfront?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Never. You can create your custom lyrics and listen to your song preview completely free. You only pay $1.99 when you love the song and are ready to download the full track.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <h3 className="text-lg font-bold text-slate-900">
                  How many versions of the song do I receive?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Every order generates 2 distinct musical interpretations of your lyrics (with different vocal and tempo variations) so you can pick the version that moves you most.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
