import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(formData.email, formData.password);
    if (result.success) {
      navigate('/admin-website-pupr-ppu/dashboard');
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A7D] via-[#2C3E7D] to-[#1E3A7D] flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#1E3A7D] text-white px-6 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">ADMIN ACCESS</span>
          </div>
          
          <div className="mb-6">
            <img 
              src="/logo/logo PUPR.png" 
              alt="Logo DPUPR" 
              className="w-24 h-24 mx-auto object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#1E3A7D] mb-2">Admin Portal</h1>
          <p className="text-gray-600">Dashboard Administrator DPUPR</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Admin
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="puprpenajamkab@gmail.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#FDB913]/30 focus:border-[#1E3A7D] focus:outline-none transition-colors"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password Admin
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                className="w-full px-4 py-3 rounded-xl border-2 border-[#FDB913]/30 focus:border-[#1E3A7D] focus:outline-none transition-colors pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Login Admin
          </button>
        </form>
        <div className="mt-6 bg-[#FDB913]/10 border-2 border-[#FDB913]/30 rounded-xl p-4">
          <p className="text-[#1E3A7D] text-xs text-center flex items-center justify-center gap-1">
             Portal ini hanya untuk administrator sistem. Semua aktivitas login akan dicatat.
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default Login;

