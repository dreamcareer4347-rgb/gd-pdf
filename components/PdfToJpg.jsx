'use client';

import React, { useState } from 'react';
import { Upload, Download, FileImage, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Set worker for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function PdfToJpg() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pages, setPages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setPages([]);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const convertPdfToJpg = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;
      const extractedPages = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // High res render
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport: viewport }).promise;
        const imgUrl = canvas.toDataURL('image/jpeg', 0.90);

        extractedPages.push({
          pageNumber: i,
          url: imgUrl,
        });
      }

      setPages(extractedPages);
    } catch (error) {
      console.error('PDF to JPG conversion failed:', error);
      alert('Failed to convert PDF pages to images.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAsZip = async () => {
    if (pages.length === 0) return;
    setIsZipping(true);
    const zip = new JSZip();
    const folder = zip.folder('gd-pdf-to-jpg-images');

    pages.forEach((p) => {
      const base64Data = p.url.split(',')[1];
      folder.file(`page-${p.pageNumber}.jpg`, base64Data, { base64: true });
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${fileName.replace(/\.[^/.]+$/, '')}-images.zip`);
    } catch (err) {
      console.error('ZIP generation failed:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setFileName('');
    setPages([]);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <FileImage className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">PDF to JPG Converter Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Extract every page of your PDF document into high-resolution JPG images securely inside your browser with 100% data privacy and zero server uploads.
          </p>
        </div>
      </div>

      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload PDF File</span>
          <span className="text-xs text-slate-500">Supports multi-page PDF documents (100% Client-Side Private Processing)</span>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                <FileImage className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 truncate max-w-xs">{fileName}</p>
                <p className="text-[11px] text-slate-500">PDF Document</p>
              </div>
            </div>

            <button onClick={handleReset} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer" title="Remove File" aria-label="Remove File">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {pages.length === 0 ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button onClick={handleReset} className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer">
                Choose Another PDF
              </button>

              <button
                onClick={convertPdfToJpg}
                disabled={isProcessing}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs disabled:opacity-50"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileImage className="w-4 h-4" />}
                <span>{isProcessing ? 'Converting PDF to JPG...' : 'Convert PDF to JPG'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">Extracted Pages ({pages.length})</h3>
                <button
                  onClick={downloadAsZip}
                  disabled={isZipping}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isZipping ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  <span>{isZipping ? 'Zipping...' : 'Download All (ZIP)'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-1">
                {pages.map((p) => (
                  <div key={p.pageNumber} className="bg-white border border-slate-200 rounded-xl p-2 flex flex-col items-center shadow-xs">
                    <div className="w-full h-32 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center mb-2">
                      <img src={p.url} alt={`Page ${p.pageNumber}`} className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 mb-2">Page {p.pageNumber}</span>
                    <a
                      href={p.url}
                      download={`page-${p.pageNumber}.jpg`}
                      className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg text-center transition-all flex items-center justify-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download JPG</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">Convert PDF Pages to High-Resolution JPG Images Online</h2>
        <p>
          Need to convert PDF pages into individual image files for presentations, editing, or sharing? GD PDF Suite&apos;s PDF to JPG converter renders each page of your PDF document into crisp, high-resolution JPEG images directly inside your browser. Download pages individually or bundle them all into a convenient ZIP archive instantly.
        </p>
      </div>

    </div>
  );
}