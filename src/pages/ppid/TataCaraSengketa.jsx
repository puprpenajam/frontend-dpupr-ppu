import FadeIn from '../../components/FadeIn';

const TataCaraSengketa = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <FadeIn>
        <h2 className="text-3xl font-bold text-dpupr-blue mb-6">Tata Cara Sengketa Informasi</h2>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-700 mb-4">
            Sengketa informasi dapat diajukan apabila pemohon tidak puas atas hasil keberatan yang diproses PPID.
          </p>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            <li>Ajukan keberatan terlebih dahulu kepada atasan PPID.</li>
            <li>Jika belum selesai, ajukan sengketa ke Komisi Informasi.</li>
            <li>Ikuti proses mediasi atau ajudikasi sesuai ketentuan.</li>
            <li>Laksanakan putusan yang telah berkekuatan hukum.</li>
          </ol>
        </div>
      </FadeIn>
    </div>
  );
};

export default TataCaraSengketa;
