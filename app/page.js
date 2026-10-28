'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header'; // <-- Header yahan import kiya hai
import HeroSection from '@/components/HeroSection';
import UploadArea from '@/components/UploadArea';
import ImageList from '@/components/ImageList';
import PdfSettings from '@/components/PdfSettings';
import PdfPreview from '@/components/PdfPreview';
import DownloadPanel from '@/components/DownloadPanel';
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
import Footer from '@/components/Footer';
import { generatePdf } from '@/utils/pdfGenerator';
import { validateImageFile } from '@/utils/fileValidation';
import { loadImage } from '@/utils/imageUtils';

export default function Home() {
  const [activeTab, setActiveTab] = useState('image-to-pdf');

  // Page refresh ya load hone par hash detect karne ke liye
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveTab(hash);
      } else {
        setActiveTab('image-to-pdf');
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Picture to PDF state
  const [images, setImages] = useState([]);
  const [settings, setSettings] = useState({
    pageSize: 'a4',
    orientation: 'portrait',
    imagePlacement: 'fit',
    margins: 'normal',
    filename: 'gd-converted-images.pdf',
  });
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleImagesAdded = (newImages) => {
    setImages((prev) => [...prev, ...newImages]);
    setResult(null);
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
    setResult(null);
  };

  const handleClearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
    setResult(null);
  };

  const handleRotateImage = (id) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
      )
    );
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsConverting(true);
    setProgress(0);
    setResult(null);

    try {
      const pdfResult = await generatePdf({
        images,
        settings,
        onProgress: (p) => setProgress(p),
      });
      setResult(pdfResult);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    handleClearAll();
    setResult(null);
  };

  const handleAddMoreFiles = async (fileList) => {
    const newImages = [];
    for (let file of fileList) {
      const val = validateImageFile(file);
      if (val.isValid) {
        try {
          const loaded = await loadImage(file);
          newImages.push(loaded);
        } catch (e) {
          console.error(e);
        }
      }
    }
    if (newImages.length > 0) {
      handleImagesAdded(newImages);
    }
  };

  return (
    <div className="flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
      
      {/* Header component yahan add kar diya hai */}
      <Header />

      <div className="flex-grow">
        {/* TAB 1: Image to PDF */}
        {activeTab === 'image-to-pdf' && (
          <>
            <HeroSection 
              onGetStarted={() => {
                const element = document.getElementById('converter-workspace');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }} 
            />

            <main id="converter-workspace" className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
              {images.length === 0 ? (
                <UploadArea onImagesAdded={handleImagesAdded} />
              ) : (
                <div className="space-y-8 animate-fade-in">
                  <ImageList
                    images={images}
                    onRemove={handleRemoveImage}
                    onClearAll={handleClearAll}
                    onRotate={handleRotateImage}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    onAddMoreClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.multiple = true;
                      input.accept = 'image/jpeg,image/png,image/webp';
                      input.onchange = (e) => {
                        if (e.target.files) handleAddMoreFiles(Array.from(e.target.files));
                      };
                      input.click();
                    }}
                  />
                  <PdfSettings settings={settings} onChange={setSettings} />
                  <PdfPreview images={images} settings={settings} />
                  <DownloadPanel
                    onConvert={handleConvert}
                    isConverting={isConverting}
                    progress={progress}
                    result={result}
                    onReset={handleReset}
                  />
                </div>
              )}
            </main>
            <HowItWorks />
            <FaqSection />
          </>
        )}

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

      <Footer />
    </div>
  );
}