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
import { getDefaultKegiatanPages, mergeKegiatanDefaults } from '../../data/defaultKegiatanPages';

const ManajemenKonten = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [konten, setKonten] = useState(() => {
    const savedPages = localStorage.getItem('kontenPages');
    if (savedPages) {
      return mergeKegiatanDefaults(JSON.parse(savedPages));
    }
    const defaultPages = getDefaultKegiatanPages();
    localStorage.setItem('kontenPages', JSON.stringify(defaultPages));
    return defaultPages;
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('kegiatan');
  
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

  // Reload konten from localStorage whenever we're back to list view
  useEffect(() => {
    if (!showForm) {
      const savedPages = localStorage.getItem('kontenPages');
      if (savedPages) {
        const currentKonten = mergeKegiatanDefaults(JSON.parse(savedPages));
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

  const handleSubmit = () => {
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Daftar Konten</h2>
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

          {/* Category Info - Hanya Informasi Kegiatan PUPR */}
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-700">
              <strong>Manajemen Konten Informasi Kegiatan PUPR</strong>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Halaman PPID dan Profil DPUPR menggunakan komponen JSX terpisah dan tidak dapat diedit melalui panel ini.
            </p>
          </div>

          {konten.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Belum ada konten</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700" style={{ width: '20%' }}>Nama Konten</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700" style={{ width: '10%' }}>Kategori</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700" style={{ width: '15%' }}>Slug</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700" style={{ width: '25%' }}>Deskripsi</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700" style={{ width: '12%' }}>Status</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700" style={{ width: '18%' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {konten
                    .filter(item => item.category === 'kegiatan')
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
