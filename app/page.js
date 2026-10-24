'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import UploadArea from '@/components/UploadArea';
import ImageList from '@/components/ImageList';
import PdfSettings from '@/components/PdfSettings';
import PdfPreview from '@/components/PdfPreview';
import DownloadPanel from '@/components/DownloadPanel';
import MergePdf from '@/components/MergePdf';
import CompressPdf from '@/components/CompressPdf';
import ImageResizer from '@/components/ImageResizer';
import HowItWorks from '@/components/HowItWorks';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import { generatePdf } from '@/utils/pdfGenerator';
import { validateImageFile } from '@/utils/fileValidation';
import { loadImage } from '@/utils/imageUtils';

export default function Home() {
  const [activeTab, setActiveTab] = useState('image-to-pdf');

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

  // Add images
  const handleImagesAdded = (newImages) => {
    setImages((prev) => [...prev, ...newImages]);
    setResult(null);
  };

  // Remove single image
  const handleRemoveImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
    setResult(null);
  };

  // Clear all images
  const handleClearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
    setResult(null);
  };

  // Rotate image 90 degrees
  const handleRotateImage = (id) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
      )
    );
  };

  // Move up
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

  // Move down
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

  // Convert to PDF action
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
      alert('Failed to generate PDF. Please try again with smaller or fewer images.');
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
      {/* Header with Active Tabs State */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-grow">
        {/* TAB 1: Picture to PDF */}
        {activeTab === 'image-to-pdf' && (
          <>
            <HeroSection 
              onGetStarted={() => {
                const element = document.getElementById('converter-workspace');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
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
                        if (e.target.files) {
                          handleAddMoreFiles(Array.from(e.target.files));
                        }
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

        {/* TAB 2: Resize Image */}
        {activeTab === 'resize-image' && (
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
            <ImageResizer />
          </main>
        )}

        {/* TAB 3: Merge PDF */}
        {activeTab === 'merge-pdf' && (
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
            <MergePdf />
          </main>
        )}

        {/* TAB 4: Compress PDF */}
        {activeTab === 'compress-pdf' && (
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
            <CompressPdf />
          </main>
        )}

        {/* TAB 5: Split PDF */}
        {activeTab === 'split-pdf' && (
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12 text-center py-20 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Split PDF Tool</h2>
            <p className="text-slate-600 max-w-md mx-auto">Extract and split individual pages from your PDF documents securely in your browser.</p>
            <div className="pt-4 max-w-xl mx-auto">
              <CompressPdf />
            </div>
          </main>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}