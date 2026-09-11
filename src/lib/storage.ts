import { supabase } from './supabase';

// ============================================================
// UPLOAD PAYMENT SCREENSHOT
// Uploads to payment-screenshots/{userId}/{orderId}.{ext}
// Returns signed URL valid for 7 days (admin needs to view)
// ============================================================

export async function uploadPaymentScreenshot(
  userId: string,
  orderId: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${userId}/${orderId}_${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('payment-screenshots')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  // Generate signed URL valid for 7 days (admin needs to view)
  const { data, error: signError } = await supabase.storage
    .from('payment-screenshots')
    .createSignedUrl(path, 60 * 60 * 24 * 7);

  if (signError) {
    return { url: null, error: signError.message };
  }

  return { url: data.signedUrl, error: null };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Upload product image
 */
export async function uploadProductImage(
  productId: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  try {
    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `${productId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(path, file, {
        cacheControl: '86400',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.warn('Storage upload error, using Data URL fallback:', uploadError.message);
      const dataUrl = await fileToDataUrl(file);
      return { url: dataUrl, error: null };
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(path);

    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    try {
      const dataUrl = await fileToDataUrl(file);
      return { url: dataUrl, error: null };
    } catch (e: any) {
      return { url: null, error: err?.message || 'Failed to read image file' };
    }
  }
}

/**
 * Upload banner image
 */
export async function uploadBannerImage(
  file: File
): Promise<{ url: string | null; error: string | null }> {
  try {
    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `banners/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('banner-images')
      .upload(path, file, {
        cacheControl: '86400',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.warn('Banner storage upload error, using Data URL fallback:', uploadError.message);
      const dataUrl = await fileToDataUrl(file);
      return { url: dataUrl, error: null };
    }

    const { data } = supabase.storage
      .from('banner-images')
      .getPublicUrl(path);

    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    try {
      const dataUrl = await fileToDataUrl(file);
      return { url: dataUrl, error: null };
    } catch (e: any) {
      return { url: null, error: err?.message || 'Failed to read banner image' };
    }
  }
}

/**
 * Get admin signed URL for payment screenshot
 */
export async function getPaymentScreenshotSignedUrl(
  path: string
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('payment-screenshots')
    .createSignedUrl(path, 60 * 60); // 1 hour

  if (error) return null;
  return data.signedUrl;
}

/**
 * Upload return evidence screenshot to payment-screenshots bucket under returns/ folder
 */
export async function uploadReturnEvidence(
  userId: string,
  returnId: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${userId}/returns/${returnId}_${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('payment-screenshots')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  // Generate signed URL valid for 7 days
  const { data, error: signError } = await supabase.storage
    .from('payment-screenshots')
    .createSignedUrl(path, 60 * 60 * 24 * 7);

  if (signError) {
    return { url: null, error: signError.message };
  }

  return { url: data.signedUrl, error: null };
}

/**
 * Upload product video to product-images bucket
 */
export async function uploadProductVideo(
  productId: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  const ext = file.name.split('.').pop() ?? 'mp4';
  const path = `${productId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(path, file, {
      cacheControl: '86400',
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(path);

  return { url: data.publicUrl, error: null };
}
