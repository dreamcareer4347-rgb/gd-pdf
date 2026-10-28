'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, RefreshCw, Trash2, Printer } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ExcelToPdf() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const previewRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.name.endsWith('.xlsx') ||
        selectedFile.name.endsWith('.xls') ||
        selectedFile.name.endsWith('.csv')
      ) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setHtmlContent('');
        setIsProcessing(true);

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array', cellDates: true });
            
            let combinedHtml = '';
            workbook.SheetNames.forEach((sheetName) => {
              const worksheet = workbook.Sheets[sheetName];
              
              // Generate structured HTML table directly from Excel sheet matrix
              const sheetHtml = XLSX.utils.sheet_to_html(worksheet, {
                header: '',
                footer: '',
                editable: false,
              });

              combinedHtml += `
                <div class="excel-sheet-wrapper">
                  <h3 class="sheet-title">${sheetName}</h3>
                  ${sheetHtml}
                </div>
              `;
            });

            setHtmlContent(combinedHtml);
          } catch (err) {
            console.error('Excel extraction failed:', err);
            alert('Failed to parse Excel file structure. Please upload a valid .xlsx file.');
          } finally {
            setIsProcessing(false);
          }
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        alert('Please select a valid Excel file (.xlsx, .xls, or .csv).');
      }
    }
  };

  const handlePrintToPdf = () => {
    if (!htmlContent) return;

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
            @page {
              size: A4 landscape;
              margin: 10mm;
            }
            body {
              font-family: Arial, Helvetica, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 10px;
              background: #fff;
            }
            .sheet-title {
              color: #1e293b;
              font-size: 16px;
              font-weight: bold;
              margin-top: 15px;
              margin-bottom: 10px;
              border-bottom: 2px solid #2563eb;
              padding-bottom: 4px;
            }
            table {
              width: 100% !important;
              border-collapse: collapse !important;
              margin-bottom: 24px !important;
              font-size: 11px !important;
              table-layout: auto !important;
            }
            th, td {
              border: 1px solid #94a3b8 !important;
              padding: 6px 10px !important;
              text-align: left !important;
              white-space: nowrap !important;
              word-break: normal !important;
            }
            tr:first-child, tr:nth-child(1) td {
              background-color: #f1f5f9 !important;
              font-weight: bold !important;
              color: #0f172a !important;
            }
            tr:nth-child(even) td {
              background-color: #f8fafc !important;
            }
            @media print {
              body { padding: 0; }
              .excel-sheet-wrapper { page-break-after: always; }
              .excel-sheet-wrapper:last-child { page-break-after: auto; }
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
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
      
      {/* SEO Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">EXCEL to PDF Converter Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Convert Excel (.xlsx / .xls / .csv) spreadsheets into clean, structured, and properly aligned PDF tables.
          </p>
        </div>
      </div>

      {!file ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload Excel Spreadsheet</span>
          <span className="text-xs text-slate-500">Supports .xlsx, .xls, .csv files with complete data privacy</span>
          <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} className="hidden" />
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

          {/* Spreadsheet Table Preview Container */}
          <div className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-slate-50/50 max-h-96 overflow-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Extracted Spreadsheet Table Preview:</div>
            {isProcessing ? (
              <div className="flex items-center justify-center py-10 space-x-2 text-slate-500 text-xs">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <span>Parsing Excel columns & rows...</span>
              </div>
            ) : (
              <div
                ref={previewRef}
                className="bg-white p-4 rounded-xl border border-slate-200 text-slate-800 text-xs overflow-x-auto shadow-sm [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-slate-300 [&_th]:p-2 [&_th]:bg-slate-100 [&_td]:border [&_td]:border-slate-300 [&_td]:p-2"
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

      {/* SEO Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">Convert Excel (.xlsx) to PDF Free Online</h2>
        <p>
          Convert your Excel spreadsheets, CSV files, and workbooks into clean, professional PDF tables directly in your browser without data leaks or quality loss.
        </p>
      </div>

    </div>
  );
}