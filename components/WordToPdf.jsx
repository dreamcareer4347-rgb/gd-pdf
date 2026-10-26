'use client';

import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import mammoth from 'mammoth';

export default function WordToPdf() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');

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
        setProcessedUrl('');
      } else {
        alert('Please select a valid Word document (.docx or .doc).');
      }
    }
  };

  const convertWordToPdf = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      // Extract raw text and structure from docx using mammoth
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      // Create PDF using jsPDF
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const margins = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const maxLineWidth = pageWidth - margins * 2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      // Split text into multiline paragraphs
      const lines = doc.splitTextToSize(text, maxLineWidth);
      let cursorY = margins;

      lines.forEach((line) => {
        if (cursorY + 7 > pageHeight - margins) {
          doc.addPage();
          cursorY = margins;
        }
        doc.text(line, margins, cursorY);
        cursorY += 6;
      });

      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setProcessedUrl(pdfUrl);
    } catch (error) {
      console.error('Word to PDF conversion failed:', error);
      alert('Failed to convert Word document. Please ensure it is a valid .docx file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (processedUrl) URL.revokeObjectURL(processedUrl);
    setFile(null);
    setFileName('');
    setProcessedUrl('');
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
            Convert Microsoft Word (.docx / .doc) documents to PDF format securely inside your browser with complete privacy and zero server uploads.
          </p>
        </div>
      </div>

      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload Word Document</span>
          <span className="text-xs text-slate-500">Supports .docx files (100% Client-Side Private Processing)</span>
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              Choose Another File
            </button>

            <button
              onClick={convertWordToPdf}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              <span>{isProcessing ? 'Converting Word to PDF...' : 'Convert to PDF'}</span>
            </button>
          </div>

          {processedUrl && (
            <div className="mt-6 p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Word Document Converted Successfully!</h4>
                  <p className="text-xs text-emerald-700">Ready to view or download as PDF document.</p>
                </div>
              </div>

              <a
                href={processedUrl}
                download={`${fileName.replace(/\.[^/.]+$/, '')}.pdf`}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">Convert Microsoft Word (.docx) to PDF Free Online</h2>
        <p>
          Need to convert your Word documents into secure, universally readable PDF files? GD PDF Suite&apos;s Word to PDF converter extracts text content from your .docx files and generates professional PDF documents right inside your browser without uploading files to any external server.
        </p>
      </div>

    </div>
  );
}