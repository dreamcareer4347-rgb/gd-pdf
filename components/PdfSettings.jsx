'use client';

import React from 'react';
import { Sliders, FileText, Sparkles } from 'lucide-react';

export default function PdfSettings({ settings, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-base sm:text-lg">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Sliders className="w-4 h-4" />
          </div>
          <span>PDF Customization Settings</span>
        </div>
        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-100">
          GD PDF Suite
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {/* Page Size */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Page Size
          </label>
          <select
            value={settings.pageSize}
            onChange={(e) => handleChange('pageSize', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
          >
            <option value="a4">A4 (Standard)</option>
            <option value="letter">US Letter</option>
            <option value="fit">Fit to Image Size</option>
          </select>
        </div>

        {/* Page Orientation */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Orientation
          </label>
          <select
            value={settings.orientation}
            onChange={(e) => handleChange('orientation', e.target.value)}
            disabled={settings.pageSize === 'fit'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50 cursor-pointer"
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
            <option value="auto">Auto (Match Image)</option>
          </select>
        </div>

        {/* Image Placement / Scaling */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Image Scaling
          </label>
          <select
            value={settings.imagePlacement}
            onChange={(e) => handleChange('imagePlacement', e.target.value)}
            disabled={settings.pageSize === 'fit'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50 cursor-pointer"
          >
            <option value="fit">Fit to page (Keep Aspect Ratio)</option>
            <option value="fill">Fill page</option>
            <option value="original">Original size</option>
          </select>
        </div>

        {/* Page Margins */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Margins
          </label>
          <select
            value={settings.margins}
            onChange={(e) => handleChange('margins', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
          >
            <option value="none">None (0 mm)</option>
            <option value="small">Small (5 mm)</option>
            <option value="normal">Normal (10 mm)</option>
          </select>
        </div>
      </div>

      {/* PDF Filename */}
      <div className="space-y-1.5 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          PDF Filename
        </label>
        <div className="relative flex items-center">
          <FileText className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={settings.filename}
            onChange={(e) => handleChange('filename', e.target.value)}
            placeholder="gd-converted-images.pdf"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}