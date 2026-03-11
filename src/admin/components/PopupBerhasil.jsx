import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const PopupBerhasil = ({ isOpen, message, onClose, type = 'success' }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';
  const title = type === 'success' ? 'Berhasil!' : 'Informasi';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        <div className={`${bgColor} text-white p-6 flex items-center gap-4`}>
          <CheckCircle className="w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-sm opacity-90">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto flex-shrink-0 hover:bg-white/20 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupBerhasil;
