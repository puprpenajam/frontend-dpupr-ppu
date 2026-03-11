import { useAuth } from '../context/AuthContext';
import { User, Menu } from 'lucide-react';

const AdminHeader = ({ title, subtitle, onMenuClick }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-md p-4 sm:p-6 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile Menu Button + Title */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-[#1E3A7D]" />
          </button>
          
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl font-bold text-[#1E3A7D] truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">{subtitle}</p>
            )}
          </div>
        </div>
        
        {/* User Info - Responsive */}
        <div className="hidden sm:flex items-center gap-3 bg-[#FDB913]/10 px-4 py-2 rounded-lg border border-[#FDB913]/30 flex-shrink-0">
          <div className="w-10 h-10 bg-[#FDB913] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-[#1E3A7D]" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-[#1E3A7D]">{user?.name}</p>
            <p className="text-xs text-[#FDB913]">{user?.email}</p>
          </div>
        </div>

        {/* Mobile User Icon Only */}
        <div className="sm:hidden w-10 h-10 bg-[#FDB913] rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-[#1E3A7D]" />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
