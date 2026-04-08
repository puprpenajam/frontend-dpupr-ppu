import { useState } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';

const initialForm = {
  namaPelapor: '',
  nomorHp: '',
  unitTujuan: '',
  judulPengaduan: '',
  isiPengaduan: '',
  lampiranFileName: '',
  lampiranFileType: '',
  lampiranFileData: ''
};

const isWhatsAppNumber = (value = '') => {
  const digits = value.replace(/\D/g, '');
  return /^(08|62)\d{9,11}$/.test(digits);
};

const FormBagianUmumSunramKeuangan = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        lampiranFileData: 'Lampiran harus berupa PDF/JPG/PNG/WEBP.'
      }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, lampiranFileData: 'Ukuran lampiran maksimal 10MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        lampiranFileName: file.name,
        lampiranFileType: file.type,
        lampiranFileData: reader.result
      }));
      setErrors((prev) => ({ ...prev, lampiranFileData: '' }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.namaPelapor.trim()) nextErrors.namaPelapor = 'Nama pelapor wajib di isi.';

    if (!formData.nomorHp.trim()) {
      nextErrors.nomorHp = 'Nomor HP wajib di isi.';
    } else if (!/^\d+$/.test(formData.nomorHp.trim())) {
      nextErrors.nomorHp = 'Nomor HP hanya boleh berisi angka.';
    } else if (formData.nomorHp.trim().length < 11 || formData.nomorHp.trim().length > 13) {
      nextErrors.nomorHp = 'Nomor HP harus 11 sampai 13 angka.';
    } else if (!isWhatsAppNumber(formData.nomorHp.trim())) {
      nextErrors.nomorHp = 'Nomor WhatsApp aktif tidak valid. Gunakan awalan 08 atau 62.';
    }

    if (!formData.unitTujuan) nextErrors.unitTujuan = 'Unit tujuan wajib di isi.';
    if (!formData.judulPengaduan.trim()) nextErrors.judulPengaduan = 'Judul pengaduan wajib di isi.';
    if (!formData.isiPengaduan.trim()) nextErrors.isiPengaduan = 'Isi pengaduan wajib di isi.';
    if (!formData.lampiranFileData) nextErrors.lampiranFileData = 'Upload lampiran wajib di isi.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const key = 'formBagianUmumSunramKeuanganReports';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(
      key,
      JSON.stringify([{ id: Date.now(), createdAt: new Date().toISOString(), ...formData }, ...existing])
    );

    setFormData(initialForm);
    setShowSuccessPopup(true);
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Form Bagian Umum, Sunram, dan Keuangan</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Form pengaduan masyarakat untuk layanan administrasi Bagian Umum, Sunram, dan Keuangan.
          </p>
        </div>
      </div>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <form noValidate onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">1. NAMA PELAPOR *</label>
                <input type="text" name="namaPelapor" value={formData.namaPelapor} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.namaPelapor && <p className="text-red-600 text-xs mt-1">{errors.namaPelapor}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">2. NOMOR HP / WHATSAPP AKTIF *</label>
                <input type="tel" name="nomorHp" value={formData.nomorHp} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.nomorHp && <p className="text-red-600 text-xs mt-1">{errors.nomorHp}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">3. UNIT TUJUAN PENGADUAN *</label>
                <select name="unitTujuan" value={formData.unitTujuan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                  <option value="">Pilih unit tujuan</option>
                  <option value="Bagian Umum">Bagian Umum</option>
                  <option value="Sub Bagian Sunram">Sub Bagian Sunram</option>
                  <option value="Sub Bagian Keuangan">Sub Bagian Keuangan</option>
                </select>
                {errors.unitTujuan && <p className="text-red-600 text-xs mt-1">{errors.unitTujuan}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">4. JUDUL PENGADUAN *</label>
                <input type="text" name="judulPengaduan" value={formData.judulPengaduan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.judulPengaduan && <p className="text-red-600 text-xs mt-1">{errors.judulPengaduan}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">5. ISI PENGADUAN *</label>
                <textarea rows={5} name="isiPengaduan" value={formData.isiPengaduan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.isiPengaduan && <p className="text-red-600 text-xs mt-1">{errors.isiPengaduan}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">6. UPLOAD LAMPIRAN PENDUKUNG *</label>
                <p className="text-xs text-gray-500 mb-2">Lampiran dapat berupa surat pengaduan, foto bukti, atau dokumen pendukung lainnya.</p>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white" />
                {formData.lampiranFileName && <p className="text-sm text-gray-600 mt-2">File terpilih: {formData.lampiranFileName}</p>}
                {errors.lampiranFileData && <p className="text-red-600 text-xs mt-1">{errors.lampiranFileData}</p>}
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-bold px-8 py-3 rounded-lg transition-colors">
                Kirim Form Pengaduan
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[70] bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-[#1E3A7D] mb-2">Form Pengaduan Berhasil Di Isi</h3>
            <p className="text-sm text-gray-700 mb-5">Pengaduan Anda sudah tersimpan dan akan ditindaklanjuti oleh admin terkait.</p>
            <button type="button" onClick={() => setShowSuccessPopup(false)} className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2.5 rounded-lg text-sm font-semibold">Tutup</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FormBagianUmumSunramKeuangan;
