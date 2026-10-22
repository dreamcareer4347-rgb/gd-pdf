'use client';

import React from 'react';
import ImageCard from './ImageCard';
import { Trash2, Plus, Images, Layers } from 'lucide-react';
import { formatFileSize } from '@/utils/imageUtils';

export default function ImageList({
  images,
  onRemove,
  onClearAll,
  onRotate,
  onMoveUp,
  onMoveDown,
  onAddMoreClick
}) {
  if (!images || images.length === 0) return null;

  // Calculate total combined file size of selected images
  const totalSizeBytes = images.reduce((acc, curr) => acc + (curr.size || 0), 0);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 sm:px-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Images className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <span>Selected Images</span>
              <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full">
                {images.length}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Total Size: <span className="font-bold text-slate-700">{formatFileSize(totalSizeBytes)}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons for Mobile & Desktop */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={onAddMoreClick}
            className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 active:scale-95 px-3.5 py-2 rounded-xl transition-all cursor-pointer border border-blue-100"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add More
          </button>
          
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 active:scale-95 px-3.5 py-2 rounded-xl transition-all cursor-pointer border border-red-100"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Clear All
          </button>
        </div>
      </div>

      {/* Image Cards Queue */}
      <div className="space-y-3">
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            index={index}
            total={images.length}
            onRemove={onRemove}
            onRotate={onRotate}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
          />
        ))}
      </div>
    </div>
  );
}