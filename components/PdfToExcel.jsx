'use client';

import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Set worker for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function PdfToExcel() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [downloadBlob, setDownloadBlob] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setIsConverted(false);
      setDownloadBlob(null);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const convertPdfToExcel = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;

      let extractedRows = [['Page Number', 'Extracted Content / Table Row']];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        
        let rowText = textContent.items.map((item) => item.str).join(' | ');
        extractedRows.push([`Page ${i}`, rowText]);
      }

      // Create workbook and worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(extractedRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'PDF Data');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      setDownloadBlob(blob);
      setIsConverted(true);
    } catch (error) {
      console.error('PDF to Excel conversion failed:', error);
      alert('Failed to extract data and convert PDF to Excel.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadBlob) {
      saveAs(downloadBlob, `${fileName.replace(/\.[^/.]+$/, '')}.xlsx`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setFileName('');
    setIsConverted(false);
    setDownloadBlob(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">PDF to EXCEL Converter Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Extract tables and structured data from PDF documents into editable Excel spreadsheets (.xlsx) securely in your browser with zero server uploads.
          </p>
        </div>
      </div>

      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload PDF File</span>
          <span className="text-xs text-slate-500">Supports table and text data extraction to Excel (.xlsx) with 100% privacy</span>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
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

          {!isConverted ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button onClick={handleReset} className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer">
                Choose Another PDF
              </button>

              <button
                onClick={convertPdfToExcel}
                disabled={isProcessing}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs disabled:opacity-50"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
                <span>{isProcessing ? 'Converting PDF to Excel...' : 'Convert to Excel (.xlsx)'}</span>
              </button>
            </div>
          ) : (
            <div className="p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Converted to Excel Successfully!</h4>
                  <p className="text-xs text-emerald-700">Spreadsheet data extracted and formatted as .xlsx file.</p>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Excel File</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">Convert PDF to Excel (.xlsx) Free Online</h2>
        <p>
          Need to pull data out of PDF reports, statements, or tables into Microsoft Excel? GD PDF Suite&apos;s free PDF to Excel converter reads document text and builds an editable .xlsx spreadsheet directly inside your browser. No registration required, and no files leave your device.
        </p>
      </div>

    </div>
  );
}