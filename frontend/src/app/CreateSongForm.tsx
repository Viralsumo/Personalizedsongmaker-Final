'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

interface CreateSongFormProps {
  initialOccasion?: string;
  initialStyle?: string;
  title?: string;
  subtitle?: string;
}

export default function CreateSongForm({
  initialOccasion = '',
  initialStyle = 'Acoustic Pop',
  title = 'Create Your Personalized Song',
  subtitle = 'Fill out the details below to begin. The more memories you share, the more personal and heartfelt your song will be.',
}: CreateSongFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    occasion: initialOccasion,
    to_person: '',
    from_person: '',
    story: '',
    mood: 'Happy',
    style: initialStyle,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    occasion: '',
    to_person: '',
    from_person: '',
    story: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const newErrors = { occasion: '', to_person: '', from_person: '', story: '' };
    let hasError = false;
    if (!formData.occasion) {
      newErrors.occasion = 'Please select an occasion.';
      hasError = true;
    }
    if (!formData.to_person.trim()) {
      newErrors.to_person = "Recipient's name is required.";
      hasError = true;
    }
    if (!formData.from_person.trim()) {
      newErrors.from_person = 'Your name is required.';
      hasError = true;
    }
    if (formData.story.trim().length < 20) {
      newErrors.story = 'Please share a bit more of your story (at least 20 characters).';
      hasError = true;
    }

    setValidationErrors(newErrors);
    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        name: `${formData.to_person} (from ${formData.from_person})`,
        occasion: formData.occasion,
        details: formData.story,
        style: formData.style,
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${apiUrl}/generate_lyrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate lyrics.');
      }

      const songData = { ...payload, lyrics: data.lyrics };
      sessionStorage.setItem('songData', JSON.stringify(songData));
      router.push('/lyrics-preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="create" className="py-6 sm:py-10">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center">
          <h2 className="text-lg font-semibold leading-7 text-purple-600">Start Here</h2>
          <div className="mt-2 flex items-center justify-center gap-x-3">
            <PencilSquareIcon className="h-8 w-8 text-purple-600" />
            <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</p>
          </div>
          <p className="mt-6 text-lg leading-8 text-slate-700">{subtitle}</p>
        </div>

        <form onSubmit={handleFormSubmit} className="mt-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="occasion" className="block text-sm font-bold leading-6 text-slate-800">
                Occasion
              </label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
                required
              >
                <option value="" disabled>
                  Select an occasion...
                </option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Wedding">Wedding</option>
                <option value="Valentine's Day">Valentine&apos;s Day</option>
                <option value="Mother's Day">Mother&apos;s Day</option>
                <option value="Father's Day">Father&apos;s Day</option>
                <option value="Just Because">Just Because</option>
              </select>
              {validationErrors.occasion && <p className="mt-1 text-xs text-red-600">{validationErrors.occasion}</p>}
            </div>

            <div>
              <label htmlFor="style" className="block text-sm font-bold leading-6 text-slate-800">
                Music Style
              </label>
              <select
                id="style"
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
              >
                <option value="Acoustic Pop">Acoustic Pop</option>
                <option value="Sentimental Ballad">Sentimental Ballad</option>
                <option value="Upbeat Pop">Upbeat Pop</option>
                <option value="Folk">Folk</option>
                <option value="Jazz">Jazz</option>
              </select>
            </div>

            <div>
              <label htmlFor="to_person" className="block text-sm font-bold leading-6 text-slate-800">
                To (Recipient&apos;s Name)
              </label>
              <input
                type="text"
                name="to_person"
                id="to_person"
                value={formData.to_person}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
                placeholder="e.g., Sarah"
                required
              />
              {validationErrors.to_person && <p className="mt-1 text-xs text-red-600">{validationErrors.to_person}</p>}
            </div>

            <div>
              <label htmlFor="from_person" className="block text-sm font-bold leading-6 text-slate-800">
                From (Your Name)
              </label>
              <input
                type="text"
                name="from_person"
                id="from_person"
                value={formData.from_person}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
                placeholder="e.g., Alex"
                required
              />
              {validationErrors.from_person && <p className="mt-1 text-xs text-red-600">{validationErrors.from_person}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="story" className="block text-sm font-bold leading-6 text-slate-800">
              Your Story &amp; Memories
            </label>
            <textarea
              name="story"
              id="story"
              value={formData.story}
              onChange={handleInputChange}
              rows={5}
              placeholder="Share special memories, inside jokes, nicknames, feelings, and memorable moments that make your story one of a kind."
              className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
              required
            />
            <p className="mt-2 text-xs text-slate-600">The more specific details you share, the more personal and heartfelt your song will be.</p>
            {validationErrors.story && <p className="mt-1 text-xs text-red-600">{validationErrors.story}</p>}
          </div>

          <div>
            <label htmlFor="mood" className="block text-sm font-bold leading-6 text-slate-800">
              Mood / Vibe
            </label>
            <select
              id="mood"
              name="mood"
              value={formData.mood}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 bg-pink-50/50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
            >
              <option value="Happy">Happy</option>
              <option value="Emotional">Emotional</option>
              <option value="Funny">Funny</option>
              <option value="Romantic">Romantic</option>
              <option value="Nostalgic">Nostalgic</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center rounded-md px-8 py-4 text-lg font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-opacity bg-pink-500 hover:bg-pink-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Writing Your Custom Lyrics...
                </>
              ) : (
                'Generate My Lyrics'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
