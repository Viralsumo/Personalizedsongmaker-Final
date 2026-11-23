'use client';

import { useEffect, useState, useRef, useCallback, type JSX } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlayIcon, PauseIcon, MusicalNoteIcon } from '@heroicons/react/24/solid';
import { COLORS } from '../../constants';
import LoadingOverlay from '../../lyrics-preview/LoadingOverlay';
import PhotoUploadSection from '../../PhotoUploadSection';
import {
  PayPalScriptProvider, PayPalButtons
} from '@paypal/react-paypal-js';

type TaskStatus = 'pending' | 'completed' | 'error';

interface TaskResponse {
  status: string;
  error?: string;
  links?: string[];
  lyrics?: string;
}

export default function SongPreviewPage(): JSX.Element {
  const params = useParams<{ task_id: string }>();
  const router = useRouter();
  const taskId = params?.task_id;
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const [status, setStatus] = useState<TaskStatus>('pending');
  const [error, setError] = useState<string | null>(null);
  const [songLinks, setSongLinks] = useState<string[] | null>(null);
  const [currentTimes, setCurrentTimes] = useState<number[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [lyricsCopied, setLyricsCopied] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [preferredSongIndex, setPreferredSongIndex] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && taskId) {
      const saved = localStorage.getItem(`preferred_song_index_${taskId}`);
      if (saved) {
        setPreferredSongIndex(parseInt(saved, 10) || 0);
      }
    }
  }, [taskId]);

  const handleSelectPreferredSong = (index: number) => {
    setPreferredSongIndex(index);
    if (typeof window !== 'undefined' && taskId) {
      localStorage.setItem(`preferred_song_index_${taskId}`, String(index));
    }
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:5000';

  useEffect(() => {
    if (!taskId) {
      router.push('/');
      return;
    }

    let isMounted = true;

    const pollTaskStatus = async (): Promise<void> => {
      try {
        const response = await fetch(`${apiUrl}/check_task/${taskId}`);
        const data: TaskResponse = await response.json();

        if (!response.ok && response.status !== 404) {
          throw new Error(data.error ?? 'Failed to check task status.');
        }

        if (data.status === 'completed_paid') {
          router.push(`/song-download/${taskId}`);
          return;
        }

        if (data.status === 'completed_preview_available') {
          setStatus('completed');
          const numSongs = data.links?.length ?? 2;
          const streamLinks = Array.from({ length: numSongs }, (_, i) => `${apiUrl}/stream/${taskId}/${i}`);
          setSongLinks(streamLinks);
          setLyrics(data.lyrics ?? '');
          return;
        }

        if (data.status === 'error') {
          setError(data.error ?? 'An unknown error occurred during song generation.');
          setStatus('error');
          return;
        }

        // Still pending
        if (isMounted) {
          setTimeout(pollTaskStatus, 5000);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred.');
          setStatus('error');
        }
      }
    };

    void pollTaskStatus();

    return () => {
      isMounted = false;
    };
  }, [taskId, router, apiUrl]);

  useEffect((): void => {
    if (songLinks && songLinks.length > 0) {
      setCurrentTimes(new Array(songLinks.length).fill(0));
    }
  }, [songLinks]);

  const createOrder = async (): Promise<string> => {
    const selectedTier = (typeof window !== 'undefined' ? localStorage.getItem(`selected_tier_${taskId}`) : null) || 'video';
    const response = await fetch(`${apiUrl}/create_paypal_order/${taskId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: selectedTier }),
    });
    const orderData = await response.json();
    if (orderData.orderID) return orderData.orderID as string;

    const errorMessage = orderData.error ?? 'Could not create PayPal order.';
    setError(errorMessage);
    throw new Error(errorMessage);
  };

  const onApprove: React.ComponentProps<typeof PayPalButtons>['onApprove'] = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/capture_paypal_order/${data.orderID}`, { method: 'POST' });
      const captureData = await response.json();

      if (captureData.status === 'success') {
        router.push(`/song-download/${taskId}`);
      } else {
        throw new Error(captureData.error ?? 'Payment capture failed.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  const handleApplyCoupon = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!couponCode.trim() || !taskId) return;
    setCouponLoading(true);
    setCouponError(null);
    try {
      const response = await fetch(`${apiUrl}/apply_coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId, coupon_code: couponCode.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? 'Invalid coupon code.');
      }
      if (data.redirect_url) {
        router.push(data.redirect_url as string);
      } else {
        router.push(`/song-download/${taskId}`);
      }
    } catch (err) {
      setCouponError(err instanceof Error ? err.message : 'Coupon validation failed.');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCopyLyrics = useCallback((): void => {
    if (lyrics) {
      void navigator.clipboard.writeText(lyrics);
      setLyricsCopied(true);
      setTimeout(() => setLyricsCopied(false), 2000);
    }
  }, [lyrics]);

  const togglePlay = (index: number): void => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex !== null && playingIndex !== index) {
      audioRefs.current[playingIndex]?.pause();
    }

    if (audio.paused) {
      void audio.play();
      setPlayingIndex(index);
    } else {
      audio.pause();
      setPlayingIndex(null);
    }
  };

  useEffect(() => {
    const PREVIEW_DURATION = 30;

    const handleMetadata = (e: Event): void => {
      const audio = e.target as HTMLAudioElement;
      audio.currentTime = 0;
    };

    const timeUpdateHandler = (e: Event): void => {
      const audio = e.target as HTMLAudioElement;
      if (audio.currentTime >= PREVIEW_DURATION) {
        audio.pause();
        audio.currentTime = 0;
        setPlayingIndex(null);
      }

      const index = audioRefs.current.findIndex(ref => ref === audio);
      if (index !== -1) {
        setCurrentTimes(prev => {
          const newTimes = [...prev];
          newTimes[index] = audio.currentTime;
          return newTimes;
        });
      }
    };

    const refs = audioRefs.current.filter((a): a is HTMLAudioElement => a !== null);
    refs.forEach(audio => {
      audio.addEventListener('loadedmetadata', handleMetadata);
      audio.addEventListener('timeupdate', timeUpdateHandler);
    });

    return () => {
      refs.forEach(audio => {
        audio.removeEventListener('loadedmetadata', handleMetadata);
        audio.removeEventListener('timeupdate', timeUpdateHandler);
      });
    };
  }, [songLinks]); // Rerun when songs are loaded, not just when playing

  const formatTime = (time: number): string => {
    if (Number.isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const renderContent = (): JSX.Element | null => {
    switch (status) {
      case 'pending':
        return <LoadingOverlay />;

      case 'completed':
        return (
          <div>
            <h2 className="text-4xl font-extrabold" style={{ color: COLORS.dark }}>
              Your Song Previews Are Ready!
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Listen to the 30-second previews below. If you love them, unlock both full-length songs instantly!
            </p>

            <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 text-left space-y-8">
              {songLinks?.map((songUrl, index) => (
                <div key={songUrl ?? index}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-800">Preview {index + 1} (30s)</h3>
                    <button
                      type="button"
                      onClick={() => handleSelectPreferredSong(index)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto ${
                        preferredSongIndex === index
                          ? 'bg-pink-500 text-white shadow-sm ring-2 ring-pink-500/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <MusicalNoteIcon className="w-3.5 h-3.5" />
                      {preferredSongIndex === index
                        ? '✓ Selected for Video Keepsake'
                        : 'Use as Video Soundtrack'}
                    </button>
                  </div>
                  <audio
                    ref={(el) => { audioRefs.current[index] = el; }}
                    src={songUrl ?? ''}
                    preload="metadata"
                    onPause={() => setPlayingIndex(null)}
                    onPlay={() => setPlayingIndex(index)}
                  />
                  {songUrl ? (
                    <div className="mt-2 flex items-center gap-3 bg-slate-50 p-2 rounded-lg">
                      <button
                        onClick={() => togglePlay(index)}
                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-white transition-colors bg-pink-500 hover:bg-pink-600"
                        type="button"
                      >
                        {playingIndex === index ? (
                          <PauseIcon className="w-5 h-5" />
                        ) : (
                          <PlayIcon className="w-5 h-5" />
                        )}
                      </button>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-pink-500"
                          style={{ width: `${((currentTimes[index] ?? 0) / 30) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono text-slate-500 w-20 text-right">
                        {formatTime(currentTimes[index] ?? 0)} / 0:30
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-14 mt-2 bg-slate-100 rounded-lg flex items-center justify-center text-sm text-slate-500">
                      Loading Preview...
                    </div>
                  )}
                </div>
              ))}

              <div>
                <div className="flex justify-between items-center mt-8">
                  <h3 className="text-xl font-bold text-slate-800">Lyrics</h3>
                  <button
                    onClick={handleCopyLyrics}
                    className="text-sm font-semibold text-pink-600 hover:text-pink-700 disabled:opacity-50"
                    disabled={!lyrics}
                    type="button"
                  >
                    {lyricsCopied ? 'Copied!' : 'Copy Lyrics'}
                  </button>
                </div>
                <pre className="bg-slate-50 p-6 rounded-lg whitespace-pre-wrap font-sans text-slate-700 text-base leading-relaxed mt-2 max-h-60 overflow-y-auto">
                  {lyrics ?? 'Loading lyrics...'}
                </pre>
              </div>
            </div>

            {/* Photo & Package Tier Selection */}
            <PhotoUploadSection taskId={taskId} />

            <div className="mt-10 p-6 bg-slate-50 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-800">Complete Your Order Securely</h3>
              <p className="text-sm text-slate-500 mt-1">Instant delivery to your download page immediately after payment.</p>
              {error && <p className="mt-4 text-red-600">{error}</p>}
              <div className="mt-4">
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
              </div>

              {/* VIP / Testing Coupon Code Redemption */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Have a VIP or Promo Code?
                </p>
                <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder=""
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 uppercase font-mono tracking-wider text-center sm:text-left"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading || !couponCode.trim()}
                    className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg disabled:opacity-50 transition-colors whitespace-nowrap"
                  >
                    {couponLoading ? 'Checking...' : 'Apply Code'}
                  </button>
                </form>
                {couponError && <p className="mt-2 text-xs text-red-600 font-medium">{couponError}</p>}
              </div>
            </div>
          </div>
        );

      case 'error':
        return (
          <div>
            <h2 className="text-3xl font-bold text-red-600">Something Went Wrong</h2>
            <p className="mt-4 text-slate-600">We encountered an error while creating your song.</p>
            {error && (
              <p className="mt-4 bg-red-100 p-4 rounded-lg text-red-800">{error}</p>
            )}
            <Link href="/" className="mt-8 inline-block py-3 px-6 bg-pink-500 text-white rounded-lg font-medium">
              Start Over
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white py-12">
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
          currency: 'USD',
        }}
      >
        <main className="max-w-3xl mx-auto px-6 py-12 text-center">
          {renderContent()}
        </main>
      </PayPalScriptProvider>
    </div>
  );
}
