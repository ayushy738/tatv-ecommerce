
import React from "react";
import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export const Rating: React.FC<RatingProps> = ({ 
  value, 
  max = 5,
  size = "md"
}) => {
  const starSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  const sizeClass = starSizes[size];
  
  return (
    <div className="flex">
      {Array.from({ length: max }).map((_, index) => {
        let fillAmount = 0;
        
        if (index < Math.floor(value)) {
          fillAmount = 100;
        } else if (index === Math.floor(value) && value % 1 !== 0) {
          fillAmount = Math.round((value % 1) * 100);
        }
        
        return (
          <span key={index} className="relative">
            <Star className={`${sizeClass} text-gray-300`} />
            <span 
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillAmount}%` }}
            >
              <Star className={`${sizeClass} text-yellow-400 fill-yellow-400`} />
            </span>
          </span>
        );
      })}
    </div>
  );
};
