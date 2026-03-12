import FadeIn from '../../components/FadeIn';

const JamLayanan = () => {
  return (
    <div className="mb-8">
      <FadeIn>
      <h2 className="text-2xl font-bold text-dpupr-blue mb-6">Jadwal Pelayanan PPID</h2>
      
      {/* Main Schedule Card */}
      </FadeIn>

      <FadeIn delay={100}>
      <div className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 rounded-2xl p-12 shadow-2xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h3 className="text-5xl font-extrabold mb-4" style={{ 
            color: '#FDB913',
            textShadow: '3px 3px 0px rgba(255,255,255,0.3)',
            WebkitTextStroke: '2px white'
          }}>
            Jadwal Pelayanan
          </h3>
          <div className="inline-block bg-white rounded-full px-8 py-3">
            <p className="text-2xl font-bold" style={{ color: '#FDB913' }}>
              Informasi pelayanan Publik
            </p>
          </div>
        </div>

        {/* Schedule Items */}
        <div className="max-w-3xl mx-auto space-y-6 mt-12">
          {/* Senin - Kamis */}
          <div className="flex items-center justify-between bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex-1">
              <p className="text-3xl font-bold" style={{ color: '#ffffff' }}>
                Senin - Kamis
              </p>
            </div>
            <div className="bg-yellow-100 rounded-lg px-8 py-4 shadow-lg">
              <p className="text-3xl font-bold text-gray-800">08:00 - 16:00</p>
            </div>
          </div>

          {/* Jumat */}
          <div className="flex items-center justify-between bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex-1">
              <p className="text-3xl font-bold" style={{ color: '#ffffff' }}>
                Jumat
              </p>
            </div>
            <div className="bg-yellow-100 rounded-lg px-8 py-4 shadow-lg">
              <p className="text-3xl font-bold text-gray-800">08:00 - 15:00</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 text-center">
          <p className="text-lg" style={{ color: '#ffffff' }}>
            * Kecuali hari libur nasional dan cuti bersama
          </p>
        </div>
      </div>
      </FadeIn>

      {/* Info Box */}
      <FadeIn delay={200}>
      <div className="mt-8 bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6" style={{ color: '#ffffff' }}>
        <h4 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>📅 Informasi Layanan</h4>
        <ul className="space-y-2" style={{ color: '#ffffff' }}>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>•</span>
            <span style={{ color: '#ffffff' }}>Layanan PPID tersedia pada jam kerja yang telah ditentukan</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>•</span>
            <span style={{ color: '#ffffff' }}>Untuk pelayanan diluar jam kerja dapat menghubungi melalui email atau portal PPID online</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#ffffff' }}>
            <span className="flex-shrink-0" style={{ color: '#ffffff' }}>•</span>
            <span style={{ color: '#ffffff' }}>Pastikan membawa dokumen identitas yang diperlukan saat mengunjungi layanan PPID</span>
          </li>
        </ul>
      </div>
      </FadeIn>
    </div>
  );
};

export default JamLayanan;
