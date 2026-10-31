'use client';

import React, { useState } from 'react';
import { Upload, X, FileText, Download, Trash2, ArrowUp, ArrowDown, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

export default function ImageToPdf() {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [pdfFileName, setPdfFileName] = useState('');

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    
    const newImages = validImages.map(file => ({
      file,
      id: Math.random().toString(36).substring(2, 9),
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB'
    }));

    setImages(prev => [...prev, ...newImages]);
    setPdfBlobUrl(null); // Reset previous generated PDF if new images added
  };

  // Remove single image
  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Move image order up/down
  const moveImage = (index, direction) => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
  };

  // Clear all
  const clearAll = () => {
    setImages([]);
    setPdfBlobUrl(null);
  };

  // Generate PDF with Processing Line & Progress
  const handleProcessToPdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setProgressPercent(10);
    setProgressText('Initializing secure PDF builder...');

    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      for (let i = 0; i < images.length; i++) {
        setProgressPercent(Math.round(((i + 1) / images.length) * 70) + 15);
        setProgressText(`Processing image ${i + 1} of ${images.length}...`);

        const imgData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(images[i].file);
        });

        if (i > 0) {
          doc.addPage();
        }

        const img = new Image();
        img.src = imgData;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        let width = pageWidth - 20;
        let height = (img.height * width) / img.width;

        if (height > pageHeight - 20) {
          height = pageHeight - 20;
          width = (img.width * height) / img.height;
        }

        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;

        let format = 'JPEG';
        if (images[i].file.type === 'image/png') format = 'PNG';

        doc.addImage(imgData, format, x, y, width, height);
      }

      setProgressPercent(95);
      setProgressText('Finalizing document...');

      const pdfOutput = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfOutput);
      
      setPdfBlobUrl(blobUrl);
      setPdfFileName(`gd-converted-${Date.now().toString().slice(-4)}.pdf`);
      setProgressPercent(100);
      setProgressText('Conversion completed successfully!');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#033B70] px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide border border-blue-100">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>100% Client-Side Secure Conversion</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Convert Images to <span className="text-[#033B70]">PDF</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Transform your JPG, PNG, and WebP photos into professional PDF documents instantly in your browser. No server uploads.
        </p>
      </div>

      {/* Upload Box */}
      {!pdfBlobUrl && !isProcessing && (
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center hover:border-[#033B70] transition-all cursor-pointer relative group">
          <input 
            type="file" 
            multiple 
            accept="image/jpeg,image/png,image/webp" 
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="space-y-4 pointer-events-none">
            <div className="w-16 h-16 bg-blue-50 text-[#033B70] rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-extrabold text-slate-900">Drop your images here, or <span className="text-blue-600 underline">browse</span></p>
              <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WebP (Multiple files allowed)</p>
            </div>
          </div>
        </div>
      )}

      {/* Processing State with Line / Progress Bar */}
      {isProcessing && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-lg max-w-xl mx-auto">
          <div className="w-16 h-16 bg-blue-50 text-[#033B70] rounded-2xl mx-auto flex items-center justify-center animate-bounce">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-slate-900">Processing Your Images...</h3>
            <p className="text-xs text-slate-500 font-bold">{progressText}</p>
          </div>
          {/* Animated Progress Line */}
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
            <div 
              className="bg-[#033B70] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-xs font-black text-[#033B70]">{progressPercent}% Completed</p>
        </div>
      )}

      {/* Download Option Box after conversion */}
      {pdfBlobUrl && !isProcessing && (
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-blue-200 rounded-3xl p-8 text-center space-y-6 shadow-xl max-w-xl mx-auto">
          <div className="w-20 h-20 bg-[#033B70] text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg transform rotate-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Your PDF is Ready!</h3>
            <p className="text-sm text-slate-600">All selected images have been securely merged into a single PDF document.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={pdfBlobUrl}
              download={pdfFileName}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#033B70] hover:bg-blue-900 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Now</span>
            </a>
            <button
              onClick={() => { setPdfBlobUrl(null); setImages([]); }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm px-6 py-4 rounded-2xl border border-slate-300 transition-all cursor-pointer"
            >
              <span>Convert More Images</span>
            </button>
          </div>
        </div>
      )}

      {/* Image Preview & Management List */}
      {images.length > 0 && !pdfBlobUrl && !isProcessing && (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Selected Images ({images.length})</h3>
              <p className="text-xs text-slate-500">Arrange order or remove images before converting</p>
            </div>
            <button 
              onClick={clearAll}
              className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={img.id} className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center space-x-3 shadow-xs relative group">
                <img src={img.preview} alt={img.name} className="w-14 h-14 object-cover rounded-xl border border-slate-100 shrink-0" />
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{img.name}</p>
                  <p className="text-[11px] text-slate-500">{img.size}</p>
                  <span className="inline-block mt-1 bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md">Page {index + 1}</span>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-1">
                  <button 
                    onClick={() => moveImage(index, 'up')} 
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => moveImage(index, 'down')} 
                    disabled={index === images.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button 
                  onClick={() => removeImage(img.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleProcessToPdf}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#033B70] hover:bg-blue-900 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Convert Images to PDF Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}