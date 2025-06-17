
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselSlide {
  id: number;
  category: string;
  tagline: string;
  backgroundImage: string;
  productLink: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    category: 'Shoes',
    tagline: 'Step into comfort and style',
    backgroundImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=2012&q=80',
    productLink: '/product/6849736aa6b38cc63395808a'
  },
  {
    id: 2,
    category: 'Sandals',
    tagline: 'Summer comfort for every step',
    backgroundImage: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    productLink: '/product/68489e24cc86ca35442798b9'
  },
  {
    id: 3,
    category: 'Watches',
    tagline: 'Time meets elegance',
    backgroundImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1999&q=80',
    productLink: '/product/68489fa5cc86ca35442798c1'
  }
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] overflow-hidden rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <Link
            key={slide.id}
            to={slide.productLink}
            className="relative min-w-full h-full group cursor-pointer"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 animate-fade-in transform transition-all duration-700 group-hover:scale-110">
                {slide.category}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 md:mb-8 max-w-2xl opacity-90 animate-slide-up">
                {slide.tagline}
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-sm md:text-lg px-4 py-2 md:px-8 md:py-3 transform transition-all duration-300 hover:scale-105 animate-bounce"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = slide.productLink;
                }}
              >
                Shop Now
              </Button>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 md:p-2 transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 md:p-2 transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 md:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
