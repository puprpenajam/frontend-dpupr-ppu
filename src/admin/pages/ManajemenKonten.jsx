import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import DaftarKonten from '../components/DaftarKonten';
import TambahDanEditKonten from '../components/TambahDanEditKonten';
import PreviewHalaman from '../components/PreviewHalaman';
import PopupBerhasil from '../components/PopupBerhasil';
import PopupKonfirmasi from '../components/PopupKonfirmasi';
import { Plus, AlertCircle, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import ppidContentData from '../../data/ppidContent';

const ManajemenKonten = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [konten, setKonten] = useState(() => {
    const savedPages = localStorage.getItem('kontenPages');
    if (savedPages) {
      return JSON.parse(savedPages);
    }
    // Default content pages sesuai dengan menu navbar
    const defaultPages = [
      // INFORMASI KEGIATAN PUPR
      { id: 1, name: 'Bagian Umum & Bagian Sunram dan Keuangan', slug: 'bagian-umum-sunram', category: 'kegiatan', description: 'Informasi kegiatan Bagian Umum & Bagian Sunram dan Keuangan', isPublished: true, title: 'Bagian Umum & Bagian Sunram dan Keuangan', contentBlocks: [] },
      { id: 2, name: 'UPT-PU Lab dan Alat Berat', slug: 'upt-lab-alat-berat', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Lab dan Alat Berat', isPublished: true, title: 'UPT-PU Lab dan Alat Berat', contentBlocks: [] },
      { id: 3, name: 'UPT-PU Penajam', slug: 'upt-penajam', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Penajam', isPublished: true, title: 'UPT-PU Penajam', contentBlocks: [] },
      { id: 4, name: 'UPT-PU Sepaku', slug: 'upt-sepaku', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Sepaku', isPublished: true, title: 'UPT-PU Sepaku', contentBlocks: [] },
      { id: 5, name: 'UPT-PU Waru', slug: 'upt-waru', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Waru', isPublished: true, title: 'UPT-PU Waru', contentBlocks: [] },
      { id: 6, name: 'UPT-PU Babulu', slug: 'upt-babulu', category: 'kegiatan', description: 'Informasi kegiatan UPT-PU Babulu', isPublished: true, title: 'UPT-PU Babulu', contentBlocks: [] },
      { id: 7, name: 'Bina Konstruksi', slug: 'bina-konstruksi', category: 'kegiatan', description: 'Informasi kegiatan Bina Konstruksi', isPublished: true, title: 'Bina Konstruksi', contentBlocks: [] },
      { id: 8, name: 'Cipta Karya', slug: 'cipta-karya', category: 'kegiatan', description: 'Informasi kegiatan Cipta Karya', isPublished: true, title: 'Cipta Karya', contentBlocks: [] },
      { id: 9, name: 'Tata Ruang', slug: 'tata-ruang', category: 'kegiatan', description: 'Informasi kegiatan Tata Ruang', isPublished: true, title: 'Tata Ruang', contentBlocks: [] },
      { id: 10, name: 'PSDA', slug: 'psda', category: 'kegiatan', description: 'Informasi kegiatan PSDA', isPublished: true, title: 'PSDA', contentBlocks: [] },
      { id: 11, name: 'Bina Marga', slug: 'bina-marga', category: 'kegiatan', description: 'Informasi kegiatan Bina Marga', isPublished: true, title: 'Bina Marga', contentBlocks: [] },
      
      // PPID DPUPR (with content from ppidContentData)
      { ...ppidContentData['visi-misi-ppid'] },
      { ...ppidContentData['maklumat-pelayanan'] },
      { id: 14, name: 'SOP Pelayanan Publik', slug: 'sop-pelayanan', category: 'ppid', description: 'Standar Operasional Prosedur Pelayanan Publik', isPublished: true, title: 'SOP Pelayanan Publik', contentBlocks: [] },
      { ...ppidContentData['formulir-permohonan'] },
      { ...ppidContentData['tata-cara-permohonan'] },
      { id: 17, name: 'Tata Cara Pengajuan Keberatan Informasi Publik', slug: 'tata-cara-keberatan', category: 'ppid', description: 'Tata Cara Pengajuan Keberatan Informasi Publik', isPublished: true, title: 'Tata Cara Pengajuan Keberatan Informasi Publik', contentBlocks: [] },
      { id: 18, name: 'Tata Cara Pengajuan Sengketa Informasi Publik', slug: 'tata-cara-sengketa', category: 'ppid', description: 'Tata Cara Pengajuan Sengketa Informasi Publik', isPublished: true, title: 'Tata Cara Pengajuan Sengketa Informasi Publik', contentBlocks: [] },
      { id: 19, name: 'Jam Layanan Informasi Publik', slug: 'jam-layanan', category: 'ppid', description: 'Jam Layanan Informasi Publik PPID', isPublished: true, title: 'Jam Layanan Informasi Publik', contentBlocks: [] },
      { id: 20, name: 'SK PPID', slug: 'sk-ppid', category: 'ppid', description: 'Surat Keputusan PPID', isPublished: true, title: 'SK PPID', contentBlocks: [] },
      { id: 21, name: 'Kanal Pengaduan Masyarakat', slug: 'kanal-pengaduan', category: 'ppid', description: 'Kanal Pengaduan Masyarakat', isPublished: true, title: 'Kanal Pengaduan Masyarakat', contentBlocks: [] },
      
      // PROFIL DPUPR
      { id: 22, name: 'Visi dan Misi PUPR', slug: 'visi-misi-pupr', category: 'profil', description: 'Visi dan Misi Dinas PUPR', isPublished: true, title: 'Visi dan Misi PUPR', contentBlocks: [] },
      { id: 23, name: 'Landasan Hukum', slug: 'landasan-hukum', category: 'profil', description: 'Landasan Hukum DPUPR', isPublished: true, title: 'Landasan Hukum', contentBlocks: [] },
      { id: 24, name: 'Tupoksi', slug: 'tupoksi', category: 'profil', description: 'Tugas Pokok dan Fungsi DPUPR', isPublished: true, title: 'Tupoksi', contentBlocks: [] },
      { id: 25, name: 'Daftar Pejabat di DPUPR PPU', slug: 'daftar-pejabat', category: 'profil', description: 'Daftar Pejabat di DPUPR PPU', isPublished: true, title: 'Daftar Pejabat di DPUPR PPU', contentBlocks: [] },
      { id: 26, name: 'Riwayat Kepala Dinas', slug: 'riwayat-kepala-dinas', category: 'profil', description: 'Riwayat Kepala Dinas PUPR', isPublished: true, title: 'Riwayat Kepala Dinas', contentBlocks: [] },
      { id: 27, name: 'Informasi Kepala Dinas', slug: 'informasi-kepala-dinas', category: 'profil', description: 'Informasi lengkap tentang Kepala Dinas PUPR PPU', isPublished: true, title: 'Informasi Kepala Dinas', contentBlocks: [] }
    ];
    localStorage.setItem('kontenPages', JSON.stringify(defaultPages));
    return defaultPages;
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [filterCategory, setFilterCategory] = useState('all');
  
  // New states for preview and popups
  const [previewHalaman, setPreviewHalaman] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [konfirmasiData, setKonfirmasiData] = useState({ id: null, type: 'delete' });
  const [showBerhasil, setShowBerhasil] = useState(false);
  const [pesanBerhasil, setPesanBerhasil] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'kegiatan',
    description: '',
    title: '',
    contentBlocks: [],
    isPublished: true
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr-ppu');
      return;
    }
  }, [user, navigate]);

  // Initialize PPID content if not yet loaded
  useEffect(() => {
    const savedPages = localStorage.getItem('kontenPages');
    if (savedPages) {
      const pages = JSON.parse(savedPages);
      let needsUpdate = false;
      
      // Check and update PPID pages that have no content
      const updatedPages = pages.map(page => {
        if (page.category === 'ppid' && ppidContentData[page.slug]) {
          // If page has no content or empty contentBlocks, update it
          if (!page.contentBlocks || page.contentBlocks.length === 0) {
            needsUpdate = true;
            console.log(`Initializing content for: ${page.name}`);
            return {
              ...page,
              ...ppidContentData[page.slug]
            };
          }
        }
        return page;
      });
      
      if (needsUpdate) {
        localStorage.setItem('kontenPages', JSON.stringify(updatedPages));
        setKonten(updatedPages);
        console.log('✅ PPID content initialized successfully!');
      }
    }
  }, []);

  const handlePreview = (halaman) => {
    setPreviewHalaman(halaman);
    setShowPreview(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Nama konten tidak boleh kosong';
    }
    
    if (!formData.slug || formData.slug.trim() === '') {
      newErrors.slug = 'Slug tidak boleh kosong';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug hanya boleh mengandung huruf kecil, angka, dan tanda strip';
    }

    if (!formData.category || formData.category.trim() === '') {
      newErrors.category = 'Kategori harus dipilih';
    }
    
    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Deskripsi tidak boleh kosong';
    }

    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Judul halaman tidak boleh kosong';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (editingId) {
      // Update existing
      const updatedKonten = konten.map(k => 
        k.id === editingId ? { ...k, ...formData } : k
      );
      setKonten(updatedKonten);
      localStorage.setItem('kontenPages', JSON.stringify(updatedKonten));
      setPesanBerhasil('Konten berhasil diupdate!');
    } else {
      // Add new
      const newKonten = {
        id: new Date().getTime(),
        ...formData
      };
      const updatedKonten = [...konten, newKonten];
      setKonten(updatedKonten);
      localStorage.setItem('kontenPages', JSON.stringify(updatedKonten));
      setPesanBerhasil('Konten berhasil ditambahkan!');
    }

    setShowBerhasil(true);
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      slug: item.slug,
      category: item.category || 'kegiatan',
      description: item.description,
      title: item.title || item.name,
      contentBlocks: item.contentBlocks || [],
      isPublished: item.isPublished
    });
    setEditingId(item.id);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = (id) => {
    setKonfirmasiData({ id, type: 'delete' });
    setShowKonfirmasi(true);
  };

  const handleConfirmDelete = () => {
    const updatedKonten = konten.filter(k => k.id !== konfirmasiData.id);
    setKonten(updatedKonten);
    localStorage.setItem('kontenPages', JSON.stringify(updatedKonten));
    setShowKonfirmasi(false);
    setPesanBerhasil('Konten berhasil dihapus!');
    setShowBerhasil(true);
  };

  const handleTogglePublish = (id) => {
    const updatedKonten = konten.map(k =>
      k.id === id ? { ...k, isPublished: !k.isPublished } : k
    );
    setKonten(updatedKonten);
    localStorage.setItem('kontenPages', JSON.stringify(updatedKonten));
  };

  const resetForm = () => {
    setFormData({ name: '', slug: '', category: 'kegiatan', description: '', title: '', contentBlocks: [], isPublished: true });
    setEditingId(null);
    setShowForm(false);
    setErrors({});
  };

  const handleInitializePPIDContent = () => {
    const savedPages = localStorage.getItem('kontenPages');
    if (!savedPages) {
      setPesanBerhasil('localStorage kosong, silakan refresh halaman untuk inisialisasi!');
      setShowBerhasil(true);
      return;
    }
    
    const pages = JSON.parse(savedPages);
    let updateCount = 0;
    
    const updatedPages = pages.map(page => {
      if (page.category === 'ppid' && ppidContentData[page.slug]) {
        // Force update with PPID content
        updateCount++;
        console.log(`🔄 Force updating: ${page.name}`);
        return {
          ...page,
          ...ppidContentData[page.slug]
        };
      }
      return page;
    });
    
    if (updateCount > 0) {
      localStorage.setItem('kontenPages', JSON.stringify(updatedPages));
      setKonten(updatedPages);
      setPesanBerhasil(`${updateCount} halaman PPID berhasil diinisialisasi/diupdate!`);
      setShowBerhasil(true);
      console.log(`✅ ${updateCount} PPID pages updated!`);
    } else {
      setPesanBerhasil('Semua halaman PPID sudah terinisialisasi!');
      setShowBerhasil(true);
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
          title="Manajemen Konten" 
          subtitle="Kelola halaman dan menu utama website"
        />

        {/* Content */}
        <div className="p-6">
          {showMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-300 rounded-lg flex items-center gap-2">
              <div className="flex-1 text-green-700">{message}</div>
              <button
                onClick={() => setShowMessage(false)}
                className="text-green-700 hover:text-green-900"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Daftar Konten</h2>
            <div className="flex gap-3">
              <button
                onClick={handleInitializePPIDContent}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                title="Inisialisasi atau update konten PPID dengan data terbaru"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Inisialisasi PPID
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="flex items-center gap-2 bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Tambah Konten Baru
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterCategory === 'all'
                  ? 'bg-[#1E3A7D] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
              }`}
            >
              Semua ({konten.length})
            </button>
            <button
              onClick={() => setFilterCategory('kegiatan')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterCategory === 'kegiatan'
                  ? 'bg-[#1E3A7D] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
              }`}
            >
              Informasi Kegiatan ({konten.filter(k => k.category === 'kegiatan').length})
            </button>
            <button
              onClick={() => setFilterCategory('ppid')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterCategory === 'ppid'
                  ? 'bg-[#1E3A7D] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
              }`}
            >
              PPID DPUPR ({konten.filter(k => k.category === 'ppid').length})
            </button>
            <button
              onClick={() => setFilterCategory('profil')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterCategory === 'profil'
                  ? 'bg-[#1E3A7D] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
              }`}
            >
              Profil DPUPR ({konten.filter(k => k.category === 'profil').length})
            </button>
          </div>

          {/* Info Text */}
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-700">
              <strong>Total halaman:</strong> {konten.length} | 
              <strong> Kegiatan:</strong> {konten.filter(k => k.category === 'kegiatan').length} | 
              <strong> PPID:</strong> {konten.filter(k => k.category === 'ppid').length} | 
              <strong> Profil:</strong> {konten.filter(k => k.category === 'profil').length}
            </p>
          </div>

          {konten.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Belum ada konten</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Nama Konten</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Kategori</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Slug</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Deskripsi</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {konten
                    .filter(item => filterCategory === 'all' || item.category === filterCategory)
                    .map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          item.category === 'kegiatan' ? 'bg-blue-100 text-blue-700' :
                          item.category === 'ppid' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {item.category === 'kegiatan' ? 'Kegiatan' :
                           item.category === 'ppid' ? 'PPID' : 'Profil'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">
                          /{item.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleTogglePublish(item.id)}
                          className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                            item.isPublished
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title={item.isPublished ? 'Publikasikan' : 'Sembunyikan'}
                        >
                          {item.isPublished ? (
                            <>
                              <Eye className="w-4 h-4" />
                              <span className="text-xs">Aktif</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-4 h-4" />
                              <span className="text-xs">Tersembunyi</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 ">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handlePreview(item)}
                            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1E3A7D]">
                {editingId ? 'Edit Konten' : 'Tambah Konten Baru'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700 mb-2">Mohon perbaiki kesalahan berikut:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                      {Object.values(errors).map((error, idx) => (
                        <li key={idx}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Konten <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Profil Dinas"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.name
                      ? 'border-red-400 bg-red-50 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#1E3A7D]'
                  }`}
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug / URL <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <span className="text-gray-500 px-3 border-2 border-gray-300 rounded-l-lg">https://website.com/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                    placeholder="profil-dinas"
                    className={`flex-1 px-4 py-3 border-2 border-l-0 rounded-r-lg focus:outline-none ${
                      errors.slug
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-gray-300 focus:border-[#1E3A7D]'
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Hanya huruf kecil, angka, dan tanda strip</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.category
                      ? 'border-red-400 bg-red-50 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#1E3A7D]'
                  }`}
                >
                  <option value="kegiatan">Informasi Kegiatan PUPR</option>
                  <option value="ppid">PPID DPUPR</option>
                  <option value="profil">Profil DPUPR</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">Pilih kategori menu untuk halaman ini</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi singkat konten ini"
                  rows="4"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none resize-none ${
                    errors.description
                      ? 'border-red-400 bg-red-50 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#1E3A7D]'
                  }`}
                />
              </div>

              {/* Page Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Halaman <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Judul yang akan ditampilkan di halaman"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.title
                      ? 'border-red-400 bg-red-50 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#1E3A7D]'
                  }`}
                />
                <p className="text-xs text-gray-500 mt-2">Judul yang muncul di header halaman</p>
              </div>

              {/* Content Blocks */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Konten Halaman
                </label>
                
                {/* Add Content Block Buttons */}
                <div className="flex gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => handleAddContentBlock('text')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Type className="w-4 h-4" />
                    Tambah Teks
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddContentBlock('image')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Tambah Gambar
                  </button>
                </div>

                {/* Content Blocks List */}
                <div className="space-y-4">
                  {formData.contentBlocks.map((block, index) => (
                    <div key={block.id} className="border-2 border-gray-300 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">
                          {block.type === 'text' ? '📝 Blok Teks' : '🖼️ Blok Gambar'} #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveContentBlock(block.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold"
                        >
                          Hapus
                        </button>
                      </div>

                      {block.type === 'text' ? (
                        <textarea
                          value={block.content}
                          onChange={(e) => handleUpdateContentBlock(block.id, e.target.value)}
                          placeholder="Tulis konten teks di sini... Anda bisa gunakan HTML tags seperti <h2>, <h3>, <p>, <strong>, <ul>, <li>"
                          rows="6"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E3A7D] resize-none font-mono text-sm"
                        />
                      ) : (
                        <div>
                          {block.content ? (
                            <div className="relative">
                              <img
                                src={block.content}
                                alt="Preview"
                                className="w-full h-64 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => handleUpdateContentBlock(block.id, '')}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                              >
                                Ganti Gambar
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1E3A7D] hover:bg-gray-50 transition-all">
                              <Upload className="w-12 h-12 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-500">Klik untuk upload gambar</span>
                              <span className="text-xs text-gray-400 mt-1">Maks. 5MB</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleContentImageUpload(block.id, e)}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {formData.contentBlocks.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <p className="text-gray-500 text-sm">Belum ada konten. Klik tombol di atas untuk menambahkan teks atau gambar.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Published Toggle */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-[#1E3A7D] focus:ring-2 focus:ring-[#1E3A7D]"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Tampilkan di menu navigasi publik
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Jika diaktifkan, halaman ini akan tampil di menu navigasi website publik
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
              <div className="flex gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#1E3A7D] hover:bg-[#152856] text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {editingId ? 'Update Konten' : 'Simpan Konten'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <PreviewHalaman 
        isOpen={showPreview}
        halaman={previewHalaman}
        onClose={() => setShowPreview(false)}
      />

      {/* Popup Berhasil */}
      <PopupBerhasil 
        isOpen={showBerhasil}
        message={pesanBerhasil}
        onClose={() => setShowBerhasil(false)}
      />

      {/* Popup Konfirmasi */}
      <PopupKonfirmasi 
        isOpen={showKonfirmasi}
        message="Apakah Anda yakin ingin menghapus konten ini?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowKonfirmasi(false)}
      />
    </div>
  );
};

export default ManajemenKonten;
