'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { GiftIcon, MusicalNoteIcon } from '@heroicons/react/24/solid';

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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    if (!shareId) return;

    const fetchShareData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/share_data/${shareId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to load gift page.');
        }

        // Construct the full streaming URLs using the task_id from the response
        const streamLinks = result.audio_links.map((_: unknown, i: number) => 
          `${apiUrl}/stream/${result.task_id}/${i}`
        );

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
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 via-pink-50 to-fuchsia-100 py-12 sm:py-20">
      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-fuchsia-200/50 overflow-hidden">
          <div className="p-8 sm:p-12">
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
            <div className="mt-12 text-center">
                <h3 className="text-lg font-semibold text-slate-800">Loved your gift?</h3>
                <p className="mt-2 text-slate-600">Let {getSenderName()} know how much you appreciate it by sharing your beautiful song!</p>
                <div className="mt-4 flex justify-center items-center gap-4">
                    <a
                        href={`https://twitter.com/intent/tweet?text=Someone%20made%20a%20personalized%20song%20for%20me!%20Check%20it%20out:&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition-colors"
                    >
                        Share on X
                    </a>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
                    >
                        Share on Facebook
                    </a>
                    <a
                        href={`https://api.whatsapp.com/send?text=Someone%20made%20a%20personalized%20song%20for%20me!%20Check%20it%20out:%20${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors"
                    >
                        Share on WhatsApp
                    </a>
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
  );
}

export const dynamic = 'force-dynamic';
