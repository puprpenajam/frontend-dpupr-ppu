import { useEffect } from 'react';
import ppidContentData from '../data/ppidContent';

/**
 * ContentInitializer Component
 * Menginisialisasi konten PPID saat aplikasi pertama kali diload
 * Component ini tidak render apa-apa, hanya menjalankan initialization logic
 */
const ContentInitializer = () => {
  useEffect(() => {
    const initializeContent = () => {
      const savedPages = localStorage.getItem('kontenPages');
      
      if (!savedPages) {
        console.log('📦 Initializing default pages...');
        
        // Default content pages sesuai dengan menu navbar
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
          { id: 11, name: 'Bina Marga', slug: 'bina-marga', category: 'kegiatan', description: 'Informasi kegiatan Bina Marga', isPublished: true, title: 'Bina Marga', contentBlocks: [] },
          
          // PPID DPUPR (with content from ppidContentData)
          { ...ppidContentData['visi-misi-ppid'] },
          { ...ppidContentData['maklumat-pelayanan'] },
          { id: 14, name: 'SOP Pelayanan Publik', slug: 'sop-pelayanan', category: 'ppid', description: 'Standar Operasional Prosedur Pelayanan Publik', isPublished: true, title: 'SOP Pelayanan Publik', contentBlocks: [] },
          { ...ppidContentData['formulir-permohonan'] },
          { ...ppidContentData['tata-cara-permohonan'] },
          { id: 17, name: 'Tata Cara Pengajuan Keberatan Informasi Publik', slug: 'tata-cara-keberatan', category: 'ppid', description: 'Tata Cara Pengajuan Keberatan Informasi Publik', isPublished: true, title: 'Tata Cara Pengajuan Keberatan Informasi Publik', contentBlocks: [] },
          { id: 18, name: 'Tata Cara Pengajuan Sengketa Informasi Publik', slug: 'tata-cara-sengketa', category: 'ppid', description: 'Tata Cara Pengajuan Sengketa Informasi Publik', isPublished: true, title: 'Tata Cara Pengajuan Sengketa Informasi Publik', contentBlocks: [] },
          { id: 19, name: 'Jam Layanan Informasi Publik', slug: 'jam-layanan', category: 'ppid', description: 'Jam Layanan Informasi Publik PPID', isPublished: true, title: 'Jam Layanan Informasi Publik', contentBlocks: [] },
          { id: 20, name: 'SK PPID', slug: 'sk-ppid', category: 'ppid', description: 'Surat Keputusan PPID', isPublished: true, title: 'SK PPID', contentBlocks: [] },
          { id: 21, name: 'Kanal Pengaduan Masyarakat', slug: 'kanal-pengaduan', category: 'ppid', description: 'Kanal Pengaduan Masyarakat', isPublished: true, title: 'Kanal Pengaduan Masyarakat', contentBlocks: [] },
          
          // PROFIL DPUPR
          { id: 22, name: 'Visi dan Misi PUPR', slug: 'visi-misi-pupr', category: 'profil', description: 'Visi dan Misi Dinas PUPR', isPublished: true, title: 'Visi dan Misi PUPR', contentBlocks: [] },
          { id: 23, name: 'Landasan Hukum', slug: 'landasan-hukum', category: 'profil', description: 'Landasan Hukum DPUPR', isPublished: true, title: 'Landasan Hukum', contentBlocks: [] },
          { id: 24, name: 'Tupoksi', slug: 'tupoksi', category: 'profil', description: 'Tugas Pokok dan Fungsi DPUPR', isPublished: true, title: 'Tupoksi', contentBlocks: [] },
          { id: 25, name: 'Daftar Pejabat di DPUPR PPU', slug: 'daftar-pejabat', category: 'profil', description: 'Daftar Pejabat di DPUPR PPU', isPublished: true, title: 'Daftar Pejabat di DPUPR PPU', contentBlocks: [] },
          { id: 26, name: 'Riwayat Kepala Dinas', slug: 'riwayat-kepala-dinas', category: 'profil', description: 'Riwayat Kepala Dinas PUPR', isPublished: true, title: 'Riwayat Kepala Dinas', contentBlocks: [] },
          { id: 27, name: 'Informasi Kepala Dinas', slug: 'informasi-kepala-dinas', category: 'profil', description: 'Informasi lengkap tentang Kepala Dinas PUPR PPU', isPublished: true, title: 'Informasi Kepala Dinas', contentBlocks: [] }
        ];
        
        localStorage.setItem('kontenPages', JSON.stringify(defaultPages));
        console.log('✅ Default pages initialized with PPID content!');
        return;
      }
      
      // If localStorage exists, check and update PPID pages without content
      const pages = JSON.parse(savedPages);
      let needsUpdate = false;
      
      const updatedPages = pages.map(page => {
        if (page.category === 'ppid' && ppidContentData[page.slug]) {
          // If page has no content or empty contentBlocks, update it
          if (!page.contentBlocks || page.contentBlocks.length === 0) {
            needsUpdate = true;
            console.log(`🔄 Updating content for: ${page.name}`);
            return {
              ...page,
              ...ppidContentData[page.slug]
            };
          }
        }
        return page;
      });
      
      if (needsUpdate) {
        localStorage.setItem('kontenPages', JSON.stringify(updatedPages));
        console.log('✅ PPID content updated successfully!');
      } else {
        console.log('✓ All PPID content already loaded');
      }
    };
    
    // Run initialization
    initializeContent();
  }, []);

  // Component doesn't render anything
  return null;
};

export default ContentInitializer;
