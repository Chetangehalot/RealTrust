import React, { useRef, useState, useEffect } from 'react';
import { getImageUrl } from '../config/api';

function Clients({ clients }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position and update button states
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      }
    };
  }, [clients]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.client-card')?.offsetWidth || 0;
      const gap = 24; // gap-6 = 1.5rem = 24px
      const scrollAmount = cardWidth + gap;
      
      // Scroll to show exactly 5 cards, moving by one card width
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.client-card')?.offsetWidth || 0;
      const gap = 24; // gap-6 = 1.5rem = 24px
      const scrollAmount = cardWidth + gap;
      
      // Scroll to show exactly 5 cards, moving by one card width
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="clients" className="py-20 px-8 bg-gray-50 relative overflow-visible">
      <div className="container mx-auto relative z-10 overflow-visible">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Happy Clients
        </h2>
        <div className="w-24 h-1 bg-primary-blue mx-auto mb-12"></div>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No clients available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="relative px-16 group py-8 pt-20">
            {/* Left Scroll Button */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Right Scroll Button */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4 pt-16"
              style={{ 
                scrollPadding: '0 16px',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="client-card flex-shrink-0 snap-start bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition relative z-10 overflow-visible"
                  style={{ width: 'calc((100% - 96px) / 5)', minWidth: '280px' }}
                >
                  <div className="relative mb-4 -mt-12 z-20">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg relative z-20">
                      <img 
                        src={client.image ? getImageUrl(client.image) : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'} 
                        alt={client.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4 text-sm min-h-[60px]">
                    "{client.description}"
                  </p>
                  <h4 className="text-primary-blue font-bold text-lg mb-1">
                    {client.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {client.designation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Clients;

