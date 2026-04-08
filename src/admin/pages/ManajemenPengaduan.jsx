import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import { getPengaduanCategories, getPengaduanCategoryRows } from '../../data/manajemenPengaduanUtils';

const ManajemenPengaduan = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = useMemo(() => getPengaduanCategories(), []);

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr-ppu');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

      <div className="flex-1 min-w-0">
        <AdminHeader
          title="Manajemen Pengaduan"
          subtitle="Pilih daftar pengaduan per bidang untuk melihat data form"
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 space-y-5">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Menu Daftar Pengaduan</h2>
            <p className="text-sm text-gray-600 mb-4">
              Halaman ini menampilkan jumlah data per bidang. Pilih tombol daftar di bawah untuk membuka tabel sesuai form layanan.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((category) => {
                const total = getPengaduanCategoryRows(category.value).length;

                return (
                  <div key={category.value} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <p className="text-sm font-semibold text-[#1E3A7D] line-clamp-2">{category.shortLabel}</p>
                    <p className="text-xs text-gray-600 mt-1">Total data: {total}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-[#1E3A7D] mb-4">Pilih Daftar Pengaduan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.value}
                  to={`/admin-website-pupr-ppu/manajemen-pengaduan/${category.value}`}
                  className="inline-flex items-center justify-center bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPengaduan;
