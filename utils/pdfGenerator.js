import { jsPDF } from 'jspdf';

export async function generatePdf({
  images,
  settings,
  onProgress
}) {
  const {
    pageSize = 'a4', // 'a4', 'letter', 'fit'
    orientation = 'portrait', // 'portrait', 'landscape', 'auto'
    imagePlacement = 'fit', // 'fit', 'fill', 'original'
    margins = 'normal', // 'none', 'small', 'normal'
    filename = 'gd-converted-images.pdf'
  } = settings || {};

  // Margin sizes in mm
  const marginMap = {
    none: 0,
    small: 5,
    normal: 10,
  };
  const margin = marginMap[margins] ?? 10;

  // Standard dimensions in mm
  const dimensions = {
    a4: { width: 210, height: 297 },
    letter: { width: 215.9, height: 279.4 },
  };

  let pdf = null;
  const total = images.length;

  for (let i = 0; i < total; i++) {
    if (onProgress) {
      onProgress(Math.round(((i + 1) / total) * 100));
    }

    const imgMeta = images[i];
    
    // Load image data into canvas to get base64 / dimensions
    const imgData = await loadImageElement(imgMeta.url);
    
    // Determine effective width and height accounting for rotation
    let imgW = imgMeta.width;
    let imgH = imgMeta.height;
    if (imgMeta.rotation === 90 || imgMeta.rotation === 270) {
      const temp = imgW;
      imgW = imgH;
      imgH = temp;
    }

    // Determine page dimensions and orientation
    let pWidth, pHeight, pOrientation;

    if (pageSize === 'fit') {
      // Fit to Image: page size matches image proportions + margins
      const convW = imgW * 0.264583; // px to mm approx at 96 DPI
      const convH = imgH * 0.264583;
      pWidth = convW + margin * 2;
      pHeight = convH + margin * 2;
      pOrientation = pWidth > pHeight ? 'landscape' : 'portrait';
    } else {
      const baseDim = dimensions[pageSize] || dimensions.a4;
      if (orientation === 'auto') {
        pOrientation = imgW > imgH ? 'landscape' : 'portrait';
      } else {
        pOrientation = orientation;
      }

      pWidth = pOrientation === 'landscape' ? baseDim.height : baseDim.width;
      pHeight = pOrientation === 'landscape' ? baseDim.width : baseDim.height;
    }

    // Initialize jsPDF instance on first image or add new page
    if (i === 0) {
      pdf = new jsPDF({
        orientation: pOrientation,
        unit: 'mm',
        format: pageSize === 'fit' ? [pWidth, pHeight] : pageSize,
      });
    } else {
      pdf.addPage(pageSize === 'fit' ? [pWidth, pHeight] : pageSize, pOrientation);
    }

    // Compute drawing area inside margins
    const availW = pWidth - margin * 2;
    const availH = pHeight - margin * 2;

    let drawW = availW;
    let drawH = availH;
    let drawX = margin;
    let drawY = margin;

    if (pageSize !== 'fit') {
      const imgAspect = imgW / imgH;
      const pageAspect = availW / availH;

      if (imagePlacement === 'fit') {
        if (imgAspect > pageAspect) {
          drawW = availW;
          drawH = availW / imgAspect;
          drawY = margin + (availH - drawH) / 2;
        } else {
          drawH = availH;
          drawW = availH * imgAspect;
          drawX = margin + (availW - drawW) / 2;
        }
      } else if (imagePlacement === 'fill') {
        if (imgAspect > pageAspect) {
          drawH = availH;
          drawW = availH * imgAspect;
          drawX = margin + (availW - drawW) / 2;
        } else {
          drawW = availW;
          drawH = availW / imgAspect;
          drawY = margin + (availH - drawH) / 2;
        }
      } else if (imagePlacement === 'original') {
        drawW = imgW * 0.264583;
        drawH = imgH * 0.264583;
        drawX = margin + (availW - drawW) / 2;
        drawY = margin + (availH - drawH) / 2;
      }
    }

    // Apply rotation if needed using temporary canvas
    const processedDataUrl = await getRotatedImageBase64(imgData, imgMeta.rotation || 0);

    pdf.addImage(
      processedDataUrl,
      'JPEG',
      drawX,
      drawY,
      drawW,
      drawH,
      undefined,
      'FAST'
    );
  }

  // Output PDF Blob
  const pdfBlob = pdf.output('blob');
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  
  return { blob: pdfBlob, filename: safeFilename };
}

function loadImageElement(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function getRotatedImageBase64(img, rotation) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (rotation === 90 || rotation === 270) {
    canvas.width = img.height;
    canvas.height = img.width;
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.92);
}