'use client';

import { useState, useEffect, useMemo } from 'react';

const quotes = [
    { text: "Where words fail, music speaks.", author: "Hans Christian Andersen" },
    { text: "Music is the universal language of mankind.", author: "Henry Wadsworth Longfellow" },
    { text: "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.", author: "Plato" },
    { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" },
    { text: "Crafting the perfect harmony for your story...", author: "Personalized Song Maker" },
    { text: "Music expresses that which cannot be said and on which it is impossible to be silent.", author: "Victor Hugo" },
    { text: "Music is a higher revelation than all wisdom and philosophy.", author: "Ludwig van Beethoven" },
    { text: "If music be the food of love, play on.", author: "William Shakespeare" },
    { text: "Weaving your memories into a melody...", author: "Personalized Song Maker" },
    { text: "Music is the shorthand of emotion.", author: "Leo Tolstoy" },
    { text: "Music was my refuge. I could crawl into the space between the notes and curl my back to loneliness.", author: "Maya Angelou" },
    { text: "Finding the right chords for your feelings...", author: "Personalized Song Maker" },
    { text: "One good thing about music, when it hits you, you feel no pain.", author: "Bob Marley" },
    { text: "Music has healing power. It has the ability to take people out of themselves for a few hours.", author: "Elton John" },
    { text: "Music is my religion.", author: "Jimi Hendrix" }
];

const composingSteps = [
  "Composing the melody...",
  "Arranging the instruments...",
  "Warming up the vocals...",
  "Finding the perfect rhythm...",
  "Mixing the final track...",
  "Adding a touch of magic...",
];

export default function LoadingOverlay() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prevIndex) => (prevIndex + 1) % composingSteps.length);
    }, 25000); // Change step every 25 seconds

    return () => {
      clearInterval(quoteInterval);
      clearInterval(stepInterval);
    };
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
      <p className="mt-8 text-lg font-semibold text-slate-900 h-7">
        {composingSteps[currentStepIndex]}
      </p>
      <p className="mt-2 text-slate-600">
        This can take 1-3 minutes. Please wait!
      </p>
      <style jsx global>{`
        @keyframes float {
            0% {
                transform: translateY(0px);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-15px);
                opacity: 1;
            }
            100% {
                transform: translateY(0px);
                opacity: 0.6;
            }
        }
      `}</style>
    </div>
  );
}