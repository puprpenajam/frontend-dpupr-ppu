import FadeIn from '../../components/FadeIn';

const KanalPengaduan = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <FadeIn>
        <h2 className="text-3xl font-bold text-dpupr-blue mb-6">Kanal Pengaduan</h2>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-700 mb-4">
            Masyarakat dapat menyampaikan pengaduan layanan publik melalui kanal resmi berikut.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Portal pengaduan online pemerintah.</li>
            <li>Email resmi layanan PPID.</li>
            <li>Layanan telepon atau WhatsApp petugas.</li>
            <li>Datang langsung ke kantor layanan.</li>
          </ul>
        </div>
      </FadeIn>
    </div>
  );
};

export default KanalPengaduan;
