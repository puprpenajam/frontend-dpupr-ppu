import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, CalendarDays, Clock3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import PopupKonfirmasi from '../components/PopupKonfirmasi';
import PopupBerhasil from '../components/PopupBerhasil';
import BuktiPreviewModal from '../../components/BuktiPreviewModal';
import {
  getSekretariatCategory,
  getLayananRequests,
  updateLayananRequest,
  deleteLayananRequest
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

const ManajemenLayananPublik = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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

  const sekretariatCategory = getSekretariatCategory();

  const [editForm, setEditForm] = useState({
    status: 'proses',
    adminNote: ''
  });

  const loadData = () => {
    const allRequests = getLayananRequests();
    const formLayananPublikRequests = allRequests.filter((item) => item.assignedCategory === 'sekretariat-umum');
    setRequests(formLayananPublikRequests);
  };

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr-ppu');
      return;
    }
    loadData();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const selectedRequest = requests.find((item) => item.id === editingId) || null;
  const viewingRequest = requests.find((item) => item.id === viewingId) || null;

  const openPreview = (item) => {
    setPreviewData({
      isOpen: true,
      fileData: item.buktiFileData || '',
      fileType: item.buktiFileType || '',
      fileName: item.buktiFileName || 'Bukti Upload'
    });
  };

  const startEdit = (request) => {
    setEditingId(request.id);
    setEditErrors({});
    setEditForm({
      status: request.status,
      adminNote: request.adminNote || ''
    });
  };

  const handleDelete = (id) => {
    const target = requests.find((item) => item.id === id) || null;
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

  const handleSave = () => {
    if (!editingId) {
      return;
    }

    const nextErrors = {};
    if (!editForm.status) {
      nextErrors.status = 'Status permohonan wajib di isi.';
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
        status: editForm.status,
        adminNote: editForm.adminNote.trim(),
        historyAction: `Status diperbarui menjadi ${editForm.status}`
      },
      user?.name || 'Admin'
    );

    setEditingId(null);
    setEditErrors({});
    loadData();
  };

  const getStatusClass = (status) => {
    if (status === 'diterima') return 'bg-blue-100 text-blue-700';
    if (status === 'ditolak') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

      <div className="flex-1 min-w-0">
        <AdminHeader
          title="Manajemen Layanan Publik"
          subtitle="Kelola permohonan form layanan publik, ubah status, dan keterangan masyarakat"
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 space-y-5">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Daftar Permohonan Layanan Publik</h2>
              <p className="text-sm text-gray-600 mt-1">Total data: {requests.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-x-auto lg:overflow-x-visible">
            <table className="w-full min-w-[1200px] lg:min-w-0">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">TANGGAL</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">NAMA</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">NO TELP</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">ALAMAT</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">KEPERLUAN</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">INSTANSI</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">BUKTI</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">STATUS</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-600">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                      Belum ada data permohonan layanan publik.
                    </td>
                  </tr>
                ) : (
                  requests.map((item) => {
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
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {item.whatsappLink ? (
                            <a href={item.whatsappLink} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                              {item.nomorHp}
                            </a>
                          ) : (
                            item.nomorHp
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700"><p className="line-clamp-2">{item.alamat}</p></td>
                        <td className="px-4 py-3 text-sm text-gray-700"><p className="line-clamp-2">{item.keperluan}</p></td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.instansi}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {item.buktiFileData ? (
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
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
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
                    );
                  })
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
              <p><strong>No Telp:</strong> {viewingRequest.nomorHp}</p>
              <p><strong>Alamat:</strong> {viewingRequest.alamat}</p>
              <p><strong>Instansi:</strong> {viewingRequest.instansi}</p>
              <p><strong>Keperluan:</strong> {viewingRequest.keperluan}</p>
              <p><strong>Deskripsi Tambahan:</strong> {viewingRequest.deskripsiTambahan || '-'}</p>
              <p><strong>Status:</strong> {viewingRequest.status}</p>
              <p><strong>Keterangan Admin:</strong> {viewingRequest.adminNote || '-'}</p>
              <p>
                <strong>Bukti:</strong>{' '}
                {viewingRequest.buktiFileData ? (
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
              <h3 className="text-xl font-bold text-[#1E3A7D]">Update Status: {selectedRequest.nama}</h3>
              <p className="text-sm text-gray-600 mt-1">Ubah status permohonan dan berikan keterangan untuk masyarakat.</p>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A7D]"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {editErrors.status && <p className="text-xs text-red-500 mt-1">{editErrors.status}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Keterangan untuk Masyarakat</label>
                <textarea
                  value={editForm.adminNote}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, adminNote: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A7D] resize-none"
                  rows={4}
                  placeholder="Masukkan keterangan atau pesan untuk masyarakat..."
                />
                {editErrors.adminNote && <p className="text-xs text-red-500 mt-1">{editErrors.adminNote}</p>}
              </div>

              <div className="flex gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <PopupKonfirmasi
          title="Hapus Permohonan"
          message={`Apakah Anda yakin menghapus permohonan dari ${deleteTarget.nama}? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {showDeleteSuccess && (
        <PopupBerhasil
          message="Permohonan berhasil dihapus."
          onClose={() => setShowDeleteSuccess(false)}
        />
      )}
    </div>
  );
};

export default ManajemenLayananPublik;
