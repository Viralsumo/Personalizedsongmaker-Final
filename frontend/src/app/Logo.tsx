'use client';

import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 font-logo text-3xl font-bold text-pink-600">
        <MusicalNoteIcon className="h-8 w-8" />
        <span>Personalized Song Maker</span>
      </div>
    </Link>
  );
}