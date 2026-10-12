# Menulis Tulisan Jurnal

Alurnya sekarang gini (paling gampang, tidak perlu mengedit kode):

```
npm run dev  →  buka /journals/kelola  →  tulis & Simpan
             →  file data/journals.json berubah
             →  git add + commit + push
             →  hosting build ulang, tulisan terbit
```

Menulisnya lewat halaman di browser, tapi yang tersimpan adalah **satu file
teks** (`data/journals.json`). Karena file itu ikut di-commit, hosting tidak
perlu izin menyimpan apa pun — tulisan jadi bagian dari kode yang kamu push.

## Langkah menulis satu tulisan

1. Jalankan situsnya di komputer:
   ```
   npm run dev
   ```
2. Buka `http://localhost:3000/journals/kelola`.
3. **Pertama kali saja**: halaman itu minta membuat **kata sandi pengelola**.
   Yang disimpan hanya hash-nya (`data/admin-auth.json`), dan file itu **tidak**
   ikut ke GitHub. Simpan kata sandinya — tidak ada fitur lupa kata sandi.
   Kalau lupa: hapus file `data/admin-auth.json`, lalu buat lagi.
4. Isi formulirnya, klik **Simpan**:
   - **Tanggal publikasi diisi** → tulisan **terbit**, langsung muncul di
     `/journals` dan di beranda.
   - **Tanggal dikosongkan** → tersimpan sebagai **draf** (hanya tampak di
     halaman kelola). Berguna kalau masih mau dirapikan dulu.
5. Setelah selesai, kirim ke GitHub supaya ikut ter-deploy:
   ```
   git add data/journals.json
   git commit -m "Tambah tulisan jurnal"
   git push
   ```
   Hosting akan build ulang otomatis dan tulisannya terbit online.

> Kalau tulisan langsung tampil di situs versi lokal tapi belum di situs online:
> itu wajar — berarti langkah 5 (push) belum dilakukan.

## Mengisi kolom-kolomnya

| Kolom | Isi |
| --- | --- |
| Judul | judul tulisan |
| Slug | alamat URL (`/journals/<slug>`). Kosongkan → dibuat otomatis dari judul |
| Penulis | pisahkan dengan koma kalau lebih dari satu |
| Tanggal publikasi | **penentu terbit/draf** |
| Venue / asal tulisan | mis. "Catatan Pribadi" atau nama jurnal |
| Tahun, Jenis | "2026", "Catatan" / "Journal" |
| Label | dipisah koma, jadi tombol filter (mis. `Data Analysis, Python`) |
| Ringkasan | 1–3 kalimat yang muncul di daftar tulisan |
| Isi tulisan | isi lengkapnya (format di bawah) |
| Link PDF / DOI / Link sumber | opsional |
| Gambar sampul | opsional — lihat bagian "Menambahkan gambar sampul" di bawah |

## Format isi tulisan

| Tulis begini | Hasilnya |
| --- | --- |
| baris kosong | pemisah paragraf |
| `## Sub-judul` | sub-judul |
| `- poin` | daftar berbutir |
| `1. poin` | daftar bernomor |
| `**teks**` | **tebal** |
| `` `teks` `` | `kode` / monospace |

Tidak ada tabel, gambar di dalam isi, atau HTML mentah. Untuk gambar pakai
kolom **Gambar sampul**; untuk lampiran taruh PDF di `public/journals/` lalu isi
**Link PDF** dengan `/journals/namafile.pdf`.

## Menambahkan gambar sampul (opsional)

Kartu tulisan di `/journals` dan `/journals/browse` selalu punya kotak sampul di
sebelah kiri. Isinya diambil dari kolom **Gambar sampul**. Kalau kolom itu
dikosongkan, kartu memakai **sampul bawaan**: kotak gradasi biru–navy berisi
huruf awal judulnya. Warna gradasinya dipilih otomatis dari slug, jadi berbeda
antar tulisan dan tidak berubah-ubah setiap kali halaman dibuka.

Kalau ingin gambar sendiri (tangkapan layar dashboard, foto kegiatan magang):

