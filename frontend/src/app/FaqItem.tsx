'use client';

import { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-section-accent-1 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-')}`}
      >
        <h3 className="text-lg font-medium text-slate-900">{question}</h3>
        <span className="text-2xl font-light text-slate-500">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div id={`faq-answer-${question.replace(/\s+/g, '-')}`} className="mt-3 pr-8">
          <p className="text-slate-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}