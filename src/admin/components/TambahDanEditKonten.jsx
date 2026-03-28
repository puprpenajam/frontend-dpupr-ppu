import { useState, useRef, useEffect } from 'react';
import { X, Type, Image as ImageIcon, AlertCircle, Trash2, FileText, Bold, Italic, Underline, List, ListOrdered, Heading2, Heading3, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon, Eraser, Palette, ChevronUp, ChevronDown } from 'lucide-react';
import PopupInputLink from './PopupInputLink';

const TambahDanEditKonten = ({
  isOpen,
  editingId,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  onAddContentBlock,
  onUpdateContentBlock,
  onRemoveContentBlock,
  onContentImageUpload
}) => {
  const [errors, setErrors] = useState({});
  const editorRefs = useRef({});
  const [activeFormats, setActiveFormats] = useState({});
  const [showColorPicker, setShowColorPicker] = useState({});
  const [isInitialized, setIsInitialized] = useState({});
  const savedSelectionRange = useRef(null);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [linkTargetIndex, setLinkTargetIndex] = useState(null);
  const [linkValue, setLinkValue] = useState('');
  const [linkError, setLinkError] = useState('');

  // Move block up
  const moveBlockUp = (index) => {
    if (index === 0) return; // Can't move first block up
    const blocks = [...formData.contentBlocks];
    [blocks[index - 1], blocks[index]] = [blocks[index], blocks[index - 1]];
    setFormData({ ...formData, contentBlocks: blocks });
  };

  // Move block down
  const moveBlockDown = (index) => {
    if (index === formData.contentBlocks.length - 1) return; // Can't move last block down
    const blocks = [...formData.contentBlocks];
    [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    setFormData({ ...formData, contentBlocks: blocks });
  };

  // Initialize editors when content blocks change
  useEffect(() => {
    if (formData.contentBlocks) {
      formData.contentBlocks.forEach((block, index) => {
        if (block.type === 'text' && editorRefs.current[index] && !isInitialized[index]) {
          // Set initial content only once
          editorRefs.current[index].innerHTML = block.content || '<p><br></p>';
          setIsInitialized(prev => ({ ...prev, [index]: true }));
        }
      });
    }
  }, [formData.contentBlocks, isInitialized]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Nama konten tidak boleh kosong';
    }

    if (!formData.slug || formData.slug.trim() === '') {
      newErrors.slug = 'Slug tidak boleh kosong';
    }

    if (!formData.category) {
      newErrors.category = 'Pilih kategori konten';
    }

    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Judul halaman tidak boleh kosong';
    }

    const hasContent = formData.contentBlocks && formData.contentBlocks.length > 0 && 
                      formData.contentBlocks.some(block => block.content.trim() !== '');
    if (!hasContent) {
      newErrors.content = 'Minimal harus ada 1 konten (teks atau gambar)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleNameChange = (value) => {
    setFormData({
      ...formData,
      name: value,
      slug: generateSlug(value)
    });
  };

  // Rich Text Editor Functions
  const applyFormat = (index, command, value = null) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    document.execCommand(command, false, value);
    
    // Update content
    const content = editor.innerHTML;
    onUpdateContentBlock(index, 'content', content);
    
    // Update active formats
    updateActiveFormats(index);
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
    
    const content = editor.innerHTML;
    onUpdateContentBlock(index, 'content', content);
    updateActiveFormats(index);
  };

  const insertHeading = (index, level) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    document.execCommand('formatBlock', false, level);
    
    const content = editor.innerHTML;
    onUpdateContentBlock(index, 'content', content);
    updateActiveFormats(index);
  };

  const insertLink = (index) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRange.current = selection.getRangeAt(0).cloneRange();
    }

    setLinkTargetIndex(index);
    setLinkValue('');
    setLinkError('');
    setShowLinkPopup(true);
  };

  const handleSubmitLink = () => {
    if (linkTargetIndex === null) return;

    let normalizedUrl = linkValue.trim();
    if (!normalizedUrl) {
      setLinkError('URL link wajib diisi');
      return;
    }

    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const editor = editorRefs.current[linkTargetIndex];
    if (!editor) return;

    editor.focus();
    if (savedSelectionRange.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedSelectionRange.current);
    }

    document.execCommand('createLink', false, normalizedUrl);

    const content = editor.innerHTML;
    onUpdateContentBlock(linkTargetIndex, 'content', content);
    setShowLinkPopup(false);
    setLinkTargetIndex(null);
    setLinkValue('');
    setLinkError('');
  };

  const clearFormatting = (index) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    document.execCommand('removeFormat', false, null);
    document.execCommand('formatBlock', false, 'p');
    
    const content = editor.innerHTML;
    onUpdateContentBlock(index, 'content', content);
    updateActiveFormats(index);
  };

  const applyTextColor = (index, color) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    document.execCommand('foreColor', false, color);
    
    const content = editor.innerHTML;
    onUpdateContentBlock(index, 'content', content);
    setShowColorPicker(prev => ({ ...prev, [index]: false }));
  };

  const applyBackgroundColor = (index, color) => {
    const editor = editorRefs.current[index];
    if (!editor) return;

    editor.focus();
    document.execCommand('hiliteColor', false, color);
    
    const content = editor.innerHTML;
    onUpdateContentBlock(index, 'content', content);
  };

  const updateActiveFormats = (index) => {
    const formats = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    };
    
    setActiveFormats(prev => ({
      ...prev,
      [index]: formats
    }));
  };

  const handleEditorInput = (index, e) => {
    const content = e.target.innerHTML;
    onUpdateContentBlock(index, 'content', content);
    updateActiveFormats(index);
  };

  const handleEditorPaste = (index, e) => {
    e.preventDefault();
    
    // Get plain text from clipboard
    const text = e.clipboardData.getData('text/plain');
    
    // Insert as plain text
    document.execCommand('insertText', false, text);
    
    // Apply Poppins font
    const editor = editorRefs.current[index];
    if (editor) {
      document.execCommand('fontName', false, 'Poppins');
    }
    
    const content = editorRefs.current[index].innerHTML;
    onUpdateContentBlock(index, 'content', content);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col my-4">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E3A7D]">
            {editingId ? 'Edit Konten' : 'Buat Konten Baru'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-red-700 mb-2 text-sm sm:text-base">Mohon perbaiki kesalahan berikut:</p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-red-600">
                  {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Konten <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Contoh: Visi dan Misi PPID"
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:border-[#1E3A7D] focus:outline-none transition-colors text-sm sm:text-base`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="visi-misi-ppid"
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.slug ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:border-[#1E3A7D] focus:outline-none transition-colors font-mono text-sm`}
            />
            <p className="text-xs text-gray-500 mt-1">
              URL: /{formData.category}/{formData.slug}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:border-[#1E3A7D] focus:outline-none transition-colors text-sm sm:text-base`}
            >
              <option value="kegiatan">Informasi Kegiatan PUPR</option>
              <option value="ppid">PPID DPUPR</option>
              <option value="profil">Profil DPUPR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi singkat tentang halaman ini..."
              rows="3"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1E3A7D] focus:outline-none transition-colors text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Halaman <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Judul yang akan ditampilkan di halaman"
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:border-[#1E3A7D] focus:outline-none transition-colors text-sm sm:text-base`}
            />
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-5 h-5 text-[#1E3A7D] border-gray-300 rounded focus:ring-[#1E3A7D]"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-gray-700 cursor-pointer">
              Publikasikan halaman ini (halaman akan muncul di website)
            </label>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Konten Halaman <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onAddContentBlock('text')}
                  className="flex items-center gap-2 px-3 py-2 bg-[#1E3A7D] hover:bg-[#152856] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
                >
                  <Type className="w-4 h-4" />
                  <span className="hidden sm:inline">Teks</span>
                </button>
                <button
                  type="button"
                  onClick={() => onAddContentBlock('image')}
                  className="flex items-center gap-2 px-3 py-2 bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] text-xs sm:text-sm font-semibold rounded-lg transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Gambar</span>
                </button>
              </div>
            </div>

            {errors.content && (
              <div className="mb-3 p-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-600">
                {errors.content}
              </div>
            )}
            <div className="space-y-4">
              {formData.contentBlocks && formData.contentBlocks.map((block, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {block.type === 'text' ? (
                        <>
                          <FileText className="w-5 h-5 text-[#1E3A7D]" />
                          <span className="font-semibold text-gray-700 text-sm sm:text-base">Blok Teks #{index + 1}</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-5 h-5 text-[#FDB913]" />
                          <span className="font-semibold text-gray-700 text-sm sm:text-base">Blok Gambar #{index + 1}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveBlockUp(index)}
                        disabled={index === 0}
                        className={`p-1.5 rounded transition-colors ${
                          index === 0 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                        }`}
                        title="Pindah ke atas"
                      >
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlockDown(index)}
                        disabled={index === formData.contentBlocks.length - 1}
                        className={`p-1.5 rounded transition-colors ${
                          index === formData.contentBlocks.length - 1 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                        }`}
                        title="Pindah ke bawah"
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveContentBlock(index)}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors ml-1"
                        title="Hapus blok"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {block.type === 'text' ? (
                    <div>
                      <div className="flex flex-wrap gap-1 mb-3 p-2 bg-white border-2 border-gray-200 rounded-lg">
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'bold')}
                          className={`p-2 rounded transition-colors ${
                            activeFormats[index]?.bold ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                          }`}
                          title="Tebal (Ctrl+B)"
                        >
                          <Bold className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'italic')}
                          className={`p-2 rounded transition-colors ${
                            activeFormats[index]?.italic ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                          }`}
                          title="Miring (Ctrl+I)"
                        >
                          <Italic className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'underline')}
                          className={`p-2 rounded transition-colors ${
                            activeFormats[index]?.underline ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                          }`}
                          title="Garis Bawah (Ctrl+U)"
                        >
                          <Underline className="w-4 h-4" />
                        </button>
                        
                        <div className="w-px bg-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => insertHeading(index, 'h2')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Judul Besar (H2)"
                        >
                          <Heading2 className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHeading(index, 'h3')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Subjudul (H3)"
                        >
                          <Heading3 className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHeading(index, 'p')}
                          className="px-2 py-1 hover:bg-gray-100 rounded transition-colors text-xs font-semibold text-gray-700"
                          title="Paragraf Normal"
                        >
                          P
                        </button>
                        
                        <div className="w-px bg-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => insertList(index, 'ul')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Poin Bulat (Bullet)"
                        >
                          <List className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertList(index, 'ol')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Poin Angka (1, 2, 3)"
                        >
                          <ListOrdered className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertList(index, 'ol-alpha')}
                          className="px-2 py-1 hover:bg-gray-100 rounded transition-colors text-xs font-bold text-gray-700"
                          title="Poin Huruf Kecil (a, b, c)"
                        >
                          abc
                        </button>
                        <button
                          type="button"
                          onClick={() => insertList(index, 'ol-alpha-upper')}
                          className="px-2 py-1 hover:bg-gray-100 rounded transition-colors text-xs font-bold text-gray-700"
                          title="Poin Huruf Besar (A, B, C)"
                        >
                          ABC
                        </button>
                        
                        <div className="w-px bg-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'justifyLeft')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Rata Kiri"
                        >
                          <AlignLeft className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'justifyCenter')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Rata Tengah"
                        >
                          <AlignCenter className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'justifyRight')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Rata Kanan"
                        >
                          <AlignRight className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat(index, 'justifyFull')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Rata Kanan Kiri (Justify)"
                        >
                          <AlignJustify className="w-4 h-4 text-gray-700" />
                        </button>
                        
                        <div className="w-px bg-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => insertLink(index)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Tambah Link"
                        >
                          <LinkIcon className="w-4 h-4 text-gray-700" />
                        </button>
                        
                        <div className="w-px bg-gray-300 mx-1"></div>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowColorPicker(prev => ({ ...prev, [index]: !prev[index] }))}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                            title="Warna Teks"
                          >
                            <Palette className="w-4 h-4 text-gray-700" />
                          </button>
                          
                          {showColorPicker[index] && (
                            <div className="absolute top-full left-0 mt-2 p-3 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50">
                              <p className="text-xs font-semibold text-gray-700 mb-2">Pilih Warna Teks:</p>
                              <div className="grid grid-cols-6 gap-2 mb-3">
                                {[
                                  { color: '#000000', label: 'Hitam' },
                                  { color: '#1E3A7D', label: 'Biru' },
                                  { color: '#DC2626', label: 'Merah' },
                                  { color: '#D97706', label: 'Orange' },
                                  { color: '#7C3AED', label: 'Ungu' },
                                  { color: '#4B5563', label: 'Abu' },
                                  { color: '#EC4899', label: 'Pink' },
                                  { color: '#0891B2', label: 'Cyan' },
                                  { color: '#F59E0B', label: 'Kuning' },
                                  { color: '#8B5CF6', label: 'Violet' },
                                ].map(({ color, label }) => (
                                  <button
                                    key={color}
                                    type="button"
                                    onClick={() => applyTextColor(index, color)}
                                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 transition-colors"
                                    style={{ backgroundColor: color }}
                                    title={label}
                                  />
                                ))}
                              </div>
                              <p className="text-xs font-semibold text-gray-700 mb-2">Highlight Background:</p>
                              <div className="grid grid-cols-6 gap-2">
                                {[
                                  { color: '#FEF3C7', label: 'Kuning' },
                                  { color: '#DBEAFE', label: 'Biru' },
                                  { color: '#FEE2E2', label: 'Merah' },
                                  { color: '#FCE7F3', label: 'Pink' },
                                  { color: '#E0E7FF', label: 'Indigo' },
                                ].map(({ color, label }) => (
                                  <button
                                    key={color}
                                    type="button"
                                    onClick={() => applyBackgroundColor(index, color)}
                                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 transition-colors"
                                    style={{ backgroundColor: color }}
                                    title={label}
                                  />
                                ))}
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowColorPicker(prev => ({ ...prev, [index]: false }))}
                                className="w-full mt-3 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-semibold"
                              >
                                Tutup
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => clearFormatting(index)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Hapus Format"
                        >
                          <Eraser className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                      <div
                        ref={(el) => {
                          if (el && !editorRefs.current[index]) {
                            editorRefs.current[index] = el;
                            el.innerHTML = block.content || '<p><br></p>';
                          }
                        }}
                        contentEditable
                        onInput={(e) => handleEditorInput(index, e)}
                        onPaste={(e) => handleEditorPaste(index, e)}
                        onMouseUp={() => updateActiveFormats(index)}
                        onKeyUp={() => updateActiveFormats(index)}
                        className="rich-text-editor w-full min-h-[200px] max-h-[400px] overflow-y-auto px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1E3A7D] focus:outline-none transition-colors bg-white"
                        suppressContentEditableWarning
                      />
                      <p className="text-xs text-gray-500 mt-2">
                         Pilih teks dan gunakan toolbar untuk format langsung - hasilnya sama seperti di website publik
                      </p>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onContentImageUpload(e, index)}
                        className="hidden"
                        id={`image-upload-${index}`}
                      />
                      <label
                        htmlFor={`image-upload-${index}`}
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1E3A7D] hover:bg-gray-100 transition-colors"
                      >
                        {block.content ? (
                          <div className="relative w-full h-full">
                            <img
                              src={block.content}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-contain rounded-lg bg-gray-50"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <span className="text-white font-semibold text-sm">Klik untuk ganti gambar</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center py-6">
                            <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-600 font-semibold">Klik untuk upload gambar</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF hingga 10MB</p>
                          </div>
                        )}
                      </label>
                      {block.content && (
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) => onUpdateContentBlock(index, 'caption', e.target.value)}
                          placeholder="Caption gambar (opsional)"
                          className="w-full mt-3 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[#1E3A7D] focus:outline-none transition-colors text-sm"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}

              {(!formData.contentBlocks || formData.contentBlocks.length === 0) && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm">Belum ada konten. Klik tombol "Teks" atau "Gambar" untuk menambah konten.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onCancel}
            className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-semibold rounded-lg transition-colors text-sm sm:text-base"
          >
            {editingId ? 'Simpan Perubahan' : 'Simpan Konten'}
          </button>
        </div>
      </div>

      <PopupInputLink
        isOpen={showLinkPopup}
        value={linkValue}
        error={linkError}
        onChange={(value) => {
          setLinkValue(value);
          if (linkError) {
            setLinkError('');
          }
        }}
        onCancel={() => {
          setShowLinkPopup(false);
          setLinkTargetIndex(null);
          setLinkValue('');
          setLinkError('');
        }}
        onSubmit={handleSubmitLink}
      />
    </div>
  );
};

export default TambahDanEditKonten;

