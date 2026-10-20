# ERD Logis — SISMARA

Dokumen ini merupakan rancangan basis data **untuk pengembangan backend di kemudian hari**. Prototipe yang diserahkan menyimpan semua data dalam satu objek JSON di LocalStorage; tabel SQL berikut *belum* digunakan di runtime.

```mermaid
erDiagram
    ROLES ||--o{ USERS : assigned
    DEPARTMENTS ||--o{ USERS : contains
    USERS ||--o{ INCOMING_LETTERS : receives
    USERS ||--o{ OUTGOING_LETTERS : authors
    USERS ||--o{ DISPOSITIONS : receives
    USERS ||--o{ APPROVALS : decides
    USERS ||--o{ ACTIVITY_LOGS : generates
    USERS ||--o{ NOTIFICATIONS : receives
    CLASSIFICATIONS ||--o{ INCOMING_LETTERS : classifies
    CLASSIFICATIONS ||--o{ OUTGOING_LETTERS : classifies
    CONTACTS ||--o{ INCOMING_LETTERS : sends
    CONTACTS ||--o{ OUTGOING_LETTERS : receives
    INCOMING_LETTERS ||--o{ DISPOSITIONS : contains
    DISPOSITIONS ||--o{ DISPOSITION_FOLLOWUPS : has
    OUTGOING_LETTERS ||--o{ APPROVALS : has
    INCOMING_LETTERS ||--o| ARCHIVES : archived_as
    OUTGOING_LETTERS ||--o| ARCHIVES : archived_as
    INCOMING_LETTERS ||--o{ ATTACHMENTS : includes
    OUTGOING_LETTERS ||--o{ ATTACHMENTS : includes
    INCOMING_LETTERS ||--o| AGENDAS : recorded_in
    OUTGOING_LETTERS ||--o| AGENDAS : recorded_in
    CLASSIFICATIONS ||--o{ NUMBERING_SEQUENCES : owns
    ROLES {
      string id PK
      string name
    }
    DEPARTMENTS {
      string id PK
      string name
    }
    USERS {
      string id PK
      string role_id FK
      string department_id FK
      string email UK
      string password_hash
      boolean active
    }
    CLASSIFICATIONS {
      string id PK
      string code UK
      string name
      boolean active
    }
    CONTACTS {
      string id PK
      string name
      string email
      boolean active
    }
    INCOMING_LETTERS {
      string id PK
      string number
      string agenda_number UK
      date letter_date
      date received_date
      string classification_id FK
      string status
    }
    OUTGOING_LETTERS {
      string id PK
      string number UK
      string author_id FK
      date letter_date
      string status
    }
    DISPOSITIONS {
      string id PK
      string incoming_id FK
      string from_user_id FK
      string to_user_id FK
      date due_date
      string status
    }
    DISPOSITION_FOLLOWUPS {
      string id PK
      string disposition_id FK
      string actor_id FK
      string note
    }
    APPROVALS {
      string id PK
      string outgoing_id FK
      string approver_id FK
      string decision
      datetime decided_at
    }
    AGENDAS {
      string id PK
      string letter_id
      string letter_type
      string agenda_number UK
    }
    ARCHIVES {
      string id PK
      string letter_id
      string letter_type
      string location
      date archived_at
    }
    ATTACHMENTS {
      string id PK
      string letter_id
      string mime_type
      string object_key
    }
    LETTER_TEMPLATES {
      string id PK
      string name
      string body
    }
    NOTIFICATIONS {
      string id PK
      string recipient_id FK
      boolean read
    }
    ACTIVITY_LOGS {
      string id PK
      string actor_id FK
      string action
      datetime created_at
    }
    NUMBERING_SEQUENCES {
      string id PK
      string classification_id FK
      int year
      int month
      int last_number
    }
    SETTINGS {
      string id PK
      string key UK
      string value
    }
```

## Integritas dan indeks yang disarankan

- Buat indeks unik untuk `users.email`, `classifications.code`, nomor agenda, dan nomor surat resmi (hanya jika sudah ditetapkan).
- Gunakan *foreign key* pada relasi surat → disposisi → tindak lanjut, dan surat keluar → persetujuan.
- Gunakan *soft delete* atau pembatalan untuk dokumen yang pernah masuk alur kerja; jangan menghapus riwayat.
- Untuk `ARCHIVES`, gunakan pasangan unik (`letter_type`, `letter_id`).
- `NUMBERING_SEQUENCES` memerlukan indeks unik (`type`, `classification_id`, `year`, `month`) serta transaksi database saat nomor resmi ditetapkan.
- Kolom password harus berupa hash aman di server jika kelak ditingkatkan menjadi aplikasi produksi, bukan password teks seperti dalam prototipe.
- Untuk penyimpanan file produksi, simpan metadata ke database, file ke storage dengan kontrol akses, serta audit trail sisi server.

## Catatan perbedaan prototipe

Dalam prototipe, buku agenda dihitung langsung dari koleksi surat, lampiran berukuran kecil disimpan sebagai data URL pada surat, dan `departments` serta `roles` berupa kumpulan referensi. Desain ERD menggambarkan normalisasi yang direkomendasikan, bukan implementasi SQL aktif.
