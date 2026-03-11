import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ppidContentData from '../data/ppidContent';
import FadeIn from '../components/FadeIn';

const VisiDanMisiPPID = () => {
  const [pageContent, setPageContent] = useState(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem('kontenPages');
    if (savedContent) {
      const allPages = JSON.parse(savedContent);
      const visiMisiPage = allPages.find(page => page.slug === 'visi-misi-ppid');
      if (visiMisiPage) {
        return {
          title: visiMisiPage.title || 'Visi dan Misi PPID',
          contentBlocks: visiMisiPage.contentBlocks || []
        };
      }
    }
    // Default return with data from ppidContentData
    return {
      title: 'Visi dan Misi PPID',
      contentBlocks: ppidContentData['visi-misi-ppid']?.contentBlocks || []
    };
  });

  // Update content if localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedContent = localStorage.getItem('kontenPages');
      if (savedContent) {
        const allPages = JSON.parse(savedContent);
        const visiMisiPage = allPages.find(page => page.slug === 'visi-misi-ppid');
        if (visiMisiPage && visiMisiPage.contentBlocks) {
          setPageContent({
            title: visiMisiPage.title || 'Visi dan Misi PPID',
            contentBlocks: visiMisiPage.contentBlocks
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const renderContentBlocks = () => {
    if (!pageContent.contentBlocks || pageContent.contentBlocks.length === 0) {
      return (
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-dpupr-blue mt-8 mb-4">Visi</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Terwujudnya penyelenggaraan pemerintahan yang baik, transparan, efektif dan efisien, akuntabel serta meningkatkan pengelolaan dan pelayanan informasi dan dokumentasi di Pemerintah Kabupaten untuk menghasilkan layanan informasi dan dokumentasi yang berkualitas.
          </p>
          
          <h2 className="text-2xl font-bold text-dpupr-blue mt-8 mb-4">Misi</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong className="text-dpupr-blue font-semibold">a)</strong> Menghimpun informasi publik dari seluruh Bidang dan UPT PU di lingkungan Dinas PUPR Kabupaten Penajam Paser Utara;
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong className="text-dpupr-blue font-semibold">b)</strong> Menata dan menyimpan informasi publik dari seluruh Bidang dan UPT PU di lingkungan Dinas PUPR Kabupaten Penajam Paser Utara;
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong className="text-dpupr-blue font-semibold">c)</strong> Melaksanakan konsultasi informasi publik kategori dikecualikan dari informasi yang terbuka untuk publik;
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong className="text-dpupr-blue font-semibold">d)</strong> Mengelesaikan sengketa informasi.
          </p>
        </div>
      );
    }

    return pageContent.contentBlocks.map((block, index) => {
      if (block.type === 'text') {
        return (
          <div
            key={index}
            className="prose prose-lg max-w-none
              prose-headings:text-dpupr-blue prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-dpupr-blue prose-strong:font-semibold
              prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
              prose-li:text-gray-700 prose-li:mb-2
              prose-a:text-blue-600 prose-a:hover:underline prose-a:font-medium"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      } else if (block.type === 'image' && block.content) {
        return (
          <div key={index} className="my-8">
            <img
              src={block.content}
              alt={`Content ${index + 1}`}
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Header />
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-dpupr-blue to-blue-600 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {pageContent.title}
            </h1>
            <p className="text-base sm:text-lg text-blue-100">
              Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Penajam Paser Utara
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
            {renderContentBlocks()}
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default VisiDanMisiPPID;
