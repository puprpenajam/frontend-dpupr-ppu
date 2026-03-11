import { useState, useEffect } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ppidContentData from '../data/ppidContent';
import FadeIn from '../components/FadeIn';

const DynamicPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  
  // Extract category from pathname
  const category = location.pathname.split('/')[1]; // 'kegiatan', 'ppid', or 'profil'
  
  const [pageData, setPageData] = useState(() => {
    const savedPages = localStorage.getItem('kontenPages');
    if (!savedPages) return null;
    
    const pages = JSON.parse(savedPages);
    let page = pages.find(page => page.slug === slug && page.category === category);
    
    // If page found but has no content and it's a PPID page, try to use default data
    if (page && category === 'ppid' && (!page.contentBlocks || page.contentBlocks.length === 0)) {
      if (ppidContentData[slug]) {
        page = {
          ...page,
          ...ppidContentData[slug]
        };
      }
    }
    
    return page;
  });

  // Update when localStorage changes
  useEffect(() => {
    const savedPages = localStorage.getItem('kontenPages');
    if (savedPages) {
      const pages = JSON.parse(savedPages);
      let page = pages.find(page => page.slug === slug && page.category === category);
      
      // If page found but has no content and it's a PPID page, try to use default data
      if (page && category === 'ppid' && (!page.contentBlocks || page.contentBlocks.length === 0)) {
        if (ppidContentData[slug]) {
          page = {
            ...page,
            ...ppidContentData[slug]
          };
        }
      }
      
      setPageData(page);
    }
  }, [slug, category]);

  // If page not found or not published, redirect to home
  if (!pageData || !pageData.isPublished) {
    return <Navigate to="/" replace />;
  }

  const renderContentBlocks = () => {
    if (!pageData.contentBlocks || pageData.contentBlocks.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Konten sedang dalam proses pengembangan.</p>
        </div>
      );
    }

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
