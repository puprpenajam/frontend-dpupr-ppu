import { useState } from 'react';
import { Calendar } from 'lucide-react';

const PreviewBerita = ({ isOpen, news, onClose }) => {
  if (!isOpen || !news) return null;

  // Function to render text with bold location
  const renderTextWithBoldLocation = (text, isFirstParagraph) => {
    if (isFirstParagraph) {
      // Check if text starts with uppercase location (e.g., "PENAJAM. content...")
      const locationMatch = text.match(/^([A-Z\s]+)\.\s/);
      if (locationMatch) {
        const location = locationMatch[1];
        const restOfText = text.substring(locationMatch[0].length);
        return (
          <>
            <strong className="font-bold">{location}.</strong> {restOfText}
          </>
        );
      }
    }
    return text;
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-[#1E3A7D]">Preview Berita</h2>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Featured Image */}
          <div className="mb-6">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{news.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {news.title}
          </h1>

          {/* Content */}
          <div className="max-w-none text-gray-700">
            {/* If news has contentBlocks, render them */}
            {news.contentBlocks && news.contentBlocks.length > 0 ? (
              <div className="space-y-6">
                {news.contentBlocks.map((block, index) => (
                  <div key={index}>
                    {block.type === 'text' ? (
                      <div 
                        className="rich-text-editor"
                        dangerouslySetInnerHTML={{ __html: block.content }}
                      />
                    ) : (
                      block.content && (
                        <div className="my-6 rounded-xl overflow-hidden">
                          <img
                            src={block.content}
                            alt={`${news.title} - gambar ${index + 1}`}
                            className="w-full h-auto object-cover"
                          />
                          {block.caption && (
                            <p className="text-sm text-gray-600 italic mt-2 px-0 text-center">
                              {block.caption}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback for old format */
              <>
                {news.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-justify leading-relaxed">
                    {renderTextWithBoldLocation(paragraph, index === 0)}
                  </p>
                ))}
                
                {/* Additional Images from old format */}
                {news.images && news.images.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {news.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${news.title} - gambar ${index + 1}`}
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-[#1E3A7D] hover:bg-[#152856] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Tutup Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewBerita;
