'use client';

import React from 'react';
import { Trash2, RotateCw, ArrowUp, ArrowDown } from 'lucide-react';
import { formatFileSize } from '@/utils/imageUtils';

export default function ImageCard({
  image,
  index,
  total,
  onRemove,
  onRotate,
  onMoveUp,
  onMoveDown
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4">
      {/* Index Badge & Thumbnail */}
      <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-xl bg-blue-50 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0 border border-blue-100">
            {index + 1}
          </span>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
            <img
              src={image.url}
              alt={`Page ${index + 1} - ${image.name} - GD PDF Converter`}
              style={{ transform: `rotate(${image.rotation}deg)` }}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>
        </div>

        {/* Mobile File Info (Visible on small screens beside thumbnail) */}
        <div className="sm:hidden flex-1 min-w-0 ml-2">
          <h4 className="text-xs font-bold text-slate-900 truncate" title={image.name}>
            {image.name}
          </h4>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            {formatFileSize(image.size)}
          </p>
        </div>
      </div>

      {/* Desktop File Info */}
      <div className="hidden sm:block flex-1 min-w-0 text-left">
        <h4 className="text-sm font-bold text-slate-900 truncate" title={image.name}>
          {image.name}
        </h4>
        <div className="flex items-center space-x-3 mt-1 text-xs text-slate-500 font-medium">
          <span>{formatFileSize(image.size)}</span>
          <span>•</span>
          <span>
            {image.rotation === 90 || image.rotation === 270
              ? `${image.height} × ${image.width} px`
              : `${image.width} × ${image.height} px`}
          </span>
        </div>
      </div>

      {/* Actions Toolbar (Touch-friendly buttons for mobile thumbs) */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0 space-x-1 sm:space-x-1.5">
        <div className="flex items-center space-x-1">
          {/* Reorder Up */}
          <button
            type="button"
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            title="Move Page Up"
            aria-label="Move Page Up"
            className="p-2.5 sm:p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

          {/* Reorder Down */}
          <button
            type="button"
            onClick={() => onMoveDown(index)}
            disabled={index === total - 1}
            title="Move Page Down"
            aria-label="Move Page Down"
            className="p-2.5 sm:p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ArrowDown className="w-4 h-4" />
          </button>

          {/* Rotate */}
          <button
            type="button"
            onClick={() => onRotate(image.id)}
            title="Rotate 90°"
            aria-label="Rotate Image 90 Degrees"
            className="p-2.5 sm:p-2 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Delete */}
        <button
          type="button"
          onClick={() => onRemove(image.id)}
          title="Remove Image"
          aria-label="Remove Image"
          className="p-2.5 sm:p-2 rounded-xl text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}