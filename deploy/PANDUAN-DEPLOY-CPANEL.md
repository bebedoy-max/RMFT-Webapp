# Panduan Deploy — BO Teluk Betung ke cPanel HawkHost (Node.js + PostgreSQL)

Aplikasi ini sudah **lepas total dari Lovable/Supabase**. Semua autentikasi dan
akses data berjalan lewat API internal Node.js yang terhubung langsung ke
PostgreSQL milik Anda.

```
Browser ──> Node.js (TanStack Start / Nitro) ──> PostgreSQL (cPanel)
             ├─ /api/public/auth/v1/*   login, refresh, logout, user
             └─ /api/public/rest/v1/*   CRUD tabel + rpc(run_compare)
```

---

## 0. Yang Anda butuhkan

| Item | Nilai |
|---|---|
| Nama database | `teknolo8_boteluk_uji` |
| User database | `teknolo8_botelukuji` |
| Password database | `Cilla112233!!` |
| Login aplikasi awal | username `admin` / password `admin123` |
| Node.js di cPanel | versi **20** atau **22** |

---

## 1. Buat database PostgreSQL di cPanel

1. Masuk cPanel → **Databases → PostgreSQL Databases**.
2. **Create New Database**: isi `boteluk_uji` (cPanel otomatis menambah prefix
   sehingga menjadi `teknolo8_boteluk_uji`).
3. **Add New User**: isi `botelukuji` → password `Cilla112233!!` → *Create User*
   (hasilnya `teknolo8_botelukuji`).
4. **Add User To Database**: pilih user + database → beri **ALL PRIVILEGES**.

## 2. Import struktur database

Gunakan **Terminal** di cPanel (atau SSH):

```bash
cd ~
psql -U teknolo8_botelukuji -d teknolo8_boteluk_uji -f ~/database.sql
```

Jika diminta password, isi `Cilla112233!!`.
Bila Terminal tidak tersedia, buka **phpPgAdmin → pilih database → tab SQL →**
tempel isi `database.sql` → *Go*.

Verifikasi:

```bash
psql -U teknolo8_botelukuji -d teknolo8_boteluk_uji -c "select username, role from app_users;"
```

Harus muncul baris `admin | admin`.

## 3. Build aplikasi (di komputer lokal)

Butuh Node.js 20+ terpasang di komputer Anda.

```bash
npm install
npm run build:node
```

Hasil build ada di folder **`build-node/`**.

> Bundel browser tidak lagi mengunci nama domain: `VITE_SUPABASE_URL=self`
> membuat aplikasi memakai domain yang sedang dibuka + `/api/public`. Jadi hasil
> build sama bisa dipakai di domain mana pun.

## 4. Siapkan file `.env`

Salin `.env.example` menjadi `.env` (file `.env` siap pakai sudah disertakan),
lalu sesuaikan `SUPABASE_URL` dengan domain Anda:

```env
SELF_HOST=true
NODE_ENV=production

PGHOST=127.0.0.1
PGPORT=5432
PGDATABASE=teknolo8_boteluk_uji
PGUSER=teknolo8_botelukuji
PGPASSWORD=Cilla112233!!
PGSSL=false

JWT_SECRET=<string acak minimal 32 karakter>
ALLOW_SIGNUP=false

# "self" = pakai domain yang sedang dibuka (disarankan)
VITE_SUPABASE_URL=self
VITE_SUPABASE_PUBLISHABLE_KEY=self-hosted
VITE_SUPABASE_PROJECT_ID=selfhost

# Dipakai saat render di server (SSR) — isi dengan domain asli Anda
SUPABASE_URL=https://domain-anda.com/api/public
SUPABASE_PUBLISHABLE_KEY=self-hosted
```


Membuat `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## 5. Upload ke cPanel

Buat folder aplikasi, misalnya `~/apps/boteluk`, lalu upload:

```
~/apps/boteluk/
├── build-node/          ← hasil build (WAJIB)
├── app.js            ← startup file
├── package.json
├── .env              ← isi sesuai langkah 4
└── deploy/database.sql
```

Cara tercepat: kompres `build-node` menjadi zip, upload lewat **File Manager**,
lalu *Extract*. `node_modules` **tidak perlu** diupload — Nitro sudah membundel
seluruh dependensi (termasuk `pg`, `bcryptjs`, `jose`) ke dalam `build-node`.

## 6. Setup Node.js App di cPanel

cPanel → **Software → Setup Node.js App → Create Application**

| Field | Isi |
|---|---|
| Node.js version | 20.x atau 22.x |
| Application mode | Production |
| Application root | `apps/boteluk` |
| Application URL | domain/subdomain Anda |
| Application startup file | `app.js` |

Lalu:

1. Klik **Create**.
2. Buka lagi aplikasinya → bagian **Environment variables**, tambahkan minimal
   `SELF_HOST=true` dan `JWT_SECRET=...` (opsional bila `.env` sudah ada —
   `app.js` membaca `.env` otomatis).
3. Klik **Run NPM Install** (opsional, aman dilewati karena `build-node` mandiri).
4. Klik **Restart**.

## 7. Pasang `.htaccess`

File `public/.htaccess` berisi paksa-HTTPS, header keamanan, kompresi, dan
pemblokiran file sensitif. Salin isinya ke `.htaccess` di document root domain
Anda — **tambahkan di bawah** baris `PassengerAppRoot` yang dibuat cPanel,
jangan menimpanya.

## 8. Uji coba

1. Buka `https://domain-anda.com` → muncul halaman login.
2. Login `admin` / `admin123`.
3. Cek halaman **Activity Logs** — baris login harus tercatat.
4. **Segera ganti password admin** di menu *Users*.

---

## Perawatan

**Update aplikasi:** build ulang di lokal (`npm run build:node`), upload folder
`build-node` yang baru (timpa), lalu **Restart** di Setup Node.js App.

**Backup database:**

```bash
pg_dump -U teknolo8_botelukuji teknolo8_boteluk_uji > backup-$(date +%F).sql
```

**Bersihkan token kedaluwarsa** (Cron Jobs cPanel, mingguan):

```bash
psql -U teknolo8_botelukuji -d teknolo8_boteluk_uji -c "delete from auth_refresh_tokens where expires_at < now();"
```

---

## Pemecahan masalah

| Gejala | Penyebab & solusi |
|---|---|
| 503 / Passenger error | Cek **stderr log** di Setup Node.js App. Biasanya `build-node` belum diupload atau versi Node terlalu lama. |
| "JWT_SECRET belum diset" | `.env` tidak terbaca. Tambahkan `JWT_SECRET` lewat *Environment variables* cPanel. |
| Login gagal "Username atau password salah" | `database.sql` belum diimport, atau user `admin` belum ada. Jalankan ulang langkah 2. |
| Halaman kosong / request ke `supabase.co` | `VITE_SUPABASE_URL` bukan `self`/URL yang benar saat build. Perbaiki `.env` lalu **build ulang**. |
| `password authentication failed` | Password/user PostgreSQL salah, atau user belum ditambahkan ke database dengan ALL PRIVILEGES. |
| `relation "app_users" does not exist` | Import `database.sql` belum berhasil. |

---

## Catatan keamanan

- Ganti `admin123` setelah login pertama.
- `JWT_SECRET` wajib acak dan rahasia; menggantinya akan memaksa semua pengguna login ulang.
- Biarkan `ALLOW_SIGNUP=false` agar akun hanya dibuat admin lewat menu *Users*.
- Jangan pernah menaruh `.env` atau `database.sql` di dalam `public_html` yang bisa diakses publik.
