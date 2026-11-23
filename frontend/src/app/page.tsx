import type { Metadata } from 'next';
import React from 'react';
import HomeClientView from './HomeClientView';

export const metadata: Metadata = {
  title: 'Personalized Video Songs from Your Photos & Stories | Just $9.99',
  description:
    'Turn your favorite phone photos and memories into a studio-grade custom video song in under 3 minutes. Free 30s studio preview. The perfect heartfelt gift for birthdays, anniversaries, weddings, & romance.',
  keywords: [
    'personalized song',
    'custom video song',
    'custom song maker',
    'personalized anniversary song',
    'custom birthday song',
    'songfinch alternative',
    'photo slideshow video song',
    'custom song from photos',
    'unique romantic gift',
  ],
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com',
  },
  openGraph: {
    title: 'Personalized Video Songs from Your Photos & Memories | Just $9.99',
    description:
      'Turn your phone pictures & favorite memories into a studio-quality custom song and synced video premiere. Free 30-second preview, full song from just $4.99.',
    url: 'https://www.personalizedsongmaker.com',
    siteName: 'Personalized Song Maker',
    images: [
      {
        url: 'https://www.personalizedsongmaker.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Personalized Song Maker - Custom Video Song Keepsake',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personalized Video Songs from Your Photos & Memories | Just $9.99',
    description:
      'Turn your phone pictures & favorite memories into a studio-quality custom song and synced video premiere. Free preview first.',
    images: ['https://www.personalizedsongmaker.com/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.personalizedsongmaker.com/#website',
      url: 'https://www.personalizedsongmaker.com',
      name: 'Personalized Song Maker',
      description: 'Turn your photos and personal stories into studio-grade custom video songs.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.personalizedsongmaker.com/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.personalizedsongmaker.com/#organization',
      name: 'Personalized Song Maker',
      url: 'https://www.personalizedsongmaker.com',
      logo: 'https://www.personalizedsongmaker.com/og-image.png',
    },
    {
      '@type': 'Product',
      '@id': 'https://www.personalizedsongmaker.com/#product',
      name: 'Personalized Video Song Keepsake',
      description:
        'A studio-quality custom song composed with your personal memories, inside jokes, and up to 10 photos turned into a 9:16 vertical video keepsake with synchronized lyrics.',
      image: 'https://www.personalizedsongmaker.com/og-image.png',
      brand: {
        '@type': 'Brand',
        name: 'Personalized Song Maker',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.95',
        reviewCount: '1280',
        bestRating: '5',
        worstRating: '1',
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Deluxe Video Keepsake',
          price: '9.99',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.personalizedsongmaker.com',
          priceValidUntil: '2026-12-31',
        },
        {
          '@type': 'Offer',
          name: 'Essential Audio Package',
          price: '4.99',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.personalizedsongmaker.com',
          priceValidUntil: '2026-12-31',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.personalizedsongmaker.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does Personalized Song Maker work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply select your occasion and music style, enter your memories and inside jokes, and optionally upload up to 10 photos. Our studio composes two 30-second studio preview clips for free in under 3 minutes. You can then unlock full songs and video premiere from $4.99.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I have to pay before hearing my custom song?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No upfront payment is required. You can listen to two 30-second studio preview clips 100% free. Once you love what you hear, you can unlock full songs and the video keepsake starting at $4.99.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does a personalized song cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Essential Audio package is $4.99 (includes 2 full-length studio MP3s and lyrics). The Deluxe Video Keepsake is $9.99 (includes a 9:16 vertical video with up to 10 photos, synced subtitles, and MP3 downloads).',
          },
        },
        {
          '@type': 'Question',
          name: 'How is this different from Songfinch or Songlorious?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Competitors like Songfinch typically charge $199 to $250+ and take 4 to 7 days to deliver an audio-only track. We deliver full studio songs and a 9:16 Deluxe Video Keepsake in just 3 minutes starting from only $4.99 with a free preview first.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I share the gift with my recipient?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every order comes with a private, interactive Gift Unwrapping reveal page with wax-seal envelope animation, romantic background music, and confetti. You can send the private link via WhatsApp, SMS, or email.',
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClientView />
    </>
  );
}
