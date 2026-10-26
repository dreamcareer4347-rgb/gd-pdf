'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Sliders, CheckCircle, RefreshCw, ZoomIn, ZoomOut, Move } from 'lucide-react';

export default function CustomExamResizer() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  
  // Custom Controls
  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(350);
  const [maxKb, setMaxKb] = useState(50);
  
  // Zoom & Pan States
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [processedUrl, setProcessedUrl] = useState('');
  const [processedKb, setProcessedKb] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const canvasRef = useRef(null);
  const imgObjRef = useRef(null);

  const quickPresets = [
    { name: 'SSC Photo (100x120)', w: 100, h: 120, kb: 50 },
    { name: 'SSC Signature (140x60)', w: 140, h: 60, kb: 20 },
    { name: 'UPSC Photo (350x350)', w: 350, h: 350, kb: 300 },
    { name: 'NEET Postcard (400x600)', w: 400, h: 600, kb: 200 },
    { name: 'IBPS Photo (200x230)', w: 200, h: 230, kb: 50 },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(1));
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          imgObjRef.current = img;
          setImage(event.target.result);
          setZoom(1);
          setOffsetX(0);
          setOffsetY(0);
          setProcessedUrl('');
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPreset = (p) => {
    setWidth(p.w);
    setHeight(p.h);
    setMaxKb(p.kb);
  };

  // Live Canvas Preview Rendering with Zoom & Pan
  useEffect(() => {
    if (!image || !canvasRef.current || !imgObjRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgObjRef.current;

    canvas.width = Number(width);
    canvas.height = Number(height);

    // Clear and fill white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Apply pan and zoom transforms centered
    ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
    ctx.scale(zoom, zoom);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  }, [image, width, height, zoom, offsetX, offsetY]);

  // Mouse / Touch Drag Handlers for Panning
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Process & Export Image
  const processCustomImage = () => {
    if (!image || !canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    let currentQuality = 0.90;
    let dataUrl = canvas.toDataURL('image/jpeg', currentQuality);

    let base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
    let kbSize = (base64Length * 3) / 4 / 1024;

    while (kbSize > maxKb && currentQuality > 0.1) {
      currentQuality -= 0.05;
      dataUrl = canvas.toDataURL('image/jpeg', currentQuality);
      base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
      kbSize = (base64Length * 3) / 4 / 1024;
    }

    setProcessedUrl(dataUrl);
    setProcessedKb(kbSize.toFixed(1));
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <Sliders className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Custom Govt Exam Resizer with Zoom & Pan</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Official photo and signature resizer for SSC, NEET, UPSC, and IBPS exams. Full user control: adjust exact dimensions in pixels, zoom in/out, drag photo, and compress to target KB size instantly.
          </p>
        </div>
      </div>

      {!image ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload Photo or Signature</span>
          <span className="text-xs text-slate-500">Supports JPG, PNG, WebP (100% Secure Client-Side Processing)</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          {/* Quick Presets Bar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Quick Official Presets</label>
            <div className="flex flex-wrap gap-2">
              {quickPresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(p)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Max Target Size (KB)</label>
              <input
                type="number"
                value={maxKb}
                onChange={(e) => setMaxKb(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-blue-600"
              />
            </div>
          </div>

          {/* Interactive Zoom & Pan Workspace */}
          <div className="bg-slate-900 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-between w-full max-w-xs text-slate-300 text-xs font-bold">
              <span>Adjust & Position Photo</span>
              <span>Zoom: {zoom.toFixed(1)}x</span>
            </div>

            {/* Canvas Preview Area */}
            <div 
              className="relative overflow-hidden border-2 border-dashed border-slate-600 rounded-xl bg-white cursor-grab active:cursor-grabbing shadow-inner flex items-center justify-center p-2"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <canvas ref={canvasRef} className="max-h-64 object-contain shadow-md" />
            </div>

            {/* Zoom Controls Toolbar */}
            <div className="flex items-center space-x-3 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
              <button
                onClick={() => setZoom((prev) => Math.max(0.2, prev - 0.1))}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all cursor-pointer"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-32 accent-blue-500 cursor-pointer"
                aria-label="Zoom Level"
              />
              <button
                onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all cursor-pointer"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setZoom(1); setOffsetX(0); setOffsetY(0); }}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => { setImage(null); setProcessedUrl(''); }}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            >
              Choose Another Image
            </button>

            <button
              onClick={processCustomImage}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sliders className="w-4 h-4" />}
              <span>{isProcessing ? 'Processing...' : 'Resize & Crop Now'}</span>
            </button>
          </div>

          {processedUrl && (
            <div className="mt-6 p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Custom Resizing & Cropping Successful!</h4>
                  <p className="text-xs text-emerald-700">Final Output: {width}×{height}px • Approx Size: {processedKb} KB</p>
                </div>
              </div>

              <a
                href={processedUrl}
                download={`custom-exam-photo-${width}x{height}.jpg`}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Formatted File</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">How to Resize Photos and Signatures for Govt Exams?</h2>
        <p>
          Aspirants appearing for SSC CGL, CHSL, NEET, UPSC, and IBPS exams often face form rejection due to incorrect pixel dimensions or file sizes exceeding the official limit. With GD PDF Suite&apos;s custom exam resizer, you can easily set exact pixel dimensions, zoom and pan your image, and compress it to the exact required KB limit directly in your browser with absolute security and zero server uploads.
        </p>
      </div>

    </div>
  );
}