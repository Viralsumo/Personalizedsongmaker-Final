'use client';

import React, { useState } from 'react';
import {
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  SparklesIcon,
  XMarkIcon,
  PlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';

export interface PhotoItem {
  id: string;
  url: string;
  fit: 'smart_fit' | 'cover'; // 'smart_fit' = full photo + blurred ambient fill; 'cover' = zoomed fill
  focalY: number; // 0.15 (Top/Faces), 0.5 (Center), 0.85 (Bottom)
  rotation: number; // 0, 90, 180, 270
}

export type UploadedPhoto = string | PhotoItem;

export interface PhotoUploadSectionProps {
  taskId: string;
  onTierChange?: (tier: 'audio' | 'video', photos: PhotoItem[]) => void;
  hideTierSelector?: boolean;
}

export function normalizePhotos(list: unknown[]): PhotoItem[] {
  if (!Array.isArray(list)) return [];
  return list.map((item, idx) => {
    if (typeof item === 'string') {
      return {
        id: `p_${idx}_${Date.now()}`,
        url: item,
        fit: 'smart_fit',
        focalY: 0.15,
        rotation: 0,
      };
    }
    const p = item as Partial<PhotoItem>;
    return {
      id: p.id || `p_${idx}_${Date.now()}`,
      url: p.url || '',
      fit: p.fit === 'cover' ? 'cover' : 'smart_fit',
      focalY: typeof p.focalY === 'number' ? p.focalY : 0.15,
      rotation: typeof p.rotation === 'number' ? p.rotation : 0,
    };
  });
}

export default function PhotoUploadSection({
  taskId,
  onTierChange,
  hideTierSelector = false,
}: PhotoUploadSectionProps) {
  const [selectedTier, setSelectedTier] = useState<'audio' | 'video'>('video');
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`uploaded_photos_${taskId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return normalizePhotos(parsed);
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Resize and optimize photo to 720p max in browser memory
  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1280;
          let w = img.width;
          let h = img.height;

          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(img.src);
            return;
          }
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const savePhotos = (updated: PhotoItem[]) => {
    setPhotos(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`uploaded_photos_${taskId}`, JSON.stringify(updated));
    }
    onTierChange?.(selectedTier, updated);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const newPhotos = [...photos];

    for (let i = 0; i < files.length && newPhotos.length < 10; i++) {
      try {
        const dataUrl = await processImageFile(files[i]);
        newPhotos.push({
          id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          url: dataUrl,
          fit: 'smart_fit', // Default to Smart Fit so faces/sides are never cut off
          focalY: 0.15,
          rotation: 0,
        });
      } catch (err) {
        console.error('Failed to process image:', err);
      }
    }

    savePhotos(newPhotos);
    setIsProcessing(false);
  };

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    savePhotos(updated);
  };

  const movePhoto = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;
    const updated = [...photos];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    savePhotos(updated);
  };

  const rotatePhoto = (index: number) => {
    const updated = [...photos];
    const currentRot = updated[index].rotation || 0;
    updated[index] = {
      ...updated[index],
      rotation: (currentRot + 90) % 360,
    };
    savePhotos(updated);
  };

  const updatePhotoFit = (index: number, fit: 'smart_fit' | 'cover', focalY: number = 0.15) => {
    const updated = [...photos];
    updated[index] = {
      ...updated[index],
      fit,
      focalY,
    };
    savePhotos(updated);
  };

  const applyFitToAll = (fit: 'smart_fit' | 'cover', focalY: number = 0.15) => {
    const updated = photos.map((p) => ({
      ...p,
      fit,
      focalY,
    }));
    savePhotos(updated);
  };

  const handleSelectTier = (tier: 'audio' | 'video') => {
    setSelectedTier(tier);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`selected_tier_${taskId}`, tier);
    }
    onTierChange?.(tier, photos);
  };

  return (
    <div className="mt-8 space-y-6 text-left">
      {!hideTierSelector && (
        <>
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-extrabold text-slate-900">
              Choose Your Gift Package
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Turn your custom song into an unforgettable visual keepsake.
            </p>
          </div>

          {/* Package Tier Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tier 1: Essential Audio */}
            <div
              onClick={() => handleSelectTier('audio')}
              className={`cursor-pointer p-5 rounded-2xl border-2 transition-all relative ${
                selectedTier === 'audio'
                  ? 'border-pink-500 bg-pink-50/40 shadow-md ring-2 ring-pink-500/20'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="absolute -top-3 left-4 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                50% OFF Launch Deal
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <MusicalNoteIcon className="h-5 w-5 text-slate-600" />
                  Essential Audio
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold text-slate-400 line-through">$9.99</span>
                  <span className="font-extrabold text-2xl text-slate-900">$4.99</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                2 studio-quality MP3 song versions + lifetime audio streaming gift link.
              </p>
            </div>

            {/* Tier 2: Deluxe Video Keepsake */}
            <div
              onClick={() => handleSelectTier('video')}
              className={`cursor-pointer p-5 rounded-2xl border-2 transition-all relative ${
                selectedTier === 'video'
                  ? 'border-pink-500 bg-gradient-to-br from-pink-50/60 to-purple-50/40 shadow-lg ring-2 ring-pink-500/30'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="absolute -top-3 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                ⭐ 50% OFF • Most Popular
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-600 text-lg flex items-center gap-2">
                  <VideoCameraIcon className="h-5 w-5 text-pink-600" />
                  Deluxe Video Keepsake
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold text-pink-400/80 line-through">$19.99</span>
                  <span className="font-extrabold text-2xl text-pink-600">$9.99</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                <strong>Full HD 720p Video (MP4)</strong> with your personal photos, cinematic synced lyrics, dual formats, plus all MP3s.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Photo Uploader & Sequence / Framing Editor */}
      {(selectedTier === 'video' || hideTierSelector) && (
        <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
            <div>
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <PhotoIcon className="h-5 w-5 text-pink-500" />
                Your Photos &amp; Video Sequence ({photos.length}/10)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Reorder the sequence with ◀ ▶, rotate sideways photos, and adjust framing so no faces get cut off.
              </p>
            </div>

            {/* Quick Global Framing Controls */}
            {photos.length > 0 && (
              <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white p-1 rounded-xl border border-gray-200 text-xs shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 px-2">Preset All:</span>
                <button
                  type="button"
                  onClick={() => applyFitToAll('smart_fit')}
                  className="px-2.5 py-1 rounded-lg font-bold bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors flex items-center gap-1"
                  title="Preserves the full photo with ambient background - zero cropped faces!"
                >
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-pink-600" />
                  Smart Fit (No Crop)
                </button>
                <button
                  type="button"
                  onClick={() => applyFitToAll('cover', 0.15)}
                  className="px-2.5 py-1 rounded-lg font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  title="Fills vertical screen with focus on faces"
                >
                  Fill (Face)
                </button>
              </div>
            )}
          </div>

          {/* Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                {/* Thumbnail Display with active rotation & aspect preview */}
                <div className="relative aspect-[3/4] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                  {/* Order Badge */}
                  <span className="absolute top-2 left-2 z-10 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full border border-white/20 shadow">
                    #{index + 1} {index === 0 ? '(Opening)' : ''}
                  </span>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 z-10 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-full transition-transform hover:scale-110 shadow"
                    aria-label="Remove photo"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>

                  {/* Smart Fit Preview (blurred bg + foreground) or Cover */}
                  {item.fit === 'smart_fit' ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-md opacity-50 scale-125"
                        style={{
                          backgroundImage: `url(${item.url})`,
                          transform: `rotate(${item.rotation}deg) scale(1.3)`,
                        }}
                      />
                      <img
                        src={item.url}
                        alt={`Memory ${index + 1}`}
                        style={{ transform: `rotate(${item.rotation}deg)` }}
                        className="relative z-1 max-w-[90%] max-h-[90%] object-contain drop-shadow-md transition-transform"
                      />
                    </>
                  ) : (
                    <img
                      src={item.url}
                      alt={`Memory ${index + 1}`}
                      style={{
                        transform: `rotate(${item.rotation}deg)`,
                        objectPosition: item.focalY <= 0.25 ? 'center top' : 'center center',
                      }}
                      className="w-full h-full object-cover transition-all"
                    />
                  )}
                </div>

                {/* Photo Toolbar: Reorder, Rotate & Framing */}
                <div className="p-3 bg-white space-y-2.5">
                  {/* Sequence Reorder & Rotate Buttons */}
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => movePhoto(index, 'left')}
                        disabled={index === 0}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-lg text-slate-700 transition-colors"
                        title="Move Earlier in Video"
                      >
                        <ArrowLeftIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => movePhoto(index, 'right')}
                        disabled={index === photos.length - 1}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-lg text-slate-700 transition-colors"
                        title="Move Later in Video"
                      >
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => rotatePhoto(index)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 text-[11px] font-semibold transition-colors"
                      title="Rotate 90° clockwise"
                    >
                      <ArrowPathIcon className="w-3.5 h-3.5 text-slate-600" />
                      <span>{item.rotation}°</span>
                    </button>
                  </div>

                  {/* Framing / Face Protection Selector */}
                  <div className="pt-1 border-t border-gray-100">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Framing &amp; Crop:
                    </label>
                    <div className="grid grid-cols-2 gap-1 text-[11px] font-semibold">
                      <button
                        type="button"
                        onClick={() => updatePhotoFit(index, 'smart_fit')}
                        className={`px-2 py-1.5 rounded-lg border text-center transition-all ${
                          item.fit === 'smart_fit'
                            ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold ring-1 ring-pink-500'
                            : 'border-gray-200 bg-gray-50 text-slate-600 hover:bg-gray-100'
                        }`}
                        title="Full uncropped photo with ambient background (Best for family / group shots)"
                      >
                        🛡️ Smart Fit
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePhotoFit(index, 'cover', 0.15)}
                        className={`px-2 py-1.5 rounded-lg border text-center transition-all ${
                          item.fit === 'cover'
                            ? 'border-purple-500 bg-purple-50 text-purple-700 font-bold ring-1 ring-purple-500'
                            : 'border-gray-200 bg-gray-50 text-slate-600 hover:bg-gray-100'
                        }`}
                        title="Fills vertical screen with focus on heads/faces"
                      >
                        👤 Face Focus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add More Photos Card */}
            {photos.length < 10 && (
              <label className="min-h-[220px] rounded-2xl border-2 border-dashed border-gray-300 hover:border-pink-500 hover:bg-pink-50/50 flex flex-col items-center justify-center cursor-pointer transition-colors text-slate-400 hover:text-pink-500 p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isProcessing}
                />
                <PlusIcon className="w-8 h-8 mb-2" />
                <span className="text-xs font-bold text-slate-700">Add Memory</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Upload up to 10 photos</span>
              </label>
            )}
          </div>

          {isProcessing && (
            <p className="text-xs text-pink-600 font-medium animate-pulse flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4 text-pink-500" />
              Optimizing your photos for smooth playback...
            </p>
          )}

          {photos.length === 0 && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
              <SparklesIcon className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">No personal photos yet?</p>
                <p className="mt-0.5 text-amber-700">
                  No problem! We will automatically use beautiful romantic &amp; celebration aesthetic background video themes. You can also add photos anytime.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
