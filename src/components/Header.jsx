import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-dpupr-blue to-blue-600 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="relative flex items-center">
          {/* Logo di kiri */}
          <img 
            src="/logo/logo PUPR.png" 
            alt="Logo Penajam" 
            className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
          />
          
          {/* Tulisan di tengah layar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center text-white">
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold leading-tight whitespace-nowrap">
              DINAS PEKERJAAN UMUM DAN PENATAAN RUANG
            </h1>
            <p className="text-xs sm:text-sm mt-1 tracking-wide">
              KABUPATEN PENAJAM PASER UTARA
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
