-- Replace broad SELECT policy with one that only allows authenticated listing.
-- Direct URL access still works because the bucket is marked `public` (signed-style URLs).
DROP POLICY IF EXISTS "Review photos are publicly readable" ON storage.objects;

CREATE POLICY "Authenticated can list review photos"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'review-photos');