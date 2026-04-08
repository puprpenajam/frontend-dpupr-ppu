import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarDays, Clock3, ExternalLink, Eye, Edit, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import { useAuth } from '../context/AuthContext';
import PopupKonfirmasi from '../components/PopupKonfirmasi';
import PopupBerhasil from '../components/PopupBerhasil';
import BuktiPreviewModal from '../../components/BuktiPreviewModal';
import {
  getPengaduanCategoryByValue,
  getPengaduanCategoryRows,
  updatePengaduanCategoryRow,
  deletePengaduanCategoryRow
} from '../../data/manajemenPengaduanUtils';

const statusOptions = ['proses', 'diterima', 'ditolak'];

const formatDateTimeId = (value) => {
  if (!value) {
    return { tanggal: '-', jam: '-' };
  }

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

const ManajemenPengaduanDaftar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { kategori } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewingId, setViewingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [editErrors, setEditErrors] = useState({});
  const [editForm, setEditForm] = useState({
    status: 'proses',
    adminNote: ''
  });
  const [previewData, setPreviewData] = useState({
    isOpen: false,
    fileData: '',
    fileType: '',
    fileName: ''
  });

  const category = useMemo(() => getPengaduanCategoryByValue(kategori), [kategori]);
  const rows = category ? getPengaduanCategoryRows(category.value) : [];

  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr-ppu');
      return;
    }

    if (!category) {
      navigate('/admin-website-pupr-ppu/manajemen-pengaduan', { replace: true });
    }
  }, [user, category, navigate]);

  if (!user || !category) {
    return null;
  }

  const viewingItem = rows.find((item) => item.id === viewingId) || null;
  const editingItem = rows.find((item) => item.id === editingId) || null;

  const getStatusClass = (status) => {
    if (status === 'diterima') return 'bg-blue-100 text-blue-700';
    if (status === 'ditolak') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setEditErrors({});
    setEditForm({
      status: row.status || 'proses',
      adminNote: row.adminNote || ''
    });
  };

  const handleSave = () => {
    if (!editingItem) {
      return;
    }

    const nextErrors = {};
    if (!editForm.status) {
      nextErrors.status = 'Status pengaduan wajib di isi.';
    }
    if (!editForm.adminNote.trim()) {
      nextErrors.adminNote = 'Keterangan admin wajib di isi.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setEditErrors(nextErrors);
      return;
    }

    updatePengaduanCategoryRow(
      category.value,
      editingItem.id,
      {
        status: editForm.status,
        adminNote: editForm.adminNote.trim(),
        historyAction: `Status diperbarui menjadi ${editForm.status}`
      },
      user?.name || 'Admin'
    );

    setEditingId(null);
    setShowUpdateSuccess(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) {
      return;
    }

    deletePengaduanCategoryRow(category.value, deleteTarget.id);
    setDeleteTarget(null);
    setShowDeleteSuccess(true);
  };

  const getCellContent = (row, column) => {
    if (column.type === 'datetime') {
      const waktu = formatDateTimeId(row.createdAt);
      return (
        <div className="text-sm font-semibold text-[#1E3A7D] break-words">
          <p className="flex items-center gap-1">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{waktu.tanggal}</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5 font-normal flex items-center gap-1">
            <Clock3 className="w-3.5 h-3.5" />
            <span>{waktu.jam}</span>
          </p>
        </div>
      );
    }

    if (column.type === 'file') {
      const fileData = row[column.fileDataKey] || '';
      const fileType = row[column.fileTypeKey] || '';
      const fileName = row[column.fileNameKey] || 'Lampiran';

      if (!fileData) {
        return <span>-</span>;
      }

      return (
        <button
          onClick={() =>
            setPreviewData({
              isOpen: true,
              fileData,
              fileType,
              fileName
            })
          }
          className="text-blue-700 underline"
        >
          Lihat File
        </button>
      );
    }

    const value = typeof column.accessor === 'function' ? column.accessor(row) : row[column.key];

    if (column.type === 'link' && value) {
      return (
        <a href={value} target="_blank" rel="noreferrer" className="text-blue-700 underline inline-flex items-center gap-1">
          Buka Link
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      );
    }

    return <span>{value || '-'}</span>;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

      <div className="flex-1 min-w-0">
        <AdminHeader
          title={category.label}
          subtitle="Menampilkan data input user sesuai kategori pengaduan"
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 space-y-5">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{category.shortLabel}</h2>
              <p className="text-sm text-gray-600 mt-1">Total data kategori ini: {rows.length}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin-website-pupr-ppu/manajemen-pengaduan')}
              className="inline-flex items-center justify-center w-full sm:w-auto bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Kembali ke Menu Pengaduan
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-x-auto">
            <table className="w-full min-w-[980px] table-fixed">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {category.columns.map((column) => (
                    <th key={column.key} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                      {column.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={category.columns.length + 2} className="px-4 py-10 text-center text-gray-500">
                      {category.emptyMessage}
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.id || `${row.createdAt}-${row.nomorHp || ''}`} className="hover:bg-gray-50">
                      {category.columns.map((column) => (
                        <td key={`${column.key}-${row.id || row.createdAt}`} className="px-4 py-3 text-sm text-gray-700 align-top">
                          {getCellContent(row, column)}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm align-top">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(row.status)}`}>
                          {row.status}
                        </span>
                        {row.adminNote && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{row.adminNote}</p>}
                      </td>
                      <td className="px-4 py-3 text-center align-top">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setViewingId(row.id)}
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            title="Lihat"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => startEdit(row)}
                            className="p-2 bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(row)}
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
      </div>

      {viewingItem && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-[#1E3A7D]">Detail Pengaduan</h3>
              <button
                onClick={() => setViewingId(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold"
              >
                Tutup
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm text-gray-700">
              <p><strong>Kategori:</strong> {category.shortLabel}</p>
              <p><strong>Status:</strong> {viewingItem.status}</p>
              <p><strong>Keterangan Admin:</strong> {viewingItem.adminNote || '-'}</p>
              {category.columns
                .filter((column) => column.type !== 'file')
                .map((column) => {
                  const rawValue = typeof column.accessor === 'function' ? column.accessor(viewingItem) : viewingItem[column.key];

                  if (column.type === 'datetime') {
                    const waktu = formatDateTimeId(viewingItem.createdAt);
                    return (
                      <p key={column.key}>
                        <strong>{column.label}:</strong> {waktu.tanggal}, {waktu.jam}
                      </p>
                    );
                  }

                  if (column.type === 'link') {
                    return (
                      <p key={column.key}>
                        <strong>{column.label}:</strong>{' '}
                        {rawValue ? (
                          <a href={rawValue} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                            {rawValue}
                          </a>
                        ) : (
                          '-'
                        )}
                      </p>
                    );
                  }

                  return (
                    <p key={column.key}>
                      <strong>{column.label}:</strong> {rawValue || '-'}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full max-w-2xl max-h-[95vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#1E3A7D]">Update Pengaduan</h3>
              <p className="text-sm text-gray-600 mt-1">Ubah status dan keterangan tindak lanjut untuk pengaduan ini.</p>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status Pengaduan *</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Keterangan Admin *</label>
                <textarea
                  rows={4}
                  value={editForm.adminNote}
                  onChange={(event) => {
                    setEditForm((prev) => ({ ...prev, adminNote: event.target.value }));
                    setEditErrors((prev) => ({ ...prev, adminNote: '' }));
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
                  placeholder="Contoh: Pengaduan sedang diverifikasi oleh tim terkait."
                />
                {editErrors.adminNote && <p className="text-red-600 text-xs mt-1">{editErrors.adminNote}</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
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
        message={deleteTarget ? 'Data pengaduan akan dihapus permanen. Lanjutkan?' : ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isDangerous
      />

      <PopupBerhasil
        isOpen={showDeleteSuccess}
        message="Data pengaduan berhasil dihapus."
        onClose={() => setShowDeleteSuccess(false)}
      />

      <PopupBerhasil
        isOpen={showUpdateSuccess}
        message="Status pengaduan berhasil diperbarui."
        onClose={() => setShowUpdateSuccess(false)}
      />

      <BuktiPreviewModal
        isOpen={previewData.isOpen}
        onClose={() => setPreviewData((prev) => ({ ...prev, isOpen: false }))}
        fileData={previewData.fileData}
        fileType={previewData.fileType}
        fileName={previewData.fileName}
        title="Preview Lampiran"
      />
    </div>
  );
};

export default ManajemenPengaduanDaftar;
