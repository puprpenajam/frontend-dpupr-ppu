import { Link, X } from 'lucide-react';

const PopupInputLink = ({
  isOpen,
  value,
  error,
  onChange,
  onCancel,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        <div className="bg-gray-50 border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link className="w-6 h-6 text-[#1E3A7D] flex-shrink-0" />
            <h2 className="text-lg font-bold text-gray-900">Tambah Link</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-2">
          <label htmlFor="popup-link-url" className="text-sm font-semibold text-gray-700">
            URL Link
          </label>
          <input
            id="popup-link-url"
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://contoh.com"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
              error ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-300 focus:border-[#1E3A7D]'
            }`}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 bg-[#1E3A7D] hover:bg-[#152856] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Simpan Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupInputLink;