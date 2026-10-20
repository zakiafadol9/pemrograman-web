# Use Case — SISMARA

Aktor: Super Admin, Pimpinan, Tata Usaha, Staf, Arsiparis.

```mermaid
flowchart LR
 Admin[Super Admin] --> Login((Login / Logout))
 Leader[Pimpinan] --> Login
 TU[Tata Usaha] --> Login
 Staff[Staf] --> Login
 Archive[Arsiparis] --> Login
 Admin --> ManageUsers((Kelola Pengguna))
 Admin --> Settings((Pengaturan / Backup))
 Admin --> Audit((Lihat Log))
 TU --> Incoming((CRUD Surat Masuk))
 TU --> Outgoing((Buat dan Kirim Surat Keluar))
 Leader --> Approval((Setujui / Revisi))
 Leader --> Disposition((Buat Disposisi))
 TU --> Disposition
 Staff --> Followup((Tindak Lanjut Disposisi))
 Staff --> Outgoing
 Archive --> Archives((Kelola Metadata Arsip))
 TU --> Archives
 Archive --> Classify((Klasifikasi Surat))
 TU --> Classify
 Leader --> Reports((Laporan))
 TU --> Reports
 Archive --> Reports
 Admin --> Reports
```

## Matriks akses singkat

| Modul | Admin | Pimpinan | Tata Usaha | Staf | Arsiparis |
|---|---|---|---|---|---|
| Dashboard & profil | Ya | Ya | Ya | Ya | Ya |
| Surat masuk | Penuh | Baca | CRUD | Terbatas | Baca non-rahasia |
| Surat keluar | Penuh | Baca/tinjau | Buat/kirim | Draft sendiri | — |
| Persetujuan | Penuh | Putuskan | — | — | — |
| Disposisi | Penuh | Buat | Buat | Milik sendiri | — |
| Arsip | Penuh | Baca | Kelola | — | Kelola |
| Pengguna / settings | Penuh | — | — | — | — |

Matriks ini menggambarkan **pembatasan antarmuka simulasi**, bukan kontrol akses yang aman di server.
