import { useEffect } from 'react';
import { getDefaultKegiatanPages, mergeKegiatanDefaults } from '../data/defaultKegiatanPages';

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

        localStorage.setItem('kontenPages', JSON.stringify(getDefaultKegiatanPages()));
        console.log('✅ Default pages initialized!');
        return;
      }

      const parsedPages = JSON.parse(savedPages);
      const mergedPages = mergeKegiatanDefaults(parsedPages);
      localStorage.setItem('kontenPages', JSON.stringify(mergedPages));
    };
    
    // Run initialization
    initializeContent();
  }, []);

  // Component doesn't render anything
  return null;
};

export default ContentInitializer;