1. Siapkan gambar rasio **16:10**, misalnya **1120 × 700 px**. Rasio lain tetap
   bisa dipakai, tetapi pinggirnya dipotong agar memenuhi kotak — letakkan bagian
   pentingnya di tengah. Format `.png` atau `.jpg`, sebaiknya di bawah 300 KB.
2. Simpan di folder `public/journals/`, misal `public/journals/magang-bulan-1.png`.
3. Isi kolom **Gambar sampul** di halaman `/journals/kelola` dengan alamat
   berkasnya dari folder `public`: `/journals/magang-bulan-1.png`
   (awali garis miring, tanpa menulis `public`).
4. Kirim ke GitHub seperti biasa: `git add public/journals data/journals.json`,
   lalu `commit` dan `push`. Gambar harus ikut di-commit, kalau tidak kartunya
   kosong di situs online.

Nama berkas bebas, tetapi usahakan sama dengan slug tulisannya supaya mudah
dicari. Kalau gambarnya dihapus dari folder sementara kolom Gambar sampul masih
terisi, kartunya tampil kosong — jadi kosongkan juga kolom itu saat menghapus
gambarnya.

## Kalau lebih suka mengedit file langsung

Boleh. Bentuk filenya seperti ini (`data/journals.json`):

```json
[
  {
    "slug": "clustering-ump-kmeans",
    "title": "Segmentasi Provinsi Berdasarkan UMP dengan K-Means",
    "authors": ["Tifani Yunitami"],
    "venue": "Catatan Pribadi",
    "year": "2026",
    "date": "2026-07-12",
    "type": "Catatan",
    "abstract": "Ringkasan 1-3 kalimat yang tampil di daftar tulisan.",
    "tags": ["Data Analysis", "Python"],
    "content": "Paragraf pertama.\n\n## Sub-judul\n\n- poin daftar\n\n**tebal** dan `kode`."
  }
]
```

Field wajib: `slug`, `title`, `authors`, `venue`, `year`. Sisanya opsional.
**Hapus `date` untuk menyimpan sebagai draf.** Setelah diubah, tetap
`git add` + `commit` + `push` seperti langkah 5 di atas.

Selagi `npm run dev` jalan, perubahan file itu langsung terlihat di browser
tanpa perlu restart.

## Memindahkan tulisan ke komputer lain

Copy file `data/journals.json`. Itu isinya — tidak ada database.

## Menambah jurnal bulan berikutnya

Supaya penamaannya konsisten, pakai pola yang sama seperti tulisan pertama:

| Kolom | Isi untuk bulan ke-*n* |
| --- | --- |
| Judul | `Jurnal Kegiatan Magang di AirNav Indonesia — Bulan ke-<n>` |
| Slug | `magang-airnav-bulan-<n>` |
| Tanggal publikasi | tanggal terakhir bulan itu, mis. `2026-10-31` |
| Jenis | `Jurnal Magang` |
| Venue | `Magang AirNav Indonesia — Divisi Information Technology` |
| Label | `Magang, AirNav Indonesia` + topik bulan itu |

Isi tulisan bisa ditulis dengan pola sub-judul seperti tulisan pertama
(`## Perancangan dan pengembangan …`, `## Kegiatan bersama …`, `## Pembelajaran`),
jadi pembaca bisa mengikuti perkembangan tiap bulan.

Caranya di halaman `/journals/kelola`: klik tombol **Buat tulisan baru** di atas
formulir, isi kolomnya, ganti Judul + Slug + Tanggal, lalu **Simpan**.

## Catatan

- Halaman `/journals/kelola` tidak ditautkan dari menu dan tidak diindeks mesin
  pencari. Simpan alamatnya untuk dirimu sendiri: `/journals/kelola`.
- Halaman itu **butuh situs berjalan sebagai aplikasi Next.js** (`npm run dev`).
  Di hosting, tulisan tidak diubah dari browser — diubah di komputer lalu
  di-push. Jadi hosting tidak butuh izin menyimpan file.
- Kalau suatu saat halaman kelola menolak menyimpan ("server ini tidak
  mengizinkan penyimpanan file"), berarti memang sedang dipakai di server yang
  tidak bisa menulis. Pakai cara mengedit file JSON di atas.
