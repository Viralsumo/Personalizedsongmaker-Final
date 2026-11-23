'use client';

import { useEffect, useState, useCallback, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { COLORS } from '../../constants';
import {
  ArrowDownTrayIcon,
  GiftIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  SparklesIcon,
  MusicalNoteIcon,
  PhotoIcon,
  AdjustmentsHorizontalIcon,
  ShareIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/solid';
import WebVideoPremiere from '../../WebVideoPremiere';
import PhotoUploadSection, { PhotoItem, normalizePhotos } from '../../PhotoUploadSection';

const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const XTwitterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

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
  const [storedPhotos, setStoredPhotos] = useState<PhotoItem[]>([]);
  const [activeAudioIndex, setActiveAudioIndex] = useState<number>(0);
  const [showPhotoEditor, setShowPhotoEditor] = useState<boolean>(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    if (typeof window !== 'undefined' && taskId) {
      const savedPref = localStorage.getItem(`preferred_song_index_${taskId}`);
      if (savedPref) {
        setActiveAudioIndex(parseInt(savedPref, 10) || 0);
      }
      const saved = localStorage.getItem(`uploaded_photos_${taskId}`);
      if (saved) {
        try {
          setStoredPhotos(normalizePhotos(JSON.parse(saved)));
        } catch {
          setStoredPhotos([]);
        }
      }
    }
  }, [taskId]);

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

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: `A Special Song for ${getRecipientName()}`,
          text: `I created a personalized song & video keepsake for ${getRecipientName()}! 🎁 Watch and listen here:`,
          url: shareUrl,
        });
      } catch (err) {
        // User dismissed share sheet or unsupported
        console.log('Share dismissed or cancelled:', err);
      }
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

        {/* Deluxe Video Keepsake Section */}
        {songLinks && songLinks.length > 0 && lyrics && (
          <div className="mt-8 mb-10 p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl text-center text-white shadow-2xl border border-slate-800">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold text-pink-400 bg-pink-950/60 border border-pink-800/60 mb-3">
              <SparklesIcon className="h-4 w-4 text-pink-400" />
              Deluxe Video Keepsake (720p Vertical)
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Your Video Premiere is Ready!</h3>
            <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto">
              Watch your customized video with synced lyrics and your photos. Tap &apos;Save MP4&apos; to download the video directly to your camera roll!
            </p>

            {/* Soundtrack Version Selector for Video */}
            {songLinks.length > 1 && (
              <div className="mt-4 mb-3 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 shadow-md">
                <span className="text-xs font-bold text-slate-300 px-2.5 flex items-center gap-1.5">
                  <MusicalNoteIcon className="w-4 h-4 text-pink-400" />
                  Soundtrack:
                </span>
                {songLinks.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveAudioIndex(idx);
                      if (typeof window !== 'undefined') {
                        localStorage.setItem(`preferred_song_index_${taskId}`, String(idx));
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeAudioIndex === idx
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 scale-105'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    <span>Song Version {idx + 1}</span>
                    {activeAudioIndex === idx && <CheckIcon className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <WebVideoPremiere
                audioUrl={songLinks[activeAudioIndex] || songLinks[0]}
                lyrics={lyrics}
                photos={storedPhotos}
                songTitle={`Song for ${getRecipientName()} (Version ${activeAudioIndex + 1})`}
                recipientName={getRecipientName()}
                senderName="You"
                occasion="Custom Song Keepsake"
                audioUrls={songLinks}
                activeAudioIndex={activeAudioIndex}
                onAudioChange={(idx) => {
                  setActiveAudioIndex(idx);
                  if (typeof window !== 'undefined') {
                    localStorage.setItem(`preferred_song_index_${taskId}`, String(idx));
                  }
                }}
              />
            </div>

            {/* Photo Sequence & Framing Adjuster Button */}
            <div className="mt-6 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setShowPhotoEditor(!showPhotoEditor)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2 shadow"
              >
                <AdjustmentsHorizontalIcon className="w-4 h-4 text-pink-400" />
                <span>
                  {showPhotoEditor
                    ? '▲ Hide Photo & Sequence Editor'
                    : '🎨 Adjust Photos, Sequence & Framing'}
                </span>
              </button>

              {showPhotoEditor && (
                <div className="mt-5 w-full text-left bg-slate-950/80 p-5 rounded-2xl border border-slate-800 animate-fadeIn">
                  <div className="mb-3">
                    <h4 className="text-white font-bold text-sm flex items-center gap-2">
                      <PhotoIcon className="w-4 h-4 text-pink-400" />
                      Fine-Tune Photos &amp; Video Sequence
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Change photo sequence with ◀ ▶, rotate phone photos, or toggle Smart Fit to guarantee no faces or people are cropped. Your video above updates immediately!
                    </p>
                  </div>
                  <PhotoUploadSection
                    taskId={taskId}
                    hideTierSelector={true}
                    onTierChange={(_, photos) => setStoredPhotos(photos)}
                  />
                </div>
              )}
            </div>
          </div>
        )}

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
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 p-2 bg-white border border-fuchsia-200 rounded-xl shadow-sm">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full px-3 py-2 bg-transparent text-xs sm:text-sm text-slate-700 font-mono focus:outline-none"
                />
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleCopyShareUrl}
                    className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-bold text-white bg-pink-500 rounded-lg hover:bg-pink-600 flex items-center justify-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
                  >
                    {shareUrlCopied ? <><CheckIcon className="h-4 w-4" /> Copied!</> : <><DocumentDuplicateIcon className="h-4 w-4" /> Copy Link</>}
                  </button>
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-bold text-fuchsia-700 bg-fuchsia-100 hover:bg-fuchsia-200 rounded-lg flex items-center justify-center gap-1 transition-colors whitespace-nowrap"
                  >
                    <span>View Page</span>
                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Social Share Prompt */}
              <div className="mt-6 pt-6 border-t border-fuchsia-200">
                <h4 className="font-bold text-slate-800 text-base">Send or Share Your Gift! 🚀</h4>
                <p className="text-xs text-slate-600 mt-1">Send directly to {getRecipientName()} on WhatsApp or share the milestone with family &amp; friends.</p>
                <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
                  {/* WhatsApp Direct Share - Primary CTA */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`I created a personalized song & video keepsake for ${getRecipientName()}! 🎁 Watch and listen here: ` + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-sm shadow-md shadow-[#25D366]/25 transition-transform hover:scale-105 active:scale-95"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>Send on WhatsApp</span>
                  </a>

                  {/* Native Mobile Share if supported */}
                  {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                    <button
                      type="button"
                      onClick={handleNativeShare}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-pink-600/25 transition-transform hover:scale-105 active:scale-95"
                    >
                      <ShareIcon className="w-4 h-4 text-white" />
                      <span>More Apps (iMessage / DMs)</span>
                    </button>
                  )}

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(`I just created a personalized song & video for ${getRecipientName()}!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl font-semibold text-sm shadow-sm transition-transform hover:scale-105"
                  >
                    <FacebookIcon className="w-4 h-4 text-white" />
                    <span>Facebook</span>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just created a personalized song & video for ${getRecipientName()}! Check out the keepsake gift page:`)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl font-semibold text-sm shadow-sm transition-transform hover:scale-105"
                  >
                    <XTwitterIcon className="w-4 h-4 text-white" />
                    <span>Post on X</span>
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