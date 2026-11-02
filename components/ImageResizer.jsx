'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Download, Lock, Unlock, Image as ImageIcon, Zap, ShieldCheck } from 'lucide-react';
import { formatFileSize } from '@/utils/imageUtils';

export default function ImageResizer() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [originalDim, setOriginalDim] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState('image/jpeg');
  
  // Target Size feature state (in KB) - Always direct and active
  const [targetKb, setTargetKb] = useState('100');

  const [resizedUrl, setResizedUrl] = useState(null);
  const [resizedSize, setResizedSize] = useState(0);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setOriginalUrl(url);

      const img = new Image();
      img.onload = () => {
        setOriginalDim({ width: img.naturalWidth, height: img.naturalHeight });
        setWidth(img.naturalWidth.toString());
        setHeight(img.naturalHeight.toString());
        processResize(img, img.naturalWidth, img.naturalHeight, format);
      };
      img.src = url;
    }
  };

  const handleWidthChange = (val) => {
    setWidth(val);
    const newW = parseInt(val) || 0;
    if (lockAspect && originalDim.width > 0 && newW > 0) {
      const newH = Math.round((newW * originalDim.height) / originalDim.width);
      setHeight(newH.toString());
    }
  };

  const handleHeightChange = (val) => {
    setHeight(val);
    const newH = parseInt(val) || 0;
    if (lockAspect && originalDim.height > 0 && newH > 0) {
      const newW = Math.round((newH * originalDim.width) / originalDim.height);
      setWidth(newW.toString());
    }
  };

  // Advanced compression loop to hit target KB size directly
  const processResize = async (imgObj, w, h, fmt) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgObj, 0, 0, w, h);

    if (targetKb && fmt !== 'image/png') {
      let low = 0.05;
      let high = 1.0;
      let bestBlob = null;
      let targetBytes = parseFloat(targetKb) * 1024;

      // Binary search for optimal quality to match target size
      for (let i = 0; i < 6; i++) {
        let mid = (low + high) / 2;
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, fmt, mid));
        if (!blob) break;
        bestBlob = blob;
        if (blob.size > targetBytes) {
          high = mid;
        } else {
          low = mid;
        }
      }

      if (bestBlob) {
        if (resizedUrl) URL.revokeObjectURL(resizedUrl);
        setResizedUrl(URL.createObjectURL(bestBlob));
        setResizedSize(bestBlob.size);
      }
    } else {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (resizedUrl) URL.revokeObjectURL(resizedUrl);
            setResizedUrl(URL.createObjectURL(blob));
            setResizedSize(blob.size);
          }
        },
        fmt,
        0.9
      );
    }
  };

  const triggerResize = (w = width, h = height, fmt = format) => {
    if (!originalUrl) return;
    const img = new Image();
    img.onload = () => {
      processResize(img, parseInt(w) || 100, parseInt(h) || 100, fmt);
    };
    img.src = originalUrl;
  };

  const handleApply = () => {
    triggerResize();
  };

  // Search Engine Structured Data Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'GD Image Resizer & Target Compressor',
    'url': 'https://gdpdf.online/resize-image',
    'description': 'Free online image resizer and compressor. Resize dimensions and compress photos to exact KB size (20KB, 50KB, 100KB, 200KB).',
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'INR'
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs font-bold">
          <Zap className="w-3.5 h-3.5" />
          <span>Fast & 100% Free Online Tool</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Resize Image & Compress to Exact KB Size
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Easily resize photo dimensions (Width & Height) or compress file size to exact KB limits for government exam forms.
        </p>
      </div>

      {/* Upload Box or Editor */}
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-8 sm:p-12 text-center cursor-pointer bg-white shadow-xs hover:shadow-md transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Click here to upload your photo</h3>
          <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WebP • 100% Secure & Private</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
          
          {/* Left Panel: Settings */}
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Resize Options</h3>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (originalUrl) URL.revokeObjectURL(originalUrl);
                  if (resizedUrl) URL.revokeObjectURL(resizedUrl);
                }}
                className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                Choose Another Photo
              </button>
            </div>

            {/* Target Size (KB) Section - Direct & Visible */}
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 space-y-3">
              <label className="text-xs font-extrabold text-blue-900 uppercase flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> Target File Size (KB)
              </label>

              <div className="space-y-2.5">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={targetKb}
                    onChange={(e) => {
                      setTargetKb(e.target.value);
                      setTimeout(triggerResize, 50);
                    }}
                    className="w-full bg-white border border-blue-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="100"
                  />
                  <span className="text-xs font-bold text-slate-700">KB</span>
                </div>
                
                {/* Quick Preset Buttons */}
                <div className="flex flex-wrap gap-1.5">
                  {['20', '50', '100', '200', '500'].map((kb) => (
                    <button
                      key={kb}
                      type="button"
                      onClick={() => { setTargetKb(kb); triggerResize(); }}
                      className={`px-3 py-1 text-xs rounded-lg border font-bold transition-all cursor-pointer ${
                        targetKb === kb ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {kb} KB
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pixel Dimensions Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase">Dimensions (Pixels)</label>
                <button
                  type="button"
                  onClick={() => setLockAspect(!lockAspect)}
                  className="flex items-center space-x-1 text-xs text-blue-600 font-bold hover:text-blue-700 cursor-pointer"
                >
                  {lockAspect ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>{lockAspect ? 'Aspect Ratio Locked' : 'Unlocked'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-slate-500 font-semibold mb-1 block">Width (px)</span>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold mb-1 block">Height (px)</span>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 font-semibold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
            >
              Apply Changes
            </button>
          </div>

          {/* Right Panel: Preview & Download */}
          <div className="flex flex-col items-center justify-between space-y-4 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
            <div className="text-center w-full">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Live Preview</span>
              <div className="h-48 overflow-hidden rounded-xl border border-slate-300 bg-white flex items-center justify-center p-2 shadow-inner">
                {resizedUrl ? (
                  <img src={resizedUrl} alt={`Resized preview of ${file.name}`} className="max-h-44 max-w-full object-contain" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-slate-300" />
                )}
              </div>
            </div>

            {resizedUrl && (
              <div className="w-full text-center space-y-3">
                <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                  <p>Original Size: <span className="font-bold text-slate-800">{formatFileSize(file.size)}</span></p>
                  <p className="font-bold text-emerald-600 text-sm">
                    New Size: {formatFileSize(resizedSize)} ({width} × {height} px)
                  </p>
                </div>

                <a
                  href={resizedUrl}
                  download={`resized-${width}x${height}-${file.name}`}
                  className="w-full inline-flex items-center justify-center py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 mr-2" /> Download Resized Image
                </a>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Simple Info Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 text-slate-700 text-xs sm:text-sm">
        <h2 className="font-bold text-slate-900 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Why use this tool?</span>
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li><strong>Exact KB Size:</strong> Easily shrink photos to 20KB, 50KB or 100KB for exam portals instantly.</li>
          <li><strong>100% Safe:</strong> Your photos are processed instantly in your browser and never uploaded anywhere.</li>
        </ul>
      </section>
    </div>
  );
}