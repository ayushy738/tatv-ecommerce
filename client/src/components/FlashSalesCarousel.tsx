
import React, { useState, useEffect } from "react";
import { Product } from "../data/products";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FlashSalesCarouselProps {
  products: Product[];
}

const FlashSalesCarousel: React.FC<FlashSalesCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  
  // Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2); // Mobile: 2 items
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2); // Small tablet: 2 items
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3); // Tablet: 3 items
      } else {
        setItemsPerPage(4); // Desktop: 4 items
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerPage);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying || maxIndex === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex, isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main carousel */}
      <div className="overflow-hidden rounded-xl md:rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
        >
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 px-2 md:px-3"
              style={{ width: `${100 / itemsPerPage}%` }}
            >
              <div className="transform transition-all duration-300 hover:scale-105">
                <ProductCard product={product} showAddToCart={false} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons - Hidden on mobile */}
      {maxIndex > 0 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10 h-8 w-8 md:h-10 md:w-10 hidden sm:flex"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10 h-8 w-8 md:h-10 md:w-10 hidden sm:flex"
            onClick={goToNext}
          >
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-4 md:mt-6 gap-1.5 md:gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-red-500 w-6 md:w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashSalesCarousel;
