
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
    // {
    //   type: 'sale',
    //   title: 'Weekend Deal',
    //   subtitle: 'Buy Footwear less than Rs.999',
    //   bgColor: 'bg-gradient-to-r from-green-500 to-teal-500',
    //   link: '/search?q=shoes'
    // },
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
    <div className="mb-8 overflow-hidden rounded-2xl">
      <Link to={currentItem.link}>
        <div className={`${currentItem.bgColor} p-6 text-white transition-all duration-500`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {currentItem.type === 'sale' ? 'Limited Time' : 'Category'}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{currentItem.title}</h3>
              <p className="text-white/90">{currentItem.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-75">
                {currentIndex + 1} / {bannerItems.length}
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryBanner;
