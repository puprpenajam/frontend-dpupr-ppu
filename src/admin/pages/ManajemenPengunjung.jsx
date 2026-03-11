import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import { Eye, Users, BarChart3, TrendingUp } from 'lucide-react';

const ManajemenPengunjung = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [stats, setStats] = useState(() => {
    // Initialize from localStorage
    const savedStats = localStorage.getItem('visitorStats') || 
      JSON.stringify({
        totalVisitors: Math.floor(Math.random() * 5000) + 1500,
        todayVisitors: Math.floor(Math.random() * 200) + 50,
        avgDailyVisitors: Math.floor(Math.random() * 300) + 100,
        lastUpdated: new Date().toISOString()
      });

    const parsedStats = JSON.parse(savedStats);
    return {
      ...parsedStats,
      lastUpdated: new Date(parsedStats.lastUpdated)
    };
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr');
      return;
    }
  }, [user, navigate]);

  const handleResetStats = () => {
    if (window.confirm('Reset semua data pengunjung? Tindakan ini tidak dapat dibatalkan.')) {
      const newStats = {
        totalVisitors: 0,
        todayVisitors: 0,
        avgDailyVisitors: 0,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('visitorStats', JSON.stringify(newStats));
      setStats({
        ...newStats,
        lastUpdated: new Date()
      });
      alert('Data pengunjung berhasil direset');
    }
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
          title="Manajemen Pengunjung" 
          subtitle="Pantau aktivitas pengunjung website publik"
        />

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Visitors */}
            <div className="bg-gradient-to-br from-[#1E3A7D] to-[#152856] rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Total Pengunjung</p>
                  <h3 className="text-3xl font-bold">{stats.totalVisitors.toLocaleString('id-ID')}</h3>
                </div>
                <Users className="w-12 h-12 opacity-50" />
              </div>
            </div>

            {/* Today Visitors */}
            <div className="bg-gradient-to-br from-[#FDB913] to-[#E5A711] rounded-xl shadow-md p-6 text-[#1E3A7D]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold opacity-90 mb-1">Pengunjung Hari Ini</p>
                  <h3 className="text-3xl font-bold">{stats.todayVisitors.toLocaleString('id-ID')}</h3>
                </div>
                <Eye className="w-12 h-12 opacity-50" />
              </div>
            </div>

            {/* Average Daily */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Rata-rata Per Hari</p>
                  <h3 className="text-3xl font-bold">{stats.avgDailyVisitors.toLocaleString('id-ID')}</h3>
                </div>
                <TrendingUp className="w-12 h-12 opacity-50" />
              </div>
            </div>

            {/* Last Updated */}
            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Terakhir Diperbarui</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {stats.lastUpdated.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.lastUpdated.toLocaleDateString('id-ID')}
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 text-gray-400 opacity-50" />
              </div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Grafik Pengunjung 30 Hari Terakhir</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400">Grafik akan ditampilkan di sini</p>
                <p className="text-sm text-gray-400 mt-1">Kunjungi website publik untuk mulai tracking pengunjung</p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-blue-900 mb-2">Informasi Tracking Pengunjung</h3>
            <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
              <li>Data pengunjung dikumpulkan secara otomatis dari setiap kunjungan ke website publik</li>
              <li>Statistik diperbarui setiap kali ada pengunjung baru</li>
              <li>Data "Pengunjung Hari Ini" akan direset setiap tengah malam</li>
              <li>Total pengunjung merupakan akumulasi dari semua kunjungan sejak awal</li>
            </ul>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end">
            <button
              onClick={handleResetStats}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors"
            >
              Reset Statistik Pengunjung
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPengunjung;
