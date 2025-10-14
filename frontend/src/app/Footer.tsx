'use client';

import { MusicalNoteIcon } from '@heroicons/react/24/solid';
import React from 'react';

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    // In a real app, you would handle form submission here
  };

  return (
    <footer className="bg-fuchsia-600 text-white/80 border-t border-fuchsia-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-logo text-2xl font-bold text-white">
            <MusicalNoteIcon className="h-7 w-7" />
            <span>Personalized Song Maker</span>
          </div>
          <p className="mt-2 text-sm">The voice of your heart, in a song.</p>
        </div>
        <div className="md:col-span-3 flex flex-col sm:flex-row justify-between gap-8">
          <div>
            <h4 className="font-semibold text-white">Occasions</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="/occasion/birthday" className="hover:text-white">Birthday</a></li>
              <li><a href="/occasion/anniversary" className="hover:text-white">Anniversary</a></li>
              <li><a href="/occasion/wedding" className="hover:text-white">Wedding</a></li>
              <li><a href="/occasion/valentines" className="hover:text-white">Valentine&apos;s Day</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/disclaimer" className="hover:text-white">Disclaimer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Newsletter</h4>
            <p className="text-sm mt-2">
              Get updates on new features and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input type="email" placeholder="Your email" className="border rounded-lg px-3 py-2 text-sm w-full text-slate-800" required />
              <button type="submit" className="px-4 py-2 rounded-lg font-semibold text-sm text-white bg-pink-500 hover:bg-pink-600">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="text-center py-4 border-t border-fuchsia-700 text-sm text-white/70">© {new Date().getFullYear()} Personalized Song Maker. All rights reserved.</div>
    </footer>
  );
}