export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function validateImageFile(file) {
  // Check for HEIC / HEIF files
  if (
    file.type === 'image/heic' || 
    file.type === 'image/heif' || 
    file.name.toLowerCase().endsWith('.heic') || 
    file.name.toLowerCase().endsWith('.heif')
  ) {
    return {
      isValid: false,
      error: `HEIC format (${file.name}) is not directly supported in browsers. Please convert to JPG/PNG first.`
    };
  }

  // Check supported MIME types
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Unsupported format for "${file.name}". Please use JPG, PNG, or WebP.`
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File "${file.name}" is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max size is ${MAX_FILE_SIZE_MB}MB.`
    };
  }

  return { isValid: true, error: null };
}