const VisiMisiPUPR = () => {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#1E3A7D] mb-3">Visi DPUPR PPU</h2>
        <p className="text-gray-700 leading-relaxed">
          Terwujudnya infrastruktur pekerjaan umum dan penataan ruang yang andal, merata, dan berkelanjutan
          untuk mendukung peningkatan kualitas hidup masyarakat Kabupaten Penajam Paser Utara.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#1E3A7D] mb-4">Misi DPUPR PPU</h2>
        <ol className="space-y-3 text-gray-700 leading-relaxed list-decimal list-inside">
          <li>Meningkatkan kualitas infrastruktur dasar yang aman, layak, dan berdaya guna bagi masyarakat.</li>
          <li>Mewujudkan tata kelola layanan publik yang responsif, transparan, dan akuntabel.</li>
          <li>Memperkuat perencanaan dan pengendalian pemanfaatan ruang yang tertib dan berwawasan lingkungan.</li>
          <li>Mendorong kolaborasi dengan masyarakat serta pemangku kepentingan dalam pembangunan berkelanjutan.</li>
        </ol>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#1E3A7D] mb-2">Komitmen Pelayanan</h3>
        <p className="text-gray-700 leading-relaxed">
          Seluruh visi dan misi tersebut diterjemahkan ke dalam program kerja yang terukur agar manfaat pembangunan
          dapat dirasakan secara nyata oleh masyarakat, baik di kawasan perkotaan maupun perdesaan.
        </p>
      </div>
    </div>
  );
};

export default VisiMisiPUPR;
