'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UserCheck, Upload, Download, CheckCircle, RefreshCw, Grid, ZoomIn, ZoomOut } from 'lucide-react';

export default function PassportPhotoMaker() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [layout, setLayout] = useState('6'); // '6' or '8' photos
  
  // Customization & Zoom/Pan states
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [processedUrl, setProcessedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);
  const imgObjRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
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

  // Live Preview Rendering on Canvas
  useEffect(() => {
    if (!image || !canvasRef.current || !imgObjRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgObjRef.current;

    const sheetWidth = 1200;
    const sheetHeight = 1800;
    canvas.width = sheetWidth;
    canvas.height = sheetHeight;

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetWidth, sheetHeight);

    const pWidth = 413;
    const pHeight = 531;
    const marginX = 120;
    const marginY = 150;
    const cols = 2;
    const rows = layout === '8' ? 4 : 3;
    const gapX = (sheetWidth - (marginX * 2) - (pWidth * cols)) / (cols - 1 || 1);
    const gapY = (sheetHeight - (marginY * 2) - (pHeight * rows)) / (rows - 1 || 1);

    let count = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (layout === '6' && count >= 6) break;
        const x = marginX + c * (pWidth + gapX);
        const y = marginY + r * (pHeight + gapY);

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, pWidth, pHeight);
        ctx.clip();

        // Draw photo with zoom and offset
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x, y, pWidth, pHeight);

        const scaledW = img.width * zoom;
        const scaledH = img.height * zoom;
        const drawX = x + (pWidth / 2) - (scaledW / 2) + offsetX;
        const drawY = y + (pHeight / 2) - (scaledH / 2) + offsetY;

        ctx.drawImage(img, drawX, drawY, scaledW, scaledH);
        ctx.restore();

        // Border around each passport photo
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, pWidth, pHeight);

        count++;
      }
    }
  }, [image, layout, zoom, offsetX, offsetY]);

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

  const generatePassportSheet = () => {
    if (!image || !canvasRef.current) return;
    setIsProcessing(true);
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setProcessedUrl(dataUrl);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Passport Photo Maker & 4x6 Sheet Generator</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Create printable 4×6 inch passport photo sheets (6 or 8 photos grid) online with live interactive crop, zoom, and drag alignment.
          </p>
        </div>
      </div>

      {!image ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload Portrait Photo</span>
          <span className="text-xs text-slate-500">Supports JPG, PNG with 100% private browser processing</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sheet Layout Customization</label>
              <select
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 focus:outline-blue-600 cursor-pointer"
                aria-label="Sheet Layout"
              >
                <option value="6">6 Photos (3×2 Grid on 4×6 Sheet)</option>
                <option value="8">8 Photos (4×2 Grid on 4×6 Sheet)</option>
              </select>
            </div>
            <div className="text-xs text-slate-500">Drag photo inside preview or use zoom controls to fix alignment.</div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="bg-slate-900 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-between w-full max-w-xs text-slate-300 text-xs font-bold">
              <span>Live Sheet Preview</span>
              <span>Zoom: {zoom.toFixed(1)}x</span>
            </div>

            <div 
              className="relative overflow-hidden border-2 border-dashed border-slate-600 rounded-xl bg-white cursor-grab active:cursor-grabbing shadow-inner flex items-center justify-center p-2"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <canvas ref={canvasRef} className="max-h-72 object-contain shadow-md" />
            </div>

            {/* Zoom Toolbar */}
            <div className="flex items-center space-x-3 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
              <button onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))} className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer" aria-label="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <input type="range" min="0.5" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-32 accent-blue-500 cursor-pointer" aria-label="Zoom Level" />
              <button onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))} className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer" aria-label="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={() => { setZoom(1); setOffsetX(0); setOffsetY(0); }} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg cursor-pointer">
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button onClick={() => { setImage(null); setProcessedUrl(''); }} className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer">
              Choose Another Photo
            </button>
            <button onClick={generatePassportSheet} disabled={isProcessing} className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs">
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Grid className="w-4 h-4" />}
              <span>{isProcessing ? 'Generating Sheet...' : 'Finalize & Download Sheet'}</span>
            </button>
          </div>

          {processedUrl && (
            <div className="mt-6 p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Custom Passport Sheet Ready!</h4>
                  <p className="text-xs text-emerald-700">Perfect 4x6 inch printable alignment with zero distortion.</p>
                </div>
              </div>
              <a href={processedUrl} download="passport-photo-sheet-custom.jpg" className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer">
                <Download className="w-4 h-4" />
                <span>Download Print Sheet</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">How to Print Passport Size Photos on a 4x6 Sheet Online?</h2>
        <p>
          Need multiple passport-size photos for job applications, passports, or visa forms? With GD PDF Suite&apos;s passport photo maker, you can easily layout 6 or 8 passport photos on a standard 4x6 inch photo paper sheet. Adjust zoom and drag position in real-time to fit official proportions, then download your high-resolution print sheet directly without uploading images to any external server.
        </p>
      </div>

    </div>
  );
}