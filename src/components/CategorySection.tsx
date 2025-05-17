
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../data/categories";
import { Product } from "../data/products";
import ProductCard from "./ProductCard";

interface CategorySectionProps {
  category: Category;
  products: Product[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, products }) => {
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{category.name}</h2>
          <Link 
            to={`/category/${category.id}`}
            className="text-primary hover:underline text-sm font-medium"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
