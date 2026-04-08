import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FadeIn from '../../components/FadeIn';

const guideMap = {
  umum: {
    title: 'Tata Cara Isi Form Layanan Publik',
    points: [
      'Isi nama, alamat, nomor HP aktif, dan keperluan secara jelas.',
      'Upload bukti pendukung sesuai kebutuhan layanan.',
      'Setelah submit, cek status pada halaman Tracking Layanan Publik.',
      'Jika diarahkan ke form bidang teknis, lanjutkan isi form bidang yang sesuai.'
    ],
    formLink: '/layanan-publik/form'
  },
  'form-bagian-umum-sunram-keuangan': {
    title: 'Tata Cara Isi Form Bagian Umum, Sunram, dan Keuangan',
    points: [
      'Isi nama pelapor dan nomor WhatsApp aktif yang dapat dihubungi.',
      'Pilih unit tujuan pengaduan sesuai kebutuhan (Bagian Umum, Sunram, atau Keuangan).',
      'Tulis judul pengaduan yang singkat, jelas, dan mudah dipahami.',
      'Jelaskan isi pengaduan secara lengkap serta upload lampiran pendukung.'
    ],
    formLink: '/layanan-publik/form-bagian-umum-sunram-keuangan'
  },
  'form-psda': {
    title: 'Tata Cara Isi Form PSDA',
    points: [
      'Siapkan data pelapor, nomor HP aktif, dan alamat lokasi kejadian.',
      'Pilih jenis permasalahan PSDA dan isi kronologi secara rinci.',
      'Pilih dampak yang terjadi dan upload bukti foto/video kondisi lapangan.',
      'Masukkan titik lokasi Google Maps agar tim teknis mudah menindaklanjuti.'
    ],
    formLink: '/layanan-publik/form-psda'
  },
  'form-cipta-karya': {
    title: 'Tata Cara Isi Form Cipta Karya',
    points: [
      'Isi identitas pemohon dan nomor HP aktif.',
      'Pilih jenis permohonan sesuai kebutuhan pembangunan/permukiman.',
      'Lengkapi detail lokasi, status lahan, dan deskripsi kebutuhan.',
      'Upload dokumen pendukung dan titik lokasi Google Maps.'
    ],
    formLink: '/layanan-publik/form-cipta-karya'
  },
  'form-bina-marga': {
    title: 'Tata Cara Isi Form Bina Marga',
    points: [
      'Isi data pelapor, lokasi jalan/jembatan, dan tingkat kerusakan.',
      'Jelaskan kronologi serta dampak yang terjadi di lapangan.',
      'Upload foto kondisi kerusakan dengan jelas.',
      'Cantumkan titik lokasi Google Maps untuk verifikasi lapangan.'
    ],
    formLink: '/layanan-publik/form-bina-marga'
  },
  'form-tata-ruang': {
    title: 'Tata Cara Isi Form Tata Ruang',
    points: [
      'Isi identitas pemohon dan alamat lengkap.',
      'Pilih jenis layanan tata ruang yang dibutuhkan.',
      'Isi lokasi objek dan tujuan pemanfaatan ruang.',
      'Upload dokumen pendukung agar proses verifikasi lebih cepat.'
    ],
    formLink: '/layanan-publik/form-tata-ruang'
  },
  'form-bina-konstruksi': {
    title: 'Tata Cara Isi Form Bina Konstruksi',
    points: [
      'Isi nama pemohon, badan usaha, dan nomor HP aktif.',
      'Pilih jenis layanan konstruksi sesuai kebutuhan.',
      'Lengkapi nomor SBU/SKK dan deskripsi permohonan.',
      'Upload dokumen pendukung untuk proses validasi administrasi.'
    ],
    formLink: '/layanan-publik/form-bina-konstruksi'
  },
  'form-upt-lab-alat-berat': {
    title: 'Tata Cara Isi Form UPT PU Lab dan Alat Berat',
    points: [
      'Isi nama pemohon, instansi/perusahaan, dan kontak aktif.',
      'Pilih jenis layanan (uji material/peminjaman alat/tenaga teknis).',
      'Tulis rincian permohonan secara jelas dan singkat.',
      'Upload dokumen pendukung agar permintaan mudah diverifikasi.'
    ],
    formLink: '/layanan-publik/form-upt-lab-alat-berat'
  }
};

const TataCaraDetailForm = () => {
  const { slug } = useParams();
  const guide = guideMap[slug] || guideMap.umum;

  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{guide.title}</h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">Panduan singkat agar pengisian form lebih cepat, tepat, dan mudah diproses.</p>
        </div>
      </div>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#1E3A7D] mb-6">Langkah Pengisian</h2>
              <ol className="space-y-4 mb-8">
                {guide.points.map((point, index) => (
                  <li key={point} className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-[#FDB913] text-[#1E3A7D] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </li>
                ))}
              </ol>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/layanan-publik/tata-cara"
                  className="inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-3 rounded-lg text-sm font-semibold"
                >
                  Kembali ke Menu Tata Cara
                </Link>
                <Link
                  to={guide.formLink}
                  className="inline-flex items-center justify-center bg-[#1E3A7D] hover:bg-[#152856] text-white px-5 py-3 rounded-lg text-sm font-semibold"
                >
                  Buka Form
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TataCaraDetailForm;
