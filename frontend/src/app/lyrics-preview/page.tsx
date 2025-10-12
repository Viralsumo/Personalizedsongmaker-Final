'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { COLORS } from '../constants';

interface SongData {
  name: string;
  occasion: string;
  details: string;
  style: string;
  lyrics: string;
}

export default function LyricsPreview() {
  const router = useRouter();
  const [lyrics, setLyrics] = useState('');
  const [songData, setSongData] = useState<SongData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('songData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setSongData(data);
      setLyrics(data.lyrics);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleGenerateSong = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${apiUrl}/generate_song`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(songData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start song generation.');
      }

      const { task_id } = data;
      router.push(`/song-preview/${task_id}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!lyrics) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Loading lyrics...</p>
        </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <main className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-extrabold" style={{ color: COLORS.dark }}>Your Custom Lyrics Are Ready!</h2>
        <p className="mt-4 text-lg text-slate-600">Review the lyrics below. When you&apos;re ready, we&apos;ll compose the music.</p>

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 text-left">
          <pre className="bg-slate-50 p-6 rounded-lg whitespace-pre-wrap font-sans text-slate-700 text-base leading-relaxed">
            {lyrics}
          </pre>

          {error && <p className="mt-6 text-sm text-red-600 text-center">{error}</p>}

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/" className="w-full sm:w-auto flex-1 text-center py-3 px-4 border border-slate-300 rounded-lg shadow-sm text-lg font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors">
              Start Over
            </Link>
            <button
              onClick={handleGenerateSong}
              disabled={isLoading}
              className="w-full sm:w-auto flex-1 py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white transition-colors"
              style={{ backgroundColor: COLORS.coral, opacity: isLoading ? 0.6 : 1 }}
            >
              {isLoading ? 'Composing Music...' : 'Create My Song!'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}