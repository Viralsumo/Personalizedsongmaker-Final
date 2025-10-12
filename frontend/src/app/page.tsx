'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Feature from './Feature';
import FaqItem from './FaqItem'; // Assuming FaqItem is in the same directory
import { MusicalNoteIcon, PencilIcon, SparklesIcon, HeartIcon, PlayIcon, VideoCameraIcon, CurrencyDollarIcon, QuestionMarkCircleIcon, GiftIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { PauseIcon, CheckBadgeIcon, ShieldCheckIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

// Hero Section Component
const HeroSection = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        // Check if duration is a valid number before setting
        if (isFinite(audio.duration)) {
          setDuration(audio.duration);
        }
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      }
      const setAudioTime = () => setCurrentTime(audio.currentTime);

      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);

      // If audio is already loaded, set the data immediately
      if (audio.readyState > 0) {
        setAudioData();
      }

      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
      }
    }
  }, []);

  return (
    <header className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 sm:pt-10 sm:pb-12 lg:flex lg:items-center lg:gap-x-10">
        <div className="max-w-2xl lg:mx-0 lg:flex-auto z-10">
          <div className="flex">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-pink-600 ring-1 ring-pink-600/20 hover:ring-pink-600/30 bg-pink-50/80 backdrop-blur-sm">
              <span className="font-semibold text-pink-500">Offer</span>
              <span className="h-4 w-px bg-pink-600/20" aria-hidden="true" />
              <a href="#pricing" className="flex items-center gap-x-1">
                <span className="absolute inset-0" aria-hidden="true" />
                Inaugural deal: 2 songs for $1.99
              </a>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-x-4">
            <GiftIcon className="h-24 w-24 text-pink-500 hidden sm:block" />
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Turn Your Feelings Into a&nbsp;Timeless Personalized Song
            </h1>
          </div>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Effortlessly create a studio-quality song from your memories. The most heartfelt gift for anniversaries, birthdays, or just to say 'I love you'.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#create"
              className="rounded-md px-5 py-3 text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-pink-500 hover:bg-pink-600"
            >
              Create Your Song
            </a>
            <a href="#samples" className="text-base font-semibold leading-7 text-slate-900">
              Hear Samples <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="mt-8 text-sm text-slate-600">
            <p>
              <span className="font-bold text-slate-800">★ 4.9/5 stars</span> from beta testers and real customers all over the world.
            </p>
            <div className="mt-4 flex items-center gap-x-6 text-slate-700">
              <div className="flex items-center gap-x-1.5">
                <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-x-1.5">
                <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg text-slate-900">For Pradnya </h4>
              <span className="text-sm font-medium rounded-full px-3 py-1 bg-fuchsia-100 text-fuchsia-600">
                Acoustic Pop
              </span>
            </div>
            <p className="text-sm text-slate-700 mt-1">A song about our journey together. From Husband to Wife</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-pink-500" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}></div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <button onClick={togglePlayPause} className="w-12 h-12 flex items-center justify-center rounded-full text-white transition-colors bg-pink-500 hover:bg-pink-600">
                {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
              </button>
              <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden">
                <source src="/samples/sample1.mp3" type="audio/mpeg" />
              </audio>
              <div className="text-sm">
                <div className="font-medium text-slate-900">Now Playing: "Our Adventure"</div>
                <div className="text-slate-600">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Create Song Form Section Component
const CreateSongFormSection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    occasion: '',
    to_person: '',
    from_person: '',
    story: '',
    mood: 'Happy',
    style: 'Acoustic Pop',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        name: `${formData.to_person} (from ${formData.from_person})`,
        occasion: formData.occasion,
        details: formData.story, // Use 'details' key as expected by backend
        style: formData.style,
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${apiUrl}/generate_lyrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // Send the corrected payload
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate lyrics.');
      }

      // Save all the data needed for the next step
      const songData = { ...payload, lyrics: data.lyrics };
      sessionStorage.setItem('songData', JSON.stringify(songData));

      router.push('/lyrics-preview');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="create" className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-fuchsia-600">Start Here</h2>
          <div className="mt-2 flex items-center justify-center gap-x-3">
            <PencilSquareIcon className="h-8 w-8 text-fuchsia-600" />
            <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Create Your Personalized Song
            </p>
          </div>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Fill out the details below to begin. The more you share, the more personal your song will be.
          </p>
        </div>
        <form onSubmit={handleFormSubmit} className="mt-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="occasion" className="block text-sm font-bold leading-6 text-slate-800">Occasion</label>
              <select id="occasion" name="occasion" value={formData.occasion} onChange={handleInputChange} className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6" required>
                <option value="" disabled>Select an occasion...</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Wedding</option>
                <option>Valentine's Day</option>
                <option>Mother's Day</option>
                <option>Father's Day</option>
                <option>Just Because</option>
              </select>
            </div>
            <div>
              <label htmlFor="style" className="block text-sm font-bold leading-6 text-slate-800">Music Style</label>
              <select id="style" name="style" value={formData.style} onChange={handleInputChange} className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6">
                <option>Acoustic Pop</option>
                <option>Sentimental Ballad</option>
                <option>Upbeat Pop</option>
                <option>Folk</option>
                <option>Jazz</option>
              </select>
            </div>
            <div>
              <label htmlFor="to_person" className="block text-sm font-bold leading-6 text-slate-800">To (Recipient's Name)</label>
              <input type="text" name="to_person" id="to_person" value={formData.to_person} onChange={handleInputChange} className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6" required />
            </div>
            <div>
              <label htmlFor="from_person" className="block text-sm font-bold leading-6 text-slate-800">From (Your Name)</label>
              <input type="text" name="from_person" id="from_person" value={formData.from_person} onChange={handleInputChange} className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6" required />
            </div>
          </div>
          <div>
            <label htmlFor="story" className="block text-sm font-bold leading-6 text-slate-800">Your Story</label>
            <textarea name="story" id="story" value={formData.story} onChange={handleInputChange} rows={5} placeholder="Share special memories, inside jokes, feelings, and anything that makes your story unique." className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6" required />
            <p className="mt-2 text-xs text-slate-600">This is the most important part! The more detail, the better.</p>
          </div>
          <div>
            <label htmlFor="mood" className="block text-sm font-bold leading-6 text-slate-800">Mood / Vibe</label>
            <select id="mood" name="mood" value={formData.mood} onChange={handleInputChange} className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6">
                <option>Happy</option>
                <option>Emotional</option>
                <option>Funny</option>
                <option>Romantic</option>
                <option>Nostalgic</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center rounded-md px-8 py-4 text-lg font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-opacity bg-pink-500 hover:bg-pink-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="animate-pulse -ml-1 mr-3 h-5 w-5 text-white">
                    <rect x="1" y="6" width="2.8" height="12" fill="currentColor"><animate attributeName="height" attributeType="XML" values="12; 20; 12" begin="0s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="6; 2; 6" begin="0s" dur="0.6s" repeatCount="indefinite" /></rect>
                    <rect x="6" y="6" width="2.8" height="12" fill="currentColor"><animate attributeName="height" attributeType="XML" values="12; 20; 12" begin="0.15s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="6; 2; 6" begin="0.15s" dur="0.6s" repeatCount="indefinite" /></rect>
                    <rect x="11" y="6" width="2.8" height="12" fill="currentColor"><animate attributeName="height" attributeType="XML" values="12; 20; 12" begin="0.3s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="6; 2; 6" begin="0.3s" dur="0.6s" repeatCount="indefinite" /></rect>
                    <rect x="16" y="6" width="2.8" height="12" fill="currentColor"><animate attributeName="height" attributeType="XML" values="12; 20; 12" begin="0.45s" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="6; 2; 6" begin="0.45s" dur="0.6s" repeatCount="indefinite" /></rect>
                  </svg>
                  Generating Your Lyrics...
                </>
              ) : 'Generate Lyrics & See Price'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// How It Works Section Component
const HowItWorksSection = () => (
  <section id="how" className="py-12 sm:py-16 bg-pink-50/50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-fuchsia-600">How It Works</h2>
        <div className="mt-2 flex items-center justify-center gap-x-3">
          <SparklesIcon className="h-8 w-8 text-fuchsia-600" />
          <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From Your Story to a Hit Song in 4 Simple Steps
          </p>
        </div>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          Our process is designed to be simple, fast, and magical. See your story become a song in minutes.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          <Feature
            title="1. Tell Your Story"
            desc="Pour your heart out. Share the memories, the laughter, and the little details that make your story unique. This is the soul of your song."
            icon={<PencilIcon className="h-8 w-8 text-white" />} // Icons are inside a teal circle, so white is good.
          />
          <Feature
            title="2. We Craft The Lyrics"
            desc="Our creative AI instantly weaves your story into beautiful lyrics. You get to review and approve every word before we create the music."
            icon={<MusicalNoteIcon className="h-8 w-8 text-white" />} // Icons are inside a teal circle, so white is good.
          />
          <Feature
            title="3. Preview Your Song"
            desc="Hear your story come to life! Listen to a free 30-second preview in two distinct musical styles. It's magic, and completely risk-free."
            icon={<SparklesIcon className="h-8 w-8 text-white" />} // Icons are inside a teal circle, so white is good.
          />
          <Feature
            title="4. Pay & Receive"
            desc="Love it? For just $1.99, unlock both full-length songs. Download them instantly or send them as a beautiful, shareable gift page."
            icon={<CurrencyDollarIcon className="h-8 w-8 text-white" />}
          />
        </dl>
      </div>
    </div>
  </section>
);

// Samples Section Component
const SamplesSection = () => (
  <section id="samples" className="py-12 sm:py-16 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-fuchsia-600">Our Work</h2>
        <div className="mt-2 flex items-center justify-center gap-x-3">
          <MusicalNoteIcon className="h-8 w-8 text-fuchsia-600" />
          <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Listen to What We've Created
          </p>
        </div>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          Each song is a unique story. Here are a few of our favorites.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[ 
          { title: "Anniversary Ballad", genre: "Acoustic", id: 1 },
          { title: "Birthday Pop Anthem", genre: "Pop", id: 2 },
          { title: "A Lullaby for Leo", genre: "Folk", id: 3 },
        ].map((sample) => (
          <div key={sample.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-slate-900">{sample.title}</h4>
                <p className="text-sm text-slate-700">{sample.genre}</p>
              </div>
              <HeartIcon className="w-6 h-6 text-gray-300 hover:text-pink-500 transition-colors" />
            </div>
            <audio controls preload="none" className="w-full">
              <source src={`/samples/sample${sample.id}.mp3`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Pricing Section Component
const PricingSection = () => (
  <section id="pricing" className="py-12 sm:py-16 bg-fuchsia-600">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-base font-semibold leading-7 text-white">Inaugural Offer</h2>
        <div className="mt-2 flex items-center justify-center gap-x-3">
          <GiftIcon className="h-8 w-8 text-white" />
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One Simple Price, Two Unique Songs
          </p>
        </div>
        <p className="mt-6 text-lg leading-8 text-white/80">
          For a limited time, get one set of custom lyrics transformed into two complete songs with different musical styles.
        </p>
      </div>
      <div className="mt-16 max-w-lg mx-auto bg-white rounded-3xl p-8 shadow-2xl">
          <h3 className="text-lg font-semibold leading-8 text-slate-900">Special Launch Deal</h3>
          <p className="mt-4 flex items-baseline gap-x-1">
            <span className="text-5xl font-bold tracking-tight text-slate-900">$1.99</span>
          </p>
          <p className="mt-4 text-base leading-7 text-slate-700">You get one set of personalized lyrics and two full song productions in different musical styles.</p>
          <a
            href="#create"
            className="mt-8 block w-full rounded-md py-3 px-4 text-center text-base font-semibold text-white shadow-sm bg-pink-500 hover:bg-pink-600"
          >
            Create Your Song Now
          </a>
          <div className="mt-8 flex items-start gap-x-3 text-sm leading-6 text-slate-700">
            <VideoCameraIcon className="h-6 w-5 flex-none text-slate-500" aria-hidden="true" />
            <span><b>Coming Soon:</b> Turn your song into a beautiful video montage with your own photos. This feature will be available in a future version!</span>
          </div>
      </div>
   </div>
  </section>
);

// Testimonials Section Component
const TestimonialsSection = () => {
  // Define a map for testimonial background colors to ensure Tailwind CSS generates these classes.
  const bgColorMap: { [key: string]: string } = {
    coral: 'bg-pink-500',
    teal: 'bg-fuchsia-500',
    gold: 'bg-amber-500', // Assuming gold is a desired accent color for variety
  };
  return (
    <section className="py-12 sm:py-16 bg-pink-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-fuchsia-600">Don't Just Take Our Word For It</h2>        
        <div className="mt-2 flex items-center justify-center gap-x-3">
          <ChatBubbleLeftRightIcon className="h-8 w-8 text-fuchsia-600" />
          <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Real Stories, Real Emotions
          </p>
        </div>
      </div>
      <div className="mt-16 flow-root ">
        <div className="-m-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { name: 'Aanya K.', location: 'Bengaluru, India', quote: 'They turned our story into a song that made my partner cry happy tears. The most perfect and personal gift I’ve ever given.', color: 'coral' },
            { name: 'Liam O.', location: 'Dublin, Ireland', quote: 'Brilliant service. I was skeptical about the speed, but the quality is genuinely fantastic. A really unique gift for my brother.', color: 'teal' },
            { name: 'Maria G.', location: 'São Paulo, Brazil', quote: 'What a unique gift idea! The song was both funny and sweet, just like I asked. It captured our relationship perfectly. Thank you!', color: 'gold' },
            { name: 'Chloe L.', location: 'Toronto, Canada', quote: 'I was blown away by the quality for the price. The lyrics were so thoughtful. It\'s a memory we\'ll have forever.', color: 'teal' },
            { name: 'Kenji T.', location: 'Tokyo, Japan', quote: 'I used this for my girlfriend\'s birthday. The song was so personal and touching. She loved it! The process was simple and the result was professional.', color: 'gold' },
            { name: 'Fatima A.', location: 'Dubai, UAE', quote: 'The perfect way to say \'I love you\'. I got a song for my husband and he was speechless. It was so easy to do from my phone.', color: 'coral' },
            { name: 'Emily S.', location: 'Sydney, Australia', quote: 'Absolutely incredible! I gave them a few details for my parents\' anniversary and they created a masterpiece. The turnaround was so fast!', color: 'gold' },
            { name: 'David C.', location: 'Cape Town, SA', quote: 'Used this for a friend’s farewell. The song was a hit! It was emotional, funny, and perfectly captured our friendship. 10/10.', color: 'coral' },
            { name: 'Isabella M.', location: 'Rome, Italy', quote: 'A truly special service. The melody was beautiful and the lyrics felt like they came straight from my heart. My nonna adored it.', color: 'teal' },
            { name: 'Vikram R.', location: 'Pune, India', quote: 'I was blown away by the quality. It sounded like a real radio hit, but the lyrics were all about us. Fast, emotional, and beautifully produced.', color: 'coral' },
            { name: 'John M.', location: 'London, UK', quote: 'The melody fit our story so well—it brought tears to everyone\'s eyes at the wedding. Worth every penny. An absolute treasure.', color: 'gold' },
            { name: 'Sophie B.', location: 'Paris, France', quote: 'I am not a creative person, so this was perfect. The song for my sister\'s graduation was better than I could have imagined. So simple!', color: 'teal' },
          ].map((testimonial) => (
            <div key={testimonial.name} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
              <p className="text-slate-700 leading-relaxed">“{testimonial.quote}”</p>
              <div className="flex items-center gap-4 mt-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${bgColorMap[testimonial.color]}`}>
                  {testimonial.name.charAt(0)}{testimonial.name.split(' ')[1].charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

// FAQ Section Component
const FaqSection = () => {
  const faqs = [
    { q: 'How long does it take to get my songs?', a: 'Amazingly fast! After you approve the lyrics, your two song versions are generated and delivered in under 5 minutes.' },
    { q: 'What format do the songs and lyrics come in?', a: 'You will receive two high-quality premium MP3 files. The lyrics are available to copy directly or download as a PDF, perfect for sharing.' },
    { q: 'What if I don\'t like the song preview?', a: 'No problem at all. If you are not happy with the 30-second preview of your song, you are not required to pay. You only pay if you love it.' },
    { q: 'Can I get a refund or a redo after I purchase?', a: 'Once you have paid and received the full-length songs, we cannot offer a redo or a refund. We provide the preview so you can be 100% sure you love it before you buy.' },
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-fuchsia-600">Have Questions?</h2>          
          <div className="mt-2 flex items-center justify-center gap-x-3">
            <QuestionMarkCircleIcon className="h-8 w-8 text-fuchsia-600" />
            <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </p>
          </div>
        </div>
        <div className="mt-12">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};


export default function HomePage() {
  return (
    <div className="bg-white">
      <main>
        <HeroSection />
        <CreateSongFormSection />
        <HowItWorksSection />
        <SamplesSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
    </div>
  );
}
