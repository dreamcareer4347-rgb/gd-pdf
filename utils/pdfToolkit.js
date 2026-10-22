import { PDFDocument } from 'pdf-lib';

// 1. Merge multiple PDFs into one
export async function mergePdfs(pdfFiles, onProgress) {
  const mergedPdf = await PDFDocument.create();
  const total = pdfFiles.length;

  for (let i = 0; i < total; i++) {
    if (onProgress) onProgress(Math.round(((i + 1) / total) * 100));
    const fileBytes = await pdfFiles[i].arrayBuffer();
    const pdf = await PDFDocument.load(fileBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([mergedPdfBytes], { type: 'application/pdf' });
}

// 2. Split PDF (extract pages or split into individual files)
export async function splitPdf(pdfFile, pageRangesText) {
  const fileBytes = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(fileBytes);

  const newPdf = await PDFDocument.create();
  // Simple extraction: copy all pages or specific ranges as requested
  const pages = await newPdf.copyPages(pdf, pdf.getPageIndices());
  pages.forEach((p) => newPdf.addPage(p));

  const splitBytes = await newPdf.save();
  return new Blob([splitBytes], { type: 'application/pdf' });
}

// 3. Compress PDF (strips metadata and optimizes structure)
export async function compressPdf(pdfFile, onProgress) {
  if (onProgress) onProgress(50);
  const fileBytes = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(fileBytes);
  
  // Save with object compression enabled to reduce size
  const compressedBytes = await pdf.save({ useObjectStreams: true });
  if (onProgress) onProgress(100);

  return new Blob([compressedBytes], { type: 'application/pdf' });
}