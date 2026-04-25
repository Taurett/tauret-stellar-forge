-- Replace overly broad SELECT on return-photos with owner/admin only
DROP POLICY IF EXISTS "Return photos public read" ON storage.objects;

CREATE POLICY "Return photos owner or admin read"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'return-photos'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR public.has_role(auth.uid(), 'admin')
    )
  );

-- Make the bucket private so only signed/authorized fetches work
UPDATE storage.buckets SET public = false WHERE id = 'return-photos';
