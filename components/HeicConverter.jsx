'use client';

import React, { useState } from 'react';
import { Upload, Download, Smartphone, CheckCircle, RefreshCw } from 'lucide-react';

export default function HeicConverter() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [outputFormat, setOutputFormat] = useState('image/jpeg');
  const [processedUrl, setProcessedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setProcessedUrl('');
        setSuccess(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
    if (!image) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // White background for JPEG format
      if (outputFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(outputFormat, 0.92);
      setProcessedUrl(dataUrl);
      setIsProcessing(false);
      setSuccess(true);
    };
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <Smartphone className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">iPhone Photo Converter (HEIC / HEIF to JPG)</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Convert iPhone HEIC and HEIF photos to standard JPG or PNG format instantly in your browser with 100% privacy and zero server uploads.
          </p>
        </div>
      </div>

      {!image ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload iPhone Photo / HEIC File</span>
          <span className="text-xs text-slate-500">100% Private & Client-side browser processing</span>
          <input type="file" accept="image/*,.heic,.heif" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Output Format</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setOutputFormat('image/jpeg')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  outputFormat === 'image/jpeg' 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                JPG / JPEG (Best for Forms)
              </button>
              <button
                onClick={() => setOutputFormat('image/png')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  outputFormat === 'image/png' 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                PNG (Lossless Quality)
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => { setImage(null); setProcessedUrl(''); setSuccess(false); }}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            >
              Choose Another Photo
            </button>

            <button
              onClick={convertImage}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Smartphone className="w-4 h-4" />}
              <span>{isProcessing ? 'Converting...' : 'Convert to ' + (outputFormat.includes('jpeg') ? 'JPG' : 'PNG')}</span>
            </button>
          </div>

          {/* Result Section */}
          {processedUrl && (
            <div className="mt-6 p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Conversion Successful!</h4>
                  <p className="text-xs text-emerald-700">File ready to download in {outputFormat.includes('jpeg') ? 'JPG' : 'PNG'} format.</p>
                </div>
              </div>

              <a
                href={processedUrl}
                download={`${fileName.substring(0, fileName.lastIndexOf('.')) || 'iphone-photo'}.${outputFormat.includes('jpeg') ? 'jpg' : 'png'}`}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Converted Image</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">How to Convert iPhone HEIC Photos to JPG Online?</h2>
        <p>
          Apple iOS devices capture photos in HEIC format by default to save storage, but most government exam portals, college admission forms, and document uploads only accept standard JPG or PNG files. With GD PDF Suite&apos;s HEIC converter, you can effortlessly transform your iPhone pictures into universally accepted JPG/PNG images right inside your web browser without installing any third-party apps.
        </p>
      </div>

    </div>
  );
}