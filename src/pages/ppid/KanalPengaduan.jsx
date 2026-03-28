import FadeIn from '../../components/FadeIn';

const KanalPengaduan = () => {
  return (
    <div className="mb-8">
      <FadeIn>
      <h2 className="text-2xl font-bold text-dpupr-blue mb-6">Kanal Pengaduan Masyarakat</h2>
      
      {/* Introduction */}
      </FadeIn>

      <FadeIn delay={100}>
      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6 mb-8" style={{ color: '#ffffff' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>ðŸ“¢ Tentang Layanan Pengaduan</h3>
        <p className="leading-relaxed mb-3" style={{ color: '#ffffff' }}>
          Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Penajam Paser Utara menyediakan berbagai kanal pengaduan 
          untuk menerima aspirasi, keluhan, dan laporan masyarakat terkait pelayanan publik, infrastruktur, dan tata ruang.
        </p>
        <p className="leading-relaxed" style={{ color: '#ffffff' }}>
          Pengaduan Anda akan diproses dan ditindaklanjuti sesuai dengan mekanisme yang berlaku untuk meningkatkan 
          kualitas pelayanan dan pembangunan daerah.
        </p>
      </div>
      </FadeIn>

      {/* LAPOR.GO.ID - Featured */}
      <FadeIn delay={200}>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 mb-8 border-2 border-blue-500 shadow-lg">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-blue-800 mb-3">LAPOR! - Layanan Aspirasi dan Pengaduan Online Rakyat</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              LAPOR! adalah sistem pengaduan pelayanan publik nasional berbasis website dan aplikasi mobile yang dikelola 
              oleh Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (KemenPAN-RB). Platform ini memungkinkan 
              masyarakat untuk menyampaikan pengaduan secara online dengan mudah, cepat, dan transparan.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 border border-blue-200">
              <h4 className="font-bold text-blue-700 mb-2">Keunggulan LAPOR.GO.ID:</h4>
              <ul className="space-y-1 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">âœ“</span>
                  <span>Terintegrasi dengan sistem pemerintahan nasional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">âœ“</span>
                  <span>Tracking status pengaduan secara real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">âœ“</span>
                  <span>Dapat diakses melalui website dan aplikasi mobile (Android/iOS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">âœ“</span>
                  <span>Respon cepat dari instansi terkait</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">âœ“</span>
                  <span>Transparan dan dapat dipantau publik</span>
                </li>
              </ul>
            </div>
            <a 
              href="https://www.lapor.go.id/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{ color: '#ffffff' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span style={{ color: '#ffffff' }}>BUKA LAPOR.GO.ID</span>
            </a>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Other Channels */}
      <FadeIn delay={300}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Kanal Pengaduan Lainnya</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Email */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-800 mb-2">Email Resmi</h4>
                <p className="text-gray-700 text-sm mb-2">Kirim pengaduan melalui email resmi DPUPR PPU</p>
                <p className="text-blue-700 font-semibold">dpupr@penajamkab.go.id</p>
              </div>
            </div>
          </div>

          {/* Telepon */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-800 mb-2">Telepon / WhatsApp</h4>
                <p className="text-gray-700 text-sm mb-2">Hubungi hotline pelayanan DPUPR PPU</p>
                <p className="text-blue-700 font-semibold">(0542) 123456</p>
              </div>
            </div>
          </div>

          {/* Datang Langsung */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 mb-2">Kunjungi Kantor</h4>
                <p className="text-gray-700 text-sm mb-2">Sampaikan pengaduan langsung ke kantor DPUPR PPU</p>
                <p className="text-purple-700 font-semibold text-sm">Jl. Raya Nenang, Penajam, Kalimantan Timur</p>
              </div>
            </div>
          </div>

          {/* Surat */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-orange-800 mb-2">Surat Tertulis</h4>
                <p className="text-gray-700 text-sm mb-2">Kirim surat pengaduan resmi ke alamat kantor</p>
                <p className="text-orange-700 font-semibold text-sm">DPUPR Kab. PPU, Jl. Raya Nenang</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Jenis Pengaduan */}
      <FadeIn delay={400}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Jenis Pengaduan yang Dapat Disampaikan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">ðŸ—ï¸ Infrastruktur Jalan</h4>
            <p className="text-gray-700 text-sm">Jalan rusak, lubang, kerusakan jembatan, drainase bermasalah</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">ðŸ’§ Sumber Daya Air</h4>
            <p className="text-gray-700 text-sm">Banjir, irigasi rusak, tanggul jebol, sungai tersumbat</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <h4 className="font-bold text-purple-800 mb-2">ðŸ˜ï¸ Tata Ruang</h4>
            <p className="text-gray-700 text-sm">Pelanggaran IMB, bangunan ilegal, pelanggaran RTRW</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-2">ðŸ¢ Bangunan Gedung</h4>
            <p className="text-gray-700 text-sm">Perizinan bangunan, gedung rusak, fasilitas publik</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
            <h4 className="font-bold text-red-800 mb-2">âš ï¸ Darurat</h4>
            <p className="text-gray-700 text-sm">Keadaan darurat infrastruktur yang mengancam keselamatan</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
            <h4 className="font-bold text-indigo-800 mb-2">ðŸ“‹ Pelayanan Publik</h4>
            <p className="text-gray-700 text-sm">Keluhan terkait layanan administrasi dan perizinan</p>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Prosedur Pengaduan */}
      <FadeIn delay={500}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Prosedur Pengaduan</h3>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-dpupr-blue text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Sampaikan Pengaduan</h4>
                <p className="text-gray-700 text-sm">Pilih salah satu kanal pengaduan yang tersedia dan sampaikan keluhan Anda dengan jelas, sertakan bukti foto/dokumen jika ada</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-dpupr-blue text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Verifikasi</h4>
                <p className="text-gray-700 text-sm">Tim DPUPR akan memverifikasi dan mengklasifikasikan pengaduan Anda (maksimal 3 hari kerja)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-dpupr-blue text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Tindak Lanjut</h4>
                <p className="text-gray-700 text-sm">Pengaduan akan ditindaklanjuti oleh unit terkait sesuai dengan tingkat urgensi dan kewenangan</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-dpupr-blue text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Respon & Penyelesaian</h4>
                <p className="text-gray-700 text-sm">Anda akan menerima informasi perkembangan pengaduan dan solusi yang diberikan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Tips Pengaduan Efektif */}
      <FadeIn delay={600}>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500">
        <h3 className="text-lg font-bold text-yellow-800 mb-3">ðŸ’¡ Tips Pengaduan Efektif</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span><strong>Jelas dan Spesifik:</strong> Jelaskan masalah dengan detail, sertakan lokasi yang tepat (alamat/koordinat)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span><strong>Sertakan Bukti:</strong> Lampirkan foto, video, atau dokumen pendukung lainnya</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span><strong>Data Diri Lengkap:</strong> Cantumkan nama, nomor kontak yang dapat dihubungi untuk koordinasi</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span><strong>Gunakan Bahasa Sopan:</strong> Sampaikan dengan bahasa yang baik dan santun</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">â€¢</span>
            <span><strong>Follow Up:</strong> Pantau perkembangan pengaduan Anda melalui kanal yang dipilih</span>
          </li>
        </ul>
      </div>
      </FadeIn>
    </div>
  );
};

export default KanalPengaduan;

