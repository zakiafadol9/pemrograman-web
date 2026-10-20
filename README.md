# SISMARA — Sistem Informasi Surat Menyurat dan Arsip Digital

**Smart Correspondence, Organized Administration.**

Aplikasi **prototipe offline berbasis HTML5, CSS3, dan Vanilla JavaScript** untuk pencatatan surat masuk, pengelolaan surat keluar, disposisi, persetujuan, buku agenda, arsip digital, template, laporan, dan pengaturan administrasi. Dirancang sebagai bahan demonstrasi dan pembelajaran; data disimpan pada **LocalStorage browser** tanpa server atau database.

> **PENTING:** SISMARA bukan sistem produksi atau platform multiuser. Login, role, kata sandi, lampiran, dan audit log hanya simulasi yang dapat diakses atau diubah melalui browser. Jangan gunakan informasi rahasia atau dokumen kantor asli.

## 1. Teknologi

| Komponen | Teknologi |
|---|---|
| UI | HTML5, CSS3 responsif |
| Logika | JavaScript ES6+ klasik, namespace `window.SISMARA` |
| Data | `LocalStorage`, satu dokumen JSON |
| Sesi demo | `sessionStorage` |
| Grafik | Canvas API native |
| Cetak/PDF | `window.print()` dan Save as PDF browser |
| Backup dan laporan | JSON, CSV |
| Server | Tidak diperlukan |

Tanpa PHP, Python, Node backend, Laravel, database server, framework UI, CDN, atau dependensi runtime pihak ketiga.

## 2. Cara Menjalankan

1. Ekstrak berkas ZIP, jangan mengubah struktur folder.
2. Masuk ke folder `sismara/`.
3. **Klik dua kali `index.html`** di Chrome atau Edge modern.
4. Login menggunakan akun demo yang tersedia.
5. Gunakan menu sidebar untuk menjalankan semua modul.

Bila kebijakan browser tertentu memblokir akses `file://` atau fitur storage, buka folder melalui penyaji file statis pilihan Anda; hal tersebut opsional, bukan syarat desain aplikasi. Penyimpanan antar-browser atau mode private/incognito dapat berbeda.

## 3. Akun Demonstrasi

| Peran | Email | Kata sandi |
|---|---|---|
| Super Admin | `admin@sismara.demo` | `Admin123!` |
| Pimpinan | `pimpinan@sismara.demo` | `Pimpinan123!` |
| Tata Usaha | `tu@sismara.demo` | `TataUsaha123!` |
| Staf | `staf@sismara.demo` | `Staf123!` |
| Arsiparis | `arsip@sismara.demo` | `Arsip123!` |

Lima akun tambahan disediakan pada data awal. Di halaman login, klik contoh akun untuk mengisi email dan password secara otomatis. **Password memang disimpan sebagai teks untuk demo.** Jangan menggunakan password riil.

## 4. Fitur Utama

| Modul | Fitur |
|---|---|
| Dashboard | 12 statistik ringkas, grafik surat enam bulan, grafik status disposisi, surat dan tugas terbaru |
| Surat masuk | Tambah, detail, edit, pencarian, status, klasifikasi, lampiran kecil, pencetakan, disposisi, arsip |
| Surat keluar | Draft, edit, ajukan, revisi, persetujuan, penomoran, pengiriman, cetak, arsip |
| Disposisi | Tetapkan staf, instruksi, tenggat, tindak lanjut, penyelesaian, pencetakan |
| Persetujuan | Keputusan Pimpinan, catatan revisi, riwayat keputusan |
| Buku agenda | Diambil langsung dari data surat, filter jenis/tanggal, cetak, CSV |
| Arsip digital | Tampilan tabel/kartu, cari, filter, detail, lokasi fisik, cetak metadata |
| Template | 10 template bawaan, tambah/edit, generator isi surat, cetak A4 |
| Klasifikasi | CRUD aktif/edit/nonaktif, validasi kode unik |
| Kontak | CRUD, nonaktifkan, riwayat surat dengan instansi |
| Laporan | Rekap dinamis, filter, unduh CSV/JSON, cetak/PDF |
| Pengguna | Tambah/edit/nonaktif, ubah role, password demo; khusus Super Admin |
| Notifikasi | Surat diajukan, hasil persetujuan, disposisi, tandai dibaca/hapus |
| Riwayat | Catatan aktivitas lokal, pencarian, ekspor CSV |
| Pengaturan | Profil instansi, penomoran, light/dark, backup JSON, restore, reset demo |
| Profil | Ubah identitas dan password demo |

