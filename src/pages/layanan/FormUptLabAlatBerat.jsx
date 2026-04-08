import { useState } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';
import { generateTicketCode, saveFormDataWithTicket } from '../../data/ticketCodeUtils';

const initialForm = {
  namaPemohon: '',
  instansiPerusahaan: '',
  nomorHp: '',
  alamat: '',
  jenisLayanan: '',
  jenisLayananLainnya: '',
  rincianPermohonan: '',
  dokumenFileName: '',
  dokumenFileType: '',
  dokumenFileData: ''
};

const isWhatsAppNumber = (value = '') => {
  const digits = value.replace(/\D/g, '');
  return /^(08|62)\d{9,11}$/.test(digits);
};

const FormUptLabAlatBerat = () => {
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

    if (!formData.namaPemohon.trim()) nextErrors.namaPemohon = 'Nama pemohon wajib di isi.';
    if (!formData.instansiPerusahaan.trim()) nextErrors.instansiPerusahaan = 'Instansi/Perusahaan wajib di isi.';

    if (!formData.nomorHp.trim()) {
      nextErrors.nomorHp = 'Nomor HP wajib di isi.';
    } else if (!/^\d+$/.test(formData.nomorHp.trim())) {
      nextErrors.nomorHp = 'Nomor HP hanya boleh berisi angka.';
    } else if (formData.nomorHp.trim().length < 11 || formData.nomorHp.trim().length > 13) {
      nextErrors.nomorHp = 'Nomor HP harus 11 sampai 13 angka.';
    } else if (!isWhatsAppNumber(formData.nomorHp.trim())) {
      nextErrors.nomorHp = 'Nomor WhatsApp aktif tidak valid. Gunakan awalan 08 atau 62.';
    }

    if (!formData.alamat.trim()) nextErrors.alamat = 'Alamat wajib di isi.';
    if (!formData.jenisLayanan) nextErrors.jenisLayanan = 'Jenis layanan wajib di isi.';
    if (formData.jenisLayanan === 'Lainnya' && !formData.jenisLayananLainnya.trim()) nextErrors.jenisLayananLainnya = 'Isi jenis layanan lainnya.';
    if (!formData.rincianPermohonan.trim()) nextErrors.rincianPermohonan = 'Rincian permohonan wajib di isi.';
    if (!formData.dokumenFileData) nextErrors.dokumenFileData = 'Upload dokumen wajib di isi.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const key = 'formUptLabAlatBeratReports';
    const code = generateTicketCode(key, 'LAB');
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Form UPT Lab & Alat Berat</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">Form layanan UPT laboratorium dan alat berat untuk kebutuhan teknis bidang konstruksi.</p>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">2. INSTANSI / PERUSAHAAN *</label>
                <input type="text" name="instansiPerusahaan" value={formData.instansiPerusahaan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.instansiPerusahaan && <p className="text-red-600 text-xs mt-1">{errors.instansiPerusahaan}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">3. NOMOR HP / WHATSAPP AKTIF *</label>
                <input type="tel" name="nomorHp" value={formData.nomorHp} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.nomorHp && <p className="text-red-600 text-xs mt-1">{errors.nomorHp}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">4. ALAMAT PEMOHON / LOKASI KEGIATAN *</label>
                <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.alamat && <p className="text-red-600 text-xs mt-1">{errors.alamat}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">5. JENIS LAYANAN UPT *</label>
                <select name="jenisLayanan" value={formData.jenisLayanan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                  <option value="">Pilih jenis layanan UPT</option>
                  <option value="Uji material konstruksi">Uji material konstruksi</option>
                  <option value="Peminjaman alat berat">Peminjaman alat berat</option>
                  <option value="Permintaan tenaga teknis UPT">Permintaan tenaga teknis UPT</option>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">6. RINCIAN PERMOHONAN / KEBUTUHAN *</label>
                <textarea rows={4} name="rincianPermohonan" value={formData.rincianPermohonan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.rincianPermohonan && <p className="text-red-600 text-xs mt-1">{errors.rincianPermohonan}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">7. UPLOAD DOKUMEN PENDUKUNG *</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white" />
                {formData.dokumenFileName && <p className="text-sm text-gray-600 mt-2">File terpilih: {formData.dokumenFileName}</p>}
                {errors.dokumenFileData && <p className="text-red-600 text-xs mt-1">{errors.dokumenFileData}</p>}
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-bold px-8 py-3 rounded-lg transition-colors">
                KIRIM FORM UPT LAB & ALAT BERAT
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

export default FormUptLabAlatBerat;
