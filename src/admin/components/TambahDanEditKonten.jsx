import { AlertCircle, Type, Image as ImageIcon, Upload } from 'lucide-react';

const TambahDanEditKonten = ({ 
  formData, 
  setFormData, 
  errors, 
  isEditing, 
  onSubmit, 
  onCancel 
}) => {
  
  const handleAddContentBlock = (type) => {
    const newBlock = {
      id: new Date().getTime(),
      type: type, // 'text' or 'image'
      content: ''
    };
    setFormData({
      ...formData,
      contentBlocks: [...formData.contentBlocks, newBlock]
    });
  };

  const handleUpdateContentBlock = (blockId, newContent) => {
    const updatedBlocks = formData.contentBlocks.map(block =>
      block.id === blockId ? { ...block, content: newContent } : block
    );
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  const handleRemoveContentBlock = (blockId) => {
    const updatedBlocks = formData.contentBlocks.filter(block => block.id !== blockId);
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  const handleContentImageUpload = (blockId, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateContentBlock(blockId, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-[#1E3A7D] mb-6">
        {isEditing ? 'Edit Konten' : 'Tambah Konten Baru'}
      </h2>

      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex gap-3 mb-6">
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

      <div className="space-y-6">
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
            <span className="text-gray-500 px-3 py-3 border-2 border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
              /{formData.category || 'kategori'}/
            </span>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
              placeholder="profil-dinas"
              className={`flex-1 px-4 py-3 border-2 rounded-r-lg focus:outline-none ${
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
              Publikasikan halaman ini
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onSubmit}
            className="flex-1 bg-[#1E3A7D] hover:bg-[#152856] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {isEditing ? 'Update Konten' : 'Simpan Konten'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahDanEditKonten;
