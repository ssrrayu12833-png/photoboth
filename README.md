# Photobooth Web (HTML + Firebase)

Semua HTML biasa, tanpa server. Firebase dipakai untuk:
- **Realtime Database** — jembatan komunikasi tablet ↔ HP kamera (preview & sinyal capture)
- **Storage** — simpan foto hasil, supaya bisa diambil lewat QR

Hosting pakai **GitHub Pages** — gratis dan otomatis HTTPS (jadi kamera HP bisa langsung dipakai).

---

## Langkah 1 — Buat project Firebase

1. Buka https://console.firebase.google.com → **Add project** → beri nama bebas → lanjut sampai selesai.
2. Di menu kiri, klik **Build > Realtime Database** → **Create Database** → pilih lokasi (misal Singapore) →
   pilih **Start in test mode** (biar gampang dulu, nanti bisa dikencangkan keamanannya).
3. Di menu kiri, klik **Build > Storage** → **Get started** → pilih **Start in test mode** juga.
4. Klik ikon gerigi (⚙️) pojok kiri atas → **Project settings** → scroll ke bawah ke
   **Your apps** → klik ikon `</>` (Web) → kasih nama app → **Register app**.
5. Firebase akan kasih kode config seperti ini — **copy semua isinya**:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "namaproject.firebaseapp.com",
     databaseURL: "https://namaproject-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "namaproject",
     storageBucket: "namaproject.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
6. Buka file **`firebase-config.js`** di folder ini, ganti isinya dengan config yang tadi kamu copy.

---

## Langkah 2 — Upload ke GitHub

1. Buka https://github.com → **New repository** → kasih nama (misal `photobooth`) → Create.
2. Upload semua file di folder ini ke repo itu (bisa drag-and-drop lewat web GitHub:
   buka repo → **Add file > Upload files** → seret semua file → **Commit changes**).
3. Buka tab **Settings** di repo → menu kiri **Pages** → di bagian **Branch**,
   pilih `main` dan folder `/ (root)` → **Save**.
4. Tunggu 1-2 menit, nanti muncul link seperti:
   `https://username-kamu.github.io/photobooth/`

Itu link website kamu — sudah HTTPS otomatis.

---

## Langkah 3 — Pemakaian

1. Buka `https://username-kamu.github.io/photobooth/tablet.html` di **tablet**.
   URL otomatis dapat kode room, misal `?room=ab12cd`.
2. Buka `https://username-kamu.github.io/photobooth/camera.html?room=ab12cd` di **HP kamu**
   (kode room harus SAMA PERSIS dengan yang ada di URL tablet).
3. Tekan **Aktifkan Kamera** di HP → izinkan akses kamera → tablet akan menampilkan
   preview live dari HP (update tiap 0.6 detik).
4. Di tablet: pilih template → tekan **Ambil Foto** → countdown 3 detik → foto diambil
   dari HP, digabung template, otomatis diupload, lalu muncul **QR code**.
5. Tamu scan QR pakai HP mereka sendiri → muncul halaman hasil foto dengan tombol
   **Download** dan **Bagikan** (bagikan langsung ke WhatsApp lewat menu share bawaan HP).

---

## Mengganti template dengan desain dari Canva

Template sekarang dibuat langsung dari kode (border + warna + caption) di `tablet.html`,
bagian array `templates`. Untuk pakai desain asli dari Canva:

1. Desain frame di Canva dengan **lubang transparan** di tengah untuk foto.
2. Export sebagai PNG dengan background transparan, taruh di folder ini (misal `templates/frame1.png`).
3. Di `tablet.html`, ganti fungsi `composeWithTemplate` supaya:
   - gambar foto tamu dulu di canvas,
   - lalu gambar file PNG frame di atasnya (frame harus punya area transparan
     supaya foto tamu tetap kelihatan).

## Penting soal keamanan (sebelum dipakai di acara sungguhan)

"Test mode" di Realtime Database & Storage artinya **siapa saja bisa baca/tulis** data kamu
kalau tahu URL project-nya. Ini oke untuk uji coba, tapi sebelum acara sungguhan:
- Set expiry otomatis test mode biasanya 30 hari, setelah itu akses tertutup total kalau tidak diubah.
- Sebaiknya ubah **Rules** di Realtime Database & Storage supaya lebih aman
  (misalnya batasi ukuran file, atau minimal ganti dari test mode ke rules kustom).
  Kalau butuh, bilang saja nanti saya bantu buatkan rules yang lebih aman.

## Struktur file

```
photobooth-firebase/
├── firebase-config.js   # WAJIB DIISI dengan config project Firebase kamu
├── index.html           # halaman pilih tablet/camera
├── tablet.html          # layar & kontrol utama
├── camera.html          # halaman kamera HP
└── view.html            # halaman hasil untuk tamu (dibuka dari QR)
```
