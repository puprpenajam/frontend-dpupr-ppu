import { useState } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';

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

const FormTataRuang = () => {
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Form Tata Ruang</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">Form pengajuan layanan tata ruang untuk verifikasi dan tindak lanjut teknis.</p>
        </div>
      </div>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <form noValidate onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">1. Nama Pemohon *</label>
                  <input type="text" name="namaPemohon" value={formData.namaPemohon} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                  {errors.namaPemohon && <p className="text-red-600 text-xs mt-1">{errors.namaPemohon}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">2. Nomor HP / WhatsApp *</label>
                  <input type="tel" name="nomorHp" value={formData.nomorHp} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                  {errors.nomorHp && <p className="text-red-600 text-xs mt-1">{errors.nomorHp}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">3. Alamat Pemohon *</label>
                <textarea rows={3} name="alamatPemohon" value={formData.alamatPemohon} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.alamatPemohon && <p className="text-red-600 text-xs mt-1">{errors.alamatPemohon}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">4. Jenis Layanan *</label>
                <select name="jenisLayanan" value={formData.jenisLayanan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                  <option value="">Pilih jenis layanan</option>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">5. Lokasi Objek *</label>
                  <input type="text" name="lokasiObjek" value={formData.lokasiObjek} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                  {errors.lokasiObjek && <p className="text-red-600 text-xs mt-1">{errors.lokasiObjek}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">6. Tujuan Pemanfaatan Ruang *</label>
                  <input type="text" name="tujuanPemanfaatanRuang" value={formData.tujuanPemanfaatanRuang} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                  {errors.tujuanPemanfaatanRuang && <p className="text-red-600 text-xs mt-1">{errors.tujuanPemanfaatanRuang}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">7. Upload Dokumen Pendukung *</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white" />
                {formData.dokumenFileName && <p className="text-sm text-gray-600 mt-2">File terpilih: {formData.dokumenFileName}</p>}
                {errors.dokumenFileData && <p className="text-red-600 text-xs mt-1">{errors.dokumenFileData}</p>}
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-bold px-8 py-3 rounded-lg transition-colors">
                Kirim Form Tata Ruang
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[70] bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-[#1E3A7D] mb-2">Form Tata Ruang Berhasil Di Isi</h3>
            <p className="text-sm text-gray-700 mb-5">Form Anda sudah tersimpan dan akan di hubungi oleh Tata Ruang lewat WhatsApp.</p>
            <button type="button" onClick={() => setShowSuccessPopup(false)} className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2.5 rounded-lg text-sm font-semibold">Tutup</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FormTataRuang;
