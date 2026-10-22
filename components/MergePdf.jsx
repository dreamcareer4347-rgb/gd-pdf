'use client';

import React, { useState } from 'react';
import { Layers, UploadCloud, Download, Loader2, Trash2, Zap, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import { mergePdfs } from '@/utils/pdfToolkit';
import { formatFileSize } from '@/utils/imageUtils';

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
      setFiles(prev => [...prev, ...newFiles]);
      setResultBlob(null);
    }
  };

  const handleRemove = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    setProgress(0);
    try {
      const blob = await mergePdfs(files, (p) => setProgress(p));
      setResultBlob(blob);
    } catch (err) {
      console.error(err);
      alert('Failed to merge PDFs. Ensure files are valid and not password-protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Search Engine Structured Data Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'GD PDF Merge Tool',
    'url': 'https://gdpdf.com/merge-pdf',
    'description': 'Free online PDF merger tool by GD PDF Suite & GD Dream Career. Combine multiple PDF documents into a single secure file directly in browser.',
    'applicationCategory': 'BusinessApplication',
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
          Merge PDF Files Online — Free & Secure
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Combine multiple PDF documents into a single unified file instantly. 100% processed securely inside your browser with zero server uploads.
        </p>
      </div>

      {resultBlob ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4 animate-fade-in shadow-sm">
          <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-emerald-900">PDFs Merged Successfully!</h3>
            <p className="text-xs sm:text-sm text-emerald-700 font-medium">
              Combined File Size: <span className="font-bold">{formatFileSize(resultBlob.size)}</span>
            </p>
          </div>
          <a
            href={URL.createObjectURL(resultBlob)}
            download="gd-merged-document.pdf"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold text-base shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-5 h-5 mr-2" /> Download Merged PDF
          </a>
          <div>
            <button
              type="button"
              onClick={() => { setFiles([]); setResultBlob(null); }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 underline mt-3 cursor-pointer"
            >
              Merge More PDFs
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-10 sm:p-14 flex flex-col items-center justify-center cursor-pointer bg-white transition-all shadow-xs hover:shadow-md group">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <span className="font-bold text-slate-900 text-lg sm:text-xl text-center">Select PDF Files</span>
            <span className="text-xs sm:text-sm text-slate-500 mt-1.5 text-center">Select 2 or more PDF documents to combine</span>
            <input type="file" multiple accept="application/pdf" className="hidden" onChange={handleFileChange} />
          </label>

          {files.length > 0 && (
            <div className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Selected PDFs</span>
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-bold">
                    {files.length}
                  </span>
                </h4>
                <button
                  type="button"
                  onClick={() => setFiles([])}
                  className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center space-x-3 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm text-slate-800 font-bold block truncate">{file.name}</span>
                        <span className="text-[11px] text-slate-500 font-medium">{formatFileSize(file.size)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 active:scale-95 transition-all cursor-pointer shrink-0"
                      title="Remove PDF"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleMerge}
                disabled={files.length < 2 || isProcessing}
                className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2.5 transition-all cursor-pointer mt-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Merging PDFs... {progress}%</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-5 h-5" />
                    <span>Merge {files.length} PDF Files Now</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* SEO Info Content Footer */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3 text-slate-700 text-xs sm:text-sm">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Why Use GD PDF Merger?</span>
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
          <li><strong>Combine Multiple PDFs:</strong> Merge unlimited PDF documents into a single structured file instantly.</li>
          <li><strong>100% Client-Side Privacy:</strong> Your documents never leave your browser or device, guaranteeing total confidentiality.</li>
          <li><strong>GD PDF Suite Quality:</strong> Built for high performance across mobile smartphones, tablets, and laptops.</li>
        </ul>
      </section>
    </div>
  );
}