# Coursera Admin Courses

Coursera Admin Courses adalah platform manajemen kursus berbasis web yang dirancang untuk administrator. Sistem ini memungkinkan admin untuk mengelola pengguna, kursus, dan memantau aktivitas platform melalui dashboard.

## Fitur Utama

### Dashboard
- **Statistik Overview**: Menampilkan jumlah total pengguna, kursus, dan aktivitas harian
- **Activity Chart**: Grafik aktivitas pengguna dengan data logins dan penyelesaian modul
- **Leaderboard**: Peringkat mahasiswa teratas dan kampus dengan avatar otomatis
- **Progress Cards**: Kartu kemajuan pembelajaran dengan indikator visual

### Manajemen Pengguna
- **Daftar Pengguna**: Tabel lengkap dengan informasi pengguna
- **Tambah Pengguna**: Form untuk menambah pengguna baru
- **Edit Pengguna**: Mengubah informasi pengguna yang ada
- **Filter & Pencarian**: Pencarian dan penyaringan berdasarkan kriteria

### Manajemen Kursus
- **Daftar Kursus**: Galeri kursus dengan kartu informatif
- **Tambah Kursus**: Form pembuatan kursus baru
- **Edit Kursus**: Modifikasi detail kursus
- **Filter Kursus**: Pencarian berdasarkan kategori dan status

## Setup Project

### Prerequisites
- Node.js (versi 18 atau lebih baru)
- npm atau yarn

### Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd next-dashboard-dummy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

### Login Admin
- **Email**: admin@admin.com
- **Password**: admin123

### Build untuk Production
```bash
npm run build
npm start
```

## Teknologi yang Digunakan

- **Next.js 14**: React framework dengan App Router
- **TypeScript**: Type safety untuk JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Library charting untuk data visualization
- **Lucide React**: Icon library
- **Next.js Image**: Optimized image handling

## Struktur Project

```
next-dashboard-dummy/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Halaman dashboard
│   ├── login/            # Halaman login
│   ├── register/         # Halaman register
│   ├── user/             # Manajemen pengguna
│   └── courses/          # Manajemen kursus
├── components/           # Komponen reusable
│   ├── forms/           # Form components
│   ├── ui/              # UI components
│   └── Navbar, Sidebar  # Layout components
├── data/                # Data dummy
└── public/              # Static assets
```

## Fitur Khusus

- **Responsive Design**: Kompatibel dengan desktop dan mobile
- **Loading States**: Skeleton loading untuk UX yang baik
- **Form Validation**: Validasi input pada form
- **Image Optimization**: Optimasi gambar dengan Next.js Image
- **Type Safety**: TypeScript untuk keamanan tipe data
