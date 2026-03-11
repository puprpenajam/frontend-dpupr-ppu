import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import TambahDanEditBerita from '../components/TambahDanEditBerita';
import PopupBerhasil from '../components/PopupBerhasil';
import PopupKonfirmasi from '../components/PopupKonfirmasi';
import PreviewBerita from '../components/PreviewBerita';
import DaftarBerita from '../components/DaftarBerita';
import { Plus } from 'lucide-react';

const ManajemenBerita = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize newsData from localStorage
  const [newsData, setNewsData] = useState(() => {
    const savedNews = localStorage.getItem('newsData');
    return savedNews ? JSON.parse(savedNews) : [];
  });
  
  const [previewNews, setPreviewNews] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [konfirmasiData, setKonfirmasiData] = useState({ id: null, type: 'delete' });
  const [showBerhasil, setShowBerhasil] = useState(false);
  const [pesanBerhasil, setPesanBerhasil] = useState('');
  
  const [newNews, setNewNews] = useState({
    thumbnail: null,
    thumbnailPreview: '',
    date: new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    title: '',
    location: 'Penajam',
    contentBlocks: [{ type: 'text', content: '' }]
  });

  const kecamatanOptions = ['Penajam', 'Sepaku', 'Waru', 'Babulu'];

  // Save news to localStorage whenever it changes
  useEffect(() => {
    if (newsData.length > 0) {
      localStorage.setItem('newsData', JSON.stringify(newsData));
    }
  }, [newsData]);

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr-ppu');
    }
  }, [user, navigate]);

  const handlePreview = (news) => {
    setPreviewNews(news);
    setShowPreview(true);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewNews({
          ...newNews,
          thumbnail: file,
          thumbnailPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addContentBlock = (type) => {
    const newBlock = { type, content: '' };
    if (type === 'image') {
      newBlock.caption = '';
    }
    setNewNews({
      ...newNews,
      contentBlocks: [...newNews.contentBlocks, newBlock]
    });
  };

  const updateContentBlock = (index, content, caption) => {
    const updatedBlocks = [...newNews.contentBlocks];
    updatedBlocks[index].content = content;
    if (caption !== undefined) {
      updatedBlocks[index].caption = caption;
    }
    setNewNews({ ...newNews, contentBlocks: updatedBlocks });
  };

  const removeContentBlock = (index) => {
    if (newNews.contentBlocks.length === 1) {
      alert('Minimal harus ada 1 konten');
      return;
    }
    const updatedBlocks = newNews.contentBlocks.filter((_, i) => i !== index);
    setNewNews({ ...newNews, contentBlocks: updatedBlocks });
  };

  const handleContentImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContentBlock(index, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    setNewNews({ ...newNews, date: formattedDate });
  };

  const handleSubmitNews = () => {
    // Get first text block for excerpt
    const firstTextBlock = newNews.contentBlocks.find(block => block.type === 'text' && block.content.trim() !== '');
    const excerpt = firstTextBlock ? firstTextBlock.content.substring(0, 150) + '...' : '';

    // Format full content with location at the beginning
    const textContent = newNews.contentBlocks
      .filter(block => block.type === 'text')
      .map(block => block.content)
      .join('\n\n');
    const formattedContent = `${newNews.location.toUpperCase()}. ${textContent}`;

    // Get all images from content blocks
    const contentImages = newNews.contentBlocks
      .filter(block => block.type === 'image' && block.content)
      .map(block => block.content);

    // Generate ID for new items
    const newId = editingId || new Date().getTime();

    const newsItem = {
      id: newId,
      image: newNews.thumbnailPreview || '/berita/default.jpg',
      date: newNews.date,
      title: newNews.title,
      location: newNews.location,
      excerpt: excerpt,
      contentBlocks: newNews.contentBlocks,
      images: contentImages,
      content: formattedContent
    };

    if (editingId) {
      // Update existing news
      setNewsData(newsData.map(news => news.id === editingId ? newsItem : news));
      setPesanBerhasil('Berita berhasil diupdate!');
    } else {
      // Add new news
      setNewsData([newsItem, ...newsData]);
      setPesanBerhasil('Berita berhasil ditambahkan!');
    }

    setShowBerhasil(true);
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setNewNews({
      thumbnail: null,
      thumbnailPreview: '',
      date: new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      title: '',
      location: 'Penajam',
      contentBlocks: [{ type: 'text', content: '' }]
    });
  };

  const handleDeleteClick = (id) => {
    setKonfirmasiData({ id, type: 'delete' });
    setShowKonfirmasi(true);
  };

  const handleConfirmDelete = () => {
    const updatedNews = newsData.filter(news => news.id !== konfirmasiData.id);
    setNewsData(updatedNews);
    localStorage.setItem('newsData', JSON.stringify(updatedNews));
    setShowKonfirmasi(false);
    setPesanBerhasil('Berita berhasil dihapus');
    setShowBerhasil(true);
  };

  const handleEdit = (news) => {
    setEditingId(news.id);
    
    // If news has contentBlocks, use them directly
    let contentBlocks = news.contentBlocks;
    
    // If old format (no contentBlocks), convert from content and images
    if (!contentBlocks || contentBlocks.length === 0) {
      const contentWithoutLocation = news.content.replace(/^[A-Z]+\.\s/, '');
      
      // Create blocks from text content
      contentBlocks = [{ type: 'text', content: contentWithoutLocation }];
      
      // Add image blocks if any
      if (news.images && news.images.length > 0) {
        news.images.forEach(img => {
          contentBlocks.push({ type: 'image', content: img });
        });
      }
    }
    
    setNewNews({
      thumbnail: null,
      thumbnailPreview: news.image,
      date: news.date,
      title: news.title,
      location: news.location || 'Penajam',
      contentBlocks: contentBlocks
    });
    setShowForm(true);
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
          title="Manajemen Berita" 
          subtitle="Kelola semua berita website DPUPR PPU"
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        {/* Content */}
        <div className="p-4 sm:p-6">
          <DaftarBerita 
            newsData={newsData}
            onPreview={handlePreview}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onAddNew={() => setShowForm(true)}
          />
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewBerita 
        isOpen={showPreview}
        news={previewNews}
        onClose={() => setShowPreview(false)}
      />

      {/* Form Modal */}
      <TambahDanEditBerita
        isOpen={showForm}
        editingId={editingId}
        newNews={newNews}
        setNewNews={setNewNews}
        onSubmit={handleSubmitNews}
        onCancel={resetForm}
        onThumbnailUpload={handleThumbnailUpload}
        onDateChange={handleDateChange}
        onAddContentBlock={addContentBlock}
        onUpdateContentBlock={updateContentBlock}
        onRemoveContentBlock={removeContentBlock}
        onContentImageUpload={handleContentImageUpload}
        kecamatanOptions={kecamatanOptions}
      />

      {/* Confirmation Modal */}
      <PopupKonfirmasi
        isOpen={showKonfirmasi}
        title="Hapus Berita"
        message="Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowKonfirmasi(false)}
        confirmText="Hapus"
        cancelText="Batal"
        isDangerous={true}
      />

      {/* Success Modal */}
      <PopupBerhasil
        isOpen={showBerhasil}
        message={pesanBerhasil}
        onClose={() => setShowBerhasil(false)}
        type="success"
      />
    </div>
  );
};

export default ManajemenBerita;
