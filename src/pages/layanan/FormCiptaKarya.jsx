import { useState } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';

const initialForm = {
  namaPemohon: '',
  nomorHp: '',
  alamat: '',
  jenisPermohonan: '',
  jenisPermohonanLainnya: '',
  detailLokasi: '',
  statusKepemilikanLahan: '',
  statusKepemilikanLahanLainnya: '',
  deskripsiKebutuhan: '',
  dokumenFileName: '',
  dokumenFileType: '',
  dokumenFileData: '',
  luasBangunan: '',
  titikLokasi: ''
};

const isWhatsAppNumber = (value = '') => {
  const digits = value.replace(/\D/g, '');
  return /^(08|62)\d{9,11}$/.test(digits);
};

const isGoogleMapsUrl = (value = '') => {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();
    const path = parsed.pathname.toLowerCase();

    return host.includes('maps.google.') || host === 'maps.app.goo.gl' || (host.includes('google.') && path.startsWith('/maps')) || (host === 'goo.gl' && path.startsWith('/maps'));
  } catch {
    return false;
  }
};

const FormCiptaKarya = () => {
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

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, dokumenFileData: 'Dokumen harus PDF/JPG/PNG/WEBP.' }));
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

    if (!formData.alamat.trim()) nextErrors.alamat = 'Alamat wajib di isi.';
    if (!formData.jenisPermohonan) nextErrors.jenisPermohonan = 'Jenis Permohonan wajib di isi.';
    if (formData.jenisPermohonan === 'Lainnya' && !formData.jenisPermohonanLainnya.trim()) {
      nextErrors.jenisPermohonanLainnya = 'Isi jenis permohonan lainnya.';
    }

    if (!formData.detailLokasi.trim()) nextErrors.detailLokasi = 'Detail lokasi wajib di isi.';
    if (!formData.statusKepemilikanLahan) nextErrors.statusKepemilikanLahan = 'Status kepemilikan lahan wajib di isi.';
    if (formData.statusKepemilikanLahan === 'Lainnya' && !formData.statusKepemilikanLahanLainnya.trim()) {
      nextErrors.statusKepemilikanLahanLainnya = 'Isi status kepemilikan lahan lainnya.';
    }

    if (!formData.deskripsiKebutuhan.trim()) nextErrors.deskripsiKebutuhan = 'Deskripsi kebutuhan wajib di isi.';
    if (!formData.dokumenFileData) nextErrors.dokumenFileData = 'Upload dokumen wajib di isi.';

    if (formData.luasBangunan.trim() && !/^\d+(\.\d+)?$/.test(formData.luasBangunan.trim())) {
      nextErrors.luasBangunan = 'Luas bangunan harus berupa angka (contoh: 120 atau 120.5).';
    }

    if (formData.titikLokasi.trim() && !isGoogleMapsUrl(formData.titikLokasi.trim())) {
      nextErrors.titikLokasi = 'Titik lokasi harus berupa link Google Maps yang valid.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const key = 'formCiptaKaryaReports';
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Form Cipta Karya</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">Form layanan Cipta Karya untuk kebutuhan pembangunan, permukiman, dan sanitasi.</p>
        </div>
      </div>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <form noValidate onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">1. Nama Pemohon / Penanggung Jawab *</label>
                  <input type="text" name="namaPemohon" value={formData.namaPemohon} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                  {errors.namaPemohon && <p className="text-red-600 text-xs mt-1">{errors.namaPemohon}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">2. Nomor HP / WhatsApp Aktif *</label>
                  <input type="tel" name="nomorHp" value={formData.nomorHp} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                  {errors.nomorHp && <p className="text-red-600 text-xs mt-1">{errors.nomorHp}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">3. Alamat Pemohon / Lokasi Permohonan *</label>
                <textarea rows={3} name="alamat" value={formData.alamat} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.alamat && <p className="text-red-600 text-xs mt-1">{errors.alamat}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">4. Jenis Permohonan Cipta Karya *</label>
                <select name="jenisPermohonan" value={formData.jenisPermohonan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                  <option value="">Pilih jenis permohonan Cipta Karya</option>
                  <option value="Pembangunan gedung">Pembangunan gedung</option>
                  <option value="Renovasi bangunan">Renovasi bangunan</option>
                  <option value="Air minum / sanitasi">Air minum / sanitasi</option>
                  <option value="Permukiman">Permukiman</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {errors.jenisPermohonan && <p className="text-red-600 text-xs mt-1">{errors.jenisPermohonan}</p>}
                {formData.jenisPermohonan === 'Lainnya' && (
                  <div className="mt-3">
                    <input type="text" name="jenisPermohonanLainnya" value={formData.jenisPermohonanLainnya} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" placeholder="Isi jenis permohonan lainnya" />
                    {errors.jenisPermohonanLainnya && <p className="text-red-600 text-xs mt-1">{errors.jenisPermohonanLainnya}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">5. Detail Lokasi / Rencana Bangunan *</label>
                <input type="text" name="detailLokasi" value={formData.detailLokasi} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.detailLokasi && <p className="text-red-600 text-xs mt-1">{errors.detailLokasi}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">6. Status Kepemilikan Lahan *</label>
                <select name="statusKepemilikanLahan" value={formData.statusKepemilikanLahan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                  <option value="">Pilih status kepemilikan lahan</option>
                  <option value="Milik sendiri">Milik sendiri</option>
                  <option value="Sewa">Sewa</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {errors.statusKepemilikanLahan && <p className="text-red-600 text-xs mt-1">{errors.statusKepemilikanLahan}</p>}
                {formData.statusKepemilikanLahan === 'Lainnya' && (
                  <div className="mt-3">
                    <input type="text" name="statusKepemilikanLahanLainnya" value={formData.statusKepemilikanLahanLainnya} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" placeholder="Isi status kepemilikan lahan lainnya" />
                    {errors.statusKepemilikanLahanLainnya && <p className="text-red-600 text-xs mt-1">{errors.statusKepemilikanLahanLainnya}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">7. Deskripsi Kebutuhan / Permohonan *</label>
                <textarea rows={4} name="deskripsiKebutuhan" value={formData.deskripsiKebutuhan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.deskripsiKebutuhan && <p className="text-red-600 text-xs mt-1">{errors.deskripsiKebutuhan}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">8. Upload Dokumen Persyaratan *</label>
                <p className="text-xs text-gray-500 mb-2">Surat permohonan, gambar, dan dokumen pendukung lainnya.</p>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white" />
                {formData.dokumenFileName && <p className="text-sm text-gray-600 mt-2">File terpilih: {formData.dokumenFileName}</p>}
                {errors.dokumenFileData && <p className="text-red-600 text-xs mt-1">{errors.dokumenFileData}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">9. Luas Bangunan / Rencana (opsional)</label>
                  <input type="text" name="luasBangunan" value={formData.luasBangunan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" placeholder="Contoh: 120 atau 120.5" />
                  {errors.luasBangunan && <p className="text-red-600 text-xs mt-1">{errors.luasBangunan}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">10. Titik Lokasi Google Maps (opsional)</label>
                  <input type="url" name="titikLokasi" value={formData.titikLokasi} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" placeholder="https://maps.google.com/..." />
                  {errors.titikLokasi && <p className="text-red-600 text-xs mt-1">{errors.titikLokasi}</p>}
                </div>
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-bold px-8 py-3 rounded-lg transition-colors">
                Kirim Form Cipta Karya
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[70] bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-[#1E3A7D] mb-2">Form Cipta Karya Berhasil Di Isi</h3>
            <p className="text-sm text-gray-700 mb-5">Form Anda sudah tersimpan dan akan di hubungi oleh Cipta Karya lewat WhatsApp.</p>
            <button type="button" onClick={() => setShowSuccessPopup(false)} className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2.5 rounded-lg text-sm font-semibold">Tutup</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FormCiptaKarya;
