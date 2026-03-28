import FadeIn from '../../components/FadeIn';

const TataCaraPermohonan = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <FadeIn>
        <h2 className="text-3xl font-bold text-dpupr-blue mb-6">Tata Cara Permohonan Informasi</h2>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6 mb-8 text-white">
          <h3 className="text-xl font-bold mb-3">Tentang Permohonan Informasi</h3>
          <p className="leading-relaxed">
            Setiap warga negara berhak memperoleh informasi publik sesuai ketentuan peraturan perundang-undangan.
            Berikut adalah alur pengajuan permohonan informasi publik pada layanan PPID DPUPR.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="space-y-4 mb-8">
          <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-600">
            <h3 className="text-lg font-bold text-blue-700 mb-2">1. Isi Formulir Permohonan</h3>
            <p className="text-gray-700">Pemohon mengisi data identitas dan informasi yang diminta secara lengkap.</p>
          </div>

          <div className="bg-green-50 rounded-xl p-5 border-l-4 border-blue-600">
            <h3 className="text-lg font-bold text-blue-700 mb-2">2. Verifikasi Dokumen</h3>
            <p className="text-gray-700">Petugas memeriksa kelengkapan persyaratan permohonan.</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-600">
            <h3 className="text-lg font-bold text-purple-700 mb-2">3. Proses Permohonan</h3>
            <p className="text-gray-700">PPID memproses permohonan sesuai standar waktu layanan.</p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5 border-l-4 border-yellow-600">
            <h3 className="text-lg font-bold text-yellow-700 mb-2">4. Penyampaian Informasi</h3>
            <p className="text-gray-700">Informasi diberikan kepada pemohon sesuai hasil verifikasi dan klasifikasi informasi.</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-dpupr-blue mb-4">Standar Waktu Pelayanan</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Permohonan diproses maksimal 10 hari kerja sejak dinyatakan lengkap.</li>
            <li>Dapat diperpanjang maksimal 7 hari kerja dengan pemberitahuan tertulis.</li>
            <li>Pemohon dapat mengajukan keberatan apabila tidak puas terhadap layanan.</li>
          </ul>
        </div>
      </FadeIn>

      <FadeIn delay={400}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
            <h3 className="text-lg font-bold text-blue-800 mb-3">Hak Pemohon</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Mendapatkan informasi sesuai ketentuan.</li>
              <li>Menerima tanggapan atas permohonan.</li>
              <li>Mengajukan keberatan dan sengketa informasi sesuai prosedur.</li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-600">
            <h3 className="text-lg font-bold text-red-800 mb-3">Informasi Dikecualikan</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Informasi yang mengganggu penegakan hukum.</li>
              <li>Informasi yang membahayakan keamanan negara.</li>
              <li>Informasi yang dilindungi ketentuan kerahasiaan lainnya.</li>
            </ul>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default TataCaraPermohonan;
