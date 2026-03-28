import FadeIn from '../../components/FadeIn';

const FormulirPermohonan = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <FadeIn>
        <h2 className="text-3xl font-bold text-dpupr-blue mb-6">Formulir Permohonan Informasi</h2>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-700 mb-4">
            Silakan isi formulir permohonan informasi secara lengkap dan benar untuk mempercepat proses layanan.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Isi identitas pemohon dengan lengkap.</li>
            <li>Jelaskan informasi yang diminta secara spesifik.</li>
            <li>Lampirkan dokumen pendukung jika diperlukan.</li>
            <li>Simpan bukti pengajuan untuk proses tracking.</li>
          </ul>
        </div>
      </FadeIn>
    </div>
  );
};

export default FormulirPermohonan;
