'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ImageToPdf from '@/components/ImageToPdf';
import MergePdf from '@/components/MergePdf';
import CompressPdf from '@/components/CompressPdf';
import ImageResizer from '@/components/ImageResizer';
import EcommerceResizer from '@/components/EcommerceResizer';
import HeicConverter from '@/components/HeicConverter';
import ImageToPng from '@/components/ImageToPng';

// Document & Photo Tools
import CustomExamResizer from '@/components/CustomExamResizer';
import NdaAgeCalculator from '@/components/NdaAgeCalculator';
import AddNameAndDate from '@/components/AddNameAndDate';
import GenerateSignature from '@/components/GenerateSignature';
import SignatureSixByTwo from '@/components/SignatureSixByTwo';
import PassportPhotoMaker from '@/components/PassportPhotoMaker';
import ImageToJpg from '@/components/ImageToJpg';
import MergeImages from '@/components/MergeImages';

// Office Document Converters
import WordToPdf from '@/components/WordToPdf';
import ExcelToPdf from '@/components/ExcelToPdf';
import HtmlToPdf from '@/components/HtmlToPdf';

// Convert from PDF Suite
import PdfToJpg from '@/components/PdfToJpg';
import PdfToWord from '@/components/PdfToWord';
import PdfToPdfA from '@/components/PdfToPdfA';

import HowItWorks from '@/components/HowItWorks';
import FaqSection from '@/components/FaqSection';
import { ArrowRight } from 'lucide-react';

export default function Home({ defaultTab = 'home' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        setActiveTab(hash);
      } else {
        setActiveTab('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  return (
    <div className="flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
      {/* Header */}
      <Header />

      <div className="flex-grow">
        
        {/* HOMEPAGE ROOT VIEW */}
        {activeTab === 'home' && (
          <>
            <HeroSection 
              onGetStarted={() => {
                window.location.hash = 'image-to-pdf';
              }} 
            />

            {/* Direct Tool Launch Banner */}
            <section className="max-w-5xl mx-auto px-4 py-16">
              <div className="bg-gradient-to-br from-[#033B70] to-blue-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Ready to Convert Images to PDF?</h3>
                <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Convert JPG, PNG, and WebP images to high-quality PDF files instantly without uploading your files to any remote server.
                </p>
                <div>
                  <button
                    onClick={() => { window.location.hash = 'image-to-pdf'; }}
                    className="inline-flex items-center gap-2 bg-white text-[#033B70] hover:bg-slate-100 font-black text-sm px-8 py-4 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Launch Image to PDF Converter</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            <HowItWorks />
            <FaqSection />
          </>
        )}

        {/* IMAGE TO PDF TAB VIEW */}
        {activeTab === 'image-to-pdf' && <main className="max-w-5xl mx-auto px-4 py-12"><ImageToPdf /></main>}

        {/* Standard PDF & Image Utilities */}
        {activeTab === 'resize-image' && <main className="max-w-5xl mx-auto px-4 py-12"><ImageResizer /></main>}
        {activeTab === 'compress-pdf' && <main className="max-w-5xl mx-auto px-4 py-12"><CompressPdf /></main>}
        {activeTab === 'merge-pdf' && <main className="max-w-5xl mx-auto px-4 py-12"><MergePdf /></main>}
        {activeTab === 'ecommerce-resizer' && <main className="max-w-5xl mx-auto px-4 py-12"><EcommerceResizer /></main>}
        {activeTab === 'heic-converter' && <main className="max-w-5xl mx-auto px-4 py-12"><HeicConverter /></main>}
        {activeTab === 'image-to-png' && <main className="max-w-5xl mx-auto px-4 py-12"><ImageToPng /></main>}

        {/* Govt Exam & Document Photo Tools */}
        {activeTab === 'custom-exam-resizer' && <main className="max-w-5xl mx-auto px-4 py-12"><CustomExamResizer /></main>}
        {activeTab === 'nda-age-calc' && <main className="max-w-5xl mx-auto px-4 py-12"><NdaAgeCalculator /></main>}
        {activeTab === 'add-name-date' && <main className="max-w-5xl mx-auto px-4 py-12"><AddNameAndDate /></main>}
        {activeTab === 'generate-sign' && <main className="max-w-5xl mx-auto px-4 py-12"><GenerateSignature /></main>}
        {activeTab === 'sign-6x2' && <main className="max-w-5xl mx-auto px-4 py-12"><SignatureSixByTwo /></main>}
        {activeTab === 'passport-maker' && <main className="max-w-5xl mx-auto px-4 py-12"><PassportPhotoMaker /></main>}
        {activeTab === 'image-to-jpg' && <main className="max-w-5xl mx-auto px-4 py-12"><ImageToJpg /></main>}
        {activeTab === 'merge-images' && <main className="max-w-5xl mx-auto px-4 py-12"><MergeImages /></main>}

        {/* Office Document Converters */}
        {activeTab === 'word-to-pdf' && <main className="max-w-5xl mx-auto px-4 py-12"><WordToPdf /></main>}
        {activeTab === 'excel-to-pdf' && <main className="max-w-5xl mx-auto px-4 py-12"><ExcelToPdf /></main>}
        {activeTab === 'html-to-pdf' && <main className="max-w-5xl mx-auto px-4 py-12"><HtmlToPdf /></main>}

        {/* Convert from PDF Suite */}
        {activeTab === 'pdf-to-jpg' && <main className="max-w-5xl mx-auto px-4 py-12"><PdfToJpg /></main>}
        {activeTab === 'pdf-to-word' && <main className="max-w-5xl mx-auto px-4 py-12"><PdfToWord /></main>}
        {activeTab === 'pdf-to-pdfa' && <main className="max-w-5xl mx-auto px-4 py-12"><PdfToPdfA /></main>}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}