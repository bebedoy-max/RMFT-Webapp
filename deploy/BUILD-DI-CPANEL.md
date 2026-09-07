# Build Aplikasi (folder hasil build: `build-node/`)

Hasil build sekarang disimpan di folder **`build-node/`** (bukan `.output` yang
diawali titik, karena folder berawalan titik itu **disembunyikan** oleh Finder
macOS dan File Manager cPanel — itu sebabnya sebelumnya kelihatan "tidak ada").

`app.js` tetap kompatibel: ia memakai `build-node/` bila ada, kalau tidak ada
baru memakai `.output/` lama.

## Cara A (paling mudah): build langsung di cPanel

1. Download ZIP source dari Lovable → upload & **Extract** di cPanel File
   Manager ke folder aplikasi (mis. `~/ujicobaft`). Jangan hapus `.env`.
2. cPanel → **Setup Node.js App** → copy baris
   *"Enter to the virtual environment..."*, contoh:
   ```
   source /home/teknolo8/nodevenv/ujicobaft/22/bin/activate && cd /home/teknolo8/ujicobaft
   ```
3. cPanel → **Terminal** → tempel baris itu → Enter.
4. Jalankan:
   ```bash
   rm -rf build-node .output node_modules/.vite
   npm install
   npm run build:node
   ```
5. Setup Node.js App → **Restart**, lalu buka situs dengan Ctrl+Shift+R.

## Cara B: build di MacBook lalu upload

```bash
cd /path/ke/folder-project
npm install
npm run build:node
ls -la build-node        # pastikan ada folder server/ dan public/
zip -r build-node.zip build-node
```

Lalu di cPanel File Manager: hapus folder `build-node/` (dan `.output/` lama bila
ada) → upload `build-node.zip` → **Extract** → **Restart** aplikasi.

## Tips

- Di Finder, tekan **Cmd + Shift + . (titik)** untuk menampilkan folder
  tersembunyi seperti `.output`/`.env`.
- Jangan pakai `npm run build` (itu build untuk Lovable/Cloudflare, hasilnya di
  `dist/`). Untuk cPanel selalu `npm run build:node`.
- Bila `npm install`/build gagal karena memori:
  ```bash
  NODE_OPTIONS=--max-old-space-size=1024 npm run build:node
  ```
- Startup file tetap `app.js`, Application root = folder aplikasi.
