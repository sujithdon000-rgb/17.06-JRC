-- DISABLE RLS FOR ADMIN TABLES TO ALLOW FRONTEND ADMIN PANEL TO SAVE
ALTER TABLE public.offer_config DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_banners DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.color_variants DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_banners DISABLE ROW LEVEL SECURITY;

-- ALLOW PUBLIC STORAGE UPLOADS FOR PRODUCT & BANNER IMAGES
DROP POLICY IF EXISTS "product_images_upload_public" ON storage.objects;
CREATE POLICY "product_images_upload_public" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "banner_images_upload_public" ON storage.objects;
CREATE POLICY "banner_images_upload_public" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'banner-images');

