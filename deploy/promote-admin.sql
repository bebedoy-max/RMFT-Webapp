-- Jalankan setelah admin@app.local dibuat melalui Supabase Studio.
DO $$
DECLARE uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users WHERE lower(email) = 'admin@app.local';
  IF uid IS NULL THEN
    RAISE EXCEPTION 'User admin@app.local belum ada. Buat melalui Authentication > Users > Add user terlebih dahulu.';
  END IF;

  DELETE FROM public.user_roles WHERE user_id = uid;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin');
END $$;

SELECT u.email, u.email_confirmed_at IS NOT NULL AS terkonfirmasi, r.role
FROM auth.users u
JOIN public.user_roles r ON r.user_id = u.id
WHERE lower(u.email) = 'admin@app.local';