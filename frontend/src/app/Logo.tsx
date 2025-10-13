'use client';

import { MusicalNoteIcon } from '@heroicons/react/24/solid';

export default function Logo() {
  return <div className="flex items-center gap-2 font-logo text-2xl font-bold text-pink-600">
    <MusicalNoteIcon className="h-7 w-7" />
    <span>Personalized Song Maker</span></div>;
}