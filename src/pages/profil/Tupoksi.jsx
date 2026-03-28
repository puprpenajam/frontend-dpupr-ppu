const Tupoksi = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-5">
      <h2 className="text-2xl font-bold text-[#1E3A7D]">Tugas Pokok dan Fungsi</h2>

      <div>
        <h3 className="text-lg font-semibold text-[#1E3A7D] mb-2">Tugas Pokok</h3>
        <p className="text-gray-700 leading-relaxed">
          DPUPR PPU melaksanakan urusan pemerintahan daerah di bidang pekerjaan umum dan penataan ruang,
          yang meliputi perencanaan, pelaksanaan, pembinaan, pengawasan, serta pelayanan teknis kepada masyarakat.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#1E3A7D] mb-2">Fungsi Utama</h3>
        <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
          <li>Penyusunan kebijakan teknis dan perencanaan program pembangunan infrastruktur daerah.</li>
          <li>Pelaksanaan pembangunan, peningkatan, dan pemeliharaan sarana prasarana pekerjaan umum.</li>
          <li>Pengelolaan layanan tata ruang dan pengendalian pemanfaatan ruang wilayah.</li>
          <li>Pelaksanaan pembinaan teknis serta koordinasi lintas perangkat daerah dan pemangku kepentingan.</li>
          <li>Penyelenggaraan pelayanan publik yang efektif, terbuka, dan berorientasi pada kebutuhan masyarakat.</li>
        </ul>
      </div>

      <p className="text-gray-700 leading-relaxed">
        Melalui tugas pokok dan fungsi tersebut, DPUPR PPU berkomitmen mendukung pembangunan daerah
        yang berkelanjutan serta meningkatkan kualitas pelayanan infrastruktur bagi seluruh warga.
      </p>
    </div>
  );
};

export default Tupoksi;
