# Hasil Pengujian — SISMARA

**Tanggal:** 20 Oktober 2026

Pengujian dilakukan pada source code yang diserahkan menggunakan pemeriksaan parser JavaScript dan *smoke test* JavaScript dengan DOM/storage tiruan. Pengujian visual end-to-end browser belum berhasil dilakukan di lingkungan pembuatan karena kebijakan Chromium memblokir navigasi ke `file://` dan `http://127.0.0.1`.

| Pengujian | Hasil | Keterangan |
|---|---|---|
| Sintaks semua berkas JavaScript | Lulus | `node --check` masing-masing berkas |
| Inisialisasi data demo | Lulus | Data pengguna, surat, disposisi, arsip tersedia |
| Perenderan 16 halaman utama | Lulus | Fungsi HTML setiap halaman menghasilkan markup |
| Login benar / salah | Lulus | Kredensial demo diverifikasi di logika |
| Penomoran agenda | Lulus | Diuji 20 nomor tambahan; tidak terjadi duplikasi setelah koreksi |
| CRUD: tambah surat masuk | Lulus | Data baru tercatat di storage simulasi |
| Alur surat keluar | Lulus | Draft → Diajukan → Disetujui → Bernomor → Dikirim → Diarsipkan |
| Disposisi surat masuk | Lulus | Record disposisi terhubung ke surat asal |
| Aktivitas pengguna | Lulus | Log tindakan utama dicatat |
| Pembatasan role Staf | Lulus | Menu pengguna dan surat masuk tidak dapat diakses |
| Hak Pimpinan | Lulus | Persetujuan tersedia, pembuatan surat dibatasi |
| Hak Tata Usaha | Lulus | Pencatatan surat diizinkan, manajemen pengguna dibatasi |
| Hak Arsiparis | Lulus | Pengarsipan tersedia, pembuatan surat keluar dibatasi |
| Validasi struktur backup | Lulus | File skema valid diterima; skema tak lengkap ditolak |
| Browser end-to-end dan layout responsif | **Belum diverifikasi** | Navigasi otomatis diblokir lingkungan; uji manual di Chrome/Edge disarankan |
| Printer, Save as PDF, file upload | **Belum diverifikasi di browser** | Perlu tes manual pada komputer pengguna |

Tidak ada klaim uji keamanan produksi. Otorisasi frontend, password demo, dan LocalStorage tidak memadai untuk sistem dokumen instansi yang sebenarnya.

## Checklist uji manual yang disarankan

1. Buka `index.html` di browser target, periksa console Developer Tools dan semua halaman sidebar.
2. Uji setiap akun demo, logout, dan refresh browser.
3. Tambahkan dan edit surat masuk; periksa agenda, pencarian, filter, penomoran, dan arsip.
4. Buat surat keluar, ajukan dengan TU/Staf, setujui dengan Pimpinan, lalu kirim sebagai TU.
5. Buat disposisi dan tindak lanjutnya menggunakan akun penerima.
6. Cetak surat dan laporan; lakukan Save as PDF.
7. Uji upload PDF/gambar kecil dan tolak berkas berukuran lebih dari 180 KB.
8. Uji backup/restore, mode gelap, serta ukuran layar 375 px, 768 px, dan 1366 px.
9. Cek batasan role terhadap surat rahasia dan dokumen yang bukan milik staf.
