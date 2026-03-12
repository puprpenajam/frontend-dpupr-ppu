import { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';

// Import PPID JSX Components
import VisiMisiPPID from './ppid/VisiMisiPPID';
import MaklumatPelayanan from './ppid/MaklumatPelayanan';
import SOPPelayanan from './ppid/SOPPelayanan';
import FormulirPermohonan from './ppid/FormulirPermohonan';
import TataCaraPermohonan from './ppid/TataCaraPermohonan';
import TataCaraKeberatan from './ppid/TataCaraKeberatan';
import TataCaraSengketa from './ppid/TataCaraSengketa';
import JamLayanan from './ppid/JamLayanan';
import SKPPID from './ppid/SKPPID';
import KanalPengaduan from './ppid/KanalPengaduan';

// Import Profil DPUPR JSX Components
import VisiMisiPUPR from './profil/VisiMisiPUPR';
import LandasanHukum from './profil/LandasanHukum';
import Tupoksi from './profil/Tupoksi';
import DaftarPejabat from './profil/DaftarPejabat';
import RiwayatKepalaDinas from './profil/RiwayatKepalaDinas';

// Valid slugs for PPID and Profil (handled by JSX components)
const validPPIDSlugs = ['visi-misi-ppid', 'maklumat-pelayanan', 'sop-pelayanan', 'formulir-permohonan', 'tata-cara-permohonan', 'tata-cara-keberatan', 'tata-cara-sengketa', 'jam-layanan', 'sk-ppid', 'kanal-pengaduan'];
const validProfilSlugs = ['visi-misi-pupr', 'landasan-hukum', 'tupoksi', 'daftar-pejabat', 'riwayat-kepala-dinas'];

// Page titles mapping for PPID and Profil
const ppidTitles = {
  'visi-misi-ppid': 'Visi dan Misi PPID',
  'maklumat-pelayanan': 'Maklumat Pelayanan Informasi Publik',
  'sop-pelayanan': 'SOP Pelayanan Publik',
  'formulir-permohonan': 'Formulir Permohonan Informasi Publik',
  'tata-cara-permohonan': 'Tata Cara Permohonan Informasi Publik',
  'tata-cara-keberatan': 'Tata Cara Pengajuan Keberatan Informasi Publik',
  'tata-cara-sengketa': 'Tata Cara Pengajuan Sengketa Informasi Publik',
  'jam-layanan': 'Jam Layanan Informasi Publik',
  'sk-ppid': 'SK PPID',
  'kanal-pengaduan': 'Kanal Pengaduan Masyarakat'
};

const profilTitles = {
  'visi-misi-pupr': 'Visi dan Misi PUPR',
  'landasan-hukum': 'Landasan Hukum',
  'tupoksi': 'Tupoksi',
  'daftar-pejabat': 'Daftar Pejabat di DPUPR PPU',
  'riwayat-kepala-dinas': 'Riwayat Kepala Dinas'
};

const DynamicPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  
  // Extract category from pathname
  const category = location.pathname.split('/')[1]; // 'kegiatan', 'ppid', or 'profil'
  
  // Get pages from localStorage (only for kegiatan category)
  const [pages, setPages] = useState(() => {
    const savedPages = localStorage.getItem('kontenPages');
    return savedPages ? JSON.parse(savedPages) : [];
  });

  // Find the current page based on slug and category
  const pageData = useMemo(() => {
    // For PPID and Profil, check if slug is valid
    if (category === 'ppid') {
      if (validPPIDSlugs.includes(slug)) {
        return { 
          slug, 
          category, 
          isPublished: true, 
          name: ppidTitles[slug] || slug,
          title: ppidTitles[slug] || slug,
          description: `PPID Dinas PUPR Kabupaten Penajam Paser Utara`
        };
      }
      return null;
    }
    if (category === 'profil') {
      if (validProfilSlugs.includes(slug)) {
        return { 
          slug, 
          category, 
          isPublished: true, 
          name: profilTitles[slug] || slug,
          title: profilTitles[slug] || slug,
          description: `Profil Dinas PUPR Kabupaten Penajam Paser Utara`
        };
      }
      return null;
    }
    // For kegiatan, get from localStorage
    return pages.find(page => page.slug === slug && page.category === category);
  }, [pages, slug, category]);

  // Update pages when localStorage changes (for admin edits)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedPages = localStorage.getItem('kontenPages');
      if (savedPages) {
        setPages(JSON.parse(savedPages));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // If page not found or not published, redirect to home
  if (!pageData || !pageData.isPublished) {
    return <Navigate to="/" replace />;
  }

  const renderContentBlocks = () => {
    // Untuk kategori PPID, gunakan JSX components
    if (category === 'ppid') {
      switch (slug) {
        case 'visi-misi-ppid':
          return <VisiMisiPPID />;
        case 'maklumat-pelayanan':
          return <MaklumatPelayanan />;
        case 'sop-pelayanan':
          return <SOPPelayanan />;
        case 'formulir-permohonan':
          return <FormulirPermohonan />;
        case 'tata-cara-permohonan':
          return <TataCaraPermohonan />;
        case 'tata-cara-keberatan':
          return <TataCaraKeberatan />;
        case 'tata-cara-sengketa':
          return <TataCaraSengketa />;
        case 'jam-layanan':
          return <JamLayanan />;
        case 'sk-ppid':
          return <SKPPID />;
        case 'kanal-pengaduan':
          return <KanalPengaduan />;
        default:
          return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Konten sedang dalam proses pengembangan.</p>
            </div>
          );
      }
    }
    
    // Untuk kategori Profil DPUPR, gunakan JSX components
    if (category === 'profil') {
      switch (slug) {
        case 'visi-misi-pupr':
          return <VisiMisiPUPR />;
        case 'landasan-hukum':
          return <LandasanHukum />;
        case 'tupoksi':
          return <Tupoksi />;
        case 'daftar-pejabat':
          return <DaftarPejabat />;
        case 'riwayat-kepala-dinas':
          return <RiwayatKepalaDinas />;
        default:
          return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Konten sedang dalam proses pengembangan.</p>
            </div>
          );
      }
    }
    
    // Untuk kategori Kegiatan, gunakan contentBlocks dari localStorage
    if (pageData.contentBlocks && pageData.contentBlocks.length > 0) {
      return pageData.contentBlocks.map((block, index) => {
        if (block.type === 'text') {
          return (
            <div
              key={block.id || index}
              className="rich-text-editor mb-6"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          );
        } else if (block.type === 'image') {
          // Skip empty image blocks
          if (!block.content || block.content.trim() === '') {
            return null;
          }
          return (
            <div key={block.id || index} className="mb-8">
              <img
                src={block.content}
                alt={block.caption || `Content ${index + 1}`}
                className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[600px]"
              />
              {block.caption && (
                <p className="text-sm text-gray-600 text-center mt-3 italic">{block.caption}</p>
              )}
            </div>
          );
        }
        return null;
      });
    }
    
    // Default fallback
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Konten sedang dalam proses pengembangan.</p>
      </div>
    );
  };

  return (
    <>
      <Header />
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {pageData.title || pageData.name}
          </h1>
          {pageData.description && (
            <p className="text-base sm:text-lg text-blue-100">
              {pageData.description}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
          <div className="max-w-5xl mx-auto">
            {renderContentBlocks()}
          </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DynamicPage;
