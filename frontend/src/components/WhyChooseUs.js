import React from 'react';
import homeIcon from '../assets/icons/home.svg';
import designIcon from '../assets/icons/paintbrush-2.svg';
import marketingIcon from '../assets/icons/circle-dollar-sign.svg';

function WhyChooseUs() {
  // Use process.env.PUBLIC_URL for production deployment
  const shape1 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-1.svg`;
  const shape2 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-7.svg`;
  const shape3 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-8.svg`;
  const shape4 = `${process.env.PUBLIC_URL || ''}/shape-ellipse-10.svg`;

  const features = [
    {
      icon: homeIcon,
      title: 'Potential ROI',
      description: 'Whether you are looking to buy a home or not, renovate your current home for sale.'
    },
    {
      icon: designIcon,
      title: 'Design',
      description: 'Our design team makes the process guide through your design options and coordinating.'
    },
    {
      icon: marketingIcon,
      title: 'Marketing',
      description: 'Engaging communication, professional processes and a sophisticated digital marketing.'
    }
  ];

  return (
    <section id="services" className="py-20 md:py-24 px-4 md:px-8 bg-white relative overflow-hidden">
      {/* Decorative SVG Shapes - Empty shapes from Shapes folder */}
      {/* Small shape in top-right */}
      <img src={shape2} alt="" className="absolute top-8 right-8 md:right-12 w-3 h-3 md:w-4 md:h-4 opacity-40" />
      {/* Faint background shapes */}
      <img src={shape1} alt="" className="absolute top-0 left-0 w-64 h-64 md:w-80 md:h-80 opacity-5" />
      <img src={shape3} alt="" className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 opacity-5" />
      <img src={shape4} alt="" className="absolute bottom-0 left-1/4 w-40 h-40 md:w-56 md:h-56 opacity-5" />
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-blue mb-4">
            Why Choose Us?
          </h2>
          <div className="w-24 h-1 bg-primary-blue mx-auto"></div>
        </div>

        {/* Feature Blocks */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              {/* Icon with light blue circular outline */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <img 
                    src={feature.icon} 
                    alt={feature.title} 
                    className="w-10 h-10 md:w-12 md:h-12 text-primary-blue"
                  />
                </div>
              </div>
              
              {/* Heading */}
              <h3 className="text-xl md:text-2xl font-bold text-primary-blue mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

