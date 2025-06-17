
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CategoryCarouselProps {
  categoryName: string;
  categoryId: string;
  products: Product[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ 
  categoryName, 
  categoryId, 
  products 
}) => {
  if (products.length === 0) return null;

  return (
    <section className="mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{categoryName}</h2>
          <p className="text-sm md:text-base text-gray-600">Discover our latest collection</p>
        </div>
        <Link to={`/category/${categoryId}`}>
          <Button variant="outline" className="group self-start text-sm md:text-base">
            View All
            <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <ProductCard product={product} showAddToCart={false} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
