// =============================================================
// LAB 1 - Rekap Nilai Mahasiswa  (SOAL)
// -------------------------------------------------------------
// Cara kerja:
//   1. Lengkapi setiap function yang bertanda TODO.
//   2. Jalankan: node soal.js
//   3. Lihat hasil pengecekan di bagian bawah: ❌ -> ✅
//   4. Setelah semua ✅, coba salin-tempel file ini ke Console browser.
//      Hasilnya sama -> JavaScript yang sama berjalan di dua tempat.
//
// SIMPAN file ini! Function yang Anda tulis akan dipakai lagi di Sesi 2
// (ditampilkan di halaman web DAN dipakai oleh server Node.js).
// =============================================================

const mahasiswa = [
  { nim: '2401001', nama: 'Andi Pratama', tugas: 85, uts: 78, uas: 90 },
  { nim: '2401002', nama: 'Siti Nurhaliza', tugas: 92, uts: 88, uas: 95 },
  { nim: '2401003', nama: 'Budi Santoso', tugas: 60, uts: 45, uas: 50 },
  { nim: '2401004', nama: 'Dewi Lestari', tugas: 75, uts: 70, uas: 72 },
  { nim: '2401005', nama: 'Rizky Maulana', tugas: 40, uts: 35, uas: 30 },
  { nim: '2401006', nama: 'Nurul Aini', tugas: 88, uts: 82, uas: 79 },
  { nim: '2401007', nama: 'Fajar Hidayat', tugas: 70, uts: 65, uas: 58 },
  { nim: '2401008', nama: 'Putri Ayu', tugas: 55, uts: 60, uas: 52 },
];

// -------------------------------------------------------------
// TUGAS 1
// Nilai akhir = 30% tugas + 30% UTS + 40% UAS, dibulatkan 1 desimal.
// Petunjuk: Math.round(x * 10) / 10
// Contoh  : hitungNilaiAkhir(85, 78, 90) -> 84.9
// -------------------------------------------------------------
function hitungNilaiAkhir(tugas, uts, uas) {
  return Math.round((tugas * 0.3 + uts * 0.3 + uas * 0.4) * 10) / 10;
}




// -------------------------------------------------------------
// TUGAS 2
// A >= 85, B >= 70, C >= 55, D >= 40, selain itu E
// Contoh: tentukanGrade(84.9) -> 'B'
// -------------------------------------------------------------
function tentukanGrade(nilai) {
  if (nilai >= 85) {
    return 'A';
  } else if (nilai >= 70) {
    return 'B';
  } else if (nilai >= 55) {
    return 'C';
  } else if (nilai >= 40) {
    return 'D';
  } else {
    return 'E';
  }
}


// -------------------------------------------------------------
// TUGAS 3
// Kembalikan ARRAY BARU. Setiap mahasiswa ditambah property:
//   nilaiAkhir (Tugas 1), grade (Tugas 2), lulus (true jika nilaiAkhir >= 55)
// Petunjuk: daftar.map(...) dan spread { ...m, nilaiAkhir, ... }
// -------------------------------------------------------------
function buatRekap(daftar) {
  return daftar.map((m) => {
    const nilaiAkhir = hitungNilaiAkhir(m.tugas, m.uts, m.uas);

    return {
      ...m,
      nilaiAkhir,
      grade: tentukanGrade(nilaiAkhir),
      lulus: nilaiAkhir >= 55
    };
  });
}


// -------------------------------------------------------------
// TUGAS 4
// Rata-rata nilaiAkhir seluruh kelas, 1 desimal. Jika kosong -> 0.
// Petunjuk: reduce
// -------------------------------------------------------------
function hitungRataRata(rekap) {
  if (rekap.length === 0) {
    return 0;
  }

  const total = rekap.reduce((jumlah, m) => jumlah + m.nilaiAkhir, 0);

  return Math.round((total / rekap.length) * 10) / 10;
}


// -------------------------------------------------------------
// TUGAS 5
// Kembalikan OBJECT mahasiswa dengan nilaiAkhir tertinggi.
// Petunjuk: reduce, atau loop biasa sambil menyimpan "yang terbaik sejauh ini"
// -------------------------------------------------------------
function cariTertinggi(rekap) {
  return rekap.reduce((tertinggi, m) => {
    return m.nilaiAkhir > tertinggi.nilaiAkhir ? m : tertinggi;
  });
}


