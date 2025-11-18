import React from 'react';

function Newsletter() {
  // Use process.env.PUBLIC_URL for production deployment
  const newsletterBg = `${process.env.PUBLIC_URL || ''}/newsletter-background.svg`;

  const handleExploreMore = () => {
    // Scroll to projects section or any desired section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${newsletterBg})`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 md:px-8 w-full max-w-4xl">
          <p className="text-white text-xl md:text-2xl lg:text-3xl mb-8 leading-relaxed">
            Learn more about our listing process, as well as our additional staging and design work.
          </p>
          
          {/* Explore More Button */}
          <button
            onClick={handleExploreMore}
            className="bg-white text-primary-blue px-8 py-3 md:px-10 md:py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
          >
            EXPLORE MORE
          </button>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;

