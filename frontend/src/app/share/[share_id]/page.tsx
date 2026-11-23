'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  GiftIcon,
  MusicalNoteIcon,
  SparklesIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  ShareIcon,
} from '@heroicons/react/24/solid';
import WebVideoPremiere from '../../WebVideoPremiere';
import { PhotoItem, normalizePhotos } from '../../PhotoUploadSection';
import GiftUnwrapExperience from '../GiftUnwrapExperience';

const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const XTwitterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

interface ShareData {
  name: string;
  lyrics: string;
  audio_links: string[];
  message: string;
  task_id: string;
}

export default function SharePage() {
  const params = useParams();
  const shareId = params.share_id as string;
  const [data, setData] = useState<ShareData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [storedPhotos, setStoredPhotos] = useState<PhotoItem[]>([]);
  const [activeAudioIndex, setActiveAudioIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share && currentUrl) {
      try {
        await navigator.share({
          title: `Special Song for ${getRecipientName()}`,
          text: `Check out this custom song and video keepsake made for ${getRecipientName()}! 💝`,
          url: currentUrl,
        });
      } catch (err) {
        console.log('Share dismissed or cancelled:', err);
      }
    }
  };

  useEffect(() => {
    if (!shareId) return;

    const fetchShareData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/share_data/${shareId}`, {
          // Ensure fresh data is fetched on each request.
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to load gift page.');
        }

        // Construct the full streaming URLs using the task_id from the response
        const streamLinks = result.audio_links.map((_: unknown, i: number) => 
          `${apiUrl}/stream/${result.task_id}/${i}`
        );

        if (typeof window !== 'undefined' && result.task_id) {
          const savedPref = localStorage.getItem(`preferred_song_index_${result.task_id}`);
          if (savedPref) {
            setActiveAudioIndex(parseInt(savedPref, 10) || 0);
          }
          const saved = localStorage.getItem(`uploaded_photos_${result.task_id}`);
          if (saved) {
            try {
              setStoredPhotos(normalizePhotos(JSON.parse(saved)));
            } catch {
              // fallback
            }
          }
        }

        setData({ ...result, audio_links: streamLinks });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShareData();
  }, [shareId, apiUrl]);

  const getRecipientName = () => {
    if (!data?.name) return 'You';
    const nameMatch = data.name.match(/(.+?) \(/);
    return nameMatch ? nameMatch[1] : data.name;
  };

  const getSenderName = () => {
    if (!data?.name) return 'your special someone';
    const nameMatch = data.name.match(/\(from (.+?)\)/);
    return nameMatch ? nameMatch[1] : 'your special someone';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-fuchsia-50 text-fuchsia-800 p-4">
        <GiftIcon className="h-16 w-16 animate-pulse" />
        <p className="mt-4 text-lg font-semibold">Unwrapping your gift...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-4 text-center">
        <h2 className="text-2xl font-bold">Oops!</h2>
        <p className="mt-2">{error}</p>
        <Link href="/" className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold">
          Back to Homepage
        </Link>
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE LUXURY GIFT UNWRAPPING REVEAL OVERLAY */}
      {/* ------------------------------------------------------------- */}
      {!isUnwrapped && (
        <GiftUnwrapExperience
          recipientName={getRecipientName()}
          senderName={getSenderName()}
          message={data.message}
          onRevealComplete={() => setIsUnwrapped(true)}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* THE COMPLETE REVEALED GIFT PAGE (ALL CONTENT & PLAYERS INTACT) */}
      {/* ------------------------------------------------------------- */}
      <div className={`min-h-screen bg-gradient-to-br from-fuchsia-100 via-pink-50 to-fuchsia-100 py-12 sm:py-20 transition-opacity duration-700 ${isUnwrapped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <main className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-fuchsia-200/50 overflow-hidden">
            <div className="p-8 sm:p-12">
              
              {/* Header Action Bar with Replay Option */}
              <div className="flex items-center justify-between pb-6 mb-4 border-b border-fuchsia-100">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-pink-700 bg-pink-50 border border-pink-200 shadow-sm">
                  <SparklesIcon className="w-3.5 h-3.5 text-pink-500" />
                  <span>Personalized Gift Keepsake</span>
                </span>

                <button
                  type="button"
                  onClick={() => setIsUnwrapped(false)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-pink-600 bg-slate-100 hover:bg-pink-50 border border-slate-200 hover:border-pink-200 transition-all hover:scale-105 active:scale-95 shadow-sm"
                  title="Watch the opening unwrap animation again"
                >
                  <span>↺ Replay Gift Opening</span>
                </button>
              </div>

              <div className="text-center">
                <GiftIcon className="h-16 w-16 text-pink-500 mx-auto" />
                <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  A Special Song For {getRecipientName()}
                </h1>
              </div>

            {/* Personal Message */}
            <div className="mt-10 text-center">
              <p className="font-logo text-3xl text-slate-700 leading-relaxed">
                &ldquo;{data.message}&rdquo;
              </p>
              <p className="mt-4 text-xl text-slate-600 font-medium">
                &mdash; {getSenderName()}
              </p>
            </div>

            {/* Deluxe Video Premiere */}
            {data.audio_links && data.audio_links.length > 0 && data.lyrics && (
              <div className="mt-12 p-6 sm:p-8 bg-slate-900 rounded-3xl text-center text-white shadow-xl border border-slate-800">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold text-pink-400 bg-pink-950/60 border border-pink-800/60 mb-3">
                  <SparklesIcon className="h-4 w-4 text-pink-400" />
                  Your Video Premiere Keepsake (720p Vertical)
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Watch Your Song Video</h3>
                <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto">
                  Watch with synchronized lyrics. Tap &apos;Save MP4&apos; to download and keep the video in your camera roll!
                </p>

                {/* Soundtrack Switcher */}
                {data.audio_links.length > 1 && (
                  <div className="mt-4 mb-2 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 shadow">
                    <span className="text-xs font-bold text-slate-300 px-2.5 flex items-center gap-1.5">
                      <MusicalNoteIcon className="w-4 h-4 text-pink-400" />
                      Soundtrack:
                    </span>
                    {data.audio_links.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveAudioIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          activeAudioIndex === idx
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 scale-105'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                        }`}
                      >
                        <span>Song Version {idx + 1}</span>
                        {activeAudioIndex === idx && <CheckIcon className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <WebVideoPremiere
                    audioUrl={data.audio_links[activeAudioIndex] || data.audio_links[0]}
                    lyrics={data.lyrics}
                    photos={storedPhotos}
                    songTitle={`Song for ${getRecipientName()} (Version ${activeAudioIndex + 1})`}
                    recipientName={getRecipientName()}
                    senderName={getSenderName()}
                    occasion="Personalized Keepsake"
                    audioUrls={data.audio_links}
                    activeAudioIndex={activeAudioIndex}
                    onAudioChange={setActiveAudioIndex}
                  />
                </div>
              </div>
            )}

            {/* Song Players */}
            <div className="mt-12 space-y-8">
              {data.audio_links.map((link, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <MusicalNoteIcon className="h-6 w-6 text-pink-500" />
                    <span>Song {index + 1}</span>
                  </h3>
                  <audio controls preload="metadata" className="w-full mt-3 rounded-lg">
                    <source src={link} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>

            {/* Lyrics Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-slate-800">Lyrics</h3>
              <pre className="mt-3 bg-fuchsia-50/70 p-6 rounded-lg whitespace-pre-wrap font-sans text-slate-700 text-base leading-relaxed max-h-80 overflow-y-auto border border-fuchsia-200/50">
                {data.lyrics}
              </pre>
            </div>

            {/* Social Share Section */}
            <div className="mt-12 text-center pt-8 border-t border-fuchsia-200/80">
              <h3 className="text-xl font-bold text-slate-900">Loved Your Gift? 💖</h3>
              <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                Share this special keepsake with your friends &amp; family, or let {getSenderName()} know how much you loved it!
              </p>

              <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
                {/* WhatsApp Share Button - Primary */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this custom song & video keepsake ${getSenderName()} created for me! 💝 ` + (currentUrl || ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-sm shadow-md shadow-[#25D366]/25 transition-transform hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>Share on WhatsApp</span>
                </a>

                {/* Native Mobile Share if supported */}
                {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-pink-600/25 transition-transform hover:scale-105 active:scale-95"
                  >
                    <ShareIcon className="w-4 h-4 text-white" />
                    <span>More Apps</span>
                  </button>
                )}

                {/* Copy Link Button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl font-semibold text-sm shadow-sm transition-transform hover:scale-105"
                >
                  {linkCopied ? (
                    <>
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <DocumentDuplicateIcon className="w-4 h-4 text-slate-600" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl font-semibold text-sm shadow-sm transition-transform hover:scale-105"
                >
                  <FacebookIcon className="w-4 h-4 text-white" />
                  <span>Facebook</span>
                </a>

                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this beautiful custom song that ${getSenderName()} created for me!`)}&url=${encodeURIComponent(currentUrl || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl font-semibold text-sm shadow-sm transition-transform hover:scale-105"
                >
                  <XTwitterIcon className="w-4 h-4 text-white" />
                  <span>Post on X</span>
                </a>
              </div>
            </div>

            {/* Viral Loop: High-Converting "Create Yours" Card */}
            <div className="mt-14 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white text-center shadow-2xl border border-purple-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-xl mx-auto space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  <SparklesIcon className="w-4 h-4 text-pink-400" />
                  Touched by this gift?
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Create a Custom Song &amp; Video for Someone You Love
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Turn your memories, inside jokes, and special milestones into an emotional studio song in under 2 minutes. Free preview before you pay anything!
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <GiftIcon className="w-5 h-5 text-white" />
                    <span>Create Your Own Song &amp; Video (From $4.99)</span>
                  </Link>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">✓ Studio-quality music</span>
                  <span className="flex items-center gap-1">✓ Listen free before buying</span>
                  <span className="flex items-center gap-1">⭐ 4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-fuchsia-600 p-4 text-center text-sm text-white/80">
            This song was created at{' '}
            <Link href="/" className="font-semibold text-white hover:underline">
              PersonalizedSongMaker.com
            </Link>
          </div>
        </div>
      </main>
    </div>
  </>
  );
}
