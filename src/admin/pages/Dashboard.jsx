import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import { Newspaper, TrendingUp, Eye, Users, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newsData, setNewsData] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visitorStats, setVisitorStats] = useState(() => {
    const savedStats = localStorage.getItem('visitorStats') ||
      JSON.stringify({
        totalVisitors: Math.floor(Math.random() * 5000) + 1500,
        todayVisitors: Math.floor(Math.random() * 200) + 50,
        avgDailyVisitors: Math.floor(Math.random() * 300) + 100,
        lastUpdated: new Date().toISOString()
      });
    return JSON.parse(savedStats);
  });

  // Load news from localStorage
  useEffect(() => {
    const savedNews = localStorage.getItem('newsData');
    if (savedNews) {
      setNewsData(JSON.parse(savedNews));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr-ppu');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const stats = [
    {
      icon: Newspaper,
      label: 'Total Berita',
      value: newsData.length,
      color: 'bg-blue-500'
    },
    {
      icon: TrendingUp,
      label: 'Berita Bulan Ini',
      value: newsData.filter(news => news.date.includes('Maret 2026')).length,
      color: 'bg-blue-500'
    },
    {
      icon: Eye,
      label: 'Total Pengunjung',
      value: visitorStats.totalVisitors.toLocaleString('id-ID'),
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      label: 'Pengunjung Hari Ini',
      value: visitorStats.todayVisitors.toLocaleString('id-ID'),
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />
      
      <div className="flex-1 min-w-0">
        <AdminHeader 
          title="Dashboard Administrator" 
          subtitle="Selamat datang di panel admin DPUPR PPU"
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-600 text-xs sm:text-sm mb-1 truncate">{stat.label}</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 sm:p-4 rounded-xl flex-shrink-0`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => window.open('/admin-website-pupr-ppu/manajemen-berita', '_blank')}
                className="bg-[#1E3A7D] hover:bg-[#152856] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-colors text-left flex items-center gap-3"
              >
                <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-sm sm:text-base">Kelola Berita</p>
                  <p className="text-xs sm:text-sm text-blue-100 truncate">Tambah, edit, atau hapus berita</p>
                </div>
              </button>
              <button
                onClick={() => window.open('/', '_blank')}
                className="bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-colors text-left flex items-center gap-3"
              >
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-sm sm:text-base">Lihat Website</p>
                  <p className="text-xs sm:text-sm text-[#152856] truncate">Preview website publik</p>
                </div>
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mt-4 sm:mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Berita Terbaru</h2>
            <div className="space-y-3">
              {newsData.slice(0, 5).map((news) => (
                <div
                  key={news.id}
                  className="flex items-center gap-3 sm:gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">{news.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{news.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

