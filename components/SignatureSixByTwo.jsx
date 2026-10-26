'use client';

import React, { useState, useRef } from 'react';
import { Ruler, Upload, Download, CheckCircle, RefreshCw } from 'lucide-react';

export default function SignatureSixByTwo() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [processedUrl, setProcessedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  // Standard 6x2 cm at ~150 DPI = approx 354 x 118 pixels
  const targetWidth = 354;
  const targetHeight = 118;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setProcessedUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

  const processSignature = () => {
    if (!image) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      // Pure white background for official standard
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      // Draw and fit signature
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
      setProcessedUrl(dataUrl);
      setIsProcessing(false);
    };
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <Ruler className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Signature 6×2 cm Resizer Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Format your signature image to official recruitment and exam form standards (Exact 6cm × 2cm specification) securely inside your browser with zero server uploads.
          </p>
        </div>
      </div>

      {!image ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload Signature Photo</span>
          <span className="text-xs text-slate-500">Auto-crops & formats to 6×2 cm ratio (100% Client-Side Privacy)</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Original Preview ({fileName})</div>
            <div className="relative w-64 h-32 bg-white border border-slate-300 rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-inner">
              <img src={image} alt="Preview" className="max-h-full max-w-full object-contain" />
            </div>
          </div>

          <div className="hidden">
            <canvas ref={canvasRef} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => { setImage(null); setProcessedUrl(''); }}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            >
              Choose Another File
            </button>

            <button
              onClick={processSignature}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Ruler className="w-4 h-4" />}
              <span>{isProcessing ? 'Formatting...' : 'Convert to 6×2 cm'}</span>
            </button>
          </div>

          {processedUrl && (
            <div className="mt-6 p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Signature Formatted Successfully!</h4>
                  <p className="text-xs text-emerald-700">Strictly adheres to 6cm × 2cm official application standards.</p>
                </div>
              </div>

              <a
                href={processedUrl}
                download="signature-6x2cm.jpg"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download 6x2 cm Signature</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">How to Resize Signature to 6x2 cm for Government Job Forms?</h2>
        <p>
          Many government recruitment examinations, banking exams, and online application portals require candidates to upload their scanned signature resized precisely to 6 cm width by 2 cm height dimensions. With GD PDF Suite&apos;s 6x2 cm signature resizer, you can automatically format your signature to the exact required proportions and resolution instantly inside your browser.
        </p>
      </div>

    </div>
  );
}