'use client';

import React, { useState, useRef } from 'react';
import { Layers, Upload, Download, CheckCircle, RefreshCw, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function MergeImages() {
  const [images, setImages] = useState([]);
  const [direction, setDirection] = useState('vertical'); // 'vertical' or 'horizontal'
  const [processedUrl, setProcessedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [];
      let loaded = 0;

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            newImages.push({
              id: Date.now() + index + Math.random(),
              name: file.name,
              src: event.target.result,
              imgObj: img,
            });
            loaded++;
            if (loaded === files.length) {
              setImages((prev) => [...prev, ...newImages]);
              setProcessedUrl('');
            }
          };
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setProcessedUrl('');
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
    setProcessedUrl('');
  };

  const moveDown = (index) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
    setProcessedUrl('');
  };

  const mergeImagesNow = () => {
    if (images.length < 2) {
      alert('Please upload at least 2 images to merge.');
      return;
    }
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let totalWidth = 0;
    let totalHeight = 0;
    const padding = 20; // Gap between merged images

    if (direction === 'vertical') {
      // Find max width and sum of heights
      totalWidth = Math.max(...images.map((i) => i.imgObj.width));
      totalHeight = images.reduce((sum, i) => sum + i.imgObj.height, 0) + padding * (images.length - 1);
    } else {
      // Horizontal
      totalHeight = Math.max(...images.map((i) => i.imgObj.height));
      totalWidth = images.reduce((sum, i) => sum + i.imgObj.width, 0) + padding * (images.length - 1);
    }

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    // Fill white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    let currentX = 0;
    let currentY = 0;

    images.forEach((item) => {
      const img = item.imgObj;
      if (direction === 'vertical') {
        const xPos = (totalWidth - img.width) / 2; // Center align horizontally
        ctx.drawImage(img, xPos, currentY);
        currentY += img.height + padding;
      } else {
        const yPos = (totalHeight - img.height) / 2; // Center align vertically
        ctx.drawImage(img, currentX, yPos);
        currentX += img.width + padding;
      }
    });

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setProcessedUrl(dataUrl);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Merge Images Online (Combine Photos & ID Cards)</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Combine multiple photos, documents, and front/back ID cards vertically or horizontally into a single image instantly in your browser with absolute privacy.
            </p>
          </div>
        </div>

        {images.length > 0 && (
          <button
            onClick={() => { setImages([]); setProcessedUrl(''); }}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </div>

      {images.length === 0 ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload 2 or More Images</span>
          <span className="text-xs text-slate-500">Perfect for merging Front & Back ID cards or documents (100% Client-Side)</span>
          <input type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          {/* Layout Direction & Add More */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Merge Direction</label>
              <select
                value={direction}
                onChange={(e) => { setDirection(e.target.value); setProcessedUrl(''); }}
                className="bg-white border border-slate-300 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 focus:outline-blue-600 cursor-pointer"
                aria-label="Merge Direction"
              >
                <option value="vertical">Vertical (Top to Bottom)</option>
                <option value="horizontal">Horizontal (Side by Side)</option>
              </select>
            </div>

            <label className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
              + Add More Photos
              <input type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
            </label>
          </div>

          {/* Uploaded Images Order List */}
          <div className="space-y-2 max-h-64 overflow-y-auto p-1">
            {images.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">{index + 1}</span>
                  <div className="w-12 h-12 bg-white border rounded-lg overflow-hidden flex items-center justify-center p-0.5">
                    <img src={item.src} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate max-w-xs">{item.name}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1.5 bg-white hover:bg-slate-100 rounded-lg border text-slate-600 disabled:opacity-40 cursor-pointer" aria-label="Move Up">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => moveDown(index)} disabled={index === images.length - 1} className="p-1.5 bg-white hover:bg-slate-100 rounded-lg border text-slate-600 disabled:opacity-40 cursor-pointer" aria-label="Move Down">
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeImage(item.id)} className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 cursor-pointer" aria-label="Remove Image">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden">
            <canvas ref={canvasRef} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => { setImages([]); setProcessedUrl(''); }}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            >
              Clear All
            </button>

            <button
              onClick={mergeImagesNow}
              disabled={isProcessing || images.length < 2}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />}
              <span>{isProcessing ? 'Merging Images...' : 'Merge Images Now'}</span>
            </button>
          </div>

          {processedUrl && (
            <div className="mt-6 p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Images Merged Successfully!</h4>
                  <p className="text-xs text-emerald-700">Combined into a single high-quality image file.</p>
                </div>
              </div>

              <a
                href={processedUrl}
                download="merged-images.jpg"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Merged Image</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">How to Merge Multiple Photos and ID Cards Online?</h2>
        <p>
          Many application forms require uploading the front and back of an ID card (Aadhaar, PAN, Voter ID) as a single image file. With GD PDF Suite&apos;s image merger tool, you can easily upload multiple photos, arrange them in your preferred vertical or horizontal sequence, and combine them securely inside your browser without uploading anything to external servers.
        </p>
      </div>

    </div>
  );
}