**Catatan cakupan:** Penghapusan surat masuk dibatasi sesuai prinsip retensi administrasi; prototipe menggunakan opsi pengarsipan, bukan penghapusan permanen pada role biasa. Status yang telah diarsipkan tidak diedit bebas. Notifikasi tidak berjalan ketika aplikasi ditutup.

## 5. Alur Surat Masuk

1. Login sebagai Tata Usaha / Super Admin.
2. Pilih **Surat Masuk → Tambah Surat Masuk**.
3. Isi tanggal, pengirim, perihal, klasifikasi, dan sifat surat.
4. Aplikasi mencadangkan nomor agenda lalu menyimpan surat dan log.
5. Pilih **Disposisi** untuk menunjuk staf serta tenggat.
6. Login sebagai staf penerima untuk memperbarui status dan catatan tindak lanjut.
7. Setelah selesai, arsipkan melalui **Surat Masuk → Detail → Arsipkan**.

## 6. Alur Surat Keluar

1. Login sebagai Tata Usaha atau Staf.
2. **Surat Keluar → Buat Surat Keluar**, isi konten, simpan Draft.
3. Pada baris surat klik **Ajukan**.
4. Login sebagai **Pimpinan**, buka **Persetujuan**.
5. Setujui atau kembalikan dengan catatan revisi.
6. Jika disetujui, aplikasi menetapkan **nomor surat resmi**.
7. Login sebagai Tata Usaha, buka surat dengan status **Disetujui**, pilih **Tandai Dikirim**.
8. Isi tanggal serta metode pengiriman, lalu **Arsipkan**.

Nomor resmi berformat default `001/SK/ADM/X/2026`, dan format dapat disesuaikan dalam Pengaturan. Aturan nomor mempertimbangkan jenis surat, klasifikasi, bulan, tahun, dan urutan yang tersimpan. Nomor yang sudah pernah dicadangkan tidak dikembalikan saat surat dibatalkan.

## 7. Disposisi dan Arsip Digital

- Pimpinan/TU dapat menerbitkan disposisi untuk surat masuk yang tersedia.
- Penerima disposisi dapat mencatat status dan riwayat tindak lanjut.
- Alur normal: **Baru → Diterima → Dalam Proses → Selesai**.
- Arsip berisi jenis surat, klasifikasi, kode, tanggal, dan lokasi fisik.
- Lampiran didukung dalam format **PDF, PNG, JPG/JPEG, atau TXT** hingga **180 KB** per berkas; kapasitas LocalStorage keseluruhan bergantung browser.
- Tidak ada pengunggahan ke server.

## 8. Pencetakan dan Penyimpanan PDF

Klik tombol **Cetak** dari detail surat, lembar agenda, lembar disposisi, laporan, atau generator template. Browser membuka pratinjau cetak; pilih printer atau **Save as PDF / Simpan sebagai PDF**. Ukuran kertas ditata untuk A4.

## 9. Backup dan Restore

Login sebagai Super Admin lalu buka **Pengaturan**. Pilih **Unduh Backup JSON** untuk menyimpan salinan data lengkap. Untuk memulihkan, unggah berkas JSON SISMARA pada formulir Restore, kemudian konfirmasi penggantian seluruh data. **Restore akan menimpa data saat ini**. File backup dapat mengandung kata sandi demo serta lampiran sehingga harus disimpan dengan hati-hati.

## 10. Struktur Proyek

