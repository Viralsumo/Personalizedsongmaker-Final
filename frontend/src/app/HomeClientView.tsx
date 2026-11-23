'use client';

import React, { useState, useRef, useEffect } from 'react';
import CreateSongForm from './CreateSongForm';
import {
  MusicalNoteIcon,
  SparklesIcon,
  PlayIcon,
  PauseIcon,
  CheckIcon,
  GiftIcon,
  ShieldCheckIcon,
  VideoCameraIcon,
  StarIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  LockClosedIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

export default function HomeClientView() {
  const [selectedOccasionTab, setSelectedOccasionTab] = useState<string>('all');
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  // Real Video Player State
  const [activeVideoVersion, setActiveVideoVersion] = useState<number>(0);
  const realVideoUrls = [
    '/samples/real_demo_video.mp4',
    '/samples/real_demo_video_2.mp4',
  ];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(console.error);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const switchVideoVersion = (idx: number) => {
    setActiveVideoVersion(idx);
    if (videoRef.current) {
      videoRef.current.src = realVideoUrls[idx];
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(console.error);
    }
  };

  // Monitor scroll for mobile sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real audio players for sample bar
  const sampleTracks = [
    {
      id: 'sample_anniversary',
      title: 'Our Forever Ballad',
      recipient: 'Sarah & Alex (10th Anniversary)',
      style: 'Acoustic Folk Romance',
      url: '/samples/sample1.mp3',
    },
    {
      id: 'sample_birthday',
      title: 'Light Up The World',
      recipient: 'Maya (30th Birthday)',
      style: 'Uplifting Pop Anthem',
      url: '/samples/sample2.mp3',
    },
    {
      id: 'sample_lullaby',
      title: 'A Lullaby for Leo',
      recipient: 'Leo & Emma (First Birthday)',
      style: 'Heartfelt Gentle Acoustic',
      url: '/samples/sample3.mp3',
    },
  ];

  const [playingSample, setPlayingSample] = useState<number | null>(null);
  const sampleAudioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const toggleSamplePlay = (idx: number) => {
    sampleAudioRefs.current.forEach((audio, i) => {
      if (i !== idx && audio) {
        audio.pause();
      }
    });

    const target = sampleAudioRefs.current[idx];
    if (!target) return;

    if (target.paused) {
      target.play().then(() => setPlayingSample(idx)).catch(console.error);
    } else {
      target.pause();
      setPlayingSample(null);
    }
  };

  // Major Use Cases for non-tech users
  const useCases = [
    {
      id: 'birthday',
      category: 'birthday',
      badge: '🎂 Milestone Birthday',
      title: 'Birthday Songs That Bring Happy Tears',
      forWhom: 'Husband, Wife, Best Friend, Son, Daughter, or Parent',
      description:
        'Roast their funny habits, celebrate their biggest achievements, and celebrate their life with a custom song and photo slideshow they will never forget.',
      lyricsSnippet: '“Forty years of making everyone smile / Chasing golf balls into the trees for miles / Best dad in the dugout, heart of pure gold / A story that never gets old...”',
      tag: 'Upbeat Pop or Rock',
    },
    {
      id: 'anniversary',
      category: 'love',
      badge: '💍 Wedding & Anniversary',
      title: 'Your Entire Love Story Set to Music',
      forWhom: 'Spouse, Fiancé, Partner, or Bride & Groom',
      description:
        'From the moment you first met to your inside jokes and wedding vows. Turn your romance into a cinematic keepsake video for first dances or anniversaries.',
      lyricsSnippet: '“From that rainy train ride back in sixteen / You became the brightest dream I’d seen / Five years of memories, hand in hand / Best love in all the land...”',
      tag: 'Acoustic Ballad or Cinematic Piano',
    },
    {
      id: 'parents',
      category: 'family',
      badge: '💐 Mother’s & Father’s Day',
      title: 'A Heartfelt Thank-You for Mom or Dad',
      forWhom: 'Mom, Dad, Grandma, or Grandpa',
      description:
        'Say thank you for the sacrifices, early morning school runs, bedtime stories, and unconditional support with a song they’ll proudly show everyone.',
      lyricsSnippet: '“You worked two jobs and still made every game / Wiped our tears and took away the pain / Mom, you’re the rock that guided us through / Everything good in me comes from you...”',
      tag: 'Warm Country or Gentle Acoustic',
    },
    {
      id: 'romance',
      category: 'love',
      badge: '❤️ Romance & “Just Because”',
      title: 'Surprise Your Boyfriend, Girlfriend, or Spouse',
      forWhom: 'Boyfriend, Girlfriend, or Secret Crush',
      description:
        'You don’t need an official holiday to make someone feel deeply loved. Send a surprise song on WhatsApp or text that turns a regular day into magic.',
      lyricsSnippet: '“You steal my favorite oversized hoodie again / Dancing by the stove till the clock strikes ten / With your iced latte smile and your wild free mind / You’re the sweetest love I could find...”',
      tag: 'Modern Pop or R&B Groove',
    },
    {
      id: 'memorial',
      category: 'family',
      badge: '🕊️ Memorial & Celebration of Life',
      title: 'Honor the Legacy of Someone Dearly Missed',
      forWhom: 'In memory of a Late Parent, Grandparent, or Dear Friend',
      description:
        'A comforting, beautiful celebration of life. Gather family photos and favorite sayings to keep their spirit, voice, and memories alive forever.',
      lyricsSnippet: '“Your garden roses still bloom in the spring / We still hear the gentle melodies you’d sing / In every quiet sunrise and starry night / Your memory stays our guiding light...”',
      tag: 'Peaceful Acoustic or Piano Hymn',
    },
    {
      id: 'retirement',
      category: 'milestone',
      badge: '🏆 Retirement & Career Farewell',
      title: 'The Ultimate Send-Off for a Colleague or Boss',
      forWhom: 'Retiring Coworker, Inspiring Boss, or Favorite Teacher',
      description:
        'Give them a legendary farewell! Celebrate 30+ years of hard work, office running jokes, and their exciting new chapter of hobbies and relaxation.',
      lyricsSnippet: '“Thirty-two years of experiments and chalk / Inspiring every student through every talk / Put down the red pen, pack up the rod / You’re the greatest teacher by far, thank God...”',
      tag: 'Celebratory Folk-Rock or Anthem',
    },
  ];

  const filteredUseCases =
    selectedOccasionTab === 'all'
      ? useCases
      : useCases.filter((item) => item.category === selectedOccasionTab);

  // Authentic Customer Testimonials Wall
  const testimonials = [
    {
      id: 't1',
      name: 'Aanya K.',
      location: 'Bengaluru, India',
      quote: 'They turned our story into a song that made my partner cry happy tears. The most perfect and personal gift I’ve ever given.',
      tag: '😭 Happy Tears',
      occasion: 'Anniversary Keepsake',
      color: 'bg-pink-500',
    },
    {
      id: 't2',
      name: 'Liam O.',
      location: 'Dublin, Ireland',
      quote: 'Brilliant service. I was skeptical about the speed, but the quality is genuinely fantastic. A really unique gift for my brother’s milestone birthday.',
      tag: '🎉 Milestone Birthday',
      occasion: '30th Birthday',
      color: 'bg-purple-600',
    },
    {
      id: 't3',
      name: 'John M.',
      location: 'London, UK',
      quote: 'The melody fit our story so well—it brought tears to everyone\'s eyes at the wedding. Worth every penny. An absolute treasure.',
      tag: '💍 Wedding First Dance',
      occasion: 'Wedding Day',
      color: 'bg-amber-500',
    },
    {
      id: 't4',
      name: 'Fatima A.',
      location: 'Dubai, UAE',
      quote: 'The perfect way to say "I love you". I got a song for my husband and he was speechless. It was so easy to do from my phone in under 5 minutes.',
      tag: '💖 Romance',
      occasion: 'Just Because',
      color: 'bg-pink-600',
    },
    {
      id: 't5',
      name: 'Emily S.',
      location: 'Sydney, Australia',
      quote: 'Absolutely incredible! I gave them a few details for my parents\' anniversary and they created a masterpiece. Mom still plays it every morning.',
      tag: '💐 Parents Tribute',
      occasion: '25th Anniversary',
      color: 'bg-emerald-600',
    },
    {
      id: 't6',
      name: 'Kenji T.',
      location: 'Tokyo, Japan',
      quote: 'I used this for my girlfriend\'s birthday. The song was so personal and touching. She loved it! The process was simple and result was pure studio quality.',
      tag: '🎂 Birthday Video',
      occasion: 'Girlfriend Birthday',
      color: 'bg-blue-600',
    },
    {
      id: 't7',
      name: 'Isabella M.',
      location: 'Rome, Italy',
      quote: 'A truly special service. The melody was beautiful and the lyrics felt like they came straight from my heart. My nonna adored her customized ballad.',
      tag: '🕊️ Family Legacy',
      occasion: 'Grandma Tribute',
      color: 'bg-purple-500',
    },
    {
      id: 't8',
      name: 'Vikram R.',
      location: 'Pune, India',
      quote: 'I was blown away by the quality. It sounded like a real radio hit, but the lyrics were all about us. Fast, emotional, and beautifully produced.',
      tag: '📻 Radio Quality',
      occasion: 'Romantic Surprise',
      color: 'bg-rose-600',
    },
    {
      id: 't9',
      name: 'David C.',
      location: 'Cape Town, SA',
      quote: 'Used this for a colleague’s farewell. The song was a hit at the party! It was emotional, funny, and perfectly captured our friendship. 10/10.',
      tag: '🏆 Work Farewell',
      occasion: 'Colleague Retirement',
      color: 'bg-amber-600',
    },
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION: Real Video Showcase + Dual Audio Switcher */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-fuchsia-50/70 via-pink-50/40 to-white pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Trust Badge with Diamond Shimmer & Ambient Glow */}
              <div className="relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold text-pink-900 bg-gradient-to-r from-pink-100/95 via-rose-50 to-purple-100/90 border border-pink-300 shadow-md animate-badge-glow overflow-hidden cursor-default select-none">
                {/* Sweeping Diamond Light Beam */}
                <span className="absolute inset-0 w-3/5 h-full bg-gradient-to-r from-transparent via-white/85 to-transparent pointer-events-none animate-badge-shimmer" />

                {/* Twinkling Sparkle Icon */}
                <SparklesIcon className="w-4 h-4 text-pink-600 animate-sparkle flex-shrink-0 relative z-10" />

                {/* Badge Text with Standout Price Pill */}
                <span className="relative z-10 flex items-center gap-1.5 flex-wrap justify-center lg:justify-start">
                  <span>The Gift That Brings Happy Tears 💖</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-black bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 text-white shadow-sm tracking-wide">
                    Video Just $9.99
                  </span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.14]">
                We Simply Turn Your <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600">
                  Photos &amp; Memories
                </span>
                <br className="hidden sm:inline" /> Into a Custom Video Song
              </h1>

              {/* Plain English Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <strong>No musical talent or tech skills needed!</strong> Just type your inside jokes and special moments like you&apos;re texting a friend, upload a few phone pictures, and our studio composes a real radio-quality song with synced subtitles.
              </p>

              {/* Visual 3-Pillar Value Props */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="p-3.5 bg-white rounded-2xl border border-pink-100 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Your Real Words</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Names, inside jokes &amp; dates turned into rhymes
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-purple-100 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <PhotoIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Phone Photos</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Smart Fit ensures no faces are ever cropped
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Listen 100% Free</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Hear 2 studio preview clips (30s) before spending a cent
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#create"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base sm:text-lg font-extrabold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-xl shadow-pink-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <GiftIcon className="w-5 h-5" />
                  <span>Create Your Song &amp; Video (Free Preview)</span>
                </a>

                <a
                  href="#recipe"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-gray-200 shadow-sm transition-colors text-center"
                >
                  How Simple Is It? ↓
                </a>
              </div>

              {/* Trust Badges & Social Proof */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-1 text-amber-500">
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <span className="font-bold text-slate-800 ml-1">4.95/5 Rating</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <CheckBadgeIcon className="w-4 h-4 text-emerald-500" />
                  Satisfaction Guarantee
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <LockClosedIcon className="w-3.5 h-3.5 text-slate-500" />
                  PayPal &amp; Cards
                </span>
              </div>
            </div>

            {/* Right Hero: Real Smartphone 9:16 Video Player */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-xs sm:max-w-sm relative">
                {/* Visual Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 rounded-3xl blur-xl opacity-30 animate-pulse pointer-events-none" />

                {/* Vertical Smartphone Video Player */}
                <div className="relative z-10">
                  <div className="bg-slate-900 rounded-3xl p-3 shadow-2xl border border-slate-800">
                    <div className="flex items-center justify-between px-3 py-1.5 mb-2">
                      <span className="text-[11px] font-bold text-pink-400 flex items-center gap-1.5">
                        <SparklesIcon className="w-3.5 h-3.5" />
                        Real Video Keepsake Preview
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                        720p Vertical
                      </span>
                    </div>

                    {/* 9:16 Smartphone Video Container */}
                    <div className="relative aspect-[9/16] w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
                      <video
                        ref={videoRef}
                        src={realVideoUrls[activeVideoVersion]}
                        playsInline
                        preload="metadata"
                        onTimeUpdate={() => {
                          if (videoRef.current && videoRef.current.duration) {
                            setVideoProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
                          }
                        }}
                        onEnded={() => setIsVideoPlaying(false)}
                        className="w-full h-full object-cover"
                      />

                      {/* Top Switcher Overlay */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-auto">
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20">
                          <button
                            type="button"
                            onClick={() => switchVideoVersion(0)}
                            className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                              activeVideoVersion === 0
                                ? 'bg-pink-500 text-white shadow'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            Song 1 (Acoustic)
                          </button>
                          <button
                            type="button"
                            onClick={() => switchVideoVersion(1)}
                            className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                              activeVideoVersion === 1
                                ? 'bg-purple-600 text-white shadow'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            Song 2 (Pop)
                          </button>
                        </div>

                        <span className="text-[9px] font-mono font-bold bg-black/60 text-pink-300 px-2 py-1 rounded-full border border-pink-500/30">
                          720p HD
                        </span>
                      </div>

                      {/* Centered Play Button Overlay when paused */}
                      {!isVideoPlaying && (
                        <div
                          onClick={toggleVideoPlay}
                          className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer z-10"
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-pink-500/50 hover:scale-110 active:scale-95 transition-transform">
                            <PlayIcon className="w-8 h-8 text-white ml-1" />
                          </div>
                          <span className="mt-3 text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full border border-white/20 shadow">
                            Tap to Watch Real Video Keepsake ▶
                          </span>
                        </div>
                      )}

                      {/* Bottom Control Bar */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 z-20 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={toggleVideoPlay}
                          className="text-white hover:text-pink-400 p-1"
                        >
                          {isVideoPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                        </button>
                        <div className="flex-1 bg-white/20 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all"
                            style={{ width: `${videoProgress}%` }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.muted = !isVideoMuted;
                              setIsVideoMuted(!isVideoMuted);
                            }
                          }}
                          className="text-white hover:text-pink-400 p-1 text-xs"
                        >
                          {isVideoMuted ? '🔇' : '🔊'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Switcher Tagline */}
                  <div className="mt-3 text-center bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-gray-200/80 shadow-sm">
                    <p className="text-xs text-slate-700 font-medium">
                      👆 <strong>Try it now!</strong> Tap <strong>Song 1</strong> or <strong>Song 2</strong> in the video to hear how the same memories sound in 2 different studio musical styles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2-SONG STYLE GUARANTEE BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white py-8 px-6 sm:px-8 border-y border-purple-900/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <MusicalNoteIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-pink-400">Our Exclusive Promise</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">The 2-Soundtrack Style Guarantee</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Never worry about not liking the singing voice or tempo. Every order delivers <strong>2 distinct studio recordings</strong> (e.g., Acoustic Guitar vs Upbeat Pop). Pick your favorite for your video, or keep both!
              </p>
            </div>
          </div>

          <a
            href="#create"
            className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap"
          >
            Try It 100% Free →
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* THE SIMPLE 3-PART RECIPE: Customer-First Benefits (Apple Style) */}
      {/* ------------------------------------------------------------- */}
      <section id="recipe" className="py-16 sm:py-24 bg-slate-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-extrabold text-pink-600 tracking-wider">
            Effortless Creation • Pure Emotion
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Three Simple Steps. One Unforgettable Moment.
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            You bring the memories. We bring the studio orchestra, the soulful singer, and the cinematic magic.
          </p>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            {/* Piece 1: Your Story */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center font-extrabold text-xl mb-5 shadow-sm">
                  1
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 mb-3">
                  Your Story
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Speak from the heart. We handle the poetry.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tell us the little moments only you two share—the late-night drives, the goofy habits, the inside jokes that always make you laugh. No rhyming or songwriting talent needed. Our studio turns your raw, honest thoughts into a radio-worthy song that sounds like it was written just for them. Because it was.
                </p>

                {/* Simulated Friendly Note Card */}
                <div className="mt-5 p-4 bg-pink-50/60 rounded-2xl border border-pink-100 text-xs text-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 block">
                    All you need to type:
                  </span>
                  <p className="font-serif italic text-slate-800 text-xs sm:text-sm leading-relaxed">
                    &ldquo;Met at the train station in 2018. He always burns the toast, loves our dog Milo, and still makes me laugh every single day.&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-pink-600">
                <CheckIcon className="w-4 h-4 flex-shrink-0" />
                <span>Zero writing or rhyming skills required</span>
              </div>
            </div>

            {/* Piece 2: Your Memories */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-extrabold text-xl mb-5 shadow-sm">
                  2
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 mb-3">
                  Your Memories
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Your favorite photos, brought to life.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pick a handful of snapshots straight from your phone camera roll—vacation smiles, candid hugs, and everyday laughter. We bring each memory into fluid motion, synchronized to every verse and chorus so that every smile is framed naturally and nobody is ever cut out.
                </p>

                {/* Friendly Photo Reassurance Card */}
                <div className="mt-5 p-4 bg-purple-50/60 rounded-2xl border border-purple-100 text-xs text-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                    Effortless Camera Roll Upload:
                  </span>
                  <p className="text-slate-800 text-xs leading-relaxed">
                    Vertical selfies, wide group shots, or old childhood scans—every picture glides seamlessly on screen with natural framing.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-purple-600">
                <CheckIcon className="w-4 h-4 flex-shrink-0" />
                <span>Every smile and face preserved beautifully</span>
              </div>
            </div>

            {/* Piece 3: The Keepsake */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-purple-800 shadow-xl relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center font-extrabold text-xl mb-5 shadow-md">
                  3
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40 mb-3">
                  The Keepsake
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  A gift they will replay for the rest of their life.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In under 3 minutes, your story becomes a full studio song and a heart-stirring vertical video with cinematic subtitles. Send it directly on WhatsApp, stream it to your living room TV, or watch their eyes fill with happy tears as they realize this song was created just for them.
                </p>

                {/* Instant Gifting Badge */}
                <div className="mt-5 p-4 bg-white/10 rounded-2xl border border-white/10 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-pink-300 font-bold">
                    <ShareIcon className="w-4 h-4 text-pink-400" />
                    <span>Instant WhatsApp &amp; Phone Gifting</span>
                  </div>
                  <p className="text-[12px] text-slate-300">
                    Includes full HD video, both MP3 song arrangements, and a private gift unboxing page with animated wax seal reveal.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-pink-400">
                <CheckIcon className="w-4 h-4 flex-shrink-0" />
                <span>Ready to gift in under 3 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* GIFT COMPARISON: Why A Personalized Song Beats Ordinary Gifts */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-extrabold text-pink-600 tracking-wider">
            Unbeatable Emotional Value
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why A Personalized Song Beats Ordinary Gifts
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Most gifts cost more, take longer to arrive, and are forgotten in a week. Our custom video keepsakes are remembered for a lifetime.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-gray-200 text-xs sm:text-sm font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-4">Gift Choice</th>
                  <th className="py-4 px-4">Typical Cost</th>
                  <th className="py-4 px-4">Lifespan</th>
                  <th className="py-4 px-4">Personalization</th>
                  <th className="py-4 px-4">Emotional Reaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                <tr className="text-slate-600">
                  <td className="py-4 px-4 font-semibold text-slate-800 flex items-center gap-2">
                    <span className="text-lg">💐</span> Fresh Flower Bouquet
                  </td>
                  <td className="py-4 px-4 font-medium">$60 – $90</td>
                  <td className="py-4 px-4 text-rose-500 font-medium">Wilts in 4–5 days</td>
                  <td className="py-4 px-4 text-slate-500">None (Standard arrangement)</td>
                  <td className="py-4 px-4">Pleasant for a moment</td>
                </tr>

                <tr className="text-slate-600">
                  <td className="py-4 px-4 font-semibold text-slate-800 flex items-center gap-2">
                    <span className="text-lg">💌</span> Store Greeting Card
                  </td>
                  <td className="py-4 px-4 font-medium">$6 – $8</td>
                  <td className="py-4 px-4 text-rose-500 font-medium">Tossed in drawer / trash</td>
                  <td className="py-4 px-4 text-slate-500">Handwritten signature only</td>
                  <td className="py-4 px-4">Standard polite smile</td>
                </tr>

                <tr className="text-slate-600">
                  <td className="py-4 px-4 font-semibold text-slate-800 flex items-center gap-2">
                    <span className="text-lg">🍽️</span> Dinner / Drinks Out
                  </td>
                  <td className="py-4 px-4 font-medium">$100 – $180</td>
                  <td className="py-4 px-4 text-slate-500">Over in 2 hours</td>
                  <td className="py-4 px-4 text-slate-500">None</td>
                  <td className="py-4 px-4">Fun evening</td>
                </tr>

                <tr className="text-slate-600">
                  <td className="py-4 px-4 font-semibold text-slate-800 flex items-center gap-2">
                    <span className="text-lg">🎸</span> Other Custom Songs (Songfinch)
                  </td>
                  <td className="py-4 px-4 text-rose-600 font-bold">$199 – $250+</td>
                  <td className="py-4 px-4 text-slate-700">Lifetime audio MP3</td>
                  <td className="py-4 px-4 text-rose-600 font-medium">Waits 4–7 days (no preview)</td>
                  <td className="py-4 px-4">High (very expensive)</td>
                </tr>

                {/* OUR WINNING ROW */}
                <tr className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border-2 border-pink-400 font-bold text-slate-900 rounded-2xl shadow-sm">
                  <td className="py-4 px-4 flex items-center gap-2 text-pink-700">
                    <SparklesIcon className="w-5 h-5 text-pink-600 flex-shrink-0" />
                    <span>Personalized Song &amp; Video</span>
                  </td>
                  <td className="py-4 px-4 text-pink-600 font-extrabold text-base">
                    $4.99 – $9.99
                  </td>
                  <td className="py-4 px-4 text-emerald-600 font-extrabold">
                    Lasts Forever (Keepsake)
                  </td>
                  <td className="py-4 px-4 text-purple-700 font-semibold">
                    100% Custom (Your inside jokes, names &amp; photos)
                  </td>
                  <td className="py-4 px-4 text-pink-600 font-extrabold">
                    😭 Happy Tears Guaranteed
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="#create"
              className="px-8 py-3.5 rounded-xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/25 transition-transform hover:scale-105 active:scale-95"
            >
              Create Your Unforgettable Gift (Free 30s Preview) →
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* OCCASION & USE CASES EXPLORER: "What Can You Create?" */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase font-extrabold text-pink-600 tracking-wider">
              Perfect For Every Life Moment
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Popular Songs You Can Create Today
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Whether celebrating a milestone birthday, a deep romance, or thanking mom and dad, here is how real people use our studio.
            </p>

            {/* Filter Tabs */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[
                { id: 'all', label: 'All Occasions' },
                { id: 'birthday', label: '🎂 Birthdays' },
                { id: 'love', label: '💍 Love & Anniversaries' },
                { id: 'family', label: '💐 Parents & Memorials' },
                { id: 'milestone', label: '🏆 Career & Retirement' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedOccasionTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    selectedOccasionTab === tab.id
                      ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Use Case Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUseCases.map((useCase) => (
              <div
                key={useCase.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                      {useCase.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                      {useCase.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                    {useCase.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 font-medium">
                    For: <span className="text-slate-700">{useCase.forWhom}</span>
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {useCase.description}
                  </p>

                  {/* Sample Lyrics Box */}
                  <div className="mt-4 p-3 bg-pink-50/50 rounded-2xl border border-pink-100 text-xs text-slate-700 italic">
                    <span className="not-italic font-bold text-[10px] text-pink-600 uppercase tracking-wider block mb-1">
                      Example Custom Lyrics:
                    </span>
                    {useCase.lyricsSnippet}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">100% Free to preview</span>
                  <a
                    href="#create"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Create This Song</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* AUDIO SAMPLES SECTION: Real Audio Files */}
      {/* ------------------------------------------------------------- */}
      <section id="samples" className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-extrabold text-pink-600 tracking-wider">Listen to Real Samples</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Hear How Studio-Quality Real Songs Sound
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Every track features rich acoustic arrangements, human-sounding vocals, and lyrics woven directly from personal stories.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {sampleTracks.map((sample, idx) => (
              <div
                key={sample.id}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                      {sample.style}
                    </span>
                    <span className="text-xs text-slate-400">0:30 Preview</span>
                  </div>
                  <h4 className="mt-3 text-lg font-bold text-slate-900">{sample.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{sample.recipient}</p>
                </div>

                <audio
                  ref={(el) => { sampleAudioRefs.current[idx] = el; }}
                  src={sample.url}
                  preload="none"
                  onEnded={() => setPlayingSample(null)}
                />

                <div className="mt-6 flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                  <button
                    type="button"
                    onClick={() => toggleSamplePlay(idx)}
                    className="w-10 h-10 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow transition-transform hover:scale-105 active:scale-95"
                    aria-label={playingSample === idx ? 'Pause sample' : 'Play sample'}
                  >
                    {playingSample === idx ? (
                      <PauseIcon className="w-5 h-5" />
                    ) : (
                      <PlayIcon className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                  <div className="flex-1 text-xs text-slate-600 font-medium">
                    {playingSample === idx ? 'Playing audio preview...' : 'Tap play to listen'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* TESTIMONIALS WALL: Real Stories, Real Tears */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-extrabold text-pink-600 tracking-wider">
              Loved Worldwide
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Real Stories, Happy Tears
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Over 1,500+ custom songs delivered. Here is how real recipients and gift-givers reacted.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-pink-700 bg-pink-100/80 px-2.5 py-0.5 rounded-full border border-pink-200">
                      {t.tag}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {t.occasion}
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    <StarIcon className="w-4 h-4" />
                    <StarIcon className="w-4 h-4" />
                    <StarIcon className="w-4 h-4" />
                    <StarIcon className="w-4 h-4" />
                    <StarIcon className="w-4 h-4" />
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs ${t.color}`}
                  >
                    {t.name.charAt(0)}
                    {t.name.split(' ')[1]?.charAt(0) || ''}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-xs sm:text-sm text-pink-700 font-semibold shadow-sm">
              <HeartIcon className="w-4 h-4 text-pink-600" />
              <span>Join over 1,500+ happy couples, parents, and friends worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SONG CREATION FORM */}
      {/* ------------------------------------------------------------- */}
      <div id="create" className="bg-gradient-to-b from-slate-50 to-white py-12 border-t border-gray-200">
        <CreateSongForm
          title="Create Your Custom Song & Video"
          subtitle="No musical talent needed! Fill in a few details below and listen to 2 studio preview clips (30s) 100% free before buying."
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PRICING SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="pricing" className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-extrabold text-pink-400 tracking-wider">Simple, Transparent Launch Rates</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
            Choose Your Unforgettable Keepsake
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Both packages unlock complete full-length studio songs upon purchase. 100% free to listen to your 30s previews before buying.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {/* Tier 1: Essential Audio */}
            <div className="bg-slate-800/90 rounded-3xl p-8 border border-slate-700 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MusicalNoteIcon className="w-5 h-5 text-slate-400" />
                    Essential Audio
                  </h3>
                  <span className="text-xs uppercase font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    50% OFF
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-base text-slate-400 line-through">$9.99</span>
                  <span className="text-4xl font-extrabold text-white">$4.99</span>
                </div>
                <p className="mt-2 text-xs text-slate-300">
                  Ideal for sending a pure audio love song or anniversary ballad.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>2 Unique Studio Audio Versions</strong> (MP3)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Complete Custom Lyrics crafted from your memories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Lifetime shareable streaming gift webpage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Free 30s preview before paying</span>
                  </li>
                </ul>
              </div>

              <a
                href="#create"
                className="mt-8 block w-full py-3.5 px-4 rounded-xl text-center text-sm font-bold text-white bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                Create Audio Song ($4.99)
              </a>
            </div>

            {/* Tier 2: Deluxe Video Keepsake */}
            <div className="bg-gradient-to-br from-slate-800 to-purple-950 rounded-3xl p-8 border-2 border-pink-500 shadow-2xl relative flex flex-col justify-between">
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                ⭐ 50% OFF • Most Popular
              </span>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-pink-400 flex items-center gap-2">
                    <VideoCameraIcon className="w-5 h-5 text-pink-400" />
                    Deluxe Video Keepsake
                  </h3>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-base text-pink-300/70 line-through">$19.99</span>
                  <span className="text-4xl font-extrabold text-pink-400">$9.99</span>
                </div>
                <p className="mt-2 text-xs text-slate-300">
                  The ultimate visual and musical gift that creates unforgettable happy tears.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span><strong>Full 720p HD MP4 Keepsake Video</strong> with your photos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span><strong>Cinematic 2-Line Subtitles</strong> with natural verse pauses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span><strong>Dual Export Modes:</strong> Full Master Video + 30s Reel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span>Smart Fit Photo Protection (Zero cropped faces)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span>Includes <strong>all MP3 tracks + shareable gift page</strong></span>
                  </li>
                </ul>
              </div>

              <a
                href="#create"
                className="mt-8 block w-full py-3.5 px-4 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-pink-500/25"
              >
                Create Video Keepsake ($9.99)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FAQ SECTION (EXPANDED FOR NON-TECH USERS) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="mt-2 text-slate-600 text-sm">Everything you need to know about our custom songs and videos.</p>
          </div>

          <div className="mt-12 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200">
              <h3 className="font-bold text-slate-900 text-base">What if I&apos;m not a good writer or don&apos;t know how to rhyme?</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                You do not need to write poems or rhyme at all! Just type out your memories the same way you would text a good friend—their name, nicknames, funny quirks, favorite trips, and what they mean to you. Our professional lyric songwriting engine structures your real story into beautiful rhyming verses and catchy choruses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200">
              <h3 className="font-bold text-slate-900 text-base">Can I send the video on WhatsApp or play it on a TV?</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yes! Your completed video comes as a standard Full HD MP4 file. You can send it directly on WhatsApp, text message, AirDrop, post it to Instagram/Facebook, or stream it via AirPlay/Chromecast to any living room TV for a birthday party or anniversary gathering.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200">
              <h3 className="font-bold text-slate-900 text-base">Do I have to pay before hearing the song?</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                No! You can enter your story, generate custom lyrics, and listen to 2 complete 30-second studio preview recordings 100% free. You only pay when you love what you hear and want to unlock the full MP3 downloads or video keepsake.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200">
              <h3 className="font-bold text-slate-900 text-base">How does the 2-soundtrack option work?</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                For every order, our system generates 2 unique musical interpretations (for example, a warm acoustic ballad and an uplifting cinematic pop version). You can listen to 30-second previews of both completely free, and upon purchase, download both full-length songs and switch between them as the soundtrack for your video.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200">
              <h3 className="font-bold text-slate-900 text-base">What photos work best for the video keepsake?</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Any vertical, horizontal, or square phone photos work wonderfully! You can upload up to 10 photos. Our Smart Fit technology creates an ambient blurred background for horizontal shots so that faces, edges, and people are never cropped.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200">
              <h3 className="font-bold text-slate-900 text-base">How does this compare to services like Songfinch?</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Songfinch charges $199+ upfront and makes you wait 4 to 7 days with zero preview. PersonalizedSongMaker delivers radio-quality tracks in under 3 minutes starting from just $4.99 with free previews and full HD video creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* STICKY MOBILE CTA BAR (Floating Action on Mobile) */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`fixed bottom-4 inset-x-4 z-40 sm:hidden transition-all duration-300 ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="#create"
          className="w-full py-3.5 px-5 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 shadow-2xl shadow-pink-500/50 flex items-center justify-between border border-white/20 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-2">
            <GiftIcon className="w-5 h-5 text-amber-200" />
            <span>Create Your Song &amp; Video</span>
          </div>
          <span className="text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
            Free Preview →
          </span>
        </a>
      </div>
    </div>
  );
}
