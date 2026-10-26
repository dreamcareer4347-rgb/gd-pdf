'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Download, Trash2, CheckCircle, RefreshCw } from 'lucide-react';

export default function GenerateSignature() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#000000'); // Default Black
  const [penWidth, setPenWidth] = useState(3);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Fill white background initially
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [penColor, penWidth]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    setIsDrawing(true);
    setHasDrawn(true);
    setProcessedUrl('');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setProcessedUrl('');
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setProcessedUrl(dataUrl);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <PenTool className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Generate Digital Signature Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Draw your signature digitally using mouse or touchscreen. Create clean, high-resolution signature image files for government exams, SSC, UPSC, and online job applications.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center space-x-4">
            {/* Color Selector */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Pen Ink Color</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPenColor('#000000')}
                  className={`w-7 h-7 rounded-full bg-black border-2 transition-transform cursor-pointer ${penColor === '#000000' ? 'scale-110 border-blue-600' : 'border-transparent'}`}
                  title="Black Ink"
                  aria-label="Black Ink"
                />
                <button
                  onClick={() => setPenColor('#003399')}
                  className={`w-7 h-7 rounded-full bg-blue-800 border-2 transition-transform cursor-pointer ${penColor === '#003399' ? 'scale-110 border-blue-400' : 'border-transparent'}`}
                  title="Blue Ink"
                  aria-label="Blue Ink"
                />
              </div>
            </div>

            {/* Thickness Selector */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Thickness</label>
              <select
                value={penWidth}
                onChange={(e) => setPenWidth(Number(e.target.value))}
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-blue-600 cursor-pointer"
                aria-label="Pen Thickness"
              >
                <option value={2}>Thin (2px)</option>
                <option value={3}>Medium (3px)</option>
                <option value={5}>Thick (5px)</option>
              </select>
            </div>
          </div>

          <button
            onClick={clearCanvas}
            className="flex items-center space-x-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Pad</span>
          </button>
        </div>

        {/* Signature Drawing Canvas Area */}
        <div className="bg-slate-900 p-6 rounded-2xl flex flex-col items-center justify-center space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Sign Inside the Box Below</span>
          <div className="bg-white border-2 border-dashed border-slate-600 rounded-2xl overflow-hidden shadow-inner cursor-crosshair w-full">
            <canvas
              ref={canvasRef}
              width={600}
              height={220}
              className="w-full max-w-full touch-none bg-white"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <span className="text-[11px] text-slate-400">Use your mouse (desktop) or finger/stylus (mobile) to draw your signature.</span>
        </div>

        <div className="flex justify-end">
          <button
            onClick={saveSignature}
            disabled={!hasDrawn}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs disabled:opacity-50"
          >
            <PenTool className="w-4 h-4" />
            <span>Generate Signature Image</span>
          </button>
        </div>

        {processedUrl && (
          <div className="p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-emerald-900">Digital Signature Generated!</h4>
                <p className="text-xs text-emerald-700">Ready to download and upload directly to your exam application form.</p>
              </div>
            </div>

            <a
              href={processedUrl}
              download="digital-signature.jpg"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Signature JPG</span>
            </a>
          </div>
        )}
      </div>

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">How to Create and Download Digital Signature for Govt Exams?</h2>
        <p>
          Government job and exam portals like SSC, UPSC, and banking require candidates to upload a clear digital signature in JPG format. With GD PDF Suite&apos;s digital signature generator, you can easily draw your signature with precise ink color (black or blue) and adjustable thickness, then download it instantly with a clean white background.
        </p>
      </div>

    </div>
  );
}