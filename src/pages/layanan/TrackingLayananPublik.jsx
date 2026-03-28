import { useMemo, useState } from 'react';
import { CalendarDays, Clock3 } from 'lucide-react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';
import { getLayananRequests } from '../../data/layananPublikUtils';
import BuktiPreviewModal from '../../components/BuktiPreviewModal';

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

const TrackingLayananPublik = () => {
  const requests = useMemo(() => getLayananRequests(), []);
  const [previewData, setPreviewData] = useState({
    isOpen: false,
    fileData: '',
    fileType: '',
    fileName: ''
  });

  const openPreview = (item) => {
    setPreviewData({
      isOpen: true,
      fileData: item.buktiFileData || item.suratFileData || '',
      fileType: item.buktiFileType || item.suratFileType || '',
      fileName: item.buktiFileName || item.suratFileName || 'Bukti Upload'
    });
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Tracking Layanan Publik</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Halaman ini menampilkan data pengajuan layanan publik yang telah dikirim masyarakat beserta status dan tindak lanjut dari admin.
          </p>
        </div>
      </div>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
          <FadeIn>
            {requests.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 text-center text-gray-600">
                Belum ada pengajuan layanan publik.
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-x-auto lg:overflow-x-visible">
                <table className="w-full min-w-[900px] lg:min-w-0 table-fixed">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">TANGGAL</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">NAMA</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">INSTANSI</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">WHATSAPP</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">KEPERLUAN</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">STATUS</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">BUKTI</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">KETERANGAN</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">LINK FORM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {requests.map((item) => {
                      const waktu = formatDateTimeId(item.createdAt);
                      return (
                      <tr key={item.id} className="hover:bg-gray-50 align-top">
                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                          <p className="flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" />
                            <span>{waktu.tanggal}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <Clock3 className="w-3.5 h-3.5" />
                            <span>{waktu.jam}</span>
                          </p>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#1E3A7D] whitespace-nowrap">{item.nama}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{item.instansi}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.whatsappLink ? (
                            <a href={item.whatsappLink} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                              {item.nomorHp}
                            </a>
                          ) : (
                            item.nomorHp
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 min-w-[220px]">{item.keperluan}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${statusClassMap[item.status] || statusClassMap.proses}`}>
                            {item.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
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
                        <td className="px-4 py-3 text-sm text-gray-700 min-w-[240px]">
                          {item.status === 'proses' ? '-' : item.adminNote}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 min-w-[180px]">
                          {item.status !== 'proses' && item.assignedFormLink ? (
                            <a href={item.assignedFormLink} target="_blank" rel="noreferrer" className="text-blue-700 underline break-all">
                              {item.assignedFormLink}
                            </a>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <BuktiPreviewModal
        isOpen={previewData.isOpen}
        onClose={() => setPreviewData((prev) => ({ ...prev, isOpen: false }))}
        fileData={previewData.fileData}
        fileType={previewData.fileType}
        fileName={previewData.fileName}
        title="Preview Bukti"
      />

      <Footer />
    </>
  );
};

export default TrackingLayananPublik;
