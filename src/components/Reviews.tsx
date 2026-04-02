import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import reviewsData from '../data/reviews.json'; 

const Reviews: React.FC = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg 
            key={index} 
            className={`w-5 h-5 ${index < rating ? 'text-[#10b981]' : 'text-gray-600'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const visibleReviews = reviewsData.slice(0, visibleCount);
  const hasMore = visibleCount < reviewsData.length;

  return (
    <section id="reviews" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('reviewsTitle')}</h2>
          <p className="text-gray-400">{t('reviewsSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {visibleReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-[#121212] border border-white/5 p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-white/10 transition-colors"
            >
              <div>
                <div className="mb-4">
                  <div className="font-bold text-white text-lg">{review.name}</div>
                </div>
                <div className="mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={handleShowMore}
              className="px-8 py-3 bg-transparent border border-white/10 text-white rounded-xl font-medium hover:bg-white/5 hover:border-[#10b981] hover:text-[#10b981] transition-all"
            >
              {t('showMore')}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Reviews;