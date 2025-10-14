'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { COLORS } from '../constants';

// Define quotes for the loading overlay
const quotes = [
    { text: "Where words fail, music speaks.", author: "Hans Christian Andersen" },
    { text: "Music is the universal language of mankind.", author: "Henry Wadsworth Longfellow" },
    { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" },
    { text: "Music expresses that which cannot be said and on which it is impossible to be silent.", author: "Victor Hugo" },
    { text: "Music is the shorthand of emotion.", author: "Leo Tolstoy" },
    { text: "One good thing about music, when it hits you, you feel no pain.", author: "Bob Marley" }
];

interface SongData {
  name: string;
  occasion: string;
  details: string;
  style: string;
  lyrics: string;
}

function LoadingOverlay() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(quoteInterval);
  }, []);

  const currentQuote = useMemo(() => quotes[currentQuoteIndex], [currentQuoteIndex]);

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-center p-4">
      <div className="relative w-24 h-24">
        <span className="absolute text-3xl" style={{ top: '20%', left: '10%', animation: 'float 2s ease-in-out infinite', animationDelay: '0s' }}>🎵</span>
        <span className="absolute text-3xl" style={{ top: '60%', left: '30%', animation: 'float 2s ease-in-out infinite', animationDelay: '0.5s' }}>🎶</span>
        <span className="absolute text-3xl" style={{ top: '30%', left: '70%', animation: 'float 2s ease-in-out infinite', animationDelay: '1s' }}>🎼</span>
        <span className="absolute text-3xl" style={{ top: '70%', left: '80%', animation: 'float 2s ease-in-out infinite', animationDelay: '1.5s' }}>🎵</span>
      </div>
      <div className="mt-8 max-w-md">
        <p className="text-xl italic text-slate-700">
          &ldquo;{currentQuote.text}&rdquo;
        </p>
        <p className="mt-2 font-semibold text-slate-800">
          &mdash; {currentQuote.author}
        </p>
      </div>
      <p className="mt-8 text-lg font-semibold text-slate-900">
        Composing your masterpiece...
      </p>
      <p className="mt-2 text-slate-600">
        This can take 1-3 minutes. Please wait!
      </p>
      <style jsx global>{`
        @keyframes float {
            0% { transform: translateY(0px); opacity: 1; }
            50% { transform: translateY(-20px); opacity: 0.5; }
            100% { transform: translateY(0px); opacity: 1; }
        }
      `}</style>
    </div>
  );
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

  if (isLoading) {
    return <LoadingOverlay />;
  }

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