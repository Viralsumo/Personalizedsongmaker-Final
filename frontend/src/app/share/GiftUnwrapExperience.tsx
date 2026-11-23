'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, MusicalNoteIcon, HeartIcon } from '@heroicons/react/24/solid';

interface GiftUnwrapExperienceProps {
  recipientName: string;
  senderName: string;
  message: string;
  onRevealComplete: () => void;
}

export default function GiftUnwrapExperience({
  recipientName,
  senderName,
  message,
  onRevealComplete,
}: GiftUnwrapExperienceProps) {
  const [stage, setStage] = useState<'sealed' | 'opening' | 'card_revealed' | 'fading_out'>('sealed');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synthesize a gentle luxury music-box / harp chime upon opening
  const playHarpChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      // Arpeggiated C Major Chord (C5, E5, G5, C6, E6)
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const startTime = ctx.currentTime + idx * 0.07;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 1.4);
      });
    } catch {
      // Graceful fallback if audio is restricted
    }
  };

  // High-performance canvas confetti burst
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#f43f5e', '#fbbf24', '#ffffff', '#e2e8f0'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    // Spawn 100 celebration particles
    for (let i = 0; i < 110; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 40,
        y: canvas.height * 0.45 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.85) * 20 - 3,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        opacity: 1,
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38; // gravity
        p.vx *= 0.985; // friction
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007; // gentle fade out

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          activeCount++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  };

  const handleOpenEnvelope = () => {
    if (stage !== 'sealed') return;
    playHarpChime();
    setStage('opening');
    triggerConfetti();

    // After flap opens, slide card up
    setTimeout(() => {
      setStage('card_revealed');
    }, 700);
  };

  const handleProceedToSong = () => {
    setStage('fading_out');
    setTimeout(() => {
      onRevealComplete();
    }, 600);
  };

  // Resize canvas on window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-700 ${
        stage === 'fading_out'
          ? 'opacity-0 scale-95 pointer-events-none'
          : 'opacity-100 scale-100 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900'
      }`}
    >
      {/* Background Starfield Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-40 pointer-events-none"
      />

      <div className="relative z-30 w-full max-w-lg px-4 flex flex-col items-center">
        
        {/* Top Floating Badge */}
        <div className="mb-6 text-center animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-amber-200 bg-amber-950/70 border border-amber-500/40 shadow-lg shadow-amber-950/40">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>A Handcrafted Musical Gift</span>
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Special Delivery For {recipientName}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-purple-200/80">
            {stage === 'sealed'
              ? 'Tap the wax seal below to uncover your surprise'
              : 'Unwrapped with love from ' + senderName}
          </p>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* THE 3D LUXURY ENVELOPE & LETTER CONTAINER */}
        {/* ----------------------------------------------------------- */}
        <div className="relative w-80 sm:w-96 h-56 sm:h-64 flex items-center justify-center">

          {/* INNER LETTER CARD: Slides up when opened */}
          <div
            className={`absolute z-20 w-72 sm:w-84 bg-gradient-to-b from-amber-50 via-white to-amber-50 rounded-2xl p-6 shadow-2xl border border-amber-300 text-slate-800 transition-all duration-700 ease-out flex flex-col justify-between ${
              stage === 'card_revealed' || stage === 'fading_out'
                ? '-translate-y-28 sm:-translate-y-36 opacity-100 scale-100 rotate-0'
                : 'translate-y-0 opacity-0 scale-95 pointer-events-none'
            }`}
            style={{
              maxHeight: '340px',
              boxShadow: '0 25px 50px -12px rgba(245, 158, 11, 0.25)',
            }}
          >
            {/* Gold Corner Trim */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-amber-600">
                <MusicalNoteIcon className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-widest">A Song Written For You</span>
                <HeartIcon className="w-4 h-4" />
              </div>

              {/* Sender Note */}
              <div className="py-2 px-1 max-h-36 overflow-y-auto">
                <p className="font-serif italic text-sm sm:text-base text-slate-800 leading-relaxed">
                  &ldquo;{message || 'You mean the absolute world to me. I had this special song made just for you!'}&rdquo;
                </p>
              </div>

              <p className="text-xs font-bold text-amber-700 tracking-wide">
                &mdash; With all my love, {senderName}
              </p>
            </div>

            {/* Watch Song CTA */}
            <button
              type="button"
              onClick={handleProceedToSong}
              className="mt-4 w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Watch Your Song &amp; Video</span>
              <SparklesIcon className="w-4 h-4" />
            </button>
          </div>

          {/* ENVELOPE BODY: Outer container */}
          <div
            onClick={stage === 'sealed' ? handleOpenEnvelope : undefined}
            className={`relative z-10 w-full h-full bg-gradient-to-br from-rose-950 via-purple-950 to-slate-950 rounded-2xl border-2 border-amber-400/40 shadow-2xl transition-all duration-500 ${
              stage === 'sealed' ? 'cursor-pointer hover:scale-[1.02] hover:border-amber-300' : ''
            }`}
            style={{
              boxShadow: '0 20px 40px -15px rgba(217, 70, 239, 0.35)',
            }}
          >
            {/* Satin Ribbon Accent */}
            <div className="absolute inset-y-0 left-12 w-6 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-x border-amber-300/30 pointer-events-none" />

            {/* Recipient Tag */}
            <div className="absolute bottom-4 left-6 right-6 bg-slate-900/90 backdrop-blur-sm rounded-xl p-3 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">Special Delivery</span>
                <span className="text-sm font-extrabold text-white block">For: {recipientName}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-purple-300 block">From:</span>
                <span className="text-xs font-bold text-pink-400 block">{senderName} 💝</span>
              </div>
            </div>

            {/* TOP ENVELOPE FLAP with 3D Flip */}
            <div
              className={`absolute top-0 inset-x-0 h-28 sm:h-32 transition-transform duration-700 origin-top flex items-center justify-center ${
                stage === 'opening' || stage === 'card_revealed' || stage === 'fading_out'
                  ? 'rotate-x-180 -translate-y-2'
                  : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform:
                  stage === 'opening' || stage === 'card_revealed' || stage === 'fading_out'
                    ? 'rotateX(180deg)'
                    : 'rotateX(0deg)',
              }}
            >
              {/* Flap Polygon Triangle */}
              <div
                className="w-full h-full bg-gradient-to-b from-rose-900 to-purple-950 border-t-2 border-amber-300/40 shadow-lg"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />

              {/* WAX SEAL (Centered at the apex of the flap) */}
              <div
                className={`absolute top-16 sm:top-20 z-30 flex flex-col items-center transition-transform duration-500 ${
                  stage === 'sealed' ? 'scale-100 hover:scale-110 active:scale-95' : 'scale-0 opacity-0'
                }`}
              >
                {/* Wax Stamp Seal */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-amber-700 border-2 border-amber-300/80 shadow-xl shadow-red-900/60 flex items-center justify-center relative cursor-pointer group">
                  {/* Outer Seal Rim */}
                  <div className="absolute inset-1 rounded-full border border-amber-300/40" />
                  <HeartIcon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-200 drop-shadow group-hover:scale-110 transition-transform" />

                  {/* Pulsing Aura */}
                  <div className="absolute -inset-1 rounded-full bg-pink-500/30 blur-sm animate-ping pointer-events-none" />
                </div>

                {/* Tap Prompt Tooltip */}
                <span className="mt-2 text-[11px] font-extrabold text-amber-300 bg-black/60 px-2.5 py-0.5 rounded-full border border-amber-400/40 whitespace-nowrap shadow">
                  Tap To Open ✉️
                </span>
              </div>
            </div>

            {/* Bottom Pocket Overlay (Gives the illusion of the card coming out of the envelope) */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-purple-950 via-rose-950 to-transparent rounded-b-2xl pointer-events-none z-10"
              style={{
                clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 50% 80%, 0 30%)',
              }}
            />
          </div>
        </div>

        {/* Bottom Audio Cue */}
        <div className="mt-8 text-center text-xs text-purple-300/70 flex items-center gap-1.5">
          <MusicalNoteIcon className="w-4 h-4 text-pink-400" />
          <span>Turn on sound for the best unwrapping experience</span>
        </div>

      </div>
    </div>
  );
}
