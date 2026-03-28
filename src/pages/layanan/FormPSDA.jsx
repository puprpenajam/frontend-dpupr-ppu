import { useState } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';

const dampakOptions = [
  'Rumah terdampak',
  'Jalan rusak',
  'Aktivitas terganggu',
  'Lainnya'
];

const initialForm = {
  namaPelapor: '',
  nomorHp: '',
  alamatKejadian: '',
  jenisPermasalahan: '',
  jenisLainnya: '',
  detailLokasi: '',
  kronologi: '',
  dampak: [],
  dampakLainnya: '',
  buktiFileName: '',
  buktiFileType: '',
  buktiFileData: '',
  titikLokasi: ''
};

const FormPSDA = () => {
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
    if (!file) {
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/webm'
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        buktiFileData: 'File bukti PSDA harus berupa foto atau video (JPG, PNG, WEBP, MP4, MOV, AVI, WEBM).'
      }));
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, buktiFileData: 'Ukuran file maksimal 20MB.' }));
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

    if (!formData.namaPelapor.trim()) nextErrors.namaPelapor = 'Nama Pelapor wajib di isi.';

    if (!formData.nomorHp.trim()) {
      nextErrors.nomorHp = 'Nomor HP wajib di isi.';
    } else if (!/^\d+$/.test(formData.nomorHp.trim())) {
      nextErrors.nomorHp = 'Nomor HP hanya boleh berisi angka.';
    } else if (formData.nomorHp.trim().length < 11 || formData.nomorHp.trim().length > 13) {
      nextErrors.nomorHp = 'Nomor HP harus 11 sampai 13 angka.';
    }

    if (!formData.alamatKejadian.trim()) nextErrors.alamatKejadian = 'Alamat lokasi kejadian wajib di isi.';
    if (!formData.jenisPermasalahan) nextErrors.jenisPermasalahan = 'Jenis permasalahan wajib di isi.';
    if (formData.jenisPermasalahan === 'Lainnya' && !formData.jenisLainnya.trim()) {
      nextErrors.jenisLainnya = 'Mohon isi jenis permasalahan lainnya.';
    }
    if (!formData.detailLokasi.trim()) nextErrors.detailLokasi = 'Detail lokasi wajib di isi.';
    if (!formData.kronologi.trim()) nextErrors.kronologi = 'Kronologi/deskripsi masalah wajib di isi.';

    if (formData.dampak.length === 0) {
      nextErrors.dampak = 'Minimal satu dampak harus dipilih.';
    }
    if (formData.dampak.includes('Lainnya') && !formData.dampakLainnya.trim()) {
      nextErrors.dampakLainnya = 'Mohon isi dampak lainnya.';
    }

    if (!formData.buktiFileData) {
      nextErrors.buktiFileData = 'Upload bukti wajib di isi.';
    }

    if (!formData.titikLokasi.trim()) {
      nextErrors.titikLokasi = 'Titik lokasi wajib di isi.';
    } else {
      try {
        new URL(formData.titikLokasi.trim());
      } catch {
        nextErrors.titikLokasi = 'Titik lokasi harus berupa link Google Maps/pin yang valid.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const key = 'formPsdaReports';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const payload = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...formData
    };

    localStorage.setItem(key, JSON.stringify([payload, ...existing]));
    setFormData(initialForm);
    setShowSuccessPopup(true);
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Form PSDA</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Form pelaporan permasalahan sumber daya air dan drainase untuk percepatan tindak lanjut teknis.
          </p>
        </div>
      </div>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <form noValidate onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">1. Nama Pelapor *</label>
                  <input
                    type="text"
                    name="namaPelapor"
                    value={formData.namaPelapor}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    placeholder="Nama lengkap pelapor"
                  />
                  {errors.namaPelapor && <p className="text-red-600 text-xs mt-1">{errors.namaPelapor}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">2. Nomor HP (WhatsApp aktif) *</label>
                  <input
                    type="tel"
                    name="nomorHp"
                    value={formData.nomorHp}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    placeholder="08xxxxxxxxxx"
                  />
                  {errors.nomorHp && <p className="text-red-600 text-xs mt-1">{errors.nomorHp}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">3. Alamat Lokasi Kejadian *</label>
                <textarea
                  rows={3}
                  name="alamatKejadian"
                  value={formData.alamatKejadian}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  placeholder="Alamat lengkap lokasi kejadian"
                />
                {errors.alamatKejadian && <p className="text-red-600 text-xs mt-1">{errors.alamatKejadian}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">4. Jenis Permasalahan *</label>
                <select
                  name="jenisPermasalahan"
                  value={formData.jenisPermasalahan}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                >
                  <option value="">Pilih jenis permasalahan</option>
                  <option value="Banjir">Banjir</option>
                  <option value="Tidak ada drainase">Tidak ada drainase</option>
                  <option value="Drainase rusak">Drainase rusak</option>
                  <option value="Sungai meluap">Sungai meluap</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {errors.jenisPermasalahan && <p className="text-red-600 text-xs mt-1">{errors.jenisPermasalahan}</p>}
                {formData.jenisPermasalahan === 'Lainnya' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="jenisLainnya"
                      value={formData.jenisLainnya}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      placeholder="Isi jenis permasalahan lainnya"
                    />
                    {errors.jenisLainnya && <p className="text-red-600 text-xs mt-1">{errors.jenisLainnya}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">5. Detail Lokasi *</label>
                <textarea
                  rows={2}
                  name="detailLokasi"
                  value={formData.detailLokasi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  placeholder="Contoh: RT/RW, desa, patokan lokasi"
                />
                {errors.detailLokasi && <p className="text-red-600 text-xs mt-1">{errors.detailLokasi}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">6. Kronologi / Deskripsi Masalah *</label>
                <textarea
                  rows={4}
                  name="kronologi"
                  value={formData.kronologi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  placeholder="Contoh: setiap hujan pasti banjir karena tidak ada selokan"
                />
                {errors.kronologi && <p className="text-red-600 text-xs mt-1">{errors.kronologi}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">7. Dampak yang terjadi *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dampakOptions.map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.dampak.includes(item)}
                        onChange={() => handleDampakChange(item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                {errors.dampak && <p className="text-red-600 text-xs mt-1">{errors.dampak}</p>}
                {formData.dampak.includes('Lainnya') && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="dampakLainnya"
                      value={formData.dampakLainnya}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      placeholder="Isi dampak lainnya"
                    />
                    {errors.dampakLainnya && <p className="text-red-600 text-xs mt-1">{errors.dampakLainnya}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">8. Upload Bukti * (foto/video banjir atau lokasi)</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white"
                />
                {formData.buktiFileName && <p className="text-sm text-gray-600 mt-2">File terpilih: {formData.buktiFileName}</p>}
                {errors.buktiFileData && <p className="text-red-600 text-xs mt-1">{errors.buktiFileData}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">9. Titik Lokasi (Google Maps / pin lokasi) *</label>
                <input
                  type="url"
                  name="titikLokasi"
                  value={formData.titikLokasi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  placeholder="https://maps.google.com/..."
                />
                {errors.titikLokasi && <p className="text-red-600 text-xs mt-1">{errors.titikLokasi}</p>}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#FDB913] hover:bg-[#E5A711] text-[#1E3A7D] font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Kirim Form PSDA
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[70] bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-[#1E3A7D] mb-2">Form PSDA Berhasil Di Isi</h3>
            <p className="text-sm text-gray-700 mb-5">Form Anda sudah tersimpan dan akan di hubungi oleh PSDA lewat WhatsApp.</p>
            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FormPSDA;
