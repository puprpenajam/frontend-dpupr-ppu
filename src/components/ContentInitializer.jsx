import { useEffect } from 'react';

/**
 * ContentInitializer Component
 * Menginisialisasi konten default saat aplikasi pertama kali diload
 * Component ini tidak render apa-apa, hanya menjalankan initialization logic
 */
const ContentInitializer = () => {
  useEffect(() => {
    const initializeContent = () => {
      const savedPages = localStorage.getItem('kontenPages');
      
      if (!savedPages) {
        console.log('📦 Initializing default pages...');
        
        // Default content pages - hanya untuk kategori Informasi Kegiatan PUPR
        // PPID dan Profil DPUPR menggunakan JSX components
        const defaultPages = [
          // INFORMASI KEGIATAN PUPR
          { id: 1, name: 'Bagian Umum & Bagian Sunram dan Keuangan', slug: 'bagian-umum-sunram', category: 'kegiatan', description: 'Informasi kegiatan Bagian Umum & Bagian Sunram dan Keuangan', isPublished: true, title: 'Bagian Umum & Bagian Sunram dan Keuangan', contentBlocks: [] },
          { id: 2, name: 'UPT-PU Lab dan Alat Berat', slug: 'upt-lab-alat-berat', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Lab dan Alat Berat', isPublished: true, title: 'UPT-PU Lab dan Alat Berat', contentBlocks: [] },
          { id: 3, name: 'UPT-PU Penajam', slug: 'upt-penajam', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Penajam', isPublished: true, title: 'UPT-PU Penajam', contentBlocks: [] },
          { id: 4, name: 'UPT-PU Sepaku', slug: 'upt-sepaku', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Sepaku', isPublished: true, title: 'UPT-PU Sepaku', contentBlocks: [] },
          { id: 5, name: 'UPT-PU Waru', slug: 'upt-waru', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Waru', isPublished: true, title: 'UPT-PU Waru', contentBlocks: [] },
          { id: 6, name: 'UPT-PU Babulu', slug: 'upt-babulu', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Babulu', isPublished: true, title: 'UPT-PU Babulu', contentBlocks: [] },
          { id: 7, name: 'Bina Konstruksi', slug: 'bina-konstruksi', category: 'kegiatan', description: 'Informasi kegiatan Bina Konstruksi', isPublished: true, title: 'Bina Konstruksi', contentBlocks: [] },
          { id: 8, name: 'Cipta Karya', slug: 'cipta-karya', category: 'kegiatan', description: 'Informasi kegiatan Cipta Karya', isPublished: true, title: 'Cipta Karya', contentBlocks: [] },
          { id: 9, name: 'Tata Ruang', slug: 'tata-ruang', category: 'kegiatan', description: 'Informasi kegiatan Tata Ruang', isPublished: true, title: 'Tata Ruang', contentBlocks: [] },
          { id: 10, name: 'PSDA', slug: 'psda', category: 'kegiatan', description: 'Informasi kegiatan PSDA', isPublished: true, title: 'PSDA', contentBlocks: [] },
          { id: 11, name: 'Bina Marga', slug: 'bina-marga', category: 'kegiatan', description: 'Informasi kegiatan Bina Marga', isPublished: true, title: 'Bina Marga', contentBlocks: [] }
        ];
        
        localStorage.setItem('kontenPages', JSON.stringify(defaultPages));
        console.log('✅ Default pages initialized!');
      }
    };
    
    // Run initialization
    initializeContent();
  }, []);

  // Component doesn't render anything
  return null;
};

export default ContentInitializer;
