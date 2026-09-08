# Panduan Deploy ke Coolify (memakai Supabase Anda)

Alur yang benar:

```
Browser
  → Aplikasi (Coolify)
  → /api/public/auth/v1/* dan /api/public/rest/v1/*   (proxy same-origin)
  → Supabase Kong → GoTrue / PostgREST → PostgreSQL Supabase
```

Aplikasi **tidak pernah** menghubungi PostgreSQL secara langsung. Jika muncul
pesan `connect ECONNREFUSED 127.0.0.1:5432`, berarti server masih menjalankan
build lama. Konfigurasi Nixpacks dalam repositori sekarang membersihkan hasil
lama dan selalu membuat `build-node/` baru saat deploy.

## 1. Environment Variables di Coolify

| Nama | Nilai |
|---|---|
| `SB_URL` | alamat Supabase Anda, tanpa garis miring di akhir |
| `SB_PUBLISHABLE_KEY` | publishable / anon key |
| `SB_SERVICE_ROLE_KEY` | service role key (rahasia) |
| `NODE_ENV` | `production` |
| `ALLOW_SIGNUP` | `false` |

Jangan set `SELF_HOST`, `DATABASE_URL`, atau variabel `PG*` apa pun.

## 2. Build & start

```
Build:  npm run build:node
Start:  npm run start
```

Pastikan **Branch** di Coolify adalah `main`. Jika Build Pack memakai Nixpacks,
biarkan perintah otomatis karena `nixpacks.toml` sudah mengaturnya. Jika Anda
pernah mengisi perintah manual, gunakan nilai di atas dan lakukan redeploy tanpa
build cache satu kali.

## 3. Cek setelah deploy

Buka `https://alamat-anda/api/public/diag`. Harus tampil alamat Supabase Anda
dan kedua kunci bernilai `true`. Bila `supabase_url` kosong, tambahkan `SB_URL`
lalu redeploy.

## 4. Akun admin

1. Supabase → Authentication → Users → tambah user (mis. `admin@app.local`),
   centang konfirmasi email.
2. Jalankan `deploy/promote-admin.sql` di SQL Editor, sesuaikan emailnya.
