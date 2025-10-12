'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { COLORS } from '../../constants';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function SongPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.task_id as string;
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const [status, setStatus] = useState<string>('pending');
  const [error, setError] = useState<string | null>(null);
  const [songLinks, setSongLinks] = useState<string[] | null>(null);
  const [currentTimes, setCurrentTimes] = useState<number[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [lyricsCopied, setLyricsCopied] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    if (!taskId) {
      router.push('/');
      return;
    }

    const pollTaskStatus = async () => {
      try {
        const response = await fetch(`${apiUrl}/check_task/${taskId}`);
        const data = await response.json();

        if (!response.ok && response.status !== 404) {
          throw new Error(data.error || 'Failed to check task status.');
        }

        if (data.status === 'completed_paid') {
          router.push(`/song-download/${taskId}`); // Already paid, go to download page
          return;
        }

        if (data.status === 'completed_preview_available') {
          setStatus('completed');
          // Construct secure streaming URLs instead of using direct links
          const num_songs = data.links?.length || 2;
          const streamLinks = Array(num_songs).fill(null).map((_, i) => `${apiUrl}/stream/${taskId}/${i}`);
          setSongLinks(streamLinks);
          setLyrics(data.lyrics);
          return; // Stop polling
        }

        if (data.status === 'error') {
          setError(data.error || 'An unknown error occurred during song generation.');
          setStatus('error');
          return; // Stop polling
        }

        // If still pending, poll again after a delay
        setTimeout(pollTaskStatus, 5000);

      } catch (err: any) {
        setError(err.message);
        setStatus('error');
      }
    };

    pollTaskStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, router, apiUrl]);

  // Effect to initialize player states when songLinks are available
  useEffect(() => {
    if (songLinks && songLinks.length > 0) {
      setCurrentTimes(new Array(songLinks.length).fill(0));
    }
  }, [songLinks]);

  const createOrder = async () => {
    try {
      const response = await fetch(`${apiUrl}/create_paypal_order/${taskId}`, { method: 'POST' });
      const orderData = await response.json();
      if (orderData.orderID) {
        return orderData.orderID;
      } else {
        throw new Error(orderData.error || 'Could not create PayPal order.');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const onApprove = async (data: any) => {
    try {
      const response = await fetch(`${apiUrl}/capture_paypal_order/${data.orderID}`, { method: 'POST' });
      const captureData = await response.json();
      if (captureData.status === 'success') {
        // Redirect to a new download page
        router.push(`/song-download/${taskId}`);
      } else {
        throw new Error(captureData.error || 'Payment capture failed.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCopyLyrics = useCallback(() => {
    if (lyrics) {
      navigator.clipboard.writeText(lyrics);
      setLyricsCopied(true);
      setTimeout(() => {
        setLyricsCopied(false);
      }, 2000); // Reset after 2 seconds
    }
  }, [lyrics]);

  const togglePlay = (index: number) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    // If another song is playing, pause it
    if (playingIndex !== null && playingIndex !== index) {
      audioRefs.current[playingIndex]?.pause();
    }

    if (audio.paused) {
      audio.play();
      setPlayingIndex(index);
    } else {
      audio.pause();
      setPlayingIndex(null);
    }
  };

  // Effect to manage audio player time limits
  useEffect(() => {
    const PREVIEW_DURATION = 30; // 30 seconds

    const handleMetadata = (e: Event) => {
      const audio = e.target as HTMLAudioElement;
      // Reset time to 0 when metadata loads to prevent showing previous play position
      // We can't set the duration, but we can control the UI
      audio.currentTime = 0;
    };

    const timeUpdateHandler = (e: Event) => {
      const audio = e.target as HTMLAudioElement;
      if (audio.currentTime >= PREVIEW_DURATION) {
        audio.pause();
        audio.currentTime = 0; // Reset for next play
        setPlayingIndex(null);
      }
      // Find the index of the audio element that fired the event
      const index = audioRefs.current.findIndex(ref => ref === audio);
      if (index !== -1) {
        setCurrentTimes(prev => {
          const newTimes = [...prev];
          newTimes[index] = audio.currentTime;
          return newTimes;
        });
      }
    };

    const refs = audioRefs.current.filter(Boolean);
    refs.forEach((audio) => {
      if (audio) {
        audio.addEventListener('loadedmetadata', handleMetadata);
        audio.addEventListener('timeupdate', timeUpdateHandler);
      }
    });

    // Cleanup function
    return () => {
      refs.forEach((audio) => {
        if (audio) {
          audio.removeEventListener('loadedmetadata', handleMetadata);
          audio.removeEventListener('timeupdate', timeUpdateHandler);
        }
      });
    };
  }, [playingIndex]); // Rerun when playingIndex changes

  const formatTime = (time: number) => {
    if (isNaN(time) || time === undefined) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes)}:${String(seconds).padStart(2, '0')}`;
  };

  const renderContent = () => {
    switch (status) {
      case 'pending':
        return (
          <div>
            <h2 className="text-3xl font-bold">Composing Your Masterpiece...</h2>
            <p className="mt-4 text-slate-600">This can take a few minutes. Please wait!</p>
            <div className="mt-8">
              {/* You can add a nice loading animation here */}
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500 mx-auto"></div>
            </div>
          </div>
        );
      case 'completed':
        return (
          <div>
            <h2 className="text-4xl font-extrabold" style={{ color: COLORS.dark }}>Your Song Previews Are Ready!</h2>
            <p className="mt-4 text-lg text-slate-600">Listen to the 30-second previews below. If you love them, unlock both full-length songs instantly!</p>
            
            <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 text-left space-y-8">
              {songLinks?.map((songUrl, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-slate-800">Preview {index + 1} (30s)</h3>
                  {/* Hidden audio element for control */}
                  <audio ref={el => audioRefs.current[index] = el} src={songUrl || ''} preload="metadata" onPause={() => setPlayingIndex(null)} onPlay={() => setPlayingIndex(index)}></audio>
                  {songUrl ? (
                    <div className="mt-2 flex items-center gap-3 bg-slate-50 p-2 rounded-lg">
                       <button onClick={() => togglePlay(index)} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-white transition-colors bg-pink-500 hover:bg-pink-600">
                        {playingIndex === index ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                      </button>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-pink-500" 
                          style={{ width: `${((currentTimes[index] || 0) / 30) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-mono text-slate-500 w-20 text-right">
                        {formatTime(currentTimes[index] || 0)} / 0:30
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-14 mt-2 bg-slate-100 rounded-lg flex items-center justify-center text-sm text-slate-500">Loading Preview...</div>
                  )}
                </div>
              ))}

              <div>
                <div className="flex justify-between items-center mt-8">
                  <h3 className="text-xl font-bold text-slate-800">Lyrics</h3>
                  <button onClick={handleCopyLyrics} className="text-sm font-semibold text-pink-600 hover:text-pink-700 disabled:opacity-50" disabled={!lyrics}>
                    {lyricsCopied ? 'Copied!' : 'Copy Lyrics'}
                  </button>
                </div>
                <pre className="bg-slate-50 p-6 rounded-lg whitespace-pre-wrap font-sans text-slate-700 text-base leading-relaxed mt-2 max-h-60 overflow-y-auto">
                  {lyrics || 'Loading lyrics...'}
                </pre>
              </div>
            </div>

            <div className="mt-10 p-6 bg-slate-50 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-800">Love It? Get Both Full Songs Now!</h3>
              {error && <p className="mt-4 text-red-600">{error}</p>}
              <div className="mt-4">
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </div>
            </div>
          </div>
        );
      case 'error':
        return (
          <div>
            <h2 className="text-3xl font-bold text-red-600">Something Went Wrong</h2>
            <p className="mt-4 text-slate-600">We encountered an error while creating your song.</p>
            {error && <p className="mt-4 bg-red-100 p-4 rounded-lg text-red-800">{error}</p>}
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
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '', currency: "USD" }}>
        <main className="max-w-3xl mx-auto px-6 py-12 text-center">
          {renderContent()}
        </main>
      </PayPalScriptProvider>
    </div>
  );
}
