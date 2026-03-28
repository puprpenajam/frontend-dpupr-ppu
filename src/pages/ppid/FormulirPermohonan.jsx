import FadeIn from '../../components/FadeIn';

const FormulirPermohonan = () => {
  return (
    <div className="mb-8">
      <FadeIn>
        <h2 className="text-2xl font-bold text-dpupr-blue mb-6">Formulir Permohonan Informasi Publik</h2>
      
      <p className="text-gray-700 leading-relaxed mb-6">
        Untuk mengajukan permohonan informasi publik, masyarakat dapat mengisi formulir permohonan 
        yang telah disediakan oleh PPID Kabupaten Penajam Paser Utara. Formulir ini memudahkan proses 
        pengajuan dan memastikan kelengkapan data yang diperlukan untuk memproses permohonan Anda.
      </p>

      </FadeIn>

      {/* Jenis Informasi yang Dapat Diminta */}
      <FadeIn delay={100}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Jenis Informasi yang Dapat Diminta</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
            <h4 className="font-bold text-blue-800 mb-2">ðŸ“ Informasi Berkala</h4>
            <p className="text-sm text-gray-700">Informasi yang wajib disediakan dan diumumkan secara berkala (minimal 6 bulan sekali)</p>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>â€¢ Profil Badan Publik</li>
              <li>â€¢ Ringkasan informasi tentang program/kegiatan</li>
              <li>â€¢ Ringkasan laporan keuangan</li>
              <li>â€¢ Ringkasan laporan akses informasi publik</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
            <h4 className="font-bold text-blue-800 mb-2">âš¡ Informasi Serta Merta</h4>
            <p className="text-sm text-gray-700">Informasi yang dapat mengancam hajat hidup orang banyak dan ketertiban umum</p>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>â€¢ Informasi bencana alam</li>
              <li>â€¢ Informasi kerusakan infrastruktur</li>
              <li>â€¢ Informasi gangguan utilitas publik</li>
              <li>â€¢ Informasi darurat lainnya</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-600">
            <h4 className="font-bold text-purple-800 mb-2">ðŸ“‹ Informasi Setiap Saat</h4>
            <p className="text-sm text-gray-700">Informasi yang wajib tersedia setiap saat dan dapat diakses oleh publik</p>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>â€¢ Daftar informasi publik</li>
              <li>â€¢ Hasil keputusan dan pertimbangan</li>
              <li>â€¢ Seluruh kebijakan yang ada</li>
              <li>â€¢ Rencana kerja proyek</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-lg p-5 border-l-4 border-orange-600">
            <h4 className="font-bold text-orange-800 mb-2">ðŸ“¨ Informasi Sesuai Permintaan</h4>
            <p className="text-sm text-gray-700">Informasi yang tidak termasuk kategori di atas dan diminta secara khusus</p>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>â€¢ Data statistik tertentu</li>
              <li>â€¢ Dokumen proyek spesifik</li>
              <li>â€¢ Informasi lain yang tidak dikecualikan</li>
            </ul>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Syarat Pengajuan Permohonan */}
      <FadeIn delay={200}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Syarat Pengajuan Permohonan</h3>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
                Untuk Perorangan:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">âœ“</span>
                  <span>Fotokopi KTP/SIM/Paspor yang masih berlaku</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">âœ“</span>
                  <span>Mengisi formulir permohonan dengan lengkap dan jelas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">âœ“</span>
                  <span>Menyebutkan tujuan penggunaan informasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">âœ“</span>
                  <span>Alamat email/nomor telepon yang aktif</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                </svg>
                Untuk Lembaga/Badan Hukum:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">âœ“</span>
                  <span>Surat kuasa bermaterai dari lembaga/badan hukum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">âœ“</span>
                  <span>Fotokopi akta pendirian lembaga</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">âœ“</span>
                  <span>Fotokopi KTP pengurus yang berwenang</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">âœ“</span>
                  <span>Mengisi formulir permohonan dengan cap lembaga</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>
      
      <FadeIn delay={300}>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-[#2C3E7D] mb-4">Akses Formulir Permohonan</h3>
        <p className="text-gray-700 mb-4">
          Formulir permohonan informasi publik dapat diakses melalui portal PPID Kabupaten Penajam Paser Utara.
        </p>
        <a 
          href="https://ppidppu.penajamkab.go.id/layanan/formulir_permohonan" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 font-bold px-6 py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          style={{ color: 'white !important', textDecoration: 'none' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="white">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
          </svg>
          <span style={{ color: 'white' }}>Buka Formulir Permohonan</span>
        </a>
      </div>
      </FadeIn>

      <FadeIn delay={400}>
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-yellow-800 mb-3">âš ï¸ Informasi Penting:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span>Formulir harus diisi dengan lengkap, jelas, dan benar (data yang tidak lengkap akan dikembalikan)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span>Lampirkan dokumen identitas yang masih berlaku (KTP/SIM/Paspor)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span>Permohonan akan diproses maksimal 10 hari kerja (dapat diperpanjang 7 hari kerja dengan pemberitahuan)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span>Anda akan mendapatkan tanda bukti penerimaan permohonan sebagai tanda registrasi</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span>Informasi yang dikecualikan sesuai UU KIP tidak dapat diberikan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span>Pemohon berhak mengajukan keberatan jika tidak puas dengan layanan yang diberikan</span>
          </li>
        </ul>
      </div>
      </FadeIn>

      {/* Alur Pengisian */}
      <FadeIn delay={500}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Cara Mengisi Formulir</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border-t-4 border-blue-600">
            <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
            <p className="text-sm font-semibold text-gray-800">Buka Link Formulir</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border-t-4 border-blue-600">
            <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
            <p className="text-sm font-semibold text-gray-800">Isi Data Diri Lengkap</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border-t-4 border-purple-600">
            <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
            <p className="text-sm font-semibold text-gray-800">Jelaskan Informasi yang Diminta</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border-t-4 border-orange-600">
            <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
            <p className="text-sm font-semibold text-gray-800">Upload Dokumen & Kirim</p>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Tips Pengajuan Efektif */}
      <FadeIn delay={600}>
      <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-600 mb-8">
        <h3 className="text-lg font-bold text-teal-800 mb-3">ðŸ’¡ Tips Pengajuan Efektif</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-teal-700 mb-2">Detail dan Spesifik:</p>
            <p>Jelaskan dengan detail informasi apa yang Anda butuhkan. Semakin spesifik, semakin cepat diproses.</p>
          </div>
          <div>
            <p className="font-semibold text-teal-700 mb-2">Tujuan Jelas:</p>
            <p>Sebutkan tujuan penggunaan informasi dengan jelas (penelitian, pengawasan, dll).</p>
          </div>
          <div>
            <p className="font-semibold text-teal-700 mb-2">Kontak Aktif:</p>
            <p>Pastikan nomor telepon dan email yang dicantumkan aktif dan dapat dihubungi.</p>
          </div>
          <div>
            <p className="font-semibold text-teal-700 mb-2">Dokumen Lengkap:</p>
            <p>Upload semua dokumen pendukung dengan format dan ukuran yang sesuai.</p>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Dasar Hukum */}
      <FadeIn delay={700}>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-3">ðŸ“œ Dasar Hukum</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-dpupr-blue font-bold">â€¢</span>
            <span><strong>UU No. 14 Tahun 2008</strong> tentang Keterbukaan Informasi Publik</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-dpupr-blue font-bold">â€¢</span>
            <span><strong>Peraturan Komisi Informasi No. 1 Tahun 2021</strong> tentang Standar Layanan Informasi Publik</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-dpupr-blue font-bold">â€¢</span>
            <span><strong>Peraturan Pemerintah No. 61 Tahun 2010</strong> tentang Pelaksanaan UU KIP</span>
          </li>
        </ul>
      </div>
      </FadeIn>
    </div>
  );
};

export default FormulirPermohonan;

