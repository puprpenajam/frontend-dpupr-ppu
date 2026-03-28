import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import {
  getLayananCategories,
  getSekretariatCategory,
  getLayananRequests
} from '../../data/layananPublikUtils';

const ManajemenLayananPublik = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  const categories = useMemo(() => getLayananCategories(), []);
  const sekretariatCategory = useMemo(() => getSekretariatCategory(), []);
  const menuCategories = useMemo(
    () => [sekretariatCategory, ...categories, { value: 'lainnya', label: 'Form Lainnya' }],
    [categories, sekretariatCategory]
  );

  const loadData = () => {
    setRequests(getLayananRequests());
  };

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr-ppu');
      return;
    }
    loadData();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

      <div className="flex-1 min-w-0">
        <AdminHeader
          title="Manajemen Layanan Publik"
          subtitle="Verifikasi permohonan, ubah status, dan kelola rekomendasi form lanjutan"
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 space-y-5">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Menu Form Layanan Publik</h2>
            <p className="text-sm text-gray-600 mb-4">
              Halaman ini menampilkan ringkasan total data per form. Pilih tombol kategori di bawah untuk membuka halaman daftar data sesuai form.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {menuCategories.map((category) => {
                const categoryValues = [sekretariatCategory.value, ...categories.map((item) => item.value)];
                const totalPerCategory = requests.filter((item) => {
                  if (category.value === 'lainnya') {
                    return !categoryValues.includes(item.assignedCategory);
                  }
                  return item.assignedCategory === category.value;
                }).length;

                return (
                  <div key={category.value} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <p className="text-sm font-semibold text-[#1E3A7D]">{category.label}</p>
                    <p className="text-xs text-gray-600 mt-1">Total data: {totalPerCategory}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-[#1E3A7D] mb-4">Pilih Daftar Form</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {menuCategories.map((category) => (
                <Link
                  key={category.value}
                  to={`/admin-website-pupr-ppu/manajemen-layanan-publik/${category.value}`}
                  className="inline-flex items-center justify-center bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Buka {category.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenLayananPublik;
