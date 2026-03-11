import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import { Calendar, ChevronRight, ArrowLeft } from 'lucide-react';

const ManajemenArsip = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [newsData] = useState(() => {
    const savedNews = localStorage.getItem('newsData');
    return savedNews ? JSON.parse(savedNews) : [];
  });
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Parse news date helper function
  const parseNewsDate = (dateString) => {
    // Parse format like "Sabtu, 10 Januari 2026"
    const months = {
      'Januari': 1, 'Februari': 2, 'Maret': 3, 'April': 4,
      'Mei': 5, 'Juni': 6, 'Juli': 7, 'Agustus': 8,
      'September': 9, 'Oktober': 10, 'November': 11, 'Desember': 12
    };

    const parts = dateString.split(',')[1]?.trim().split(' ') || [];
    const day = parseInt(parts[0]);
    const monthName = parts[1];
    const year = parseInt(parts[2]);
    const monthNumber = months[monthName] || 1;

    return {
      day,
      monthName,
      monthNumber,
      year
    };
  };

  const getMonthsList = () => {
    const monthsMap = new Map();
    
    newsData.forEach(item => {
      const dateObj = parseNewsDate(item.date);
      const monthKey = `${dateObj.monthNumber}-${dateObj.year}`;
      
      if (!monthsMap.has(monthKey)) {
        monthsMap.set(monthKey, {
          monthName: dateObj.monthName,
          monthNumber: dateObj.monthNumber,
          year: dateObj.year,
          monthKey: monthKey,
          count: 0
        });
      }
      monthsMap.get(monthKey).count += 1;
    });

    // Convert to array and sort by date (newest first)
    return Array.from(monthsMap.values()).sort((a, b) => {
      const dateA = new Date(a.year, a.monthNumber - 1);
      const dateB = new Date(b.year, b.monthNumber - 1);
      return dateB - dateA;
    });
  };

  const monthsList = getMonthsList();

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr');
    }
  }, [user, navigate]);

  const getArticlesForMonth = (monthKey) => {
    return newsData.filter(item => {
      const dateObj = parseNewsDate(item.date);
      return `${dateObj.monthNumber}-${dateObj.year}` === monthKey;
    }).sort((a, b) => {
      const dateA = new Date(parseNewsDate(a.date).year, parseNewsDate(a.date).monthNumber - 1, parseNewsDate(a.date).day);
      const dateB = new Date(parseNewsDate(b.date).year, parseNewsDate(b.date).monthNumber - 1, parseNewsDate(b.date).day);
      return dateB - dateA; // Newest first
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <AdminHeader 
          title="Manajemen Arsip Berita" 
          subtitle="Lihat berita berdasarkan bulan dan tahun"
        />

        {/* Content */}
        <div className="p-6">
          {selectedMonth === null ? (
            // Month List View
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Arsip Berita</h2>
              {monthsList.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Belum ada berita yang diarsipkan</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {monthsList.map((month) => (
                    <button
                      key={month.monthKey}
                      onClick={() => setSelectedMonth(month.monthKey)}
                      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all text-left"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-[#1E3A7D]">
                            {month.monthName} {month.year}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {month.count} artikel
                          </p>
                        </div>
                        <Calendar className="w-8 h-8 text-[#FDB913]" />
                      </div>
                      <div className="flex items-center gap-2 text-[#1E3A7D] font-semibold">
                        Lihat Detail <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Articles in Month View
            <div>
              <button
                onClick={() => setSelectedMonth(null)}
                className="flex items-center gap-2 text-[#1E3A7D] font-semibold mb-6 hover:text-[#152856]"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Arsip
              </button>

              {(() => {
                const month = monthsList.find(m => m.monthKey === selectedMonth);
                return (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Berita {month?.monthName} {month?.year}
                    </h2>
                  </div>
                );
              })()}

              {(() => {
                const articles = getArticlesForMonth(selectedMonth);
                if (articles.length === 0) {
                  return (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                      <p className="text-gray-500">Tidak ada berita di bulan ini</p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                        <div className="flex">
                          {/* Thumbnail */}
                          <div className="w-40 h-40 flex-shrink-0">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-6">
                            <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm">
                              <Calendar className="w-4 h-4" />
                              {article.date}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {article.excerpt}
                            </p>
                            <span className="inline-block px-3 py-1 bg-[#FDB913] text-[#1E3A7D] text-xs font-semibold rounded-full">
                              {article.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManajemenArsip;
