'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, CheckCircle, RefreshCw, Trash2, Printer } from 'lucide-react';
import mammoth from 'mammoth';

export default function WordToPdf() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const previewRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        selectedFile.name.endsWith('.docx') ||
        selectedFile.name.endsWith('.doc')
      ) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setHtmlContent('');
        setIsProcessing(true);

        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const arrayBuffer = event.target.result;
            // Convert docx to HTML preserving styling, tables and headings
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setHtmlContent(result.value);
          } catch (err) {
            console.error('HTML preview extraction failed:', err);
            alert('Failed to parse Word document structure.');
          } finally {
            setIsProcessing(false);
          }
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        alert('Please select a valid Word document (.docx or .doc).');
      }
    }
  };

  // Uses browser's high-fidelity print engine to save as exact layout PDF
  const handlePrintToPdf = () => {
    if (!previewRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups for this website to export PDF.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${fileName.replace(/\.[^/.]+$/, '')} - GD PDF Suite</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #111827;
              line-height: 1.6;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; }
            h1, h2, h3 { color: #1f2937; margin-top: 24px; }
            p { margin-bottom: 12px; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleReset = () => {
    setFile(null);
    setFileName('');
    setHtmlContent('');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">WORD to PDF Converter Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Convert Microsoft Word (.docx / .doc) documents into clean, properly aligned PDF files instantly using browser rendering.
          </p>
        </div>
      </div>

      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload Word Document</span>
          <span className="text-xs text-slate-500">Supports .docx files with clean formatting layout</span>
          <input type="file" accept=".docx,.doc" onChange={handleFileChange} className="hidden" />
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
                <p className="text-[11px] text-slate-500">Microsoft Word Document</p>
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

          {/* Document Content Preview Box */}
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 max-h-96 overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Extracted Document Preview:</div>
            {isProcessing ? (
              <div className="flex items-center justify-center py-10 space-x-2 text-slate-500 text-xs">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <span>Reading document layout...</span>
              </div>
            ) : (
              <div
                ref={previewRef}
                className="bg-white p-6 rounded-xl border border-slate-200 text-slate-800 text-sm leading-relaxed space-y-4 shadow-sm"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              Choose Another File
            </button>

            <button
              onClick={handlePrintToPdf}
              disabled={isProcessing || !htmlContent}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              <span>Save / Download as PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">Convert Microsoft Word (.docx) to PDF Online</h2>
        <p>
          Need to convert your Word documents into structured, professionally formatted PDF files? GD PDF Suite&apos;s Word to PDF converter retains your document&apos;s tables, headings, and layout formatting directly inside your browser with 100% data privacy.
        </p>
      </div>

    </div>
  );
}