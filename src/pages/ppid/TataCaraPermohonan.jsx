import FadeIn from '../../components/FadeIn';

const TataCaraPermohonan = () => {
  return (
    <div className="mb-8">
      <FadeIn>
      <h2 className="text-2xl font-bold text-dpupr-blue mb-6">Alur Permohonan Informasi Publik</h2>
      
      {/* Penjelasan Awal */}
      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6 mb-8" style={{ color: '#ffffff' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>ðŸ“‹ Tentang Permohonan Informasi</h3>
        <p className="leading-relaxed mb-3" style={{ color: '#ffffff' }}>
          Setiap warga negara Indonesia berhak memperoleh informasi publik sesuai dengan ketentuan 
          Undang-Undang No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik. Halaman ini menjelaskan 
          alur lengkap proses permohonan informasi dari awal hingga selesai.
        </p>
        <p className="leading-relaxed" style={{ color: '#ffffff' }}>
          Proses ini dirancang untuk memastikan transparansi, akuntabilitas, dan kemudahan akses 
          informasi bagi masyarakat dengan tetap memperhatikan ketentuan informasi yang dikecualikan.
        </p>
      </div>
      </FadeIn>

      <FadeIn delay={100}>
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-dpupr-blue">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-dpupr-blue text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-dpupr-blue mb-2">Pemohon Mengajukan Permohonan</h3>
              <p className="text-gray-700 leading-relaxed">
                Pemohon mengajukan permohonan informasi secara online melalui Portal PPID 
                (<a href="https://ppidppu.penajamkab.go.id" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ppidppu.penajamkab.go.id</a>) 
                dengan melengkapi syarat dan mengisi formulir permohonan.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-blue-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Petugas Mengecek Kelengkapan Syarat Permohonan</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Petugas memeriksa kelengkapan dokumen dan syarat permohonan yang diajukan.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white/80 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700 mb-1">âœ“ Lengkap</p>
                  <p className="text-sm text-gray-600">Lanjut ke proses selanjutnya</p>
                </div>
                <div className="bg-white/80 p-3 rounded-lg">
                  <p className="font-semibold text-red-600 mb-1">âœ— Tidak Lengkap</p>
                  <p className="text-sm text-gray-600">Dikembalikan untuk dilengkapi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-purple-700 mb-2">Pejabat Menerima dan Registrasi Permohonan</h3>
              <p className="text-gray-700 leading-relaxed">
                Pejabat PPID menerima dan meregistrasi permohonan yang telah memenuhi syarat. 
                Hari kerja dan tanggal dihitung sejak permohonan terdaftar.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-orange-700 mb-2">Permohonan Diteruskan ke Pimpinan</h3>
              <p className="text-gray-700 leading-relaxed">
                Permohonan diteruskan ke pimpinan untuk mendapatkan persetujuan dan arahan terkait 
                informasi yang dimohonkan.
              </p>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
              5
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-700 mb-2">Proses Sengketa Informasi di Komisi Informasi</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Jika terjadi sengketa, proses dapat dilakukan di Komisi Informasi dengan diskusi temuan 
                di Samarinda.
              </p>
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
              6
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-700 mb-2">Penolakan Permohonan Sengketa</h3>
              <p className="text-gray-700 leading-relaxed">
                Jika permohonan sengketa ditolak, pemohon akan diberikan pemberitahuan resmi.
              </p>
            </div>
          </div>
        </div>

        {/* Step 7 */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
              7
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-teal-700 mb-2">Permohonan Diterima - Keberatan</h3>
              <p className="text-gray-700 leading-relaxed">
                Jika permohonan diterima, pemohon dapat mengajukan keberatan jika tidak puas 
                dengan informasi yang diberikan.
              </p>
            </div>
          </div>
        </div>

        {/* Step 8 */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6 border-l-4 border-indigo-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
              8
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-700 mb-2">Keberatan di Proses 30 Hari Kerja</h3>
              <p className="text-gray-700 leading-relaxed">
                Keberatan akan diproses maksimal 30 hari kerja sejak diterimanya pengajuan keberatan.
              </p>
            </div>
          </div>
        </div>

        {/* Step 9 */}
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6 border-l-4 border-pink-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
              9
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-pink-700 mb-2">Permohonan Selesai</h3>
              <p className="text-gray-700 leading-relaxed">
                Permohonan telah selesai diproses dan informasi diberikan kepada pemohon 
                sesuai dengan ketentuan yang berlaku.
              </p>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Waktu Proses */}
      <FadeIn delay={200}>
      <div className="mt-8 bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6" style={{ color: '#ffffff' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>â° Waktu Proses Permohonan</h3>
        <ul className="space-y-2" style={{ color: '#ffffff' }}>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>â€¢</span>
            <span style={{ color: '#ffffff' }}>Permohonan informasi diproses maksimal <strong style={{ color: '#ffffff' }}>10 hari kerja</strong> sejak permohonan diterima</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>â€¢</span>
            <span style={{ color: '#ffffff' }}>Dapat diperpanjang maksimal <strong style={{ color: '#ffffff' }}>7 hari kerja</strong> dengan pemberitahuan tertulis</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>â€¢</span>
            <span style={{ color: '#ffffff' }}>Keberatan diproses maksimal <strong style={{ color: '#ffffff' }}>30 hari kerja</strong></span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>â€¢</span>
            <span style={{ color: '#ffffff' }}>Sengketa di Komisi Informasi diproses sesuai prosedur yang berlaku</span>
          </li>
        </ul>
      </div>
      </FadeIn>

      {/* Hak Pemohon */}
      <FadeIn delay={300}>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
          <h3 className="text-lg font-bold text-blue-800 mb-3">âœ… Hak Pemohon Informasi</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">âœ“</span>
              <span>Mendapatkan informasi sesuai permintaan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">âœ“</span>
              <span>Menerima tanda bukti penerimaan permohonan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">âœ“</span>
              <span>Mendapat pemberitahuan tertulis jika permohonan ditolak</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">âœ“</span>
              <span>Mengajukan keberatan atas penolakan atau ketidak puasan layanan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">âœ“</span>
              <span>Mengajukan gugatan ke pengadilan jika tidak puas dengan keputusan keberatan</span>
            </li>
          </ul>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-600">
          <h3 className="text-lg font-bold text-red-800 mb-3">â›” Informasi yang Dikecualikan</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">Ã—</span>
              <span>Informasi yang dapat mengganggu kepentingan perlindungan hak kekayaan intelektual</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">Ã—</span>
              <span>Informasi yang dapat membahayakan keamanan dan keselamatan negara</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">Ã—</span>
              <span>Informasi yang dapat mengungkapkan kekayaan alam Indonesia yang harus dilindungi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">Ã—</span>
              <span>Informasi yang dapat merugikan ketahanan ekonomi nasional</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">Ã—</span>
              <span>Informasi yang dapat merugikan kepentingan hubungan luar negeri</span>
            </li>
          </ul>
        </div>
      </div>
      </FadeIn>

      {/* Tips Mengajukan Permohonan */}
      <FadeIn delay={400}>
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500">
        <h3 className="text-lg font-bold text-yellow-800 mb-4">ðŸ’¡ Tips Mengajukan Permohonan yang Efektif</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-yellow-700 mb-2">ðŸ“ 1. Jelas dan Spesifik</p>
            <p className="text-sm text-gray-700">Jelaskan dengan detail dan spesifik informasi apa yang Anda butuhkan. Hindari permintaan yang terlalu umum atau tidak jelas.</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-2">ðŸ“Ž 2. Lampirkan Dokumen Lengkap</p>
            <p className="text-sm text-gray-700">Pastikan semua dokumen pendukung seperti KTP, surat kuasa (jika diperlukan) terlampir dengan jelas.</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-2">ðŸ“ž 3. Kontak yang Aktif</p>
            <p className="text-sm text-gray-700">Cantumkan nomor telepon dan email yang aktif sehingga PPID dapat menghubungi Anda jika diperlukan.</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-2">ðŸŽ¯ 4. Sebutkan Tujuan Penggunaan</p>
            <p className="text-sm text-gray-700">Jelaskan tujuan penggunaan informasi (penelitian, pengawasan, transparansi, dll) agar PPID dapat memahami kebutuhan Anda.</p>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Biaya Layanan */}
      <FadeIn delay={500}>
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-3">ðŸ’° Biaya Layanan Informasi</h3>
        <div className="space-y-3 text-gray-700">
          <p className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">â€¢</span>
            <span><strong>GRATIS:</strong> Untuk melihat dan membaca informasi di kantor PPID atau melalui portal online</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">â€¢</span>
            <span><strong>BIAYA WAJAR:</strong> Untuk penggandaan (fotokopi, cetak) sesuai biaya riil yang dikeluarkan</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">â€¢</span>
            <span><strong>TRANSPARAN:</strong> Rincian biaya akan dijelaskan secara detail kepada pemohon sebelum diproses</span>
          </p>
          <p className="text-sm italic text-gray-600 mt-3">
            * Biaya tidak termasuk imbalan atau uang tips kepada petugas. Apabila ada pungutan diluar ketentuan, silakan laporkan ke pengawasan internal.
          </p>
        </div>
      </div>
      </FadeIn>

      {/* Gambar Bagan Asli */}
      <FadeIn delay={600}>
      <div className="mt-12 flex justify-center overflow-x-auto">
        {/* Pastikan path 'src' disesuaikan dengan lokasi file gambar di folder public projectmu */}
        <img 
          src="/public/tata-cara-permohonan-ppid.png" 
          alt="Bagan Tata Cara Permohonan Informasi Publik" 
          className="max-w-none shadow-md rounded-lg"
        />
      </div>
      </FadeIn>
    </div>
  );
};

export default TataCaraPermohonan;

