import { useEffect, useMemo, useState } from 'react';
import { ZoomIn, ZoomOut, X } from 'lucide-react';

const BuktiPreviewModal = ({
  isOpen,
  onClose,
  fileData,
  fileType,
  fileName,
  title = 'Preview Bukti'
}) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
    }
  }, [isOpen]);

  const normalizedType = (fileType || '').toLowerCase();
  const isImage = normalizedType.startsWith('image/');
  const isPdf = normalizedType === 'application/pdf';
  const isPreviewableDocument = useMemo(() => {
    const previewable = [
      'application/pdf',
      'text/plain',
      'application/json',
      'text/csv'
    ];
    return previewable.includes(normalizedType);
  }, [normalizedType]);

  if (!isOpen) {
    return null;
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6));

  const pdfSrc = isPdf ? `${fileData}#toolbar=1&zoom=${Math.round(zoom * 100)}` : fileData;

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-3 border-b border-gray-200 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-[#1E3A7D] truncate">{title}</h3>
            {fileName && <p className="text-xs sm:text-sm text-gray-600 truncate">{fileName}</p>}
          </div>

          <div className="flex items-center gap-2">
            {(isImage || isPdf) && (
              <>
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 min-w-[48px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-3 sm:p-4 h-[75vh] overflow-auto">
          {!fileData ? (
            <div className="h-full flex items-center justify-center text-gray-500">Bukti tidak tersedia.</div>
          ) : isImage ? (
            <div className="h-full w-full overflow-auto bg-white rounded-lg border border-gray-200 p-3">
              <img
                src={fileData}
                alt={fileName || 'Bukti Upload'}
                className="max-w-none"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
              />
            </div>
          ) : isPdf ? (
            <div className="h-full w-full bg-white rounded-lg border border-gray-200 overflow-auto">
              <iframe
                title="Preview PDF"
                src={pdfSrc}
                className="w-full h-full min-h-[560px]"
              />
            </div>
          ) : isPreviewableDocument ? (
            <div className="h-full w-full bg-white rounded-lg border border-gray-200 overflow-auto">
              <iframe
                title="Preview Dokumen"
                src={fileData}
                className="w-full h-full min-h-[560px]"
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center px-4">
              <div>
                <p className="text-gray-700 font-semibold mb-1">Preview langsung belum didukung untuk tipe file ini.</p>
                <p className="text-sm text-gray-500">Silakan unggah PDF atau gambar untuk pengalaman preview terbaik.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuktiPreviewModal;
