import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';

const Berita = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [newsData, setNewsData] = useState([]);
  
  // Load news from localStorage
  useEffect(() => {
    const savedNews = localStorage.getItem('newsData');
    if (savedNews) {
      setNewsData(JSON.parse(savedNews));
    }
  }, []);
  
  // Find the current news article
  const currentNews = newsData.find(news => news.id === parseInt(id)) || newsData[0];
  
  // Get other news (exclude current)
  const otherNews = newsData.filter(news => news.id !== currentNews?.id).slice(0, 5);

  // Function to render text with bold location
  const renderTextWithBoldLocation = (text, isFirstParagraph) => {
    if (isFirstParagraph) {
      // Check if text starts with uppercase location (e.g., "PENAJAM. content...")
      const locationMatch = text.match(/^([A-Z\s]+)\.\s/);
      if (locationMatch) {
        const location = locationMatch[1];
        const restOfText = text.substring(locationMatch[0].length);
        return (
          <>
            <strong className="font-bold">{location}.</strong> {restOfText}
          </>
        );
      }
    }
    return text;
  };

  if (!currentNews) {
    return (
      <>
        <Header />
        <Navbar />
        <main className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Berita tidak ditemukan</h2>
              <Link to="/" className="text-blue-600 hover:underline">
                Kembali ke beranda
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm animate-fadeInUp">
            <ol className="flex items-center gap-2 text-gray-600">
              <li>
                <Link to="/" className="hover:text-dpupr-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="text-dpupr-blue font-semibold">Berita</span>
              </li>
              <li>/</li>
              <li className="text-gray-800 font-medium line-clamp-1">
                {currentNews.title}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <FadeIn>
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Featured Image */}
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                  <img 
                    src={currentNews.image} 
                    alt={currentNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="p-6 sm:p-8 lg:p-10">
                  {/* Meta Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{currentNews.date}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {currentNews.title}
                  </h1>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {/* If news has contentBlocks, render them */}
                    {currentNews.contentBlocks && currentNews.contentBlocks.length > 0 ? (
                      <div className="space-y-6">
                        {currentNews.contentBlocks.map((block, index) => (
                          <div key={index}>
                            {block.type === 'text' ? (
                              block.content.split('\n\n').map((paragraph, pIndex) => {
                                const isFirstParagraph = index === 0 && pIndex === 0;
                                return (
                                  <p key={pIndex} className="mb-4 text-justify">
                                    {renderTextWithBoldLocation(paragraph, isFirstParagraph)}
                                  </p>
                                );
                              })
                            ) : (
                              block.content && (
                                <div className="my-6 rounded-xl overflow-hidden">
                                  <img
                                    src={block.content}
                                    alt={`${currentNews.title} - gambar ${index + 1}`}
                                    className="w-full h-auto object-cover"
                                  />
                                  {block.caption && (
                                    <p className="text-sm text-gray-600 italic mt-2 text-center">
                                      {block.caption}
                                    </p>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Fallback for old format */
                      <>
                        {currentNews.content.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-justify">
                            {renderTextWithBoldLocation(paragraph, index === 0)}
                          </p>
                        ))}
                        
                        {/* Additional Images from old format */}
                        {currentNews.images && currentNews.images.length > 0 && (
                          <div className="mt-8 space-y-6">
                            {currentNews.images.map((image, index) => (
                              <div key={index} className="rounded-xl overflow-hidden">
                                <img
                                  src={image}
                                  alt={`${currentNews.title} - gambar ${index + 1}`}
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </article>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search Box */}
              <FadeIn delay={200}>
              <div className="bg-blue-200 rounded-2xl p-4 mb-6 shadow-md">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Masukan kata kunci"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-blue-300 focus:border-dpupr-blue focus:outline-none text-sm"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dpupr-blue transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              </FadeIn>

              {/* Berita Lainnya */}
              <FadeIn delay={300}>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-dpupr-blue mb-6 pb-3 border-b-2 border-blue-100">
                  Berita Lainnya
                </h3>
                
                <div className="space-y-4">
                  {otherNews.map((news) => (
                    <Link 
                      key={news.id}
                      to={`/berita/${news.id}`}
                      className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 group"
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-dpupr-blue transition-colors">
                          {news.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {news.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              </FadeIn>

              {/* Menu Informasi (like in reference image) */}
              <FadeIn delay={400}>
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                <h3 className="text-xl font-bold text-dpupr-blue mb-6 pb-3 border-b-2 border-blue-100">
                  Menu Informasi
                </h3>
                
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to="/ppid"
                      className="flex items-center justify-between text-gray-700 hover:text-dpupr-blue hover:bg-gray-50 p-3 rounded-lg transition-all group"
                    >
                      <span className="text-sm">Daftar Informasi Publik</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/ppid/pengajuan"
                      className="flex items-center justify-between text-gray-700 hover:text-dpupr-blue hover:bg-gray-50 p-3 rounded-lg transition-all group"
                    >
                      <span className="text-sm">Formulir Pengajuan Keberatan Informasi</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/ppid/permohonan"
                      className="flex items-center justify-between text-gray-700 hover:text-dpupr-blue hover:bg-gray-50 p-3 rounded-lg transition-all group"
                    >
                      <span className="text-sm">Formulir Permohonan Informasi</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/ppid/pengaduan"
                      className="flex items-center justify-between text-gray-700 hover:text-dpupr-blue hover:bg-gray-50 p-3 rounded-lg transition-all group"
                    >
                      <span className="text-sm">Kanal Pengaduan Resmi</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Berita;
