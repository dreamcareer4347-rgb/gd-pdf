'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Type, CheckCircle, RefreshCw, Calendar, User, Sliders, ZoomIn, ZoomOut } from 'lucide-react';

export default function AddNameAndDate() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [dob, setDob] = useState('');
  const [targetKb, setTargetKb] = useState(50);
  
  // Zoom & Pan for precise adjustment like the screenshot
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [processedUrl, setProcessedUrl] = useState('');
  const [processedKb, setProcessedKb] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const canvasRef = useRef(null);
  const imgObjRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          imgObjRef.current = img;
          setImage(event.target.result);
          setZoom(1);
          setOffsetX(0);
          setOffsetY(0);
          setProcessedUrl('');
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Live Interactive Crop & Banner Preview
  useEffect(() => {
    if (!image || !canvasRef.current || !imgObjRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgObjRef.current;

    const baseWidth = 400;
    const baseHeight = 500;
    const bannerHeight = 90;
    canvas.width = baseWidth;
    canvas.height = baseHeight + bannerHeight;

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Photo Area with Zoom & Pan
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, baseWidth, baseHeight);
    ctx.clip();

    const scaledW = img.width * zoom;
    const scaledH = img.height * zoom;
    const drawX = (baseWidth / 2) - (scaledW / 2) + offsetX;
    const drawY = (baseHeight / 2) - (scaledH / 2) + offsetY;

    ctx.drawImage(img, drawX, drawY, scaledW, scaledH);
    ctx.restore();

    // Border around photo
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, baseWidth, baseHeight);

    // Draw Bottom Banner Box
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, baseHeight, baseWidth, bannerHeight);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, baseHeight, baseWidth, bannerHeight);

    // Render Name & DOB
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';

    const nameText = candidateName ? candidateName.toUpperCase() : 'NAME';
    const dobText = dob ? `DOB: ${dob}` : 'DOB: DD-MM-YYYY';

    ctx.fillText(nameText, baseWidth / 2, baseHeight + 35);
    ctx.font = 'bold 14px Arial';
    ctx.fillText(dobText, baseWidth / 2, baseHeight + 65);

  }, [image, candidateName, dob, zoom, offsetX, offsetY]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const processAndCompressImage = () => {
    if (!image || !canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    let quality = 0.90;
    let dataUrl = canvas.toDataURL('image/jpeg', quality);

    let base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
    let kbSize = (base64Length * 3) / 4 / 1024;

    while (kbSize > targetKb && quality > 0.1) {
      quality -= 0.05;
      dataUrl = canvas.toDataURL('image/jpeg', quality);
      base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
      kbSize = (base64Length * 3) / 4 / 1024;
    }

    setProcessedUrl(dataUrl);
    setProcessedKb(kbSize.toFixed(2));
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <Type className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Add Name & DOB on Photo Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Official government exam application photo editor. Easily add candidate name and Date of Birth (DOB) banner with live zoom, pan, and target KB compression for SSC, UPSC, and NEET forms.
          </p>
        </div>
      </div>

      {!image ? (
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 transition-all rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">Upload Exam Photo</span>
          <span className="text-xs text-slate-500">Supports JPG, PNG formats with 100% browser-side privacy</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          {/* Interactive Crop / Adjustment Box matching reference */}
          <div className="bg-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">Adjust Photo Frame (Drag & Zoom)</div>
            
            <div 
              className="relative overflow-hidden border-2 border-dashed border-slate-500 rounded-xl bg-white cursor-grab active:cursor-grabbing shadow-inner flex items-center justify-center p-2"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <canvas ref={canvasRef} className="max-h-80 object-contain shadow-md" />
            </div>

            <div className="flex items-center space-x-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700">
              <button onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))} className="p-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 cursor-pointer" aria-label="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <input type="range" min="0.5" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-32 accent-blue-500 cursor-pointer" aria-label="Zoom Level" />
              <button onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))} className="p-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 cursor-pointer" aria-label="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={() => { setZoom(1); setOffsetX(0); setOffsetY(0); }} className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer">
                Reset
              </button>
            </div>
          </div>

          {/* Form Inputs matching screenshot */}
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Name:</label>
              <input
                type="text"
                placeholder="e.g. SACHIN SAINI"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-blue-600 uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth (DOB):</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target KB Size:</label>
              <input
                type="number"
                value={targetKb}
                onChange={(e) => setTargetKb(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-blue-600"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button onClick={() => { setImage(null); setProcessedUrl(''); }} className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer">
              Change Image
            </button>
            <button onClick={processAndCompressImage} disabled={isProcessing} className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs">
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sliders className="w-4 h-4" />}
              <span>{isProcessing ? 'Processing Photo...' : 'Add Name, DOB & Resize'}</span>
            </button>
          </div>

          {processedUrl && (
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col items-center space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">Processed Exam Photo Preview</h3>
              <div className="bg-white border border-slate-300 rounded-xl p-2 shadow-sm">
                <img src={processedUrl} alt="Processed Exam Photo with Name and DOB" className="max-h-64 object-contain" />
              </div>
              <p className="text-xs font-bold text-blue-600">Final Size: {processedKb} KB</p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a href={processedUrl} download={`exam-photo-${candidateName || 'candidate'}.jpg`} className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs">
                  <Download className="w-4 h-4" />
                  <span>Download Exam Photo</span>
                </a>
                <button onClick={() => { setImage(null); setProcessedUrl(''); }} className="w-full sm:w-auto px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl cursor-pointer text-xs">
                  Edit New Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">How to Add Name and Date on Photo for SSC & Govt Exams?</h2>
        <p>
          Many government examinations like SSC CGL, CHSL, MTS, and RRB require candidates to print their name and the date on which the photograph was taken directly on the bottom banner. With GD PDF Suite, you can upload your photo, type your candidate name and DOB, adjust zoom/pan, and compress the file to your exact required KB limit instantly inside your browser without any server uploads.
        </p>
      </div>

    </div>
  );
}