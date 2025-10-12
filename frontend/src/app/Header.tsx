'use client';

import React, { useState } from 'react';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <a href="#how" className="text-sm font-medium text-slate-700 hover:text-pink-500">How It Works</a>
            <a href="#samples" className="text-sm font-medium text-slate-700 hover:text-pink-500">Samples</a>
            <a href="#pricing" className="text-sm font-medium text-slate-700 hover:text-pink-500">Pricing</a>
            <a href="#testimonials" className="text-sm font-medium text-slate-700 hover:text-pink-500">Testimonials</a>
            <a href="#faq" className="text-sm font-medium text-slate-700 hover:text-pink-500">FAQ</a>
          </nav>
          <a
            href="#create"
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-pink-500 hover:bg-pink-600"
          >
            Create My Song
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-6 pt-4 pb-6 flex flex-col gap-4">
            <a href="#how" className="text-base font-medium text-slate-700 hover:text-pink-500" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </a>
            <a href="#samples" className="text-base font-medium text-slate-700 hover:text-pink-500" onClick={() => setIsMenuOpen(false)}>
              Samples
            </a>
            <a href="#pricing" className="text-base font-medium text-slate-700 hover:text-pink-500" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </a>
            <a href="#testimonials" className="text-base font-medium text-slate-700 hover:text-pink-500" onClick={() => setIsMenuOpen(false)}>
              Testimonials
            </a>
            <a href="#faq" className="text-base font-medium text-slate-700 hover:text-pink-500" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </a>
            <a
              href="#create"
              className="w-full mt-2 px-5 py-3 rounded-lg font-semibold text-sm text-white bg-pink-500 hover:bg-pink-600 text-center"
            >
              Create My Song
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}