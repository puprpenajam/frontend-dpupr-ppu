const PreviewHalaman = ({ isOpen, halaman, onClose }) => {
  if (!isOpen || !halaman) return null;

  const renderContentBlocks = () => {
    if (!halaman.contentBlocks || halaman.contentBlocks.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Belum ada konten</p>
        </div>
      );
    }

    return halaman.contentBlocks.map((block, index) => {
      if (block.type === 'text') {
        return (
          <div
            key={block.id || index}
            className="prose prose-lg max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      } else if (block.type === 'image') {
        return (
          <div key={block.id || index} className="mb-8">
            <img
              src={block.content}
              alt={`Content ${index + 1}`}
              className="w-full h-auto rounded-xl shadow-lg object-cover"
            />
          </div>
        );
      }
      return null;
    });
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'kegiatan':
        return 'Informasi Kegiatan PUPR';
      case 'ppid':
        return 'PPID DPUPR';
      case 'profil':
        return 'Profil DPUPR';
      default:
        return category;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-[#1E3A7D]">Preview Halaman</h2>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="mb-4">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              halaman.category === 'kegiatan' ? 'bg-blue-100 text-blue-700' :
              halaman.category === 'ppid' ? 'bg-green-100 text-green-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {getCategoryLabel(halaman.category)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {halaman.title || halaman.name}
          </h1>

          {/* Description */}
          {halaman.description && (
            <p className="text-lg text-gray-600 mb-6 pb-6 border-b border-gray-200">
              {halaman.description}
            </p>
          )}

          {/* Content Blocks */}
          <div className="prose prose-lg max-w-none">
            {renderContentBlocks()}
          </div>

          {/* Slug Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/{halaman.category}/{halaman.slug}</code>
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Tutup Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewHalaman;
