const KepalaDinas = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dpupr-blue text-center mb-10 sm:mb-12">
          PROFILE PLT. KEPALA DINAS
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Photo & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-dpupr-blue to-blue-700 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
              <div className="mb-6">
                <img 
                  src="/kepala dinas.jpeg" 
                  alt="Kepala Dinas" 
                  className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-cover rounded-lg shadow-xl border-4 border-white"
                />
              </div>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur rounded-full py-2 px-4">
                  <p className="text-white font-bold text-sm sm:text-base">
                    MUHAJIR S.E., S.KOM., M.E., M.LING.
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-full py-2 px-4">
                  <p className="text-white text-sm sm:text-base">
                    BALIKPAPAN, 5 JANUARI 1983
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-full py-2 px-4">
                  <p className="text-white text-sm sm:text-base">
                    NIP. 19830105 200904 1 001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Career & Education Info */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pendidikan */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-dpupr-blue/20 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl sm:text-2xl font-bold text-dpupr-blue mb-4 pb-3 border-b-2 border-dpupr-yellow">
                PENDIDIKAN
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>SDN 043 PEJALA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>SMPN 2 GRIMUKTI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>SMU I WARU</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>S1 - MANAJEMEN</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>S1 - SISTEM INFORMASI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>S2 - MAGISTER EKONOMI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>S2 - MAGISTER LINGKUNGAN</span>
                </li>
              </ul>
            </div>

            {/* Karir */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-dpupr-blue/20 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl sm:text-2xl font-bold text-dpupr-blue mb-4 pb-3 border-b-2 border-dpupr-yellow">
                KARIR
              </h3>
              <ul className="space-y-2 text-gray-700 text-xs sm:text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>KASUBBAG PERENCANAAN DAN PENYUSUNAN ANGGARAN PERIMBANKAN DAN TRANSFER PADA BPKAD 2016 - 2014</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>KASUBBID PERENCANAAN DAN PENYUSUNAN ANGGARAN PERIMBANKAN DAN TRANSFER PADA BADAN KEUANGAN 2016 - 2018</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>KEPALA BIDANG ANGGARAN PADA BADAN KEUANGAN 2018 - 2019</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>SEKRETARIS DAN PLT. BADAN KEUANGAN DAN ASET DAERAH 2020 - 2023</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>KEPALA BADAN KEUANGAN DAN ASET DAERAH 2023 - SEKARANG</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>PLT KEPALA DINAS PEKERJAAN UMUM & PENATAAN RUANG 2025 - SEKARANG</span>
                </li>
              </ul>
            </div>

            {/* Penghargaan */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-dpupr-blue/20 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl sm:text-2xl font-bold text-dpupr-blue mb-4 pb-3 border-b-2 border-dpupr-yellow">
                PENGHARGAAN
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>SATYALANCANA KARYA SATYA 2022</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>JMSI AWARD 2024 SEBAGAI TOKOH INOVATOR PENGELOLAAN TRANSPARANSI ANGGARAN DAERAH</span>
                </li>
              </ul>
            </div>

            {/* Hobi */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-dpupr-blue/20 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl sm:text-2xl font-bold text-dpupr-blue mb-4 pb-3 border-b-2 border-dpupr-yellow">
                HOBI
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>BADMINTON</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>PICKLE BALL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dpupr-yellow mt-1">•</span>
                  <span>JOGGING</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KepalaDinas;

