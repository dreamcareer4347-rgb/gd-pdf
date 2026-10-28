'use client';

import React, { useState } from 'react';
import { Upload, FileText, RefreshCw, Trash2, Download, AlertCircle } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker safely
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export default function PdfToWord() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setIsProcessing(true);
      setExtractedText('');
      setErrorMsg('');

      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;

        let fullTextContent = '';

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          const page = await pdfDoc.getPage(pageNum);
          const textContent = await page.getTextContent({ includeWhitespace: true });

          fullTextContent += `\n\n--- Page ${pageNum} ---\n\n`;
          
          let pageText = '';
          if (textContent && textContent.items) {
            textContent.items.forEach((item) => {
              if (item && typeof item.str === 'string') {
                pageText += item.str + (item.hasEOL ? '\n' : ' ');
              }
            });
          }

          fullTextContent += pageText.trim() !== '' ? pageText : '[No text found on this page]';
        }

        if (!fullTextContent.trim()) {
          setErrorMsg('No readable text found in this PDF. It might be a scanned image-based document.');
        } else {
          setExtractedText(fullTextContent);
        }
      } catch (error) {
        console.error('PDF to Word extraction failed:', error);
        setErrorMsg('Failed to extract text from PDF structure.');
      } finally {
        setIsProcessing(false);
      }
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const handleDownloadWord = () => {
    if (!extractedText) return;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${fileName}</title>
        <style>
          body { font-family: Calibri, Arial, sans-serif; font-size: 14pt; color: #000; line-height: 1.6; padding: 20px; }
          pre { white-space: pre-wrap; font-family: Calibri, Arial, sans-serif; }
        </style>
      </head>
      <body>
        <pre>${extractedText}</pre>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], {
      type: 'application/msword',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace(/\.[^/.]+$/, '')}-converted.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setFileName('');
    setExtractedText('');
    setErrorMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">PDF to WORD Converter Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Extract text from PDF documents into editable Microsoft Word (.doc) files securely inside your browser.
          </p>
        </div>
      </div>

      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload PDF Document</span>
          <span className="text-xs text-slate-500">Extracts text into Word format securely</span>
          <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 truncate max-w-xs">{fileName}</p>
                <p className="text-[11px] text-slate-500">PDF Document</p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
              title="Remove File"
              aria-label="Remove File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {errorMsg && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center space-x-3 text-amber-800 text-xs font-medium">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Preview Box */}
          {!errorMsg && (
            <div className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-slate-50/50 max-h-96 overflow-auto">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Extracted Text Preview:</div>
              {isProcessing ? (
                <div className="flex items-center justify-center py-10 space-x-2 text-slate-500 text-xs">
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Reading PDF text content...</span>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap font-sans text-xs text-slate-800 bg-white p-4 rounded-xl border border-slate-200">
                  {extractedText}
                </pre>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              Choose Another File
            </button>

            {extractedText && !errorMsg && (
              <button
                onClick={handleDownloadWord}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Word File (.doc)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* SEO Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">Convert PDF to Word (.doc) Online Free</h2>
        <p>
          Easily convert PDF text into editable Microsoft Word documents directly in your browser with complete privacy.
        </p>
      </div>

    </div>
  );
}