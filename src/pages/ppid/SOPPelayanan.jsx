import FadeIn from '../../components/FadeIn';

const SOPPelayanan = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <FadeIn>
        <h2 className="text-3xl font-bold text-dpupr-blue mb-6">SOP Pelayanan PPID</h2>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-600">
            <h3 className="font-bold text-blue-800 mb-2">Tahap 1 - Penerimaan</h3>
            <p className="text-gray-700">Permohonan diterima dan diverifikasi kelengkapannya.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-600">
            <h3 className="font-bold text-purple-800 mb-2">Tahap 2 - Proses</h3>
            <p className="text-gray-700">Permintaan diproses sesuai standar layanan informasi publik.</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-5 border-l-4 border-yellow-600">
            <h3 className="font-bold text-yellow-800 mb-2">Tahap 3 - Penyampaian</h3>
            <p className="text-gray-700">Hasil layanan disampaikan kepada pemohon.</p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default SOPPelayanan;
