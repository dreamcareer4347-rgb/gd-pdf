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
  
  // Direct Target Size state (in KB)
  const [targetKb, setTargetKb] = useState('200');

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

      let quality = 0.6;
      let scale = 1.0;

      const target = parseFloat(targetKb) || 200;
      if (target <= 150) {
        quality = 0.35;
        scale = 0.75;
      } else if (target <= 300) {
        quality = 0.5;
        scale = 0.9;
      } else if (target <= 600) {
        quality = 0.65;
        scale = 1.0;
      } else {
        quality = 0.8;
        scale = 1.0;
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
    'url': 'https://gdpdf.online/compress-pdf',
    'description': 'Free online PDF compressor tool. Reduce PDF size to 100KB, 200KB, or 500KB directly in your browser.',
    'applicationCategory': 'BusinessApplication',
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

      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs font-bold">
          <Zap className="w-3.5 h-3.5" />
          <span>Fast & 100% Free Online Tool</span>
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Compress PDF to Exact KB Size Online
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Reduce your PDF file size instantly for government application forms and job portals. Runs securely in your browser.
        </p>
      </div>

      {/* Main Upload / Compress Card */}
      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer bg-white transition-all shadow-xs hover:shadow-md group">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <span className="font-bold text-slate-900 text-base sm:text-lg text-center">Click here to upload your PDF</span>
          <span className="text-xs text-slate-500 mt-1 text-center">
            Supports multi-page documents • 100% Private & Secure
          </span>
          <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          {/* File Details */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[180px] sm:max-w-xs">{file.name}</h4>
                <p className="text-xs text-slate-500">
                  Original Size: <span className="font-bold text-slate-700">{formatFileSize(file.size)}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setFile(null); setResultBlob(null); }}
              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer"
            >
              Change File
            </button>
          </div>

          {/* Direct Target Size Input & Quick Buttons */}
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 space-y-3">
            <label className="text-xs font-extrabold text-blue-900 uppercase flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> Target File Size (KB)
            </label>

            <div className="space-y-2.5">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={targetKb}
                  onChange={(e) => setTargetKb(e.target.value)}
                  placeholder="200"
                  className="w-full bg-white border border-blue-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="text-xs font-bold text-slate-700">KB</span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {['100', '200', '300', '500', '1024'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setTargetKb(size)}
                    className={`px-3 py-1 text-xs rounded-lg border font-bold transition-all cursor-pointer ${
                      targetKb === size
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {size === '1024' ? '1 MB' : `${size} KB`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action or Download */}
          {resultBlob ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-emerald-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>PDF Compressed Successfully!</span>
              </div>
              <p className="text-xs text-emerald-800">
                Original: {formatFileSize(file.size)} → <span className="font-extrabold text-emerald-900">{formatFileSize(resultBlob.size)}</span>
              </p>
              <a
                href={URL.createObjectURL(resultBlob)}
                download={`compressed-${file.name}`}
                className="inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 mr-2" /> Download Compressed PDF
              </a>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCompress}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Compressing Pages... {progress}%</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span>Compress PDF Now</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Simple Info Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 text-slate-700 text-xs sm:text-sm">
        <h2 className="font-bold text-slate-900 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Why use this tool?</span>
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li><strong>Exact KB Target:</strong> Easily shrink PDF documents to 100KB, 200KB or 500KB instantly.</li>
          <li><strong>100% Private:</strong> Your files are processed securely inside your browser and never uploaded anywhere.</li>
        </ul>
      </section>
    </div>
  );
}