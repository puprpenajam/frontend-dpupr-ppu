import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';
import {
  createLayananRequest,
  getWhatsAppLink,
  normalizePhoneForWhatsApp
} from '../../data/layananPublikUtils';

const initialForm = {
  nama: '',
  instansi: '',
  alamat: '',
  nomorHp: '',
  keperluan: '',
  deskripsiTambahan: '',
  buktiFileName: '',
  buktiFileType: '',
  buktiFileData: ''
};

const FormLayananPublik = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const whatsappPreviewLink = getWhatsAppLink(formData.nomorHp);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, buktiFileData: 'File bukti harus berupa dokumen (PDF/Word/Excel/PPT) atau foto (JPG/PNG/WEBP).' }));
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, buktiFileData: 'Ukuran file maksimal 8MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        buktiFileName: file.name,
        buktiFileType: file.type,
        buktiFileData: reader.result
      }));
      setErrors((prev) => ({ ...prev, buktiFileData: '' }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.nama.trim()) nextErrors.nama = 'Nama wajib di isi.';
    if (!formData.alamat.trim()) nextErrors.alamat = 'Alamat wajib di isi.';
    if (!formData.keperluan.trim()) nextErrors.keperluan = 'Keperluan wajib di isi.';

    const whatsappNumber = formData.nomorHp.trim();
    const sanitizedWhatsapp = whatsappNumber.replace(/\D/g, '');
    const normalizedWhatsapp = normalizePhoneForWhatsApp(whatsappNumber);

    if (!whatsappNumber) {
      nextErrors.nomorHp = 'Nomor WhatsApp wajib di isi.';
    } else if (!/^\d+$/.test(whatsappNumber)) {
      nextErrors.nomorHp = 'Nomor WhatsApp hanya boleh berisi angka.';
    } else if (sanitizedWhatsapp.length < 11 || sanitizedWhatsapp.length > 13) {
      nextErrors.nomorHp = 'Nomor WhatsApp harus 11 sampai 13 angka.';
    } else if (!(sanitizedWhatsapp.startsWith('08') || sanitizedWhatsapp.startsWith('62'))) {
      nextErrors.nomorHp = 'Nomor WhatsApp harus diawali 08 atau 62.';
    } else if (!normalizedWhatsapp) {
      nextErrors.nomorHp = 'Format nomor WhatsApp tidak valid.';
    }

    if (!formData.buktiFileData) {
      nextErrors.buktiFileData = 'Upload bukti wajib di isi.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const created = createLayananRequest(formData);
      setResult(created);
      setFormData(initialForm);
      setShowSuccessPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Form Layanan Publik</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Silakan isi formulir berikut secara lengkap. Data Anda akan diverifikasi oleh admin untuk ditindaklanjuti sesuai kebutuhan layanan.
          </p>
        </div>
      </div>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {result && !showSuccessPopup && (
              <div className="mb-8 bg-green-50 border border-green-200 text-green-800 rounded-xl p-5">
                <p className="font-semibold text-lg mb-1">Permohonan berhasil dikirim.</p>
                <p>Data Anda telah diterima dan sedang menunggu verifikasi admin.</p>
                <p className="text-sm mt-2">Silakan lihat perkembangan status pada menu Tracking Layanan Publik.</p>
              </div>
            )}

            <form noValidate onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama *</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A7D]/50"
                    placeholder="Masukkan nama lengkap"
                  />
                  {errors.nama && <p className="text-red-600 text-xs mt-1">{errors.nama}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instansi (Opsional)</label>
                  <input
                    type="text"
                    name="instansi"
                    value={formData.instansi}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A7D]/50"
                    placeholder="Contoh: PT/OPD/Komunitas"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat *</label>
                <textarea
                  rows={3}
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A7D]/50"
                  placeholder="Masukkan alamat lengkap"
                />
                {errors.alamat && <p className="text-red-600 text-xs mt-1">{errors.alamat}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor HP Aktif *</label>
                  <input
                    type="tel"
                    name="nomorHp"
                    value={formData.nomorHp}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A7D]/50"
                    placeholder="Contoh: 0812xxxxxxxx"
                  />
                  {errors.nomorHp && <p className="text-red-600 text-xs mt-1">{errors.nomorHp}</p>}
                  {!errors.nomorHp && whatsappPreviewLink && (
                    <p className="text-xs mt-1 text-blue-700 break-all">
                      Link WhatsApp: <a href={whatsappPreviewLink} target="_blank" rel="noreferrer" className="underline">{whatsappPreviewLink}</a>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Keperluan *</label>
                  <input
                    type="text"
                    name="keperluan"
                    value={formData.keperluan}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A7D]/50"
                    placeholder="Contoh: wawancara dengan kepala dinas"
                  />
                  {errors.keperluan && <p className="text-red-600 text-xs mt-1">{errors.keperluan}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Bukti (Dokumen / Foto) *</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white"
                />
                {formData.buktiFileName && (
                  <p className="text-sm text-gray-600 mt-2">File terpilih: {formData.buktiFileName}</p>
                )}
                {errors.buktiFileData && <p className="text-red-600 text-xs mt-1">{errors.buktiFileData}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Tambahan</label>
                <textarea
                  rows={4}
                  name="deskripsiTambahan"
                  value={formData.deskripsiTambahan}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A7D]/50"
                  placeholder="Tuliskan informasi tambahan bila diperlukan"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#FDB913] hover:bg-[#E5A711] disabled:bg-gray-300 text-[#1E3A7D] font-bold px-8 py-3 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Form Layanan Publik'}
              </button>
            </form>
          </FadeIn>

          {showSuccessPopup && (
            <div className="fixed inset-0 z-[70] bg-black/45 flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-[#1E3A7D] mb-2">Permohonan Berhasil Di Isi</h3>
                <p className="text-sm text-gray-700 mb-5">
                  Form Anda sudah tersimpan. Silahkan cek tracking untuk melihat status terbaru.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSuccessPopup(false);
                      navigate('/layanan-publik/tracking');
                    }}
                    className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
                  >
                    Lihat Tracking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSuccessPopup(false)}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-semibold"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FormLayananPublik;
