'use client';

import { useEffect, useState, useCallback, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { COLORS } from '../../constants';
import { ArrowDownTrayIcon, GiftIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/solid';

// A simple, self-contained animation component for visual feedback during download.
const SoundWaveAnimation = () => (
  <div className="flex items-center justify-center space-x-1 h-5 w-5">
    <span className="w-1 h-2 bg-white animate-wave" style={{ animationDelay: '0.1s' }}></span>
    <span className="w-1 h-4 bg-white animate-wave" style={{ animationDelay: '0.2s' }}></span>
    <span className="w-1 h-3 bg-white animate-wave" style={{ animationDelay: '0.3s' }}></span>
    <span className="w-1 h-5 bg-white animate-wave" style={{ animationDelay: '0.4s' }}></span>
  </div>
);
// You'll need to add the 'wave' animation to your globals.css or a style tag.
// For simplicity, I'll assume you'll add this to your globals.css:
// @keyframes wave { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1.5); } } .animate-wave { animation: wave 1.2s linear infinite; }

export default function SongDownloadPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.task_id as string;

  const [songLinks, setSongLinks] = useState<string[] | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState<number | null>(null);
  const [lyricsCopied, setLyricsCopied] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [shareUrlCopied, setShareUrlCopied] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    if (!taskId) {
      router.push('/');
      return;
    }

    const fetchSongData = async () => {
      try {
        const response = await fetch(`${apiUrl}/check_task/${taskId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch song data.');
        }

        if (data.status === 'completed_paid') {
          // Construct secure streaming URLs for the full songs
          const num_songs = data.links?.length || 2;
          const streamLinks = Array(num_songs).fill(null).map((_, i) => `${apiUrl}/stream/${taskId}/${i}`);
          setSongLinks(streamLinks);
          setLyrics(data.lyrics);
        } else {
          // If not paid, redirect back to preview page
          router.push(`/song-preview/${taskId}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongData();
  }, [taskId, router, apiUrl]);

  const handleDownload = async (url: string, index: number) => {
    setDownloading(index);
    try {
      // The backend now sends the correct headers, but this JS approach is robust.
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      // The filename is now set by the backend, but we can have a fallback.
      a.download = `personalized_song_${index + 1}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      a.remove();
    } catch {
      setError('Failed to download the song. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const handleCopyLyrics = useCallback(() => {
    if (lyrics) {
      navigator.clipboard.writeText(lyrics);
      setLyricsCopied(true);
      setTimeout(() => setLyricsCopied(false), 2000);
    }
  }, [lyrics]);

  const handleCreateSharePage = async (e: FormEvent) => {
    e.preventDefault();
    if (!shareMessage.trim()) {
      setError('Please write a message for your gift page.');
      return;
    }
    setIsSharing(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/create_shareable_page`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId, message: shareMessage }),
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') {
        throw new Error(data.error || 'Failed to create shareable page.');
      }
      // Construct the full frontend URL
      const frontendUrl = `${window.location.origin}/share/${data.shareable_id}`;
      setShareUrl(frontendUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyShareUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setShareUrlCopied(true);
      setTimeout(() => setShareUrlCopied(false), 2000);
    }
  };

  const getRecipientName = () => {
    // Extracts name from "Recipient (from Giver)" format
    const nameMatch = lyrics?.match(/For (.+?) \(/);
    return nameMatch ? nameMatch[1] : 'your loved one';
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading your song...</p></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center flex-col"><p className="text-red-500">{error}</p><Link href="/" className="mt-4 text-blue-500">Go Home</Link></div>;
  }

  return (
    <div className="bg-white py-12">
      <main className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-extrabold" style={{ color: COLORS.dark }}>Your Masterpiece is Complete!</h2>
        <p className="mt-4 text-lg text-slate-600">Thank you for your purchase! Listen to your full songs below and download them to keep forever.</p>

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 text-left space-y-8">
          {songLinks?.map((link, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold text-slate-800">Full Song {index + 1}</h3>
              <audio controls preload="metadata" className="w-full mt-2">
                <source src={link} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button
                onClick={() => handleDownload(link, index)}
                disabled={downloading !== null}
                className="mt-3 inline-flex items-center justify-center gap-x-2 rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed w-48"
              >
                {downloading === index ? (
                  <><SoundWaveAnimation /> Downloading...</>
                ) : (
                  <><ArrowDownTrayIcon className="h-5 w-5" /><span>Download Song {index + 1}</span></>
                )}
              </button>
            </div>
          ))}

          <div>
            <div className="flex justify-between items-center mt-8">
              <h3 className="text-xl font-bold text-slate-800">Lyrics</h3>
              <button onClick={handleCopyLyrics} className="text-sm font-semibold text-pink-600 hover:text-pink-700 disabled:opacity-50 flex items-center gap-1.5" disabled={!lyrics}>
                {lyricsCopied ? <><CheckIcon className="h-4 w-4" /> Copied!</> : <><DocumentDuplicateIcon className="h-4 w-4" /> Copy Lyrics</>}
              </button>
            </div>
            <pre className="bg-slate-50 p-6 rounded-lg whitespace-pre-wrap font-sans text-slate-700 text-base leading-relaxed mt-2 max-h-72 overflow-y-auto">{lyrics}</pre>
          </div>
        </div>

        {/* Shareable Gift Page Section */}
        <div className="mt-12 p-8 bg-fuchsia-50 rounded-2xl text-left shadow-lg border border-fuchsia-200">
          <div className="text-center">
            <GiftIcon className="h-12 w-12 text-fuchsia-500 mx-auto" />
            <h3 className="mt-4 text-2xl font-bold text-slate-800">Share as a Special Gift! 🎁</h3>
            <p className="mt-2 text-slate-600">Create a private, shareable webpage for {getRecipientName()} with a personal message. It&apos;s free with your purchase!</p>
          </div>

          {shareUrl ? (
            <div className="mt-6 text-center">
              <h4 className="font-semibold text-lg text-slate-800">Your gift page is ready!</h4>
              <p className="text-sm text-slate-600 mt-1">Copy the private link below and send it to your loved one. You can also visit the link to see how it looks!</p>
              <div className="mt-4 flex items-center gap-2 p-2 bg-white border rounded-lg">
                <input type="text" value={shareUrl} readOnly className="w-full bg-transparent text-sm text-slate-700 font-mono focus:outline-none" />
                <button onClick={handleCopyShareUrl} className="flex-shrink-0 px-3 py-1.5 text-sm font-semibold text-white bg-pink-500 rounded-md hover:bg-pink-600 flex items-center gap-1.5">
                  {shareUrlCopied ? <><CheckIcon className="h-4 w-4" /> Copied</> : <><DocumentDuplicateIcon className="h-4 w-4" /> Copy</>}
                </button>
                <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-3 py-1.5 text-sm font-semibold text-white bg-fuchsia-500 rounded-md hover:bg-fuchsia-600">
                  Preview
                </a>
              </div>

              {/* Social Share Prompt */}
              <div className="mt-6 pt-6 border-t border-fuchsia-200">
                <h4 className="font-semibold text-slate-800">Share your masterpiece!</h4>
                <p className="text-sm text-slate-600 mt-1">Let your friends see the unique and heartfelt gift you&apos;ve created, Tag Them All!.</p>
                <div className="mt-4 flex justify-center items-center gap-4">
                    <a
                        href={`https://twitter.com/intent/tweet?text=I%20just%20created%20a%20personalized%20song%20for%20someone%20special!%20Check%20out%20the%20beautiful%20gift%20page%20I%20made.&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition-colors"
                    >
                        Share on X
                    </a>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=I%20just%20created%20a%20personalized%20song%20for%20someone%20special!%20Check%20out%20the%20beautiful%20gift%20page%20I%20made.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
                    >
                        Share on Facebook
                    </a>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateSharePage} className="mt-6 space-y-4">
              <div>
                <label htmlFor="share-message" className="block text-sm font-bold text-slate-800">Your Personal Message</label>
                <textarea
                  id="share-message"
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm bg-white/70 text-slate-900 placeholder:text-slate-500"
                  placeholder={`e.g., Happy Birthday! I hope you love this song I made just for you. Love, [Your Name]`}
                  required
                />
              </div>
              <button type="submit" disabled={isSharing} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-fuchsia-500 hover:bg-fuchsia-600 disabled:bg-fuchsia-300">
                {isSharing ? 'Creating Your Page...' : 'Create Gift Page'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}