import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

const AdminHeader = ({ title, subtitle }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E3A7D]">{title}</h1>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        
        {/* User Info - Top Right */}
        <div className="flex items-center gap-3 bg-[#FDB913]/10 px-4 py-2 rounded-lg border border-[#FDB913]/30">
          <div className="w-10 h-10 bg-[#FDB913] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-[#1E3A7D]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1E3A7D]">{user?.name}</p>
            <p className="text-xs text-[#FDB913]">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
