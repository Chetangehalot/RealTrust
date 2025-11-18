import React from 'react';
import image1 from '../assets/Images/pexels-brett-sayles-2881232.svg';
import image2 from '../assets/Images/pexels-brett-sayles-2881232-1.svg';
import image3 from '../assets/Images/pexels-brett-sayles-2881232-2.svg';

function AboutUs() {
  // Use process.env.PUBLIC_URL for production deployment
  const shape1 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-1.svg`;
  const shape2 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-7.svg`;
  const shape3 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-8.svg`;
  const shape4 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-10.svg`;
  const shapeRect = `${process.env.PUBLIC_URL || ''}/shape-rectangle-54.svg`;

  return (
    <section className="py-20 md:py-24 px-4 md:px-8 bg-white relative overflow-hidden">
      {/* Decorative Background Shapes - Light blue circles (scattered, particularly on left side) */}
      <img src={shape1} alt="" className="absolute top-0 left-0 w-40 h-40 md:w-56 md:h-56 opacity-15" />
      <img src={shape2} alt="" className="absolute top-20 left-20 w-32 h-32 md:w-44 md:h-44 opacity-12" />
      <img src={shape3} alt="" className="absolute top-40 left-10 w-24 h-24 md:w-36 md:h-36 opacity-10" />
      <img src={shape4} alt="" className="absolute bottom-20 left-16 w-28 h-28 md:w-40 md:h-40 opacity-12" />
      <img src={shape2} alt="" className="absolute top-32 right-20 w-20 h-20 md:w-28 md:h-28 opacity-10" />
      
      {/* Light blue rectangles/grids - bottom-left and top-right corners */}
      <img src={shapeRect} alt="" className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 opacity-10" />
      <img src={shapeRect} alt="" className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 opacity-10" />
      
      {/* Top Section - Images in a Line - Full Viewport Width */}
      <div className="w-screen relative" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="grid grid-cols-3 w-full">
          <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-200">
            <img 
              src={image1} 
              alt="Handshake in front of house"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-200">
            <img 
              src={image2} 
              alt="Realtor speaking to couple"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-200">
            <img 
              src={image3} 
              alt="Couple receiving keys"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl mt-12 md:mt-16 lg:mt-20">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Bottom Section - Text Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
            {/* Solid Blue Square - above and to the right of About Us title */}
            <div className="absolute -top-6 md:-top-8 right-4 md:right-8 w-12 h-12 md:w-16 md:h-16 bg-primary-blue z-0"></div>
            
            <div className="space-y-6 md:space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-blue mb-4 text-center relative z-10">
                  About Us
                </h2>
                <div className="w-24 h-1 bg-blue-200 mx-auto"></div>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-base md:text-lg lg:text-xl text-center max-w-3xl mx-auto">
                Fifteen years of experience in real estate, excellent customer service and a commitment to work hard, listen and follow through. We provide quality service to build relationships with clients and, more importantly, maintain those relationships by communicating effectively.
              </p>
              
              <div className="text-center pt-4">
                <button className="border-2 border-blue-200 text-blue-200 px-10 py-3 md:px-12 md:py-4 rounded-lg font-bold hover:bg-blue-200 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

