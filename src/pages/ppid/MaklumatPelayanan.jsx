import FadeIn from '../../components/FadeIn';

const MaklumatPelayanan = () => {
  return (
    <div className="py-12 px-6 md:px-12 bg-gray-50 rounded-lg text-gray-800">
      <FadeIn>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 uppercase">
        Maklumat Pelayanan Informasi Publik
      </h1>

      <p className="text-lg leading-relaxed text-justify mb-4">
        Mewujudkan tata kelola pemerintahan yang transparan dan akuntabel, Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Penajam Paser Utara berupaya memberikan pelayanan informasi dengan sebaik-baiknya dan berkomitmen untuk :
      </p>
      </FadeIn>

      <FadeIn delay={200}>
      <ol className="list-decimal list-outside ml-6 md:ml-8 space-y-3 text-lg leading-relaxed mb-16 text-justify">
        <li>
          Memberikan Informasi Publik sesuai dengan peraturan yang berlaku (UU No. 14 Tahun 2008);
        </li>
        <li>
          Menyediakan Informasi Publik yang akurat, benar dan tidak menyesatkan;
        </li>
        <li>
          Memberikan layanan informasi, memanfaatkan Teknologi Informasi yang mudah diakses masyarakat;
        </li>
        <li>
          Tidak Melakukan pungutan yang tidak sah dalam memberikan layanan Informasi Publik.
        </li>
      </ol>
      </FadeIn>

      <FadeIn delay={400}>
      <div className="flex justify-end">
        <div className="text-center">
          <p className="text-lg mb-1">Penajam, 23 Juli 2025</p>
          <p className="text-lg mb-24">Plt. Kepala Dinas</p>
          
          <p className="text-lg font-bold underline">
            Muhajir, S.E., S.Kom., M.E., M.Ling.
          </p>
          <p className="text-lg">NIP. 198301052009041001</p>
        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default MaklumatPelayanan;