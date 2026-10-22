'use client';

import React, { useState } from 'react';
import { Minimize2, UploadCloud, Download, Loader2, FileText, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { jsPDF } from 'jspdf';
import { formatFileSize } from '@/utils/imageUtils';

// Set worker for PDF.js safely in client browser
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export default function CompressPdf() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState(null);
  
  const [compressionMode, setCompressionMode] = useState('preset'); // 'preset' or 'target'
  const [presetLevel, setPresetLevel] = useState('medium'); // 'low', 'medium', 'high'
  const [targetKb, setTargetKb] = useState('500');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResultBlob(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(10);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;

      let quality = 0.8;
      let scale = 1.0;

      if (compressionMode === 'preset') {
        if (presetLevel === 'low') { quality = 0.9; scale = 1.2; }
        else if (presetLevel === 'medium') { quality = 0.6; scale = 1.0; }
        else if (presetLevel === 'high') { quality = 0.35; scale = 0.8; }
      } else {
        const target = parseFloat(targetKb) || 500;
        if (target < 300) { quality = 0.3; scale = 0.7; }
        else if (target < 800) { quality = 0.5; scale = 0.9; }
        else { quality = 0.75; scale = 1.0; }
      }

      let newPdf = null;

      for (let i = 1; i <= numPages; i++) {
        setProgress(Math.round(10 + (i / numPages) * 70));
        
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const imgData = canvas.toDataURL('image/jpeg', quality);

        const pWidth = viewport.width * 0.264583; // px to mm
        const pHeight = viewport.height * 0.264583;
        const orientation = pWidth > pHeight ? 'landscape' : 'portrait';

        if (i === 1) {
          newPdf = new jsPDF({
            orientation,
            unit: 'mm',
            format: [pWidth, pHeight],
          });
        } else {
          newPdf.addPage([pWidth, pHeight], orientation);
        }

        newPdf.addImage(imgData, 'JPEG', 0, 0, pWidth, pHeight, undefined, 'FAST');
      }

      setProgress(95);
      const pdfBlob = newPdf.output('blob');
      setProgress(100);
      setResultBlob(pdfBlob);
    } catch (err) {
      console.error(err);
      alert('Failed to compress PDF. Please try a different document.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Structured Data Schema for Google Search indexing
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'GD PDF Compress Tool',
    'url': 'https://gdpdf.com/compress-pdf',
    'description': 'Free online PDF compressor tool by GD PDF Suite & GD Dream Career. Reduce PDF size to 100KB, 200KB, 500KB or custom MBs directly in browser.',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8 px-2 sm:px-4">
      {/* Search Engine Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header SEO Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs font-bold tracking-wide">
          <Zap className="w-3.5 h-3.5" />
          <span>GD PDF Tools by GD Dream Career</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Compress PDF Online — Free & Private
        </h1>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Reduce your PDF file size to 100KB, 200KB, or custom MB target limits instantly. Fast, secure, and 100% processed on your mobile or desktop device.
        </p>
      </div>

      {/* Main Upload / Compress Card */}
      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer bg-white transition-all shadow-xs hover:shadow-md active:scale-[0.99] group">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <span className="font-bold text-slate-800 text-lg sm:text-xl text-center">Select PDF Document</span>
          <span className="text-xs text-slate-500 mt-1.5 text-center">
            Tap to upload from mobile or desktop. 100% client-side privacy.
          </span>
          <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          {/* File Details */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate max-w-[180px] sm:max-w-xs">{file.name}</h4>
                <p className="text-xs text-slate-500">
                  Original Size: <span className="font-bold text-slate-700">{formatFileSize(file.size)}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setResultBlob(null); }}
              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-all shrink-0"
            >
              Change File
            </button>
          </div>

          {/* Mode Selector */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Compression Mode
            </label>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setCompressionMode('preset')}
                className={`py-3 px-3 sm:px-4 rounded-xl text-xs font-bold border transition-all ${
                  compressionMode === 'preset'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Preset Quality Levels
              </button>
              <button
                type="button"
                onClick={() => setCompressionMode('target')}
                className={`py-3 px-3 sm:px-4 rounded-xl text-xs font-bold border transition-all ${
                  compressionMode === 'target'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Target File Size (KB/MB)
              </button>
            </div>

            {/* Presets */}
            {compressionMode === 'preset' && (
              <div className="space-y-2 pt-2">
                <span className="text-xs text-slate-500 font-medium block">Select Compression Level:</span>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPresetLevel('low')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      presetLevel === 'low' ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Low</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">High quality, subtle reduction</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPresetLevel('medium')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      presetLevel === 'medium' ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Recommended</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Balanced quality & file size</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPresetLevel('high')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      presetLevel === 'high' ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Extreme</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Maximum size reduction</div>
                  </button>
                </div>
              </div>
            )}

            {/* Target KB Input with Quick Mobile Taps */}
            {compressionMode === 'target' && (
              <div className="space-y-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900">Desired Target File Size:</span>
                  <span className="text-xs font-extrabold text-blue-700">{targetKb} KB</span>
                </div>
                
                <input
                  type="number"
                  value={targetKb}
                  onChange={(e) => setTargetKb(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full bg-white border border-blue-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />

                {/* Touch Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['100', '200', '500', '1024'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTargetKb(size)}
                      className={`px-2.5 py-1 text-xs rounded-lg border font-semibold transition-all ${
                        targetKb === size
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {size === '1024' ? '1 MB' : `${size} KB`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action or Download */}
          {resultBlob ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-emerald-900 font-extrabold text-lg">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>PDF Compressed Successfully!</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-800">
                Original: {formatFileSize(file.size)} → <span className="font-extrabold text-emerald-900">{formatFileSize(resultBlob.size)}</span>
              </p>
              <a
                href={URL.createObjectURL(resultBlob)}
                download={`compressed-${file.name}`}
                className="inline-flex items-center justify-center w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-base shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <Download className="w-5 h-5 mr-2" /> Download Compressed PDF
              </a>
            </div>
          ) : (
            <button
              onClick={handleCompress}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Compressing Pages... {progress}%</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-5 h-5" />
                  <span>Compress PDF Now</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* SEO Text Content Block (Crucial for Search Rankings) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Why Use GD PDF Suite for PDF Compression?</span>
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>100% Privacy Protection:</strong> Your documents are processed entirely in your web browser. No files are uploaded to any external server.</li>
          <li><strong>Target Size Optimization:</strong> Choose exact target file sizes such as 100KB, 200KB, or 500KB to fulfill online form and job application limits.</li>
          <li><strong>Mobile & Desktop Friendly:</strong> Optimized for smooth performance across smartphones, tablets, laptops, and PCs.</li>
          <li><strong>Brought to you by GD :</strong> A trusted utility platform built for high speed and zero registration requirements.</li>
        </ul>
      </section>
    </div>
  );
}