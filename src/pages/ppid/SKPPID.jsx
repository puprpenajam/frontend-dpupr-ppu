import FadeIn from '../../components/FadeIn';

const SKPPID = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <FadeIn>
        <h2 className="text-3xl font-bold text-dpupr-blue mb-6">SK PPID</h2>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-xl font-bold text-dpupr-blue mb-3">Informasi Umum</h3>
          <p className="text-gray-700 mb-3">
            Dokumen SK PPID menjadi dasar hukum pembentukan dan pelaksanaan layanan informasi publik.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Menetapkan struktur organisasi PPID.</li>
            <li>Menetapkan tugas dan tanggung jawab petugas layanan.</li>
            <li>Menjadi acuan pelaksanaan keterbukaan informasi publik.</li>
          </ul>
        </div>
      </FadeIn>
    </div>
  );
};

export default SKPPID;
