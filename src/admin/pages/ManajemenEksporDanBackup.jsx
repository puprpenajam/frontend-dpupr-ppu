import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import PopupKonfirmasi from '../components/PopupKonfirmasi';
import PopupBerhasil from '../components/PopupBerhasil';
import { Download, Upload, Trash2, Copy, Save } from 'lucide-react';

const ManajemenEksporDanBackup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define important data keys to backup
  const importantDataKeys = [
    { key: 'newsData', label: 'Data Berita' },
    { key: 'kontenPages', label: 'Halaman Konten' },
    { key: 'visitorStats', label: 'Statistik Pengunjung' },
    { key: 'formBagianUmumSunramKeuanganReports', label: 'Laporan Pengaduan Umum' },
  ];

  // Get all pengaduan category keys
  const getPengaduanKeys = () => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('pengaduan_')) {
        keys.push({
          key,
          label: `Data Pengaduan - ${key.replace('pengaduan_', '')}`,
        });
      }
    }
    return keys;
  };

  const allDataKeys = [...importantDataKeys, ...getPengaduanKeys()];

  // Initialize storage data
  const [storageData, setStorageData] = useState(() => {
    const data = {};
    allDataKeys.forEach(({ key }) => {
      const value = localStorage.getItem(key);
      if (value) {
        data[key] = value;
      }
    });
    return data;
  });

  const [selectedItems, setSelectedItems] = useState(() => {
    const selected = {};
    allDataKeys.forEach(({ key }) => {
      selected[key] = true;
    });
    return selected;
  });

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showBackupSuccess, setShowBackupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [backupFile, setBackupFile] = useState(null);
  const [restoreProgress, setRestoreProgress] = useState('');
  const [selectedBackup, setSelectedBackup] = useState('all');

  // Check user authentication
  useEffect(() => {
    if (!user) {
      navigate('/admin-website-pupr-ppu');
    }
  }, [user, navigate]);

  // Handle checkbox selection
  const handleSelectItem = (key) => {
    setSelectedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectAll = (checked) => {
    const updated = {};
    allDataKeys.forEach(({ key }) => {
      updated[key] = checked;
    });
    setSelectedItems(updated);
  };

  // Export selected data
  const handleExport = () => {
    const selectedData = {};
    Object.entries(selectedItems).forEach(([key, selected]) => {
      if (selected && storageData[key]) {
        selectedData[key] = JSON.parse(storageData[key]);
      }
    });

    const backupData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      data: selectedData,
    };

    const json = JSON.stringify(backupData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-dpupr-ppu-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccessMessage(`Ekspor ${Object.values(selectedItems).filter(Boolean).length} item berhasil!`);
    setShowBackupSuccess(true);
  };

  // Copy to clipboard
  const handleCopyToClipboard = () => {
    const selectedData = {};
    Object.entries(selectedItems).forEach(([key, selected]) => {
      if (selected && storageData[key]) {
        selectedData[key] = JSON.parse(storageData[key]);
      }
    });

    const backupData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      data: selectedData,
    };

    const json = JSON.stringify(backupData, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      setSuccessMessage('Data backup telah disalin ke clipboard!');
      setShowBackupSuccess(true);
    });
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        const backupData = JSON.parse(content);

        if (!backupData.version || !backupData.data) {
          alert('Format backup tidak valid!');
          return;
        }

        setBackupFile(backupData);
        setRestoreProgress('');
      } catch (error) {
        alert('Gagal membaca file backup: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  // Restore backup data
  const handleRestore = () => {
    if (!backupFile) return;

    try {
      const keysToRestore = Object.entries(backupFile.data)
        .filter(([key]) => {
          if (selectedBackup === 'all') return true;
          return key === selectedBackup;
        });

      keysToRestore.forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });

      setRestoreProgress(`${keysToRestore.length} item berhasil di-restore`);
      setBackupFile(null);
      
      // Reload storage data
      const data = {};
      allDataKeys.forEach(({ key }) => {
        const value = localStorage.getItem(key);
        if (value) {
          data[key] = value;
        }
      });
      setStorageData(data);

      setTimeout(() => {
        setSuccessMessage(`Restore ${keysToRestore.length} item berhasil!`);
        setShowBackupSuccess(true);
        setRestoreProgress('');
      }, 500);
    } catch (error) {
      alert('Gagal restore backup: ' + error.message);
    }
  };

  // Clear all data
  const handleClearAll = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    Object.entries(selectedItems).forEach(([key, selected]) => {
      if (selected) {
        localStorage.removeItem(key);
      }
    });

    // Reload storage data
    const data = {};
    allDataKeys.forEach(({ key }) => {
      const value = localStorage.getItem(key);
      if (value) {
        data[key] = value;
      }
    });
    setStorageData(data);
    setShowConfirmDelete(false);

    setSuccessMessage(`${Object.values(selectedItems).filter(Boolean).length} item berhasil dihapus!`);
    setShowBackupSuccess(true);
  };

  const isAnySelected = Object.values(selectedItems).some(Boolean);
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex-1 min-w-0">
        <AdminHeader
          title="Manajemen Ekspor & Backup"
          subtitle="Kelola backup dan ekspor data website DPUPR PPU"
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Data Selection */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Pilih Data untuk Backup</h3>

                <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectedCount === allDataKeys.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="selectAll" className="font-semibold text-gray-700 cursor-pointer flex-1">
                    Pilih Semua ({selectedCount}/{allDataKeys.length})
                  </label>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                  {allDataKeys.map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={key}
                        checked={selectedItems[key] || false}
                        onChange={() => handleSelectItem(key)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor={key} className="cursor-pointer flex-1 text-sm text-gray-700">
                        {label}
                      </label>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {storageData[key] ? `${(storageData[key].length / 1024).toFixed(1)} KB` : '0 KB'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleExport}
                  disabled={!isAnySelected}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Backup
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  disabled={!isAnySelected}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  <Copy className="w-5 h-5" />
                  Salin ke Clipboard
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={!isAnySelected}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Hapus Data
                </button>
              </div>
            </div>

            {/* Restore Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Restore Backup</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File Backup
                  </label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {backupFile && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>File dipilih:</strong> {Object.keys(backupFile.data).length} item
                    </p>
                    <p className="text-xs text-gray-600 mb-3">
                      Tanggal backup: {new Date(backupFile.timestamp).toLocaleString('id-ID')}
                    </p>

                    <div className="mb-3">
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Pilih Item untuk Restore
                      </label>
                      <select
                        value={selectedBackup}
                        onChange={(e) => setSelectedBackup(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">Restore Semua ({Object.keys(backupFile.data).length})</option>
                        {Object.keys(backupFile.data).map((key) => {
                          const label = allDataKeys.find((d) => d.key === key)?.label || key;
                          return (
                            <option key={key} value={key}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <button
                      onClick={handleRestore}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <Upload className="w-4 h-4" />
                      Restore Data
                    </button>
                  </div>
                )}

                {restoreProgress && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">{restoreProgress}</p>
                  </div>
                )}

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-600">
                  <p className="font-semibold mb-1">💡 Tips:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Download backup untuk menyimpan file</li>
                    <li>Gunakan file .json untuk restore data</li>
                    <li>Hati-hati saat menghapus data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <PopupKonfirmasi
        isOpen={showConfirmDelete}
        title="Hapus Data?"
        message={`Anda akan menghapus ${selectedCount} item data. Tindakan ini tidak dapat dibatalkan!`}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmDelete(false)}
        isDangerous={true}
      />

      {/* Success Modal */}
      <PopupBerhasil
        isOpen={showBackupSuccess}
        message={successMessage}
        onClose={() => setShowBackupSuccess(false)}
      />
    </div>
  );
};

export default ManajemenEksporDanBackup;
