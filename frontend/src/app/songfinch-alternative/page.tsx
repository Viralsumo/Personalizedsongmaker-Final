import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreateSongForm from '../CreateSongForm';
import {
  MusicalNoteIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  XMarkIcon,
  CheckIcon,
  LightBulbIcon,
  StarIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Songfinch Alternative: Custom Studio Songs from $1.99 | Honest 2026 Comparison',
  description:
    'Comparing Songfinch vs Personalized Song Maker. Discover why thousands choose our instant, studio-quality custom songs from $1.99 with free previews over $199 upfront fees.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/songfinch-alternative',
  },
  openGraph: {
    title: 'Songfinch Alternative: Custom Studio Songs from $1.99 (In 2 Mins)',
    description:
      'Turn your personal story into a studio-grade song in 2 minutes for $1.99 instead of $199+. Full side-by-side comparison, audio samples, and free preview.',
    url: 'https://www.personalizedsongmaker.com/songfinch-alternative',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Personalized Custom Song (Songfinch Alternative)',
      description:
        'A fully personalized, studio-quality custom song created from your real memories and story. Fast turnaround in under 3 minutes with audio preview.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      brand: {
        '@type': 'Brand',
        name: 'Personalized Song Maker',
      },
      offers: {
        '@type': 'Offer',
        price: '1.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/songfinch-alternative',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1240',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How is PersonalizedSongMaker different from Songfinch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'While Songfinch charges $199+ and takes 4 to 7 days to deliver a human-recorded song, PersonalizedSongMaker leverages cutting-edge generative audio intelligence to deliver studio-quality personalized songs in under 3 minutes starting at just $1.99. Crucially, you get to hear an audio preview before paying anything.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I hear my custom song before paying?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Unlike Songfinch which requires 100% upfront payment before any music is produced, PersonalizedSongMaker lets you generate lyrics, hear the actual audio preview, and only purchase the full download once you are completely thrilled with the song.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who owns the rights to the generated song?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You receive full personal rights to play, share, distribute to friends and family, use in personal videos, post on social media, and download the high-quality MP3 file forever.',
          },
        },
        {
          '@type': 'Question',
          name: 'What styles and genres can I generate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We support Acoustic Pop, Sentimental Ballad, Upbeat Pop, Indie Folk, Smooth Jazz, and Acoustic Rock, paired with multiple mood configurations ranging from romantic to funny and celebratory.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I make revisions if I want something changed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! On Songfinch, revisions can take days or require extra fees. On PersonalizedSongMaker, you can edit lyrics, change styles, or regenerate verses in seconds directly on your screen.',
          },
        },
      ],
    },
  ],
};

