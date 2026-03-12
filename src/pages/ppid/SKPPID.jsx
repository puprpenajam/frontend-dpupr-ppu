import FadeIn from '../../components/FadeIn';

const SKPPID = () => {
  return (
    <div className="mb-8">
      <FadeIn>
      <h2 className="text-2xl font-bold text-dpupr-blue mb-6">Surat Keputusan PPID</h2>
      
      {/* Introduction */}
      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6 mb-8" style={{ color: '#ffffff' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>📜 Tentang SK PPID</h3>
        <p className="leading-relaxed" style={{ color: '#ffffff' }}>
          Surat Keputusan (SK) PPID adalah dokumen resmi yang menjadi dasar hukum pembentukan dan pengoperasian 
          Pejabat Pengelola Informasi dan Dokumentasi (PPID) di lingkungan Dinas Pekerjaan Umum dan Penataan Ruang 
          Kabupaten Penajam Paser Utara. SK ini mengatur struktur organisasi, tugas, fungsi, dan kewenangan PPID 
          dalam memberikan layanan informasi publik sesuai UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
        </p>
      </div>
      </FadeIn>

      {/* Struktur Organisasi PPID */}
      <FadeIn delay={100}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Struktur Organisasi PPID DPUPR PPU</h3>
        <div className="space-y-4">
          {/* Atasan PPID */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-blue-800 mb-2">Atasan PPID</h4>
                <p className="text-sm text-gray-700 mb-2">Kepala Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Penajam Paser Utara</p>
                <div className="bg-white/70 rounded-lg p-3 mt-3">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Tugas dan Wewenang:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Mengkoordinasikan penyimpanan, pendokumentasian, penyediaan, dan pelayanan informasi publik</li>
                    <li>• Memutuskan informasi yang dikecualikan sesuai peraturan perundang-undangan</li>
                    <li>• Memutuskan pengajuan keberatan dari pemohon informasi</li>
                    <li>• Melakukan pengujian konsekuensi atas informasi yang dikecualikan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* PPID Pelaksana */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-green-800 mb-2">PPID Pelaksana</h4>
                <p className="text-sm text-gray-700 mb-2">Sekretaris Dinas / Pejabat yang ditunjuk</p>
                <div className="bg-white/70 rounded-lg p-3 mt-3">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Tugas dan Fungsi:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Mengoordinasikan pengelolaan dan pelayanan informasi publik</li>
                    <li>• Menghimpun, mengolah, dan mengklasifikasi informasi publik</li>
                    <li>• Menyediakan dan memberikan informasi publik kepada pemohon</li>
                    <li>• Melakukan verifikasi dan pengujian informasi yang akan diberikan</li>
                    <li>• Membuat dan menyampaikan laporan pelaksanaan layanan informasi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Pejabat Fungsional */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-purple-800 mb-2">Pejabat Fungsional / Tim Teknis</h4>
                <p className="text-sm text-gray-700 mb-2">Staf dari berbagai bidang teknis di DPUPR</p>
                <div className="bg-white/70 rounded-lg p-3 mt-3">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Tugas:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Membantu PPID Pelaksana dalam pengumpulan dan penyiapan informasi</li>
                    <li>• Menyediakan data dan dokumen dari bidang masing-masing</li>
                    <li>• Melakukan verifikasi teknis atas informasi yang akan diberikan</li>
                    <li>• Membantu dalam proses pengujian informasi yang dikecualikan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Dasar Hukum Pembentukan */}
      <FadeIn delay={200}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Dasar Hukum Pembentukan PPID</h3>
        <div className="bg-gray-50 rounded-xl p-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-dpupr-blue font-bold text-xl">•</span>
              <div>
                <p className="font-semibold">Undang-Undang Nomor 14 Tahun 2008</p>
                <p className="text-sm">Tentang Keterbukaan Informasi Publik</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-dpupr-blue font-bold text-xl">•</span>
              <div>
                <p className="font-semibold">Peraturan Pemerintah Nomor 61 Tahun 2010</p>
                <p className="text-sm">Tentang Pelaksanaan Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-dpupr-blue font-bold text-xl">•</span>
              <div>
                <p className="font-semibold">Peraturan Komisi Informasi Nomor 1 Tahun 2021</p>
                <p className="text-sm">Tentang Standar Layanan Informasi Publik</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-dpupr-blue font-bold text-xl">•</span>
              <div>
                <p className="font-semibold">Peraturan Menteri Dalam Negeri</p>
                <p className="text-sm">Tentang Pedoman Pengelolaan Informasi dan Dokumentasi di Lingkungan Kementerian Dalam Negeri dan Pemerintah Daerah</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-dpupr-blue font-bold text-xl">•</span>
              <div>
                <p className="font-semibold">Peraturan Bupati Penajam Paser Utara</p>
                <p className="text-sm">Tentang Pelaksanaan Keterbukaan Informasi Publik di Lingkungan Pemerintah Kabupaten Penajam Paser Utara</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </FadeIn>

      {/* Ruang Lingkup Informasi */}
      <FadeIn delay={300}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Ruang Lingkup Informasi PPID DPUPR</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
            <h4 className="font-bold text-blue-800 mb-3">✅ Informasi yang Wajib Disediakan:</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Profil dan struktur organisasi DPUPR</li>
              <li>• Program dan kegiatan infrastruktur</li>
              <li>• Laporan keuangan dan kinerja</li>
              <li>• Prosedur perizinan (IMB, SLF, dll)</li>
              <li>• Rencana tata ruang wilayah</li>
              <li>• Data proyek pembangunan</li>
              <li>• Informasi pengadaan barang/jasa</li>
              <li>• Peraturan dan kebijakan DPUPR</li>
            </ul>
          </div>
          <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-600">
            <h4 className="font-bold text-red-800 mb-3">⛔ Informasi yang Dikecualikan:</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Informasi yang dapat mengganggu proses penegakan hukum</li>
              <li>• Informasi yang berkaitan dengan hak kekayaan intelektual</li>
              <li>• Informasi yang dapat merugikan ketahanan ekonomi nasional</li>
              <li>• Informasi yang dapat membahayakan keamanan negara</li>
              <li>• Data pribadi yang bersifat rahasia</li>
              <li>• Memorandum atau surat yang bersifat rahasia</li>
            </ul>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Hak dan Kewajiban */}
      <FadeIn delay={400}>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-600">
          <h3 className="text-lg font-bold text-green-800 mb-3">✅ Hak Pemohon Informasi</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mengajukan permohonan informasi publik</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mendapatkan informasi sesuai permintaan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mengajukan keberatan atas penolakan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mengajukan gugatan ke pengadilan</span>
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-600">
          <h3 className="text-lg font-bold text-orange-800 mb-3">📜 Kewajiban PPID</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>Menyediakan dan memberikan informasi publik</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>Memberikan layanan yang cepat, tepat, dan akurat</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>Melindungi informasi yang dikecualikan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>Membuat laporan layanan informasi</span>
            </li>
          </ul>
        </div>
      </div>
      </FadeIn>

      {/* Download SK */}
      <FadeIn delay={500}>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500">
        <h3 className="text-lg font-bold text-yellow-800 mb-3">📥 Unduh Dokumen SK PPID</h3>
        <p className="text-sm text-gray-700 mb-4">
          Untuk melihat Surat Keputusan pembentukan PPID DPUPR Kabupaten Penajam Paser Utara secara lengkap, 
          silakan unduh dokumen resmi berikut:
        </p>
        <button className="bg-dpupr-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download SK PPID DPUPR PPU (PDF)
        </button>
        <p className="text-xs text-gray-600 mt-3">* Dokumen dalam format PDF, ukuran sekitar 500 KB</p>
      </div>
      </FadeIn>
    </div>
  );
};

export default SKPPID;
