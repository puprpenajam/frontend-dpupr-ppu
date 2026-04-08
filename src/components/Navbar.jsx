import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setOpenSubmenu(null);
    }
  };

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const toggleDesktopDropdown = (menu) => {
    setOpenDesktopDropdown(openDesktopDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Background overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed top-[151px] sm:top-[185px] left-0 right-0 bottom-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Background overlay for desktop dropdown */}
      {openDesktopDropdown && (
        <div 
          className="fixed inset-0 z-30 hidden lg:block"
          onClick={() => setOpenDesktopDropdown(null)}
        />
      )}
      
      <nav className="bg-gradient-to-r from-dpupr-yellow to-yellow-400 shadow-md sticky top-[95px] sm:top-[128px] lg:top-[144px] z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end lg:justify-center">
            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center justify-center gap-1">
            <li>
              <Link 
                to="/" 
                className="block px-5 py-4 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors duration-200 whitespace-nowrap"
              >
                BERANDA
              </Link>
            </li>
            
            {/* INFORMASI KEGIATAN PUPR */}
            <li className="relative">
              <button 
                onClick={() => toggleDesktopDropdown('kegiatan')}
                className="flex items-center gap-1 px-5 py-4 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors duration-200 whitespace-nowrap"
              >
                INFORMASI KEGIATAN PUPR <ChevronDown size={16} className={`transition-transform duration-300 ${openDesktopDropdown === 'kegiatan' ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`absolute left-0 top-full bg-yellow-100 shadow-xl rounded-b-lg overflow-hidden transition-all duration-300 min-w-[320px] z-50 ${
                openDesktopDropdown === 'kegiatan' ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <li><Link to="/kegiatan/bagian-umum-sunram" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Bagian Umum & Bagian Sunram dan Keuangan</Link></li>
                <li><Link to="/kegiatan/upt-lab-alat-berat" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">UPT-PU Lab dan Alat Berat</Link></li>
                <li><Link to="/kegiatan/upt-penajam" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">UPT-PU Penajam</Link></li>
                <li><Link to="/kegiatan/upt-sepaku" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">UPT-PU Sepaku</Link></li>
                <li><Link to="/kegiatan/upt-waru" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">UPT-PU Waru</Link></li>
                <li><Link to="/kegiatan/upt-babulu" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">UPT-PU Babulu</Link></li>
                <li><Link to="/kegiatan/bina-konstruksi" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Bina Konstruksi</Link></li>
                <li><Link to="/kegiatan/cipta-karya" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Cipta Karya</Link></li>
                <li><Link to="/kegiatan/tata-ruang" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Tata Ruang</Link></li>
                <li><Link to="/kegiatan/psda" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">PSDA</Link></li>
                <li><Link to="/kegiatan/bina-marga" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Bina Marga</Link></li>
              </ul>
            </li>

            {/* PPID DPUPR */}
            <li className="relative">
              <button 
                onClick={() => toggleDesktopDropdown('ppid')}
                className="flex items-center gap-1 px-5 py-4 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors duration-200 whitespace-nowrap"
              >
                PPID DPUPR <ChevronDown size={16} className={`transition-transform duration-300 ${openDesktopDropdown === 'ppid' ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`absolute left-0 top-full bg-yellow-100 shadow-xl rounded-b-lg overflow-hidden transition-all duration-300 min-w-[360px] z-50 ${
                openDesktopDropdown === 'ppid' ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <li><Link to="/ppid/visi-misi-ppid" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Visi dan Misi PPID</Link></li>
                <li><Link to="/ppid/maklumat-pelayanan" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Maklumat Pelayanan Informasi Publik</Link></li>
                <li><Link to="/ppid/sop-pelayanan" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">SOP Pelayanan Publik</Link></li>
                <li><Link to="/ppid/formulir-permohonan" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Formulir Permohonan Informasi Publik</Link></li>
                <li><Link to="/ppid/tata-cara-permohonan" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Tata Cara Permohonan Informasi Publik</Link></li>
                <li><Link to="/ppid/tata-cara-keberatan" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Tata Cara Pengajuan Keberatan Informasi Publik</Link></li>
                <li><Link to="/ppid/tata-cara-sengketa" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Tata Cara Pengajuan Sengketa Informasi Publik</Link></li>
                <li><Link to="/ppid/jam-layanan" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Jam Layanan Informasi Publik</Link></li>
                <li><Link to="/ppid/sk-ppid" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">SK PPID</Link></li>
                <li><Link to="/ppid/kanal-pengaduan" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Kanal Pengaduan Masyarakat</Link></li>
              </ul>
            </li>

            {/* PROFIL DPUPR */}
            <li className="relative">
              <button 
                onClick={() => toggleDesktopDropdown('profil')}
                className="flex items-center gap-1 px-5 py-4 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors duration-200 whitespace-nowrap"
              >
                PROFIL DPUPR <ChevronDown size={16} className={`transition-transform duration-300 ${openDesktopDropdown === 'profil' ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`absolute left-0 top-full bg-yellow-100 shadow-xl rounded-b-lg overflow-hidden transition-all duration-300 min-w-[280px] z-50 ${
                openDesktopDropdown === 'profil' ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <li><Link to="/profil/visi-misi-pupr" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Visi dan Misi PUPR</Link></li>
                <li><Link to="/profil/landasan-hukum" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Landasan Hukum</Link></li>
                <li><Link to="/profil/tupoksi" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Tupoksi</Link></li>
                <li><Link to="/profil/daftar-pejabat" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Daftar Pejabat di DPUPR PPU</Link></li>
                <li><Link to="/profil/riwayat-kepala-dinas" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Riwayat Kepala Dinas</Link></li>
              </ul>
            </li>

            {/* INFORMASI KEPALA DINAS */}
            <li>
              <Link 
                to="/profil/informasi-kepala-dinas" 
                className="block px-5 py-4 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors duration-200 whitespace-nowrap"
              >
                INFORMASI KEPALA DINAS
              </Link>
            </li>

            {/* LAYANAN PUBLIK */}
            <li className="relative">
              <button
                onClick={() => toggleDesktopDropdown('layanan')}
                className="flex items-center gap-1 px-5 py-4 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors duration-200 whitespace-nowrap"
              >
                LAYANAN PUBLIK <ChevronDown size={16} className={`transition-transform duration-300 ${openDesktopDropdown === 'layanan' ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`absolute left-0 top-full bg-yellow-100 shadow-xl rounded-b-lg overflow-hidden transition-all duration-300 min-w-[300px] z-50 ${
                openDesktopDropdown === 'layanan' ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <li><Link to="/layanan-publik/tata-cara" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Tata Cara Isi Form Layanan Publik</Link></li>
                <li><Link to="/layanan-publik/form" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Form Layanan Publik</Link></li>
                <li><Link to="/layanan-publik/tracking" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Tracking Layanan Publik</Link></li>
                <li><Link to="/layanan-publik/tracking-pengaduan" className="block px-6 py-3 text-dpupr-blue hover:bg-dpupr-yellow/30 transition-colors text-sm">Tracking Pengaduan</Link></li>
              </ul>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-3 text-dpupr-blue focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-dpupr-blue transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-dpupr-blue transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-dpupr-blue transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Dropdown Menu - Sticky Position (completely outside nav) */}
    <div
      className={`sticky left-0 right-0 top-[151px] sm:top-[172px] bg-gradient-to-r from-dpupr-yellow to-yellow-400 shadow-2xl transition-all duration-300 ease-in-out lg:hidden overflow-y-auto z-50 ${
        isOpen ? 'max-h-[calc(100vh-151px)] sm:max-h-[calc(100vh-184px)] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
          <ul className="py-2 space-y-1">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors"
              >
                BERANDA
              </Link>
            </li>

            {/* Mobile INFORMASI KEGIATAN PUPR */}
            <li>
              <button
                onClick={() => toggleSubmenu('kegiatan')}
                className="w-full text-left px-4 py-3 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors flex justify-between items-center"
              >
                INFORMASI KEGIATAN PUPR
                <ChevronDown size={16} className={`transform transition-transform duration-200 ${openSubmenu === 'kegiatan' ? 'rotate-180' : ''}`} />
              </button>
              <ul
                className={`overflow-hidden transition-all duration-300 bg-yellow-100 ${
                  openSubmenu === 'kegiatan' ? 'max-h-[500px]' : 'max-h-0'
                }`}
              >
                <li><Link to="/kegiatan/bagian-umum-sunram" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Bagian Umum & Bagian Sunram dan Keuangan</Link></li>
                <li><Link to="/kegiatan/upt-lab-alat-berat" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">UPT-PU Lab dan Alat Berat</Link></li>
                <li><Link to="/kegiatan/upt-penajam" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">UPT-PU Penajam</Link></li>
                <li><Link to="/kegiatan/upt-sepaku" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">UPT-PU Sepaku</Link></li>
                <li><Link to="/kegiatan/upt-waru" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">UPT-PU Waru</Link></li>
                <li><Link to="/kegiatan/upt-babulu" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">UPT-PU Babulu</Link></li>
                <li><Link to="/kegiatan/bina-konstruksi" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Bina Konstruksi</Link></li>
                <li><Link to="/kegiatan/cipta-karya" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Cipta Karya</Link></li>
                <li><Link to="/kegiatan/tata-ruang" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Tata Ruang</Link></li>
                <li><Link to="/kegiatan/psda" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">PSDA</Link></li>
                <li><Link to="/kegiatan/bina-marga" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Bina Marga</Link></li>
              </ul>
            </li>

            {/* Mobile PPID DPUPR */}
            <li>
              <button
                onClick={() => toggleSubmenu('ppid')}
                className="w-full text-left px-4 py-3 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors flex justify-between items-center"
              >
                PPID DPUPR
                <ChevronDown size={16} className={`transform transition-transform duration-200 ${openSubmenu === 'ppid' ? 'rotate-180' : ''}`} />
              </button>
              <ul
                className={`overflow-hidden transition-all duration-300 bg-yellow-100 ${
                  openSubmenu === 'ppid' ? 'max-h-[600px]' : 'max-h-0'
                }`}
              >
                <li><Link to="/ppid/visi-misi-ppid" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Visi dan Misi PPID</Link></li>
                <li><Link to="/ppid/maklumat-pelayanan" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Maklumat Pelayanan Informasi Publik</Link></li>
                <li><Link to="/ppid/sop-pelayanan" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">SOP Pelayanan Publik</Link></li>
                <li><Link to="/ppid/formulir-permohonan" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Formulir Permohonan Informasi Publik</Link></li>
                <li><Link to="/ppid/tata-cara-permohonan" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Tata Cara Permohonan Informasi Publik</Link></li>
                <li><Link to="/ppid/tata-cara-keberatan" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Tata Cara Pengajuan Keberatan Informasi Publik</Link></li>
                <li><Link to="/ppid/tata-cara-sengketa" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Tata Cara Pengajuan Sengketa Informasi Publik</Link></li>
                <li><Link to="/ppid/jam-layanan" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Jam Layanan Informasi Publik</Link></li>
                <li><Link to="/ppid/sk-ppid" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">SK PPID</Link></li>
                <li><Link to="/ppid/kanal-pengaduan" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Kanal Pengaduan Masyarakat</Link></li>
              </ul>
            </li>

            {/* Mobile PROFIL DPUPR */}
            <li>
              <button
                onClick={() => toggleSubmenu('profil')}
                className="w-full text-left px-4 py-3 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors flex justify-between items-center"
              >
                PROFIL DPUPR
                <ChevronDown size={16} className={`transform transition-transform duration-200 ${openSubmenu === 'profil' ? 'rotate-180' : ''}`} />
              </button>
              <ul
                className={`overflow-hidden transition-all duration-300 bg-yellow-100 ${
                  openSubmenu === 'profil' ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <li><Link to="/profil/visi-misi-pupr" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Visi dan Misi PUPR</Link></li>
                <li><Link to="/profil/landasan-hukum" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Landasan Hukum</Link></li>
                <li><Link to="/profil/tupoksi" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Tupoksi</Link></li>
                <li><Link to="/profil/daftar-pejabat" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Daftar Pejabat di DPUPR PPU</Link></li>
                <li><Link to="/profil/riwayat-kepala-dinas" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Riwayat Kepala Dinas</Link></li>
              </ul>
            </li>

            {/* Mobile INFORMASI KEPALA DINAS */}
            <li>
              <Link
                to="/profil/informasi-kepala-dinas"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors"
              >
                INFORMASI KEPALA DINAS
              </Link>
            </li>

            {/* Mobile LAYANAN PUBLIK */}
            <li>
              <button
                onClick={() => toggleSubmenu('layanan')}
                className="w-full text-left px-4 py-3 text-dpupr-blue font-semibold text-sm hover:bg-dpupr-blue/10 transition-colors flex justify-between items-center"
              >
                LAYANAN PUBLIK
                <ChevronDown size={16} className={`transform transition-transform duration-200 ${openSubmenu === 'layanan' ? 'rotate-180' : ''}`} />
              </button>
              <ul
                className={`overflow-hidden transition-all duration-300 bg-yellow-100 ${
                  openSubmenu === 'layanan' ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <li><Link to="/layanan-publik/tata-cara" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Tata Cara Isi Form Layanan Publik</Link></li>
                <li><Link to="/layanan-publik/form" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Form Layanan Publik</Link></li>
                <li><Link to="/layanan-publik/tracking" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Tracking Layanan Publik</Link></li>
                <li><Link to="/layanan-publik/tracking-pengaduan" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-dpupr-blue text-sm hover:bg-dpupr-blue/10">Tracking Pengaduan</Link></li>
              </ul>
            </li>
          </ul>
        </div>

    </>
  );
};

export default Navbar;
