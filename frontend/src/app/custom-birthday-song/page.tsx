import type { Metadata } from 'next';
import React from 'react';
import CreateSongForm from '../CreateSongForm';
import {
  SparklesIcon,
  CakeIcon,
  CheckBadgeIcon,
  MusicalNoteIcon,
  HeartIcon,
  LightBulbIcon,
  CheckIcon,
  ChatBubbleBottomCenterTextIcon,
  GiftIcon,
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Custom Birthday Song with Name & Story | Personalized Birthday Gift',
  description:
    'Create an unforgettable custom birthday song with their name, inside jokes, and special memories. Studio-quality pop or acoustic song in under 3 minutes for $4.99.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/custom-birthday-song',
  },
  openGraph: {
    title: 'Custom Birthday Song with Name & Story | Personalized Song Maker',
    description:
      'Skip the boring Happy Birthday track. Create a personalized pop or acoustic birthday song featuring their name, memories, and inside jokes. Free audio preview.',
    url: 'https://www.personalizedsongmaker.com/custom-birthday-song',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Custom Birthday Song with Name & Memories',
      description:
        'A personalized birthday song created with their name, milestone age, inside jokes, and favorite memories. Ready in 3 minutes.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      offers: {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.personalizedsongmaker.com/custom-birthday-song',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.92',
        reviewCount: '1380',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do you personalize the birthday song?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You share their name, your relationship, favorite memories, hilarious inside jokes, hobbies, or milestone age. Our specialized lyric engine turns your story into rhyming verses and an anthemic chorus, and our audio engine creates a full studio track.',
          },
        },
        {
          '@type': 'Question',
          name: 'What styles of birthday songs are available?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can choose between Upbeat Pop, Acoustic Guitar, Sentimental Ballad, Indie Folk, and Smooth Jazz, with moods ranging from funny and party vibes to nostalgic and heartfelt.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I hear the birthday song before I pay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can generate the custom lyrics and listen to an audio preview completely free before deciding to download the full track for $4.99.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to create a custom birthday song?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The entire process takes under 3 minutes: roughly 30 seconds to enter your story, 5 seconds to generate lyrics, and under 2 minutes to compose the full music.',
          },
        },
      ],
    },
  ],
};

