'use client';

import { useState, useEffect } from 'react';

const musicalThemeQuotes = [
  "Crafting the perfect harmony for your story...",
  "Weaving your memories into a melody...",
  "Finding the right chords for your feelings...",
  "Tuning the instruments for your unique sound...",
  "Setting your story to music...",
];

export default function LoadingIndicator() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % musicalThemeQuotes.length);
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold">Composing Your Masterpiece...</h2>
      <p className="mt-4 text-slate-600 h-6">{musicalThemeQuotes[currentQuoteIndex]}</p>
      <div className="mt-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500 mx-auto" />
      </div>
    </div>
  );
}