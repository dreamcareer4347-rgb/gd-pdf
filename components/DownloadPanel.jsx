'use client';

import React from 'react';
import { Download, Loader2, CheckCircle2, RefreshCw, FileText, ShieldCheck, Sparkles } from 'lucide-react';

export default function DownloadPanel({
  onConvert,
  isConverting,
  progress,
  result,
  onReset
}) {
  if (result) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-sm animate-fade-in">
        <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-emerald-900 flex items-center justify-center space-x-1.5">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>PDF Generated Successfully!</span>
          </h3>
          <p className="text-xs sm:text-sm text-emerald-700 font-medium">
            {result.filename} • <span className="font-bold">{ (result.blob.size / (1024 * 1024)).toFixed(2) } MB</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={URL.createObjectURL(result.blob)}
            download={result.filename}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition-all"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Now
          </a>
          
          <button
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-sm hover:bg-emerald-100/50 active:scale-95 transition-all"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Convert More Images
          </button>
        </div>

        <div className="flex items-center justify-center space-x-1.5 text-xs text-emerald-600 pt-2 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Processed locally via GD PDF Suite — Zero Server Uploads</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <button
        onClick={onConvert}
        disabled={isConverting}
        className="w-full py-4 sm:py-5 rounded-2xl bg-blue-600 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-75 transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
      >
        {isConverting ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin text-white" />
            <span>Generating PDF... {progress}%</span>
          </>
        ) : (
          <>
            <FileText className="w-6 h-6" />
            <span>Convert Images to PDF</span>
          </>
        )}
      </button>

      {/* Progress Bar for Conversion */}
      {isConverting && (
        <div className="space-y-1.5 animate-fade-in">
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300 shadow-inner"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-slate-500 font-medium">
            Building your document securely on your device...
          </p>
        </div>
      )}
    </div>
  );
}