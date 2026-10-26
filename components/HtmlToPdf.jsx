'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Upload, Download, Code, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function HtmlToPdf() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/html' || selectedFile.name.endsWith('.html') || selectedFile.name.endsWith('.htm')) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        const reader = new FileReader();
        reader.onload = (event) => {
          setHtmlContent(event.target.result);
          setProcessedUrl('');
        };
        reader.readAsText(selectedFile);
      } else {
        alert('Please select a valid HTML file (.html or .htm).');
      }
    }
  };

  const convertHtmlToPdf = async () => {
    if (!htmlContent) return;
    setIsProcessing(true);

    try {
      // Create a temporary hidden container to render HTML
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      container.style.width = '800px';
      container.style.padding = '20px';
      container.style.background = '#FFFFFF';
      container.style.color = '#000000';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      // Render container to canvas using html2canvas
      const canvas = await html2canvas(container, { scale: 2, useCORS: true });
      document.body.removeChild(container);

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setProcessedUrl(pdfUrl);
    } catch (error) {
      console.error('HTML to PDF conversion failed:', error);
      alert('Failed to convert HTML content. Please check the markup.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (processedUrl) URL.revokeObjectURL(processedUrl);
    setFile(null);
    setFileName('');
    setHtmlContent('');
    setProcessedUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <Code className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">HTML to PDF Converter Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Render and convert HTML documents or web markup securely into structured, high-resolution PDF pages inside your browser with zero server uploads.
          </p>
        </div>
      </div>

      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload HTML File</span>
          <span className="text-xs text-slate-500">Supports .html and .htm files (100% Client-Side Privacy)</span>
          <input type="file" accept=".html,.htm" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 truncate max-w-xs">{fileName}</p>
                <p className="text-[11px] text-slate-500">HTML Document</p>
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
              onClick={convertHtmlToPdf}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Code className="w-4 h-4" />}
              <span>{isProcessing ? 'Converting HTML to PDF...' : 'Convert to PDF'}</span>
            </button>
          </div>

          {processedUrl && (
            <div className="mt-6 p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">HTML Rendered Successfully!</h4>
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
        <h2 className="font-bold text-slate-700 text-sm">Convert HTML Files to PDF Online Free</h2>
        <p>
          Need to save web pages or custom markup documents as readable PDF files? GD PDF Suite&apos;s HTML to PDF converter accurately renders your .html and .htm files right inside your browser using advanced canvas rendering, giving you perfectly paginated PDF documents instantly without risking data exposure.
        </p>
      </div>

    </div>
  );
}