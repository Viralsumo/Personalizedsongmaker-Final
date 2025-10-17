'use client';

import { useState, useEffect, useMemo } from 'react';

const quotes = [
    { text: "Where words fail, music speaks.", author: "Hans Christian Andersen" },
    { text: "Music is the universal language of mankind.", author: "Henry Wadsworth Longfellow" },
    { text: "Crafting the perfect harmony for your story...", author: "Personalized Song Maker" },
    { text: "Weaving your memories into a melody...", author: "Personalized Song Maker" },
    { text: "Finding the right chords for your feelings...", author: "Personalized Song Maker" },
    { text: "Music expresses that which cannot be said and on which it is impossible to be silent.", author: "Victor Hugo" },
    { text: "Music is the shorthand of emotion.", author: "Leo Tolstoy" },
    { text: "One good thing about music, when it hits you, you feel no pain.", author: "Bob Marley" }
];

export default function LoadingOverlay() {
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
    </div>
  );
}