export default function SongfinchAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-pink-50/70 via-white to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-pink-700 bg-pink-100/80 border border-pink-200 mb-6 shadow-sm">
              <SparklesIcon className="h-4 w-4 text-pink-600" />
              Comprehensive 2026 Comparison Guide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              Looking for a Songfinch Alternative? <br />
              <span className="text-pink-600">Get Studio Songs for $1.99 in 2 Minutes</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Songfinch revolutionized personalized gifting, but paying <strong className="text-slate-900">$199 upfront</strong> and waiting <strong className="text-slate-900">7 days</strong> with zero previews is a huge commitment. Discover how PersonalizedSongMaker gives you heartfelt, studio-quality custom music instantly at 99% less cost.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-500/25 transition-all text-center"
              >
                Create Your Song Now ($1.99)
              </a>
              <a
                href="#comparison"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                See Full Comparison Table ↓
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                No $200 Upfront Risk
              </span>
              <span className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-purple-500" />
                Under 3 Minutes Delivery
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
                Free Audio Preview First
              </span>
            </div>
          </div>
        </section>

        {/* Quick Navigation / Table of Contents */}
        <section className="bg-slate-50 py-6 border-b border-gray-200 text-sm">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-600 font-medium">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-xs">Jump to:</span>
            <a href="#comparison" className="hover:text-pink-600 transition-colors">1. Side-by-Side Comparison</a>
            <a href="#samples" className="hover:text-pink-600 transition-colors">2. Audio Samples</a>
            <a href="#how-it-works" className="hover:text-pink-600 transition-colors">3. How the Tech Works</a>
            <a href="#pros-cons" className="hover:text-pink-600 transition-colors">4. Honest Pros &amp; Cons</a>
            <a href="#presentation" className="hover:text-pink-600 transition-colors">5. Creative Gift Ideas</a>
            <a href="#faq" className="hover:text-pink-600 transition-colors">6. FAQs</a>
          </div>
        </section>

        {/* In-Depth Comparison Table Section */}
        <section id="comparison" className="py-16 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Songfinch vs. Personalized Song Maker: Complete 2026 Breakdown
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Compare both services side-by-side across price, delivery speed, preview availability, and revision flexibility.
              </p>
            </div>

            <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 shadow-xl bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-slate-100/80 text-slate-900">
                      <th className="py-4 px-6 text-base font-bold">Feature / Capability</th>
                      <th className="py-4 px-6 text-base font-bold text-slate-500">Songfinch</th>
                      <th className="py-4 px-6 text-base font-bold text-pink-600 bg-pink-50/80">
                        Personalized Song Maker
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm sm:text-base">
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-800">Starting Price</td>
                      <td className="py-4 px-6 text-slate-500">$199.99</td>
                      <td className="py-4 px-6 font-bold text-pink-600 bg-pink-50/40">
                        $1.99 (99% Cheaper)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-800">Turnaround Speed</td>
                      <td className="py-4 px-6 text-slate-500">4 to 7 Business Days</td>
                      <td className="py-4 px-6 font-bold text-pink-600 bg-pink-50/40">
                        Under 3 Minutes (Instant)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-800">Preview Before Payment</td>
                      <td className="py-4 px-6 text-red-500 font-medium flex items-center gap-1.5 pt-4">
                        <XMarkIcon className="h-5 w-5" /> No (100% upfront risk)
                      </td>
                      <td className="py-4 px-6 font-semibold text-green-700 bg-pink-50/40">
                        <span className="flex items-center gap-1.5">
                          <CheckIcon className="h-5 w-5 text-green-600" /> Yes! Listen to preview first
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-800">Songs Delivered per Order</td>
                      <td className="py-4 px-6 text-slate-500">1 Version</td>
                      <td className="py-4 px-6 font-bold text-slate-900 bg-pink-50/40">
                        2 Full Variations (Pick your favorite)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-800">Lyric Customization Control</td>
                      <td className="py-4 px-6 text-slate-500">Artist writes lyrics; revisions take days</td>
                      <td className="py-4 px-6 font-bold text-slate-900 bg-pink-50/40">
                        Review &amp; approve custom lyrics before music is composed
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-800">Shareable Digital Gift Page</td>
                      <td className="py-4 px-6 text-slate-500">Extra paid add-on ($)</td>
                      <td className="py-4 px-6 font-bold text-green-700 bg-pink-50/40">
                        Included Free with custom letter
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-800">Audio Quality</td>
                      <td className="py-4 px-6 text-slate-500">Human acoustic session recording</td>
                      <td className="py-4 px-6 font-bold text-slate-900 bg-pink-50/40">
                        Studio-grade neural audio (Full stereo mix)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-800">Last-Minute Gift Friendly</td>
                      <td className="py-4 px-6 text-slate-500">Requires expensive 24h rush fee (~$50+)</td>
                      <td className="py-4 px-6 font-bold text-green-600 bg-pink-50/40">
                        100% Instant anytime
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Audio Samples with Lyric Breakdown */}
        <section id="samples" className="py-16 sm:py-24 bg-slate-50 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Hear the Studio Quality for Yourself
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                Listen to real custom songs created in under 3 minutes, and inspect the rhyming lyrics generated from real customer memories.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sample 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                    Acoustic Ballad • 5-Year Anniversary
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Time: 2m 14s</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Song for Pradnya</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Prompt details: How we met in college library, our rainy first date in Seattle, moving across the country together.
                </p>
                <audio controls className="w-full mt-4">
                  <source src="/samples/sample1.mp3" type="audio/mpeg" />
                  Your browser does not support audio playback.
                </audio>
                <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed font-mono">
                  <p className="font-bold text-slate-900 mb-1 font-sans">Sample Lyrics Excerpt:</p>
                  &quot;Rain on the window, coffee getting cold<br />
                  A library table where our story first unfold<br />
                  Five years flew like pages in the breeze<br />
                  With you, Pradnya, my whole heart feels at ease...&quot;
                </div>
              </div>

              {/* Sample 2 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    Upbeat Pop • Best Friend Birthday
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Time: 2m 08s</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Best Friend 30th Birthday</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Prompt details: 15 years of friendship, burnt midnight pizzas, road tripping in a broken Honda Civic, turning 30.
                </p>
                <audio controls className="w-full mt-4">
                  <source src="/samples/sample2.mp3" type="audio/mpeg" />
                  Your browser does not support audio playback.
                </audio>
                <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed font-mono">
                  <p className="font-bold text-slate-900 mb-1 font-sans">Sample Lyrics Excerpt:</p>
                  &quot;Burnt frozen pizza at two in the night<br />
                  That rattling Honda with one working light<br />
                  Now you&apos;re turning thirty, but don&apos;t you despair<br />
                  We&apos;re still causing trouble without a single care...&quot;
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How the Technology Works (E-E-A-T Section) */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                How It Works: Behind the Studio Quality
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Understanding how modern generative music intelligence replaces high session-musician fees.
              </p>
            </div>

            <div className="mt-12 space-y-8">
              <div className="flex gap-4 items-start p-6 rounded-2xl bg-pink-50/50 border border-pink-100">
                <DocumentTextIcon className="h-8 w-8 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">1. Natural Language Lyricism (OpenAI GPT-4o mini)</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    When you share your memories, our specialized storytelling prompt pipeline transforms them into rhythmically metered, rhyming verses and an anthemic chorus. It captures personal nicknames, locations, and milestones that generic song generators miss.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 rounded-2xl bg-purple-50/50 border border-purple-100">
                <MusicalNoteIcon className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">2. Neural Audio Synthesis (Suno Audio Engines)</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    Once lyrics are approved, our backend feeds them into state-of-the-art acoustic synthesis models that generate professional-grade instrumentals (acoustic guitar, piano, drums, bass) alongside expressive human-sounding vocals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
                <CurrencyDollarIcon className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">3. The 99% Cost Advantage Passed to You</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    Traditional services like Songfinch have to split your $199 fee between customer service reps, booking coordinators, studio engineers, and session musicians. Because our audio pipeline is fully automated and runs in seconds, we pass those savings directly to you at $1.99.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Honest Pros & Cons Section */}
        <section id="pros-cons" className="py-16 sm:py-24 bg-slate-50 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">
                An Honest Comparison: When to Choose Which
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                We believe in full transparency so you can make the right decision for your specific gift and budget.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* When to choose Songfinch */}
              <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">When Songfinch Is Right for You</h3>
                <p className="text-sm text-slate-600 mt-2">
                  Songfinch remains a reputable choice for specific scenarios:
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>You specifically want to support independent touring human musicians.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>You have a budget of $200+ and don&apos;t mind paying all of it upfront.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>You have 1–2 weeks before your anniversary or birthday event.</span>
                  </li>
                </ul>
              </div>

              {/* When to choose PersonalizedSongMaker */}
              <div className="p-8 rounded-2xl bg-white border-2 border-pink-500 shadow-lg relative">
                <span className="absolute -top-3 right-6 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended Choice
                </span>
                <h3 className="text-xl font-bold text-pink-600">When Personalized Song Maker Is Right</h3>
                <p className="text-sm text-slate-600 mt-2">
                  The best option for value, speed, and peace of mind:
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>You want to hear your song first:</strong> Zero financial risk before previewing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>You want it today:</strong> Ready in 3 minutes—ideal for last-minute gifts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>You want supreme value:</strong> $1.99 delivers studio quality that makes recipients cry happy tears.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>You want options:</strong> You receive 2 distinct song interpretations to pick from.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Creative Presentation Guide */}
        <section id="presentation" className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">
                5 Creative Ways to Present Your Custom Song
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                How our customers turn a digital song into an unforgettable real-life memory.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div className="p-6 rounded-xl bg-slate-50 border border-gray-200">
                <span className="text-2xl">🚗</span>
                <h4 className="mt-3 font-bold text-slate-900 text-base">The Car Surprise</h4>
                <p className="mt-2 text-slate-600">
                  Connect your phone to the car Bluetooth on a drive. Play the song nonchalantly and watch their reaction when they realize the singer is singing about them!
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-gray-200">
                <span className="text-2xl">💌</span>
                <h4 className="mt-3 font-bold text-slate-900 text-base">QR Code in a Card</h4>
                <p className="mt-2 text-slate-600">
                  Print the unique gift webpage link as a QR code inside their greeting card or bouquet of flowers. When they scan it with their camera, their song plays immediately.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-gray-200">
                <span className="text-2xl">🕯️</span>
                <h4 className="mt-3 font-bold text-slate-900 text-base">Anniversary Dinner Dance</h4>
                <p className="mt-2 text-slate-600">
                  Put on the song during a romantic dinner at home or ask the restaurant / party DJ to play it for a private first dance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reusable Song Creator */}
        <div id="create" className="bg-slate-50 py-12">
          <CreateSongForm
            title="Create Your Studio Song in 3 Minutes"
            subtitle="Tell us who the song is for, the occasion, and your favorite memories. We'll write the lyrics and generate your preview right away."
          />
        </div>

        {/* Expanded FAQ Section */}
        <section id="faq" className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center">
              Frequently Asked Questions About Songfinch Alternatives
            </h2>
            <div className="mt-12 space-y-6">
              <div className="p-6 rounded-xl border border-gray-200 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">
                  Why is Personalized Song Maker so much cheaper than Songfinch?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Traditional services like Songfinch rely on hiring session musicians, studio rentals, and manual audio editing, creating large production overhead and charging $199+. PersonalizedSongMaker utilizes specialized AI songwriting and neural audio synthesis models, producing full radio-quality tracks in under 3 minutes for $1.99.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">
                  Do I have to pay before hearing my song?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  No! That is one of our biggest advantages over Songfinch. On our platform, you generate your custom lyrics and listen to your song preview completely free. You only pay $1.99 when you love the song and want to unlock the full track and gift page.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">
                  Can I edit the lyrics before music generation?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Yes. You review your custom lyrics right after submitting your story. If you want to tweak words, add another inside joke, or change the vibe, you can do so before composing the music.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">
                  What format do I receive my song in?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  You receive an instant high-bitrate MP3 audio file ready for download, as well as a private, personalized digital gift webpage that you can send directly to your recipient.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">
                  What if my occasion is in an hour?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  You are in the right place! Unlike human services that take 4 to 7 business days, our entire pipeline from submitting your memories to receiving your finished song takes under 3 minutes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
