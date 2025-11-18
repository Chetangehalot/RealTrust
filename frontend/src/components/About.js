import React from 'react';

function About() {
  // Use process.env.PUBLIC_URL for production deployment
  const image1 = `${process.env.PUBLIC_URL || ''}/about-image-1.svg`;
  const image2 = `${process.env.PUBLIC_URL || ''}/about-image-2.svg`;
  const image3 = `${process.env.PUBLIC_URL || ''}/about-image-3.svg`;
  const shape1 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-1.svg`;
  const shape2 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-7.svg`;
  const shape3 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-8.svg`;
  const shape4 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-10.svg`;
  const shape5 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-17.svg`;
  const shape6 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-18.svg`;
  const shapeRect = `${process.env.PUBLIC_URL || ''}/shape-rectangle-54.svg`;

  return (
    <section id="about-projects" className="py-24 px-4 md:px-8 lg:px-12 bg-white relative overflow-hidden">
      {/* Decorative SVG Shapes - Empty shapes from Shapes folder */}
      {/* Large faint shape in top-left (behind text) */}
      <img src={shape1} alt="" className="absolute top-0 left-0 w-40 h-40 md:w-56 h-56 lg:w-64 lg:h-64 opacity-5" />
      
      {/* Shape in top-center (above text, slightly to the right) */}
      <img src={shape2} alt="" className="absolute top-8 md:top-12 left-1/3 md:left-2/5 w-12 h-12 md:w-16 md:h-16 opacity-40" />
      
      {/* Shape in bottom-center (below text) */}
      <img src={shape3} alt="" className="absolute bottom-8 md:bottom-12 left-1/3 md:left-2/5 w-10 h-10 md:w-14 md:h-14 opacity-40" />
      
      {/* Rectangle pattern in bottom-left */}
      <img src={shapeRect} alt="" className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 opacity-5" />
      
      {/* Additional decorative shapes around images */}
      <img src={shape4} alt="" className="absolute top-32 right-16 md:right-24 w-20 h-20 md:w-28 md:h-28 opacity-10" />
      <img src={shape5} alt="" className="absolute top-1/2 right-8 md:right-12 w-8 h-8 md:w-12 md:h-12 opacity-25" />
      <img src={shape6} alt="" className="absolute bottom-1/4 right-20 md:right-32 w-6 h-6 md:w-10 md:h-10 opacity-25" />
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Text */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-blue mb-6 leading-tight">
              Not Your Average Realtor
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
              mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit 
              voluptatem accusantium doloremque laudantium.
            </p>
          </div>

          {/* Right Side - Circular Images arranged in staggered layout as per reference */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[650px] flex items-center justify-center">
            {/* Largest Circle - Man with house model (left-center, largest) */}
            <div className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 md:border-[6px] border-white shadow-2xl z-20 transition-transform duration-300 hover:scale-105">
              <img 
                src={image1} 
                alt="Professional with house model"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Top-Right Circle - Couple receiving keys */}
            <div className="absolute right-0 md:right-4 top-12 md:top-16 w-40 h-40 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 md:border-[6px] border-white shadow-xl z-10 transition-transform duration-300 hover:scale-105">
              <img 
                src={image2} 
                alt="Couple receiving keys"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Bottom-Right Circle - Man holding house cutout */}
            <div className="absolute right-0 md:right-4 bottom-12 md:bottom-16 w-40 h-40 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 md:border-[6px] border-white shadow-xl z-10 transition-transform duration-300 hover:scale-105">
              <img 
                src={image3} 
                alt="Professional with house cutout"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

