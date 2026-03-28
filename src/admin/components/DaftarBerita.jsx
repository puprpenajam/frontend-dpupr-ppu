import { Eye, Edit, Trash2, Calendar } from 'lucide-react';

const DaftarBerita = ({ newsData, onPreview, onEdit, onDelete }) => {
  // Helper function to strip HTML tags from text
  const stripHtmlTags = (html = '') => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
  };

  const getFirstMeaningfulTextBlock = (news) => {
    const textBlocks = news.contentBlocks?.filter((block) => block.type === 'text') || [];
    for (const block of textBlocks) {
      const cleanText = stripHtmlTags(block.content || '');
      if (cleanText) {
        return cleanText;
      }
    }
    return '';
  };

  const getNewsDescription = (news) => {
    const excerptText = stripHtmlTags(news.excerpt || '');
    const blockText = getFirstMeaningfulTextBlock(news);
    const legacyText = stripHtmlTags(news.content || '');

    return excerptText || blockText || legacyText;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Thumbnail
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Judul
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Deskripsi
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {newsData.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  Belum ada berita.
                </td>
              </tr>
            ) : (
              newsData.map((news) => (
                <tr key={news.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-24 h-20 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {news.date}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 line-clamp-3 max-w-md text-justify">
                      {getNewsDescription(news) || '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onPreview(news)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(news)}
                        className="p-2 bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(news.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarBerita;

