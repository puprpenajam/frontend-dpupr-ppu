import { Eye, EyeOff, Edit, Trash2, Search as SearchIcon } from 'lucide-react';

const DaftarKonten = ({ konten, onEdit, onDelete, onTogglePublish, onPreview }) => {
  const getCategoryBadge = (category) => {
    const badges = {
      kegiatan: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Kegiatan' },
      ppid: { bg: 'bg-green-100', text: 'text-green-700', label: 'PPID' },
      profil: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Profil' }
    };
    const badge = badges[category] || badges.kegiatan;
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  return (
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
          {konten.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="font-semibold text-gray-800">{item.name}</p>
              </td>
              <td className="px-6 py-4">
                {getCategoryBadge(item.category)}
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
                  onClick={() => onTogglePublish(item.id)}
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
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onPreview(item)}
                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    title="Preview"
                  >
                    <SearchIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
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
  );
};

export default DaftarKonten;
