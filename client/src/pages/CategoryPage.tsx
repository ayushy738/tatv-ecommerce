
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProducts, getProductsByCategoryAndSubCategory, Product } from "../data/products";
import { categories } from "../data/categories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Grid, List } from "lucide-react";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = categories.find(cat => cat.id === categoryId);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        await getProducts();
        if (category) {
          const products = getProductsByCategoryAndSubCategory(
            category.category, 
            category.subCategory
          );
          setCategoryProducts(products);
        }
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 text-sm md:text-base">The category you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Category Header */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 md:py-16 text-white">
          <div className="container px-4">
            <div className="text-center">
              <Badge className="mb-4 bg-white/20 text-white text-xs md:text-sm">{category.name}</Badge>
              <h1 className="text-2xl md:text-4xl font-bold mb-4">{category.name} Collection</h1>
              <p className="text-base md:text-xl opacity-90 max-w-2xl mx-auto">
                Discover our amazing collection of {category.name.toLowerCase()}
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Sorting */}
        <section className="py-6 md:py-8 bg-white border-b">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-base md:text-lg font-semibold text-gray-900">
                  {categoryProducts.length} Products Found
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 w-full md:w-auto">
                <Button variant="outline" size="sm" className="text-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-full sm:w-48 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Sort by Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded-lg">
                  <Button variant="ghost" size="sm" className="px-2 md:px-3">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="px-2 md:px-3">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 md:py-12">
          <div className="container px-4">
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We're working on adding more products to this category. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
