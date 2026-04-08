import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './admin/context/AuthContext';
import ContentInitializer from './components/ContentInitializer';

// Public Pages
import Home from './pages/Home';
import Berita from './pages/Berita';
import InformasiKepalaDinas from './pages/InformasiKepalaDinas';
import DynamicPage from './pages/DynamicPage';
import TataCaraLayananPublik from './pages/layanan/TataCaraLayananPublik';
import TataCaraDetailForm from './pages/layanan/TataCaraDetailForm';
import FormLayananPublik from './pages/layanan/FormLayananPublik';
import FormCiptaKarya from './pages/layanan/FormCiptaKarya';
import FormPSDA from './pages/layanan/FormPSDA';
import FormBinaMarga from './pages/layanan/FormBinaMarga';
import FormTataRuang from './pages/layanan/FormTataRuang';
import FormBinaKonstruksi from './pages/layanan/FormBinaKonstruksi';
import FormUptLabAlatBerat from './pages/layanan/FormUptLabAlatBerat';
import FormBagianUmumSunramKeuangan from './pages/layanan/FormBagianUmumSunramKeuangan';
import TrackingLayananPublik from './pages/layanan/TrackingLayananPublik';
import TrackingPengaduan from './pages/layanan/TrackingPengaduan';

// Admin Pages
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ManajemenBerita from './admin/pages/ManajemenBerita';
import ManajemenArsip from './admin/pages/ManajemenArsip';
import ManajemenLayananPublik from './admin/pages/ManajemenLayananPublik';
import ManajemenLayananPublikDaftar from './admin/pages/ManajemenLayananPublikDaftar';
import ManajemenPengaduan from './admin/pages/ManajemenPengaduan';
import ManajemenPengaduanDaftar from './admin/pages/ManajemenPengaduanDaftar';
import ManajemenEksporDanBackup from './admin/pages/ManajemenEksporDanBackup';

const App = () => {
  return (
    <AuthProvider>
      <ContentInitializer />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/berita/:id" element={<Berita />} />
          
          {/* Dynamic Content Pages */}
          <Route path="/profil/informasi-kepala-dinas" element={<InformasiKepalaDinas />} />
          <Route path="/kegiatan/:slug" element={<DynamicPage />} />
          <Route path="/ppid/:slug" element={<DynamicPage />} />
          <Route path="/profil/:slug" element={<DynamicPage />} />
          <Route path="/layanan-publik/tata-cara" element={<TataCaraLayananPublik />} />
          <Route path="/layanan-publik/tata-cara/:slug" element={<TataCaraDetailForm />} />
          <Route path="/layanan-publik/form" element={<FormLayananPublik />} />
          <Route path="/layanan-publik/form-cipta-karya" element={<FormCiptaKarya />} />
          <Route path="/layanan-publik/form-psda" element={<FormPSDA />} />
          <Route path="/layanan-publik/form-bina-marga" element={<FormBinaMarga />} />
          <Route path="/layanan-publik/form-tata-ruang" element={<FormTataRuang />} />
          <Route path="/layanan-publik/form-bina-konstruksi" element={<FormBinaKonstruksi />} />
          <Route path="/layanan-publik/form-upt-lab-alat-berat" element={<FormUptLabAlatBerat />} />
          <Route path="/layanan-publik/form-bagian-umum-sunram-keuangan" element={<FormBagianUmumSunramKeuangan />} />
          <Route path="/layanan-publik/tracking" element={<TrackingLayananPublik />} />
          <Route path="/layanan-publik/tracking-pengaduan" element={<TrackingPengaduan />} />
          
          {/* Admin Routes */}
          <Route path="/admin-website-pupr-ppu" element={<Login />} />
          <Route path="/admin-website-pupr-ppu/dashboard" element={<Dashboard />} />
          <Route path="/admin-website-pupr-ppu/manajemen-berita" element={<ManajemenBerita />} />
          <Route path="/admin-website-pupr-ppu/manajemen-arsip" element={<ManajemenArsip />} />
          <Route path="/admin-website-pupr-ppu/manajemen-layanan-publik" element={<ManajemenLayananPublik />} />
          <Route path="/admin-website-pupr-ppu/manajemen-layanan-publik/:kategori" element={<ManajemenLayananPublikDaftar />} />
          <Route path="/admin-website-pupr-ppu/manajemen-pengaduan" element={<ManajemenPengaduan />} />
          <Route path="/admin-website-pupr-ppu/manajemen-pengaduan/:kategori" element={<ManajemenPengaduanDaftar />} />
          <Route path="/admin-website-pupr-ppu/ekspor-dan-backup" element={<ManajemenEksporDanBackup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
