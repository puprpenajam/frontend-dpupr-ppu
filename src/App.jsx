import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './admin/context/AuthContext';
import ContentInitializer from './components/ContentInitializer';

// Public Pages
import Home from './pages/Home';
import Berita from './pages/Berita';
import InformasiKepalaDinas from './pages/InformasiKepalaDinas';
import DynamicPage from './pages/DynamicPage';

// Admin Pages
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ManajemenBerita from './admin/pages/ManajemenBerita';
import ManajemenArsip from './admin/pages/ManajemenArsip';
import ManajemenKonten from './admin/pages/ManajemenKonten';

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
          
          {/* Admin Routes */}
          <Route path="/admin-website-pupr" element={<Login />} />
          <Route path="/admin-website-pupr/dashboard" element={<Dashboard />} />
          <Route path="/admin-website-pupr/manajemen-berita" element={<ManajemenBerita />} />
          <Route path="/admin-website-pupr/manajemen-arsip" element={<ManajemenArsip />} />
          <Route path="/admin-website-pupr/manajemen-konten" element={<ManajemenKonten />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
