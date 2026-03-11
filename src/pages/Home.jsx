import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Initialize newsData from localStorage
  const [newsData] = useState(() => {
    const savedNews = localStorage.getItem('newsData');
    return savedNews ? JSON.parse(savedNews) : [];
  });
  
  const totalPages = Math.ceil(newsData.length / 4);
  return (
    <>
      <Header />
      <Navbar />
      <main className="bg-white">
        {/* Video Banner Section */}
        <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] overflow-hidden">
          <video 
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/DINAS PEKERJAAN UMUM DAN PENATAAN RUANG – KABUPATEN PENAJAM PASER UTARA.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay for better visibility and mobile protection */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        
        </section>

        {/* Welcome Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
            <div className="text-center mb-8">
              <p className="text-sm sm:text-base text-gray-500 uppercase tracking-wider mb-2">
                Selamat Datang di Website Resmi
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dpupr-blue mb-6">
                DINAS PEKERJAAN UMUM DAN PENATAAN RUANG<br />PENAJAM PASER UTARA
              </h2>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-justify mb-4">
                Di era digitalisasi kebutuhan akan informasi merupakan salah satu kebutuhan pokok. Masyarakat yang berperilaku mobile membutuhkan saluran komunikasi yang real time. Untuk itu DPUPR telah membentuk suatu wadah berupa website DPUPR Penajam Paser Utara, sebagai media komunikasi dalam memenuhi kebutuhan dimaksud.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-justify">
                Website ini memuat beberapa konten berkenaan dengan informasi dan gambaran terhadap pelayanan publik pada Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Penajam Paser Utara. Diharapkan melalui Website ini kiranya masyarakat dapat mengetahui seluruh informasi tentang Kebijakan Pemerintah Penajam Paser Utara dalam urusan penanganan modal dan pelayanan perizinan dan non perizinan di wilayah Penajam Paser Utara. Kritik dan saran yang ada sangat kami harapkan guna penyempurnaan Website ini dimasa datang. Semoga keberadaan Website ini dapat memberikan manfaat bagi kita semua. Wassalam
              </p>
            </div>
            </FadeIn>
          </div>
        </section>

        {/* Berita Terbaru Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dpupr-blue mb-8 sm:mb-12">
              Berita Terbaru
            </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {newsData.slice(0, 4).map((news, index) => (
                <FadeIn key={news.id} delay={index * 100}>
                <Link 
                      to={`/berita/${news.id}`}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 block"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {news.date}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-dpupr-blue transition-colors">
                          {news.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {news.excerpt}
                        </p>

                        {/* Read More Link */}
                        <span 
                          className="inline-flex items-center text-dpupr-blue hover:text-dpupr-blue-dark font-semibold text-sm transition-colors group"
                        >
                          BACA SELENGKAPNYA
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                </FadeIn>
                  ))}
              </div>

              {/* Pagination Dots - Bottom Center */}
              <div className="flex justify-center gap-2 mt-8 sm:mt-12">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPage === index 
                        ? 'bg-dpupr-blue w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

        {/* Info Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dpupr-blue text-center mb-4 sm:mb-6">
              Tentang Kami
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 text-center max-w-4xl mx-auto mb-12 sm:mb-16 leading-relaxed">
              Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Penajam Paser Utara 
              berkomitmen untuk memberikan pelayanan terbaik dalam pembangunan infrastruktur 
              dan penataan ruang wilayah yang berkelanjutan.
            </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Service Card 1 */}
              <FadeIn delay={0}>
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 text-center border-2 border-transparent hover:border-dpupr-yellow hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🏗️</div>
                <h3 className="text-lg sm:text-xl font-semibold text-dpupr-blue mb-3 sm:mb-4">
                  Infrastruktur Jalan
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Pembangunan dan pemeliharaan jalan untuk aksesibilitas yang lebih baik
                </p>
              </div>
              </FadeIn>
              
              {/* Service Card 2 */}
              <FadeIn delay={100}>
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 text-center border-2 border-transparent hover:border-dpupr-yellow hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">💧</div>
                <h3 className="text-lg sm:text-xl font-semibold text-dpupr-blue mb-3 sm:mb-4">
                  Sumber Daya Air
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Pengelolaan dan pengembangan sistem irigasi dan drainase
                </p>
              </div>
              </FadeIn>
              
              {/* Service Card 3 */}
              <FadeIn delay={200}>
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 text-center border-2 border-transparent hover:border-dpupr-yellow hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🏛️</div>
                <h3 className="text-lg sm:text-xl font-semibold text-dpupr-blue mb-3 sm:mb-4">
                  Bangunan Gedung
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Pembangunan dan pengawasan gedung-gedung pemerintahan
                </p>
              </div>
              </FadeIn>
              
              {/* Service Card 4 */}
              <FadeIn delay={300}>
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 text-center border-2 border-transparent hover:border-dpupr-yellow hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🗺️</div>
                <h3 className="text-lg sm:text-xl font-semibold text-dpupr-blue mb-3 sm:mb-4">
                  Penataan Ruang
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Perencanaan tata ruang wilayah yang terstruktur dan berkelanjutan
                </p>
              </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-dpupr-yellow to-yellow-400 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dpupr-blue mb-3 sm:mb-4">
              Informasi Layanan Publik
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-dpupr-blue-dark mb-6 sm:mb-8">
              Akses informasi dan layanan yang Anda butuhkan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <button className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-dpupr-blue text-white rounded-full hover:bg-dpupr-blue-dark transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                PPID
              </button>
              <button className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-white text-dpupr-blue border-2 border-dpupr-blue rounded-full hover:bg-dpupr-blue hover:text-white transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                Pengaduan Masyarakat
              </button>
            </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
