import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Newspaper, LogOut, Archive, FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      path: '/admin-website-pupr-ppu/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard'
    },
    {
      path: '/admin-website-pupr-ppu/manajemen-berita',
      icon: Newspaper,
      label: 'Manajemen Berita'
    },
    {
      path: '/admin-website-pupr-ppu/manajemen-arsip',
      icon: Archive,
      label: 'Manajemen Arsip'
    },
    {
      path: '/admin-website-pupr-ppu/manajemen-konten',
      icon: FileText,
      label: 'Manajemen Konten'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin-website-pupr-ppu');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-[#1E3A7D] to-[#152856] min-h-screen flex flex-col">
      {/* Logo & Title */}
      <div className="p-6 border-b border-[#FDB913]/30">
        <div className="flex items-center gap-3">
          <img 
            src="/logo/logo PU.png" 
            alt="Logo DPUPR" 
            className="w-12 h-12 object-contain bg-white rounded-lg p-1"
          />
          <div>
            <h2 className="text-white font-bold text-lg">DPUPR PPU</h2>
            <p className="text-[#FDB913] text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#FDB913] text-[#1E3A7D] font-semibold'
                      : 'text-white hover:bg-[#2C3E7D]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#FDB913]/30">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-600 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <p className="text-[#FDB913]/60 text-xs">
          © 2026 DPUPR PPU
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
