'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle, ShieldCheck, Zap } from 'lucide-react';
import { validateImageFile } from '@/utils/fileValidation';
import { loadImage } from '@/utils/imageUtils';

export default function UploadArea({ onImagesAdded }) {
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = async (fileList) => {
    setErrorMsg(null);
    setLoading(true);

    const newImages = [];
    let errorMessage = null;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const validation = validateImageFile(file);

      if (!validation.isValid) {
        errorMessage = validation.error;
        continue;
      }

      try {
        const loadedImg = await loadImage(file);
        newImages.push(loadedImg);
      } catch (err) {
        errorMessage = `Failed to load ${file.name}`;
      }
    }

    setLoading(false);

    if (errorMessage) {
      setErrorMsg(errorMessage);
    }

    if (newImages.length > 0) {
      onImagesAdded(newImages);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
      e.target.value = ''; // Reset input safely
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all bg-white shadow-xs hover:shadow-md ${
          dragOver ? 'border-blue-500 bg-blue-50/60 scale-[1.01]' : 'border-slate-300 hover:border-blue-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleChange}
        />

        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
          {loading ? 'Processing images securely...' : 'Drag & drop pictures here'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
          Supports JPG, PNG, and WebP batch selection. Files never leave your device (100% client-side privacy).
        </p>

        <button
          type="button"
          className="inline-flex items-center px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
        >
          <ImageIcon className="w-5 h-5 mr-2" />
          Select Images from Device
        </button>

        {errorMsg && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3 text-red-700 text-xs sm:text-sm max-w-lg mx-auto text-left shadow-2xs">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Trust & Privacy Quick Badge */}
      <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 font-medium py-1">
        <span className="flex items-center space-x-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Secure & Private</span>
        </span>
        <span>•</span>
        <span className="flex items-center space-x-1">
          <Zap className="w-4 h-4 text-blue-600" />
          <span>Lightning Fast Client Processing</span>
        </span>
      </div>
    </div>
  );
}