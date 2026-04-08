import { useState } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';
import { generateTicketCode, saveFormDataWithTicket } from '../../data/ticketCodeUtils';

const initialForm = {
  namaPemohon: '',
  nomorHp: '',
  alamatPemohon: '',
  jenisLayanan: '',
  jenisLayananLainnya: '',
  lokasiObjek: '',
  tujuanPemanfaatanRuang: '',
  dokumenFileName: '',
  dokumenFileType: '',
  dokumenFileData: ''
};

const isWhatsAppNumber = (value = '') => {
  const digits = value.replace(/\D/g, '');
  return /^(08|62)\d{9,11}$/.test(digits);
};

const FormTataRuang = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [ticketCode, setTicketCode] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, dokumenFileData: 'Dokumen harus PDF/JPG/PNG.' }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, dokumenFileData: 'Ukuran dokumen maksimal 10MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        dokumenFileName: file.name,
        dokumenFileType: file.type,
        dokumenFileData: reader.result
      }));
      setErrors((prev) => ({ ...prev, dokumenFileData: '' }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.namaPemohon.trim()) nextErrors.namaPemohon = 'Nama Pemohon wajib di isi.';
    if (!formData.nomorHp.trim()) {
      nextErrors.nomorHp = 'Nomor HP wajib di isi.';
    } else if (!/^\d+$/.test(formData.nomorHp.trim())) {
      nextErrors.nomorHp = 'Nomor HP hanya boleh berisi angka.';
    } else if (formData.nomorHp.trim().length < 11 || formData.nomorHp.trim().length > 13) {
      nextErrors.nomorHp = 'Nomor HP harus 11 sampai 13 angka.';
    } else if (!isWhatsAppNumber(formData.nomorHp.trim())) {
      nextErrors.nomorHp = 'Nomor WhatsApp aktif tidak valid. Gunakan awalan 08 atau 62.';
    }

    if (!formData.alamatPemohon.trim()) nextErrors.alamatPemohon = 'Alamat pemohon wajib di isi.';
    if (!formData.jenisLayanan) nextErrors.jenisLayanan = 'Jenis layanan wajib di isi.';
    if (formData.jenisLayanan === 'Lainnya' && !formData.jenisLayananLainnya.trim()) nextErrors.jenisLayananLainnya = 'Isi jenis layanan lainnya.';
    if (!formData.lokasiObjek.trim()) nextErrors.lokasiObjek = 'Lokasi objek wajib di isi.';
    if (!formData.tujuanPemanfaatanRuang.trim()) nextErrors.tujuanPemanfaatanRuang = 'Tujuan pemanfaatan ruang wajib di isi.';
    if (!formData.dokumenFileData) nextErrors.dokumenFileData = 'Upload dokumen pendukung wajib di isi.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const key = 'formTataRuangReports';
    const code = generateTicketCode(key, 'TR');
    saveFormDataWithTicket(key, formData, code);

    setTicketCode(code);
    setFormData(initialForm);
    setShowSuccessPopup(true);
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Form Tata Ruang</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">Form pengajuan layanan tata ruang untuk verifikasi dan tindak lanjut teknis.</p>
        </div>
      </div>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <form noValidate onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">1. NAMA PEMOHON / PENANGGUNG JAWAB *</label>
                <input type="text" name="namaPemohon" value={formData.namaPemohon} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.namaPemohon && <p className="text-red-600 text-xs mt-1">{errors.namaPemohon}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">2. NOMOR HP / WHATSAPP AKTIF *</label>
                <input type="tel" name="nomorHp" value={formData.nomorHp} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.nomorHp && <p className="text-red-600 text-xs mt-1">{errors.nomorHp}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">3. ALAMAT PEMOHON / LOKASI USAHA *</label>
                <textarea rows={3} name="alamatPemohon" value={formData.alamatPemohon} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.alamatPemohon && <p className="text-red-600 text-xs mt-1">{errors.alamatPemohon}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">4. JENIS LAYANAN TATA RUANG *</label>
                <select name="jenisLayanan" value={formData.jenisLayanan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                  <option value="">Pilih jenis layanan tata ruang</option>
                  <option value="Permohonan Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR)">Permohonan Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR)</option>
                  <option value="Permintaan Informasi Tata Ruang">Permintaan Informasi Tata Ruang</option>
                  <option value="Pengaduan Pelanggaran Tata Ruang">Pengaduan Pelanggaran Tata Ruang</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {errors.jenisLayanan && <p className="text-red-600 text-xs mt-1">{errors.jenisLayanan}</p>}
                {formData.jenisLayanan === 'Lainnya' && (
                  <div className="mt-3">
                    <input type="text" name="jenisLayananLainnya" value={formData.jenisLayananLainnya} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" placeholder="Isi jenis layanan lainnya" />
                    {errors.jenisLayananLainnya && <p className="text-red-600 text-xs mt-1">{errors.jenisLayananLainnya}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">5. LOKASI OBJEK / RENCANA KEGIATAN *</label>
                <input type="text" name="lokasiObjek" value={formData.lokasiObjek} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.lokasiObjek && <p className="text-red-600 text-xs mt-1">{errors.lokasiObjek}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">6. TUJUAN PEMANFAATAN RUANG *</label>
                <input type="text" name="tujuanPemanfaatanRuang" value={formData.tujuanPemanfaatanRuang} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.tujuanPemanfaatanRuang && <p className="text-red-600 text-xs mt-1">{errors.tujuanPemanfaatanRuang}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">7. UPLOAD DOKUMEN PENDUKUNG TATA RUANG *</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white" />
                {formData.dokumenFileName && <p className="text-sm text-gray-600 mt-2">File terpilih: {formData.dokumenFileName}</p>}
                {errors.dokumenFileData && <p className="text-red-600 text-xs mt-1">{errors.dokumenFileData}</p>}
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-bold px-8 py-3 rounded-lg transition-colors">
                KIRIM FORM TATA RUANG
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[70] bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-[#1E3A7D] mb-4">✓ FORM BERHASIL DIKIRIM</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-600 uppercase mb-1">Kode Tiket Pengaduan Anda:</p>
              <p className="text-2xl font-bold text-blue-600">{ticketCode}</p>
              <p className="text-xs text-gray-600 mt-2">Simpan kode ini untuk melacak status pengaduan Anda</p>
            </div>
            <button type="button" onClick={() => setShowSuccessPopup(false)} className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2.5 rounded-lg text-sm font-semibold">TUTUP</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FormTataRuang;
