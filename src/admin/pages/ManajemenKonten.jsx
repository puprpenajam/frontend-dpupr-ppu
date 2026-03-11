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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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

  // Reload konten from localStorage whenever we're back to list view
  useEffect(() => {
    if (!showForm) {
      const savedPages = localStorage.getItem('kontenPages');
      if (savedPages) {
        const currentKonten = JSON.parse(savedPages);
        setKonten(currentKonten);
      }
    }
  }, [showForm]);

  const handlePreview = (halaman) => {
    // Reload from localStorage to ensure preview shows latest data
    const savedPages = localStorage.getItem('kontenPages');
    if (savedPages) {
      const currentKonten = JSON.parse(savedPages);
      const latestHalaman = currentKonten.find(k => k.id === halaman.id);
      if (latestHalaman) {
        setPreviewHalaman(latestHalaman);
        setShowPreview(true);
        return;
      }
    }
    // Fallback to original if not found
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

    // Always reload from localStorage first to prevent data loss from other tabs/sessions
    const savedPages = localStorage.getItem('kontenPages');
    const currentKonten = savedPages ? JSON.parse(savedPages) : konten;

    if (editingId) {
      // Update existing
      const updatedKonten = currentKonten.map(k => 
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
      const updatedKonten = [...currentKonten, newKonten];
      setKonten(updatedKonten);
      localStorage.setItem('kontenPages', JSON.stringify(updatedKonten));
      setPesanBerhasil('Konten berhasil ditambahkan!');
    }

    setShowBerhasil(true);
    resetForm();
  };

  const handleEdit = (item) => {
    // Reload from localStorage to ensure we have the latest data
    const savedPages = localStorage.getItem('kontenPages');
    if (savedPages) {
      const currentKonten = JSON.parse(savedPages);
      const latestItem = currentKonten.find(k => k.id === item.id);
      if (latestItem) {
        setFormData({
          name: latestItem.name,
          slug: latestItem.slug,
          category: latestItem.category || 'kegiatan',
          description: latestItem.description,
          title: latestItem.title || latestItem.name,
          contentBlocks: latestItem.contentBlocks || [],
          isPublished: latestItem.isPublished
        });
        setEditingId(latestItem.id);
        setShowForm(true);
        setErrors({});
        return;
      }
    }
    // Fallback to original if localStorage not available
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
    // Reload from localStorage first
    const savedPages = localStorage.getItem('kontenPages');
    const currentKonten = savedPages ? JSON.parse(savedPages) : konten;
    
    const updatedKonten = currentKonten.filter(k => k.id !== konfirmasiData.id);
    setKonten(updatedKonten);
    localStorage.setItem('kontenPages', JSON.stringify(updatedKonten));
    setShowKonfirmasi(false);
    setPesanBerhasil('Konten berhasil dihapus!');
    setShowBerhasil(true);
  };

  const handleTogglePublish = (id) => {
    // Reload from localStorage first
    const savedPages = localStorage.getItem('kontenPages');
    const currentKonten = savedPages ? JSON.parse(savedPages) : konten;
    
    const updatedKonten = currentKonten.map(k =>
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

  // Content Block handlers
  const handleAddContentBlock = (type) => {
    const newBlock = {
      id: new Date().getTime(),
      type: type, // 'text' or 'image'
      content: '',
      caption: ''
    };
    setFormData({
      ...formData,
      contentBlocks: [...formData.contentBlocks, newBlock]
    });
  };

  const handleUpdateContentBlock = (index, field, value) => {
    const updatedBlocks = [...formData.contentBlocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      [field]: value
    };
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  const handleRemoveContentBlock = (index) => {
    const updatedBlocks = formData.contentBlocks.filter((_, i) => i !== index);
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  const handleContentImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateContentBlock(index, 'content', reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />
      
      <div className="flex-1 min-w-0">
        {/* Header */}
        <AdminHeader 
          title="Manajemen Konten" 
          subtitle="Kelola halaman dan menu utama website"
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        {/* Content */}
        <div className="p-4 sm:p-6">
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Daftar Konten</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleInitializePPIDContent}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm"
                title="Inisialisasi atau update konten PPID dengan data terbaru"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Inisialisasi PPID</span>
                <span className="sm:hidden">Init PPID</span>
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="flex items-center justify-center gap-2 bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Tambah Konten Baru</span>
                <span className="sm:hidden">Tambah</span>
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

      {/* Form Modal with TambahDanEditKonten Component */}
      <TambahDanEditKonten 
        isOpen={showForm}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        onAddContentBlock={handleAddContentBlock}
        onUpdateContentBlock={handleUpdateContentBlock}
        onRemoveContentBlock={handleRemoveContentBlock}
        onContentImageUpload={handleContentImageUpload}
      />

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
