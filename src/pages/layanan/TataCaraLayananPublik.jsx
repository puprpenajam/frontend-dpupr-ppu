import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';

const steps = [
  'Siapkan data diri, alamat, dan nomor HP aktif yang dapat dihubungi.',
  'Tuliskan keperluan layanan publik secara jelas dan ringkas agar proses verifikasi lebih cepat.',
  'Unggah surat pendukung dalam format PDF atau foto yang terbaca dengan baik.',
  'Lengkapi deskripsi tambahan jika diperlukan untuk membantu admin memahami konteks permohonan.',
  'Kirim formulir untuk diteruskan ke admin layanan publik DPUPR PPU.',
  'Pantau status permohonan melalui menu Tracking Layanan Publik pada daftar pengajuan yang tersedia.',
  'Apabila status diterima dengan catatan pengisian form bidang tertentu, silakan buka tautan form lanjutan yang diberikan.'
];

const guideMenus = [
  { label: 'Tata Cara Isi Form Layanan Publik', to: '/layanan-publik/tata-cara/umum' },
  { label: 'Tata Cara Isi Form PSDA', to: '/layanan-publik/tata-cara/form-psda' },
  { label: 'Tata Cara Isi Form Cipta Karya', to: '/layanan-publik/tata-cara/form-cipta-karya' },
  { label: 'Tata Cara Isi Form Bina Marga', to: '/layanan-publik/tata-cara/form-bina-marga' },
  { label: 'Tata Cara Isi Form Tata Ruang', to: '/layanan-publik/tata-cara/form-tata-ruang' },
  { label: 'Tata Cara Isi Form Bina Konstruksi', to: '/layanan-publik/tata-cara/form-bina-konstruksi' },
  { label: 'Tata Cara Isi Form UPT PU Lab dan Alat Berat', to: '/layanan-publik/tata-cara/form-upt-lab-alat-berat' }
];

const TataCaraLayananPublik = () => {
  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Tata Cara Isi Form Layanan Publik</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Panduan ini disusun untuk membantu masyarakat mengajukan permohonan layanan publik DPUPR PPU secara benar, tertib, dan mudah dipahami.
          </p>
        </div>
      </div>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#1E3A7D] mb-6">Langkah Pengajuan</h2>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-[#FDB913] text-[#1E3A7D] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 mt-8">
              <h2 className="text-2xl font-bold text-[#1E3A7D] mb-6">Menu Tata Cara Per Form</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guideMenus.map((menu) => (
                  <Link
                    key={menu.to}
                    to={menu.to}
                    className="inline-flex items-center justify-center bg-[#1E3A7D] hover:bg-[#152856] text-white px-4 py-3 rounded-lg text-sm font-semibold text-center"
                  >
                    {menu.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TataCaraLayananPublik;
