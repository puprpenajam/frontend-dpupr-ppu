import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-dpupr-blue to-blue-700 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* About Section - Left */}
          <div className="space-y-4 text-left">
            <img src="/logo/logo PUPR.png" alt="Logo DPUPR" className="h-14 sm:h-16 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold">
              Dinas Pekerjaan Umum dan Penataan Ruang
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Kabupaten Penajam Paser Utara
            </p>
            <div className="space-y-3 pt-4">
              <p className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <span className="text-lg mt-0.5">✉</span>
                <span>dpuprpenajamkab@gmail.com</span>
              </p>
              <p className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <span className="text-lg mt-0.5">📍</span>
                <span>Jl. Propinsi, KM.09, Kel. Nipah-nipah, Kec. Penajam, Kab. PPU</span>
              </p>
            </div>
          </div>

          {/* Social Media Section - Right */}
          <div className="space-y-6 text-left md:text-right">
            <h3 className="text-lg sm:text-xl font-semibold text-dpupr-yellow mb-4">
              Ikuti Kami
            </h3>
            <div className="flex gap-4 md:justify-end">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-dpupr-yellow hover:text-dpupr-blue transform hover:-translate-y-1 transition-all duration-200"
              >
                <span className="text-xl font-bold">f</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-dpupr-yellow hover:text-dpupr-blue transform hover:-translate-y-1 transition-all duration-200"
              >
                <span className="text-xl">📷</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-dpupr-yellow hover:text-dpupr-blue transform hover:-translate-y-1 transition-all duration-200"
              >
                <span className="text-xl">▶</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-dpupr-blue/30 backdrop-blur-sm py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <p className="text-gray-100 text-xs sm:text-sm text-center">
              © Copyright 2026 Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Penajam Paser Utara
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