// -------------------------------------------------------------
// TUGAS 6
// Hitung jumlah mahasiswa per grade.
// Hasil: { A: 1, B: 3, C: 2, D: 1, E: 1 }  (semua key tetap ada walau 0)
// Petunjuk: mulai dari { A: 0, B: 0, C: 0, D: 0, E: 0 }, lalu for...of
// -------------------------------------------------------------
function hitungDistribusiGrade(rekap) {
  const distribusi = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0
  };

  for (const m of rekap) {
    distribusi[m.grade]++;
  }

  return distribusi;
}


// -------------------------------------------------------------
// TUGAS 7
// Cari mahasiswa yang namanya mengandung kataKunci (abaikan huruf besar/kecil
// dan spasi di awal/akhir kata kunci).
// Contoh: cariMahasiswa(rekap, '  NUR ') -> [Siti Nurhaliza, Nurul Aini]
// Petunjuk: filter, toLowerCase, trim, includes
// -------------------------------------------------------------
function cariMahasiswa(rekap, kataKunci) {
  const keyword = kataKunci.trim().toLowerCase();

  return rekap.filter((m) =>
    m.nama.toLowerCase().includes(keyword)
  );
}


// -------------------------------------------------------------
// TUGAS 8 (bebas berkreasi)
// Cetak laporan: tabel (console.table), jumlah lulus, rata-rata,
// nilai tertinggi, dan distribusi grade. Gunakan template literal.
// -------------------------------------------------------------
function cetakLaporan(rekap) {
  console.log('\n===== REKAP NILAI MAHASISWA =====');

  console.table(rekap);

  const jumlahLulus = rekap.filter((m) => m.lulus).length;
  const rataRata = hitungRataRata(rekap);
  const tertinggi = cariTertinggi(rekap);
  const distribusi = hitungDistribusiGrade(rekap);

  console.log(`
Jumlah Mahasiswa : ${rekap.length}
Jumlah Lulus     : ${jumlahLulus}
Jumlah Tidak Lulus : ${rekap.length - jumlahLulus}
Rata-rata Kelas  : ${rataRata}
Nilai Tertinggi  : ${tertinggi.nama} (${tertinggi.nilaiAkhir})
`);

  console.log('Distribusi Grade:');
  console.table(distribusi);
}


// =============================================================
// JANGAN UBAH KODE DI BAWAH INI - pengecekan otomatis
// =============================================================
function cek(label, fungsiUji, harapan) {
  let hasil;
  try {
    hasil = fungsiUji();
  } catch (err) {
    console.log(`❌ ${label}\n     error: ${err.message}`);
    return;
  }
  const benar = JSON.stringify(hasil) === JSON.stringify(harapan);
  if (benar) {
    console.log(`✅ ${label}`);
  } else {
    console.log(`❌ ${label}\n     diharapkan: ${JSON.stringify(harapan)}\n     didapat   : ${JSON.stringify(hasil)}`);
  }
}

console.log('===== PENGECEKAN LAB 1 =====');
cek('T1 hitungNilaiAkhir(85, 78, 90)', () => hitungNilaiAkhir(85, 78, 90), 84.9);
cek('T1 hitungNilaiAkhir(40, 35, 30)', () => hitungNilaiAkhir(40, 35, 30), 34.5);
cek('T2 tentukanGrade 92 / 84.9 / 55 / 54.9 / 39', () => [92, 84.9, 55, 54.9, 39].map(tentukanGrade), ['A', 'B', 'C', 'D', 'E']);
cek('T3 buatRekap -> mahasiswa pertama', () => buatRekap(mahasiswa)[0], {
  nim: '2401001', nama: 'Andi Pratama', tugas: 85, uts: 78, uas: 90, nilaiAkhir: 84.9, grade: 'B', lulus: true,
});
cek('T3 buatRekap tidak mengubah data asli', () => { const r = buatRekap(mahasiswa); return [Array.isArray(r), 'grade' in mahasiswa[0]]; }, [true, false]);
cek('T4 hitungRataRata', () => hitungRataRata(buatRekap(mahasiswa)), 67.1);
cek('T4 hitungRataRata data kosong', () => hitungRataRata([]), 0);
cek('T5 cariTertinggi', () => cariTertinggi(buatRekap(mahasiswa)).nama, 'Siti Nurhaliza');
cek('T6 hitungDistribusiGrade', () => hitungDistribusiGrade(buatRekap(mahasiswa)), { A: 1, B: 3, C: 2, D: 1, E: 1 });
cek('T7 cariMahasiswa "  NUR "', () => cariMahasiswa(buatRekap(mahasiswa), '  NUR ').map((m) => m.nama), ['Siti Nurhaliza', 'Nurul Aini']);

console.log('\n===== LAPORAN (Tugas 8) =====');
try {
  cetakLaporan(buatRekap(mahasiswa));
} catch (err) {
  console.log('Belum bisa mencetak laporan:', err.message);
}