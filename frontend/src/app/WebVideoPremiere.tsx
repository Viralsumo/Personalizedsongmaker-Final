'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import {
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  ArrowsPointingOutIcon,
  MusicalNoteIcon,
  SparklesIcon,
  BoltIcon,
} from '@heroicons/react/24/solid';
import { PhotoItem } from './PhotoUploadSection';

export type PremierePhoto = string | PhotoItem;

interface WebVideoPremiereProps {
  audioUrl: string;
  lyrics: string;
  photos?: PremierePhoto[];
  songTitle?: string;
  recipientName?: string;
  senderName?: string;
  occasion?: string;
  audioUrls?: string[];
  activeAudioIndex?: number;
  onAudioChange?: (index: number) => void;
}

interface LoadedPhotoRecord {
  img: HTMLImageElement;
  item: PhotoItem;
}

interface LyricStanza {
  line1: string;
  line2: string;
}

interface ActiveSubtitleState {
  type: 'intro' | 'stanza' | 'outro';
  line1: string;
  line2: string;
  alpha: number;
}

export default function WebVideoPremiere({
  audioUrl,
  lyrics,
  photos = [],
  songTitle = 'Personalized Song',
  recipientName = 'You',
  senderName = 'Someone Special',
  occasion = 'Special Occasion',
  audioUrls,
  activeAudioIndex,
  onAudioChange,
}: WebVideoPremiereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const exportCancelRef = useRef<(() => void) | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportMode, setExportMode] = useState<'full' | 'teaser'>('full');
  const [showExportModal, setShowExportModal] = useState(false);
  const [loadedPhotos, setLoadedPhotos] = useState<LoadedPhotoRecord[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Fallback aesthetic backgrounds if user provided fewer photos
  const fallbackPhotos: PhotoItem[] = useMemo(
    () => [
      {
        id: 'fallback_1',
        url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1280&auto=format&fit=crop', // Romantic Sunset
        fit: 'cover',
        focalY: 0.5,
        rotation: 0,
      },
      {
        id: 'fallback_2',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1280&auto=format&fit=crop', // Music & Warm Light
        fit: 'cover',
        focalY: 0.5,
        rotation: 0,
      },
      {
        id: 'fallback_3',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1280&auto=format&fit=crop', // Celebration & Lights
        fit: 'cover',
        focalY: 0.5,
        rotation: 0,
      },
      {
        id: 'fallback_4',
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1280&auto=format&fit=crop', // Soft Bokeh Rose
        fit: 'cover',
        focalY: 0.5,
        rotation: 0,
      },
    ],
    []
  );

  // Normalize photos array
  const normalizedPhotos: PhotoItem[] = useMemo(() => {
    if (!photos || photos.length === 0) return fallbackPhotos;
    return photos.map((p, idx) => {
      if (typeof p === 'string') {
        return {
          id: `p_${idx}`,
          url: p,
          fit: 'smart_fit', // Default Smart Fit ensures NO faces/edges are ever cut off
          focalY: 0.15,
          rotation: 0,
        };
      }
      return {
        id: p.id || `p_${idx}`,
        url: p.url,
        fit: p.fit || 'smart_fit',
        focalY: typeof p.focalY === 'number' ? p.focalY : 0.15,
        rotation: typeof p.rotation === 'number' ? p.rotation : 0,
      };
    });
  }, [photos, fallbackPhotos]);

  // When audioUrl changes (switching song tracks), reset playback
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
      audio.load();
    }
  }, [audioUrl]);

  // Pre-load all photo images with their metadata
  useEffect(() => {
    let isCancelled = false;

    const loadPromises = normalizedPhotos.map((item) => {
      return new Promise<LoadedPhotoRecord>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve({ img, item });
        img.onerror = () => {
          // If a custom photo fails to load, fallback to standard aesthetic photo
          const fallback = new Image();
          fallback.crossOrigin = 'anonymous';
          fallback.src = fallbackPhotos[0].url;
          fallback.onload = () => resolve({ img: fallback, item });
          fallback.onerror = () => resolve({ img: fallback, item });
        };
        img.src = item.url;
      });
    });

    Promise.all(loadPromises).then((records) => {
      if (!isCancelled) {
        setLoadedPhotos(records.filter(Boolean));
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [normalizedPhotos, fallbackPhotos]);

  // Helper to cleanly break a long string into 2 balanced lines
  const breakIntoTwoLines = (text: string, maxPerLine = 34): [string, string] => {
    if (text.length <= maxPerLine) return [text, ''];
    const words = text.split(' ');
    let line1 = '';
    let line2 = '';
    for (const word of words) {
      if ((line1 + ' ' + word).trim().length <= maxPerLine && !line2) {
        line1 = (line1 + ' ' + word).trim();
      } else {
        line2 = (line2 + ' ' + word).trim();
      }
    }
    return [line1, line2];
  };

  // Group cleaned lyric lines into cinematic 2-line stanzas (couplets)
  const lyricStanzas = useMemo<LyricStanza[]>(() => {
    const rawLines = lyrics
      .split('\n')
      .map((l) => l.trim().replace(/^\[.*?\]\s*/g, '').replace(/^\(.*?\)\s*/g, ''))
      .filter((l) => l.length > 0 && !l.startsWith('[') && !l.startsWith('('));

    if (rawLines.length === 0) return [];

    const stanzas: LyricStanza[] = [];
    let i = 0;
    while (i < rawLines.length) {
      const cur = rawLines[i];
      const next = rawLines[i + 1];

      // If cur is already very long, break it across 2 lines for this stanza
      if (cur.length > 38) {
        const [l1, l2] = breakIntoTwoLines(cur, 32);
        stanzas.push({ line1: l1, line2: l2 });
        i += 1;
      } else if (next && next.length <= 38) {
        // Natural couplet: cur as Line 1, next as Line 2
        stanzas.push({ line1: cur, line2: next });
        i += 2;
      } else {
        // Single line stanza
        stanzas.push({ line1: cur, line2: '' });
        i += 1;
      }
    }
    return stanzas;
  }, [lyrics]);

  // Compute active cinematic subtitle state with crossfades and verse/chorus pauses
  const getActiveSubtitle = useCallback(
    (time: number, totalDuration: number): ActiveSubtitleState => {
      const duration = Math.max(totalDuration || 180, 15);
      const introDuration = 5.5; // 0s - 5.5s intro
      const outroDuration = 6.0; // last 6s outro

      // 1. Intro Title Card
      if (time < introDuration) {
        // Fade in 0-0.8s, full 0.8-4.7s, fade out 4.7-5.5s
        let alpha = 1;
        if (time < 0.8) alpha = Math.max(0.05, time / 0.8);
        else if (time > 4.7) alpha = Math.max(0, (introDuration - time) / 0.8);

        return {
          type: 'intro',
          line1: `A Song for ${recipientName}`,
          line2: 'Turn up the volume & listen closely... 🎶',
          alpha,
        };
      }

      // 2. Outro Keepsake Card
      if (time >= duration - outroDuration) {
        const outroElapsed = time - (duration - outroDuration);
        let alpha = 1;
        if (outroElapsed < 0.8) alpha = Math.max(0.05, outroElapsed / 0.8);
        return {
          type: 'outro',
          line1: `Made with Love for ${recipientName}`,
          line2: `A Timeless Keepsake • ${occasion}`,
          alpha,
        };
      }

      // 3. Stanza Couplets (The Singing Window)
      if (lyricStanzas.length === 0) {
        return {
          type: 'stanza',
          line1: `For ${recipientName}`,
          line2: 'Personalized Song Keepsake',
          alpha: 1,
        };
      }

      const activeStartTime = introDuration;
      const activeEndTime = duration - outroDuration;
      const activeDuration = Math.max(activeEndTime - activeStartTime, 10);
      const stanzaDuration = activeDuration / lyricStanzas.length;

      const elapsedActive = Math.max(0, time - activeStartTime);
      const stanzaIndex = Math.min(
        Math.floor(elapsedActive / stanzaDuration),
        lyricStanzas.length - 1
      );
      const currentStanza = lyricStanzas[stanzaIndex];

      const timeInStanza = elapsedActive % stanzaDuration;
      // Television Pacing:
      // - First 0.45s: smooth fade-in
      // - Middle: full opacity
      // - Last 0.65s: smooth fade-out (creating natural breathing pause before next couplet)
      const fadeInTime = 0.45;
      const fadeOutTime = Math.min(0.65, stanzaDuration * 0.25);
      let alpha = 1.0;

      if (timeInStanza < fadeInTime) {
        alpha = Math.max(0.05, timeInStanza / fadeInTime);
      } else if (timeInStanza > stanzaDuration - fadeOutTime) {
        alpha = Math.max(0, (stanzaDuration - timeInStanza) / fadeOutTime);
      }

      return {
        type: 'stanza',
        line1: currentStanza.line1,
        line2: currentStanza.line2,
        alpha,
      };
    },
    [lyricStanzas, recipientName, occasion]
  );

  // Render loop onto Canvas
  const drawFrame = useCallback(
    (time: number, totalDuration: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;

      // Clear canvas with deep aesthetic slate
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, W, H);

      // Determine photo pacing: change photo every 6 seconds
      const photoInterval = 6;
      if (loadedPhotos.length > 0) {
        const currentIdx = Math.floor(time / photoInterval) % loadedPhotos.length;
        const nextIdx = (currentIdx + 1) % loadedPhotos.length;
        const photoTime = time % photoInterval;
        const transitionProgress = Math.max(0, (photoTime - (photoInterval - 1.2)) / 1.2); // 1.2s crossfade

        const drawPhoto = (
          record: LoadedPhotoRecord,
          alpha: number,
          scaleFactor: number
        ) => {
          const { img, item } = record;
          ctx.save();
          ctx.globalAlpha = alpha;

          // Ken Burns Pan & Zoom calculation
          const zoom = 1.0 + scaleFactor * 0.08;
          const panX = Math.sin(time * 0.25) * 12;
          const panY = Math.cos(time * 0.2) * 12;

          const rotDeg = item.rotation || 0;
          const isRotated90or270 = rotDeg === 90 || rotDeg === 270;
          const naturalW = isRotated90or270 ? img.height : img.width;
          const naturalH = isRotated90or270 ? img.width : img.height;
          const imgAspect = naturalW / naturalH;
          const canvasAspect = W / H;

          const drawRotated = (cx: number, cy: number, dw: number, dh: number) => {
            ctx.save();
            ctx.translate(cx, cy);
            if (rotDeg) {
              ctx.rotate((rotDeg * Math.PI) / 180);
            }
            const drawW = isRotated90or270 ? dh : dw;
            const drawH = isRotated90or270 ? dw : dh;
            ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
            ctx.restore();
          };

          if (item.fit === 'smart_fit') {
            // -------------------------------------------------------------
            // SMART FIT: Zero Cropped Faces!
            // -------------------------------------------------------------
            // 1. Soft blurred ambient background filling the 9:16 vertical canvas
            ctx.save();
            try {
              ctx.filter = 'blur(24px) brightness(0.55)';
            } catch {
              // fallback if ctx.filter unsupported
            }
            let bgW = W * 1.35;
            let bgH = H * 1.35;
            if (imgAspect > canvasAspect) {
              bgW = bgH * imgAspect;
            } else {
              bgH = bgW / imgAspect;
            }
            drawRotated(W / 2 + panX * 0.4, H / 2 + panY * 0.4, bgW, bgH);
            ctx.restore();

            // 2. Foreground: sharp, full uncropped photo centered with soft drop shadow
            ctx.save();
            let fitW = W * 0.94 * zoom;
            let fitH = fitW / imgAspect;
            if (fitH > H * 0.76 * zoom) {
              fitH = H * 0.76 * zoom;
              fitW = fitH * imgAspect;
            }
            ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
            ctx.shadowBlur = 32;
            ctx.shadowOffsetY = 12;

            // Position slightly higher than center to leave room for synced lyrics
            const centerX = W / 2 + panX;
            const centerY = H * 0.43 + panY;
            drawRotated(centerX, centerY, fitW, fitH);
            ctx.restore();
          } else {
            // -------------------------------------------------------------
            // COVER / FILL SCREEN: Zoomed with Focal Face Protection
            // -------------------------------------------------------------
            let fillW = W * zoom;
            let fillH = H * zoom;

            if (imgAspect > canvasAspect) {
              fillH = H * zoom;
              fillW = fillH * imgAspect;
            } else {
              fillW = W * zoom;
              fillH = fillW / imgAspect;
            }

            // focalY = 0.15 (Top/Faces), 0.5 (Center), 0.85 (Bottom)
            const focalY = typeof item.focalY === 'number' ? item.focalY : 0.15;
            const centerX = W / 2 + panX;
            const centerY = H / 2 + (0.5 - focalY) * (fillH - H) + panY;

            drawRotated(centerX, centerY, fillW, fillH);
          }

          ctx.restore();
        };

        const currentScale = photoTime / photoInterval;
        drawPhoto(loadedPhotos[currentIdx], 1, currentScale);

        if (transitionProgress > 0) {
          drawPhoto(loadedPhotos[nextIdx], transitionProgress, 0);
        }
      }

      // 1. Dark Vignette at bottom & top for high text readability
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.75)');
      grad.addColorStop(0.18, 'rgba(15, 23, 42, 0.1)');
      grad.addColorStop(0.55, 'rgba(15, 23, 42, 0.25)');
      grad.addColorStop(0.78, 'rgba(15, 23, 42, 0.88)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // 2. Header watermark / occasion tag
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(occasion.toUpperCase(), W / 2, 70);

      ctx.fillStyle = '#f472b6'; // Pink accent
      ctx.font = '20px sans-serif';
      ctx.fillText(`For ${recipientName} • From ${senderName}`, W / 2, 105);

      // 3. Ambient animated music particles
      const numParticles = 8;
      for (let i = 0; i < numParticles; i++) {
        const particleX = (Math.sin(time * 0.5 + i * 2) * 0.4 + 0.5) * W;
        const particleY = (Math.cos(time * 0.3 + i * 1.5) * 0.3 + 0.45) * H;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fill();
      }

      // 4. Cinematic 2-Line Subtitles Display (Television Quality)
      const sub = getActiveSubtitle(time, totalDuration || 180);

      if (sub.alpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = sub.alpha;

        const hasLine2 = Boolean(sub.line2 && sub.line2.trim().length > 0);

        // Pre-measure font metrics
        ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const m1 = ctx.measureText(sub.line1);
        ctx.font = '500 23px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const m2 = hasLine2 ? ctx.measureText(sub.line2) : { width: 0 };

        const maxTextW = Math.max(m1.width, m2.width);
        const cardW = Math.min(Math.max(maxTextW + 64, 380), W * 0.92);
        const cardH = hasLine2 ? 116 : 74;
        const cardX = (W - cardW) / 2;
        const cardY = H * 0.81 - cardH / 2;

        // Rounded translucent glass card backdrop
        ctx.beginPath();
        const r = 20;
        ctx.moveTo(cardX + r, cardY);
        ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardH, r);
        ctx.arcTo(cardX + cardW, cardY + cardH, cardX, cardY + cardH, r);
        ctx.arcTo(cardX, cardY + cardH, cardX, cardY, r);
        ctx.arcTo(cardX, cardY, cardX + cardW, cardY, r);
        ctx.closePath();

        // Dark glass fill
        ctx.fillStyle = 'rgba(11, 15, 25, 0.78)';
        ctx.fill();

        // Subtle glowing glass border
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (hasLine2) {
          // Line 1: Primary bold white lyric
          ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
          ctx.shadowBlur = 10;
          ctx.fillText(sub.line1, W / 2, cardY + 38);

          // Line 2: Soft rose harmonizing couplet
          ctx.font = '500 23px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillStyle = '#f9a8d4'; // Soft rose-200
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.shadowBlur = 8;
          ctx.fillText(sub.line2, W / 2, cardY + 78);
        } else {
          // Single line: centered
          ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
          ctx.shadowBlur = 10;
          ctx.fillText(sub.line1, W / 2, cardY + cardH / 2);
        }

        ctx.restore();
      }

      // 5. Subtle Progress bar along the very bottom edge
      if (totalDuration > 0) {
        const progress = Math.min(time / totalDuration, 1);
        ctx.fillStyle = '#ec4899'; // Pink bar
        ctx.fillRect(0, H - 10, W * progress, 10);
      }
    },
    [loadedPhotos, getActiveSubtitle, occasion, recipientName, senderName]
  );

  // Animation frame updater for live preview
  useEffect(() => {
    const update = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime);
        drawFrame(audio.currentTime, audio.duration || duration);
      }
      animFrameRef.current = requestAnimationFrame(update);
    };

    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(update);
    } else if (!isExporting) {
      drawFrame(currentTime, duration);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, currentTime, duration, drawFrame, isExporting]);

  // Audio Play / Pause handler
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Audio play error:', err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  // Starts the export process with chosen mode ('full' or 'teaser')
  const startExportWithMode = async (mode: 'full' | 'teaser') => {
    setShowExportModal(false);
    setExportMode(mode);

    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio) return;

    setIsExporting(true);
    setExportProgress(0);

    // Pause live playback before recording
    audio.pause();
    setIsPlaying(false);

    let isCancelled = false;
    let animationFrameId: number;
    let sourceNode: AudioBufferSourceNode | null = null;
    let mediaRecorder: MediaRecorder | null = null;
    let activeAudioCtx: AudioContext | null = null;

    exportCancelRef.current = () => {
      isCancelled = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      try {
        if (sourceNode) sourceNode.stop();
        if (mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop();
        if (activeAudioCtx) activeAudioCtx.close();
      } catch {
        // ignore cleanup error
      }
      setIsExporting(false);
    };

    try {
      const audioCtx = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )();
      activeAudioCtx = audioCtx;
      await audioCtx.resume(); // Ensure context is running immediately

      // Fetch and decode full audio buffer
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      // Determine duration: full song (entire 3-4 min) or 30s teaser
      const songTotalDuration = audioBuffer.duration;
      const targetDuration = mode === 'teaser' ? Math.min(30, songTotalDuration) : songTotalDuration;

      // Setup audio graph
      const destination = audioCtx.createMediaStreamDestination();
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      sourceNode = source;

      // Connect source to recorder destination
      source.connect(destination);

      // CRITICAL FIX FOR 10-SECOND FREEZE:
      // Connect to hardware audioCtx.destination via gentle monitor gain.
      // This keeps Chrome's audio clock running continuously without power-saving sleep!
      const monitorGain = audioCtx.createGain();
      monitorGain.gain.value = 0.04; // Soft audible monitor
      source.connect(monitorGain);
      monitorGain.connect(audioCtx.destination);

      // Grab canvas stream at 30 FPS
      const canvasStream = canvas.captureStream(30);

      // Combine synchronized video and audio tracks
      const combinedStream = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...destination.stream.getAudioTracks(),
      ]);

      // Detect best supported MIME type
      const possibleTypes = [
        'video/mp4;codecs=avc1,mp4a.40.2',
        'video/mp4',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
      ];
      let selectedMime = 'video/webm';
      for (const t of possibleTypes) {
        if (MediaRecorder.isTypeSupported(t)) {
          selectedMime = t;
          break;
        }
      }

      const recorder = new MediaRecorder(combinedStream, {
        mimeType: selectedMime,
        videoBitsPerSecond: 2500000, // 2.5 Mbps crisp 720p
      });
      mediaRecorder = recorder;

      const recordedChunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        if (isCancelled) return;
        const isMp4 = selectedMime.includes('mp4');
        const fileExt = isMp4 ? 'mp4' : 'webm';
        const blob = new Blob(recordedChunks, { type: selectedMime });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        const safeName = recipientName.replace(/[^a-zA-Z0-9_-]/g, '_');
        const suffix = mode === 'teaser' ? '_30s_Highlight' : '_Full_Video';
        a.download = `${safeName}_Personalized_Video${suffix}.${fileExt}`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(downloadUrl);
          a.remove();
        }, 1500);
        setIsExporting(false);
        setExportProgress(100);
      };

      // Start recording with 1000ms timeslice to ensure continuous flushing
      recorder.start(1000);
      source.start(0);

      const startAudioTime = audioCtx.currentTime;
      let lastProgressTime = 0;

      // Render loop driven by the high-precision audio clock
      const exportLoop = () => {
        if (isCancelled) return;
        const elapsed = Math.max(0, audioCtx.currentTime - startAudioTime);

        // Throttle React progress updates to once every 250ms to keep CPU silky smooth
        const now = performance.now();
        if (now - lastProgressTime > 250) {
          lastProgressTime = now;
          const pct = Math.min(Math.round((elapsed / targetDuration) * 100), 99);
          setExportProgress(pct);
        }

        drawFrame(elapsed, targetDuration);

        if (elapsed < targetDuration) {
          animationFrameId = requestAnimationFrame(exportLoop);
        } else {
          // Finished encoding!
          cancelAnimationFrame(animationFrameId);
          setExportProgress(100);
          setTimeout(() => {
            try {
              source.stop();
              if (recorder.state === 'recording') {
                recorder.stop();
              }
              audioCtx.close();
            } catch (err) {
              console.warn('Cleanup error on export finish:', err);
            }
          }, 400);
        }
      };

      animationFrameId = requestAnimationFrame(exportLoop);
    } catch (err) {
      console.error('Failed to export video:', err);
      alert('Video export encountered an issue. You can still watch the live premiere anytime!');
      setIsExporting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-md w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 text-white select-none"
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Top Corner Audio Track Switcher Overlay */}
      {audioUrls && audioUrls.length > 1 && onAudioChange && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg">
          <span className="text-[10px] font-bold text-pink-400 pl-2 pr-1 flex items-center gap-1">
            <MusicalNoteIcon className="w-3 h-3 text-pink-400" />
            Audio:
          </span>
          {audioUrls.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAudioChange(i);
              }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                (activeAudioIndex ?? 0) === i
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Song {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* 720x1280 9:16 Canvas */}
      <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={720}
          height={1280}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
        />

        {/* Center Play Overlay when paused */}
        {!isPlaying && !isExporting && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-pink-500/90 hover:bg-pink-500 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
            aria-label="Play Video Premiere"
          >
            <PlayIcon className="w-10 h-10 ml-1 text-white" />
          </button>
        )}

        {/* Export Duration Choice Modal */}
        {showExportModal && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
            <h4 className="text-xl font-extrabold text-white">Save Video Keepsake</h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xs">
              Choose your video download format:
            </p>

            <div className="mt-5 w-full space-y-3">
              <button
                type="button"
                onClick={() => startExportWithMode('full')}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm text-left shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-between"
              >
                <div>
                  <div className="font-extrabold flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4 text-pink-200" />
                    Full Master Song Video
                  </div>
                  <div className="text-[11px] text-pink-100 font-medium mt-0.5">
                    Complete 720p HD video for the entire song ({Math.floor((duration || 30) / 60)}:{String(Math.floor((duration || 30) % 60)).padStart(2, '0')})
                  </div>
                </div>
                <ArrowDownTrayIcon className="w-5 h-5 flex-shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => startExportWithMode('teaser')}
                className="w-full p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm text-left border border-slate-700 transition-transform hover:scale-[1.02] flex items-center justify-between"
              >
                <div>
                  <div className="font-bold flex items-center gap-2 text-white">
                    <BoltIcon className="w-4 h-4 text-amber-400" />
                    30s Highlight Reel
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                    Fast export — perfect for WhatsApp status &amp; Instagram Stories
                  </div>
                </div>
                <ArrowDownTrayIcon className="w-4 h-4 flex-shrink-0" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowExportModal(false)}
              className="mt-5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Active Exporting Overlay with Live Progress & Cancel Button */}
        {isExporting && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
            <h4 className="text-xl font-bold text-white">
              {exportMode === 'teaser' ? 'Encoding 30s Reel...' : 'Encoding Full Video...'}
            </h4>
            <p className="text-xs text-slate-300 mt-2 max-w-xs">
              Recording 720p vertical MP4 on your device. Please keep this tab open during export.
            </p>
            <div className="w-56 bg-slate-800 rounded-full h-3.5 mt-5 overflow-hidden p-0.5 border border-slate-700">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-pink-400 mt-2.5">
              {exportProgress}% Completed
            </span>

            <button
              type="button"
              onClick={() => exportCancelRef.current?.()}
              className="mt-6 px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Cancel Export
            </button>
          </div>
        )}
      </div>

      {/* Media Controls Bar */}
      <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-3 text-sm">
        <button
          onClick={togglePlay}
          disabled={isExporting}
          className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
        >
          {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="flex-1 text-xs text-slate-400 truncate">
          <span className="font-semibold text-slate-200 block truncate">{songTitle}</span>
          <span>
            {Math.floor(currentTime / 60)}:
            {String(Math.floor(currentTime % 60)).padStart(2, '0')} /{' '}
            {Math.floor(duration / 60)}:
            {String(Math.floor(duration % 60)).padStart(2, '0')}
          </span>
        </div>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Premiere'}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowsPointingOutIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowExportModal(true)}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 transition-all shadow-md disabled:opacity-50"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          <span>Save MP4</span>
        </button>
      </div>
    </div>
  );
}
