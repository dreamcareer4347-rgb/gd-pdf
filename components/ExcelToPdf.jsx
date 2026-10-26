'use client';

import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function ExcelToPdf() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        selectedFile.type === 'application/vnd.ms-excel' ||
        selectedFile.name.endsWith('.xlsx') ||
        selectedFile.name.endsWith('.xls')
      ) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setProcessedUrl('');
      } else {
        alert('Please select a valid Excel spreadsheet (.xlsx or .xls).');
      }
    }
  };

  const convertExcelToPdf = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      // Get first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert worksheet to JSON rows array
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length === 0) {
        alert('The selected Excel file is empty.');
        setIsProcessing(false);
        return;
      }

      // Initialize jsPDF
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(`Spreadsheet: ${fileName}`, 14, 15);

      const headers = jsonData[0] || [];
      const rows = jsonData.slice(1) || [];

      // Generate table using jspdf-autotable
      autoTable(doc, {
        startY: 22,
        head: [headers],
        body: rows,
        theme: 'grid',
        headStyles: { fillColor: [3, 59, 112] }, // GD Blue theme
        styles: { fontSize: 9, cellPadding: 3 },
      });

      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setProcessedUrl(pdfUrl);
    } catch (error) {
      console.error('Excel to PDF conversion failed:', error);
      alert('Failed to convert Excel spreadsheet. Please ensure it is a valid file.');
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
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">EXCEL to PDF Converter Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Transform Excel spreadsheets (.xlsx, .xls) into clean, formatted, and professional PDF tables securely in your browser with zero server uploads.
          </p>
        </div>
      </div>

      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload Excel Spreadsheet</span>
          <span className="text-xs text-slate-500">Supports .xlsx and .xls files (100% Client-Side Private Processing)</span>
          <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="hidden" />
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
                <p className="text-[11px] text-slate-500">Microsoft Excel Spreadsheet</p>
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
              onClick={convertExcelToPdf}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>{isProcessing ? 'Converting Excel to PDF...' : 'Convert to PDF'}</span>
            </button>
          </div>

          {processedUrl && (
            <div className="mt-6 p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Excel Spreadsheet Converted Successfully!</h4>
                  <p className="text-xs text-emerald-700">Ready to view or download as structured PDF table.</p>
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
        <h2 className="font-bold text-slate-700 text-sm">Convert Excel (.xlsx / .xls) Spreadsheets to PDF Free Online</h2>
        <p>
          Need to share an Excel file without allowing modifications or cell shifting? GD PDF Suite&apos;s free Excel to PDF converter parses your sheet data client-side and builds a clean landscape PDF document. Your data is processed entirely within your web browser, ensuring complete confidentiality for financial reports, student rosters, and business metrics.
        </p>
      </div>

    </div>
  );
}