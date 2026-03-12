import FadeIn from '../../components/FadeIn';

const VisiMisiPPID = () => {
  return (
    <div className="py-12 px-6 md:px-12 bg-gray-50 rounded-lg text-gray-800">
      <FadeIn>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Visi</h2>
        <p className="text-lg leading-relaxed text-justify">
          Terwujudnya penyelenggaraan pemerintahan yang baik, transparan, efektif dan efisien, akuntabel serta meningkatkan pengelolaan dan pelayanan informasi dan dokumentasi di Pemerintah Kabupaten untuk menghasilkan layanan informasi dan dokumentasi yang berkualitas.
        </p>
      </div>
      </FadeIn>

      <FadeIn delay={200}>
      <div>
        <h2 className="text-2xl font-semibold mb-3">Misi</h2>
        <ul className="space-y-3 text-lg leading-relaxed">
          <li>
            a) Menghimpun informasi publik dari seluruh Bidang dan UPT PU di lingkungan Dinas PUPR Kabupaten Penajam Paser Utara;
          </li>
          <li>
            b) Menata dan menyimpan informasi publik dari seluruh Bidang dan UPT PU di lingkungan Dinas PUPR Kabupaten Penajam Paser Utara;
          </li>
          <li>
            c) Melaksanakan konsultasi informasi publik kategori dikecualikan dari informasi yang terbuka untuk publik;
          </li>
          <li>
            d) Menyelesaikan sengketa informasi.
          </li>
        </ul>
      </div>
      </FadeIn>
    </div>
  );
};

export default VisiMisiPPID;