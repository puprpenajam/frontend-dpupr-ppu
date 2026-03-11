import { useState } from 'react';
import { X, Calendar, Upload, MapPin, Type, Image as ImageIcon, AlertCircle } from 'lucide-react';

const TambahDanEditBerita = ({
  isOpen,
  editingId,
  newNews,
  setNewNews,
  onSubmit,
  onCancel,
  onThumbnailUpload,
  onDateChange,
  onAddContentBlock,
  onUpdateContentBlock,
  onRemoveContentBlock,
  onContentImageUpload,
  kecamatanOptions
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!newNews.thumbnailPreview) {
      newErrors.thumbnail = 'Thumbnail berita wajib diupload';
    }

    if (!newNews.title || newNews.title.trim() === '') {
      newErrors.title = 'Judul berita tidak boleh kosong';
    } else if (newNews.title.length < 5) {
      newErrors.title = 'Judul berita minimal 5 karakter';
    }

    if (!newNews.location) {
      newErrors.location = 'Pilih lokasi/kecamatan';
    }

    const hasContent = newNews.contentBlocks.some(block => block.content.trim() !== '');
    if (!hasContent) {
      newErrors.content = 'Minimal harus ada 1 konten berita (teks atau gambar)';
    }

    const hasValidTextBlock = newNews.contentBlocks.some(
      block => block.type === 'text' && block.content.trim() !== ''
    );
    if (!hasValidTextBlock) {
      newErrors.content = 'Minimal harus ada 1 blok teks untuk ringkasan otomatis';
    }

    // Check if any image block is empty
    const emptyImageBlocks = newNews.contentBlocks.filter(
      block => block.type === 'image' && !block.content
    );
    if (emptyImageBlocks.length > 0) {
      newErrors.images = `${emptyImageBlocks.length} blok gambar belum diisi`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1E3A7D]">
            {editingId ? 'Edit Berita' : 'Buat Berita Baru'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Error Summary */}
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

          {/* Upload Thumbnail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thumbnail Berita <span className="text-red-500">*</span>
            </label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center hover:border-[#FDB913] transition-colors ${
              errors.thumbnail ? 'border-red-400 bg-red-50' : 'border-gray-300'
            }`}>
              {newNews.thumbnailPreview ? (
                <div className="relative">
                  <img
                    src={newNews.thumbnailPreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <button
                    type="button"
                    onClick={() => setNewNews({ ...newNews, thumbnail: null, thumbnailPreview: '' })}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-2">Klik untuk upload thumbnail</p>
                  <p className="text-sm text-gray-400">PNG, JPG hingga 10MB</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={onThumbnailUpload}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="inline-block mt-3 px-6 py-2 bg-[#1E3A7D] text-white rounded-lg cursor-pointer hover:bg-[#152856] transition-colors"
              >
                Pilih File
              </label>
            </div>
            {errors.thumbnail && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.thumbnail}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Thumbnail akan ditampilkan sebagai gambar pertama di berita
            </p>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal Berita
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                onChange={onDateChange}
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E3A7D] focus:outline-none"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Format: {newNews.date}</p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Berita <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newNews.title}
              onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
              placeholder="Masukkan judul berita"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                errors.title 
                  ? 'border-red-400 bg-red-50 focus:border-red-500' 
                  : 'border-gray-300 focus:border-[#1E3A7D]'
              }`}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Location/Kecamatan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lokasi/Kecamatan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={newNews.location}
                onChange={(e) => setNewNews({ ...newNews, location: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none appearance-none bg-white cursor-pointer ${
                  errors.location 
                    ? 'border-red-400 bg-red-50 focus:border-red-500' 
                    : 'border-gray-300 focus:border-[#1E3A7D]'
                }`}
              >
                {kecamatanOptions.map((kecamatan) => (
                  <option key={kecamatan} value={kecamatan}>
                    {kecamatan}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.location && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.location}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Lokasi akan ditampilkan di awal konten: "{newNews.location.toUpperCase()}. Dalam rangka..."
            </p>
          </div>

          {/* Content Blocks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Konten Berita <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Susun konten dengan teks dan gambar. Ringkasan otomatis diambil dari teks pertama.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onAddContentBlock('text')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#1E3A7D] text-white rounded-lg hover:bg-[#152856] transition-colors text-sm"
                >
                  <Type className="w-4 h-4" />
                  Teks
                </button>
                <button
                  type="button"
                  onClick={() => onAddContentBlock('image')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#FDB913] text-[#1E3A7D] rounded-lg hover:bg-[#E5A711] transition-colors text-sm"
                >
                  <ImageIcon className="w-4 h-4" />
                  Gambar
                </button>
              </div>
            </div>

            {(errors.content || errors.images) && (
              <div className="mb-3 p-3 bg-red-50 border border-red-300 rounded-lg flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div className="text-sm text-red-600">
                  {errors.content && <p>{errors.content}</p>}
                  {errors.images && <p>{errors.images}</p>}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {newNews.contentBlocks.map((block, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-600">
                      {block.type === 'text' ? '📝 Blok Teks' : '🖼️ Blok Gambar'} #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveContentBlock(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Hapus blok ini"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {block.type === 'text' ? (
                    <textarea
                      value={block.content}
                      onChange={(e) => onUpdateContentBlock(index, e.target.value)}
                      placeholder="Masukkan teks konten berita. Gunakan Enter dua kali untuk paragraf baru."
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E3A7D] focus:outline-none resize-none"
                    />
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onContentImageUpload(index, e)}
                        className="hidden"
                        id={`content-image-${index}`}
                      />
                      {block.content ? (
                        <div className="relative">
                          <img
                            src={block.content}
                            alt={`Content ${index}`}
                            className="w-full h-64 object-cover rounded-lg mb-3"
                          />
                          <button
                            type="button"
                            onClick={() => onUpdateContentBlock(index, '')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-600 text-sm mb-2">Belum ada gambar</p>
                        </div>
                      )}
                      <label
                        htmlFor={`content-image-${index}`}
                        className="inline-block mt-2 px-4 py-2 bg-[#FDB913] text-[#1E3A7D] rounded-lg cursor-pointer hover:bg-[#E5A711] transition-colors text-sm"
                      >
                        {block.content ? 'Ganti Gambar' : 'Pilih Gambar'}
                      </label>
                      {block.content && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="w-full">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Keterangan Gambar <span className="text-gray-400 font-normal">(Opsional)</span>
                            </label>
                            <input
                              type="text"
                              value={block.caption || ''}
                              onChange={(e) => onUpdateContentBlock(index, block.content, e.target.value)}
                              placeholder="Contoh: Menanam pohon di taman, Pelatihan kepada masyarakat"
                              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#1E3A7D] focus:outline-none text-sm focus:ring-0"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Keterangan akan muncul di bawah gambar pada halaman publik
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-[#1E3A7D] hover:bg-[#152856] text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {editingId ? 'Update Berita' : 'Simpan Berita'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahDanEditBerita;
