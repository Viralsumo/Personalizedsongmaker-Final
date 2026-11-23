'use client';

import React from 'react';
import Link from 'next/link';
import { MusicalNoteIcon } from '@heroicons/react/24/solid';

export default function Footer() {
  return (
    <footer className="bg-fuchsia-950 text-white/80 border-t border-fuchsia-900">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2 font-logo text-2xl font-bold text-white">
            <MusicalNoteIcon className="h-7 w-7 text-pink-500" />
            <span>Personalized Song Maker</span>
          </div>
          <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
            Turn real love stories, childhood memories, and inside jokes into radio-quality studio songs &amp; photo video keepsakes in under 3 minutes.
          </p>
        </div>

        {/* Column 1: Occasions */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Occasions</h4>
          <ul className="mt-3 space-y-2 text-xs">
            <li><Link href="/custom-wedding-song" className="hover:text-white transition-colors">Wedding &amp; First Dance</Link></li>
            <li><Link href="/personalized-anniversary-song" className="hover:text-white transition-colors">Anniversary Songs</Link></li>
            <li><Link href="/custom-birthday-song" className="hover:text-white transition-colors">Custom Birthday Song</Link></li>
            <li><Link href="/custom-love-song" className="hover:text-white transition-colors">Romantic Love Song</Link></li>
            <li><Link href="/personalized-mothers-day-song" className="hover:text-white transition-colors">Mother&apos;s Day Song</Link></li>
            <li><Link href="/custom-fathers-day-song" className="hover:text-white transition-colors">Father&apos;s Day Song</Link></li>
            <li><Link href="/custom-retirement-song" className="hover:text-white transition-colors">Retirement Song</Link></li>
          </ul>
        </div>

        {/* Column 2: Compare & Features */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Compare &amp; Features</h4>
          <ul className="mt-3 space-y-2 text-xs">
            <li><Link href="/songfinch-alternative" className="hover:text-white text-yellow-300 font-medium">Songfinch Alternative</Link></li>
            <li><Link href="/songlorious-alternative" className="hover:text-white text-yellow-300 font-medium">Songlorious Alternative</Link></li>
            <li><Link href="/best-custom-song-services" className="hover:text-white">Best Song Services 2026</Link></li>
            <li><Link href="/photo-video-maker-with-custom-song" className="hover:text-white">Photo Video Keepsake</Link></li>
            <li><Link href="/free-custom-song-preview" className="hover:text-white">Free Audio Preview</Link></li>
          </ul>
        </div>

        {/* Column 3: Company & Legal */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Company &amp; Legal</h4>
          <ul className="mt-3 space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
          </ul>
        </div>

      </div>

      <div className="text-center py-5 border-t border-fuchsia-900 text-xs text-white/60">
        &copy; {new Date().getFullYear()} PersonalizedSongMaker.com. All rights reserved. Studio quality music and videos crafted with love.
      </div>
    </footer>
  );
}
