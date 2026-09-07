-- ============================================================================
-- Hapus akun admin lama yang dibuat langsung ke tabel internal Auth.
-- Jalankan SATU KALI di SQL Editor sebelum membuat ulang user lewat Studio.
-- ============================================================================

DO $$
DECLARE uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users WHERE email = 'admin@app.local';

  IF uid IS NULL THEN RETURN; END IF;
  DELETE FROM public.user_roles WHERE user_id = uid;
  DELETE FROM auth.identities WHERE user_id = uid;
  DELETE FROM auth.sessions WHERE user_id = uid;
  DELETE FROM auth.refresh_tokens WHERE user_id = uid::text;
  DELETE FROM auth.mfa_factors WHERE user_id = uid;
  DELETE FROM auth.one_time_tokens WHERE user_id = uid;
  DELETE FROM auth.users WHERE id = uid;
END $$;

-- Berikutnya buat admin@app.local dari Authentication > Users > Add user,
-- centang Auto Confirm User, lalu jalankan deploy/promote-admin.sql.
