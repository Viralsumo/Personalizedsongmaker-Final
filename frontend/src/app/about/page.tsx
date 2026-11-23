import { HeartIcon, MusicalNoteIcon, SparklesIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us | Personalized Song Maker',
  description:
    'Learn how Personalized Song Maker turns your cherished memories, photos, and inside jokes into radio-grade custom songs & video keepsakes.',
  alternates: {
    canonical: 'https://www.personalizedsongmaker.com/about',
  },
};

const AboutPage = () => {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-pink-600">Our Story</h2>
          <div className="mt-2 flex items-center justify-center gap-x-3">
            <HeartIcon className="h-8 w-8 text-pink-600" />
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              The Voice of Your Heart, in a Song
            </h1>
          </div>
        </div>

        <div className="prose lg:prose-lg mt-10 max-w-none text-slate-700 mx-auto">
          <p>
            Personalized Song Maker was born from a simple idea: that the most powerful emotions are best expressed through music. We believe that everyone has a unique story to tell, a special memory to cherish, or a heartfelt message to share. But not everyone has the tools to turn those feelings into a song.
          </p>
          <p>
            That{'\u0027'}s where we come in.
          </p>

          <div className="mt-12 not-prose grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-fuchsia-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3">
                <MusicalNoteIcon className="h-8 w-8 text-fuchsia-600" />
                <h3 className="text-xl font-bold text-slate-800">Our Mission</h3>
              </div>
              <p className="mt-3 text-slate-700">
                Our mission is to make it easy and affordable for anyone to create a studio-quality, personalized song. We want to help you celebrate life{'\u0027'}s biggest moments—and the small ones, too—with a gift that is truly one-of-a-kind and will be treasured forever.
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3">
                <SparklesIcon className="h-8 w-8 text-pink-600" />
                <h3 className="text-xl font-bold text-slate-800">Our Technology</h3>
              </div>
              <p className="mt-3 text-slate-700">
                We combine the creative power of advanced AI with a passion for music. Our system is designed to understand the nuances of your story and craft lyrics that are both personal and poetic. Then, our AI composer brings those words to life with beautiful melodies in the style of your choice.
              </p>
            </div>
          </div>

          <p className="mt-12">
            We are a small team of musicians, developers, and storytellers dedicated to creating moments of joy and connection. Thank you for letting us be a part of your story. We can{'\u0027'}t wait to hear what we{'\u0027'}ll create together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;