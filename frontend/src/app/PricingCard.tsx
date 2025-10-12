import React from 'react';
import { COLORS } from './constants';
import { CheckIcon } from '@heroicons/react/24/solid';

interface PricingCardProps {
  title: string;
  price: string;
  bullets: string[];
  cta: string;
  popular?: boolean;
}

export default function PricingCard({ title, price, bullets, cta, popular = false }: PricingCardProps) {
  return (
    <div
      className={`rounded-3xl p-8 ring-1 ${
        popular ? 'ring-2 ring-offset-2' : 'ring-foreground/20'
      } bg-background shadow-lg`}
      style={{ ringColor: popular ? COLORS.coral : undefined }}
    >
      <h3 className="text-lg font-semibold leading-8 text-foreground">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-foreground/80">
        {popular ? 'Our most popular plan for unforgettable gifts.' : 'A great start for a simple, heartfelt song.'}
      </p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-foreground">{price}</span>
        <span className="text-sm font-semibold leading-6 text-foreground/80">/song</span>
      </p>
      <a
        href="#create"
        className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6"
        style={{
          backgroundColor: popular ? COLORS.coral : 'var(--foreground)',
          color: 'var(--background)',
        }}
      >
        {cta}
      </a>
      <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-foreground/80">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none" style={{ color: COLORS.coral }} aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}