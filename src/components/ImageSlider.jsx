import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Link } from 'react-router-dom';

const slides = [
  {
    image: "https://techno-workdo.myshopify.com/cdn/shop/files/main-banner-1.png?v=1714560913",
    name: "Headphone",
  },
  {
    image: "https://techno-workdo.myshopify.com/cdn/shop/files/main-banner-2.png?v=1714560913",
    name: "iPhone",
  },
  {
    image: "https://techno-workdo.myshopify.com/cdn/shop/files/main-banner-3.png?v=1714560913",
    name: "Speaker",
  },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(undefined); // Reference to store the interval

  // Start the interval function
  const startSlider = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  };

  // Stop the interval function
  const stopSlider = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startSlider(); // Start the slider on component mount
    return () => stopSlider(); // Cleanup interval on unmount
  }, []);


  return (
    <div
      className="relative w-screen h-[70vh] overflow-hidden"
      onMouseEnter={stopSlider} // Stop on hover
      onMouseLeave={startSlider} // Resume on leave
    >
      {/* Image Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-screen h-[70vh] relative flex-shrink-0"
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay Content with Framer Motion */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white space-y-8">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg md:text-2xl"
              >
                Flat 30% off on all Digital
              </motion.div>

              <motion.h2
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-4xl md:text-6xl lg:text-8xl font-semibold text-center"
              >
                {slide.name}
              </motion.h2>

              <a href='/products'>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="px-4 py-2 text-sm md:text-lg bg-indigo-500 hover:bg-white hover:text-black transition"
                >
                  Shop Now
                </motion.button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}