import { useState, useRef, useEffect } from 'react';
import { X, Calendar, Upload, MapPin, Type, Image as ImageIcon, AlertCircle, Bold, Italic, Underline, Heading2, Heading3, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Eraser, Palette } from 'lucide-react';

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
  const editorRefs = useRef({});
  const [activeFormats, setActiveFormats] = useState({});
  const [showColorPicker, setShowColorPicker] = useState({});
  const [isInitialized, setIsInitialized] = useState({});

  // Initialize editors when contentBlocks change
  useEffect(() => {
    newNews.contentBlocks.forEach((block, index) => {
      if (block.type === 'text' && editorRefs.current[index] && !isInitialized[index]) {
        setIsInitialized(prev => ({ ...prev, [index]: true }));
      }
    });
  }, [newNews.contentBlocks, isInitialized]);

  const applyFormat = (index, command, value = null) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    document.execCommand(command, false, value);
    onUpdateContentBlock(index, editor.innerHTML);

    // Update active formats
    updateActiveFormats(index);
  };

  const updateActiveFormats = (index) => {
    const formats = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline')
    };
    setActiveFormats(prev => ({ ...prev, [index]: formats }));
  };

  const insertHeading = (index, level) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    document.execCommand('formatBlock', false, level);
    onUpdateContentBlock(index, editor.innerHTML);
  };

  const insertList = (index, listType) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    
    if (listType === 'ol-alpha') {
      // Ordered list dengan huruf kecil (a, b, c)
      document.execCommand('insertHTML', false, '<ol style="list-style-type: lower-alpha;"><li>Item a</li><li>Item b</li><li>Item c</li></ol>');
    } else if (listType === 'ol-alpha-upper') {
      // Ordered list dengan huruf besar (A, B, C)
      document.execCommand('insertHTML', false, '<ol style="list-style-type: upper-alpha;"><li>Item A</li><li>Item B</li><li>Item C</li></ol>');
    } else if (listType === 'ul') {
      document.execCommand('insertUnorderedList', false, null);
    } else if (listType === 'ol') {
      document.execCommand('insertOrderedList', false, null);
    }
    
    onUpdateContentBlock(index, editor.innerHTML);
    updateActiveFormats(index);
  };

  const insertLink = (index) => {
    const url = prompt('Masukkan URL link:');
    if (url) {
      applyFormat(index, 'createLink', url);
    }
  };

  const applyTextColor = (index, color) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    document.execCommand('foreColor', false, color);
    onUpdateContentBlock(index, editor.innerHTML);
    setShowColorPicker(prev => ({ ...prev, [index]: false }));
  };

  const applyBackgroundColor = (index, color) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    document.execCommand('hiliteColor', false, color);
    onUpdateContentBlock(index, editor.innerHTML);
    setShowColorPicker(prev => ({ ...prev, [index]: false }));
  };

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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col my-4">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E3A7D]">
            {editingId ? 'Edit Berita' : 'Buat Berita Baru'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
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
                    <div>
                      {/* Toolbar */}
                      <div className="flex flex-wrap gap-1 mb-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                        {/* Bold, Italic, Underline */}
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'bold')}
                          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                            activeFormats[index]?.bold ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                          }`}
                          title="Bold (Ctrl+B)"
                        >
                          <Bold className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'italic')}
                          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                            activeFormats[index]?.italic ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                          }`}
                          title="Italic (Ctrl+I)"
                        >
                          <Italic className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'underline')}
                          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                            activeFormats[index]?.underline ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                          }`}
                          title="Underline (Ctrl+U)"
                        >
                          <Underline className="w-4 h-4" />
                        </button>

                        <div className="w-px bg-gray-300 mx-1"></div>

                        {/* Headings */}
                        <button
                          type="button"
                          onClick={() => insertHeading(index, 'h2')}
                          className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          title="Heading 2"
                        >
                          <Heading2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHeading(index, 'h3')}
                          className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          title="Heading 3"
                        >
                          <Heading3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHeading(index, 'p')}
                          className="px-2 py-1 hover:bg-gray-200 rounded transition-colors text-xs font-semibold text-gray-700"
                          title="Paragraph"
                        >
                          P
                        </button>

                        <div className="w-px bg-gray-300 mx-1"></div>

                        {/* Lists */}
                        <button
                          type="button"
                          onClick={() => insertList(index, 'ul')}
                          className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          title="Bullet List"
                        >
                          <List className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertList(index, 'ol')}
                          className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          title="Numbered List (1, 2, 3)"
                        >
                          <ListOrdered className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertList(index, 'ol-alpha')}
                          className="px-2 py-1 hover:bg-gray-200 rounded transition-colors text-xs font-bold text-gray-700"
                          title="Alphabetical List (a, b, c)"
                        >
                          abc
                        </button>
                        <button
                          type="button"
                          onClick={() => insertList(index, 'ol-alpha-upper')}
                          className="px-2 py-1 hover:bg-gray-200 rounded transition-colors text-xs font-bold text-gray-700"
                          title="Alphabetical List (A, B, C)"
                        >
                          ABC
                        </button>

                        <div className="w-px bg-gray-300 mx-1"></div>

                        {/* Alignment */}
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'justifyLeft')}
                          className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          title="Align Left"
                        >
                          <AlignLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'justifyCenter')}
                          className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          title="Align Center"
                        >
                          <AlignCenter className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'justifyRight')}
                          className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          title="Align Right"
                        >
                          <AlignRight className="w-4 h-4" />
                        </button>

                        <div className="w-px bg-gray-300 mx-1"></div>

                        {/* Link */}
                        <button
                          type="button"
                          onClick={() => insertLink(index)}
                          className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          title="Insert Link"
                        >
                          <LinkIcon className="w-4 h-4" />
                        </button>

                        {/* Color Picker */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowColorPicker(prev => ({ ...prev, [index]: !prev[index] }))}
                            className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                            title="Text Color"
                          >
                            <Palette className="w-4 h-4" />
                          </button>
                          {showColorPicker[index] && (
                            <div className="absolute top-full left-0 mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 z-50 w-64">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold text-gray-600">Warna Teks</span>
                                <button
                                  type="button"
                                  onClick={() => setShowColorPicker(prev => ({ ...prev, [index]: false }))}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="grid grid-cols-6 gap-2 mb-3">
                                {[
                                  { color: '#000000', name: 'Hitam' },
                                  { color: '#1E40AF', name: 'Biru' },
                                  { color: '#DC2626', name: 'Merah' },
                                  { color: '#16A34A', name: 'Hijau' },
                                  { color: '#EA580C', name: 'Oranye' },
                                  { color: '#9333EA', name: 'Ungu' },
                                  { color: '#6B7280', name: 'Abu' },
                                  { color: '#EC4899', name: 'Pink' },
                                  { color: '#06B6D4', name: 'Cyan' },
                                  { color: '#84CC16', name: 'Lime' },
                                  { color: '#EAB308', name: 'Kuning' },
                                  { color: '#8B5CF6', name: 'Violet' },
                                ].map((item, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => applyTextColor(index, item.color)}
                                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-600 transition-all"
                                    style={{ backgroundColor: item.color }}
                                    title={item.name}
                                  />
                                ))}
                              </div>
                              <div className="text-xs font-semibold text-gray-600 mb-2">Highlight</div>
                              <div className="grid grid-cols-6 gap-2">
                                {[
                                  { color: '#FEF08A', name: 'Kuning' },
                                  { color: '#BFDBFE', name: 'Biru' },
                                  { color: '#BBF7D0', name: 'Hijau' },
                                  { color: '#FECACA', name: 'Merah' },
                                  { color: '#FBCFE8', name: 'Pink' },
                                  { color: '#C7D2FE', name: 'Indigo' },
                                ].map((item, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => applyBackgroundColor(index, item.color)}
                                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-600 transition-all"
                                    style={{ backgroundColor: item.color }}
                                    title={item.name}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Clear Formatting */}
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'removeFormat')}
                          className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          title="Clear Formatting"
                        >
                          <Eraser className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Editor */}
                      <div
                        ref={(el) => {
                          if (el && !editorRefs.current[index]) {
                            editorRefs.current[index] = el;
                            el.innerHTML = block.content || '<p><br></p>';
                          }
                        }}
                        contentEditable
                        onInput={(e) => {
                          onUpdateContentBlock(index, e.target.innerHTML);
                          updateActiveFormats(index);
                        }}
                        onMouseUp={() => updateActiveFormats(index)}
                        onKeyUp={() => updateActiveFormats(index)}
                        className="rich-text-editor w-full min-h-[200px] px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E3A7D] focus:outline-none"
                        style={{ minHeight: '200px' }}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        💡 Pilih teks dan gunakan toolbar untuk format langsung - hasilnya sama seperti di website publik
                      </p>
                    </div>
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
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) => onUpdateContentBlock(index, block.content, e.target.value)}
                          placeholder="Caption gambar (opsional)"
                          className="w-full mt-3 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[#1E3A7D] focus:outline-none transition-colors text-sm"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-6">
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
