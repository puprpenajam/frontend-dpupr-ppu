import FadeIn from '../../components/FadeIn';

const TataCaraKeberatan = () => {
  return (
    <div className="mb-8">
      <FadeIn>
      <h2 className="text-2xl font-bold text-dpupr-blue mb-6">Tata Cara Pengajuan Keberatan Informasi Publik</h2>
      
      {/* Alasan Pengajuan Keberatan Section */}
      </FadeIn>

      <FadeIn delay={100}>
      <div className="mb-10">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-4 rounded-t-xl">
          <h3 className="text-xl font-bold" style={{ color: '#ffffff' }}>ALASAN PENGAJUAN KEBERATAN OLEH PEMOHON INFORMASI</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {/* Alasan 1 - Blue */}
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-5 border-l-4 border-blue-800 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">●</span>
            </div>
            <p className="text-gray-800 font-medium">Penolakan berdasarkan alasan pengecualian informasi publik</p>
          </div>

          {/* Alasan 2 - Pink/Brown */}
          <div className="bg-gradient-to-r from-red-100 to-red-200 rounded-lg p-5 border-l-4 border-red-900 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">●</span>
            </div>
            <p className="text-gray-800 font-medium">Tidak disediakannya informasi berkala</p>
          </div>

          {/* Alasan 3 - Gray */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-5 border-l-4 border-gray-700 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">●</span>
            </div>
            <p className="text-gray-800 font-medium">Tidak ditanggapinya pemerintahan informasi publik</p>
          </div>

          {/* Alasan 4 - Purple */}
          <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-5 border-l-4 border-purple-700 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">●</span>
            </div>
            <p className="text-gray-800 font-medium">Permintaan informasi publik ditanggapi tidak sebagaimana yang diminta</p>
          </div>

          {/* Alasan 5 - Lime/Green */}
          <div className="bg-gradient-to-r from-lime-100 to-lime-200 rounded-lg p-5 border-l-4 border-lime-700 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-lime-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">●</span>
            </div>
            <p className="text-gray-800 font-medium">Tidak dikabulkannya permintaan informasi publik</p>
          </div>

          {/* Alasan 6 - Yellow */}
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg p-5 border-l-4 border-yellow-600 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">●</span>
            </div>
            <p className="text-gray-800 font-medium">Pengenaan biaya yang tidak wajar dan/tidak</p>
          </div>

          {/* Alasan 7 - Pink/Magenta */}
          <div className="bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg p-5 border-l-4 border-pink-700 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-pink-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">●</span>
            </div>
            <p className="text-gray-800 font-medium">Penyampaian informasi publik yang melebihi waktu yang diatur dalam peraturan komisi informasi nomor 1 tahun 2021</p>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Proses/Tata Cara Section */}
      <FadeIn delay={200}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">Proses Pengajuan Keberatan</h3>
      </div>
      </FadeIn>

      <FadeIn delay={300}>
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-700 mb-2">Pemohon Menyampaikan Permohonan Informasi</h3>
              <p className="text-gray-700 leading-relaxed">
                Pemohon menyampaikan permohonan informasi kepada PPID melalui Portal PPID, 
                e-mail, surat, atau datang langsung ke meja layanan PPID dan Pemohon mengisi formulir dan 
                memberikan satuan identitas diri / badan kepada petugas informasi.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-teal-700 mb-2">Petugas Memproses Informasi</h3>
              <p className="text-gray-700 leading-relaxed">
                Petugas memproses informasi sesuai formulir permintaan yang telah ditandatangani oleh pemohon.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-700 mb-2">PPID Memberikan Jawaban</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                PPID memberikan jawaban untuk memenuhi permohonan informasi atau tidak memenuhi 
                dengan disertai alasan, dalam waktu 10 hari kerja dan dapat diperpanjang 7 hari kerja.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6 border-l-4 border-pink-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-pink-700 mb-2">Penyelesaian Sengketa</h3>
              <p className="text-gray-700 leading-relaxed">
                Jika pemohon keberatan atas jawaban PPID, maka penyelesaian sengketa 
                informasi kepada komisi pusat.
              </p>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Info Box */}
      <FadeIn delay={400}>
      <div className="mt-8 bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6" style={{ color: '#ffffff' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>⚖️ Informasi Penting</h3>
        <ul className="space-y-2" style={{ color: '#ffffff' }}>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>•</span>
            <span style={{ color: '#ffffff' }}>Keberatan dapat diajukan jika pemohon merasa tidak puas dengan jawaban atau layanan yang diberikan oleh PPID</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>•</span>
            <span style={{ color: '#ffffff' }}>Pengajuan keberatan harus disertai dengan alasan yang jelas dan bukti pendukung</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>•</span>
            <span style={{ color: '#ffffff' }}>Proses penyelesaian keberatan akan dilakukan secara adil dan transparan sesuai dengan peraturan yang berlaku</span>
          </li>
        </ul>
      </div>
      </FadeIn>
    </div>
  );
};

export default TataCaraKeberatan;
