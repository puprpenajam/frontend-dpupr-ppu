import { AlertCircle, X } from 'lucide-react';

const PopupKonfirmasi = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Hapus', cancelText = 'Batal', isDangerous = true }) => {
  if (!isOpen) return null;

  const buttonColor = isDangerous ? 'bg-red-500 hover:bg-red-600' : 'bg-[#1E3A7D] hover:bg-[#152856]';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 ${buttonColor} text-white font-semibold py-3 rounded-lg transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupKonfirmasi;
