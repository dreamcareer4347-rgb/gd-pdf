'use client';

import React, { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function PdfPreview({ images, settings }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];
  const { pageSize, orientation, margins } = settings || {};

  // Aspect ratio simulation
  let aspectStyle = 'aspect-[1/1.414]'; // A4 portrait default
  if (pageSize === 'letter') {
    aspectStyle = 'aspect-[1/1.29]';
  } else if (pageSize === 'fit') {
    aspectStyle = 'aspect-auto';
  } else if (orientation === 'landscape') {
    aspectStyle = 'aspect-[1.414/1]';
  }

  const marginMap = {
    none: 'p-0',
    small: 'p-2',
    normal: 'p-4',
  };
  const paddingClass = marginMap[margins] || 'p-4';

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-base sm:text-lg">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <span>Live PDF Layout Preview</span>
        </div>

        {images.length > 1 && (
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
            <span>Page {currentIndex + 1} of {images.length}</span>
            <div className="flex items-center space-x-1.5 ml-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Page"
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Page"
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Simulated Page Frame */}
      <div className="flex justify-center bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 overflow-hidden shadow-inner">
        <div
          className={`w-56 sm:w-68 bg-white shadow-lg border border-slate-300 rounded-xl flex flex-col ${aspectStyle} ${paddingClass} transition-all duration-300`}
        >
          <div className="w-full h-full bg-slate-50/80 border border-dashed border-slate-300 rounded-lg overflow-hidden flex items-center justify-center relative">
            <img
              src={currentImg.url}
              alt={`Live preview page ${currentIndex + 1} - ${currentImg.name} - GD PDF Suite`}
              style={{ transform: `rotate(${currentImg.rotation || 0}deg)` }}
              className="w-full h-full object-contain transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-1.5 text-center text-xs text-slate-500 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        <span>Simulated layout preview. Margins, sizes, and rotation are precisely applied upon export.</span>
      </div>
    </div>
  );
}