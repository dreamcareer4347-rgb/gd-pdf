'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Download, Lock, Unlock, Image as ImageIcon, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { formatFileSize } from '@/utils/imageUtils';

export default function ImageResizer() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [originalDim, setOriginalDim] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState('image/jpeg');
  
  // Target Size feature state (in KB)
  const [targetKb, setTargetKb] = useState('100');
  const [useTargetSize, setUseTargetSize] = useState(false);

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

  // Advanced compression loop to hit target KB size if enabled
  const processResize = async (imgObj, w, h, fmt) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgObj, 0, 0, w, h);

    if (useTargetSize && fmt !== 'image/png') {
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
    'url': 'https://gdpdf.com/resize-image',
    'description': 'Free online image resizer and compressor by GD PDF Suite & GD Dream Career. Resize pixel dimensions and compress photos to exact KB size (50KB, 100KB, 200KB).',
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs font-bold">
          <Zap className="w-3.5 h-3.5" />
          <span>GD PDF Suite Tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Resize & Compress Image to Exact KB Size
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Resize pixel dimensions and compress photos instantly to exact target sizes (e.g., under 50KB, 100KB, or 200KB) directly in your browser.
        </p>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-10 sm:p-14 text-center cursor-pointer bg-white shadow-xs hover:shadow-md transition-all group"
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
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">Select Image to Resize & Compress</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">Supports JPG, PNG, WebP. 100% secure client-side browser processing.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm animate-fade-in">
          {/* Options Panel */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base">Resize Settings</h3>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (originalUrl) URL.revokeObjectURL(originalUrl);
                  if (resizedUrl) URL.revokeObjectURL(resizedUrl);
                }}
                className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                Change Image
              </button>
            </div>

            {/* Target Size Compression Mode */}
            <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-blue-900 uppercase flex items-center">
                  <Zap className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> Compress to Target Size
                </label>
                <input
                  type="checkbox"
                  checked={useTargetSize}
                  onChange={(e) => {
                    setUseTargetSize(e.target.checked);
                    setTimeout(triggerResize, 50);
                  }}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {useTargetSize && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs text-slate-600 font-semibold">Desired Size (KB):</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={targetKb}
                      onChange={(e) => setTargetKb(e.target.value)}
                      className="w-full bg-white border border-blue-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="100"
                    />
                    <span className="text-xs font-bold text-slate-700">KB</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['50', '100', '200', '500'].map((kb) => (
                      <button
                        key={kb}
                        type="button"
                        onClick={() => { setTargetKb(kb); triggerResize(); }}
                        className={`px-2.5 py-1 text-xs rounded-lg border font-bold transition-all cursor-pointer ${
                          targetKb === kb ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {kb} KB
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Dimensions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-700 uppercase">Dimensions (Pixels)</label>
                <button
                  type="button"
                  onClick={() => setLockAspect(!lockAspect)}
                  className="flex items-center space-x-1 text-xs text-blue-600 font-bold hover:text-blue-700 cursor-pointer"
                >
                  {lockAspect ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>{lockAspect ? 'Locked Ratio' : 'Unlocked'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-slate-500 font-semibold mb-1 block">Width (px)</span>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold mb-1 block">Height (px)</span>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
            >
              Apply Changes & Preview
            </button>
          </div>

          {/* Preview & Download Panel */}
          <div className="flex flex-col items-center justify-between space-y-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
            <div className="text-center w-full">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2">Live Preview</span>
              <div className="h-56 overflow-hidden rounded-xl border border-slate-300 bg-white flex items-center justify-center p-2 shadow-inner">
                {resizedUrl ? (
                  <img src={resizedUrl} alt={`Resized preview of ${file.name} - GD PDF Suite`} className="max-h-52 max-w-full object-contain" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-slate-300" />
                )}
              </div>
            </div>

            {resizedUrl && (
              <div className="w-full text-center space-y-3 pt-2">
                <div className="text-xs text-slate-600 space-y-1 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <p>Original Size: <span className="font-bold text-slate-800">{formatFileSize(file.size)}</span></p>
                  <p className="font-extrabold text-emerald-600 text-sm">
                    New Size: {formatFileSize(resizedSize)} ({width} × {height} px)
                  </p>
                </div>

                <a
                  href={resizedUrl}
                  download={`resized-${width}x${height}-${file.name}`}
                  className="w-full inline-flex items-center justify-center py-4 rounded-xl bg-emerald-600 text-white font-bold text-base shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5 mr-2" /> Download Resized Image
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEO Info Content Footer */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3 text-slate-700 text-xs sm:text-sm">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Why Use GD Image Resizer?</span>
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
          <li><strong>Exact KB Compression:</strong> Resize and compress photos to fit stringent online job applications and government form guidelines.</li>
          <li><strong>100% Private & Secure:</strong> All image resizing takes place locally in your browser. Files never leave your device.</li>
          <li><strong>Powered by GD Dream Career:</strong> Built for high performance and lightning-fast speed across mobile and desktop devices.</li>
        </ul>
      </section>
    </div>
  );
}