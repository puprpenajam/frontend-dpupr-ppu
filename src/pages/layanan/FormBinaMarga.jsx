import { useState } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';

const dampakOptions = [
  'Mengganggu transportasi',
  'Membahayakan pengguna jalan',
  'Lainnya'
];

const initialForm = {
  namaPelapor: '',
  nomorHp: '',
  lokasiJalanJembatan: '',
  jenisPermasalahan: '',
  jenisLainnya: '',
  detailLokasi: '',
  tingkatKerusakan: '',
  kronologi: '',
  dampak: [],
  dampakLainnya: '',
  fotoFileName: '',
  fotoFileType: '',
  fotoFileData: '',
  titikLokasi: ''
};

const FormBinaMarga = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleDampakChange = (value) => {
    setFormData((prev) => {
      const exists = prev.dampak.includes(value);
      const updated = exists ? prev.dampak.filter((item) => item !== value) : [...prev.dampak, value];
      return { ...prev, dampak: updated };
    });
    setErrors((prev) => ({ ...prev, dampak: '' }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, fotoFileData: 'Upload foto harus berupa JPG, PNG, atau WEBP.' }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, fotoFileData: 'Ukuran foto maksimal 10MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        fotoFileName: file.name,
        fotoFileType: file.type,
        fotoFileData: reader.result
      }));
      setErrors((prev) => ({ ...prev, fotoFileData: '' }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.namaPelapor.trim()) nextErrors.namaPelapor = 'Nama Pelapor wajib di isi.';
    if (!formData.nomorHp.trim()) {
      nextErrors.nomorHp = 'Nomor HP wajib di isi.';
    } else if (!/^\d+$/.test(formData.nomorHp.trim())) {
      nextErrors.nomorHp = 'Nomor HP hanya boleh berisi angka.';
    } else if (formData.nomorHp.trim().length < 11 || formData.nomorHp.trim().length > 13) {
      nextErrors.nomorHp = 'Nomor HP harus 11 sampai 13 angka.';
    }

    if (!formData.lokasiJalanJembatan.trim()) nextErrors.lokasiJalanJembatan = 'Lokasi jalan/jembatan wajib di isi.';
    if (!formData.jenisPermasalahan) nextErrors.jenisPermasalahan = 'Jenis permasalahan wajib di isi.';
    if (formData.jenisPermasalahan === 'Lainnya' && !formData.jenisLainnya.trim()) nextErrors.jenisLainnya = 'Isi jenis permasalahan lainnya.';
    if (!formData.detailLokasi.trim()) nextErrors.detailLokasi = 'Detail lokasi wajib di isi.';
    if (!formData.tingkatKerusakan) nextErrors.tingkatKerusakan = 'Tingkat kerusakan wajib di isi.';
    if (!formData.kronologi.trim()) nextErrors.kronologi = 'Kronologi/deskripsi wajib di isi.';
    if (formData.dampak.length === 0) nextErrors.dampak = 'Dampak wajib di isi.';
    if (formData.dampak.includes('Lainnya') && !formData.dampakLainnya.trim()) nextErrors.dampakLainnya = 'Isi dampak lainnya.';
    if (!formData.fotoFileData) nextErrors.fotoFileData = 'Upload foto wajib di isi.';

    if (!formData.titikLokasi.trim()) {
      nextErrors.titikLokasi = 'Titik lokasi wajib di isi.';
    } else {
      try {
        new URL(formData.titikLokasi.trim());
      } catch {
        nextErrors.titikLokasi = 'Link Google Maps tidak valid.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const key = 'formBinaMargaReports';
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Form Bina Marga</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">Form pelaporan masalah jalan/jembatan untuk proses tindak lanjut Bina Marga.</p>
        </div>
      </div>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <form noValidate onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">1. Nama Pelapor *</label>
                  <input type="text" name="namaPelapor" value={formData.namaPelapor} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                  {errors.namaPelapor && <p className="text-red-600 text-xs mt-1">{errors.namaPelapor}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">2. Nomor HP (WhatsApp aktif) *</label>
                  <input type="tel" name="nomorHp" value={formData.nomorHp} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                  {errors.nomorHp && <p className="text-red-600 text-xs mt-1">{errors.nomorHp}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">3. Lokasi Jalan/Jembatan *</label>
                <input type="text" name="lokasiJalanJembatan" value={formData.lokasiJalanJembatan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.lokasiJalanJembatan && <p className="text-red-600 text-xs mt-1">{errors.lokasiJalanJembatan}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">4. Jenis Permasalahan *</label>
                <select name="jenisPermasalahan" value={formData.jenisPermasalahan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                  <option value="">Pilih jenis permasalahan</option>
                  <option value="Jalan rusak">Jalan rusak</option>
                  <option value="Jalan berlubang">Jalan berlubang</option>
                  <option value="Jembatan rusak">Jembatan rusak</option>
                  <option value="Drainase jalan">Drainase jalan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {errors.jenisPermasalahan && <p className="text-red-600 text-xs mt-1">{errors.jenisPermasalahan}</p>}
                {formData.jenisPermasalahan === 'Lainnya' && (
                  <div className="mt-3">
                    <input type="text" name="jenisLainnya" value={formData.jenisLainnya} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" placeholder="Isi jenis permasalahan lainnya" />
                    {errors.jenisLainnya && <p className="text-red-600 text-xs mt-1">{errors.jenisLainnya}</p>}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">5. Detail Lokasi *</label>
                  <textarea rows={3} name="detailLokasi" value={formData.detailLokasi} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" placeholder="nama jalan, RT/RW, desa" />
                  {errors.detailLokasi && <p className="text-red-600 text-xs mt-1">{errors.detailLokasi}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">6. Tingkat Kerusakan *</label>
                  <select name="tingkatKerusakan" value={formData.tingkatKerusakan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                    <option value="">Pilih tingkat kerusakan</option>
                    <option value="Ringan">Ringan</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Parah">Parah</option>
                  </select>
                  {errors.tingkatKerusakan && <p className="text-red-600 text-xs mt-1">{errors.tingkatKerusakan}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">7. Kronologi / Deskripsi *</label>
                <textarea rows={4} name="kronologi" value={formData.kronologi} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
                {errors.kronologi && <p className="text-red-600 text-xs mt-1">{errors.kronologi}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">8. Dampak yang terjadi *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dampakOptions.map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={formData.dampak.includes(item)} onChange={() => handleDampakChange(item)} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                {errors.dampak && <p className="text-red-600 text-xs mt-1">{errors.dampak}</p>}
                {formData.dampak.includes('Lainnya') && (
                  <div className="mt-3">
                    <input type="text" name="dampakLainnya" value={formData.dampakLainnya} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" placeholder="Isi dampak lainnya" />
                    {errors.dampakLainnya && <p className="text-red-600 text-xs mt-1">{errors.dampakLainnya}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">9. Upload Foto *</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white" />
                {formData.fotoFileName && <p className="text-sm text-gray-600 mt-2">File terpilih: {formData.fotoFileName}</p>}
                {errors.fotoFileData && <p className="text-red-600 text-xs mt-1">{errors.fotoFileData}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">10. Titik Lokasi (Google Maps) *</label>
                <input type="url" name="titikLokasi" value={formData.titikLokasi} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5" placeholder="https://maps.google.com/..." />
                {errors.titikLokasi && <p className="text-red-600 text-xs mt-1">{errors.titikLokasi}</p>}
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-bold px-8 py-3 rounded-lg transition-colors">
                Kirim Form Bina Marga
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[70] bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-[#1E3A7D] mb-2">Form Bina Marga Berhasil Di Isi</h3>
            <p className="text-sm text-gray-700 mb-5">Form Anda sudah tersimpan dan akan di hubungi oleh Bina Marga lewat WhatsApp.</p>
            <button type="button" onClick={() => setShowSuccessPopup(false)} className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2.5 rounded-lg text-sm font-semibold">Tutup</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FormBinaMarga;
