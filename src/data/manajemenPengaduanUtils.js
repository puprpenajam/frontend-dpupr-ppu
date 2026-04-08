const parseStoredList = (key) => {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Gagal membaca data ${key}:`, error);
    return [];
  }
};

const saveStoredList = (key, rows) => {
  localStorage.setItem(key, JSON.stringify(rows));
};

const normalizeRow = (row) => ({
  ...row,
  status: row.status || 'proses',
  adminNote: row.adminNote || '',
  updatedAt: row.updatedAt || row.createdAt || new Date().toISOString(),
  history: Array.isArray(row.history) ? row.history : []
});

const withLainnya = (mainValue, lainnyaValue) => {
  if (!mainValue) {
    return '-';
  }

  if (mainValue === 'Lainnya' && lainnyaValue?.trim()) {
    return lainnyaValue;
  }

  return mainValue;
};

const withLainnyaArray = (mainValues = [], lainnyaValue = '') => {
  if (!Array.isArray(mainValues) || mainValues.length === 0) {
    return '-';
  }

  return mainValues
    .map((item) => {
      if (item === 'Lainnya' && lainnyaValue?.trim()) {
        return lainnyaValue;
      }
      return item;
    })
    .join(', ');
};

export const getPengaduanCategories = () => [
  {
    value: 'bagian-umum-sunram-keuangan',
    label: 'Daftar Bagian Umum, Sunram, dan Keuangan',
    shortLabel: 'Bagian Umum, Sunram, dan Keuangan',
    storageKey: 'formBagianUmumSunramKeuanganReports',
    emptyMessage: 'Belum ada data pengaduan untuk bagian ini.',
    columns: [
      { key: 'createdAt', label: 'Tanggal', type: 'datetime' },
      { key: 'namaPelapor', label: 'Nama Pelapor' },
      { key: 'nomorHp', label: 'Nomor HP' },
      { key: 'unitTujuan', label: 'Unit Tujuan' },
      { key: 'judulPengaduan', label: 'Judul Pengaduan' },
      { key: 'isiPengaduan', label: 'Isi Pengaduan' },
      {
        key: 'lampiran',
        label: 'Lampiran',
        type: 'file',
        fileDataKey: 'lampiranFileData',
        fileTypeKey: 'lampiranFileType',
        fileNameKey: 'lampiranFileName'
      }
    ]
  },
  {
    value: 'upt-lab-alat-berat',
    label: 'Daftar UPT-PU Lab dan Alat Berat',
    shortLabel: 'UPT-PU Lab dan Alat Berat',
    storageKey: 'formUptLabAlatBeratReports',
    emptyMessage: 'Belum ada data pengaduan UPT-PU Lab dan Alat Berat.',
    columns: [
      { key: 'createdAt', label: 'Tanggal', type: 'datetime' },
      { key: 'namaPemohon', label: 'Nama Pemohon' },
      { key: 'instansiPerusahaan', label: 'Instansi/Perusahaan' },
      { key: 'nomorHp', label: 'Nomor HP' },
      { key: 'alamat', label: 'Alamat' },
      {
        key: 'jenisLayanan',
        label: 'Jenis Layanan',
        accessor: (row) => withLainnya(row.jenisLayanan, row.jenisLayananLainnya)
      },
      { key: 'rincianPermohonan', label: 'Rincian Permohonan' },
      {
        key: 'dokumen',
        label: 'Dokumen',
        type: 'file',
        fileDataKey: 'dokumenFileData',
        fileTypeKey: 'dokumenFileType',
        fileNameKey: 'dokumenFileName'
      }
    ]
  },
  {
    value: 'bina-konstruksi',
    label: 'Daftar Bina Konstruksi',
    shortLabel: 'Bina Konstruksi',
    storageKey: 'formBinaKonstruksiReports',
    emptyMessage: 'Belum ada data pengaduan Bina Konstruksi.',
    columns: [
      { key: 'createdAt', label: 'Tanggal', type: 'datetime' },
      { key: 'namaPemohon', label: 'Nama Pemohon' },
      { key: 'namaBadanUsaha', label: 'Nama Badan Usaha' },
      { key: 'nomorHp', label: 'Nomor HP' },
      { key: 'alamat', label: 'Alamat' },
      {
        key: 'jenisLayanan',
        label: 'Jenis Layanan',
        accessor: (row) => withLainnya(row.jenisLayanan, row.jenisLayananLainnya)
      },
      { key: 'nomorSBU', label: 'Nomor SBU/SKK' },
      { key: 'deskripsiPermohonan', label: 'Deskripsi Permohonan' },
      {
        key: 'dokumen',
        label: 'Dokumen',
        type: 'file',
        fileDataKey: 'dokumenFileData',
        fileTypeKey: 'dokumenFileType',
        fileNameKey: 'dokumenFileName'
      }
    ]
  },
  {
    value: 'cipta-karya',
    label: 'Daftar Cipta Karya',
    shortLabel: 'Cipta Karya',
    storageKey: 'formCiptaKaryaReports',
    emptyMessage: 'Belum ada data pengaduan Cipta Karya.',
    columns: [
      { key: 'createdAt', label: 'Tanggal', type: 'datetime' },
      { key: 'namaPemohon', label: 'Nama Pemohon' },
      { key: 'nomorHp', label: 'Nomor HP' },
      { key: 'alamat', label: 'Alamat' },
      {
        key: 'jenisPermohonan',
        label: 'Jenis Permohonan',
        accessor: (row) => withLainnya(row.jenisPermohonan, row.jenisPermohonanLainnya)
      },
      { key: 'detailLokasi', label: 'Detail Lokasi' },
      {
        key: 'statusKepemilikanLahan',
        label: 'Status Lahan',
        accessor: (row) => withLainnya(row.statusKepemilikanLahan, row.statusKepemilikanLahanLainnya)
      },
      { key: 'deskripsiKebutuhan', label: 'Deskripsi Kebutuhan' },
      { key: 'luasBangunan', label: 'Luas Bangunan' },
      { key: 'titikLokasi', label: 'Titik Lokasi', type: 'link' },
      {
        key: 'dokumen',
        label: 'Dokumen',
        type: 'file',
        fileDataKey: 'dokumenFileData',
        fileTypeKey: 'dokumenFileType',
        fileNameKey: 'dokumenFileName'
      }
    ]
  },
  {
    value: 'tata-ruang',
    label: 'Daftar Tata Ruang',
    shortLabel: 'Tata Ruang',
    storageKey: 'formTataRuangReports',
    emptyMessage: 'Belum ada data pengaduan Tata Ruang.',
    columns: [
      { key: 'createdAt', label: 'Tanggal', type: 'datetime' },
      { key: 'namaPemohon', label: 'Nama Pemohon' },
      { key: 'nomorHp', label: 'Nomor HP' },
      { key: 'alamatPemohon', label: 'Alamat Pemohon' },
      {
        key: 'jenisLayanan',
        label: 'Jenis Layanan',
        accessor: (row) => withLainnya(row.jenisLayanan, row.jenisLayananLainnya)
      },
      { key: 'lokasiObjek', label: 'Lokasi Objek' },
      { key: 'tujuanPemanfaatanRuang', label: 'Tujuan Pemanfaatan Ruang' },
      {
        key: 'dokumen',
        label: 'Dokumen',
        type: 'file',
        fileDataKey: 'dokumenFileData',
        fileTypeKey: 'dokumenFileType',
        fileNameKey: 'dokumenFileName'
      }
    ]
  },
  {
    value: 'psda',
    label: 'Daftar PSDA',
    shortLabel: 'PSDA',
    storageKey: 'formPsdaReports',
    emptyMessage: 'Belum ada data pengaduan PSDA.',
    columns: [
      { key: 'createdAt', label: 'Tanggal', type: 'datetime' },
      { key: 'namaPelapor', label: 'Nama Pelapor' },
      { key: 'nomorHp', label: 'Nomor HP' },
      { key: 'alamatKejadian', label: 'Lokasi Kejadian' },
      {
        key: 'jenisPermasalahan',
        label: 'Jenis Permasalahan',
        accessor: (row) => withLainnya(row.jenisPermasalahan, row.jenisLainnya)
      },
      { key: 'detailLokasi', label: 'Detail Lokasi' },
      { key: 'kronologi', label: 'Kronologi' },
      {
        key: 'dampak',
        label: 'Dampak',
        accessor: (row) => withLainnyaArray(row.dampak, row.dampakLainnya)
      },
      { key: 'titikLokasi', label: 'Titik Lokasi', type: 'link' },
      {
        key: 'bukti',
        label: 'Bukti',
        type: 'file',
        fileDataKey: 'buktiFileData',
        fileTypeKey: 'buktiFileType',
        fileNameKey: 'buktiFileName'
      }
    ]
  },
  {
    value: 'bina-marga',
    label: 'Daftar Bina Marga',
    shortLabel: 'Bina Marga',
    storageKey: 'formBinaMargaReports',
    emptyMessage: 'Belum ada data pengaduan Bina Marga.',
    columns: [
      { key: 'createdAt', label: 'Tanggal', type: 'datetime' },
      { key: 'namaPelapor', label: 'Nama Pelapor' },
      { key: 'nomorHp', label: 'Nomor HP' },
      { key: 'lokasiJalanJembatan', label: 'Nama Ruas Jalan/Jembatan' },
      {
        key: 'jenisPermasalahan',
        label: 'Jenis Permasalahan',
        accessor: (row) => withLainnya(row.jenisPermasalahan, row.jenisLainnya)
      },
      { key: 'detailLokasi', label: 'Detail Lokasi' },
      { key: 'tingkatKerusakan', label: 'Tingkat Kerusakan' },
      { key: 'kronologi', label: 'Kronologi' },
      {
        key: 'dampak',
        label: 'Dampak',
        accessor: (row) => withLainnyaArray(row.dampak, row.dampakLainnya)
      },
      { key: 'titikLokasi', label: 'Titik Lokasi', type: 'link' },
      {
        key: 'foto',
        label: 'Foto',
        type: 'file',
        fileDataKey: 'fotoFileData',
        fileTypeKey: 'fotoFileType',
        fileNameKey: 'fotoFileName'
      }
    ]
  }
];

export const getPengaduanCategoryByValue = (value) => getPengaduanCategories().find((item) => item.value === value);

export const getPengaduanCategoryRows = (categoryValue) => {
  const category = getPengaduanCategoryByValue(categoryValue);
  if (!category) {
    return [];
  }

  return parseStoredList(category.storageKey)
    .map(normalizeRow)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const updatePengaduanCategoryRow = (categoryValue, rowId, patchData, actor = 'Admin') => {
  const category = getPengaduanCategoryByValue(categoryValue);
  if (!category) {
    return [];
  }

  const updatedRows = parseStoredList(category.storageKey).map((row) => {
    if (row.id !== rowId) {
      return row;
    }

    return {
      ...row,
      ...patchData,
      updatedAt: new Date().toISOString(),
      history: [
        ...(Array.isArray(row.history) ? row.history : []),
        {
          timestamp: new Date().toISOString(),
          actor,
          action: patchData.historyAction || 'Data pengaduan diperbarui'
        }
      ]
    };
  });

  saveStoredList(category.storageKey, updatedRows);
  return updatedRows.map(normalizeRow).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const deletePengaduanCategoryRow = (categoryValue, rowId) => {
  const category = getPengaduanCategoryByValue(categoryValue);
  if (!category) {
    return [];
  }

  const updatedRows = parseStoredList(category.storageKey).filter((row) => row.id !== rowId);
  saveStoredList(category.storageKey, updatedRows);

  return updatedRows.map(normalizeRow).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};
