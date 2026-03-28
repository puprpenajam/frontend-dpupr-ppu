const DaftarPejabat = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-4">
      <h2 className="text-2xl font-bold text-[#1E3A7D]">Daftar Pejabat DPUPR PPU</h2>
      <p className="text-gray-700 leading-relaxed">
        Halaman ini memuat informasi struktur pejabat pada lingkungan DPUPR PPU sebagai bentuk keterbukaan
        informasi publik dan kemudahan koordinasi layanan kepada masyarakat.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-700 leading-relaxed">
          Data pejabat dapat diperbarui secara berkala sesuai ketentuan organisasi dan keputusan kepegawaian yang berlaku.
          Untuk kebutuhan informasi resmi terkait nama jabatan atau penanggung jawab bidang, masyarakat dapat menghubungi
          sekretariat DPUPR PPU melalui kanal layanan yang tersedia.
        </p>
      </div>

      <p className="text-sm text-gray-500">
        Catatan: daftar rinci pejabat dapat ditampilkan berdasarkan pembaruan internal organisasi.
      </p>
    </div>
  );
};

export default DaftarPejabat;
