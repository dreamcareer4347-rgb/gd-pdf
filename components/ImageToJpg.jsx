'use client';

import React, { useState } from 'react';
import { Upload, Download, FileImage, CheckCircle, RefreshCw, Trash2, CheckSquare, Square } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function ImageToJpg() {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [isZipping, setIsZipping] = useState(false);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [];
      let loaded = 0;

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push({
            id: Date.now() + index + Math.random(),
            file: file,
            name: file.name,
            src: event.target.result,
            processedUrl: null,
            selected: true,
          });
          loaded++;
          if (loaded === files.length) {
            setImages((prev) => [...prev, ...newImages]);
            setProcessedCount(0);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeSingleImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const toggleSelectImage = (id) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, selected: !img.selected } : img))
    );
  };

  const toggleSelectAll = () => {
    const allSelected = images.every((img) => img.selected);
    setImages((prev) => prev.map((img) => ({ ...img, selected: !allSelected })));
  };

  const clearAllImages = () => {
    setImages([]);
    setProcessedCount(0);
  };

  const convertBulkToJpg = () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setProcessedCount(0);

    let completed = 0;
    const updatedImages = [...images];

    updatedImages.forEach((item, index) => {
      const img = new Image();
      img.src = item.src;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        // Pure white background for JPG transparency fallback
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
        updatedImages[index].processedUrl = dataUrl;
        completed++;
        setProcessedCount(completed);

        if (completed === updatedImages.length) {
          setImages(updatedImages);
          setIsProcessing(false);
        }
      };
    });
  };

  const downloadAsZip = async (onlySelected = false) => {
    const targetImages = onlySelected 
      ? images.filter((img) => img.selected && img.processedUrl) 
      : images.filter((img) => img.processedUrl);

    if (targetImages.length === 0) {
      alert('Please convert the images to JPG first or select valid processed photos.');
      return;
    }

    setIsZipping(true);
    const zip = new JSZip();
    const folder = zip.folder('gd-jpg-converted-images');

    targetImages.forEach((item, index) => {
      const base64Data = item.processedUrl.split(',')[1];
      const cleanName = item.name.substring(0, item.name.lastIndexOf('.')) || `image-${index + 1}`;
      folder.file(`${cleanName}.jpg`, base64Data, { base64: true });
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'gd-pdf-suite-jpg-images.zip');
    } catch (err) {
      console.error('ZIP Generation failed:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
            <FileImage className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Bulk Image to JPG Converter Online</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Convert PNG, WebP, and HEIC images into standard high-quality JPG format instantly in your browser with 100% security and zero server uploads.
            </p>
          </div>
        </div>

        {images.length > 0 && (
          <button
            onClick={clearAllImages}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </div>

      {images.length === 0 ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload Multiple Images</span>
          <span className="text-xs text-slate-500">Fast batch conversion with 100% client-side privacy</span>
          <input type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  {images.every((img) => img.selected) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  <span>Select All</span>
                </button>
                <span className="text-xs font-bold text-slate-500">
                  ({images.filter(i => i.selected).length} of {images.length} selected)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                  + Add More Photos
                  <input type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-1">
              {images.map((item) => (
                <div 
                  key={item.id} 
                  className={`relative group bg-white border rounded-xl overflow-hidden p-2 flex flex-col items-center shadow-xs transition-all ${
                    item.selected ? 'border-blue-500 ring-1 ring-blue-500/30' : 'border-slate-200 opacity-80'
                  }`}
                >
                  <div className="absolute top-1 left-1 z-10 flex items-center space-x-1">
                    <button onClick={() => toggleSelectImage(item.id)} className="text-blue-600 bg-white rounded-md p-0.5 shadow-xs cursor-pointer" aria-label="Toggle Selection">
                      {item.selected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>

                  <button
                    onClick={() => removeSingleImage(item.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity z-10 cursor-pointer"
                    title="Remove Photo"
                    aria-label="Remove Photo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>

                  <div className="w-full h-28 bg-slate-100 border rounded-lg overflow-hidden flex items-center justify-center p-1">
                    <img src={item.src} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>

                  <p className="text-[10px] font-semibold text-slate-700 mt-1 truncate w-full text-center">{item.name}</p>

                  {item.processedUrl && (
                    <a
                      href={item.processedUrl}
                      download={`${item.name.substring(0, item.name.lastIndexOf('.')) || 'image'}.jpg`}
                      className="mt-1 w-full text-center py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition-all flex items-center justify-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={clearAllImages}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            >
              Clear All
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <button
                onClick={convertBulkToJpg}
                disabled={isProcessing}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileImage className="w-4 h-4" />}
                <span>{isProcessing ? `Converting (${processedCount}/${images.length})...` : `Convert All to JPG`}</span>
              </button>

              <button
                onClick={() => downloadAsZip(true)}
                disabled={isZipping || !images.some(i => i.processedUrl && i.selected)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs disabled:opacity-50"
              >
                {isZipping ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>{isZipping ? 'Zipping...' : 'Download Selected (ZIP)'}</span>
              </button>

              <button
                onClick={() => downloadAsZip(false)}
                disabled={isZipping || !images.some(i => i.processedUrl)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 bg-slate-900 hover:bg-slate-950 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download All (ZIP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">Convert PNG, WebP & HEIC Images to JPG Online</h2>
        <p>
          Many online upload portals and application forms only accept JPG/JPEG image formats. With GD PDF Suite&apos;s bulk image to JPG converter, you can easily convert multiple PNG, WebP, or HEIC photos into standard JPG files simultaneously. All processing happens securely inside your browser with zero server uploads.
        </p>
      </div>

    </div>
  );
}