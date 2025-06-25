
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { Badge } from "@/components/ui/badge";

const CategoryBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const bannerItems = [
    {
      type: 'sale',
      title: 'Upcoming',
      subtitle: 'New Kurtis for Women',
      bgColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      link: '/search?q=women'
    },
    ...categories.map(category => ({
      type: 'category',
      title: category.name,
      subtitle: `Explore ${category.name} Collection`,
      bgColor: 'bg-gradient-to-r from-blue-500 to-purple-500',
      link: `/search?q=${category.name.toLowerCase()}`
    }))
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerItems.length]);

  const currentItem = bannerItems[currentIndex];

  return (
    <div className="mb-6 md:mb-8 overflow-hidden rounded-xl md:rounded-2xl mx-4 md:mx-0">
      <Link to={currentItem.link}>
        <div className={`${currentItem.bgColor} p-4 md:p-6 text-white transition-all duration-500`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                  {currentItem.type === 'sale' ? 'Limited Time' : 'Category'}
                </Badge>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">{currentItem.title}</h3>
              <p className="text-white/90 text-sm md:text-base">{currentItem.subtitle}</p>
            </div>
            <div className="text-right ml-4">
              <div className="text-xs md:text-sm opacity-75">
                {currentIndex + 1} / {bannerItems.length}
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-3 md:mt-4 gap-2 px-4 md:px-0">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-600 w-4 md:w-6' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryBanner;
