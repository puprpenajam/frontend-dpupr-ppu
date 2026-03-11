import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-dpupr-blue to-blue-600 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Desktop Layout - Logo di kiri, text di tengah */}
        <div className="hidden sm:block relative">
          <div className="flex items-center">
            {/* Logo di kiri */}
            <img 
              src="/logo/logo PUPR.png" 
              alt="Logo Penajam" 
              className="h-20 lg:h-24 w-auto object-contain"
            />
            
            {/* Tulisan di tengah layar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center text-white">
              <h1 className="text-xl lg:text-2xl font-bold leading-tight whitespace-nowrap">
                DINAS PEKERJAAN UMUM DAN PENATAAN RUANG
              </h1>
              <p className="text-sm mt-1 tracking-wide">
                KABUPATEN PENAJAM PASER UTARA
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Logo dan text rata tengah */}
        <div className="sm:hidden flex flex-col items-center justify-center text-center">
          <img 
            src="/logo/logo PUPR.png" 
            alt="Logo Penajam" 
            className="h-14 w-auto object-contain mb-3"
          />
          <div className="text-white">
            <h1 className="text-sm font-bold leading-tight">
              DINAS PEKERJAAN UMUM DAN PENATAAN RUANG
            </h1>
            <p className="text-xs mt-1 tracking-wide">
              KABUPATEN PENAJAM PASER UTARA
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
