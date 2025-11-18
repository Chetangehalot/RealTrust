import React, { useRef, useState, useEffect } from 'react';

function Projects({ projects }) {
  // Use process.env.PUBLIC_URL for production deployment
  const shape1 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-7.svg`;
  const shape2 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-8.svg`;
  const shape3 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-10.svg`;
  const shape4 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-17.svg`;

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
  }, [projects]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.project-card')?.offsetWidth || 0;
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
      const cardWidth = container.querySelector('.project-card')?.offsetWidth || 0;
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
    <section id="projects" className="py-20 px-8 bg-white relative overflow-visible">
      {/* Decorative SVG Shapes - Empty shapes from Shapes folder */}
      <img src={shape1} alt="" className="absolute top-10 right-20 w-2 h-2 opacity-30 pointer-events-none z-0" />
      <img src={shape2} alt="" className="absolute top-32 left-10 w-3 h-3 opacity-30 pointer-events-none z-0" />
      <img src={shape3} alt="" className="absolute bottom-20 right-1/4 w-2 h-2 opacity-30 pointer-events-none z-0" />
      <img src={shape4} alt="" className="absolute bottom-40 left-1/3 w-3 h-3 opacity-30 pointer-events-none z-0" />
      
      <div className="container mx-auto relative z-10 overflow-visible">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Our Projects
        </h2>
        <div className="w-24 h-1 bg-primary-blue mx-auto mb-6"></div>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We know what buyers are looking for and suggest projects to maximize 
          your home sale value.
        </p>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="relative px-16 group py-8">
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
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4"
              style={{ 
                scrollPadding: '0 16px',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card flex-shrink-0 snap-start bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition relative z-10"
                  style={{ width: 'calc((100% - 96px) / 5)', minWidth: '280px' }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image ? `http://localhost:5000${project.image}` : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'} 
                      alt={project.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-primary-blue mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {project.description || 'Project Name, Location'}
                    </p>
                    <button className="bg-primary-orange text-white px-4 py-2 rounded text-sm hover:bg-orange-600 transition font-semibold w-full">
                      READ MORE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;

