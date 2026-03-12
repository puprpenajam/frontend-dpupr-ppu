import FadeIn from '../../components/FadeIn';

const TataCaraSengketa = () => {
  return (
    <div className="mb-8">
      <FadeIn>
      <h2 className="text-2xl font-bold text-dpupr-blue mb-6">Tata Cara Pengajuan Sengketa Informasi Publik</h2>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        Apabila pemohon informasi tidak puas dengan keputusan PPID atas pengajuan keberatan, 
        pemohon dapat mengajukan penyelesaian sengketa informasi publik kepada Komisi Informasi 
        sebagai lembaga independen yang berwenang menyelesaikan sengketa informasi publik.
      </p>

      {/* Kapan Bisa Mengajukan Sengketa */}
      </FadeIn>

      <FadeIn delay={100}>
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-8 border-l-4 border-red-600">
        <h3 className="text-lg font-bold text-red-800 mb-3">⚠️ Kapan Bisa Mengajukan Sengketa?</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>Keberatan yang diajukan ke atasan PPID tidak ditanggapi dalam jangka waktu 30 hari kerja</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>Pemohon tidak puas dengan keputusan atasan PPID atas keberatan yang diajukan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>Badan publik tidak melaksanakan putusan Komisi Informasi</span>
          </li>
        </ul>
      </div>
      </FadeIn>

      {/* Syarat Mengajukan Sengketa */}
      <FadeIn delay={200}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Syarat Mengajukan Sengketa</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
            <h4 className="font-bold text-blue-800 mb-2">📄 Dokumen yang Diperlukan:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Surat permohonan penyelesaian sengketa</li>
              <li>• Fotokopi identitas pemoh on (KTP/SIM/Paspor)</li>
              <li>• Bukti penerimaan permohonan informasi dari PPID</li>
              <li>• Bukti pengajuan keberatan dan tanggapannya</li>
              <li>• Alasan mengajukan sengketa</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
            <h4 className="font-bold text-green-800 mb-2">⏱️ Batas Waktu Pengajuan:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Diajukan paling lambat 14 hari kerja sejak diterimanya tanggapan keberatan</li>
              <li>• Atau 14 hari kerja setelah lewatnya batas waktu 30 hari kerja proses keberatan</li>
              <li>• Keterlambatan pengajuan dapat menyebabkan permohonan tidak dapat diproses</li>
            </ul>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Main Flow */}
      <FadeIn delay={300}>
      <div className="space-y-6">
        {/* Komisi Informasi */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Komisi Informasi</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Pemohon mengajukan sengketa kepada Komisi Informasi dengan menyertakan:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white/80 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700 mb-1">📋 Prosedur</p>
                  <p className="text-sm text-gray-600">Mengikuti tata cara pengajuan sengketa yang telah ditetapkan</p>
                </div>
                <div className="bg-white/80 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700 mb-1">📄 Substansi</p>
                  <p className="text-sm text-gray-600">Menyertakan bukti dan dokumen pendukung yang relevan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Mediasi */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-700 mb-2">Mediasi</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Komisi Informasi akan melakukan mediasi antara pemohon dan PPID untuk mencari 
                penyelesaian yang dapat diterima kedua belah pihak.
              </p>
              <div className="bg-white/80 p-3 rounded-lg">
                <p className="font-semibold text-green-700 mb-2">Hasil Mediasi:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">Sepakat - Selesai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    <span className="text-sm">Tidak Sepakat - Lanjut Ajudikasi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Ajudikasi */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6 border-l-4 border-indigo-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-12 h-12 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-700 mb-2">Ajudikasi</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Jika mediasi tidak mencapai kesepakatan, Komisi Informasi akan melakukan ajudikasi 
                (sidang penyelesaian sengketa).
              </p>
            </div>
          </div>
        </div>

        {/* Putusan */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-600">
            <h4 className="text-lg font-bold text-blue-700 mb-2">Putusan Ajudikasi Komisi Informasi</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Menutup sebagian atau seluruh informasi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Keseluruhan informasi atau membuka sebagian</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Membuka sebagian atau keseluruhan informasi</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-600">
            <h4 className="text-lg font-bold text-blue-700 mb-2">Putusan Mediasi Komisi Informasi</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Kesepakatan yang bersifat final atau mengikat</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Info Box */}
      <FadeIn delay={400}>
      <div className="mt-8 bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6" style={{ color: '#ffffff' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>📞 Informasi Kontak</h3>
        <p className="mb-3" style={{ color: '#ffffff' }}>
          Untuk informasi lebih lanjut mengenai pengajuan sengketa informasi publik, 
          silakan menghubungi <strong style={{ color: '#ffffff' }}>Komisi Informasi Provinsi Kalimantan Timur</strong>.
        </p>
        <div className="bg-white/20 rounded-lg p-4" style={{ color: '#ffffff' }}>
          <p className="mb-1" style={{ color: '#ffffff' }}><strong style={{ color: '#ffffff' }}>Alamat:</strong> Samarinda, Kalimantan Timur</p>
          <p className="mb-1" style={{ color: '#ffffff' }}><strong style={{ color: '#ffffff' }}>Website:</strong> www.kip-kaltim.go.id (contoh)</p>
          <p style={{ color: '#ffffff' }}><strong style={{ color: '#ffffff' }}>Email:</strong> info@kip-kaltim.go.id (contoh)</p>
        </div>
      </div>
      </FadeIn>

      {/* Waktu Proses Sengketa */}
      <FadeIn delay={500}>
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-600">
        <h3 className="text-lg font-bold text-purple-800 mb-3">⏰ Waktu Proses Penyelesaian Sengketa</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span><strong>Mediasi:</strong> Maksimal 14 hari kerja sejak permohonan diterima dan dinyatakan lengkap</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span><strong>Ajudikasi Nonmediasi:</strong> Maksimal 100 hari kerja sejak permohonan diterima dan dinyatakan lengkap</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span>Waktu dapat diperpanjang sesuai kompleksitas kasus dan pertimbangan Komisi Informasi</span>
          </li>
        </ul>
      </div>
      </FadeIn>

      {/* Kekuatan Putusan */}
      <FadeIn delay={600}>
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500">
        <h3 className="text-lg font-bold text-yellow-800 mb-3">⚖️ Kekuatan Hukum Putusan</h3>
        <div className="space-y-3 text-gray-700">
          <div>
            <p className="font-semibold text-yellow-700 mb-1">Putusan Mediasi:</p>
            <p className="text-sm">Bersifat final dan mengikat para pihak. Putusan mediasi yang telah disepakati tidak dapat diajukan keberatan atau gugatan.</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-1">Putusan Ajudikasi:</p>
            <p className="text-sm">Bersifat final dan mengikat. Namun, para pihak dapat mengajukan gugatan ke pengadilan dalam jangka waktu 14 hari kerja sejak putusan diterima jika tidak puas dengan putusan.</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-1">Sanksi Tidak Melaksanakan Putusan:</p>
            <p className="text-sm">Badan publik yang tidak melaksanakan putusan Komisi Informasi dapat dikenakan sanksi sesuai peraturan perundang-undangan yang berlaku.</p>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Dasar Hukum */}
      <FadeIn delay={700}>
      <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">📜 Dasar Hukum Penyelesaian Sengketa</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-dpupr-blue font-bold">•</span>
            <span><strong>UU No. 14 Tahun 2008</strong> tentang Keterbukaan Informasi Publik (Pasal 26, 35-48)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-dpupr-blue font-bold">•</span>
            <span><strong>Peraturan Komisi Informasi No. 1 Tahun 2021</strong> tentang Standar Layanan Informasi Publik</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-dpupr-blue font-bold">•</span>
            <span><strong>Peraturan Komisi Informasi No. 2 Tahun 2010</strong> tentang Prosedur Penyelesaian Sengketa Informasi Publik</span>
          </li>
        </ul>
      </div>
      </FadeIn>
    </div>
  );
};

export default TataCaraSengketa;
