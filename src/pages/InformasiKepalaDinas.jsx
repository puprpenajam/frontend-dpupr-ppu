import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import KepalaDinas from '../components/KepalaDinas';
import FadeIn from '../components/FadeIn';

function InformasiKepalaDinas() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Title Section */}
        <section className="bg-gradient-to-r from-dpupr-blue to-blue-600 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Informasi Kepala Dinas
            </h1>
            <p className="text-base sm:text-lg text-blue-100">
              Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Penajam Paser Utara
            </p>
          </div>
        </section>

        {/* Profile Kepala Dinas Section */}
        <FadeIn>
        <KepalaDinas />
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}

export default InformasiKepalaDinas;