```text
sismara/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── login.css
│   │   ├── dashboard.css
│   │   ├── forms.css
│   │   ├── tables.css
│   │   ├── print.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── utils.js
│   │   ├── storage.js
│   │   ├── seed.js
│   │   ├── auth.js
│   │   ├── ui.js
│   │   ├── dashboard.js
│   │   ├── surat-masuk.js
│   │   ├── surat-keluar.js
│   │   ├── disposisi.js
│   │   ├── persetujuan.js
│   │   ├── agenda.js
│   │   ├── arsip.js
│   │   ├── template.js
│   │   ├── klasifikasi.js
│   │   ├── kontak.js
│   │   ├── laporan.js
│   │   ├── pengguna.js
│   │   ├── notifikasi.js
│   │   ├── settings.js
│   │   └── app.js
│   └── images/
│       ├── logo/
│       └── avatars/
└── docs/
    ├── ERD.md
    ├── use-case.md
    ├── activity-diagram.md
    ├── sequence-diagram.md
    ├── class-diagram.md
    └── flowchart.md
```

## 11. Struktur Data dan Arsitektur

- Objek data utama memuat `users`, `roles`, `departments`, `incoming_letters`, `outgoing_letters`, `dispositions`, `disposition_followups`, `approvals`, `agendas`, `archives`, `letter_templates`, `classifications`, `contacts`, `attachments`, `notifications`, `activity_logs`, `numbering_sequences`, serta `settings`.
- Perubahan melalui `S.commit()` menyalin data, menerapkan mutasi dan log, lalu melakukan satu operasi `localStorage.setItem`. Jika gagal, status data pada memori tidak diganti.
- Agenda dibangun dari surat masuk dan surat keluar yang sudah mendapatkan nomor resmi sehingga tidak terjadi duplikasi entri yang terlepas dari surat induk.
- Berkas dalam `docs/` berisi rancangan logis sistem berbasis Mermaid, termasuk ERD untuk pengembangan database sesungguhnya.

## 12. Pengujian dan Batasan

Gunakan skenario berikut untuk uji manual:

- Login setiap role, cek menu dan akses tindakan.
- Tambahkan surat masuk, cek dashboard dan agenda.
- Edit surat masuk, buat disposisi, login staf penerima, selesaikan tindak lanjut.
- Buat draft keluar, ajukan, putuskan dengan Pimpinan, kirim sebagai TU, arsipkan.
- Cek nomor resmi dan agenda tidak berulang.
- Filter buku agenda dan laporan, unduh CSV/JSON.
- Buat backup, ubah data, pulihkan backup dan cek perubahan.
- Refresh halaman dan pastikan data yang tersimpan tetap ada.
- Uji layar mobile, dark mode, dan file yang melebihi batas 180 KB.

Pemeriksaan sintaks JavaScript, perenderan seluruh halaman dalam lingkungan simulasi, alur surat masuk/keluar, validasi penomoran, role, dan backup sudah diuji. Detail hasil serta keterbatasan pengujian browser tercantum pada [`docs/hasil-pengujian.md`](docs/hasil-pengujian.md).

**Batasan penting:**

- LocalStorage bergantung browser dan tidak menyediakan transaksi antarpengguna, otorisasi sebenarnya, enkripsi database, log audit yang tidak dapat diubah, atau sinkronisasi lintas perangkat.
- Menghapus data browser, mode privat, atau pembatasan storage dapat menghilangkan data demo.
- Password plaintext sengaja untuk demonstrasi; bukan praktik aman untuk aplikasi produksi.
- Menonaktifkan JavaScript akan membuat prototipe tidak dapat digunakan.
- Data fiktif tidak mencerminkan instansi nyata; belum ada email gateway, notifikasi push, tanda tangan elektronik tersertifikasi, OCR, atau penyimpanan file di cloud.

## 13. Rencana Pengembangan Berikutnya

Integrasi backend dan database relasional, autentikasi server-side, hashing password, otorisasi granular, penyimpanan objek untuk dokumen, antivirus scan, nomor atomik antarpengguna, audit trail immutable, tanda tangan elektronik sesuai ketentuan, notifikasi terjadwal, dan retensi arsip merupakan pekerjaan lanjutan yang memerlukan infrastruktur tersendiri.

---

**SISMARA — Smart Correspondence, Organized Administration.**
