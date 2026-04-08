import { useState } from 'react';
import { AlertCircle, Check, Search } from 'lucide-react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';

const formTypes = [
  { key: 'formBinaMargaReports', prefix: 'BM', label: 'Bina Marga' },
  { key: 'formPSDAReports', prefix: 'PSDA', label: 'PSDA' },
  { key: 'formCiptaKaryaReports', prefix: 'CK', label: 'Cipta Karya' },
  { key: 'formTataRuangReports', prefix: 'TR', label: 'Tata Ruang' },
  { key: 'formBinaKonstruksiReports', prefix: 'BK', label: 'Bina Konstruksi' },
  { key: 'formUptLabAlatBeratReports', prefix: 'LAB', label: 'UPT Lab & Alat Berat' }
];

const statusClassMap = {
  proses: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  diterima: 'bg-green-100 text-green-800 border-green-200',
  ditolak: 'bg-red-100 text-red-800 border-red-200'
};

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

const TrackingPengaduan = () => {
  const [searchCode, setSearchCode] = useState('');
  const [foundData, setFoundData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedFormType, setSelectedFormType] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setNotFound(false);
    setFoundData(null);

    // Search across all form types
    for (const form of formTypes) {
      if (selectedFormType !== 'all' && selectedFormType !== form.key) continue;

      const data = JSON.parse(localStorage.getItem(form.key) || '[]');
      const found = data.find(
        (item) =>
          item.ticketCode &&
          item.ticketCode.toUpperCase() === searchCode.toUpperCase()
      );

      if (found) {
        setFoundData({
          ...found,
          formType: form.label,
          formPrefix: form.prefix
        });
        return;
      }
    }

    setNotFound(true);
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Tracking Pengaduan</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Lacak status pengaduan Anda menggunakan kode tiket yang diberikan saat form berhasil dikirim.
          </p>
        </div>
      </div>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 mb-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    PILIH JENIS FORM:
                  </label>
                  <select
                    value={selectedFormType}
                    onChange={(e) => setSelectedFormType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option value="all">Semua Jenis Form (Cari Otomatis)</option>
                    {formTypes.map((form) => (
                      <option key={form.key} value={form.key}>
                        {form.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    MASUKKAN KODE TIKET:
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={searchCode}
                      onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                      placeholder="Contoh: BM-001"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Search className="w-5 h-5" />
                      CARI
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Not Found Message */}
            {notFound && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4 mb-8">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-800 mb-1">Kode Tiket Tidak Ditemukan</h3>
                  <p className="text-sm text-red-700">
                    Kode tiket "{searchCode}" tidak ditemukan dalam sistem. Mohon periksa kembali kode tiket Anda atau hubungi admin.
                  </p>
                </div>
              </div>
            )}

            {/* Found Data */}
            {foundData && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                {/* Header with status */}
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 border-b border-gray-200 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">KODE TIKET</p>
                      <h2 className="text-3xl font-bold text-[#1E3A7D] mb-2">
                        {foundData.ticketCode}
                      </h2>
                      <p className="text-gray-700">
                        <span className="font-semibold">Form:</span> {foundData.formType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-2">STATUS</p>
                      <span
                        className={`inline-block px-4 py-2 rounded-full border text-sm font-bold ${
                          statusClassMap[foundData.status] ||
                          statusClassMap.proses
                        }`}
                      >
                        {foundData.status?.toUpperCase() || 'PROSES'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Timeline */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase">RIWAYAT</h3>
                    <div className="space-y-4">
                      {/* Submitted */}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-600 flex items-center justify-center flex-shrink-0">
                            <Check className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="w-0.5 h-16 bg-gray-300 mt-2" />
                        </div>
                        <div className="pt-2">
                          <p className="font-semibold text-gray-800">FORM DIKIRIM</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatDateTimeId(foundData.createdAt).tanggal}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDateTimeId(foundData.createdAt).jam} WIB
                          </p>
                        </div>
                      </div>

                      {/* Processing/Result */}
                      <div className="flex gap-4">
                        <div
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            foundData.status === 'proses'
                              ? 'bg-yellow-100 border-yellow-600'
                              : foundData.status === 'diterima'
                                ? 'bg-green-100 border-green-600'
                                : 'bg-red-100 border-red-600'
                          }`}
                        >
                          {foundData.status === 'proses' ? (
                            <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
                          ) : foundData.status === 'diterima' ? (
                            <Check className="w-6 h-6 text-green-600" />
                          ) : (
                            <span className="text-red-600 font-bold text-lg">✕</span>
                          )}
                        </div>
                        <div className="pt-2">
                          <p className="font-semibold text-gray-800">
                            {foundData.status === 'proses'
                              ? 'SEDANG DIPROSES'
                              : foundData.status === 'diterima'
                                ? 'DITERIMA'
                                : 'DITOLAK'}
                          </p>
                          {foundData.adminNote && (
                            <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded border border-gray-200">
                              {foundData.adminNote}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Details */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase">DATA PENGIRIMAN</h3>
                    <div className="grid gap-4 text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 text-xs uppercase mb-1">NAMA PELAPOR</p>
                          <p className="font-semibold text-gray-800">
                            {foundData.namaPelapor ||
                              foundData.namaPemohon ||
                              'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs uppercase mb-1">
                            NOMOR WHATSAPP
                          </p>
                          <p className="font-semibold text-gray-800">
                            {foundData.nomorHp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!foundData && !notFound && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-blue-900 mb-2">CARI PENGADUAN ANDA</h3>
                <p className="text-blue-700 max-w-lg mx-auto">
                  Masukkan kode tiket yang diberikan saat Anda mengirim form pengaduan. Kode
                  tiket biasanya terlihat seperti BM-001, PSDA-001, dsb.
                </p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TrackingPengaduan;
