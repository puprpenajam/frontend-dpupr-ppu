import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Eye, Edit, Trash2, CalendarDays, Clock3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import PopupKonfirmasi from '../components/PopupKonfirmasi';
import PopupBerhasil from '../components/PopupBerhasil';
import BuktiPreviewModal from '../../components/BuktiPreviewModal';
import {
  getLayananCategoryLinks,
  getLayananCategories,
  getSekretariatCategory,
  getLayananRequests,
  getCategoryLabel,
  updateLayananRequest,
  deleteLayananRequest,
  buildAIRecommendation
} from '../../data/layananPublikUtils';

const statusOptions = ['proses', 'diterima', 'ditolak'];

const formatDateTimeId = (value) => {
  const dateObj = new Date(value);
  const tanggal = dateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const jam = dateObj.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return { tanggal, jam };
};

const ManajemenLayananPublikDaftar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { kategori } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [viewingId, setViewingId] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [previewData, setPreviewData] = useState({
    isOpen: false,
    fileData: '',
    fileType: '',
    fileName: ''
  });

  const categories = useMemo(() => getLayananCategories(), []);
  const sekretariatCategory = useMemo(() => getSekretariatCategory(), []);
  const categoryLinks = useMemo(() => getLayananCategoryLinks(), []);

  const [editForm, setEditForm] = useState({
    status: 'proses',
    assignedCategory: 'sekretariat-umum',
    assignedFormLink: '',
    adminNote: ''
  });

  const menuCategories = useMemo(() => [sekretariatCategory, ...categories], [categories, sekretariatCategory]);

  const selectedCategory = menuCategories.find((item) => item.value === kategori);

  const loadData = () => {
    setRequests(getLayananRequests());
  };

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr-ppu');
      return;
    }

    if (!selectedCategory) {
      navigate('/admin-website-pupr-ppu/manajemen-layanan-publik', { replace: true });
      return;
    }

    loadData();
  }, [user, navigate, selectedCategory]);

  if (!user || !selectedCategory) {
    return null;
  }

  const categoryRequests = requests.filter((item) => item.assignedCategory === kategori);

  const selectedRequest = requests.find((item) => item.id === editingId) || null;
  const viewingRequest = requests.find((item) => item.id === viewingId) || null;

  const openPreview = (item) => {
    setPreviewData({
      isOpen: true,
      fileData: item.buktiFileData || item.suratFileData || '',
      fileType: item.buktiFileType || item.suratFileType || '',
      fileName: item.buktiFileName || item.suratFileName || 'Bukti Upload'
    });
  };

  const startEdit = (request) => {
    setEditingId(request.id);
    setEditErrors({});
    setEditForm({
      status: request.status,
      assignedCategory: request.assignedCategory,
      assignedFormLink: request.assignedFormLink || categoryLinks[request.assignedCategory] || '',
      adminNote: request.adminNote || ''
    });
  };

  const handleDelete = (id) => {
    const target = categoryRequests.find((item) => item.id === id) || null;
    setDeleteTarget(target);
  };

  const confirmDelete = () => {
    if (!deleteTarget) {
      return;
    }

    deleteLayananRequest(deleteTarget.id);
    setDeleteTarget(null);
    setShowDeleteSuccess(true);
    loadData();
  };

  const applyAIRecommendation = () => {
    if (!selectedRequest) {
      return;
    }

    const recommendation = buildAIRecommendation(editForm.assignedCategory, selectedRequest.keperluan);
    setEditForm((prev) => ({
      ...prev,
      assignedCategory: recommendation.category,
      assignedFormLink: recommendation.destinationLink,
      adminNote: recommendation.recommendationText
    }));
  };

  const handleSave = () => {
    if (!editingId) {
      return;
    }

    const nextErrors = {};
    if (!editForm.status) {
      nextErrors.status = 'Status permohonan wajib di isi.';
    }
    if (!editForm.assignedCategory) {
      nextErrors.assignedCategory = 'Kategori form lanjutan wajib di isi.';
    }
    if (editForm.assignedCategory !== sekretariatCategory.value) {
      if (!editForm.assignedFormLink.trim()) {
        nextErrors.assignedFormLink = 'Link form yang diberikan wajib di isi.';
      } else {
        try {
          new URL(editForm.assignedFormLink.trim());
        } catch {
          nextErrors.assignedFormLink = 'Format link tidak valid.';
        }
      }
    }
    if (!editForm.adminNote.trim()) {
      nextErrors.adminNote = 'Keterangan untuk masyarakat wajib di isi.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setEditErrors(nextErrors);
      return;
    }

    updateLayananRequest(
      editingId,
      {
        ...editForm,
        assignedFormLink: editForm.assignedCategory === sekretariatCategory.value ? '' : editForm.assignedFormLink.trim(),
        adminNote: editForm.adminNote.trim(),
        historyAction: `Status diperbarui menjadi ${editForm.status} dan kategori diarahkan ke ${getCategoryLabel(editForm.assignedCategory)}`
      },
      user?.name || 'Admin'
    );

    setEditingId(null);
    setEditErrors({});
    loadData();
  };

  const getStatusClass = (status) => {
    if (status === 'diterima') return 'bg-green-100 text-green-700';
    if (status === 'ditolak') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

      <div className="flex-1 min-w-0">
        <AdminHeader
          title={`Daftar ${selectedCategory.label}`}
          subtitle="Menampilkan inputan user sesuai kategori form layanan publik"
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 space-y-5">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{selectedCategory.label}</h2>
              <p className="text-sm text-gray-600 mt-1">Total data kategori ini: {categoryRequests.length}</p>
            </div>
            <Link
              to="/admin-website-pupr-ppu/manajemen-layanan-publik"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Kembali ke Menu Kategori
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-x-auto lg:overflow-x-visible">
            <table className="w-full min-w-[980px] lg:min-w-0 table-fixed">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">TANGGAL</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">NAMA</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">KEPERLUAN</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">WHATSAPP</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">STATUS</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">BUKTI</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">KETERANGAN</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-600">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categoryRequests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                      Belum ada data permohonan pada kategori ini.
                    </td>
                  </tr>
                ) : (
                  categoryRequests.map((item) => {
                    const waktu = formatDateTimeId(item.createdAt);
                    return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-[#1E3A7D] break-words">
                        <p className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          <span>{waktu.tanggal}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 font-normal flex items-center gap-1">
                          <Clock3 className="w-3.5 h-3.5" />
                          <span>{waktu.jam}</span>
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.nama}</td>
                      <td className="px-4 py-3 text-sm text-gray-700"><p className="line-clamp-2">{item.keperluan}</p></td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.whatsappLink ? (
                          <a href={item.whatsappLink} target="_blank" rel="noreferrer" className="text-blue-700 underline">Chat WhatsApp</a>
                        ) : (
                          item.nomorHp
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {(item.buktiFileData || item.suratFileData) ? (
                          <button
                            onClick={() => openPreview(item)}
                            className="text-blue-700 underline"
                          >
                            Lihat Bukti
                          </button>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700"><p className="line-clamp-2">{item.adminNote}</p></td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setViewingId(item.id)}
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            title="Lihat"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => startEdit(item)}
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
                  )})
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {viewingRequest && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-[#1E3A7D]">Detail Permohonan: {viewingRequest.nama}</h3>
              <button
                onClick={() => setViewingId(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold"
              >
                Tutup
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>{formatDateTimeId(viewingRequest.createdAt).tanggal}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock3 className="w-4 h-4" />
                <span>{formatDateTimeId(viewingRequest.createdAt).jam}</span>
              </p>
              <p><strong>Nama:</strong> {viewingRequest.nama}</p>
              <p><strong>Instansi:</strong> {viewingRequest.instansi}</p>
              <p>
                <strong>WhatsApp:</strong>{' '}
                {viewingRequest.whatsappLink ? (
                  <a href={viewingRequest.whatsappLink} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                    {viewingRequest.nomorHp}
                  </a>
                ) : (
                  viewingRequest.nomorHp
                )}
              </p>
              <p><strong>Kategori:</strong> {getCategoryLabel(viewingRequest.assignedCategory)}</p>
              <p><strong>Status:</strong> {viewingRequest.status}</p>
              <p><strong>Keperluan:</strong> {viewingRequest.keperluan}</p>
              <p><strong>Keterangan:</strong> {viewingRequest.adminNote || '-'}</p>
              <p>
                <strong>Bukti:</strong>{' '}
                {(viewingRequest.buktiFileData || viewingRequest.suratFileData) ? (
                  <button
                    onClick={() => openPreview(viewingRequest)}
                    className="text-blue-700 underline"
                  >
                    Lihat Bukti
                  </button>
                ) : (
                  '-'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      <BuktiPreviewModal
        isOpen={previewData.isOpen}
        onClose={() => setPreviewData((prev) => ({ ...prev, isOpen: false }))}
        fileData={previewData.fileData}
        fileType={previewData.fileType}
        fileName={previewData.fileName}
        title="Preview Bukti"
      />

      {selectedRequest && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#1E3A7D]">Update Permohonan: {selectedRequest.nama}</h3>
              <p className="text-sm text-gray-600 mt-1">Admin dapat memvalidasi hasil AI lalu menyesuaikannya secara manual bila diperlukan.</p>
            </div>

            <div className="p-5 space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p><strong>Keperluan:</strong> {selectedRequest.keperluan}</p>
                <p className="mt-1"><strong>Ringkasan AI:</strong> {selectedRequest.aiSummary}</p>
                <p className="mt-1">
                  <strong>Kontak WhatsApp:</strong>{' '}
                  {selectedRequest.whatsappLink ? (
                    <a href={selectedRequest.whatsappLink} target="_blank" rel="noreferrer" className="underline">
                      {selectedRequest.nomorHp}
                    </a>
                  ) : (
                    selectedRequest.nomorHp
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status Permohonan *</label>
                  <select
                    value={editForm.status}
                    onChange={(event) => {
                      setEditForm((prev) => ({ ...prev, status: event.target.value }));
                      setEditErrors((prev) => ({ ...prev, status: '' }));
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  {editErrors.status && <p className="text-red-600 text-xs mt-1">{editErrors.status}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori Form Lanjutan *</label>
                  <select
                    value={editForm.assignedCategory}
                    onChange={(event) => {
                      setEditForm((prev) => ({
                        ...prev,
                        assignedCategory: event.target.value,
                        assignedFormLink: categoryLinks[event.target.value] ?? prev.assignedFormLink
                      }));
                      setEditErrors((prev) => ({ ...prev, assignedCategory: '' }));
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
                  >
                    {[sekretariatCategory, ...categories].map((category) => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                  {editErrors.assignedCategory && <p className="text-red-600 text-xs mt-1">{editErrors.assignedCategory}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Link Form yang Diberikan {editForm.assignedCategory === sekretariatCategory.value ? '' : '*'}</label>
                <input
                  type="url"
                  disabled={editForm.assignedCategory === sekretariatCategory.value}
                  value={editForm.assignedFormLink}
                  onChange={(event) => {
                    setEditForm((prev) => ({ ...prev, assignedFormLink: event.target.value }));
                    setEditErrors((prev) => ({ ...prev, assignedFormLink: '' }));
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder={editForm.assignedCategory === sekretariatCategory.value ? 'Tidak memerlukan link untuk sekretariat/umum' : 'https://...'}
                />
                {editErrors.assignedFormLink && <p className="text-red-600 text-xs mt-1">{editErrors.assignedFormLink}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Keterangan untuk Masyarakat *</label>
                <textarea
                  rows={4}
                  value={editForm.adminNote}
                  onChange={(event) => {
                    setEditForm((prev) => ({ ...prev, adminNote: event.target.value }));
                    setEditErrors((prev) => ({ ...prev, adminNote: '' }));
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
                  placeholder="Contoh: Akan dihubungi oleh sekretariat melalui WhatsApp"
                />
                {editErrors.adminNote && <p className="text-red-600 text-xs mt-1">{editErrors.adminNote}</p>}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  onClick={applyAIRecommendation}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Gunakan Rekomendasi AI
                </button>
                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditErrors({});
                  }}
                  className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <PopupKonfirmasi
        isOpen={Boolean(deleteTarget)}
        title="Konfirmasi Hapus Data"
        message={deleteTarget ? `Data layanan atas nama ${deleteTarget.nama} akan dihapus permanen. Lanjutkan?` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isDangerous
      />

      <PopupBerhasil
        isOpen={showDeleteSuccess}
        message="Data layanan publik berhasil dihapus."
        onClose={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
};

export default ManajemenLayananPublikDaftar;
