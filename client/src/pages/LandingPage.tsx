
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCarousel from "../components/CategoryCarousel";
import FlashSalesCarousel from "../components/FlashSalesCarousel";
import HeroCarousel from "../components/HeroCarousel";
import { getProducts, getProductsByCategoryAndSubCategory, Product } from "../data/products";
import { categories, getMainCategories } from "../data/categories";
import { Badge } from "@/components/ui/badge";
import { Zap, ShoppingBag } from "lucide-react";

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="text-gray-600 font-medium">Loading amazing products...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const flashSaleProducts = products.filter(p => p.discountedPrice).slice(0, 8);
  const mainCategories = getMainCategories();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Carousel Section */}
        <section className="relative py-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          <div className="container">
            <HeroCarousel />
          </div>
        </section>

        <div className="container py-12 space-y-16">
          {/* Category Banner */}
          

          {/* Flash Sales */}
          {flashSaleProducts.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Zap className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900">Flash Sales</h2>
                    <p className="text-gray-600 text-lg">Limited time offers - Grab them fast!</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse text-lg px-4 py-2">
                  Ends Soon! ⚡
                </Badge>
              </div>
              <FlashSalesCarousel products={flashSaleProducts} />
            </section>
          )}

          {/* Category Carousels */}
          <div className="space-y-20">
            {categories.map((category) => {
              const categoryProducts = getProductsByCategoryAndSubCategory(
                category.category, 
                category.subCategory
              ).slice(0, 10);
              
              return (
                <CategoryCarousel
                  key={category.id}
                  categoryName={category.name}
                  categoryId={category.id}
                  products={categoryProducts}
                />
              );
            })}
          </div>

          {/* No Products Message */}
          {products.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="space-y-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">No Products Available</h3>
                <p className="text-gray-600 text-lg">Products will appear here once they're loaded from the server.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