export default function CustomBirthdaySongPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-800">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/70 via-white to-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-purple-700 bg-purple-100/80 border border-purple-200 mb-6 shadow-sm">
              <CakeIcon className="h-4 w-4 text-purple-600" />
              The Most Heartfelt Birthday Surprise Gift
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
              Create a Custom Birthday Song <br />
              <span className="text-purple-600">Starring Their Name &amp; Real Memories</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Say goodbye to generic greeting cards and boring &apos;Happy Birthday&apos; chants. Turn childhood memories, hilarious inside jokes, and personal milestones into an unforgettable studio song in <strong className="text-slate-900">under 3 minutes</strong> for just <strong className="text-purple-600">$4.99</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/25 transition-all text-center"
              >
                Make a Birthday Song Now ($4.99)
              </a>
              <a
                href="#samples"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all text-center"
              >
                Hear Audio Sample ↓
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                Over 12,000 Songs Created
              </span>
              <span className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-yellow-500" />
                Ready in 3 Minutes
              </span>
              <span className="flex items-center gap-2">
                <GiftIcon className="h-5 w-5 text-purple-500" />
                Free Digital Gift Page Included
              </span>
            </div>
          </div>
        </section>

        {/* Milestone Birthday Guide */}
        <section className="py-16 sm:py-20 bg-slate-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Custom Songs for Every Milestone Birthday
              </h2>
              <p className="mt-4 text-slate-600 text-lg">
                Whether it is an energetic party anthem or a nostalgic tear-jerker, tailored to their life stage:
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  18th &amp; 21st
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Coming of Age Anthems</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Celebrate college adventures, road trips, freedom, and wild memories with upbeat pop and rock energy that hypes up the birthday party.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
                  30th &amp; 40th
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">The Decade Milestone</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Celebrate career milestones, friendships that survived through the years, funny aging jokes, and how far they&apos;ve come with acoustic storytelling.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  50th &amp; 60th
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Golden Celebration</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Heartfelt ballads honoring parents, family legacy, childhood memories, and all the wisdom and warmth they bring to everyone around them.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                  Kids &amp; Family
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Catchy Kids Anthems</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Catchy, joyful melodies packed with their favorite superheroes, pets, games, and goofy habits that kids will play on repeat all year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Audio Samples with Real Lyric Breakdown */}
        <section id="samples" className="py-16 sm:py-24 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Listen to a Real Custom Birthday Track
            </h2>
            <p className="mt-3 text-slate-600">
              Here is how a real user prompt turned into a full studio track in 2 minutes:
            </p>

            <div className="mt-10 p-6 sm:p-8 rounded-2xl border border-gray-200 bg-slate-50 shadow-md text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Best Friend Celebration Track</h3>
                  <p className="text-sm text-slate-500">Style: Acoustic Pop • Mood: Upbeat &amp; Funny</p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                  Studio Sample
                </span>
              </div>

              <audio controls className="w-full mt-5">
                <source src="/samples/sample2.mp3" type="audio/mpeg" />
                Your browser does not support audio playback.
              </audio>

              <div className="mt-6 p-5 rounded-xl bg-white border border-gray-200">
                <p className="font-bold text-slate-900 text-sm mb-2">Lyrics Breakdown:</p>
                <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-mono leading-relaxed">
                  <p>
                    <span className="font-bold text-purple-700 font-sans">[Verse 1 - Inside Joke]</span><br />
                    Remember back in dorm room 4B,<br />
                    Burning midnight toast and spillin&apos; Earl Grey tea?<br />
                    Ten years of bad decisions and laughin&apos; till we cry,<br />
                    You&apos;re still my favorite partner-in-crime under the sky.
                  </p>
                  <p>
                    <span className="font-bold text-purple-700 font-sans">[Chorus - Name &amp; Celebration]</span><br />
                    So here&apos;s to you, Sarah, raise your glass up high,<br />
                    Another year more brilliant as the days go by!<br />
                    May this chapter be the wildest ride yet,<br />
                    Happy birthday to the truest friend I ever met!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Prompts & Ideas Guide */}
        <section className="py-16 sm:py-20 bg-slate-50 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">
                What Details Make the Best Birthday Song?
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                Not sure what to write in your prompt? Here is our foolproof checklist to create lyrics that make them laugh and cry.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                <LightBulbIcon className="h-8 w-8 text-yellow-500 mb-3" />
                <h3 className="font-bold text-slate-900 text-base">1. Specific Inside Jokes</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Mention funny quirks, that time their car broke down on vacation, their strange coffee order, or a silly catchphrase only the two of you understand.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                <HeartIcon className="h-8 w-8 text-pink-500 mb-3" />
                <h3 className="font-bold text-slate-900 text-base">2. Meaningful Gratitude</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Share a moment they supported you, how they always show up when life gets tough, or why their friendship or presence means the world to your family.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                <SparklesIcon className="h-8 w-8 text-purple-500 mb-3" />
                <h3 className="font-bold text-slate-900 text-base">3. Future Wishes</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Mention their big dreams for the coming year—a new house, a promotion, an upcoming trip, or simply wishing them health and joy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Reusable Song Creator Form pre-configured for Birthday */}
        <div id="create" className="bg-white py-12">
          <CreateSongForm
            initialOccasion="Birthday"
            title="Create Their Custom Birthday Song"
            subtitle="Enter their name, your relationship, and your favorite memories or inside jokes. We will write the lyrics and generate the song in under 3 minutes."
          />
        </div>

        {/* Comprehensive Birthday FAQ Section */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center">
              Frequently Asked Questions About Custom Birthday Songs
            </h2>
            <div className="mt-12 space-y-6">
              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <h3 className="text-lg font-bold text-slate-900">
                  How long will it take to get the birthday song?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Our system generates your lyrics in under 5 seconds and composes the full audio in about 2 minutes. Even if the birthday party is in an hour, your song will be ready instantly.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <h3 className="text-lg font-bold text-slate-900">
                  Can I make the birthday song funny instead of emotional?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Yes! When filling out the form, simply select the &apos;Funny&apos; mood or pick &apos;Upbeat Pop&apos;. Fill your story with roast-style inside jokes, funny habits, or college memories, and the lyrics will be tailored for laughter.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <h3 className="text-lg font-bold text-slate-900">
                  How can I play the song at the birthday party?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  You can download the MP3 directly to your phone or computer to play over Bluetooth speakers, or simply open your personalized gift page link in your mobile browser.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <h3 className="text-lg font-bold text-slate-900">
                  Can I include multiple friends&apos; names in one song?
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Yes! In the &apos;From&apos; field, you can write &apos;Alex, Jordan, and the college crew&apos;, and mention group memories in the story box.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
